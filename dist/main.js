"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Payment Webhook Service')
        .setDescription('Production-ready Paystack webhook with idempotency & reconciliation')
        .setVersion('1.0')
        .addTag('webhook')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT || 3000);
    console.log(`Server running on http://localhost:3000`);
    console.log(`Swagger docs: http://localhost:3000/api`);
}
void bootstrap();
//# sourceMappingURL=main.js.map