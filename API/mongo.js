const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());

const client = new MongoClient("mongodb://localhost:27017");

async function main() {
    await client.connect();

    const db = client.db("college");
    const students = db.collection("students");

    console.log("MongoDB Connected");

    app.get("/students", async (req, res) => {
        res.send(await students.find().toArray());
    });

    app.post("/students", async (req, res) => {
        await students.insertMany(req.body);

        res.send({
            message: "Added Successfully",
            student: data
        });
    });

   
app.put("/students/:id", async (req, res) => {
    await students.updateOne(
        { id: Number(req.params.id) },
        { $set: req.body }
    );

    const data = await students.findOne({
        id: Number(req.params.id)
    });

    res.send({
        message: "Updated Successfully",
        student: data
    });
});

    app.delete("/students/:id", async (req, res) => {
        await students.deleteOne({
            id: Number(req.params.id)
        });

        res.send("Deleted Successfully");
    });

    app.listen(3000, () => {
        console.log("Server started");
    });
}

main();