let request=require("request");
let cheerio=require("cheerio");
// let function= require("function");
let scorecardobj = require("./scorecard");

function getAllMatchesLink(url){
  request(url,function(error,response,html){
    if(error){
      console.log("Error");
  
    }
  
    else if(response.code==404){
      console.log("invalid Page");
    }
    else{
      Extract_link(html);
    }
  })
}

function Extract_link(html){
  let selectTool = cheerio.load(html);

  let score_anchor =selectTool('a[data-hover="Scorecard"]');

  for(let i=0;i<score_anchor.length;i++){
      let ll = selectTool(score_anchor[i]).attr('href'); 
      let fl = ("https://www.espncricinfo.com"+ll);
      console.log(fl);
     scorecardobj.ps(fl);

  }
  
}
module.exports = {
  gAllMatch :getAllMatchesLink
}
