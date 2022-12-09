const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");
const https= require("https");
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://admin-ashwin:admin@cluster0.qtcbu.mongodb.net/zenith",{useNewUrlParser:true});
const arr=[];var temp,humi,ph,fRice=0,fMaize=0,fChick=0,fKidney=0,fRPigeon=0,fMoth=0,fMung=0,fBlack=0,fLentil=0,fPom=0,fBanana=0,fMango=0,fGrapes=0,fWater=0,fMusk=0,fApple=0,fOrange=0,fPappaya=0,fCoconut=0,fCotton=0,fJute=0,fCoffee=0;;
const predicted=[];
const cropSchema={
  N:Number,
  P:Number,
  K:Number,
  temperature:Number,
  humidity:Number,
  ph:Number,
  rainfall:Number,
  label:String
}
const retailerSchema={
  company:String,
  demand:String,
  quantity:Number,
  price:Number,
  time:String
}
const Crop=mongoose.model("Crop",cropSchema);
const Retailer=mongoose.model("Retailer",retailerSchema);
//reading from database
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});
app.get("/about.html",function(req,res){
  res.sendFile(__dirname+"/about.html");
});
app.get("/retailer.html",function(req,res){
  res.sendFile(__dirname+"/retailer.html");
});
app.get("/farmer.html",function(req,res){
  res.sendFile(__dirname+"/farmer.html");
});
app.post("/contract",function(req,res)
{
  //res.sendFile(__dirname+"/contracts.html");
  Retailer.find({},function(er,foundItems){
    if(er){
      console.log("Error");
    }else{
      console.log(foundItems);
        res.render("contract", {newListItems: foundItems});
    }
});
});
app.get("/index.html",function(req,res){
  res.sendFile(__dirname+"/index.html");
});
app.post("/retailer.html",function(req,res)
{
  const company=req.body.company;
  const demand=req.body.demand;
  const quantity=req.body.quantity;
  const price=req.body.price;
  const time=req.body.time;
  const retailer=new Retailer({
      company:company,
      demand:demand,
      quantity:quantity,
      price:price,
      time:time
  })
  //console.log(company,demand,quantity,price,time);
  //////////////////////////////////////////inserting into db
  retailer.save();
  //window.alert("Data Successfully inserted");
  res.redirect("/retailer.html");
});
app.post("/farmer",function(req,res){
  //fetching from api////////////////////
  const location=req.body.location;
  ph=req.body.ph;
  const moisture=req.body.moisture;
  //console.log(location,ph,moisture);
  const url="https://api.openweathermap.org/data/2.5/weather?q="+location+"&appid=70b50a42c25f643c52e9da708af34cbe&units=metric";
  https.get(url,function(response)
  {
      if(response.statusCode==404){
        console.log("city not found");
      }
      else{
        response.on("data",function(data){
        const weather=JSON.parse(data);
        temp=Math.round(weather.main.temp);
        humi=Math.round(weather.main.humidity)-10;
        console.log(temp,humi);
      });
      }
  });
  Crop.find({},function(er,foundItems){
    if(er){
      console.log("Error");
    }else{
      //console.log(foundItems);
      foundItems.forEach(function(item){
        if(item.label=="chickpea"){
        var te=Math.round(item.temperature);
        var hu=Math.round(item.humidity);
        var p=Math.round(item.ph);
        if(te==temp && p==ph && hu==humi){
          fChick=1;
        }
      }
        if(item.label=="rice"){
        var te=Math.round(item.temperature);
        var hu=Math.round(item.humidity);
        var p=Math.round(item.ph);
        //console.log(te,temp,p,ph);
        if(te==temp && p==ph && hu==humi){
          fRice=1;
        }
      }
      if(item.label=="maize"){
      var te=Math.round(item.temperature);
      var hu=Math.round(item.humidity);
      var p=Math.round(item.ph);
      //console.log(te,temp,p,ph);
      if(te==temp && p==ph && hu==humi){
        fMaize=1;
      }
    }
  if(item.label=="kidneybeans"){
  var te=Math.round(item.temperature);
  var hu=Math.round(item.humidity);
  var p=Math.round(item.ph);
  if(te==temp && p==ph && hu==humi){
    fKidney=1;
  }
}
  if(item.label=="pigeonpeas"){
  var te=Math.round(item.temperature);
  var hu=Math.round(item.humidity);
  var p=Math.round(item.ph);
  if(te==temp && p==ph && hu==humi){
    fRPigeon=1;
  }
}
  if(item.label=="mothbeans"){
  var te=Math.round(item.temperature);
  var hu=Math.round(item.humidity);
  var p=Math.round(item.ph);
  if(te==temp && p==ph && hu==humi)  {
    fMoth=1;
  }
}
  if(item.label=="mungbean"){
  var te=Math.round(item.temperature);
  var hu=Math.round(item.humidity);
  var p=Math.round(item.ph);
  if(te==temp && p==ph && hu==humi){
    fMung=1;
  }
}
  if(item.label=="blackgram"){
  var te=Math.round(item.temperature);
  var hu=Math.round(item.humidity);
  var p=Math.round(item.ph);
  if(te==temp && p==ph && hu==humi){
    fBlack=1;
  }
  }
  if(item.label=="lentil"){
  var te=Math.round(item.temperature);
  var hu=Math.round(item.humidity);
  var p=Math.round(item.ph);
  if(te==temp && p==ph && hu==humi){
    fLentil=1;
  }
  }
  if(item.label=="pomegranate"){
  var te=Math.round(item.temperature);
  var hu=Math.round(item.humidity);
  var p=Math.round(item.ph);
  if(te==temp && p==ph && hu==humi){
    fPom=1;
  }
  }
  if(item.label=="banana"){
  var te=Math.round(item.temperature);
  var hu=Math.round(item.humidity);
  var p=Math.round(item.ph);
  if(te==temp && p==ph && hu==humi){
    fBanana=1;
  }
  }
  if(item.label=="mango"){
  var te=Math.round(item.temperature);
  var hu=Math.round(item.humidity);
  var p=Math.round(item.ph);
  if(te==temp && p==ph && hu==humi){
    fMango=1;
  }
  }
  if(item.label=="grapes"){
  var te=Math.round(item.temperature);
  var hu=Math.round(item.humidity);
  var p=Math.round(item.ph);
  if(te==temp && p==ph && hu==humi){
    fGrapes=1;
  }
  }
  if(item.label=="watermelon"){
  var te=Math.round(item.temperature);
  var hu=Math.round(item.humidity);
  var p=Math.round(item.ph);
  if(te==temp && p==ph && hu==humi){
    fWater=1;
  }
  }
  if(item.label=="muskmelon"){
  var te=Math.round(item.temperature);
  var hu=Math.round(item.humidity);
  var p=Math.round(item.ph);
  if(te==temp && p==ph && hu==humi){
    fMusk=1;
  }
  }
  if(item.label=="apple"){
  var te=Math.round(item.temperature);
  var hu=Math.round(item.humidity);
  var p=Math.round(item.ph);
  if(te==temp && p==ph && hu==humi){
    fApple=1;
  }
  }
  if(item.label=="orange"){
  var te=Math.round(item.temperature);
  var hu=Math.round(item.humidity);
  var p=Math.round(item.ph);
  if(te==temp && p==ph && hu==humi){
    fOrange=1;
  }
  }
  if(item.label=="papaya"){
  var te=Math.round(item.temperature);
  var hu=Math.round(item.humidity);
  var p=Math.round(item.ph);
  if(te==temp && p==ph && hu==humi){
    fPappaya=1;
  }
  }
  if(item.label=="coconut"){
  var te=Math.round(item.temperature);
  var hu=Math.round(item.humidity);
  var p=Math.round(item.ph);
  if(te==temp && p==ph && hu==humi){
    fCoconut=1;
  }
  }
  if(item.label=="cotton"){
  var te=Math.round(item.temperature);
  var hu=Math.round(item.humidity);
  var p=Math.round(item.ph);
  if(te==temp && p==ph && hu==humi){
    fCotton=1;
  }
  }
  if(item.label=="jute"){
  var te=Math.round(item.temperature);
  var hu=Math.round(item.humidity);
  var p=Math.round(item.ph);
  if(te==temp && p==ph && hu==humi){
    fJute=1;
  }
  }
  if(item.label=="coffee"){
  var te=Math.round(item.temperature);
  var hu=Math.round(item.humidity);
  var p=Math.round(item.ph);
  if(te==temp && p==ph && hu==humi){
    fCoffee=1;
  }
  }
      });
      if(fApple==1){predicted.push("Apple");};
      if(fBanana==1){predicted.push("Banana");};
      if(fBlack==1){predicted.push("Blackgram");};
      if(fChick==1){predicted.push("Chickpea");};
      if(fCoconut==1){predicted.push("Coconut");};
      if(fCoffee==1){predicted.push("Coffee");};
      if(fCotton==1){predicted.push("Cotton");};
      if(fGrapes==1){predicted.push("Grapes");};
      if(fJute==1){predicted.push("Jute");};
      if(fKidney==1){predicted.push("Kidney Beans");};
      if(fLentil==1){predicted.push("Lentil");};
      if(fMaize==1){predicted.push("Maize");};
      if(fMango==1){predicted.push("Mango");};
      if(fMung==1){predicted.push("Mungbean");};
      if(fMusk==1){predicted.push("MuskMelon");};
      if(fOrange==1){predicted.push("Orange");};
      if(fPappaya==1){predicted.push("Pappaya");};
      if(fPom==1){predicted.push("Pomegranate");};
      if(fRPigeon==1){predicted.push("Pigeon Peas");};
      if(fRice==1){predicted.push("Rice");};
      if(fWater==1){predicted.push("Water Melon");};
    }
  });
  console.log(predicted);
  let unique = [...new Set(predicted)];
  console.log(unique);
    res.render("prediction", {newListItems: unique});
});

app.listen(process.env.PORT||3000, function()
{
  console.log("Server started");
});
