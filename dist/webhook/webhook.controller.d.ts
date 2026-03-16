import { WebhookService } from './webhook.service';
export declare class WebhookController {
    private readonly webhookService;
    constructor(webhookService: WebhookService);
    handlePaystackWebhook(body: any, signature: string): Promise<{
        status: string;
        message?: undefined;
    } | {
        status: string;
        message: string;
    }>;
}
