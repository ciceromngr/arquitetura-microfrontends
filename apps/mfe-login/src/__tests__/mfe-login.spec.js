import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('MfeLogin — Componente', () => {
  let el;

  async function createMfeLogin() {
    const { MfeLogin } = await import('../components/mfe-login.js');
    el = document.createElement('mfe-login');
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => {
    document.body.innerHTML = '';
    el = null;
  });

  describe('render', () => {
    it('deve renderizar input de email', async () => {
      await createMfeLogin();
      const loginForm = el.shadowRoot.querySelector('login-form');
      await loginForm.updateComplete;

      const emailInput = loginForm.shadowRoot.querySelector('#email');
      expect(emailInput).not.toBeNull();
      expect(emailInput.type).toBe('email');
    });

    it('deve renderizar input de password', async () => {
      await createMfeLogin();
      const loginForm = el.shadowRoot.querySelector('login-form');
      await loginForm.updateComplete;

      const passwordInput = loginForm.shadowRoot.querySelector('#password');
      expect(passwordInput).not.toBeNull();
      expect(passwordInput.type).toBe('password');
    });

    it('deve renderizar botão de submit', async () => {
      await createMfeLogin();
      const loginForm = el.shadowRoot.querySelector('login-form');
      await loginForm.updateComplete;

      const button = loginForm.shadowRoot.querySelector('button[type="submit"]');
      expect(button).not.toBeNull();
      expect(button.textContent.trim()).toBe('Entrar');
    });

    it('deve renderizar login-links (esqueci senha, cadastre-se)', async () => {
      await createMfeLogin();
      const loginLinks = el.shadowRoot.querySelector('login-links');
      expect(loginLinks).not.toBeNull();

      await loginLinks.updateComplete;
      const links = loginLinks.shadowRoot.querySelectorAll('a');
      expect(links.length).toBe(2);
    });
  });

  describe('validação', () => {
    it('deve mostrar erros de validação ao submit com campos inválidos', async () => {
      await createMfeLogin();

      el._handleFormSubmit(
        new CustomEvent('login-form:submit', {
          detail: { email: '', password: '' },
        })
      );
      await el.updateComplete;

      expect(el.errors.length).toBeGreaterThan(0);
    });
  });

  describe('submit sucesso', () => {
    it('deve disparar mfe-login:success em login bem-sucedido', async () => {
      await createMfeLogin();

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

      el._handleFormSubmit(
        new CustomEvent('login-form:submit', {
          detail: { email: 'admin@mfe.dev', password: '123456' },
        })
      );

      const event = await eventPromise;
      expect(event.detail.user.email).toBe('admin@mfe.dev');
      expect(event.detail.token).toBe('mock-jwt-token');
    });
  });

  describe('submit erro', () => {
    it('deve disparar mfe-login:error em login com falha', async () => {
      await createMfeLogin();

      el._authService = {
        login: vi.fn().mockResolvedValue({
          success: false,
          error: 'Credenciais inválidas',
        }),
      };

      const eventPromise = new Promise((resolve) => {
        el.addEventListener('mfe-login:error', (e) => resolve(e));
      });

      el._handleFormSubmit(
        new CustomEvent('login-form:submit', {
          detail: { email: 'wrong@email.com', password: 'wrongpass' },
        })
      );

      const event = await eventPromise;
      expect(event.detail.message).toBe('Credenciais inválidas');
    });

    it('deve exibir mensagem de erro global na falha', async () => {
      await createMfeLogin();

      el._authService = {
        login: vi.fn().mockResolvedValue({
          success: false,
          error: 'Credenciais inválidas',
        }),
      };

      await el._handleFormSubmit(
        new CustomEvent('login-form:submit', {
          detail: { email: 'wrong@email.com', password: 'wrongpass' },
        })
      );
      await el.updateComplete;

      expect(el.error).toBe('Credenciais inválidas');
      const errorDiv = el.shadowRoot.querySelector('.global-error');
      expect(errorDiv).not.toBeNull();
      expect(errorDiv.textContent.trim()).toBe('Credenciais inválidas');
    });
  });

  describe('loading state', () => {
    it('deve ativar loading durante o submit', async () => {
      await createMfeLogin();

      let resolveLogin;
      el._authService = {
        login: vi.fn().mockImplementation(
          () => new Promise((resolve) => { resolveLogin = resolve; })
        ),
      };

      el._handleFormSubmit(
        new CustomEvent('login-form:submit', {
          detail: { email: 'admin@mfe.dev', password: '123456' },
        })
      );

      // Durante a requisição, loading deve ser true
      expect(el.loading).toBe(true);

      // Resolve para finalizar
      resolveLogin({ success: true, user: {}, token: '' });
      await el.updateComplete;

      expect(el.loading).toBe(false);
    });
  });

  describe('eventos de navegação', () => {
    it('deve disparar mfe-login:forgot-password ao chamar _handleForgot', async () => {
      await createMfeLogin();

      const eventPromise = new Promise((resolve) => {
        el.addEventListener('mfe-login:forgot-password', (e) => resolve(e));
      });

      el._handleForgot();

      const event = await eventPromise;
      expect(event.type).toBe('mfe-login:forgot-password');
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
    });

    it('deve disparar mfe-login:register ao chamar _handleRegister', async () => {
      await createMfeLogin();

      const eventPromise = new Promise((resolve) => {
        el.addEventListener('mfe-login:register', (e) => resolve(e));
      });

      el._handleRegister();

      const event = await eventPromise;
      expect(event.type).toBe('mfe-login:register');
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
    });
  });

  describe('limpar erros', () => {
    it('deve limpar erros anteriores ao tentar novo submit', async () => {
      await createMfeLogin();

      // Primeiro submit inválido para gerar erros
      el._handleFormSubmit(
        new CustomEvent('login-form:submit', {
          detail: { email: '', password: '' },
        })
      );
      await el.updateComplete;
      expect(el.errors.length).toBeGreaterThan(0);

      // Segundo submit válido — erros devem ser limpos
      el._authService = {
        login: vi.fn().mockResolvedValue({
          success: true,
          user: { id: '1', name: 'Admin', email: 'admin@mfe.dev' },
          token: 'mock-jwt-token',
        }),
      };

      await el._handleFormSubmit(
        new CustomEvent('login-form:submit', {
          detail: { email: 'admin@mfe.dev', password: '123456' },
        })
      );
      await el.updateComplete;

      expect(el.errors).toHaveLength(0);
      expect(el.error).toBe('');
    });
  });
});
