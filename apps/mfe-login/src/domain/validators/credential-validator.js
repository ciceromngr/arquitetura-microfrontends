/**
 * Regex para validação de formato de email.
 * @type {RegExp}
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Comprimento mínimo exigido para a senha.
 * @type {number}
 */
const PASSWORD_MIN_LENGTH = 6;

/**
 * Valida as credenciais de login (email e senha).
 *
 * Regras:
 * - Email é obrigatório
 * - Email deve ter formato válido (regex)
 * - Senha é obrigatória
 * - Senha deve ter no mínimo 6 caracteres
 *
 * @param {{ email: string, password: string }} credentials
 * @returns {{ valid: boolean, errors: Array<{ field: string, message: string }> }}
 */
export function validateCredentials(credentials) {
  /** @type {Array<{ field: string, message: string }>} */
  const errors = [];

  // Validação de email
  if (!credentials.email || credentials.email.trim() === '') {
    errors.push({ field: 'email', message: 'Email é obrigatório' });
  } else if (!EMAIL_REGEX.test(credentials.email)) {
    errors.push({ field: 'email', message: 'Formato de email inválido' });
  }

  // Validação de senha
  if (!credentials.password || credentials.password.trim() === '') {
    errors.push({ field: 'password', message: 'Senha é obrigatória' });
  } else if (credentials.password.length < PASSWORD_MIN_LENGTH) {
    errors.push({
      field: 'password',
      message: `Senha deve ter no mínimo ${PASSWORD_MIN_LENGTH} caracteres`,
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
