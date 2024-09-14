"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatDate(date) {
    const dateObj = new Date(date);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = dateObj.toLocaleString('en-US', { month: 'short' });
    const year = dateObj.getFullYear();
    return `${day} ${month} ${year}`;
}
exports.default = formatDate;
//# sourceMappingURL=format-date.js.map