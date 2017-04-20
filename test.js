var mark = [];
function readAsText() {

	//使用file API
    var file = document.getElementById('file').files[0];  
    var reader = new FileReader(); 

	//判断浏览器是否支持FileReader接口  
	if (typeof FileReader == 'undefined') {  
	    result.InnerHTML = "<p>你的浏览器不支持FileReader接口！</p>";
	      
	    //使选择控件不可操作  
	    file.setAttribute("disabled","disabled");  
	}

    //将文件以文本形式读入页面  
    reader.readAsText(file);  
    reader.onload = function(f) {  
        var result = document.getElementById('result');  

        //显示文件  
        result.innerHTML = this.result; 

        //去行和分割字符串
        sourceString = this.result;
        sourceString = sourceString.replace(/[\r\n]/g,'');
       	var bookList = sourceString.split('==========');
		var book = [];
		for (var i = 0; i < bookList.length-1; i++) {
			var re = /\(/;
			var str = bookList[i]
			re.test(str);
			var str2 = RegExp.leftContext;
			var book = book.concat(str2);
		}
	
		//去重
		var bookArray = Array.from(new Set(book));
		console.log(bookArray);

		//输出
		for (var i = 0; i < bookList.length-1; i++) {
			re = new RegExp("#");
			if (re.test(bookList[i])) {
				chinese(bookList[i]);
			} else {
				English(bookList[i]);
			}
		}
		console.log(mark);
   	}

}

function chinese(book) {

	//标题	
	var re = /\|/;
	var str = book;
	re.test(str);
	var leftStr = RegExp.leftContext;
	var rightStr = RegExp.rightContext;
	var titleStr = '';
	str = leftStr
	var t = str.lastIndexOf('(');
	for(var k = 0; k < t; k++){
		titleStr = titleStr.concat(str[k]);
	}

	//解决特殊情况
	var m1 = titleStr.lastIndexOf('(');
	var m2 = titleStr.lastIndexOf(')');
	if (m1 > m2) {
		titleStr = titleStr.slice(0,m1);
	}

	//两括号之间
	var authorStr = '';
	str = leftStr
	var p1 = str.lastIndexOf('(');
	var p2 = str.lastIndexOf(')');
	for (j = p1 + 1; j < p2; j++) {
		authorStr = authorStr.concat(str[j]);
	}

	authorStr = authorStr.match(/[^\(\)]+/g)[0];

	//#和 之间,位置
	var positionStr = str.match(/#(\S*) /)[1];
	positionStr = positionStr.match(/[\d]+/g)[0];
	
	//时间，截取|右边
	str = rightStr;

	re = /[\d]+/g;
	arr = str.match(re);

	//转换成24小时时间制，截取到|和：之间缩小范围
	re = /:/
	re.test(str)
	Str3 = RegExp.leftContext;
	re = new RegExp('上午');
	if (!re.test(Str3)) {
		arr[3] = parseInt(arr[3])+12;
	}

	//判断是否加0
	arr[1] = arr[1] < 10 ? '0' + arr[1] : arr[1];
	arr[2] = arr[2] < 10 ? '0' + arr[2] : arr[2];
	arr[3] = arr[3] < 10 ? '0' + arr[3] : arr[3];
	timeStr = arr[0] + '-' + arr[1] + '-' + arr[2] + ' ' + arr[3] + ':' + arr[4] + ':' + arr[5]; 

	//内容，直接截取：后面非数字部分
	re = /:/;
	str = book;
	re.test(str);
	Str2 = RegExp.rightContext;
	contentStr = Str2.slice(5);

	//存入数组
	var bookGet = {};
	bookGet['title'] = titleStr;
	bookGet['author'] = authorStr;
	bookGet['position'] = positionStr;
	bookGet['time'] = timeStr;
	bookGet['content'] = contentStr;
	if (bookGet['content']!='') {
		mark.push(bookGet);
	}

	return mark;
}

function English(book) {

	//标题	
	var re = /\|/;
	var str = book;
	re.test(str);
	var leftStr = RegExp.leftContext;
	var rightStr = RegExp.rightContext;
	var titleStr = '';
	str = leftStr
	var t = str.lastIndexOf('(');
	for (var k = 0; k < t; k ++) {
		titleStr = titleStr.concat(str[k]);
	}

	var authorStr = '';
	str = leftStr
	var p1 = str.lastIndexOf('(');
	var p2 = str.lastIndexOf(')');
	for (j = p1 + 1; j < p2; j ++) {
		authorStr = authorStr.concat(str[j]);
	};

	//位置
	var str = leftStr;
	var positionStr = str.match(/Location (\S*) /)[1];
	positionStr = positionStr.match(/\d+/g)[0];

	//time
	str = rightStr; 
	re = /[\d\a-zA-Z]+/g;
	arr = str.match(re);
	Month = arr[3];
	Day = arr[4];
	Year = arr[5];
	Hour = arr[6];
	Minute = arr[7];
	Second = arr[8];
	afternoon = arr[9];
	switch (Month) {
		case 'January':
			rank = '01';
			break;
		case 'February':
			rank = '02';
			break;
		case 'March':
			rank = '03';
			break;
		case 'April':
			rank = '04';
			break;
		case 'May':
			rank ='05';
			break;
		case 'June':
			rank ='06';
			break;
		case 'July':
			rank = '07';
			break;
		case 'August':
			rank ='08';
			break;
		case 'September':
			rank = '09';
			break;
		case 'October':
			rank = '10';
			break;
		case 'November':
			rank = '11';
			break;
		case 'December':
			rank = '12';
			break;
		default:
			rank = '00';
			break;
	}

	//转换成24小时时间制，缩小范围
	Str3 = afternoon;
	re = new RegExp('AM');
	if (!re.test(Str3)) {
		Hour = parseInt(Hour) + 12;
	}	
	Day = Day < 10 ? '0' + Day : Day;
	Hour = Hour < 10 ? '0' + Hour : Hour;
	timeStr = Year + '-' + rank + '-' + Day + ' ' + Hour + ':' + Minute + ':' + Second;

	//内容,直接截取：到结尾非数字部分
	re = /:/;
	str = book;
	re.test(str);
	Str2 = RegExp.rightContext;
	contentStr = Str2.slice(8);

	var bookGet = {};
	bookGet['title'] = titleStr;
	bookGet['author'] = authorStr;
	bookGet['position'] = positionStr;
	bookGet['time'] = timeStr;
	bookGet['content'] = contentStr;

	//判断并非空才添加
	if (bookGet['content'] != '') {
		mark.push(bookGet);
	}
}