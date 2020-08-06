// Call the dataTables jQuery plugin
// 加入数据表的效果
$(document).ready(function() {
    $('#airproducttable').DataTable();
  } );
  
  //数据表点击SELECT按键
  
  $(document).ready(function() {
  
    var table = $('#airproducttable').DataTable();     
    $('#airproducttable tbody ').on('click','button', function () {
  
      var objrow =$(this).parent().parent();
  
      var productClass = objrow.find("td:eq(0)").text();
      var name = objrow.find("td:eq(1)").text();
      //var version =objrow.find("td:eq(2)").text();
      var description =objrow.find("td:eq(2)").text();
  
      var netWeightnumber = objrow.find("td:eq(3)").text();   
      var netWeight = '<input type="text" value='+netWeightnumber+'>';
  
      var grossWeightnumber = objrow.find("td:eq(4)").text();   
      var grossWeight = '<input type="text" onchange="updateairsumfooterrow()"  value="'+grossWeightnumber+'" />';
  
      var lengthnumber = objrow.find("td:eq(5)").text();
      var length = '<input type="text" onchange="updaterowvweight(this)" value="'+lengthnumber+'" />';
  
      var widthnumber = objrow.find("td:eq(6)").text();
      var width = '<input type="text" onchange="updaterowvweight(this)"  value="'+widthnumber+'" />';
  
      var heightnumber = objrow.find("td:eq(7)").text();
      var height= '<input type="text" onchange="updaterowvweight(this)" value="'+heightnumber+'" />';
  
    //  var heightnumber = objrow.find("td:eq(8)").text();
    
      var vweight = 0;
      vweight = ((( lengthnumber * widthnumber * heightnumber ) / 1000000) * 167 ).toFixed(2) ;
  
  
     // Math.round(num*100)/100
      var remove ='<button class="btn btn-sm " onclick="deleteRow(this)" >remove </button>';
  
      var quantitynumber = 1;
      var quantity = '<input type="text"  class="changenums" onchange="updateairsumfooterrow()"  value = "' + quantitynumber + '" />';
      var trStr = "";
      trStr += "<tr>";
      trStr += "<td>" + name + "</td>";
      trStr += "<td>" + quantity + "</td>";
      trStr += "<td>" + grossWeight + "</td>";
      trStr += "<td>" + length + "</td>";
      trStr += "<td>" + width + "</td>";
      trStr += "<td>" + height + "</td>";
      trStr += "<td>" + vweight + "</td>";
      trStr += '<td>' + remove + "</td>";
      trStr += "</tr>";
  
  
      $("#airselecttable tbody").prepend(trStr);
  
      //更新统计行。
      updateairsumfooterrow();
    //  getinputtest();
    } );
  } );
  

  //INPUT修改
  $(document).ready(function(){
    $('div[name="divairsearch"]').on('input',function(){
      getcityselect();
    });
    
  });

  
  $(document).ready(function(){
    //清空TBODY
    $("#btnclearairselect").click(function() {
      $("#airselecttable tbody").html("");
  });
    
  });
  
  //加载airrateModal之前处理.
  $(document).ready(function(){
    $("#airrateModal").on("show.bs.modal", function () {  
      var currencycity = document.getElementById("cityselect"); 
      var cityid = currencycity.value ;
      
      var cityname ;
      var countryname ;
      var chargeweight = 0.5;      
      var surcharge = 0;
      var batterySurcharge = 0;
      var updateDate = "";
      var pricelower;
      var priceUpper;

      for (i in rateairjson) 
      {
        if (rateairjson[i]["Id"] == cityid)
        {
          countryname = rateairjson[i]["CountryEn"];
          cityname = rateairjson[i]["City"] ;
          pricelower = rateairjson[i]["PriceLower"];
          priceUpper = rateairjson[i]["PriceUpper"];
          surcharge = rateairjson[i]["Surcharge"];
          batterySurcharge = rateairjson[i]["BatterySurcharge"];
          updateDate = rateairjson[i]["UpdateDate"];
        } 
      }
      var lblexample = document.getElementById("airrateModalLabel");
      lblexample.innerHTML = titleFirstChartUpperCase(cityname + ', ' + countryname);
      chargeweight = getairchargeweight();  
      var txtweight = document.getElementById("txtairweight");  
      txtweight.value = chargeweight;
      var amount = chargeweight * 0 ;

      if(chargeweight < 45)
      {        
      }
      else 
      {
        if(chargeweight>=100 )
        {
          amount = chargeweight * priceUpper; 
        }
        else
        {
          amount = chargeweight * pricelower; 
        }             
      }        
    //  alert(amount);
      var amountupten = Math.round(amount/10)*10 + surcharge ;
      var amountbattery = amountupten + batterySurcharge;

      var txtairamountupten = document.getElementById("txtairamountupten");
  
      txtairamountupten.value = amount==0?0:amountupten.toFixed(2);
      var txtairamountbattery = document.getElementById("txtairamountbattery");
  
      txtairamountbattery.value = amount==0?0:amountbattery.toFixed(2);

      var txtupdatedate = document.getElementById("txtupdatedate");
  
      txtupdatedate.value = amount==0?" ":updateDate;

    })
});


//计费重量.
function getairchargeweight() {

  var tb = document.getElementById('airselecttable');    // table 的 id
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

      var currentyvweight = (((entitylength * entitywidth * entityheight) / 1000000) * 167 ) ;

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

};

//add row 按键
$(document).ready(function(){
  $("#btnariaddrow").click(function(){
   // alert("1")
   
  var name = "";
  var grossWeight = '<input type="text" onchange="updateairsumfooterrow()"  value="'+0+'" />';
  var length = '<input type="text" onchange="updaterowvweight(this)" value="'+0+'" />';
  var width = '<input type="text" onchange="updaterowvweight(this)"  value="'+0+'" />';
  var height= '<input type="text" onchange="updaterowvweight(this)" value="'+0+'" />';
  var vweight = 0;
  var remove ='<button class="btn btn-sm " onclick="deleteRow(this)" >remove </button>';
  var quantity = '<input type="text"  class="changenums" onchange="updateairsumfooterrow()"  value = "' + 1 + '" />';
  var trStr = "";
  trStr += "<tr>";
  trStr += "<td>" + name + "</td>";
  trStr += "<td>" + quantity + "</td>";
  trStr += "<td>" + grossWeight + "</td>";
  trStr += "<td>" + length + "</td>";
  trStr += "<td>" + width + "</td>";
  trStr += "<td>" + height + "</td>";
  trStr += "<td>" + vweight + "</td>";    
  trStr += '<td>' + remove + "</td>";    
  trStr += "</tr>";
  $("#airselecttable tbody").prepend(trStr);
  
  //更新统计行。
  updateairsumfooterrow();
  });
});