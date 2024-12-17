const { Kafka } = require('kafkajs');
const { generateMessages } = require('./crmprime.js');  // Import the generateMessages function

// Initialize Kafka
const kafka = new Kafka({
    clientId: 'sample-producer-crm-prime',
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

const produceMessagesPrime = async (count) => {
    const messages = generateMessages(count,false); // Generate X messages

    await producer.connect();

    // Send the generated messages to your topic
    await producer.send({
        topic: 'prime',
        messages: messages.map(msg => ({ value: JSON.stringify(msg) })),
    });

    await producer.disconnect();
};

const produceMessagesCRM = async (count) => {
    const messages = generateMessages(count, true); // Generate X messages

    await producer.connect();

    // Send the generated messages to your topic
    await producer.send({
        topic: 'crm',
        messages: messages.map(msg => ({ value: JSON.stringify(msg) })),
    });

    await producer.disconnect();
};

// Specify the number of messages to emit (change this value as needed)
const numberOfMessages = 1000;

for (let i = 0; i < 1; i++) {
    produceMessagesPrime(numberOfMessages).catch(console.error);
    produceMessagesCRM(numberOfMessages).catch(console.error);
    //const messages = generateMessages(5, true);
    //console.log(messages);
}
