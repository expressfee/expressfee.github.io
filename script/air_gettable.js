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


function producttable() {
    if (!document.getElementsByTagName) return false;
    var tables = document.getElementById("airproducttable");
   
    var trStr = '';//动态拼接table
    // var html = '';
    trStr += "<thead><tr>"
   // trStr +="<th>ProductId</th>";
    trStr +='<th>A/B</th><th>型号</th>'
   // trStr +='<th>版本</th>'
    trStr +='<th  width="30%" >描述</th><th>NW</th>'
    trStr +='<th>GW</th><th>L</th><th>W</th><th>H</th><th>Select</th>'
    trStr +="</tr></thead>";

   // trStr += "<tfoot><tr>" 
    //   trStr +="<th>ProductId</th>";
  //  trStr +='<th>A/B超</th><th>型号</th>'
   // trStr +='<th>版本</th>'
   // trStr +='<th>描述</th><th>净重</th>'
  //  trStr +="<th>毛重</th><th>长</th><th>宽</th><th>高</th><th>Select</th>"
   // trStr +="</tr></tfoot>";
   
   
    // 表头。todo历遍。
    trStr += "<tbody>";
   
    for (var i = 0; i < productjson.length; i++) {//循环遍历出json对象中的每一个数据并显示在对应的td中
        // trStr += "<thead> <tr>";//拼接处规范的表格形式
        //{"Amount":11831.100,"LMCount":5,"MonthCount":1,"ProductGroup":"SYNCSCAN","Ratio":0.0636584333959294566566460139,"Sort":1
     //   var productId = productjson[i]["ProductId"]
        var productClass = productjson[i]["ProductClass"]
        var name = productjson[i]["Name"]
       // var version = productjson[i]["Version"]
        var description = productjson[i]["Description"]
        var netWeight = productjson[i]["NetWeight"]
        var grossWeight = productjson[i]["GrossWeight"]
        var length = productjson[i]["Length"]
        var width = productjson[i]["Width"]
        var height = productjson[i]["Height"]

        trStr += "<tr>";
       // trStr += '<td >' + productId + "</td>";
        trStr += "<td>" + productClass + "</td>";
        trStr += "<td>" + name + "</td>";
       // trStr += "<td>" + version + "</td>";
        trStr += "<td>" + description + "</td>";
        trStr += "<td>" + netWeight + "</td>";

        trStr += "<td>" + grossWeight + "</td>";
        trStr += "<td>" + length + "</td>";
        trStr += "<td>" + width + "</td>";

        trStr += "<td>" + height + "</td>";
        
        // <a class="btn btn-primary btn-block" href="login.html">Register</a>
        // 每一行都加入按键.


        trStr += "<td>" + '<button type="button" class="btn btn-sm btn-primary "> Select </button>' + "</td>";
        trStr += "</tr>";
     
    }
    trStr += "</tbody>";
    tables.innerHTML = trStr;
};

function exprsstable() {
    if (!document.getElementsByTagName) return false;
    var tables = document.getElementById("airselecttable");
   
    var trStr = '';//动态拼接table
    // var html = '';
    trStr += "<thead><tr>"
   // trStr +="<th>ProductId</th>";
   // trStr +="<th>ProductClass</th>";
    trStr +="<th>型号</th>";
    trStr +='<th >件数</th>';
   // trStr +="<th>Description</th>";    
    trStr +='<th >重量</th>';
    trStr +='<th ">长</th>';
    trStr +='<th >宽</th>';
    trStr +='<th >高</th>';
    trStr +='<th width="10%">体积重</th>';
   // trStr +="<th>VolumeWeight</th>";
    trStr +='<th width="10%">删除</th>';
    trStr +="</tr></thead>";

    /////tfoot
    trStr += "<tfoot><tr>"
    trStr +='<th >合计</th>';
    trStr +='<th id = "sumcarton" >0</th>'; 
    trStr +='<th id = "sumweight" >0</th>'; 
    trStr +='<th> </th>'; //长
    trStr +='<th> </th>'; //宽
    trStr +='<th> </th>'; //高
    trStr +='<th id = "sumvweight" >0</th>'; //体积重
    trStr +='<th> <button class="btn btn-sm " id="btnclearairselect" >remove</button></th>'; //删除
    trStr +="</tr></tfoot>";
      
    // 表头。todo历遍。
    trStr += "<tbody>";

    trStr += "</tbody>";
    tables.innerHTML = trStr;
};


function updateairsumfooterrow() {
    var selecttable = document.getElementById('airselecttable');    // table 的 id
    //  var rows = tb.rows;             // 获取表格所有行
    //tbody
    var childtbody = selecttable.getElementsByTagName("tbody")[0];//获取行的第一个单元格
    var rows = childtbody.rows;
    var quantity = 0;
    var weight = 0;
    var volumeweight = 0;
    if (rows.length>0)
    {
        //这里是多余的.
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
        quantity += entityquantity ;
      //  alert(entityquantity)
      //  alert(entityweight)
        weight += entityweight * entityquantity;
      //  alert(weight)
        var currentyvweight = (((entitylength * entitywidth * entityheight) / 1000000) * 167 ) ;

        volumeweight +=  currentyvweight * entityquantity;
    }
   // alert(volumeweight)
    volumeweight = volumeweight.toFixed(2) ;
    weight = weight.toFixed(2) ;
    //alert(weight)
    document.getElementById("sumcarton").innerHTML = quantity;
    document.getElementById("sumweight").innerHTML = weight;
    document.getElementById("sumvweight").innerHTML = volumeweight;
}

function updaterowvweight(inputel) {
  //  alert(inputel);
    var objrow =inputel.parentNode.parentNode;
    var entitylength =objrow.cells[3].getElementsByTagName("input")[0].value;
    var entitywidth =objrow.cells[4].getElementsByTagName("input")[0].value;
    var entityheight = objrow.cells[5].getElementsByTagName("input")[0].value;
    var vweight = 0;
    vweight = ((( entitylength * entitywidth * entityheight ) / 1000000) * 167 ).toFixed(2) ;
    objrow.cells[6].innerHTML = vweight;
    updateairsumfooterrow();
 //   alert(vweight);
}

function deleteRow(r){
	var i=r.parentNode.parentNode.rowIndex;
    document.getElementById('airselecttable').deleteRow(i);
    updateairsumfooterrow();
}


function getcityselect() {

    if (!document.getElementsByTagName) return false;
    var select = document.getElementById("cityselect");

    var trStr = '';//动态拼接select
    var searchstring = '';
    searchstring = document.getElementById("inputcitySearch").value;
   
     // alert(searchstring);
    for(i in rateairjson)
    {
        var cityid = rateairjson[i]["Id"]
        var countryname = rateairjson[i]["CountryEn"]
        var cityname = rateairjson[i]["City"]
        var opstring = titleFirstChartUpperCase( cityname ) + '_' + titleFirstChartUpperCase(countryname);

        if(searchstring == '')
        {
            trStr += '<option value="'+cityid +'"> '+ opstring +'</option>';
        }
        else
        {
            if(cityname.toLowerCase().indexOf(searchstring.toLowerCase()) != -1 || countryname.toLowerCase().indexOf(searchstring.toLowerCase()) != -1 )
            {
                //存在。
                trStr += '<option value="'+cityid +'"> '+ opstring +'</option>';
            }
        }
       
    }

    select.innerHTML = trStr;

}

function getFloatStr(num){  
    num += '';  
    num = num.replace(/[^0-9|\.]/g, ''); //清除字符串中的非数字非.字符  
      
    if(/^0+/) //清除字符串开头的0  
        num = num.replace(/^0+/, '');  
    if(!/\./.test(num)) //为整数字符串在末尾添加.00  
        num += '.00';  
    if(/^\./.test(num)) //字符以.开头时,在开头添加0  
        num = '0' + num;  
    num += '00';        //在字符串末尾补零  
    num = num.match(/\d+\.\d{2}/)[0];  
    return num;
}; 



function loadEvents() {
    //判断时间是否过期.
   // alert(isValidity());
    if(isValidity()==true)
    {
        //加载产品列表.    
        producttable();    
        exprsstable();
    
        //加载国家列表.    
        getcityselect();
    }
}



// Load events
//addLoadEvent(highlightPage);
addLoadEvent(loadEvents);