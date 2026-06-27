import { createInterface } from "readline";

const WEBHOOK_URL = process.env.GOOGLE_CHAT_WEBHOOK_URL;

if (!WEBHOOK_URL) {
  process.stderr.write("ERROR: GOOGLE_CHAT_WEBHOOK_URL environment variable is required\n");
  process.exit(1);
}

// MCP stdio protocol: newline-delimited JSON-RPC
function send(msg) {
  process.stdout.write(JSON.stringify(msg) + "\n");
}

function handleRequest(req) {
  if (req.method === "initialize") {
    return {
      protocolVersion: "2024-11-05",
      capabilities: { tools: {} },
      serverInfo: { name: "google-chat", version: "1.0.0" },
    };
  }

  if (req.method === "tools/list") {
    return {
      tools: [
        {
          name: "send_chat_message",
          description: "Envia uma mensagem para o Google Chat Space via webhook. Use para notificar conclusão de tarefas, pareceres técnicos, alertas ou comunicações ao time.",
          inputSchema: {
            type: "object",
            properties: {
              text: {
                type: "string",
                description: "Texto da mensagem a enviar. Suporta formatação básica do Google Chat.",
              },
            },
            required: ["text"],
          },
        },
      ],
    };
  }

  if (req.method === "tools/call") {
    const { name, arguments: args } = req.params;
    if (name === "send_chat_message") {
      return sendMessage(args.text);
    }
    return { content: [{ type: "text", text: `Tool "${name}" not found` }], isError: true };
  }

  if (req.method === "notifications/initialized") {
    return null;
  }

  return null;
}

async function sendMessage(text) {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      return {
        content: [{ type: "text", text: `Erro ao enviar: ${response.status} — ${errorBody}` }],
        isError: true,
      };
    }

    return {
      content: [{ type: "text", text: "Mensagem enviada com sucesso ao Google Chat." }],
    };
  } catch (error) {
    return {
      content: [{ type: "text", text: `Erro de conexão: ${error.message}` }],
      isError: true,
    };
  }
}

const rl = createInterface({ input: process.stdin, crlfDelay: Infinity });

rl.on("line", async (line) => {
  if (!line.trim()) return;

  try {
    const msg = JSON.parse(line);
    const result = await handleRequest(msg);

    if (result !== null && msg.id !== undefined) {
      send({ jsonrpc: "2.0", id: msg.id, result });
    }
  } catch (err) {
    process.stderr.write(`Parse error: ${err.message}\n`);
  }
});

// Keep the process alive — MCP servers must stay running
rl.on("close", () => {
  process.exit(0);
});

// Prevent process from exiting on its own
process.stdin.resume();
