import { Module } from '@nestjs/common';
import { SaqueService } from './saque.service';
import { SaqueController } from './saque.controller';

@Module({
    controllers: [SaqueController],
    providers: [SaqueService],
})
export class SaqueModule {}
    
