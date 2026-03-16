import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { PaymentEvent } from './entities/payment-event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEvent])],
  controllers: [WebhookController],
  providers: [WebhookService],
  exports: [WebhookService],
})
export class WebhookModule {}
