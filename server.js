const mqtt = require('mqtt');

// Configuration settings
const config = {
    MQTT_USER: 'your_mqtt_user',
    MQTT_PASSWORD: 'your_mqtt_password',
    MQTT_SERVER: 'your_mqtt_server',
    MQTT_PORT: 1883,
    MQTT_KEEPALIVE: 60
};

// Callback function when the client connects to the broker
function onConnect() {
    console.log('Connected successfully');
    const topic = 'uprint/kiosk';
    client.subscribe(topic, { qos: 1 }, (err) => {
        if (err) {
            console.log('Subscription error:', err);
        }
    });
}

// Callback function when a message is received
function onMessage(topic, message) {
    console.log(`Received message on topic: ${topic} with payload: ${message.toString()}`);
    try {
        const data = JSON.parse(message.toString());
        const deviceId = data.device_id;
        const responseTopic = `uprint/kiosk/${deviceId}`;
        const responseMessage = JSON.stringify({ response: 'Message received', device_id: deviceId });
        client.publish(responseTopic, responseMessage, { qos: 1 }, (err) => {
            if (err) {
                console.log('Publish error:', err);
            } else {
                console.log(`Sent return response '${responseMessage}' to '${responseTopic}'`);
            }
        });
    } catch (e) {
        console.log('Invalid message format');
    }
}

// Function to publish a message
function publishMessage(topic, payload) {
    client.publish(topic, payload, { qos: 1 }, (err) => {
        if (err) {
            console.log(`Failed to send message to topic ${topic}:`, err);
        } else {
            console.log(`Sent '${payload}' to topic '${topic}'`);
        }
    });
}

// Create an MQTT client instance
const client = mqtt.connect({
    host: config.MQTT_SERVER,
    port: config.MQTT_PORT,
    username: config.MQTT_USER,
    password: config.MQTT_PASSWORD,
    keepalive: config.MQTT_KEEPALIVE
});

// Set callback handlers
client.on('connect', onConnect);
client.on('message', onMessage);

// Handle process exit
process.on('SIGINT', () => {
    console.log('Exiting');
    client.end();
    process.exit();
});
