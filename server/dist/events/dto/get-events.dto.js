'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.GetEventsDto = void 0;
const class_transformer_1 = require('class-transformer');
const class_validator_1 = require('class-validator');
const events_enum_1 = require('../enum/events.enum');
class GetEventsDto {
  constructor() {
    this.limit = 40;
    this.range = 0;
    this.sortBy = events_enum_1.EventSortBy.time;
  }
}
exports.GetEventsDto = GetEventsDto;
__decorate(
  [
    (0, class_validator_1.IsEnum)(events_enum_1.EventCampus, {
      message: `Campus must be one of ${Object.values(events_enum_1.EventCampus).join(', ')}`,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', String),
  ],
  GetEventsDto.prototype,
  'campus',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)(),
    __metadata('design:type', String),
  ],
  GetEventsDto.prototype,
  'fromDate',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)(),
    __metadata('design:type', String),
  ],
  GetEventsDto.prototype,
  'toDate',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata('design:type', Number),
  ],
  GetEventsDto.prototype,
  'limit',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata('design:type', Number),
  ],
  GetEventsDto.prototype,
  'range',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(events_enum_1.EventSortBy, {
      message: `Sort by must be one of ${Object.values(events_enum_1.EventSortBy).join(', ')}`,
    }),
    __metadata('design:type', String),
  ],
  GetEventsDto.prototype,
  'sortBy',
  void 0,
);
//# sourceMappingURL=get-events.dto.js.map
