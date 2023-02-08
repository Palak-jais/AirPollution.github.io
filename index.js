const inputarea=document.querySelector(".input-area input");
const btn=document.querySelector(".btn1");
const inputclass=document.querySelector(".input-area");
const resultclass=document.querySelector(".maindivresult");
const locationbtn=document.querySelector(".btn2");
const lati=document.querySelector(".lati");
const lg=document.querySelector(".lg");
const p1=document.querySelector(".a");
const p2=document.querySelector(".b");
const p3=document.querySelector(".c");
const p4=document.querySelector(".d");
const p5=document.querySelector(".e");
const p6=document.querySelector(".f");
const p7=document.querySelector(".g");
const p8=document.querySelector(".h");
const airindex=document.querySelector(".airindex");
const healthindex=document.querySelector(".healthindex");
const maindiv=document.querySelector(".maindiv");
const infoTxt=document.querySelector(".info-txt");
const backbtn=document.querySelector("h1 i");



let api;
let url;


btn.addEventListener("click",()=>{
    if(inputarea.value!="" )
    {
        infoTxt.innerHTML="Getting pollution details";
        infoTxt.classList.add("pending");
        fetchapi(inputarea.value);
    }
    else
    {
        infoTxt.innerHTML="isn't a valid city name";
        infoTxt.classList.add("error");
    }
});
function fetchapi(_city){
    
    url='http://api.openweathermap.org/geo/1.0/direct?q='+ _city +'&appid=' + '6a0fb6b3ce2d4b202bcd0df6948ac3b9';
   // fetch(url)
    //.then((response) => response.json())
    //.then((data) => console.log(data));
    fetch(url).then(response =>response.json()).then(result=>cityDetails(result));
  
}
function cityDetails(info){
    if(info.length==0){
        infoTxt.innerHTML="isn't a valid city name";
        infoTxt.classList.replace("pending","error");
    }
   // console.log(info);
    const latitude=info[0].lat;
    const longitude=info[0].lon;
    //console.log(latitude);
    //console.log(longitude);
    api='http://api.openweathermap.org/data/2.5/air_pollution?lat='+latitude +'&lon='+longitude + '&appid='+'6a0fb6b3ce2d4b202bcd0df6948ac3b9'
   //fetch(api)
   //.then((response) => response.json())
   //.then((data) => console.log(data));

  fetch(api).then(response =>response.json()).then(result=>airDetails(result));

}


locationbtn.addEventListener("click",()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess,onError);
    }
    else
    {
        alert("your browser did not support geolocation  api");
    }
});

function onSuccess(position){
    infoTxt.innerHTML="Getting pollution details";
    infoTxt.classList.add("pending");
  const{latitude,longitude}=position.coords;
  api='http://api.openweathermap.org/data/2.5/air_pollution?lat='+latitude +'&lon='+longitude + '&appid='+'6a0fb6b3ce2d4b202bcd0df6948ac3b9'
  // fetch(api)
  // .then((response) => response.json())
  // .then((data) => console.log(data));

  fetch(api).then(response =>response.json()).then(result=>airDetails(result));

}
function onError(error){
  //  console.log(error);
    infoTxt.classList.add("error");
    
}
function airDetails(info){
    
    
        const lat=info.coord.lat;
        const lon=info.coord.lon;
        const{co,nh3,no,no2,o3,pm2_5,pm10,so2}=info.list[0].components;
        const aqi=info.list[0].main.aqi;
        lati.innerHTML=lat;
        lg.innerHTML=lon;
        p1.innerHTML=co;
        p2.innerHTML=nh3;        
        p3.innerHTML=no;
        p4.innerHTML=no2;
        p5.innerHTML=o3;
        p6.innerHTML=pm2_5;
        p7.innerHTML=pm10;
        p8.innerHTML=so2;
        airindex.innerHTML=aqi;
        if(aqi==1)
        {
           healthindex.innerHTML="Good";
        }
        else if(aqi==2)
        {
            healthindex.innerHTML="Fair";
        }
        else if(aqi==3)
        {
            healthindex.innerHTML="Moderate";
        }
        else if(aqi==4)
        {
            healthindex.innerHTML="Poor";
        }
        else if(aqi==5)
        {
            healthindex.innerHTML="Very Poor";
        }
    //inputclass.style.display="none";
    //locationbtn.style.display="none";
    maindiv.style.display="none";

   resultclass.style.display="block";
 
}
backbtn.addEventListener("click",()=>{
    maindiv.style.display="block";
    resultclass.style.display="none";
    infoTxt.classList.remove("pending");
    infoTxt.innerHTML="";
    inputarea.value="";

  
})
