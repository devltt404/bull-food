"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var MailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const promises_1 = require("fs/promises");
const handlebars_1 = __importDefault(require("handlebars"));
const nodemailer = __importStar(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const event_constant_1 = require("../events/constants/event.constant");
const events_service_1 = require("../events/events.service");
let MailService = MailService_1 = class MailService {
    constructor(configService, eventsSerivce) {
        this.configService = configService;
        this.eventsSerivce = eventsSerivce;
        this.logger = new common_1.Logger(MailService_1.name);
        this.transporter = nodemailer.createTransport({
            host: this.configService.get('MAIL_HOST'),
            port: this.configService.get('MAIL_PORT'),
            secure: this.configService.get('MAIL_SECURE'),
            auth: {
                user: this.configService.get('MAIL_USER'),
                pass: this.configService.get('MAIL_PASS'),
            },
        });
    }
    async sendMail({ templatePath, context, ...mailOptions }) {
        const template = await (0, promises_1.readFile)(templatePath, 'utf8');
        const html = handlebars_1.default.compile(template)(context);
        const data = await this.transporter.sendMail({
            ...mailOptions,
            from: mailOptions.from ||
                `${this.configService.get('mail.senderName')} <${this.configService.get('mail.senderEmail')}>`,
            html: mailOptions.html || html,
        });
        console.log(data);
    }
    async sendDailyNewsletter() {
        this.logger.log('Sending daily newsletter...');
        const events = await this.eventsSerivce.getEvents({
            limit: 5,
            sortBy: event_constant_1.EventSortOption.participants,
            fromDate: new Date().toISOString(),
            toDate: new Date().toISOString(),
            campus: event_constant_1.EventCampus.Tampa,
        });
        try {
            await this.sendMail({
                to: 'phamductri4862@gmail.com',
                subject: `USF free food events on ${new Date().toLocaleDateString()}`,
                templatePath: path_1.default.join(process.cwd(), 'src/mail/templates/daily-newsletter.hbs'),
                context: events,
            });
            this.logger.log('Daily newsletter sent successfully');
        }
        catch (error) {
            this.logger.error('Failed to send daily newsletter', error.stack);
        }
    }
};
exports.MailService = MailService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_8AM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MailService.prototype, "sendDailyNewsletter", null);
exports.MailService = MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        events_service_1.EventsService])
], MailService);
//# sourceMappingURL=mail.service.js.map