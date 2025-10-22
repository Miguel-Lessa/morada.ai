import { Injectable } from '@nestjs/common';

@Injectable()
export class SaqueService {
  private readonly notas: number[] = [100, 50, 20, 10, 5, 2];

  calculateWithdraw(amount: number): { [key: number]: number } {
    const result: { [key: number]: number } = {};

    for (const note of this.notas) {
      const quantity = Math.floor(amount / note);
      result[note] = quantity;
      amount -= quantity * note;
    }

    return result;
  }
}
