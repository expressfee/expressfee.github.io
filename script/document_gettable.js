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


function getdocumenttable() {
    if (!document.getElementsByTagName) return false;
    var tables = document.getElementById("docratetable");   
    var trStr = '';//动态拼接table
    trStr += "<thead><tr>"
    trStr +="<th>Weight</th>";
    for(var i=1;i<=9;i++)
    {
        trStr +='<th>zone'+i + '</th>' 
    }
    trStr +="</tr></thead>";
    //燃油附加费.
    var fulsurcharge = 0;
    for (i in fuelsurchargejson) 
    {
        if (fuelsurchargejson[i]["Company"] == "STDHL")
        {
            fulsurcharge = fuelsurchargejson[i]["Rate"];
        }
    }
    // 表头。todo历遍。
    trStr += "<tbody>";
    for(i in documentjson)
    {               
        trStr += "<tr>";
        trStr += "<td>" + documentjson[i]["Weight"] + "</td>";
        for(var k =1 ;k<=9;k++)
        {           
            var currentrate = documentjson[i]["Zone"+k];
            currentrate = (currentrate * ( 1 + fulsurcharge)).toFixed(2) ;            
            trStr += "<td>" + currentrate + "</td>";
        }
        trStr += "</tr>";    
    }
    trStr += "</tbody>";
    tables.innerHTML = trStr;
};

function getcountrystdhltable() {
    if (!document.getElementsByTagName) return false;
    var tables = document.getElementById("countrystdhltable");
   
    var trStr = '';//动态拼接table
    trStr += "<thead><tr>"
    trStr +="<th>AreaEn</th>";
    trStr +="<th>AreaCn</th>";
    trStr +='<th >NameEn</th>'; 
    trStr +='<th >NameCn</th>';
    trStr +='<th ">ZoneStDhl</th>';
    trStr +="</tr></thead>";
    // 表头。todo历遍。
    trStr += "<tbody>";
    for(i in countryjson)
    {               
        trStr += "<tr>";
        trStr += "<td>" + countryjson[i]["AreaEn"] + "</td>";
        trStr += "<td>" + countryjson[i]["AreaCn"] + "</td>";
        trStr += "<td>" + countryjson[i]["NameEn"] + "</td>";
        trStr += "<td>" + countryjson[i]["NameCn"] + "</td>";    
        trStr += "<td>" + countryjson[i]["ZoneStDhl"] + "</td>";   
        trStr += "</tr>";    
    }
    trStr += "</tbody>";
    tables.innerHTML = trStr;
};

// 加入数据表的效果
$(document).ready(function() {
    $('#countrystdhltable').DataTable();
  } );

function loadEvents() {
  //  alert("here");   
    //判断时间是否过期.
   // alert(isValidity());
    if(isValidity()==true)
    {
        //加载产品列表.    
        getdocumenttable();    
        getcountrystdhltable();

    }
}



// Load events
//addLoadEvent(highlightPage);
addLoadEvent(loadEvents);