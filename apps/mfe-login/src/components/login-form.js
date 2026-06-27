import { LitElement, html } from 'lit';
import { loginStyles } from '../styles/login.styles.js';

/**
 * Componente interno de formulário de login.
 * Renderiza inputs de email e senha + botão submit.
 * Emite evento `login-form:submit` com { email, password }.
 *
 * @fires login-form:submit
 */
export class LoginForm extends LitElement {
  static properties = {
    loading: { type: Boolean },
    errors: { type: Array },
  };

  static styles = [loginStyles];

  constructor() {
    super();
    this.loading = false;
    this.errors = [];
  }

  /**
   * Retorna a mensagem de erro para um campo específico.
   * @param {string} field
   * @returns {string}
   */
  _getFieldError(field) {
    const error = this.errors.find((e) => e.field === field);
    return error ? error.message : '';
  }

  /**
   * Handler do submit do formulário.
   * Previne default e emite evento com credenciais.
   * @param {Event} e
   */
  _handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const email = form.querySelector('#email').value;
    const password = form.querySelector('#password').value;

    this.dispatchEvent(
      new CustomEvent('login-form:submit', {
        detail: { email, password },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    const emailError = this._getFieldError('email');
    const passwordError = this._getFieldError('password');

    return html`
      <form @submit=${this._handleSubmit} novalidate>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            ?disabled=${this.loading}
            aria-invalid=${emailError ? 'true' : 'false'}
            aria-describedby="email-error"
          />
          <div
            id="email-error"
            class="error-message"
            aria-live="polite"
          >${emailError}</div>
        </div>

        <div class="form-group">
          <label for="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            ?disabled=${this.loading}
            aria-invalid=${passwordError ? 'true' : 'false'}
            aria-describedby="password-error"
          />
          <div
            id="password-error"
            class="error-message"
            aria-live="polite"
          >${passwordError}</div>
        </div>

        <button
          type="submit"
          class="btn-submit ${this.loading ? 'btn-submit--loading' : ''}"
          ?disabled=${this.loading}
        >
          Entrar
        </button>
      </form>
    `;
  }
}

customElements.define('login-form', LoginForm);
