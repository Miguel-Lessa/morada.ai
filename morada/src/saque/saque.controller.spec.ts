import { Test, TestingModule } from '@nestjs/testing';
import { SaqueController } from './saque.controller';
import { SaqueService } from './saque.service';

describe('SaqueController', () => {
  let controller: SaqueController;

  const mockSaqueService = {
    calculaSaque: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaqueController],
      providers: [{ provide: SaqueService, useValue: mockSaqueService }],
    }).compile();

    controller = module.get<SaqueController>(SaqueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('deve retornar erro quando o valor não for um número', () => {
    const res = controller.saque({ valor: 'abc' as any });
    expect(res).toEqual({ error: 'Valor inválido: deve ser um número.' });
    expect(mockSaqueService.calculaSaque).not.toHaveBeenCalled();
  });

  it('deve retornar erro caso o valor não seja positivo', () => {
    const res = controller.saque({ valor: 0 });
    expect(res).toEqual({ error: 'Valor inválido: insira um valor positivo.' });
    expect(mockSaqueService.calculaSaque).not.toHaveBeenCalled();
  });

  it('deve retornar erro quando o valor não for um inteiro', () => {
    const res = controller.saque({ valor: 10.5 });
    expect(res).toEqual({ error: 'Valor inválido: deve ser um inteiro.' });
    expect(mockSaqueService.calculaSaque).not.toHaveBeenCalled();
  });

  it('deve chamar calcula saque e retornar as notas em ordem', () => {
    const serviceOutput = { '10': 1, '100': 1, '50': 2 };
    mockSaqueService.calculaSaque.mockReturnValue(serviceOutput);

    const res = controller.saque({ valor: 170 });

    expect(mockSaqueService.calculaSaque).toHaveBeenCalledWith(170);
    expect(res).toEqual({ '100': 1, '50': 2, '10': 1 });
  });
});
