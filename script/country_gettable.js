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

function getcountryzonetable() {
    if (!document.getElementsByTagName) return false;
    var tables = document.getElementById("countryzonetable");
   
    var trStr = '';//动态拼接table
    trStr += "<thead><tr>"
    trStr +="<th>AreaEn</th>";
    trStr +='<th >NameEn</th>'; 
    trStr +='<th >NameCn</th>';
    trStr +='<th ">ZoneHkDhl</th>';
    trStr +='<th ">ZoneHkTnt</th>';
    trStr +='<th ">ZoneStDhl</th>';
    trStr +='<th ">ZoneUpsSaver</th>';
    trStr +='<th ">ZoneUpsExpedited</th>';
    trStr +='<th ">ZoneFedexIee</th>';
    trStr +='<th ">ZoneFedexIpe</th>';
    trStr +="</tr></thead>";
    // 表头。todo历遍。
    trStr += "<tbody>";

    var searchstring = '';
    searchstring = document.getElementById("inputSearchcountry").value; 
   // alert(searchstring)    

    for(i in countryjson)
    {              
        if(searchstring == '')
        {
            trStr += "<tr>";
            trStr += "<td>" + countryjson[i]["AreaEn"] + "</td>";
            trStr += "<td>" + countryjson[i]["NameEn"] + "</td>";
            trStr += "<td>" + countryjson[i]["NameCn"] + "</td>";
            trStr += "<td>" + countryjson[i]["ZoneHkDhl"] + "</td>";
            trStr += "<td>" + countryjson[i]["ZoneHkTnt"] + "</td>";
            trStr += "<td>" + countryjson[i]["ZoneStDhl"] + "</td>";
            trStr += "<td>" + countryjson[i]["ZoneUpsSaver"] + "</td>";
            trStr += "<td>" + countryjson[i]["ZoneUpsExpedited"] + "</td>";
            trStr += "<td>" + countryjson[i]["ZoneFedexIee"] + "</td>";
            trStr += "<td>" + countryjson[i]["ZoneFedexIpe"] + "</td>";
            trStr += "</tr>";  
        }
        else
        {
            var nameen = countryjson[i]["NameEn"];
            var namecn = countryjson[i]["NameCn"] ;
            if(nameen.toLowerCase().indexOf(searchstring.toLowerCase()) != -1 || namecn.toLowerCase().indexOf(searchstring.toLowerCase()) != -1)
            {
                //存在。
                trStr += "<tr>";
                trStr += "<td>" + countryjson[i]["AreaEn"] + "</td>";
                trStr += "<td>" + countryjson[i]["NameEn"] + "</td>";
                trStr += "<td>" + countryjson[i]["NameCn"] + "</td>";
                trStr += "<td>" + countryjson[i]["ZoneHkDhl"] + "</td>";
                trStr += "<td>" + countryjson[i]["ZoneHkTnt"] + "</td>";
                trStr += "<td>" + countryjson[i]["ZoneStDhl"] + "</td>";
                trStr += "<td>" + countryjson[i]["ZoneUpsSaver"] + "</td>";
                trStr += "<td>" + countryjson[i]["ZoneUpsExpedited"] + "</td>";
                trStr += "<td>" + countryjson[i]["ZoneFedexIee"] + "</td>";
                trStr += "<td>" + countryjson[i]["ZoneFedexIpe"] + "</td>";
                trStr += "</tr>";  
            }
        }
    }
    trStr += "</tbody>";
    tables.innerHTML = trStr;
};

//Input修改既执行.
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
      
        getcountryzonetable();

    }
}



// Load events
//addLoadEvent(highlightPage);
addLoadEvent(loadEvents);