import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentEvent } from './entities/payment-event.entity';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';

type PaystackWebhookBody = {
  event: string;
  data?: {
    reference?: string;
    [key: string]: any;
  };
};

@Injectable()
export class WebhookService {
  constructor(
    @InjectRepository(PaymentEvent)
    private paymentEventRepo: Repository<PaymentEvent>,
    private configService: ConfigService,
  ) {}

  async handlePaystackWebhook(body: PaystackWebhookBody, signature: string) {
    const secret = this.configService.get<string>('PAYSTACK_SECRET_KEY');

    // HMAC verification
    const hash = crypto
      .createHmac('sha512', secret!)
      .update(JSON.stringify(body))
      .digest('hex');

    if (hash !== signature) {
      throw new BadRequestException('Invalid signature');
    }

    const event = body.event;
    const reference = body.data?.reference;

    if (!reference) {
      throw new BadRequestException('Missing reference');
    }

    const existing = await this.paymentEventRepo.findOne({
      where: { reference },
    });
    if (existing) {
      return { status: 'already_processed' };
    }

    const paymentEvent = this.paymentEventRepo.create({
      reference,
      event,
      data: body.data || {},
      processed: false,
      status: 'pending',
    });
    await this.paymentEventRepo.save(paymentEvent);

    paymentEvent.processed = true;
    paymentEvent.status = event === 'charge.success' ? 'success' : 'failed';
    await this.paymentEventRepo.save(paymentEvent);

    return { status: 'success', message: 'Webhook processed successfully' };
  }

  // ────── RECONCILIATION CRON JOB ──────
  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async reconcilePendingPayments() {
    console.log('🔄 Running daily reconciliation job...');

    const pending = await this.paymentEventRepo.find({
      where: { processed: false },
    });

    if (pending.length === 0) {
      console.log('✅ No pending events to reconcile');
      return;
    }

    // In a real app you would call Paystack verify endpoint here
    pending.forEach((event) => {
      event.processed = true;
      event.status = 'reconciled_manually';
    });

    await this.paymentEventRepo.save(pending);
    console.log(`✅ Reconciled ${pending.length} pending events`);
  }
}
