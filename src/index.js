const express = require('express');
const contactsDB = require('./contactsDB');

const app = express();


app.use(express.static('../static'));


app.get('/get-all', function (req, res) {
    const contacts = contactsDB.getAll();
    res.json(contacts);
});

app.get('/create', function (req, res) {
    const record = JSON.parse(req.query.record);
    contactsDB.create(record);
    res.send();
});

app.get('/update', function (req, res) {
    const index = req.query.index;
    const record = JSON.parse(req.query.record);
    contactsDB.update(index, record);
    res.send();
});

app.get('/remove', function (req, res) {
    const index = JSON.parse(req.query.index);
    
    contactsDB.remove(index);


    res.send(index)
});

app.get('/find', function (req, res) {
    const prediction = JSON.parse(req.query.prediction);

    const result = contactsDB.find(prediction);
    res.json(result);
});

app.listen(3000);
