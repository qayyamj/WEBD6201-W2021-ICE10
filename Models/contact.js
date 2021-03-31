"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ContactSchema = new Schema({
    FullName: String,
    EmailAddress: String,
    ContactNumber: String
}, {
    collection: "contacts"
});
exports.Model = mongoose_1.default.model('Contact', ContactSchema);
//# sourceMappingURL=contact.js.map