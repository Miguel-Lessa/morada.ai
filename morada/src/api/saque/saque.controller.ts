import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { SaqueService } from './saque.service';

@Controller('saque')
export class SaqueController {
    constructor (private readonly saqueService: SaqueService) {}

    // recebe valor do saque
    @Post ()
    saque(@Body() body: {valor: number }) {
        const { valor } = body ?? {};

        if (typeof valor === 'undefined') {
            throw new BadRequestException('Campo "valor" é obrigatório.');
        }

        try {
            //chamada do método responsável por calcular o valor do saque
            const result = this.saqueService.calculaSaque(valor);

            const notasOrdenadas = Object.keys(result)
              .map(Number)
              .sort((a, b) => b - a);

            const outputOrdenado: Record<string, number> = {};
            for (const key of notasOrdenadas) {
              outputOrdenado[String(key)] = result[String(key)];
            }
            return outputOrdenado;
        } catch (err: any) {
            throw new BadRequestException(err?.message ?? 'Valor de saque inválido.');
        }
    }
}