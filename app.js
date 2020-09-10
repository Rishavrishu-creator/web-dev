var express = require('express');
var smtpTransport = require('nodemailer-smtp-transport');
var app = express();
var limitter = require('express-rate-limit')
var path = require('path');
var session=require('express-session')
require('dotenv').config()
var ejs = require('ejs')
var fetch = require('node-fetch')

var nodeMailer = require('nodemailer')
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
var bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(express.static(__dirname+'/assets'));
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
extended:false
}))
app.use(session({
    saveUninitialized:true,
    resave:true,
    secret:"My SECRET KEY"
}))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(limitter({
    windowMs:5000,
    max:15,
    message:{
        status:401,
        message:"Too many requests"
    }

}))


 

//https://covid19.mathdro.id/api/   it gives the confirmed,recovered and death cases overall


//https://covid19.mathdro.id/api/confirmed/    it gives the confirmed cases (sorted order)


//https://covid19.mathdro.id/api/recovered/     it gives the recovered cases sorted(order)


//https://covid19.mathdro.id/api/deaths/     it gives the death cases sorted(order)


//https://covid19.mathdro.id/api/countries/US it gives the cases in US


//


const url = "https://covid19.mathdro.id/api"

app.get('/contact',function(req,res){
    res.render("contact.ejs")
})

app.post('/email',function(req,res){
    var auth = {
        type: 'oauth2',
        user: 'rishavrishu2001.ra@gmail.com',
        clientId: '739935140116-3frgnjh2puimklj54fkb9rir1puti6pa.apps.googleusercontent.com',
        clientSecret: 'J9JY-1zOv7npuhqZGcKTfsYE',
        refreshToken: '1//04nz80eCyIN3bCgYIARAAGAQSNwF-L9Irazy1flm0tspU3-EFoJLMDBxtLe_0v2R3ikogn8FsS2ZNdjivgIYn-xVBBTL8DhQtdlw',
    };

    var transport = nodeMailer.createTransport({
        service:'gmail',
        auth:auth
       
})

   
   
    console.log(req.body)
    var random_id =Math.floor(Math.random()*100000)
    ejs.renderFile(__dirname + "/views/rishav.ejs", { name: req.body.first,id: random_id }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            var mainOptions = {
                from: 'rishavrishu2001.ra@gmail.com',
                to: req.body.email,
                subject: 'Contact Us with love by (COVID-19 TRACKER)',
                html: data
            };
            console.log("html data ======================>", mainOptions.html);
            transport.sendMail(mainOptions, function (err, info) {
                if (err) {
                    res.json({
                        error:{
                            message:err
                        }
                    })
                   
                } else {
                    console.log('Message sent: ' + info.response);
                    res.redirect('/contact')
                }
            });
        }
        
        });
    
    
})


app.get('/weather',function(req,res){
    res.render("weather")
})

app.get('/about',function(req,res){
    res.render("about")
})
app.get('/bt',function(req,res){
    res.render("bt")
})

app.get('/signup',function(req,res){
    res.render("signup")
})

app.get('/forgot',function(req,res){
    res.render('forgot')
})

app.get('/login',function(req,res){
    res.render("login")
})


app.get('/',function(req,res){
    
   
    getInfo();
    async function getInfo()
    {
        var array = ["rishav","rakshit","aman"]
        var data = await fetch(url)
        var response = await data.json();

        var data1 = await fetch('https://covid19.mathdro.id/api/confirmed/');
        var response1 = await data1.json();
       
        var rec = await fetch('https://covid19.mathdro.id/api/recovered/')
        var recovered = await rec.json()



        var data2 = await fetch('https://covid19.mathdro.id/api/countries/USA')
        var response2 = await data2.json()

        var data3 = await fetch('https://covid19.mathdro.id/api/countries/INDIA')
        var response3 = await data3.json()

        var data4 = await fetch('https://covid19.mathdro.id/api/countries/australia')
        var response4 = await data4.json()
        
        
    res.render("index",{'res':response,'res2':response1,'res3':response2,'res4':response3,'res5':response4,'res6':recovered})
    }
    
})

app.get("*",function(req,res){
    var json={
        error:{
            status:402,
            message:"Invalid Url",
            source:"COVID 19 Tracker",
            developers:"Rishav,Radhika,Ashwath"
        }
    }
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(json, null, 4));
})



app.listen(process.env.PORT||8000,function(req,res){
   console.log("Listening...")

})