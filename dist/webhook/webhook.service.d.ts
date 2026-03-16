import { Repository } from 'typeorm';
import { PaymentEvent } from './entities/payment-event.entity';
import { ConfigService } from '@nestjs/config';
type PaystackWebhookBody = {
    event: string;
    data?: {
        reference?: string;
        [key: string]: any;
    };
};
export declare class WebhookService {
    private paymentEventRepo;
    private configService;
    constructor(paymentEventRepo: Repository<PaymentEvent>, configService: ConfigService);
    handlePaystackWebhook(body: PaystackWebhookBody, signature: string): Promise<{
        status: string;
        message?: undefined;
    } | {
        status: string;
        message: string;
    }>;
}
export {};
