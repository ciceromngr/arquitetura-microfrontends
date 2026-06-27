import { LitElement, html } from 'lit';
import { loginStyles } from '../styles/login.styles.js';
import { validateCredentials } from '../domain/validators/credential-validator.js';
import { AuthServiceMock } from '../infrastructure/auth-service-mock.js';
import './login-form.js';
import './login-links.js';

/**
 * Componente orquestrador do MFE de login.
 * Gerencia estado, validação e comunicação com AuthService.
 * Despacha Custom Events públicos para o shell.
 *
 * @fires mfe-login:success - Login bem-sucedido ({ user, token })
 * @fires mfe-login:error - Erro de autenticação ({ message })
 * @fires mfe-login:forgot-password - Click em "Esqueci senha" ({})
 * @fires mfe-login:register - Click em "Cadastre-se" ({})
 */
export class MfeLogin extends LitElement {
  static properties = {
    loading: { type: Boolean },
    error: { type: String },
    errors: { type: Array },
  };

  static styles = [loginStyles];

  constructor() {
    super();
    /** @type {boolean} */
    this.loading = false;
    /** @type {string} */
    this.error = '';
    /** @type {Array<{ field: string, message: string }>} */
    this.errors = [];
    /** @type {AuthServiceMock} */
    this._authService = new AuthServiceMock();
  }

  /**
   * Handler do evento login-form:submit.
   * Valida credenciais e chama AuthService se válido.
   * @param {CustomEvent} e
   */
  async _handleFormSubmit(e) {
    const { email, password } = e.detail;

    // Limpa erros anteriores
    this.error = '';
    this.errors = [];

    // Validação client-side
    const validation = validateCredentials({ email, password });
    if (!validation.valid) {
      this.errors = validation.errors;
      return;
    }

    // Submit — loading state
    this.loading = true;

    try {
      const result = await this._authService.login({ email, password });

      if (result.success) {
        this._dispatchEvent('mfe-login:success', {
          user: result.user,
          token: result.token,
        });
      } else {
        this.error = result.error || 'Credenciais inválidas';
        this._dispatchEvent('mfe-login:error', {
          message: this.error,
        });
      }
    } catch (err) {
      this.error = 'Erro inesperado. Tente novamente.';
      this._dispatchEvent('mfe-login:error', {
        message: this.error,
      });
    } finally {
      this.loading = false;
    }
  }

  /**
   * Handler do evento login-links:forgot.
   */
  _handleForgot() {
    this._dispatchEvent('mfe-login:forgot-password', {});
  }

  /**
   * Handler do evento login-links:register.
   */
  _handleRegister() {
    this._dispatchEvent('mfe-login:register', {});
  }

  /**
   * Despacha Custom Event com bubbles + composed para atravessar Shadow DOM.
   * @param {string} name
   * @param {object} detail
   */
  _dispatchEvent(name, detail) {
    this.dispatchEvent(
      new CustomEvent(name, {
        detail,
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div class="login-card">
        <h2>Login</h2>

        ${this.error
          ? html`<div class="global-error" role="alert" aria-live="assertive">
              ${this.error}
            </div>`
          : ''}

        <login-form
          .loading=${this.loading}
          .errors=${this.errors}
          @login-form:submit=${this._handleFormSubmit}
        ></login-form>

        <login-links
          @login-links:forgot=${this._handleForgot}
          @login-links:register=${this._handleRegister}
        ></login-links>
      </div>
    `;
  }
}

customElements.define('mfe-login', MfeLogin);
