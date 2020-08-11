// Call the dataTables jQuery plugin
// 加入数据表的效果
$(document).ready(function() {
  $('#dataTable').DataTable();
} );

//数据表点击SELECT按键

$(document).ready(function() {

  var table = $('#dataTable').DataTable();     
  $('#dataTable tbody ').on('click','button', function () {

    var objrow =$(this).parent().parent();

    var productClass = objrow.find("td:eq(0)").text();
    var name = objrow.find("td:eq(1)").text();
    //var version =objrow.find("td:eq(2)").text();
    var description =objrow.find("td:eq(2)").text();

    var netWeightnumber = objrow.find("td:eq(3)").text();   
    var netWeight = '<input type="text" value='+netWeightnumber+'>';

    var grossWeightnumber = objrow.find("td:eq(4)").text();   
    var grossWeight = '<input type="text" onchange="updatesumfooterrow()"  value="'+grossWeightnumber+'" />';

    var lengthnumber = objrow.find("td:eq(5)").text();
    var length = '<input type="text" onchange="updaterowvweight(this)" value="'+lengthnumber+'" />';

    var widthnumber = objrow.find("td:eq(6)").text();
    var width = '<input type="text" onchange="updaterowvweight(this)"  value="'+widthnumber+'" />';

    var heightnumber = objrow.find("td:eq(7)").text();
    var height= '<input type="text" onchange="updaterowvweight(this)" value="'+heightnumber+'" />';

  //  var heightnumber = objrow.find("td:eq(8)").text();
  
    var vweight = 0;
    vweight = ((( lengthnumber * widthnumber * heightnumber ) / 1000000) * 200 ).toFixed(2) ;


   // Math.round(num*100)/100
    var remove ='<button class="btn btn-sm " onclick="deleteRow(this)" >remove </button>';

    var quantitynumber = 1;
    var quantity = '<input type="text"  class="changenums" onchange="updatesumfooterrow()"  value = "' + quantitynumber + '" />';
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


    $("#selecttable tbody").prepend(trStr);

    //更新统计行。
    updatesumfooterrow();

  } );
} );





$(document).ready(function() {
  var table = $('#selecttable1').DataTable();

  $('#btnshare1').click( function() {

    $('#selecttable tr').each(function(i){                   // 遍历 tr
      $(this).children('td').each(function(j){  // 遍历 tr 的各个 td
         alert("第"+(i+1)+"行，第"+(j+1)+"个td的值："+$(this).text()+"。");
      });
   });
  } );
} );


//修改已经选择的装箱的件数和自定义尺寸重量.
$(document).ready(function(){
  $('div[name="divsearch"]').on('input',function(){
    getcountryselect();
  });
  
});

$(document).ready(function(){
  //清空TBODY
  $("#btnclear").click(function() {
    $("#selecttable tbody").html("");
});
  
});


$(document).ready(function(){
  $("#selecttable input").on("change","input", function() {
    alert('请输入正确的数量');
});

  $(".changenums").change(function(){
    alert('请输入正确的数量');
  })
});

$(document).ready(function(){
	//change事件：当输入数值后，输入框的值改变了，就会执行相关函数。
	$(".changenums").change(function(){
		var newnum=$(this).val();
		if(newnum<1){
			alert('请输入正确的数量');
			window.location.reload();
			return false;
		}
		var id=$(this).attr('id');
		$.ajax({
			type:"get",
			url:"./index.php?r=flow/ChangeNumbers&id="+id+"&newnum="+newnum,
			success:function(msg){
				window.location.reload();
			}
		});
	});
	$(".dele").click(function (){
		deleid=$(this).attr('id');
		$.ajax({
			type:"get",
			url:"./index.php?r=flow/dele&id="+deleid,
			success:function(msg){
					window.location.reload();
			}
		});
	});
});

//add row 按键
$(document).ready(function(){
  $("#btnexpressaddrow").click(function(){
   // alert("1")
   
  var name = "";
  var grossWeight = '<input type="text" onchange="updatesumfooterrow()"  value="'+0+'" />';
  var length = '<input type="text" onchange="updaterowvweight(this)" value="'+0+'" />';
  var width = '<input type="text" onchange="updaterowvweight(this)"  value="'+0+'" />';
  var height= '<input type="text" onchange="updaterowvweight(this)" value="'+0+'" />';
  var vweight = 0;
  var remove ='<button class="btn btn-sm " onclick="deleteRow(this)" >remove </button>';
  var quantity = '<input type="text"  class="changenums" onchange="updatesumfooterrow()"  value = "' + 1 + '" />';
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
  $("#selecttable tbody").prepend(trStr);
  //更新统计行。
  updatesumfooterrow();
  });
});

//////////////////////

