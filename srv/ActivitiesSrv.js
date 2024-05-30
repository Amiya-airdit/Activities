const cds = require("@sap/cds");

const { MongoClient } = require("mongodb");

// MongoDB connection URI
const uri = "mongodb://Amiya:Amiya1999@74.225.222.62:27017/";

// MongoDB Client setup
let client;
let mongoCollection;

async function connectToMongoDB() {
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const database = client.db("Pratham");
    mongoCollection = database.collection("formviews");
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

module.exports = cds.service.impl(async function () {
  await connectToMongoDB();

  this.on("READ", "activity", async (req) => {
    try {
      let query = {}; // For search operation and for update as well of particular/ Unique data

      // Extract conditions from the req.query.SELECT.where clause if it exists
      if (req.query.SELECT.where) {
        const whereClause = req.query.SELECT.where;
        for (let i = 0; i < whereClause.length; i += 2) {
          // Check for field and value pairs
          if (whereClause[i].ref && whereClause[i + 1] === "=") {
            const field = whereClause[i].ref[0];
            const value = whereClause[i + 2].val;
            query[field] = value;
            i++;
          }
        }
      }

      console.log("Query based on conditions:", query);

      // Fetch documents based on constructed query
      const documents = await mongoCollection
        .find(query)
        .sort({ createdTime: -1 })
        .toArray();
      console.log("Fetched documents:", documents);

      // Calculate the total count of records matching the query
      const totalCount = await mongoCollection.countDocuments(query);
      console.log(totalCount, "---------------count");

      const result = documents.map((doc) => ({
        ...doc,
      }));

      result["$count"] = totalCount; // Include $count for CAP consumption
      return result;
    } catch (err) {
      console.error("Error reading documents from MongoDB", err);
      req.error(500, "Unable to fetch data");
      return [];
    }
  });

  this.on("disconnect", async () => {
    if (client) {
      await client.close();
      console.log("Disconnected from MongoDB.");
    }
  });
});
