import { describe, it, expect } from 'vitest';
import { validateCredentials } from '../domain/validators/credential-validator.js';

describe('validateCredentials', () => {
  describe('happy path', () => {
    it('deve retornar valid: true para email válido e senha >= 6 chars', () => {
      const result = validateCredentials({
        email: 'user@test.com',
        password: '123456',
      });

      expect(result).toEqual({ valid: true, errors: [] });
    });
  });

  describe('email — obrigatório', () => {
    it('deve retornar erro quando email é vazio', () => {
      const result = validateCredentials({ email: '', password: '123456' });

      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual({
        field: 'email',
        message: 'Email é obrigatório',
      });
    });

    it('deve retornar erro quando email é null', () => {
      const result = validateCredentials({ email: null, password: '123456' });

      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual({
        field: 'email',
        message: 'Email é obrigatório',
      });
    });

    it('deve retornar erro quando email é undefined', () => {
      const result = validateCredentials({
        email: undefined,
        password: '123456',
      });

      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual({
        field: 'email',
        message: 'Email é obrigatório',
      });
    });
  });

  describe('email — formato', () => {
    it('deve rejeitar "notanemail"', () => {
      const result = validateCredentials({
        email: 'notanemail',
        password: '123456',
      });

      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual({
        field: 'email',
        message: 'Formato de email inválido',
      });
    });

    it('deve rejeitar "@"', () => {
      const result = validateCredentials({ email: '@', password: '123456' });

      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual({
        field: 'email',
        message: 'Formato de email inválido',
      });
    });

    it('deve rejeitar "a@"', () => {
      const result = validateCredentials({ email: 'a@', password: '123456' });

      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual({
        field: 'email',
        message: 'Formato de email inválido',
      });
    });

    it('deve rejeitar "@b.com"', () => {
      const result = validateCredentials({
        email: '@b.com',
        password: '123456',
      });

      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual({
        field: 'email',
        message: 'Formato de email inválido',
      });
    });
  });

  describe('password — obrigatória', () => {
    it('deve retornar erro quando password é vazia', () => {
      const result = validateCredentials({
        email: 'user@test.com',
        password: '',
      });

      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual({
        field: 'password',
        message: 'Senha é obrigatória',
      });
    });

    it('deve retornar erro quando password é null', () => {
      const result = validateCredentials({
        email: 'user@test.com',
        password: null,
      });

      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual({
        field: 'password',
        message: 'Senha é obrigatória',
      });
    });

    it('deve retornar erro quando password é undefined', () => {
      const result = validateCredentials({
        email: 'user@test.com',
        password: undefined,
      });

      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual({
        field: 'password',
        message: 'Senha é obrigatória',
      });
    });
  });

  describe('password — tamanho mínimo', () => {
    it('deve rejeitar senha com 3 chars', () => {
      const result = validateCredentials({
        email: 'user@test.com',
        password: 'abc',
      });

      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual({
        field: 'password',
        message: 'Senha deve ter no mínimo 6 caracteres',
      });
    });

    it('deve rejeitar senha com 5 chars', () => {
      const result = validateCredentials({
        email: 'user@test.com',
        password: '12345',
      });

      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual({
        field: 'password',
        message: 'Senha deve ter no mínimo 6 caracteres',
      });
    });
  });

  describe('múltiplos erros', () => {
    it('deve retornar erros de ambos os campos quando inválidos', () => {
      const result = validateCredentials({ email: '', password: '' });

      expect(result.valid).toBe(false);
      expect(result.errors).toHaveLength(2);
      expect(result.errors).toContainEqual({
        field: 'email',
        message: 'Email é obrigatório',
      });
      expect(result.errors).toContainEqual({
        field: 'password',
        message: 'Senha é obrigatória',
      });
    });
  });

  describe('edge cases', () => {
    it('deve rejeitar email contendo apenas espaços', () => {
      const result = validateCredentials({
        email: '   ',
        password: '123456',
      });

      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual({
        field: 'email',
        message: 'Email é obrigatório',
      });
    });

    it('deve rejeitar password contendo apenas espaços', () => {
      const result = validateCredentials({
        email: 'user@test.com',
        password: '   ',
      });

      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual({
        field: 'password',
        message: 'Senha é obrigatória',
      });
    });
  });
});
