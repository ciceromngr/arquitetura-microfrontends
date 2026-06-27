import { LitElement, html } from 'lit';
import { loginStyles } from '../styles/login.styles.js';

/**
 * Componente interno de links de navegação.
 * Renderiza "Esqueci minha senha" e "Cadastre-se".
 *
 * @fires login-links:forgot
 * @fires login-links:register
 */
export class LoginLinks extends LitElement {
  static styles = [loginStyles];

  /**
   * Emite evento para "Esqueci minha senha".
   * @param {Event} e
   */
  _handleForgot(e) {
    e.preventDefault();
    this.dispatchEvent(
      new CustomEvent('login-links:forgot', {
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Emite evento para "Cadastre-se".
   * @param {Event} e
   */
  _handleRegister(e) {
    e.preventDefault();
    this.dispatchEvent(
      new CustomEvent('login-links:register', {
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div class="login-links">
        <a href="#" @click=${this._handleForgot}>Esqueci minha senha</a>
        <a href="#" @click=${this._handleRegister}>Cadastre-se</a>
      </div>
    `;
  }
}

customElements.define('login-links', LoginLinks);
