"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let EventsService = class EventsService {
    async getEvents({ campus, fromDate, from, limit, toDate }) {
        const { data: fetchedEvents } = await axios_1.default.get('https://bullsconnect.usf.edu/mobile_ws/v17/mobile_events_list', {
            params: {
                range: 0,
                from,
                limit,
                filter6: '7276307',
                filter8: fromDate,
                filter9: toDate,
            },
            headers: {
                Cookie: 'CG.SessionID=auogrbmlqmpbfk5v1qqx0axs-lZpFx7E5K8XyfyczzyktnltPk1M%3d',
            },
        });
        const filteredEvents = fetchedEvents.filter((event) => {
            return event.listingSeparator || event.p22.includes('Campus - ' + campus);
        });
        let totalEvents = 0;
        const events = filteredEvents.map((event) => {
            if (event.listingSeparator)
                return {
                    listingSeparator: true,
                    time: event.p1,
                };
            totalEvents++;
            const dateMatch = event.p4?.match(/(\w{3}, \w{3} \d{1,2}, \d{4})/);
            const timeMatch = event.p4?.match(/(\d{1,2}(?::\d{2})?\s[APM]{2})\s&ndash;\s(\d{1,2}(?::\d{2})?\s[APM]{2})/);
            return {
                id: event.p1,
                title: event.p3,
                date: dateMatch?.[0],
                startTime: timeMatch?.[1],
                endTime: timeMatch?.[2],
                image: `https://bullsconnect.usf.edu${event.p5}`,
                location: event.p6,
                going: event.p10,
                isSoldOut: event.p26?.includes('SOLD-OUT'),
                spotsLeft: event.p26?.match(/>(\d+)<\/span>/)?.[1],
            };
        });
        return { events, totalEvents };
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)()
], EventsService);
//# sourceMappingURL=events.service.js.map