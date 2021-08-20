// let url ="https://www.espncricinfo.com/series/ipl-2020-21-1210595/mumbai-indians-vs-chennai-super-kings-1st-match-1216492/full-scorecard";
let fs = require("fs");
let request = require("request");
let cheerio = require("cheerio");

function processRequest(fl){
  request(fl,cb);

}

function cb(error,response,html){
  if(error){
    console.log("Error 1");

  }

  else if(response.code==404){
    console.log("invalid Page");
  }
  else{
    ExtractMatchDetail(html);
  }
}
function ExtractMatchDetail(html){
  let $ = cheerio.load(html);
  //.match-header .description ==event

  let eventtxt = $('.match-header .description');
  let statusTxt = $('.match-header .status-text');
let arr=eventtxt.text().split(",")
let venue= arr[1].trim();
let date = arr[2].trim();
  console.log("Venue: "+venue);
  console.log("Date: "+date);
  console.log("Match result: "+statusTxt.text());

  let htmlString="";

  let inningsEle = $(".card.content-block.match-scorecard-table>.Collapsible");
  for(let i=0;i<inningsEle.length;i++){
    // htmlString= $(inningsEle[i]).html();

    let teamName= $(inningsEle[i]).find("h5").text();

    let opponentIndex= i==0?1:0;
    let opponentName= $(inningsEle[opponentIndex]).find("h5").text();
    let teamArr=teamName.split("INNINGS")[0].trim();
    let oppteamArr=opponentName.split("INNINGS")[0].trim();
    console.log( teamArr+"   "+oppteamArr);

    console.log("PLAYER NAME RUNS BALLS FOURS SIXES");

    let scInning= $(inningsEle[i]);

  let  rows= scInning.find(".table.batsman tbody tr");

  for(let j=0;j<rows.length;j++){
    let allcoll= $(rows[j]).find("td");

    // console.log($(allColl[2]).text());
    let ac = $(allcoll[0]).hasClass("batsman-cell");
      // let run = $(allColl[2]).text();
    if (ac==true){
      let playerName = $(allcoll[0]).text();
      let runs = $(allcoll[2]).text();
      let ball = $(allcoll[3]).text();
      let fours = $(allcoll[5]).text();
      let six = $(allcoll[6]).text();

      console.log(playerName + "      "+runs+"     "+ ball+"      "+fours+"        " +six);
      // console.log(`$(playerName) $(run)$(ball)$(fours)$(six)`);
    }
  }

  }
  

}
module.exports = {
  ps:processRequest
}
