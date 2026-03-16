import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentEvent } from './entities/payment-event.entity';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

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

    // HMAC verification (Paystack standard)
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

    // Idempotency check
    const existing = await this.paymentEventRepo.findOne({
      where: { reference },
    });

    if (existing) {
      return { status: 'already_processed' };
    }

    // Save raw event
    const paymentEvent = this.paymentEventRepo.create({
      reference,
      event,
      data: body.data || {},
      processed: false,
      status: 'pending',
    });
    await this.paymentEventRepo.save(paymentEvent);

    // Basic processing (expand later for wallet updates)
    paymentEvent.processed = true;
    paymentEvent.status = event === 'charge.success' ? 'success' : 'failed';
    await this.paymentEventRepo.save(paymentEvent);

    return { status: 'success', message: 'Webhook processed successfully' };
  }
}
