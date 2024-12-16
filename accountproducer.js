const { Kafka } = require('kafkajs');
const { generateMessages } = require('./account.js');  // Import the generateMessages function

// Initialize Kafka
const kafka = new Kafka({
    clientId: 'sample-producer-customer-account-opening',
    brokers: ['pkc-312o0.ap-southeast-1.aws.confluent.cloud:9092'], // From Confluent Cloud
    ssl: true,
    sasl: {
        mechanism: 'plain', // scram-sha-256 or scram-sha-512 can also be used
        username: process.env.KAFKAUSERNAME,
        password: process.env.KAFKAPASSWORD,
    },
});

// Create a producer instance
const producer = kafka.producer();

const produceMessages = async (count) => {
    const messages = generateMessages(count,false); // Generate X messages

    await producer.connect();

    // Send the generated messages to your topic
    await producer.send({
        topic: 'account',
        messages: messages.map(msg => ({ value: JSON.stringify(msg) })),
    });

    await producer.disconnect();
};

const produceMessagesEx = async (count) => {
    const messages = generateMessages(count, true); // Generate X messages

    await producer.connect();

    // Send the generated messages to your topic
    await producer.send({
        topic: 'account_ex',
        messages: messages.map(msg => ({ value: JSON.stringify(msg) })),
    });

    await producer.disconnect();
};

// Specify the number of messages to emit (change this value as needed)
const numberOfMessages = 1;

for (let i = 0; i < 1; i++) {
    produceMessages(numberOfMessages).catch(console.error);
    produceMessagesEx(numberOfMessages).catch(console.error);
    //const messages = generateMessages(5, true);
    //console.log(messages);
}
