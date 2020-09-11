// function btn_move(el, mouseLeft, mouseTop){
//     var leftRnd = (Math.random()-0.5)*20;
//     var topRnd = (Math.random()-0.5)*20;
//     var btnLeft = mouseLeft+(leftRnd>0?100:-100)+leftRnd;
//     var btnTop = mouseTop+(topRnd>0?30:-30)+topRnd;
//     btnLeft = btnLeft<100?(btnLeft+window.innerWidth-200):(btnLeft>window.innerWidth-100?btnLeft-window.innerWidth+200:btnLeft);
//     btnTop =  btnTop<100?( btnTop+window.innerHeight-200):(btnTop>window.innerHeight-100?btnTop-window.innerHeight+200:btnTop);
//     el.style.position = 'fixed';
//     el.style.left = btnLeft+'px';
//     el.style.top = btnTop+'px';
// }

// function over_btn(e){
//     if(!e){
//         e = window.event;
//     }
//     btn_move(this, e.clientX, e.clientY);
// }
// var div_dom = document.getElementsByTagName('div');
// for(var i = 0;i < div_dom.length;i++){
//     div_dom[i].onmouseover = over_btn;
// }

var time_start = (new Date()).getTime();
var name = fmtDate(new Date());
var array = [];
var k = 0;
var find_flag = false;
var obj = {
    title:document.title,
    click:1,
    url:location.href,
    time:0
};

//console.log(name);
// console.log(time_start);
chrome.storage.local.get(['name','record'], function(items) {
        console.log(items);
        // items.name = '2019-07-14';
        if(items.name != name){
            httpRequest('https://www.why-dong.com/util/browsingHistory',items,showText);
        }

    })



document.addEventListener('visibilitychange',function(){
    var isHidden = document.hidden;
    if(isHidden){
        setData();
    }else{

        // chrome.storage.local.get({
        //     array : array
        // }, function(items) {
        //     console.log(items);
        // })
        time_start = (new Date()).getTime();
        find_flag = false;
    }
})

window.addEventListener('beforeunload',function(event){
    setData();
    // event.returnValue = "我在这写点东西...";
})


// window.onbeforeunload = function(e){
//     setData();
//     return 'confirm()'
// }
// 
// chrome.storage数据清除
 //chrome.storage.local.clear(function(){})

function setData(){
    var time_end = (new Date()).getTime();
    chrome.storage.local.get(['name','record'], function(items) {
        console.log(items);
        if ( !items.name || !items.record ) {
            items = {
                name: name,
                record: []
            }
        }
        for(var i = 0;i < items.record.length;i++){
             // console.log(obj.title,items.record[i].title);
            if(obj.url == items.record[i].url){
                k = i;
                obj.click = items.record[i].click + 1;
                obj.time = items.record[i].time + time_end - time_start;
                find_flag = true;
                break;
            }
        }


        if(find_flag){
            items.record[k] = obj;
        }else{
            obj.title = document.title;
            obj.click = 1;
            obj.url = location.href;
            obj.time = time_end - time_start;
            items.record.push(obj);
        }

        chrome.storage.local.set({name:name,record:items.record}, function() {
            // console.log('保存成功！');
        });
    });
}

function httpRequest(url,data,callback){
    var xhr = new XMLHttpRequest();
    xhr.open("post",url,true);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            callback(xhr.status);
        }
    }
     // data = (function(obj){ // 转成post需要的字符串
     //     var str = "";
     //        for(var prop in obj){
     //         str += prop + "=" + obj[prop] + "&"
     //     }
     //     return str;
     // })(data);
     // console.log(data);
    xhr.send(JSON.stringify(data));
}

function showText(result){
    if(result == 200 || result=='200'){
        chrome.storage.local.clear(function(){});
    }
}

function fmtDate(obj){
    var date =  new Date(obj);
    var y = 1900+date.getYear();
    var m = "0"+(date.getMonth()+1);
    var d = "0"+date.getDate();
    return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
}
