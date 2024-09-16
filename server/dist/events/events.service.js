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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const bullsconnect_service_1 = require("../bullsconnect/bullsconnect.service");
const format_date_1 = __importDefault(require("../utils/format-date"));
const event_constant_1 = require("./constants/event.constant");
let EventsService = class EventsService {
    constructor(bullsConnectService) {
        this.bullsConnectService = bullsConnectService;
    }
    async getEvents({ campus, fromDate, range, limit, toDate, sortBy, }) {
        const queryParams = {
            range,
            limit,
            filter6: '7276307',
        };
        if (fromDate) {
            queryParams['filter8'] = (0, format_date_1.default)(fromDate);
        }
        if (toDate) {
            queryParams['filter9'] = (0, format_date_1.default)(toDate);
        }
        const fetchedEvents = await this.bullsConnectService.fetchEvents(queryParams);
        const filteredEvents = fetchedEvents.filter((event) => {
            return (!event.listingSeparator &&
                (!campus || event.p22.includes(`Campus - ${campus}`)));
        });
        const events = filteredEvents.map((event) => {
            const dateMatch = event.p4?.match(/(\w{3}, \w{3} \d{1,2}, \d{4})/);
            const timeMatch = event.p4?.match(/(\d{1,2}(?::\d{2})?\s[APM]{2})\s&ndash;\s(\d{1,2}(?::\d{2})?\s[APM]{2})/);
            return {
                id: event.p1,
                title: event.p3,
                date: dateMatch?.[0],
                startTime: timeMatch?.[1],
                endTime: timeMatch?.[2],
                image: `https://bullsconnect.usf.edu${event.p11}`,
                location: event.p6,
                going: parseInt(event.p10),
                isSoldOut: event.p26?.includes('SOLD-OUT'),
                spotsLeft: parseInt(event.p26?.match(/>(\d+)<\/span>/)?.[1]) || null,
            };
        });
        if (sortBy === event_constant_1.EventSortOption.participants) {
            events.sort((a, b) => {
                return b.going - a.going;
            });
        }
        return { events };
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [bullsconnect_service_1.BullsConnectService])
], EventsService);
//# sourceMappingURL=events.service.js.map