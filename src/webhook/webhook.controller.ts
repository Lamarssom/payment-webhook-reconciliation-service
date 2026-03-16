import {
  Controller,
  Post,
  Body,
  Headers,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('paystack')
  @HttpCode(HttpStatus.OK)
  async handlePaystackWebhook(
    @Body() body: any,
    @Headers('x-paystack-signature') signature: string,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.webhookService.handlePaystackWebhook(body, signature);
  }
}
