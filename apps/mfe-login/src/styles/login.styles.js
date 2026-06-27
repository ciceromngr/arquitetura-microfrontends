import { css } from 'lit';

/**
 * Estilos do componente mfe-login.
 * Utiliza CSS Custom Properties para integração com o shell (theming).
 *
 * CSS Custom Properties API (todas opcionais, com fallback defaults):
 *
 * | Custom Property              | Descrição                  | Fallback        |
 * |------------------------------|----------------------------|-----------------
 * | --mfe-font-family            | Fonte principal            | system-ui       |
 * | --mfe-color-text             | Cor do texto               | #1a1a1a         |
 * | --mfe-color-heading          | Cor dos títulos            | #111111         |
 * | --mfe-color-label            | Cor dos labels             | #333333         |
 * | --mfe-color-primary          | Cor primária (botão, link) | #0066cc         |
 * | --mfe-color-primary-hover    | Hover do botão             | #0052a3         |
 * | --mfe-color-primary-text     | Texto sobre primária       | #ffffff         |
 * | --mfe-color-primary-alpha    | Focus ring (alpha)         | rgba(0,102,204,0.2) |
 * | --mfe-color-error            | Cor de erro                | #cc0000         |
 * | --mfe-color-error-bg         | Fundo do alerta de erro    | #fff0f0         |
 * | --mfe-color-surface          | Fundo do card              | #ffffff         |
 * | --mfe-color-border           | Borda dos inputs           | #cccccc         |
 * | --mfe-border-radius          | Radius do card             | 8px             |
 * | --mfe-border-radius-sm       | Radius dos inputs/botão    | 4px             |
 * | --mfe-shadow-card            | Sombra do card             | 0 2px 8px ...   |
 * | --mfe-spacing-sm             | Espaçamento pequeno        | 1rem            |
 * | --mfe-spacing-md             | Espaçamento médio          | 1.5rem          |
 * | --mfe-spacing-lg             | Espaçamento grande         | 2rem            |
 *
 * O shell mapeia seus tokens globais para estas variáveis via seletor `mfe-login {}`.
 * CSS Custom Properties são herdadas através do Shadow DOM boundary.
 */
export const loginStyles = css`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    font-family: var(--mfe-font-family, system-ui, sans-serif);
    color: var(--mfe-color-text, #1a1a1a);
  }

  .login-card {
    background: var(--mfe-color-surface, #ffffff);
    border-radius: var(--mfe-border-radius, 8px);
    box-shadow: var(--mfe-shadow-card, 0 2px 8px rgba(0, 0, 0, 0.1));
    padding: var(--mfe-spacing-lg, 2rem);
    width: 100%;
    max-width: 400px;
  }

  .login-card h2 {
    margin: 0 0 var(--mfe-spacing-md, 1.5rem);
    font-size: 1.5rem;
    text-align: center;
    color: var(--mfe-color-heading, #111111);
  }

  .form-group {
    margin-bottom: var(--mfe-spacing-sm, 1rem);
  }

  label {
    display: block;
    margin-bottom: 0.25rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--mfe-color-label, #333333);
  }

  input {
    width: 100%;
    padding: 0.625rem 0.75rem;
    border: 1px solid var(--mfe-color-border, #cccccc);
    border-radius: var(--mfe-border-radius-sm, 4px);
    font-size: 1rem;
    box-sizing: border-box;
    transition: border-color 0.2s;
  }

  input:focus {
    outline: none;
    border-color: var(--mfe-color-primary, #0066cc);
    box-shadow: 0 0 0 2px var(--mfe-color-primary-alpha, rgba(0, 102, 204, 0.2));
  }

  input[aria-invalid='true'] {
    border-color: var(--mfe-color-error, #cc0000);
  }

  .error-message {
    color: var(--mfe-color-error, #cc0000);
    font-size: 0.8125rem;
    margin-top: 0.25rem;
    min-height: 1.25rem;
  }

  .btn-submit {
    width: 100%;
    padding: 0.75rem;
    margin-top: var(--mfe-spacing-sm, 1rem);
    background: var(--mfe-color-primary, #0066cc);
    color: var(--mfe-color-primary-text, #ffffff);
    border: none;
    border-radius: var(--mfe-border-radius-sm, 4px);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, opacity 0.2s;
  }

  .btn-submit:hover:not(:disabled) {
    background: var(--mfe-color-primary-hover, #0052a3);
  }

  .btn-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .btn-submit--loading {
    position: relative;
    color: transparent;
  }

  .btn-submit--loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1.25rem;
    height: 1.25rem;
    margin: -0.625rem 0 0 -0.625rem;
    border: 2px solid var(--mfe-color-primary-text, #ffffff);
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .global-error {
    background: var(--mfe-color-error-bg, #fff0f0);
    color: var(--mfe-color-error, #cc0000);
    padding: 0.75rem;
    border-radius: var(--mfe-border-radius-sm, 4px);
    font-size: 0.875rem;
    margin-bottom: var(--mfe-spacing-sm, 1rem);
    text-align: center;
  }

  .login-links {
    display: flex;
    justify-content: space-between;
    margin-top: var(--mfe-spacing-md, 1.5rem);
    font-size: 0.875rem;
  }

  .login-links a {
    color: var(--mfe-color-primary, #0066cc);
    text-decoration: none;
    cursor: pointer;
  }

  .login-links a:hover {
    text-decoration: underline;
  }
`;
