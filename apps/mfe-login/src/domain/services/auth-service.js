/**
 * @typedef {import('../entities/credentials.js').AuthResult} AuthResult
 */

/**
 * Classe base que define o contrato para serviços de autenticação.
 * Implementações concretas devem estender esta classe e sobrescrever o método login().
 */
export class AuthService {
  /**
   * Realiza autenticação com as credenciais fornecidas.
   *
   * @param {{ email: string, password: string }} credentials
   * @returns {Promise<AuthResult>}
   */
  async login(credentials) {
    throw new Error('AuthService.login() must be implemented');
  }
}
