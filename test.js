//方案一：直接使用FileReaderAPI读取txt文件
function readAsText(){  
    var file = document.getElementById("file").files[0];  
    var reader = new FileReader(); 
    var sourceString="";
    var newString=""; 
    //将文件以文本形式读入页面  
    reader.readAsText(file);  
    reader.onload=function(f){  
        var result=document.getElementById("result");  
        //显示文件  
        result.innerHTML=this.result; 
        sourceString=this.result;
        sourceString=sourceString.match(/[^\s*]+/g);
        for(var i=0;i<sourceString.length;i++){
        	newString=newString.concat(sourceString[i]);
        }
       	var bookList=newString.split("==========");
	var book=[];
	var mark=[];
	for(var i=0;i<bookList.length;i++){
		var re=/\(/;
		var str=bookList[i]
		re.test(str);
		var str2=RegExp.leftContext;
		//排除有空格的情况
		str2=str2.match(/[^\s]+/g);
		var book=book.concat(str2);
	}
	//去重
	var bookArray=Array.from(new Set(book));
	console.log(bookArray)

	function chinese(book) {
		//位置,作者，标题	
		var re=/\(/;
		var str=book;
		re.test(str);
		titleStr=RegExp.leftContext;
		//两括号之间
		authorStr = str.match(/\((\S*)\)/)[1];
		//#和-之间
		positionStr=str.match(/#(\S*)-/)[1];
		//时间，截取|右边
		re=/\|/;
		str=book;
		re.test(str);
		Str2=RegExp.rightContext; //添加于 2015年4月23日星期四 上午9:25:22 目光聚集的地方，金钱必将跟随

		re=/[\d]+/g;
		arr=Str2.match(re);
		//转换成24小时时间制，截取到|和：之间缩小范围
		re=/:/
		re.test(Str2)
		Str3=RegExp.leftContext;
		re=new RegExp("上午");
		if(!re.test(Str3)){
			arr[3]=parseInt(arr[3])+12;
		}
		//判断是否加0
		arr[1]=arr[1]<10?'0'+arr[1]:arr[1];
		arr[2]=arr[2]<10?'0'+arr[2]:arr[2];
		arr[3]=arr[3]<10?'0'+arr[3]:arr[3];
		timeStr=arr[0]+"-"+arr[1]+"-"+arr[2]+" "+arr[3]+":"+arr[4]+":"+arr[5]; 	
	//内容，直接截取：后面非数字部分
		re=/:/;
		str=book;
		re.test(str);
		Str2=RegExp.rightContext;

		re=/[^\d\:]+/g;
		contentStr=Str2.match(re)[0];
	//存入数组
		var bookGet={};
		bookGet['title']=titleStr;
		bookGet['author']=authorStr;
		bookGet['position']=positionStr;
		bookGet['time']=timeStr;
		bookGet['content']=contentStr;
		mark.push(bookGet);	
	return mark;
	}
	function English(book){
	//位置,作者，标题	
		var re=/\(/;
		var str=book;
		re.test(str);
		titleStr=RegExp.leftContext;

		authorStr = str.match(/\((\S*)\)/)[1];

		positionStr=str.match(/\)(\S*)-/)[1];
		positionStr=positionStr.match(/\d+/g)[0];
		//time
		re=/\|/;
		str=book;
		re.test(str);
		Str2=RegExp.rightContext; // Added on Thursday, May 12, 2016 4:43:12 PM 我把双手 

		re=/[\d\a-zA-Z]+/g;
		arr=Str2.match(re);
		Month=arr[1].match(/[\a-zA-Z]+/g)[0];
		Day=arr[1].match(/[\d]+/g);
		Year=arr[2].slice(0,4);
		Hour=arr[2].slice(4);
		Minute=arr[3];
		Second=arr[4].slice(0,2);
		afternoon=arr[4].slice(2,4);
		switch(Month){
			case "January":
				rank="01";
				break;
			case "February":
				rank="02";
				break;
			case "March":
				rank="03"
				break;
			case "April":
				rank="04";
				break;
			case "May":
				rank="05";
				break;
			case "June":
				rank="06";
				break;
			case "July":
				rank="07"
				break;
			case "August":
				rank="08";
				break;
			case "September":
				rank="09";
				break;
			case "October":
				rank="10";
				break;
			case "November":
				rank="11";
				break;
			case "December":
				rank="12";
				break;
			default:
				rank="00";
				break;
		}
		//转换成24小时时间制，缩小范围
		Str3=afternoon;
		re=new RegExp("AM");
		if(!re.test(Str3)){
			Hour=parseInt(Hour)+12;
		}	

		Day=Day<10?'0'+Day:Day;
		Hour=Hour<10?'0'+Hour:Hour;
		timeStr=Year+"-"+rank+"-"+Day+" "+Hour+":"+Minute+":"+Second;
		//内容,直接截取：到结尾非数字部分
		re=/:/;
		str=book;
		re.test(str);
		Str2=RegExp.rightContext;

		re=/[^\d\:]+/g;
		contentStr=Str2.match(re)[0];
		contentStr=contentStr.slice(2);

		var bookGet={};
		bookGet['title']=titleStr;
		bookGet['author']=authorStr;
		bookGet['position']=positionStr;
		bookGet['time']=timeStr;
		bookGet['content']=contentStr;
		//判断并非空才添加
		if(bookGet['content']!=""){
		mark.push(bookGet);}
	}

	for(var i=0;i<bookList.length;i++){
		re=new RegExp("#");
		if(re.test(bookList[i])){
			chinese(bookList[i]);
		}else{English(bookList[i]);}
	}
	console.log(mark);
   	}

}

//方案二：直接给字符串赋值读取
window.onload=function(){
var result=document.getElementById("result");  
var file=document.getElementById("file");  
  
	//判断浏览器是否支持FileReader接口  
	if(typeof FileReader == 'undefined'){  
	    result.InnerHTML="<p>你的浏览器不支持FileReader接口！</p>";  
	    //使选择控件不可操作  
	    file.setAttribute("disabled","disabled");  
	}  

	var sourceString="最璀璨的银河——刘慈欣经典作品集 (刘慈欣) - Your Highlight on Location 242-242 | Added on Thursday, May 12, 2016 4:43:12 PM 我把双手 ========== 最璀璨的银河——刘慈欣经典作品集 (刘慈欣) - Your Note on Location 243-243 | Added on Thursday, May 12, 2016 4:43:24 PM note ========== 最璀璨的银河——刘慈欣经典作品集 (刘慈欣) - Your Highlight on Location 243-243 | Added on Thursday, May 12, 2016 4:43:24 PM 微风中========== ﻿技术元素 (凯文·凯利) - 您在位置 #436-437的标注 | 添加于 2015年4月23日星期四 上午9:44:33 生命，无论大小，其独特之处部分在于它能传承过去，在当下表现过去， ========== ﻿技术元素 (凯文·凯利) - 您在位置 #436-437的标注 | 添加于 2015年4月23日星期四 上午9:44:50 生命，无论大小，其独特之处部分在于它能传承过去，在当下表现过去，以很好地应对未来发生的事情";
	var bookList=sourceString.split("==========");

	var book=[];
	var mark=[];
	for(var i=0;i<bookList.length;i++){
		var re=/\(/;
		var str=bookList[i];
		re.test(str);
		var str2=RegExp.leftContext;
		//排除又空格的情况
		str2=str2.match(/[^\s]+/g);
		var book=book.concat(str2);
	}
	var bookArray=Array.from(new Set(book));
	console.log(bookArray)

	function chinese(book) {
	//位置,作者，标题	
		var re=/\(/;
		var str=book;
		re.test(str);
		titleStr=RegExp.leftContext;

		authorStr = str.match(/\((\S*)\)/)[1];

		positionStr=str.match(/#(\S*)-/)[1];
	//时间
		re=/\|/;
		str=book;
		re.test(str);
		Str2=RegExp.rightContext; //添加于 2015年4月23日星期四 上午9:25:22 目光聚集的地方，金钱必将跟随

		re=/[\d]+/g;
		arr=Str2.match(re);
		//转换成24小时时间制，缩小范围
		re=/:/
		re.test(Str2)
		Str3=RegExp.leftContext;
		re=new RegExp("上午");
		if(!re.test(Str3)){
			arr[3]=parseInt(arr[3])+12;
		}

		arr[1]=arr[1]<10?'0'+arr[1]:arr[1];
		arr[2]=arr[2]<10?'0'+arr[2]:arr[2];
		arr[3]=arr[3]<10?'0'+arr[3]:arr[3];
		timeStr=arr[0]+"-"+arr[1]+"-"+arr[2]+" "+arr[3]+":"+arr[4]+":"+arr[5]; 	
	//内容
		re=/:/;
		str=book;
		re.test(str);
		Str2=RegExp.rightContext;

		re=/[^\d\:]+/g;
		contentStr=Str2.match(re)[0];
	//存入数组
		var bookGet={};
		bookGet['title']=titleStr;
		bookGet['author']=authorStr;
		bookGet['position']=positionStr;
		bookGet['time']=timeStr;
		bookGet['content']=contentStr;
		mark.push(bookGet);	
	return mark;
	}
	function English(book){
		//title
		var re=/\(/;
		var str=book;

		re.test(str);
		titleStr=RegExp.leftContext;
		authorStr = str.match(/\((\S*)\)/)[1];

		positionStr=str.match(/Location (\S*)-/)[1];
		//time
		re=/\|/;
		str=book;
		re.test(str);
		Str2=RegExp.rightContext; // Added on Thursday, May 12, 2016 4:43:12 PM 我把双手 

		re=/[\d\a-zA-Z]+/g;
		arr=Str2.match(re);
		switch(arr[3]){
			case "January":
				rank="01";
				break;
			case "February":
				rank="02";
				break;
			case "March":
				rank="03"
				break;
			case "April":
				rank="04";
				break;
			case "May":
				rank="05";
				break;
			case "June":
				rank="06";
				break;
			case "July":
				rank="07"
				break;
			case "August":
				rank="08";
				break;
			case "September":
				rank="09";
				break;
			case "October":
				rank="10";
				break;
			case "November":
				rank="11";
				break;
			case "December":
				rank="12";
				break;
			default:
				rank="00";
				break;
		}
		//转换成24小时时间制，缩小范围
		re=/:/
		re.test(book)
		Str3=RegExp.rightContext;
		re=new RegExp("AM");
		if(!re.test(Str3)){
			arr[6]=parseInt(arr[6])+12;
		}	

		arr[4]=arr[4]<10?'0'+arr[4]:arr[4];
		arr[6]=arr[6]<10?'0'+arr[6]:arr[6];
		timeStr=arr[5]+"-"+rank+"-"+arr[4]+" "+arr[6]+":"+arr[7]+":"+arr[8];
		//内容
		re=/:/;
		str=book;
		re.test(str);
		Str2=RegExp.rightContext;

		re=/[^\d\:]+/g;
		contentStr=Str2.match(re)[0];
		arr=contentStr.split(" ");
		contentStr=arr[2];

		var bookGet={};
		bookGet['title']=titleStr;
		bookGet['author']=authorStr;
		bookGet['position']=positionStr;
		bookGet['time']=timeStr;
		bookGet['content']=contentStr;
		//判断并非空才添加
		if(bookGet['content']!=""){
		mark.push(bookGet);}
	}

	for(var i=0;i<bookList.length;i++){
		re=new RegExp("#");
		if(re.test(bookList[i])){
			chinese(bookList[i]);
		}else{English(bookList[i]);}
	}
	console.log(mark);
}