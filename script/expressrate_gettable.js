// Write your Javascript code.
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}

//DHL的费率
function getexpressratedhl() {
   // alert("123");
    if (!document.getElementsByTagName) return false;
    var dhltab = document.getElementById("dhltabtable");
    var trStr = '';//动态拼接table

    var fulsurcharge = 0;
    for (i in fuelsurchargejson) 
    {
        if (fuelsurchargejson[i]["Company"] == "HKDHL")
        {
            fulsurcharge = fuelsurchargejson[i]["Rate"];
        }
    }

    var currencyratehktousd = 0 ;
    var currencyratermbtousd = 0 ;
    for(i in currencyratejson)
    {
        if( currencyratejson[i]["Currency"] == "港币")
        {
            currencyratehktousd = currencyratejson[i]["ExchangeRate"];
        }
        if( currencyratejson[i]["Currency"] == "人民币")
        {
            currencyratermbtousd = currencyratejson[i]["ExchangeRate"];
        }
    }

    trStr += '<h6>Currency: HKD ,HKD1 = USD'+currencyratehktousd+'; FuelSurcharge: '+ (fulsurcharge *100) +'%。</h6>';

    trStr += '<div class="table-responsive">';
    trStr += '<table class="table table-striped table-hover table-sm " > ';

    //var tables = document.getElementById("countryzonetable");

    trStr += "<thead><tr>"
    trStr +="<th>Package</th>";
    trStr +="<th>Weight</th>";
    for(var i=1;i<=10;i++)
    {
        trStr +='<th>zone'+i + '</th>' 
    }
    trStr +="</tr></thead>";
    trStr += "<tbody>";

    for(i in expressratedhljson)
    {               
        trStr += "<tr>";
        trStr += "<td>" + expressratedhljson[i]["Package"] + "</td>";
        trStr += "<td>" + expressratedhljson[i]["Weight"] + "</td>";
        for(var k =1 ;k<=10;k++)
        {           
            var currentrate = expressratedhljson[i]["Zone"+k];
          //  currentrate = (currentrate * ( 1 + fulsurcharge)).toFixed(2) ;            
            trStr += "<td>" + currentrate.toFixed(2) + "</td>";
        }
        trStr += "</tr>";    
    }
    trStr += "</tbody>";
    trStr += '</table> ';
    trStr += '</div> ';
    dhltab.innerHTML = trStr;
};

//TNT的费率
function getexpressratetnt() {
    // alert("123");
     if (!document.getElementsByTagName) return false;
     var dhltab = document.getElementById("tnttabtable");
     var trStr = '';//动态拼接table
 
     var fulsurcharge = 0;
     for (i in fuelsurchargejson) 
     {
         if (fuelsurchargejson[i]["Company"] == "HKTNT")
         {
             fulsurcharge = fuelsurchargejson[i]["Rate"];
         }
     }
 
     var currencyratehktousd = 0 ;
     var currencyratermbtousd = 0 ;
     for(i in currencyratejson)
     {
         if( currencyratejson[i]["Currency"] == "港币")
         {
             currencyratehktousd = currencyratejson[i]["ExchangeRate"];
         }
         if( currencyratejson[i]["Currency"] == "人民币")
         {
             currencyratermbtousd = currencyratejson[i]["ExchangeRate"];
         }
     }
 
     trStr += '<h6>Currency: HKD ,HKD1 = USD'+currencyratehktousd+'; FuelSurcharge: '+ (fulsurcharge *100) +'%。</h6>';
 
     trStr += '<div class="table-responsive">';
     trStr += '<table class="table table-striped table-hover table-sm " > ';
 
     //var tables = document.getElementById("countryzonetable");
 
     trStr += "<thead><tr>"
     trStr +="<th>Package</th>";
     trStr +="<th>Weight</th>";
     for(var i=1;i<=12;i++)
     {
         trStr +='<th>zone'+i + '</th>' 
     }
     trStr +="</tr></thead>";
     trStr += "<tbody>";
 
     for(i in expressratetntjson)
     {               
         trStr += "<tr>";
         trStr += "<td>" + expressratetntjson[i]["Package"] + "</td>";
         trStr += "<td>" + expressratetntjson[i]["Weight"] + "</td>";
         for(var k =1 ;k<=12;k++)
         {           
             var currentrate = expressratetntjson[i]["Zone"+k];
           //  currentrate = (currentrate * ( 1 + fulsurcharge)).toFixed(2) ;            
             trStr += "<td>" + currentrate.toFixed(2) + "</td>";
         }
         trStr += "</tr>";    
     }
     trStr += "</tbody>";
     trStr += '</table> ';
     trStr += '</div> ';
     dhltab.innerHTML = trStr;
 };
 

 //汕头DHL的费率
function getexpressratestdhl() {
    // alert("123");
     if (!document.getElementsByTagName) return false;
     var dhltab = document.getElementById("stdhltabtable");
     var trStr = '';//动态拼接table
 
     var fulsurcharge = 0;
     for (i in fuelsurchargejson) 
     {
         if (fuelsurchargejson[i]["Company"] == "STDHL")
         {
             fulsurcharge = fuelsurchargejson[i]["Rate"];
         }
     }
 
     var currencyratehktousd = 0 ;
     var currencyratermbtousd = 0 ;
     for(i in currencyratejson)
     {
         if( currencyratejson[i]["Currency"] == "港币")
         {
             currencyratehktousd = currencyratejson[i]["ExchangeRate"];
         }
         if( currencyratejson[i]["Currency"] == "人民币")
         {
             currencyratermbtousd = currencyratejson[i]["ExchangeRate"];
         }
     }
 
     trStr += '<h6>Currency: RMB ,HKD1 = USD'+currencyratermbtousd+'; FuelSurcharge: '+ (fulsurcharge *100) +'%。</h6>';
 
     trStr += '<div class="table-responsive">';
     trStr += '<table class="table table-striped table-hover table-sm " > ';
 
     //var tables = document.getElementById("countryzonetable");
 
     trStr += "<thead><tr>"
     trStr +="<th>Package</th>";
     trStr +="<th>Weight</th>";
     for(var i=1;i<=9;i++)
     {
         trStr +='<th>zone'+i + '</th>' 
     }
     trStr +="</tr></thead>";
     trStr += "<tbody>";
 
     for(i in expressratestdhljson)
     {               
         trStr += "<tr>";
         trStr += "<td>" + expressratestdhljson[i]["Package"] + "</td>";
         trStr += "<td>" + expressratestdhljson[i]["Weight"] + "</td>";
         for(var k =1 ;k<=9;k++)
         {           
             var currentrate = expressratestdhljson[i]["Zone"+k];
           //  currentrate = (currentrate * ( 1 + fulsurcharge)).toFixed(2) ;            
             trStr += "<td>" + currentrate.toFixed(2) + "</td>";
         }
         trStr += "</tr>";    
     }
     trStr += "</tbody>";
     trStr += '</table> ';
     trStr += '</div> ';
     dhltab.innerHTML = trStr;
 };
 

 //UPS SAVER的费率
function getexpressrateupssaver() {
    // alert("123");
     if (!document.getElementsByTagName) return false;
     var dhltab = document.getElementById("upssavertabtable");
     var trStr = '';//动态拼接table
 
     var fulsurcharge = 0;
     for (i in fuelsurchargejson) 
     {
         if (fuelsurchargejson[i]["Company"] == "UPS")
         {
             fulsurcharge = fuelsurchargejson[i]["Rate"];
         }
     }
 
     var currencyratehktousd = 0 ;
     var currencyratermbtousd = 0 ;
     for(i in currencyratejson)
     {
         if( currencyratejson[i]["Currency"] == "港币")
         {
             currencyratehktousd = currencyratejson[i]["ExchangeRate"];
         }
         if( currencyratejson[i]["Currency"] == "人民币")
         {
             currencyratermbtousd = currencyratejson[i]["ExchangeRate"];
         }
     }
 
     trStr += '<h6>Currency: HKD ,HKD1 = USD'+currencyratehktousd+'; FuelSurcharge: '+ (fulsurcharge *100) +'%。</h6>';
 
     trStr += '<div class="table-responsive">';
     trStr += '<table class="table table-striped table-hover table-sm " > ';
 
     //var tables = document.getElementById("countryzonetable");
 
     trStr += "<thead><tr>"
     trStr +="<th>Package</th>";
     trStr +="<th>Weight</th>";
     for(var i=1;i<=10;i++)
     {
         trStr +='<th>zone'+i + '</th>' 
     }
     trStr +="</tr></thead>";
     trStr += "<tbody>";
 
     for(i in expressrateupssaverjson)
     {               
         trStr += "<tr>";
         trStr += "<td>" + expressrateupssaverjson[i]["Package"] + "</td>";
         trStr += "<td>" + expressrateupssaverjson[i]["Weight"] + "</td>";
         for(var k =1 ;k<=10;k++)
         {           
             var currentrate = expressrateupssaverjson[i]["Zone"+k];
           //  currentrate = (currentrate * ( 1 + fulsurcharge)).toFixed(2) ;            
             trStr += "<td>" + currentrate.toFixed(2) + "</td>";
         }
         trStr += "</tr>";    
     }
     trStr += "</tbody>";
     trStr += '</table> ';
     trStr += '</div> ';
     dhltab.innerHTML = trStr;
 };

 //UPS Expedited的费率
function getexpressrateupsexpedited() {
    // alert("123");
     if (!document.getElementsByTagName) return false;
     var dhltab = document.getElementById("upsexpeditedtabtable");
     var trStr = '';//动态拼接table
 
     var fulsurcharge = 0;
     for (i in fuelsurchargejson) 
     {
         if (fuelsurchargejson[i]["Company"] == "UPS")
         {
             fulsurcharge = fuelsurchargejson[i]["Rate"];
         }
     }
 
     var currencyratehktousd = 0 ;
     var currencyratermbtousd = 0 ;
     for(i in currencyratejson)
     {
         if( currencyratejson[i]["Currency"] == "港币")
         {
             currencyratehktousd = currencyratejson[i]["ExchangeRate"];
         }
         if( currencyratejson[i]["Currency"] == "人民币")
         {
             currencyratermbtousd = currencyratejson[i]["ExchangeRate"];
         }
     }
 
     trStr += '<h6>Currency: HKD ,HKD1 = USD'+currencyratehktousd+'; FuelSurcharge: '+ (fulsurcharge *100) +'%。</h6>';
 
     trStr += '<div class="table-responsive">';
     trStr += '<table class="table table-striped table-hover table-sm " > ';
 
     //var tables = document.getElementById("countryzonetable");
 
     trStr += "<thead><tr>"
     trStr +="<th>Package</th>";
     trStr +="<th>Weight</th>";
     for(var i=1;i<=10;i++)
     {
         trStr +='<th>zone'+i + '</th>' 
     }
     trStr +="</tr></thead>";
     trStr += "<tbody>";
 
     for(i in expressrateupsexpeditedjson)
     {               
         trStr += "<tr>";
         trStr += "<td>" + expressrateupsexpeditedjson[i]["Package"] + "</td>";
         trStr += "<td>" + expressrateupsexpeditedjson[i]["Weight"] + "</td>";
         for(var k =1 ;k<=10;k++)
         {           
             var currentrate = expressrateupsexpeditedjson[i]["Zone"+k];
           //  currentrate = (currentrate * ( 1 + fulsurcharge)).toFixed(2) ;            
             trStr += "<td>" + currentrate.toFixed(2) + "</td>";
         }
         trStr += "</tr>";    
     }
     trStr += "</tbody>";
     trStr += '</table> ';
     trStr += '</div> ';
     dhltab.innerHTML = trStr;
 };

//UPS Expedited的费率
function getexpressrateupsexpedited() {
    // alert("123");
     if (!document.getElementsByTagName) return false;
     var dhltab = document.getElementById("upsexpeditedtabtable");
     var trStr = '';//动态拼接table
 
     var fulsurcharge = 0;
     for (i in fuelsurchargejson) 
     {
         if (fuelsurchargejson[i]["Company"] == "UPS")
         {
             fulsurcharge = fuelsurchargejson[i]["Rate"];
         }
     }
 
     var currencyratehktousd = 0 ;
     var currencyratermbtousd = 0 ;
     for(i in currencyratejson)
     {
         if( currencyratejson[i]["Currency"] == "港币")
         {
             currencyratehktousd = currencyratejson[i]["ExchangeRate"];
         }
         if( currencyratejson[i]["Currency"] == "人民币")
         {
             currencyratermbtousd = currencyratejson[i]["ExchangeRate"];
         }
     }
 
     trStr += '<h6>Currency: HKD ,HKD1 = USD'+currencyratehktousd+'; FuelSurcharge: '+ (fulsurcharge *100) +'%。</h6>';
 
     trStr += '<div class="table-responsive">';
     trStr += '<table class="table table-striped table-hover table-sm " > ';
 
     //var tables = document.getElementById("countryzonetable");
 
     trStr += "<thead><tr>"
     trStr +="<th>Package</th>";
     trStr +="<th>Weight</th>";
     for(var i=1;i<=10;i++)
     {
         trStr +='<th>zone'+i + '</th>' 
     }
     trStr +="</tr></thead>";
     trStr += "<tbody>";
 
     for(i in expressrateupsexpeditedjson)
     {               
         trStr += "<tr>";
         trStr += "<td>" + expressrateupsexpeditedjson[i]["Package"] + "</td>";
         trStr += "<td>" + expressrateupsexpeditedjson[i]["Weight"] + "</td>";
         for(var k =1 ;k<=10;k++)
         {           
             var currentrate = expressrateupsexpeditedjson[i]["Zone"+k];
           //  currentrate = (currentrate * ( 1 + fulsurcharge)).toFixed(2) ;            
             trStr += "<td>" + currentrate.toFixed(2) + "</td>";
         }
         trStr += "</tr>";    
     }
     trStr += "</tbody>";
     trStr += '</table> ';
     trStr += '</div> ';
     dhltab.innerHTML = trStr;
 };


//FEDEX IEE 的费率
function getexpressratefedexiee() {
    // alert("123");
     if (!document.getElementsByTagName) return false;
     var dhltab = document.getElementById("fedexieetabtable");
     var trStr = '';//动态拼接table
 
     var fulsurcharge = 0;
     for (i in fuelsurchargejson) 
     {
         if (fuelsurchargejson[i]["Company"] == "Fedex")
         {
             fulsurcharge = fuelsurchargejson[i]["Rate"];
         }
     }
 
     var currencyratehktousd = 0 ;
     var currencyratermbtousd = 0 ;
     for(i in currencyratejson)
     {
         if( currencyratejson[i]["Currency"] == "港币")
         {
             currencyratehktousd = currencyratejson[i]["ExchangeRate"];
         }
         if( currencyratejson[i]["Currency"] == "人民币")
         {
             currencyratermbtousd = currencyratejson[i]["ExchangeRate"];
         }
     }
 
     trStr += '<h6>Currency: HKD ,HKD1 = USD'+currencyratehktousd+'; FuelSurcharge: '+ (fulsurcharge *100) +'%。</h6>';
 
     trStr += '<div class="table-responsive">';
     trStr += '<table class="table table-striped table-hover table-sm " > ';
 
     //var tables = document.getElementById("countryzonetable");
 
     trStr += "<thead><tr>"
     trStr +="<th>Package</th>";
     trStr +="<th>Weight</th>";     
     trStr += "<th>ZoneA</th>";
     trStr += "<th>ZoneB</th>";
     trStr += "<th>ZoneC</th>";
     trStr += "<th>ZoneD</th>";
     trStr += "<th>ZoneE</th>";
     trStr += "<th>ZoneF</th>";
     trStr += "<th>ZoneG</th>";
     trStr += "<th>ZoneH</th>";
     trStr += "<th>ZoneJ</th>";  
     trStr += "<th>Zone1</th>";
     trStr += "<th>Zone2</th>";  
     trStr +="</tr></thead>";
     trStr += "<tbody>";
 
     for(i in expressratefedexieejson)
     {               
         trStr += "<tr>";
         trStr += "<td>" + expressratefedexieejson[i]["Package"] + "</td>";
         trStr += "<td>" + expressratefedexieejson[i]["Weight"] + "</td>";        
         trStr += "<td>" + (expressratefedexieejson[i]["ZoneA"]).toFixed(2)  + "</td>";
         trStr += "<td>" + (expressratefedexieejson[i]["ZoneB"]).toFixed(2)  + "</td>";
         trStr += "<td>" + (expressratefedexieejson[i]["ZoneC"]).toFixed(2)  + "</td>";
         trStr += "<td>" + (expressratefedexieejson[i]["ZoneD"]).toFixed(2)  + "</td>";
         trStr += "<td>" + (expressratefedexieejson[i]["ZoneE"]).toFixed(2)  + "</td>";
         trStr += "<td>" + (expressratefedexieejson[i]["ZoneF"]).toFixed(2)  + "</td>";
         trStr += "<td>" + (expressratefedexieejson[i]["ZoneG"]).toFixed(2)  + "</td>";
         trStr += "<td>" + (expressratefedexieejson[i]["ZoneH"]).toFixed(2)  + "</td>";
         trStr += "<td>" + (expressratefedexieejson[i]["ZoneJ"]).toFixed(2)  + "</td>";
         trStr += "<td>" + (expressratefedexieejson[i]["Zone1"]).toFixed(2)  + "</td>";
         trStr += "<td>" + (expressratefedexieejson[i]["Zone2"]).toFixed(2)  + "</td>";
         trStr += "</tr>";    
     }
     trStr += "</tbody>";
     trStr += '</table> ';
     trStr += '</div> ';
     dhltab.innerHTML = trStr;
 };
 
//FEDEX IPE 的费率
function getexpressratefedexipe() {
    // alert("123");
     if (!document.getElementsByTagName) return false;
     var dhltab = document.getElementById("fedexipetabtable");
     var trStr = '';//动态拼接table
 
     var fulsurcharge = 0;
     for (i in fuelsurchargejson) 
     {
         if (fuelsurchargejson[i]["Company"] == "Fedex")
         {
             fulsurcharge = fuelsurchargejson[i]["Rate"];
         }
     }
 
     var currencyratehktousd = 0 ;
     var currencyratermbtousd = 0 ;
     for(i in currencyratejson)
     {
         if( currencyratejson[i]["Currency"] == "港币")
         {
             currencyratehktousd = currencyratejson[i]["ExchangeRate"];
         }
         if( currencyratejson[i]["Currency"] == "人民币")
         {
             currencyratermbtousd = currencyratejson[i]["ExchangeRate"];
         }
     }
 
     trStr += '<h6>Currency: HKD ,HKD1 = USD'+currencyratehktousd+'; FuelSurcharge: '+ (fulsurcharge *100) +'%。</h6>';
 
     trStr += '<div class="table-responsive">';
     trStr += '<table class="table table-striped table-hover table-sm " > ';
 
     //var tables = document.getElementById("countryzonetable");
 
     trStr += "<thead><tr>"
     trStr +="<th>Package</th>";
     trStr +="<th>Weight</th>";
     trStr += "<th>Zone1</th>";
     trStr += "<th>Zone2</th>";
     trStr += "<th>ZoneA</th>";
     trStr += "<th>ZoneB</th>";
     trStr += "<th>ZoneC</th>";
     trStr += "<th>ZoneD</th>";
     trStr += "<th>ZoneE</th>";
     trStr += "<th>ZoneF</th>";
     trStr += "<th>ZoneG</th>";
     trStr += "<th>ZoneH</th>";
     trStr += "<th>ZoneJ</th>";
     trStr +="</tr></thead>";
     trStr += "<tbody>";
 
     for(i in expressratefedexipejson)
     {               
         trStr += "<tr>";
         trStr += "<td>" + expressratefedexipejson[i]["Package"] + "</td>";
         trStr += "<td>" + expressratefedexipejson[i]["Weight"] + "</td>";
         trStr += "<td>" + (expressratefedexipejson[i]["Zone1"]).toFixed(2)  + "</td>";
         trStr += "<td>" + (expressratefedexipejson[i]["Zone2"]).toFixed(2)  + "</td>";
         trStr += "<td>" + (expressratefedexipejson[i]["ZoneA"]).toFixed(2)  + "</td>";
         trStr += "<td>" + (expressratefedexipejson[i]["ZoneB"]).toFixed(2)  + "</td>";
         trStr += "<td>" + (expressratefedexipejson[i]["ZoneC"]).toFixed(2)  + "</td>";
         trStr += "<td>" + (expressratefedexipejson[i]["ZoneD"]).toFixed(2)  + "</td>";
         trStr += "<td>" + (expressratefedexipejson[i]["ZoneE"]).toFixed(2)  + "</td>";
         trStr += "<td>" + (expressratefedexipejson[i]["ZoneF"]).toFixed(2)  + "</td>";
         trStr += "<td>" + (expressratefedexipejson[i]["ZoneG"]).toFixed(2)  + "</td>";
         trStr += "<td>" + (expressratefedexipejson[i]["ZoneH"]).toFixed(2)  + "</td>";
         trStr += "<td>" + (expressratefedexipejson[i]["ZoneJ"]).toFixed(2)  + "</td>";
         trStr += "</tr>";    
     }
     trStr += "</tbody>";
     trStr += '</table> ';
     trStr += '</div> ';
     dhltab.innerHTML = trStr;
 };
//修改已经选择的装箱的件数和自定义尺寸重量.
$(document).ready(function(){
    $('div[name="divsearchcountry"]').on('input',function(){
     // getcountryselect();
     getcountryzonetable();
    });
    
  });
  

function loadEvents() {
    //判断时间是否过期.
   // alert(isValidity());
    if(isValidity()==true)
    {
        //加载产品列表. 
        getexpressratedhl();   
        getexpressratetnt();
        getexpressratestdhl();
      //  getexpressrateupssaver();
      //  getexpressrateupsexpedited() ;
        getexpressratefedexiee();
        getexpressratefedexipe()
    }
}



// Load events
//addLoadEvent(highlightPage);
addLoadEvent(loadEvents);