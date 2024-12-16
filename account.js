const { faker } = require("@faker-js/faker");

function generateAccount(accountid) {
    return {
        ACCOUNT_ID : accountid,
        NAME : faker.person.firstName() + " " + faker.person.lastName(),
    };
}

function generateAccountEx(accountid) {
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
        if(ex) messages.push(generateAccountEx(i));
        else
        messages.push(generateAccount(i));
    }
    return messages;
}

module.exports = { generateMessages };