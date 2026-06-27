import { describe, it, expect } from 'vitest';
import { AuthServiceMock } from '../infrastructure/auth-service-mock.js';
import { AuthService } from '../domain/services/auth-service.js';

describe('AuthServiceMock', () => {
  /**
   * Usa delay reduzido internamente para testes rápidos.
   * O mock real tem 800ms de delay; aqui testamos o comportamento, não o tempo.
   */

  it('deve ser instância de AuthService', () => {
    const service = new AuthServiceMock();

    expect(service).toBeInstanceOf(AuthService);
  });

  it('deve retornar uma Promise (login é assíncrono)', () => {
    const service = new AuthServiceMock();
    const result = service.login({ email: 'admin@mfe.dev', password: '123456' });

    expect(result).toBeInstanceOf(Promise);
  });

  describe('credenciais válidas (admin@mfe.dev / 123456)', () => {
    it('deve retornar success: true com user e token', async () => {
      const service = new AuthServiceMock();
      const result = await service.login({
        email: 'admin@mfe.dev',
        password: '123456',
      });

      expect(result.success).toBe(true);
      expect(result.user).toEqual({
        id: '1',
        name: 'Admin',
        email: 'admin@mfe.dev',
      });
      expect(result.token).toBe('mock-jwt-token');
    });
  });

  describe('credenciais inválidas', () => {
    it('deve retornar erro para email incorreto', async () => {
      const service = new AuthServiceMock();
      const result = await service.login({
        email: 'wrong@email.com',
        password: '123456',
      });

      expect(result.success).toBe(false);
      expect(result.error).toBe('Credenciais inválidas');
    });

    it('deve retornar erro para password incorreta', async () => {
      const service = new AuthServiceMock();
      const result = await service.login({
        email: 'admin@mfe.dev',
        password: 'wrongpass',
      });

      expect(result.success).toBe(false);
      expect(result.error).toBe('Credenciais inválidas');
    });

    it('deve retornar erro quando ambos estão incorretos', async () => {
      const service = new AuthServiceMock();
      const result = await service.login({
        email: 'wrong@email.com',
        password: 'wrongpass',
      });

      expect(result.success).toBe(false);
      expect(result.error).toBe('Credenciais inválidas');
    });
  });
});

describe('AuthService (classe base)', () => {
  it('deve lançar erro ao chamar login() diretamente', async () => {
    const service = new AuthService();

    await expect(
      service.login({ email: 'a@b.com', password: '123456' })
    ).rejects.toThrow('AuthService.login() must be implemented');
  });
});
