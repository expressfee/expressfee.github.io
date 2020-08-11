// 有效期判断
function isValidity(){  
    var d = new Date();
   // alert(d.getFullYear());
    if(d.getFullYear()==2020)
    {
        return true;
    }
    else
    {
        return false;
    }
}; 

//正则+replace  字符串每个单词首字母大写，其他小写.
function titleFirstChartUpperCase(s) {  
    return s.toLowerCase().replace(/\b([\w|']+)\b/g, function(word) {  
        //return word.slice(0, 1).toUpperCase() + word.slice(1);  
        return word.replace(word.charAt(0), word.charAt(0).toUpperCase());  
    });  
}  

//个位进入5或10.
function decimaltofiveorten(f) {
    f = f / 10 ;
    var a;
	var b = 0;
	var intF;	
	intF = Math.floor(f);
	a = f - intF; //小数后面的数字 
	if (a <= 0.5 && a > 0)
	{
        b = intF + 0.5;
    }
    else if (a > 0.5)
    {
        b = intF + 1.0;
    }
    else if (a == 0)
    {
        b = f;
    }
    b = b * 10;
    return b ;
}
