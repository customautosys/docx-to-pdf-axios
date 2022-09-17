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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const browser_or_node_1 = require("browser-or-node");
const axios_1 = __importDefault(require("axios"));
function docxToPdfAxios(docx) {
    return __awaiter(this, void 0, void 0, function* () {
        let NodeFormData;
        if (browser_or_node_1.isNode)
            NodeFormData = (yield Promise.resolve().then(() => __importStar(require('form-data')))).default;
        let formData = new (browser_or_node_1.isNode ? NodeFormData : FormData)();
        formData.append('file', docx, 'output.docx');
        let options = { responseType: 'json' };
        if (browser_or_node_1.isNode)
            options.headers = formData.getHeaders();
        let uploadData = (yield axios_1.default.post('https://filetools2.pdf24.org/client.php?action=upload', formData, options)).data;
        delete options.headers;
        let convertData = (yield axios_1.default.post('https://filetools2.pdf24.org/client.php?action=convertToPdf', { files: [uploadData] }, options)).data;
        options.params = convertData;
        let jobStatusData = (yield axios_1.default.get('https://filetools2.pdf24.org/client.php?action=getStatus', options)).data;
        while (jobStatusData.status !== 'done') {
            try {
                yield new Promise(resolve => setTimeout(resolve, 2000));
                jobStatusData = (yield axios_1.default.get('https://filetools2.pdf24.org/client.php?action=getStatus', options)).data;
            }
            catch (error) {
                console.log(error);
            }
        }
        options.responseType = 'arraybuffer';
        return (yield axios_1.default.get('https://filetools2.pdf24.org/client.php?mode=download&action=downloadJobResult', options)).data;
    });
}
exports.default = docxToPdfAxios;
;
