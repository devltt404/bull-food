"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const compression_1 = __importDefault(require("compression"));
const app_module_1 = require("./app.module");
const handle_validation_error_1 = __importDefault(require("./utils/handle-validation-error"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.use((0, compression_1.default)());
    app.setGlobalPrefix('api');
    app.enableVersioning({
        type: common_1.VersioningType.URI,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        exceptionFactory: handle_validation_error_1.default,
    }));
    await app.listen(4000);
}
bootstrap();
//# sourceMappingURL=main.js.map