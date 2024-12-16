import {
    MongoClient
} from 'mongodb';

var connection = process.env.ATLASSEARCHURI + "?retryWrites=true&w=majority";

// Connection URI and database/collection details

const dbName = "stream";       // Replace with your database name
const collectionName = "account";      // Replace with your collection name

// Create a new MongoClient instance
const client = new MongoClient(connection);

async function getSortedAccounts() {
    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log("Connected to MongoDB!");

        // Access the desired database and collection
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        // Aggregation pipeline
        var pipeline = [
            { $sort: { _id: 1 } }, // Sort by _id in ascending order
            { $limit: 2 },         // Limit to one document
            {
                $project: {
                    ACCOUNT_ID: 1,              // Include the account_id field
                    _id_timestamp: {            // Convert _id to timestamp
                        $toDate: "$_id"
                    }
                }
            }
        ];

        var account = await collection.aggregate(pipeline).toArray();

        // Log the results
        console.log("Sorted Accounts:", account[1]);
        var time1 = account[1]._id_timestamp;

        pipeline = [
            { $sort: { _id: -1 } }, // Sort by _id in ascending order
            { $limit: 1},         // Limit to one document
            {
                $project: {
                    ACCOUNT_ID: 1,              // Include the account_id field
                    _id_timestamp: {            // Convert _id to timestamp
                        $toDate: "$_id"
                    }
                }
            }
        ];

        account = await collection.aggregate(pipeline).toArray();
        // Log the results
        console.log("Sorted Accounts:", account[0]);
        var time2 = account[0]._id_timestamp;

        console.log("Difference in time (ms):", time2 - time1);

    } catch (error) {
        console.error("Error fetching sorted accounts:", error);
    } finally {
        // Close the connection
        await client.close();
    }
}

// Execute the function
getSortedAccounts();
