"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConsultationSchema = void 0;
const zod_1 = require("zod");
exports.createConsultationSchema = {
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required'),
        phone: zod_1.z.string().min(1, 'Phone number is required'),
        reason: zod_1.z.string().min(1, 'Reason for consultation is required'),
    }),
};
