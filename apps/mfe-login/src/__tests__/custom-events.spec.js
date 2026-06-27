import { describe, it, expect, vi } from 'vitest';

/**
 * Testes unitários para verificar que os Custom Events do mfe-login
 * são disparados corretamente com as flags e payloads esperados.
 *
 * Valida: RF-003 (success, error) e RF-004 (forgot-password, register)
 */

describe('MfeLogin — Custom Events', () => {
  /**
   * Helper: cria uma instância do MfeLogin com AuthService mockado.
   */
  async function createMfeLogin() {
    // Importa dinamicamente para permitir que happy-dom registre o DOM
    const { MfeLogin } = await import('../components/mfe-login.js');

    const el = document.createElement('mfe-login');
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  /**
   * Helper: limpa o DOM após cada teste.
   */
  function cleanup() {
    document.body.innerHTML = '';
  }

  describe('mfe-login:success', () => {
    it('deve disparar com { user, token }, bubbles: true, composed: true ao login bem-sucedido', async () => {
      const el = await createMfeLogin();

      // Mock do AuthService para retornar sucesso imediatamente
      el._authService = {
        login: vi.fn().mockResolvedValue({
          success: true,
          user: { id: '1', name: 'Admin', email: 'admin@mfe.dev' },
          token: 'mock-jwt-token',
        }),
      };

      const eventPromise = new Promise((resolve) => {
        el.addEventListener('mfe-login:success', (e) => resolve(e));
      });

      // Simula o submit disparando o evento interno
      el._handleFormSubmit(
        new CustomEvent('login-form:submit', {
          detail: { email: 'admin@mfe.dev', password: '123456' },
        })
      );

      const event = await eventPromise;

      expect(event).toBeInstanceOf(CustomEvent);
      expect(event.type).toBe('mfe-login:success');
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
      expect(event.detail).toEqual({
        user: { id: '1', name: 'Admin', email: 'admin@mfe.dev' },
        token: 'mock-jwt-token',
      });

      cleanup();
    });
  });

  describe('mfe-login:error', () => {
    it('deve disparar com { message }, bubbles: true, composed: true ao login falhar', async () => {
      const el = await createMfeLogin();

      el._authService = {
        login: vi.fn().mockResolvedValue({
          success: false,
          error: 'Credenciais inválidas',
        }),
      };

      const eventPromise = new Promise((resolve) => {
        el.addEventListener('mfe-login:error', (e) => resolve(e));
      });

      // Usa senha com >= 6 chars para passar a validação client-side
      el._handleFormSubmit(
        new CustomEvent('login-form:submit', {
          detail: { email: 'wrong@email.com', password: 'wrongpass' },
        })
      );

      const event = await eventPromise;

      expect(event).toBeInstanceOf(CustomEvent);
      expect(event.type).toBe('mfe-login:error');
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
      expect(event.detail).toEqual({ message: 'Credenciais inválidas' });

      cleanup();
    });

    it('deve disparar com mensagem genérica ao ocorrer exceção', async () => {
      const el = await createMfeLogin();

      el._authService = {
        login: vi.fn().mockRejectedValue(new Error('Network failure')),
      };

      const eventPromise = new Promise((resolve) => {
        el.addEventListener('mfe-login:error', (e) => resolve(e));
      });

      el._handleFormSubmit(
        new CustomEvent('login-form:submit', {
          detail: { email: 'admin@mfe.dev', password: '123456' },
        })
      );

      const event = await eventPromise;

      expect(event).toBeInstanceOf(CustomEvent);
      expect(event.type).toBe('mfe-login:error');
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
      expect(event.detail.message).toBe('Erro inesperado. Tente novamente.');

      cleanup();
    });
  });

  describe('mfe-login:forgot-password', () => {
    it('deve disparar com detail vazio, bubbles: true, composed: true', async () => {
      const el = await createMfeLogin();

      const eventPromise = new Promise((resolve) => {
        el.addEventListener('mfe-login:forgot-password', (e) => resolve(e));
      });

      el._handleForgot();

      const event = await eventPromise;

      expect(event).toBeInstanceOf(CustomEvent);
      expect(event.type).toBe('mfe-login:forgot-password');
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
      expect(event.detail).toEqual({});

      cleanup();
    });
  });

  describe('mfe-login:register', () => {
    it('deve disparar com detail vazio, bubbles: true, composed: true', async () => {
      const el = await createMfeLogin();

      const eventPromise = new Promise((resolve) => {
        el.addEventListener('mfe-login:register', (e) => resolve(e));
      });

      el._handleRegister();

      const event = await eventPromise;

      expect(event).toBeInstanceOf(CustomEvent);
      expect(event.type).toBe('mfe-login:register');
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
      expect(event.detail).toEqual({});

      cleanup();
    });
  });

  describe('_dispatchEvent helper', () => {
    it('deve criar CustomEvent com bubbles e composed sempre true', async () => {
      const el = await createMfeLogin();

      const eventPromise = new Promise((resolve) => {
        el.addEventListener('test-event', (e) => resolve(e));
      });

      el._dispatchEvent('test-event', { foo: 'bar' });

      const event = await eventPromise;

      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
      expect(event.detail).toEqual({ foo: 'bar' });

      cleanup();
    });
  });
});
