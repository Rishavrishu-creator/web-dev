var express = require('express');
var app = express();
var path = require('path');
var session=require('express-session')

var ejs = require('ejs')
var fetch = require('node-fetch')
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
var bodyParser = require('body-parser');
const { get } = require('https');
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
//https://covid19.mathdro.id/api/   it gives the confirmed,recovered and death cases overall


//https://covid19.mathdro.id/api/confirmed/    it gives the confirmed cases (sorted order)


//https://covid19.mathdro.id/api/recovered/     it gives the recovered cases sorted(order)


//https://covid19.mathdro.id/api/deaths/     it gives the death cases sorted(order)


//https://covid19.mathdro.id/api/countries/US it gives the cases in US


//


const url = "https://covid19.mathdro.id/api"

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



app.listen(process.env.PORT||9000,function(req,res){
   console.log("Listening...")

})