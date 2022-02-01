const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://Abdulrahmansadek:3217008gxc@cluster0.oyufd.mongodb.net/world?retryWrites=true&w=majority";

async function seeDatabase() {
  const client = new MongoClient(uri);

  try {
    await client.connect();

    // create new record
    await client.db("world").collection("city").insertOne({
      name: "Damascus",
      country_code: "SYR",
      District: "Damascus",
      population: 2000000,
    });

    // Update record
    await client
      .db("world")
      .collection("city")
      .updateMany({ name: "Damascus" }, { $set: { population: 2100000 } });

    // find city
    const findCity = await client
      .db("world")
      .collection("city")
      .find({ name: "Damascus" })
      .toArray();
    console.log(findCity);
    // find record by country name and by country code
    const cityByCode = await client
      .db("world")
      .collection("city")
      .find({ $and: [{ country_code: "SYR" }, { name: "damascus" }] })
      .toArray();
    console.log(cityByCode);

    // delete city
    await client
      .db("world")
      .collection("city")
      .deleteMany({ name: "Damascus" });
    console.log("city is deleted");
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}
seeDatabase();

// 1. export the table city from mysql using mysql workbench and save it as csv
// in the local machine.
// 2. importing the table using mongodb compass .
