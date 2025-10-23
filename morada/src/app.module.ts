import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SaqueService } from './api/saque/saque.service';
import { SaqueController } from './api/saque/saque.controller';
import { SaqueModule } from './api/saque/saque.module';

@Module({
  imports: [SaqueModule],
  controllers: [AppController, SaqueController],
  providers: [AppService, SaqueService],
})
export class AppModule {}
