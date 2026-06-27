import { describe, it, expect } from 'vitest';
import { createCredentials } from '../domain/entities/credentials.js';

describe('createCredentials', () => {
  it('deve retornar objeto com email e password', () => {
    const result = createCredentials('user@test.com', 'senha123');

    expect(result).toEqual({ email: 'user@test.com', password: 'senha123' });
  });

  it('deve lidar com strings vazias', () => {
    const result = createCredentials('', '');

    expect(result).toEqual({ email: '', password: '' });
  });

  it('deve lidar com caracteres especiais no email', () => {
    const result = createCredentials('user+tag@sub.domain.com', 'p@ss!w0rd');

    expect(result).toEqual({
      email: 'user+tag@sub.domain.com',
      password: 'p@ss!w0rd',
    });
  });

  it('deve retornar exatamente a shape { email, password }', () => {
    const result = createCredentials('a@b.com', '123456');

    expect(Object.keys(result)).toHaveLength(2);
    expect(result).toHaveProperty('email');
    expect(result).toHaveProperty('password');
  });
});
