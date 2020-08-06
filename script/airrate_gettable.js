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

function getairratetable() {
    if (!document.getElementsByTagName) return false;
    var tables = document.getElementById("airratetable");
   
    var trStr = '';//动态拼接table
    // var html = '';
    trStr += "<thead><tr>"
    trStr +="<th>Area</th>";
    trStr +='<th >CountryCn</th>';   
    trStr +='<th >CountryEn</th>';
    trStr +='<th ">City</th>';
    trStr +='<th >Price(45-100kg)</th>';
    trStr +='<th >Price(>100kg)</th>';
    trStr +='<th >Surcharge</th>';
    trStr +='<th >Battery Surcharge</th>';
    trStr +='<th >UpdateDate</th>';
    trStr +="</tr></thead>";
    // 表头。todo历遍。
    trStr += "<tbody>";
    var searchstring = '';
    searchstring = document.getElementById("inputSearchairrate").value;

   

    for(i in rateairjson)
    {              
        if(searchstring == '')
        {
            trStr += "<tr>";
            trStr += "<td>" + rateairjson[i]["Area"] + "</td>";
            trStr += "<td>" + rateairjson[i]["CountryCn"] + "</td>";
            trStr += "<td>" + rateairjson[i]["CountryEn"] + "</td>";
            trStr += "<td>" + rateairjson[i]["City"] + "</td>";
            trStr += "<td>" + rateairjson[i]["PriceLower"] + "</td>";
            trStr += "<td>" + rateairjson[i]["PriceUpper"] + "</td>";
            trStr += "<td>" + rateairjson[i]["Surcharge"] + "</td>";
            trStr += "<td>" + rateairjson[i]["BatterySurcharge"] + "</td>";
            trStr += "<td>" + rateairjson[i]["UpdateDate"] + "</td>";
            trStr += "</tr>";  
        }
        else
        {
            var countrycn = rateairjson[i]["CountryCn"];
            var countryen = rateairjson[i]["CountryEn"] ;
            var cityname = rateairjson[i]["City"] ;
            if(countrycn.toLowerCase().indexOf(searchstring.toLowerCase()) != -1 || countryen.toLowerCase().indexOf(searchstring.toLowerCase()) != -1 || cityname.toLowerCase().indexOf(searchstring.toLowerCase()) != -1)
            {
                //存在。
                trStr += "<tr>";
                trStr += "<td>" + rateairjson[i]["Area"] + "</td>";
                trStr += "<td>" + rateairjson[i]["CountryCn"] + "</td>";
                trStr += "<td>" + rateairjson[i]["CountryEn"] + "</td>";
                trStr += "<td>" + rateairjson[i]["City"] + "</td>";
                trStr += "<td>" + rateairjson[i]["PriceLower"] + "</td>";
                trStr += "<td>" + rateairjson[i]["PriceUpper"] + "</td>";
                trStr += "<td>" + rateairjson[i]["Surcharge"] + "</td>";
                trStr += "<td>" + rateairjson[i]["BatterySurcharge"] + "</td>";
                trStr += "<td>" + rateairjson[i]["UpdateDate"] + "</td>";
                trStr += "</tr>";  
            }
        }
    }

    trStr += "</tbody>";
    tables.innerHTML = trStr;
};

//Input修改既执行.
$(document).ready(function(){
    $('div[name="divsearchairrate"]').on('input',function(){
     getairratetable();
    });
    
  });

  
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
        getairratetable(); 
    }
}



// Load events
//addLoadEvent(highlightPage);
addLoadEvent(loadEvents);