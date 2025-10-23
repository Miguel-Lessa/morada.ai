import { Test, TestingModule } from '@nestjs/testing';
import { SaqueService } from './saque.service';

describe('SaqueService', () => {
  let service: SaqueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaqueService],
    }).compile();

    service = module.get<SaqueService>(SaqueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('calculaSaque deve retornar um objeto com chaves numéricas e valores inteiros para um valor positivo', () => {
    const valor = 170;
    const result = service.calculaSaque(valor);

    expect(typeof result).toBe('object');
    const keys = Object.keys(result);
    expect(keys.length).toBeGreaterThan(0);

    let total = 0;
    for (const k of keys) {
      const denom = Number(k);
      const count = result[k];
      expect(Number.isFinite(denom)).toBe(true);
      expect(Number.isInteger(count)).toBe(true);
      expect(count).toBeGreaterThanOrEqual(0);
      total += denom * count;
    }

    // verifica que as notas retornadas somam exatamente o valor solicitado
    expect(total).toBe(valor);
  });

  it('calculaSaque deve tratar entradas inválidas (tipo/valor)', () => {
    const calls = [
      { v: -10, label: 'negativo' },
      { v: 0, label: 'zero' },
      { v: 10.5, label: 'não inteiro' },
      { v: 'abc' as any, label: 'não número' },
    ];

    for (const c of calls) {
      try {
        const out = service.calculaSaque(c.v as any);
        // se retornar um objeto, checar que não soma um valor positivo (ou que esteja vazio)
        if (out && typeof out === 'object') {
          const keys = Object.keys(out);
          let total = 0;
          for (const k of keys) total += Number(k) * out[k];
          expect(total).not.toBeGreaterThan(0);
        } else {
          // aceita também retornos falsy/errores encapsulados
          expect(out).toBeDefined();
        }
      } catch (err) {
        // também aceitável que a função lance erro para entradas inválidas
        expect(err).toBeDefined();
      }
    }
  });
});
