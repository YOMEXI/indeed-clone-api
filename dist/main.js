"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
dotenv.config();
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.enableCors({
        credentials: true,
        exposedHeaders: ['Set-Cookie'],
        origin: process.env.CorsAllowedWebsite,
    });
    app.use(morgan('dev'));
    app.use(cookieParser());
    await app.listen(8000);
}
bootstrap();
//# sourceMappingURL=main.js.map