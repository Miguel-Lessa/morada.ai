import { Injectable } from '@nestjs/common';

@Injectable()
export class SaqueService {
  //definição de valores de notas
  private readonly notas: number[] = [100, 50, 20, 10, 5, 2];

  //calculo do saque utilizando numero como key
  calculaSaque(amount: number): { [key: number]: number } {
    // validação de entrada
    if (typeof amount !== 'number' || !Number.isInteger(amount) || amount <= 0) {
      throw new Error('Valor inválido: deve ser um inteiro positivo.');
    }

    const resultado: { [key: number]: number } = {};
    let restante = amount;

    // enquanto o array de notas for percorrido,
    // calcula se a quantidade atual "cabe" no valor restante.
    for (const note of this.notas) {
      const quantidade = Math.floor(restante / note);
      resultado[note] = quantidade;
      restante -= quantidade * note;
    }

    // se sobrar valor que não pode ser formado pelas notas disponíveis
    if (restante !== 0) {
      throw new Error('Não é possível sacar o valor solicitado com as cédulas disponíveis.');
    }

    return resultado;
  }
}