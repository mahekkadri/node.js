const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Home Page");
});

app.get("/about", (req, res) => {
    res.send("About Page");
});

app.get("/contact", (req, res) => {
    res.send("Contact Page");
});

app.get("/login", (req, res) => {
    res.send("Login Page");
});

app.get("/services", (req, res) => {
    res.send("Services Page");
});

app.listen(5000);