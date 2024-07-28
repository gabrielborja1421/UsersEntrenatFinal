import * as amqp from 'amqplib/callback_api';
import axios from 'axios';
import * as dotenv from 'dotenv';

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

            channel.consume(queue, async (msg) => {
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
                        const response = await axios.put(
                            `http://127.0.0.1:8081/update`,
                            updateData,
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                        console.log('Update response:', response.data);
                    } catch (error) {
                        if (error.response) {
                            console.error('Error updating user:', error.response.data);
                        } else {
                            console.error('Error updating user:', error.message);
                        }
                    }

                    channel.ack(msg);
                }
            });
        });
    });
}


export { startConsumer };
