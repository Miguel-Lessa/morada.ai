import { Body, Controller, Post } from '@nestjs/common';
import { SaqueService } from './saque.service';
import { error } from 'console';


@Controller('/saque')
export class SaqueController {
    constructor (private readonly saqueService: SaqueService) {}

    // recebe valor do saque
    @Post ()
    saque(@Body() body: {valor: number }) {
        const { valor } = body;

        // tratamento de erros caso o valor seja diferente de number, seja negativo, ou diferente de um inteiro
        // também adicionei a funcionalidade de verificar caso o valor de saque exceda o valor disponível no caixa
        switch (true) {
            // case valor > totalDisponível:
                //return { error: "Valor inávlido: Excede o total de dinheiro armazenado neste caixa eletrônico, tente em outro caixa, ou chame um atendende"}
            case typeof valor !== 'number':
                return { error: 'Valor inválido: deve ser um número.' };
            case valor <= 0:
                return { error: 'Valor inválido: insira um valor positivo.' };
            case !Number.isInteger(valor):
                return { error: 'Valor inválido: deve ser um inteiro.' };
            default:
                break;
        }


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
    }
}
