"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var BullsConnectService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BullsConnectService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const axios_1 = __importDefault(require("axios"));
let BullsConnectService = BullsConnectService_1 = class BullsConnectService {
    constructor(configService, schedulerRegistry) {
        this.configService = configService;
        this.schedulerRegistry = schedulerRegistry;
        this.logger = new common_1.Logger(BullsConnectService_1.name);
    }
    async maintainSession() {
        this.logger.log('Start maintaining BullsConnect session');
        try {
            const { data } = await axios_1.default.get('https://bullsconnect.usf.edu/mobile_ws/v17/mobile_events_list', {
                params: {
                    limit: 10,
                },
                headers: {
                    Cookie: 'CG.SessionID=' +
                        this.configService.get('bullsconnect.sessionId'),
                },
            });
            const sessionExpired = data.some((event) => event.p6?.includes('Private Location (sign in to display)'));
            if (sessionExpired) {
                this.logger.error('Session expired. Please update the session ID.');
                this.schedulerRegistry.getCronJob('maintainSession').stop();
                this.logger.warn('BullsConnect session maintenance stopped');
            }
            else {
                this.logger.log('BullsConnect session is still valid');
            }
        }
        catch (error) {
            this.logger.error('Failed to maintain BullsConnect session', error.stack);
        }
    }
};
exports.BullsConnectService = BullsConnectService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_30_MINUTES, {
        name: 'maintainSession',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BullsConnectService.prototype, "maintainSession", null);
exports.BullsConnectService = BullsConnectService = BullsConnectService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        schedule_1.SchedulerRegistry])
], BullsConnectService);
//# sourceMappingURL=bullsconnect.service.js.map