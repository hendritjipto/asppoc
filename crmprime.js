const { faker } = require("@faker-js/faker");

function generatePrime(accountid) {
    return {
        ACCOUNT_ID : accountid,
        NAME : faker.person.firstName() + " " + faker.person.lastName(),
    };
}

function generateCRM(accountid) {
    return {
        ACCOUNT_ID : accountid,
        EMAIL : faker.internet.email(),
        BBN : faker.string.uuid(),
    };
}

// Function to generate X number of messages
function generateMessages(count, ex) {
    const messages = [];
    for (let i = 0; i < count; i++) {
        if(ex) messages.push(generateCRM(i));
        else
        messages.push(generatePrime(i));
    }
    return messages;
}

module.exports = { generateMessages };