"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const bullsconnect_module_1 = require("./bullsconnect/bullsconnect.module");
const bullsconnect_config_1 = require("./bullsconnect/config/bullsconnect.config");
const server_config_1 = require("./config/server.config");
const events_module_1 = require("./events/events.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            config_1.ConfigModule.forRoot({
                load: [server_config_1.default, bullsconnect_config_1.default],
                isGlobal: true,
                envFilePath: ['.env'],
            }),
            events_module_1.EventsModule,
            bullsconnect_module_1.BullsConnectModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map