let url ="https://www.espncricinfo.com/series/ipl-2020-21-1210595";
let fs = require("fs");
let request = require("request");
let cheerio = require("cheerio");
let AllMatchobj=require("./allmatch.js");

request(url,cb);

function cb(error,response,html){
  if(error){
    console.log("Error");

  }

  else if(response.code==404){
    console.log("invalid Page");
  }
  else{
    dataExtracter(html);
  }
}
function dataExtracter(html){

let searchTool = cheerio.load(html);

let anchorEle = searchTool('a[ data-hover="View All Results"]');
let link = anchorEle.attr('href');
// 
let full_link = ("https://www.espncricinfo.com"+link);

// console.log(full_link);

AllMatchobj.gAllMatch(full_link);


}

