import { AuthService } from '../domain/services/auth-service.js';

/**
 * @typedef {import('../domain/entities/credentials.js').AuthResult} AuthResult
 */

/**
 * Credenciais válidas para o mock.
 * @type {{ email: string, password: string }}
 */
const VALID_CREDENTIALS = {
  email: 'admin@mfe.dev',
  password: '123456',
};

/**
 * Delay simulado para a chamada assíncrona (ms).
 * @type {number}
 */
const MOCK_DELAY_MS = 800;

/**
 * Implementação mock do AuthService para desenvolvimento.
 * Simula autenticação assíncrona com credenciais fixas.
 *
 * - Retorna sucesso para admin@mfe.dev / 123456
 * - Retorna erro para qualquer outra combinação
 *
 * @extends {AuthService}
 */
export class AuthServiceMock extends AuthService {
  /**
   * Simula login assíncrono com delay artificial.
   *
   * @param {{ email: string, password: string }} credentials
   * @returns {Promise<AuthResult>}
   */
  async login(credentials) {
    await this._simulateDelay();

    if (
      credentials.email === VALID_CREDENTIALS.email &&
      credentials.password === VALID_CREDENTIALS.password
    ) {
      return {
        success: true,
        user: { id: '1', name: 'Admin', email: VALID_CREDENTIALS.email },
        token: 'mock-jwt-token',
      };
    }

    return {
      success: false,
      error: 'Credenciais inválidas',
    };
  }

  /**
   * Simula latência de rede.
   *
   * @returns {Promise<void>}
   * @private
   */
  async _simulateDelay() {
    return new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
  }
}
