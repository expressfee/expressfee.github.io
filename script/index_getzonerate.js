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

function zoneandratemodalshow() {
    $("#zoneandrateModal").on("show.bs.modal", function () {

        var currencycountry = document.getElementById("countryselect");
      //  var countryname = currencycountry.options[selectId.selectedIndex].text;
        var countryid = currencycountry.value;
        var countryname = "";
        var areaname = "";
        var zonedhl = "";
        var zonetnt = "";
        var zonestdhl = "";
       // var zoneupssaver = "";
       // var zoneupsexpedited = "";
        var zonefedexiee = "";
        var zonefredexipe = "";
        var countryremark = "";

        for (i in countryjson) {
            if (countryid == countryjson[i]["CountryId"])
            {
                countryname = countryjson[i]["NameEn"];
                areaname = countryjson[i]["AreaEn"];
                zonedhl = countryjson[i]["ZoneHkDhl"];
                zonetnt = countryjson[i]["ZoneHkTnt"];
                zonestdhl = countryjson[i]["ZoneStDhl"];
              //  zoneupssaver = countryjson[i]["ZoneUpsSaver"];
              //  zoneupsexpedited = countryjson[i]["ZoneUpsExpedited"];
                zonefedexiee = countryjson[i]["ZoneFedexIee"];
                zonefredexipe = countryjson[i]["ZoneFedexIpe"];
                countryremark = countryjson[i]["Remark"];
            }
        }

        var chargeweight = 0.5;

        chargeweight = getchargeweight();

        //超长费，超重费
        var timeofsurchargeofweightandlenth = 0;
        timeofsurchargeofweightandlenth = gettimeofsurchargeofweightandlenth();

    //    var txtweight = document.getElementById("txtweight");

      //  txtweight.value = chargeweight;

        var lblexample = document.getElementById("exampleModalLabel");

        lblexample.innerHTML = titleFirstChartUpperCase(countryname + ' ' + areaname) + ",  Weight: " + chargeweight;


        //加入备注。
        var lblcountryremark = document.getElementById("countryremark");

        lblcountryremark.innerHTML = countryremark;

        var tables = document.getElementById("expresstable");

        var trStr = '';//动态拼接table
        // var html = '';
        trStr += "<thead><tr>"
        // trStr +="<th>ProductId</th>";
        // trStr +="<th>ProductClass</th>";
        trStr += "<th>Express</th>";
        trStr += "<th>Zone</th>";
        trStr +="<th>Rate(LOCAL)</th>";    
        trStr += "<th>Rate(USD)</th>";
        trStr += "</tr></thead>";

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

        var hksurcharge = new Number(0) ;
        hksurcharge = timeofsurchargeofweightandlenth * 900 ;
        var stsurcharge = new Number(0) ;
        stsurcharge = timeofsurchargeofweightandlenth * 600 ;
       // alert(chargeweight);
       // alert(hksurcharge);
         //香港DHL的港币金额和美元金额        
         var dhllocalrate = new Number(getdhllocalrate(countryid, zonedhl, chargeweight)) ;
      //   alert(dhllocalrate);
         if(dhllocalrate>0)
         {
             dhllocalrate = dhllocalrate+ hksurcharge ;
         }        
        // var num = new Number(value);
        // dhllocalrate = dhllocalrate + hksurcharge ;
         var dhlusdrate = decimaltofiveorten(dhllocalrate * currencyratehktousd);
 
         //汕头DHL的港币金额和美元金额
         var stdhllocalrate = new Number(getstdhllocalrate(countryid, zonestdhl,chargeweight)) ;
         if(stdhllocalrate>0)
         {
             stdhllocalrate=stdhllocalrate+ stsurcharge ;
         }
         var stdhlusdrate = decimaltofiveorten(stdhllocalrate * currencyratermbtousd);
        // alert(stdhllocalrate)
        // alert(stdhllocalrate)
         //香港TNT的港币金额和美元金额
         var tntlocalrate = new Number( gettntlocalrate(zonetnt,chargeweight)) ;  
   
         if(tntlocalrate>0){
             tntlocalrate=tntlocalrate+ hksurcharge ;
         }
         var tntusdrate = decimaltofiveorten(tntlocalrate * currencyratehktousd);
                 
         //香港UPSAVER的港币金额和美元金额                
        // var upssaverlocalrate = getupssaverlocalrate(zoneupssaver,chargeweight);                  
       //  var upssaverusdrate = decimaltofiveorten(upssaverlocalrate * currencyratehktousd);
 
         //香港UPSEXPEDITED的港币金额和美元金额     
       //  var upsexpeditedlocalrate = getupsexpeditedlocalrate(zoneupsexpedited,chargeweight);     
        // var upsexpeditedusdrate = decimaltofiveorten(upsexpeditedlocalrate * currencyratehktousd);
      
         //香港FEDEXIEE的港币金额和美元金额   
         var fedexieelocalrate = new Number(getfedexieelocalrate(countryid, zonefedexiee,chargeweight)) ;  
         if(fedexieelocalrate>0){
             fedexieelocalrate=fedexieelocalrate+ hksurcharge ;
         }
         var fedexieeusdrate = decimaltofiveorten(fedexieelocalrate * currencyratehktousd);
 
         //香港FEDEXIPE的港币金额和美元金额  
        var fedexipelocalrate = new Number(getfedexipelocalrate(countryid, zonefredexipe,chargeweight)) ;  
        if(fedexipelocalrate>0){
         fedexipelocalrate=fedexipelocalrate+ hksurcharge ;
     }
        var fedexipeusdrate = decimaltofiveorten(fedexipelocalrate * currencyratehktousd);
       
        // 表头。todo历遍。
        trStr += "<tbody>";
        trStr += "<tr>" + "<td>DHL</td>" + "<td>" + zonedhl + "</td>" + "<td>" + dhllocalrate + "</td>" +  "<td>" + dhlusdrate + "</td>" +"</tr>";
        trStr += "<tr>" + "<td>TNT</td>" + "<td>" + zonetnt + "</td>" + "<td>" + tntlocalrate + "</td>" + "<td>" + tntusdrate + "</td>" +"</tr>";       
      //  trStr += "<tr>" + "<td>UPSAVER</td>" + "<td>" + zoneupssaver + "</td>" + "<td>" + upssaverlocalrate + "</td>" + "<td>" + upssaverusdrate + "</td>" +"</tr>";
      //  trStr += "<tr>" + "<td>UPSEXPEDITED</td>" + "<td>" + zoneupsexpedited + "</td>" + "<td>" + upsexpeditedlocalrate + "</td>" + "<td>" + upsexpeditedusdrate + "</td>" +"</tr>";
    //    trStr += "<tr>" + "<td>FEDEX</td>" + "<td>" + zonefedexiee + "</td>" + "<td>" + fedexieelocalrate + "</td>" + "<td>" + fedexieeusdrate + "</td>" +"</tr>";
        trStr += "<tr>" + "<td>FEDEXIPE</td>" + "<td>" + zonefredexipe + "</td>" + "<td>" + fedexipelocalrate + "</td>" + "<td>" + fedexipeusdrate + "</td>" +"</tr>";
        trStr += "<tr>" + "<td>STDHL</td>" + "<td>" + zonestdhl + "</td>" + "<td>" + stdhllocalrate + "</td>" + "<td>" + stdhlusdrate + "</td>" +"</tr>";
        trStr += "</tbody>";     
        tables.innerHTML = trStr;

    })
}

// 超长和超重费用的计数
function gettimeofsurchargeofweightandlenth() {

    
    var tb = document.getElementById('selecttable');    // table 的 id
    //  var rows = tb.rows;             // 获取表格所有行
    //tbody
    var childtbody = tb.getElementsByTagName("tbody")[0];//获取行的第一个单元格
    var rows = childtbody.rows;
    var quantity = 0;
    var weight = 0.5;
    var volumeweight = 0.5;
    var timeofsurchargeofweightandlenth = 0 ;
    if (rows.length>0)
    {
        quantity = 0;
        weight = 0;
        volumeweight = 0;
    }

    for (var i = 0; i < rows.length; i++) {
        // Names = tb.rows[i].cells[0].getElementsByTagName("INPUT")[0].value;
        var entityquantity = parseInt(rows[i].cells[1].getElementsByTagName("input")[0].value);
        var entityweight = rows[i].cells[2].getElementsByTagName("input")[0].value;
        var entitylength = rows[i].cells[3].getElementsByTagName("input")[0].value;
        var entitywidth = rows[i].cells[4].getElementsByTagName("input")[0].value;
        var entityheight = rows[i].cells[5].getElementsByTagName("input")[0].value;
     
        // 体积重
        var currentyvweight = (((entitylength * entitywidth * entityheight) / 1000000) * 200 ) ;

        if(entityweight>=70 || currentyvweight >=70 ){
            //单件大于70kg
            timeofsurchargeofweightandlenth += 1;
        }
        if(entitylength>=120 || entitywidth >=120 || entityheight >=120 ){
            //单件大于70kg
            timeofsurchargeofweightandlenth += 1;
        }
        timeofsurchargeofweightandlenth = timeofsurchargeofweightandlenth * entityquantity ;
    }
  //  alert(timeofsurchargeofweightandlenth)
    return timeofsurchargeofweightandlenth ;
}

//计费重量.
function getchargeweight() {

    var tb = document.getElementById('selecttable');    // table 的 id
    //  var rows = tb.rows;             // 获取表格所有行
    //tbody
    var childtbody = tb.getElementsByTagName("tbody")[0];//获取行的第一个单元格
    var rows = childtbody.rows;
    var quantity = 0;
    var weight = 0.5;
    var volumeweight = 0.5;
    if (rows.length>0)
    {
        quantity = 0;
        weight = 0;
        volumeweight = 0;
    }

    for (var i = 0; i < rows.length; i++) {
        // Names = tb.rows[i].cells[0].getElementsByTagName("INPUT")[0].value;
        var entityquantity = parseInt(rows[i].cells[1].getElementsByTagName("input")[0].value);
        var entityweight = rows[i].cells[2].getElementsByTagName("input")[0].value;
        var entitylength = rows[i].cells[3].getElementsByTagName("input")[0].value;
        var entitywidth = rows[i].cells[4].getElementsByTagName("input")[0].value;
        var entityheight = rows[i].cells[5].getElementsByTagName("input")[0].value;
      //  alert(quantitystring + "|" + weightstring);
        weight += entityweight * entityquantity;

        var currentyvweight = (((entitylength * entitywidth * entityheight) / 1000000) * 200 ) ;

        volumeweight +=  currentyvweight * entityquantity;
    }
   // alert(volumeweight)
    volumeweight = volumeweight.toFixed(2) ;

    if( weight > volumeweight)
    {
        return weight;
    }
    else
    {
        return volumeweight;
    }
}

//香港DHL的价格
function getdhllocalrate(countryid,zonedhl, chargeweight){
     //当chargeweight在30-30.1时，转为30.1.
     if(chargeweight>30 && chargeweight<=30.1){
         chargeweight=30.1;
     }
    var subweight = 1000000; //重量差.
    var currencyrate = 0 ;//费率.
    var objcount =0 ;
    for (i in ratedhljson) {
        var entityzone = ratedhljson[i]["Zone"];//当前分区
        var entityweight = ratedhljson[i]["Weight"];//当前重量
        var entittyrate = ratedhljson[i]["ChargeRate"];//当前费率 
        if (zonedhl == entityzone )
        {
            objcount +=1;  
            //分区相同才判断。价格对应的重量大于产品重量. 
            //chargeweight = 30.02
            if (chargeweight <= 30)
            {
                //重量小于等于30KG，查的是单价。价格对应的重量大于货物的重量，最小的一个.
                if (entityweight >= chargeweight )
                {
                    //对比重量差。最小的就是我们要的.        
                    var currencysubweight = entityweight- chargeweight  ;
                    if (currencysubweight <= subweight)
                    {
                     subweight = currencysubweight;
                     currencyrate = entittyrate;
                    }
                }        
            }
            else
            {               
                //chargeweight = 30.02
                //大于30KG. 30-40,35， 价格对应的重量= 30，货物的重量 = 35， 价格对应的重量小于货物的重量，最小的一个.
                if ( entityweight <= chargeweight  )
                {                               
                    //重量大于查询重量. 对比重量差。最小的就是我们要的.        
                    var currencysubweight = chargeweight - entityweight  ;
                    if (currencysubweight <= subweight)
                    {
                     subweight = currencysubweight;
                     currencyrate = entittyrate * chargeweight;
                    }
                }                     
            }
        }
    }
    var fulsurcharge = 0;
    for (i in fuelsurchargejson) {
        if (fuelsurchargejson[i]["Company"] == "HKDHL")
        {
            fulsurcharge = fuelsurchargejson[i]["Rate"];
        }
    }

   // alert(currencyrate);
    //疫情附加费.
    var emergencysurcharge = new Number(0);
    emergencysurcharge = getdhless(countryid,chargeweight);
   // alert(emergencysurcharge);
    currencyrate = currencyrate + emergencysurcharge ;
    //紧急附加费需要作为燃油费基数.
  //  alert(emergencysurcharge);
    currencyrate = (currencyrate * ( 1 + fulsurcharge) ).toFixed(2) ;

    //DHL的分区是0的时候，没有服务，费用是0.
    if(zonedhl=="0"){
        currencyrate = 0 ;
    }
    return currencyrate;
}

function getdhless(countryid , chargeweight){
    
    var emergencysurcharge = new Number(0);
    if(countryid > 601 ){
        //大洋洲
        emergencysurcharge = chargeweight * 18 ;
    }
    else
    {
        emergencysurcharge =  chargeweight * 8 ;
    }
    return emergencysurcharge;
}

function gethkemergencysurcharge(chargeweight){
    
    var emergencysurcharge = new Number(0);
   
    emergencysurcharge = chargeweight * 7.5 ;
   
    return emergencysurcharge;
}


//香港TNT的价格
function gettntlocalrate(zonetnt,chargeweight){
    //总价和斤价临界点
    //当chargeweight在20-20.1时，转为20.1.
    if(chargeweight > 20.5 && chargeweight <= 20.6){
        chargeweight = 20.6;
    }

    var subweight = 1000000; //重量差.
    var currencyrate = 0 ;//费率.

    for (i in ratetntjson) {
        var entityzone = ratetntjson[i]["Zone"];//当前分区
        var entityweight = ratetntjson[i]["Weight"];//当前重量
        var entittyrate = ratetntjson[i]["ChargeRate"];//当前费率 
        if (zonetnt == entityzone )
        {             
            //分区相同才判断。价格对应的重量大于产品重量. 
            if (chargeweight <= 20.5)
            {
                //重量小于等于20KG，查的是单价。价格对应的重量大于货物的重量，最小的一个.
                if (entityweight >= chargeweight )
                {
                    //对比重量差。最小的就是我们要的.        
                    var currencysubweight = entityweight- chargeweight  ;
                    if (currencysubweight <= subweight)
                    {
                     subweight = currencysubweight;
                     currencyrate = entittyrate;
                    }
                }        
            }
            else
            {
                //21
                //大于20KG. 30-40,35， 价格对应的重量= 30，货物的重量 = 35， 价格对应的重量小于货物的重量，最小的一个.
                if ( entityweight <= chargeweight  )
                {                               
                    //重量大于查询重量. 对比重量差。最小的就是我们要的.        
                    var currencysubweight = chargeweight - entityweight  ;
                    if (currencysubweight <= subweight)
                    {
                     //   alert(entittyrate);
                     subweight = currencysubweight;
                     currencyrate = entittyrate * chargeweight;
                    }
                }        
            }
        }
    }
    var fulsurcharge = 0; //燃油附加费.
    for (i in fuelsurchargejson) {
        if (fuelsurchargejson[i]["Company"] == "HKTNT")
        {
            fulsurcharge = fuelsurchargejson[i]["Rate"];
        }
    }

   //疫情附加费.
   var emergencysurcharge = new Number(0);
   
   emergencysurcharge = gethkemergencysurcharge(chargeweight) 
 //   alert(currencyrate);
  //  alert(emergencysurcharge);
  currencyrate = currencyrate + emergencysurcharge ;
  //紧急附加费需要作为燃油费基数.
//  alert(emergencysurcharge);
  currencyrate = (currencyrate * ( 1 + fulsurcharge) ).toFixed(2) ;

   // currencyrate = (currencyrate * ( 1 + fulsurcharge) + emergencysurcharge ).toFixed(2) ;
  
  //TNT的分区是0的时候，没有服务，费用是0.
  if(zonetnt=="0"){
    currencyrate = 0 ;
    }
   return currencyrate;
}

//香港UPSSAVER的价格
function getupssaverlocalrate(zoneupssaver,chargeweight){
    
    //当chargeweight在20-20.1时，转为20.1.
    if(chargeweight > 20 && chargeweight <= 20.1){
        chargeweight = 20.1;
    }

    var subweight = 1000000; //重量差.
    var currencyrate = 0 ;//费率.

    for (i in rateupssaverjson) {
        var entityzone = rateupssaverjson[i]["Zone"];//当前分区
        var entityweight = rateupssaverjson[i]["Weight"];//当前重量
        var entittyrate = rateupssaverjson[i]["ChargeRate"];//当前费率 
        if (zoneupssaver == entityzone )
        {
            //分区相同才判断。价格对应的重量大于产品重量. 
            if (chargeweight <= 20)
            {
                //重量小于等于20KG，查的是单价。价格对应的重量大于货物的重量，最小的一个.
                if (entityweight >= chargeweight )
                {
                    //对比重量差。最小的就是我们要的.        
                    var currencysubweight = entityweight- chargeweight  ;
                    if (currencysubweight <= subweight)
                    {
                     subweight = currencysubweight;
                     currencyrate = entittyrate;
                    }
                }        
            }
            else
            {
                //大于20KG. 30-40,35， 价格对应的重量= 30，货物的重量 = 35， 价格对应的重量小于货物的重量，最小的一个.
                if ( entityweight <= chargeweight  )
                {                               
                    //重量大于查询重量. 对比重量差。最小的就是我们要的.        
                    var currencysubweight = chargeweight - entityweight  ;
                    if (currencysubweight <= subweight)
                    {
                     subweight = currencysubweight;
                     currencyrate = entittyrate * chargeweight;
                    }
                }     
            }
        }
    }
    
  //  alert("getupssaverlocalrate " + currencyrate );

    var fulsurcharge = 0;
    for (i in fuelsurchargejson) {
        if (fuelsurchargejson[i]["Company"] == "UPS")
        {
            fulsurcharge = fuelsurchargejson[i]["Rate"];
        }
    }
    //疫情附加费.
    var emergencysurcharge = new Number(0);
    emergencysurcharge = gethkemergencysurcharge(chargeweight)

    currencyrate = currencyrate + emergencysurcharge ;
    //紧急附加费需要作为燃油费基数.
  //  alert(emergencysurcharge);
    currencyrate = (currencyrate * ( 1 + fulsurcharge) ).toFixed(2) ;

  //  currencyrate = (currencyrate * ( 1 + fulsurcharge) + emergencysurcharge ).toFixed(2) ;
  //  currencyrate = (currencyrate * ( 1 + fulsurcharge)).toFixed(2) ;

if(zoneupssaver=="0"){
    currencyrate= 0 ;   
}

    return currencyrate;
}

//香港UPSEXPEDITED的价格
function getupsexpeditedlocalrate(zoneupsexpedited,chargeweight){

       //当chargeweight在70-70.1时，转为20.1.
       if(chargeweight > 70 && chargeweight <= 70.1){
        chargeweight = 70.1;
        }

    var subweight = 1000000; //重量差.
    var currencyrate = 0 ;//费率.

    for (i in rateupsexpjson) {
        var entityzone = rateupsexpjson[i]["Zone"];//当前分区
        var entityweight = rateupsexpjson[i]["Weight"];//当前重量
        var entittyrate = rateupsexpjson[i]["ChargeRate"];//当前费率 
        if (zoneupsexpedited == entityzone )
        {
            //分区相同才判断。价格对应的重量大于产品重量. 
            if (chargeweight <= 70)
            {
                //重量小于等于20KG，查的是单价。价格对应的重量大于货物的重量，最小的一个.
                if (entityweight >= chargeweight )
                {
                    //对比重量差。最小的就是我们要的.        
                    var currencysubweight = entityweight- chargeweight  ;
                    if (currencysubweight <= subweight)
                    {
                     subweight = currencysubweight;
                     currencyrate = entittyrate;
                    }
                }        
            }
            else
            {
                //大于20KG. 30-40,35， 价格对应的重量= 30，货物的重量 = 35， 价格对应的重量小于货物的重量，最小的一个.
                if ( entityweight <= chargeweight  )
                {                               
                    //重量大于查询重量. 对比重量差。最小的就是我们要的.        
                    var currencysubweight = chargeweight - entityweight  ;
                    if (currencysubweight <= subweight)
                    {
                     subweight = currencysubweight;
                     currencyrate = entittyrate * chargeweight;
                    }
                }        
            }
        }
    }
    
    var fulsurcharge = 0;
    for (i in fuelsurchargejson) {
        if (fuelsurchargejson[i]["Company"] == "UPS")
        {
            fulsurcharge = fuelsurchargejson[i]["Rate"];
        }
    }
    //疫情附加费.
    var emergencysurcharge = new Number(0);
    emergencysurcharge = gethkemergencysurcharge(chargeweight)

    currencyrate = currencyrate + emergencysurcharge ;
    //紧急附加费需要作为燃油费基数.
  //  alert(emergencysurcharge);
    currencyrate = (currencyrate * ( 1 + fulsurcharge) ).toFixed(2) ;

 //   currencyrate = (currencyrate * ( 1 + fulsurcharge) + emergencysurcharge ).toFixed(2) ;
  //  currencyrate = (currencyrate * ( 1 + fulsurcharge)).toFixed(2) ;
   if(zoneupsexpedited=="0"){
    currencyrate = 0;
   }
  return currencyrate;
}

//香港FEDEXIEE的价格
function getfedexieelocalrate(countryid, zonefedexiee, chargeweight){

     //当chargeweight在20.5 -20.6 时，转为20.6.
     if(chargeweight > 20.5 && chargeweight <= 20.6 ){
        chargeweight = 20.6;
        }

    var subweight = 1000000; //重量差.
    var currencyrate = 0 ;//费率.

    for (i in ratefedexieejson) {
        var entityzone = ratefedexieejson[i]["Zone"];//当前分区
        var entityweight = ratefedexieejson[i]["Weight"];//当前重量
        var entittyrate = ratefedexieejson[i]["ChargeRate"];//当前费率 
        if (zonefedexiee == entityzone )
        { 
            //分区相同才判断。价格对应的重量大于产品重量. 
            if (chargeweight <= 20.5)
            {
                //重量小于等于20KG，查的是单价。价格对应的重量大于货物的重量，最小的一个.
                if (entityweight >= chargeweight )
                {
                    //对比重量差。最小的就是我们要的.        
                    var currencysubweight = entityweight- chargeweight  ;
                    if (currencysubweight <= subweight)
                    {
                     subweight = currencysubweight;
                     currencyrate = entittyrate;
                    }
                }        
            }
            else
            {
                //大于20KG. 30-40,35， 价格对应的重量= 30，货物的重量 = 35， 价格对应的重量小于货物的重量，最小的一个.
                if ( entityweight <= chargeweight  )
                {                               
                    //重量大于查询重量. 对比重量差。最小的就是我们要的.        
                    var currencysubweight = chargeweight - entityweight  ;
                    if (currencysubweight <= subweight)
                    {
                     subweight = currencysubweight;
                     currencyrate = entittyrate * chargeweight;
                    }
                }        
            }
        }
    }
    var fulsurcharge = 0;
    for (i in fuelsurchargejson) {
        if (fuelsurchargejson[i]["Company"] == "Fedex")
        {
            fulsurcharge = fuelsurchargejson[i]["Rate"];
        }
    }
    //疫情附加费.
    var emergencysurcharge = new Number(0);
    emergencysurcharge = getfedexemergencysurcharge(countryid, chargeweight)

    currencyrate = currencyrate + emergencysurcharge ;
    //紧急附加费需要作为燃油费基数.
  //  alert(emergencysurcharge);
    currencyrate = (currencyrate * ( 1 + fulsurcharge) ).toFixed(2) ;

  //  currencyrate = (currencyrate * ( 1 + fulsurcharge) + emergencysurcharge ).toFixed(2) ;
   // currencyrate = (currencyrate * ( 1 + fulsurcharge)).toFixed(2) ;
   if(zonefedexiee == "0" ){
    currencyrate = 0 ;
   }
    return currencyrate;
}

//香港FEDEXIPE的价格
function getfedexipelocalrate(countryid, zonefedexipe,chargeweight){

    //当chargeweight在20.5 -20.6 时，转为20.6.
    if(chargeweight > 20.5 && chargeweight <= 20.6 ){
        chargeweight = 20.6;
        }

        
    var subweight = 1000000; //重量差.
    var currencyrate = 0 ;//费率.

    for (i in ratefedexipejson) {
        var entityzone = ratefedexipejson[i]["Zone"];//当前分区
        var entityweight = ratefedexipejson[i]["Weight"];//当前重量
        var entittyrate = ratefedexipejson[i]["ChargeRate"];//当前费率 
        if (zonefedexipe == entityzone )
        {
            //分区相同才判断。价格对应的重量大于产品重量. 
            if (chargeweight <= 20.5)
            {
                //重量小于等于20KG，查的是单价。价格对应的重量大于货物的重量，最小的一个.
                if (entityweight >= chargeweight )
                {
                    //对比重量差。最小的就是我们要的.        
                    var currencysubweight = entityweight- chargeweight  ;
                    if (currencysubweight <= subweight)
                    {
                     subweight = currencysubweight;
                     currencyrate = entittyrate;
                    }
                }        
            }
            else
            {
                //大于20KG. 30-40,35， 价格对应的重量= 30，货物的重量 = 35， 价格对应的重量小于货物的重量，最小的一个.
                if ( entityweight <= chargeweight  )
                {                               
                    //重量大于查询重量. 对比重量差。最小的就是我们要的.        
                    var currencysubweight = chargeweight - entityweight  ;
                    if (currencysubweight <= subweight)
                    {
                     subweight = currencysubweight;
                     currencyrate = entittyrate * chargeweight;
                    }
                }        
            }
        }
    }
    var fulsurcharge = 0;
    for (i in fuelsurchargejson) {
        if (fuelsurchargejson[i]["Company"] == "Fedex")
        {
            fulsurcharge = fuelsurchargejson[i]["Rate"];
        }
    }
    //疫情附加费.
    var emergencysurcharge = new Number(0);
    emergencysurcharge = getfedexemergencysurcharge(countryid, chargeweight)
   // alert(countryid);
   // alert(emergencysurcharge);
    currencyrate = currencyrate + emergencysurcharge ;
    //紧急附加费需要作为燃油费基数.
  //  alert(emergencysurcharge);
    currencyrate = (currencyrate * ( 1 + fulsurcharge) ).toFixed(2) ;
    
   // currencyrate = (currencyrate * ( 1 + fulsurcharge) + emergencysurcharge ).toFixed(2) ;
  //  currencyrate = (currencyrate * ( 1 + fulsurcharge)).toFixed(2) ;

  if(zonefedexipe == "0" ){
    currencyrate = 0 ;
   }
    return currencyrate;
}

function getfedexemergencysurcharge(countryid, chargeweight){
    var emergencysurcharge = new Number(0);
    if(countryid > 500 )
    {
        //北美和大洋洲
        emergencysurcharge = chargeweight * 15 ;
    } 
    else
    {
        emergencysurcharge = chargeweight * 7.5 ;
    }
    return emergencysurcharge ;
}

//汕头DHL的价格.
function getstdhllocalrate(countryid, zonestdhl,chargeweight){
    //当chargeweight在30-30.1时，转为30.1.
    if(chargeweight>30 && chargeweight<=30.1){
            chargeweight=30.1;
        }

    var subweight = 1000000; //重量差.
    var currencyrate = 0 ;//费率.

    for (i in ratestdhljson) {
        var entityzone = ratestdhljson[i]["Zone"];//当前分区
        var entityweight = ratestdhljson[i]["Weight"];//当前重量
        var entittyrate = ratestdhljson[i]["ChargeRate"];//当前费率 
        if (zonestdhl == entityzone )
        {
            //分区相同才判断。价格对应的重量大于产品重量. 
            if (chargeweight <= 30)
            {
                //重量小于等于30KG，查的是单价。价格对应的重量大于货物的重量，最小的一个.
                if (entityweight >= chargeweight )
                {
                    //对比重量差。最小的就是我们要的.        
                    var currencysubweight = entityweight- chargeweight  ;
                    if (currencysubweight <= subweight)
                    {
                     subweight = currencysubweight;
                     currencyrate = entittyrate;
                    }
                }        
            }
            else
            {
                //大于30KG. 30-40,35， 价格对应的重量= 30，货物的重量 = 35， 价格对应的重量小于货物的重量，最小的一个.
                if ( entityweight <= chargeweight  )
                {                               
                    //重量大于查询重量. 对比重量差。最小的就是我们要的.        
                    var currencysubweight = chargeweight - entityweight  ;
                    if (currencysubweight <= subweight)
                    {
                     subweight = currencysubweight;
                     currencyrate = entittyrate * chargeweight;
                    }
                }        
            }
        }
    }
    var fulsurcharge = 0;
    for (i in fuelsurchargejson) {
        if (fuelsurchargejson[i]["Company"] == "STDHL")
        {
            fulsurcharge = fuelsurchargejson[i]["Rate"];
        }
    }
    //疫情附加费.
    var emergencysurcharge = new Number(0);
    emergencysurcharge=getstdhlemergencysurcharge(countryid, chargeweight);    
    currencyrate = currencyrate + emergencysurcharge ;
    if(currencyrate>0){
    currencyrate = (currencyrate * ( 1 + fulsurcharge) ).toFixed(2) ;
   // currencyrate = (currencyrate * ( 1 + fulsurcharge)).toFixed(2) ;
}

if(zonestdhl == "0" ){
    currencyrate = 0 ;
   } 
 return currencyrate;
}


function getstdhlemergencysurcharge(countryid, chargeweight){
    var emergencysurcharge = new Number(0);
    if(countryid > 600 )
    {
        //大洋洲
        emergencysurcharge = chargeweight * 16 ;
    } 
    else
    {
        emergencysurcharge = chargeweight * 7 ;
    }
    return emergencysurcharge ;
}

function loadEvents() {
    // 显示月度销售金额
    zoneandratemodalshow();    
}

addLoadEvent(loadEvents);