const express = require("express");
const app = express();

app.use(express.json());

let arr = ["Apple", "Mango", "Banana"];

// Display the whole array
app.get("/", (req, res) => {
    res.send(arr);
});

// Add element at the end
app.post("/", (req, res) => {
    arr.push(req.body.name);
    res.send(arr);
});

// Update an element
app.put("/:id", (req, res) => {
    arr[req.params.id] = req.body.name;
    res.send(arr);
});

// Delete an element using its index
app.delete("/:id", (req, res) => {
    arr.splice(req.params.id, 1);
    res.send(arr);
});

// Display array length
app.get("/length", (req, res) => {
    res.send("Array length: " + arr.length);
});

// Add element at the beginning
app.post("/addfirst", (req, res) => {
    arr.unshift(req.body.name);
    res.send(arr);
});

// Remove the last element
app.delete("/removeLast", (req, res) => {
    arr.pop();
    res.send(arr);
});

// Remove the first element
app.delete("/removeFirst", (req, res) => {
    arr.shift();
    res.send(arr);
});

// Sort array alphabetically
app.post("/sort", (req, res) => {
    arr.sort();
    res.send(arr);
});

// Reverse array order
app.post("/reverse", (req, res) => {
    arr.reverse();
    res.send(arr);
});

// Check whether an element exists
app.get("/check/:name", (req, res) => {
    res.send(String(arr.includes(req.params.name)));
});

app.listen(3000, () => {
    console.log("Server started");
    console.log("URL: http://localhost:3000");
});