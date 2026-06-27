/**
 * @typedef {Object} AuthResult
 * @property {boolean} success
 * @property {{ id: string, name: string, email: string }} [user]
 * @property {string} [token]
 * @property {string} [error]
 */

/**
 * Factory function para criar um objeto de credenciais.
 *
 * @param {string} email
 * @param {string} password
 * @returns {{ email: string, password: string }}
 */
export function createCredentials(email, password) {
  return { email, password };
}
