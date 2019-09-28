const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const path = require('path');
const rateLimit = require("express-rate-limit");


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

let cartArr = [];
let uniqueId = 0;
let sessions = [];
let emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/


class Session {
    constructor(uniqueId, username,email, password, cartArr) {
        this.uniqueId = uniqueId;
        this.username = username;
        this.email = email;
        this.password = password;
        this.cartArr = cartArr;
    }
}

sessions[0] = new Session(uniqueId, "admin", "admin@admin.com" ,"admin", []);
sessions[0].activity = []
uniqueId = uniqueId + 1;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(cookieParser());
app.use(limiter);
// app.use(express.static(path.join(__dirname,'public')));

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next()
});

app.get('/README.html', (req, res, next) => {
    res.sendFile(path.join(__dirname + '/public/README.html'));
});

app.post('/register', (req, res, next) => {
    const parsedBody = JSON.parse(req.body);
    if(sessions.some(session => session.username == parsedBody.username)){
        res.send("The username is taken")
    }else if(!emailRegEx.test(parsedBody.email)){
        res.send("Invalid email address")
    }else if(parsedBody.password.length < 8){
        res.send("The password is too short")
    }else{
        sessions[uniqueId] = new Session(uniqueId, parsedBody.username, parsedBody.email ,parsedBody.password, []);
        uniqueId = uniqueId + 1;
        res.cookie('rememberMe' ,parsedBody.username, { maxAge: 300000, httpOnly: true });
        sessions[0].activity.push({[parsedBody.username]: " has registered"});
        res.send({massege: "OK", maxAge: 300000})
    }
});

app.post('/login', (req, res, next) => {
    const parsedBody = JSON.parse(req.body);
    let sessionIndex = sessions.findIndex( session => {return session.username == parsedBody.username});

    if(sessionIndex < 0){
        res.send("There is no username goes by this name")
    }else if(sessions[sessionIndex].password != parsedBody.password){
        res.send("Invalid password")
    }else{
        if(parsedBody.rememberMe){
            maxAge = 3600000; //1 hour
            res.cookie('rememberMe', parsedBody.username, { maxAge: maxAge, httpOnly: true});
        }else{
            maxAge = 300000;  //5 min
            res.cookie('rememberMe', parsedBody.username, { maxAge: maxAge , httpOnly: true });
        }

        sessions[0].activity.push({[parsedBody.username]: " has logged in"});
        res.send({massege: "OK", maxAge: maxAge})
    }
});

app.get("/isLogin", (req, res, next) => {
    res.send(JSON.stringify(req.cookies))
})

app.put('/add', (req, res, next) => {
    const parsedBody = JSON.parse(req.body);
    let sessionIndex = sessions.findIndex( session => {return session.username == parsedBody.username});

    let productIndex = sessions[sessionIndex].cartArr.findIndex(product =>{return product.id == parsedBody.product.id})
    let product = parsedBody.product

    if(productIndex < 0) {
        product.inCart = true;
        product.count = 1
        product.total = product.price
        sessions[sessionIndex].cartArr.push(product)
        sessions[0].activity.push({[parsedBody.username]: " has added the item \"" + product.title + "\" to the cart" });
        res.send(product)
    }else{
        sessions[sessionIndex].cartArr[productIndex].count = sessions[sessionIndex].cartArr[productIndex].count+1
        sessions[sessionIndex].cartArr[productIndex].total = sessions[sessionIndex].cartArr[productIndex].count * sessions[sessionIndex].cartArr[productIndex].price
        sessions[0].activity.push({[parsedBody.username]: " has increment the amount of the item \"" + product.title + "\" from the cart" });
        res.send(sessions[sessionIndex].cartArr[productIndex])
    }
});

app.post('/increment', (req, res, next) => {
    const parsedBody = JSON.parse(req.body);
    let sessionIndex = sessions.findIndex( session => {return session.username == parsedBody.username});

    let productIndex = sessions[sessionIndex].cartArr.findIndex(product =>{return product.id == parsedBody.id})
    let product = sessions[sessionIndex].cartArr[productIndex]

    product.inCart = true;
    product.count = product.count+1
    product.total = product.price * product.count
    sessions[0].activity.push({[parsedBody.username]: " has increment the amount of the item \"" + product.title + "\" from the cart" });
    res.send(product)
});

app.post('/decrement', (req, res, next) => {
    const parsedBody = JSON.parse(req.body);
    let sessionIndex = sessions.findIndex( session => {return session.username == parsedBody.username});

    let productIndex = sessions[sessionIndex].cartArr.findIndex(product =>{return product.id == parsedBody.id})
    let product = sessions[sessionIndex].cartArr[productIndex]

    product.inCart = true;
    product.count = product.count-1
    product.total = product.price * product.count

    if(product.count == 0){
        sessions[sessionIndex].cartArr.splice(productIndex, 1);
        sessions[0].activity.push({[parsedBody.username]: " has removed the item: \"" + product.title + "\" from the cart" });
    }else{
        sessions[0].activity.push({[parsedBody.username]: " has decremented the amount of the item: \"" + product.title + "\" from the cart" });
    }

    res.send(product)
});


app.delete('/removeItem', (req, res, next) => {
    const parsedBody = JSON.parse(req.body);
    let sessionIndex = sessions.findIndex( session => {return session.username == parsedBody.username});

    let productIndex = sessions[sessionIndex].cartArr.findIndex(product =>{return product.id == parsedBody.id})
    let product = sessions[sessionIndex].cartArr[productIndex]

    product.inCart = false;
    product.count = 0;
    product.total = 0
    sessions[sessionIndex].cartArr.splice(productIndex, 1);
    sessions[0].activity.push({[parsedBody.username]: " has removed the item: \"" + product.title + "\" from the cart" });
    res.send(product)
});

app.post('/cart', (req, res, next) => {
    const parsedBody = JSON.parse(req.body);
    let sessionIndex = sessions.findIndex( session => {return session.username == parsedBody.username});
    sessions[0].activity.push({[parsedBody.username]: " has checked the cart" });

    if(sessionIndex < 0){
        res.send("undefined")
    }else{
        res.send(sessions[sessionIndex].cartArr)
    }
});

app.get('/admin', (req, res, next) => {
    res.send(sessions[0].activity)
});

app.listen(5000);
