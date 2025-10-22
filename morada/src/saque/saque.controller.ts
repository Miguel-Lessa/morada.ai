import { Body, Controller, Post } from '@nestjs/common';
import { SaqueService } from './saque.service';


@Controller('saque')
export class SaqueController {
    constructor (private readonly saqueService: SaqueService) {}

    @Post ()
    saque(@Body() body: {valor: number }) {
        const { valor } = body;

        //tratamento de erros
        if (typeof valor !== 'number' || valor <=0 || !Number.isInteger(valor)) {
            return { error : 'Valor inválido ou impossível de atender com as cédulas disponíveis' }
        }

        const result = this.saqueService.calculateWithdraw(valor);
        return result;
    }
}
