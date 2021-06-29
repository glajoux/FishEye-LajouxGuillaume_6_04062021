import * as utils from "./utils.js";
import {insertPointHtml} from "./utils.js";

let testDataPhotographes = [];
let testDataMedias = [];
let site = "";
let url = window.location.href;



const testRecupJSON = async () => {
    await fetch("../FishEyeData.json")
      .then((res) => res.json())
      .then(function(data){
        testDataPhotographes = data.photographers;
        testDataMedias = data.media;
      })
      .catch(function (err) {
        console.log(err);
      });
      console.log(testDataPhotographes);
      // console.log(testDataMedias);
  };
  
  testRecupJSON()

  const pagePhotographe = async() =>{
    await testRecupJSON();
    console.log(testDataPhotographes.name);
    if (url.includes(insertPointHtml(testDataPhotographes.name))){
      console.log('yes');
    }
  };
  
  pagePhotographe()