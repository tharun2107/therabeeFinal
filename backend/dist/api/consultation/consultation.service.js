"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllConsultations = exports.createConsultation = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createConsultation = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const consultation = yield prisma_1.default.consultation.create({
        data: {
            name: data.name,
            phone: data.phone,
            reason: data.reason,
        },
    });
    return consultation;
});
exports.createConsultation = createConsultation;
const getAllConsultations = () => __awaiter(void 0, void 0, void 0, function* () {
    const consultations = yield prisma_1.default.consultation.findMany({
        orderBy: { createdAt: 'desc' },
    });
    return consultations;
});
exports.getAllConsultations = getAllConsultations;
