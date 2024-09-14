"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
function handleValidationError(errors) {
    const formattedErrors = errors.reduce((acc, error) => {
        return {
            ...acc,
            [error.property]: error.children?.length
                ? handleValidationError(error.children)
                : Object.values(error.constraints).join(', '),
        };
    }, {});
    return new common_1.BadRequestException({
        message: 'Validation failed',
        errors: formattedErrors,
    });
}
exports.default = handleValidationError;
//# sourceMappingURL=handle-validation-error.js.map