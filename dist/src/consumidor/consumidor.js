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
exports.startConsumer = void 0;
const amqp = __importStar(require("amqplib/callback_api"));
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const RABBITMQ_URL = process.env.RABBITMQ_URL;
const RABBITMQ_PORT = process.env.RABBITMQ_PORT;
const RABBITMQ_USER = process.env.RABBITMQ_USER;
const RABBITMQ_PASSWORD = process.env.RABBITMQ_PASSWORD;
const amqpUrl = `amqps://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@${RABBITMQ_URL}:${RABBITMQ_PORT}`;
function startConsumer() {
    amqp.connect(amqpUrl, (err, connection) => {
        if (err) {
            console.error('Error connecting to RabbitMQ:', err);
            throw err;
        }
        connection.createChannel((err, channel) => {
            if (err) {
                console.error('Error creating channel:', err);
                throw err;
            }
            const queue = 'image_queue';
            channel.assertQueue(queue, {
                durable: true,
            });
            channel.consume(queue, (msg) => __awaiter(this, void 0, void 0, function* () {
                if (msg !== null) {
                    const messageContent = msg.content.toString();
                    const message = JSON.parse(messageContent);
                    console.log("Received message:", message);
                    const { user_id, link, token } = message;
                    const updateData = {
                        id: user_id,
                        img: link,
                    };
                    try {
                        console.log('Sending update request with data:', updateData);
                        const response = yield axios_1.default.put(`http://127.0.0.1:8081/update`, updateData, { headers: { Authorization: `Bearer ${token}` } });
                        console.log('Update response:', response.data);
                    }
                    catch (error) {
                        if (error.response) {
                            console.error('Error updating user:', error.response.data);
                        }
                        else {
                            console.error('Error updating user:', error.message);
                        }
                    }
                    channel.ack(msg);
                }
            }));
        });
    });
}
exports.startConsumer = startConsumer;
