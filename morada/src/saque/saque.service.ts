import { Injectable } from '@nestjs/common';

@Injectable()
export class SaqueService {
  //definição de valores de notas
  private readonly notas: number[] = [100, 50, 20, 10, 5, 2];

  //calculo do saque utilizando numero como key
  calculaSaque(amount: number): { [key: number]: number } {
    const resultado: { [key: number]: number } = {};

    //enquanto o array de notas for percorrido, 
    //calcula se a quantidade atual "cabe" no valor restante.
    for (const note of this.notas) {
      const quantidade = Math.floor(amount / note);
      resultado[note] = quantidade;
      amount -= quantidade * note;
    }

    return resultado;
  }
}
