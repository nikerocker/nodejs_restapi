const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./helper/datasim');
const data = db.data;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))


app.use(express.static(__dirname + '/public'));

//get all user info
app.get('/users', function (req, res) {
    res.json(data);
});

//insert the user info 
app.post('/users', function (req, res) {

    req.body.id = data.users.length + 1;
    data.users.push(req.body);
    //  console.log(req.body);
    // console.log(data);
    res.send();

})

//get a single user info by id
app.get('/users/:id', function (req, res) {
    res.send(db.getRow(req.params.id));
});


//udate the user info
app.put('/users/:id', function (req, res) {
    let id = db.findID(data.users, req.params.id);
    if (id != -1) {
        data.users[id] = req.body;
        res.write("Updated  " + id);
    } else {
        res.write('record not found');
    }
    res.send();
})


//delte a user info
app.delete('/users/:id', function (req, res) {
    let id = db.findID(data.users, req.params.id);
    if (id != -1) {
        data.users.splice(id, 1);
        res.write("deleted " + req.params.id);
    } else {
        res.write('record not found');
    }
    //console.log(data);
    res.send();
})
port =3001
app.listen(port,()=>{
    console.log(`Server Running at localhost:${port}`);
});
