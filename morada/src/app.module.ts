import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SaqueService } from './saque/saque.service';
import { SaqueController } from './saque/saque.controller';
import { SaqueModule } from './saque/saque.module';

@Module({
  imports: [SaqueModule],
  controllers: [AppController, SaqueController],
  providers: [AppService, SaqueService],
})
export class AppModule {}
