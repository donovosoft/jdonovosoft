var donovosoft=function(){};donovosoft.fn=donovosoft.prototype={version:"1.2.5",globals:{},browser:{title:navigator.appName,cockies:navigator.cookieEnabled,supportHTML5:function(){if(this.supportGPS())return true},size:function(){return"["+window.screen.width+","+window.screen.height+"]"},supportGPS:function(){if(window.navigator!=null){return true}else return false},supportCanvas:function(){if(window.canvas!=null){return true}else{return false}},isIE:function(){var e=this.title.split(" ");for(var t=0;t<e.length;t++){if(e[t]=="Explorer"){return true}}return false},online:function(){return window.navigator.onLine},url:function(){return location.href},position:function(){var e=0,t=0;if(window.screenTop!=null){e=window.screenTop;t=window.screenLeft}else{e=window.screenY;t=window.screenX}return{top:e,left:t}},scroll:function(e){window.scrollBy(e.left,e.top)},setHomePage:function(e){if(e==null){e=this.url()}if(document.all){document.body.style.behavior="url(#default#homepage)";document.body.setHomePage(e)}else if(window.sidebar){if(window.netscape){try{netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")}catch(t){}}var n=Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);n.setCharPref("browser.startup.homepage",e)}}},findPosition:function(e){var t=0;if(e.offsetParent){do{t+=e.offsetTop}while(obj=e.offsetParent);return[t]}},crono:function(e){function o(){s++;if(i>0&&s==i){clearTimeout(t)}else{t=setTimeout(function(){r.call(null);o()},n*1e3)}}var t=null;var n=e.delay;var r=e.work;var i=e.limit;var s=0;var u={isRunning:function(){if(t!=null){return true}else{return false}},start:function(){o()},stop:function(){clearTimeout(t)}};return u},set:function(e,t,n){for(var r=0;r<n.length;r++){n[r][e]=t}},Effects:{glow:function(e,t){if(e!=null){e.style[t.property]=t.lastColor;$_.Effects.fadeOut(e,{speed:t.speed,success:function(){$_.Effects.fadeOut(e,{speed:t.speed,success:function(){e.style[t.property]=t.firstColor;$_.Effects.fadeOut(e,{speed:t.speed,success:function(){e.style[t.property]=t.lastColor;$_.Effects.fadeOut(e,{speed:t.speed,success:function(){e.style[t.property]=t.firstColor;if(t.success!=null)t.success.call(null)}})}})}})}})}},fadeOut:function(e,t){function n(r){var i=(new Date).getTime();var s=i-r;if(e.FadeTimeLeft<=s){e.style.opacity=e.FadeState==1?"1":"0";e.style.filter="alpha(opacity = "+(e.FadeState==1?"100":"0")+")";e.FadeState=e.FadeState==1?2:-2;t.success.call(null);return}e.FadeTimeLeft-=s;var o=e.FadeTimeLeft/t.speed;if(e.FadeState==1)o=1-o;e.style.opacity=o;e.style.filter="alpha(opacity = "+o*100+")";setTimeout(function(){n(i)},33)}if(e.FadeState==null){if(e.style.opacity==null||e.style.opacity==""||e.style.opacity=="1"){e.FadeState=2}else{e.FadeState=-2}}if(e.FadeState==1||e.FadeState==-1){e.FadeState=e.FadeState==1?-1:1;e.FadeTimeLeft=t.speed-e.FadeTimeLeft}else{e.FadeState=e.FadeState==2?-1:1;e.FadeTimeLeft=t.speed;setTimeout(function(){n((new Date).getTime())},33)}},easing:function(e,t,n,r,i){var s=t-e;var o=e+Math.pow(1/n*r,i)*s;return Math.ceil(o)},animateResize:function(e,t){var n=null;if(n){window.clearInterval(n)}var r=0;var i=t.steps;var s=t.intervals;var o=t.start;var u=t.end;var a=t.powr;var f=t.attribute;n=window.setInterval(function(){e.setAttribute(f,$_.Effects.easing(o,u,i,r,a));e.style[f]=e.getAttribute(f)+"px";r++;if(r>i)window.clearInterval(n)},s)},expand:function(e,t){if(e!=null){$_.Effects.animateResize(e,{start:t.start,end:t.start*t.expand,steps:t.speed,powr:.5,attribute:t.attribute,intervals:10})}},reduce:function(e,t){if(e!=null){$_.Effects.animateResize(e,{startWidth:e.width,endWidth:e.width/t.collapse,steps:t.speed,powr:.5,attribute:t.attribute,intervals:10})}},dissapear:function(e,t){if(e!=null){$_.Effects.animateResize(e,{startWidth:e[t.attribute],endWidth:0,steps:t.speed,powr:.5,attribute:t.attribute,intervals:10})}}},toJSON:function(e){if(typeof e=="string"){var t=null;e=e.trim();if(window.JSON&&window.JSON.parse){t=window.JSON.parse(e)}return t}else{return null}},Drawing:function(e){function o(t){var n;var r;if(t.pageX||t.pageY){n=t.pageX;r=t.pageY}else{n=t.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;r=t.clientY+document.body.scrollTop+document.documentElement.scrollTop}n-=e.element.offsetLeft;r-=e.element.offsetTop;return[n,r]}function l(){var i=null;u=function(e){e.preventDefault();i="yes";var n=o(e);t.lineTo(n[0],n[1]);t.stroke()};a=function(s){s.preventDefault();t.beginPath();t.lineWidth=r;t.strokeStyle=n;if(i==null){$_.addEvent("mousemove",e.element,u)}i="yes"};f=function(n){n.preventDefault();i=null;t.stroke();t.closePath();$_.removeEvent("mousemove",e.element,u)};$_.addEvent("mousedown",e.element,a);$_.addEvent("mouseup",e.element,f)}var t=e.element.getContext("2d");var n=e.lineColor;var r=e.lineWidth;var i=0;var s=null;var u=null;var a=null;var f=null;l();var c={clear:function(n){t.clearRect(0,0,e.element.width,e.element.height);if(s!=null){t.drawImage(s,0,0,s.width,s.height)}if(n!=null&&typeof n=="function"){n.call()}},stop:function(n){$_.removeEvent("mousemove",e.element,u);$_.removeEvent("mouseup",e.element,f);$_.removeEvent("mousedown",e.element,a);t=null;if(n!=null&&typeof n=="function"){n.call()}},continueDraw:function(n){t=e.element.getContext("2d");l()},save:function(t,n){if(t.toLowerCase()!="png"&&t.toLowerCase()!="jpg"&&t.toLowerCase()!="gif")return;var r=e.element.toDataURL("image/"+t+";base64");if(n!=null&&typeof n=="function"){n.call(null,r)}},getAngle:function(){return i},rotate:function(e,n){t.rotate((new Number(e)).toRad());if(n!=null&&typeof n=="function")n.call(null)},loadPicture:function(e,n,r){var i=new Image;i.onload=function(){t.drawImage(i,n.posx,n.posy,i.width,i.height);if(r!=null&&typeof r=="function"){r.call(null,i)}};s=i;i.src=e},getImages:function(){return loadedImages},setProperties:function(e){r=e.lineWidth;n=e.lineColor}};return c},forEach:function(e,t){if(e.length!=null&&typeof t=="function"){for(var n=0;n<e.length;n++){t.call(null,e[n],n)}}},toggle:function(e){if(e.style.display!="none"){e.style.display="none"}else{e.style.display=""}},toogleRead:function(e){if(e.readOnly==true){e.readonly=false}else{e.readonly=true}},init:function(){String.prototype.ltrim=function(){var e=new String(" 	\n\r");var t=new String(this);if(e.indexOf(t.charAt(0))!=-1){var n=0,r=t.length;while(n<r&&e.indexOf(t.charAt(n))!=-1)n++;t=t.substring(n,r)}return t};String.prototype.rtrim=function(){var e=new String(" 	\n\r");var t=new String(this);if(e.indexOf(t.charAt(t.length-1))!=-1){var n=t.length-1;while(n>=0&&e.indexOf(t.charAt(n))!=-1)n--;t=t.substring(0,n+1)}return t};String.prototype.trim=function(){return this.ltrim().rtrim()};String.prototype.regex=function(e){var t=null;if(e!=null){if(typeof e=="string")t=new RegExp(e);else{t=e;return t.test(this)}}else{return null}};String.prototype.isEmail=function(){var e="^[\\w-_.]*[\\w-_.]@[\\w].+[\\w]+[\\w]$";return this.regex(e)};String.prototype.escapeHTML=function(){return this.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">")};String.prototype.toArray=function(){return this.split("")};String.prototype.stripTags=function(){return this.replace(/<([^>]+)>/g,"")};String.prototype.contains=function(e){var t=this.toArray();for(var n=0;n<t.length;n++){if(t[n]==e){return true}}return false};String.prototype.encode=function(){var e=this.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return e};String.prototype.decode=function(){var e="";var t=0;var n=c1=c2=0;var r=this;while(t<r.length){n=r.charCodeAt(t);if(n<128){e+=String.fromCharCode(n);t++}else if(n>191&&n<224){c2=r.charCodeAt(t+1);e+=String.fromCharCode((n&31)<<6|c2&63);t+=2}else{c2=r.charCodeAt(t+1);c3=r.charCodeAt(t+2);e+=String.fromCharCode((n&15)<<12|(c2&63)<<6|c3&63);t+=3}}return e};String.prototype.replaceChar=function(e,t){var n=this.substring(0,e);var r=this.substring(e+1,-1);return n+t+r};Number.prototype.round=function(){return Math.round(this)};Number.prototype.toRad=function(){return this*Math.PI/180};Number.prototype.toDeg=function(){return this*180/Math.PI};Number.prototype.toBrng=function(){return(this.toDeg()+360)%360};Number.prototype.roundTo=function(e){var t="1";for(var n=0;n<e;n++){t+="0"}return Math.round(this*t)/t};Number.prototype.factorial=function(){if(this<=1){return 1}else{var e=1;for(var t=this;t>1;t--){e*=t}return e}};Date.prototype.addDay=function(e){if(!isNaN(e)){this.setDate(this.getDate()+e)}};Date.prototype.addMonth=function(e){if(!isNaN(e)){this.setMonth(this.getMonth()+e)}};Date.prototype.addYear=function(e){if(!isNaN(months)){this.setYear(this.getYear()+e)}};Date.prototype.now=function(){return(new Date).getTime()};Array.prototype.size=function(){return this.length};Array.prototype.set=function(e,t){for(var n=0;n<this.length;n++){this[n][e]=t}};Array.prototype.get=function(e){var t=new Array;for(var n=0;n<this.length;n++){t.push(this[n][e])}return t};Array.prototype.inArray=function(e){var t;for(t=0;t<this.length;t++){if(this[t]===e){return true}}return false};Array.prototype.indexOf=function(e){for(var t=0;t<this.length;t++)if(this[t]==e)return t;return-1};Array.prototype.remove=function(e){var t=new Array;for(var n=0;n<this.length;n++){if(this[n]!=e){t.push(this[n])}}return t};Array.prototype.merge=function(e){var t=this.length,n=0;if(typeof e.length==="number"){for(var r=e.length;n<r;n++){this[t++]=e[n]}}else{while(e[n]!==undefined){this[t++]=e[n++]}}return this.length};Array.prototype.grep=function(e){var t=new Array;for(var n=0;n<this.length;n++){if(e.call(this,this[n],n)){t.push(this[n])}}return t};this.globals["doAjaxStart"]=this.registerEvent("doAjaxStart");this.globals["doAjaxFinish"]=this.registerEvent("doAjaxFinish")},addClass:function(e,t){e.className+=" "+t},hasClass:function(e,t){if((new String(e.className)).regex("(\\s|^)"+t+"(\\s|$)")!=null){return true}return false},removeClass:function(e,t){if($_.hasClass(e,t)){var n=new RegExp("(\\s|^)"+t+"(\\s|$)");e.className=e.className.replace(n," ")}},replaceClass:function(e,t,n){this.removeClass(e,t);this.addClass(e,n)},children:function(e){var t=new Array;if(e.hasChildNodes()){if((new String(e.tagName)).toLowerCase()!="form"){var n=e.childNodes;for(var r=0;r<n.length;r++){t.push($_.findElement(n.item(r)))}}else{for(var r=0;r<e.elements.length;r++){t.push($_.findElement(e.elements[r]))}}}return t},validForm:function(e){function n(e){if(e.value==""||e.value.length<1)return true;else return false}var t=new Array;for(var r=0;r<e.elements.length;r++){var i=0;var s=$_.findElement(e.elements[r]);if(s.getAttribute("notEmpty")!=null&&s.getAttribute("notEmpty")=="1"){if(n(s)){i=1}}if(s.getAttribute("match")!=null&&s.getAttribute("match")!=""){if(s.getAttribute("match")=="email"){if(!(new String(s.value)).isEmail()){i=1}}else{if(!(new String(s.value)).regex(s.getAttribute("match"))){i=1}}}if(s.getAttribute("notEqual")!=null&&s.getAttribute("notEqual")!=""){if(s.value==s.getAttribute("notEqual")){i=1}}if(s.getAttribute("equalElement")!=null&&s.getAttribute("equalElement")!=""){if(s.value!=$_.findElement(s.getAttribute("equalElement")).value){i=1}}if(i>0){t.push(s)}i=0}return t},$$_:function(e,t){var n=new Array;var r=document.all?document.all:document.getElementsByTagName(e);for(var i=0;i<r.length;i++){if(t==null){n.push(r[i])}else{var s;for(var o in t){if(r[i][o]!=null&&r[i][o]==t[o]){s=true}else s=false}if(s)n.push(r[i])}}return n},checkAll:function(e,t){var n=null;if(t==null)n=this.$$_("input",{type:"checkbox"});else{n=this.$$_("input",t)}for(var r=0;r<n.length;r++){if(n[r].checked!=null){n[r].checked=e}}},cookie:function(){var e={gets:function(){if(typeof document.cookie!="undefined"){var e=new Array;if((new String(document.cookie)).contains(";")){var t=document.cookie.split(";");$_.forEach(t,function(t,n){var r=t.split("=");var i={name:r[0],value:r[1]};e.push(i)})}else{var n=document.cookie.split("=");var r={name:n[0],value:n[1]};e.push(r)}return e}else{return null}},get:function(e){var t=null;$_.forEach(this.gets(),function(n,r){if(e==n.name.trim()){t=n}});return t},set:function(e,t,n){var r=new Date;r.setDate(r.getDate()+n);var i=t.trim();document.cookie=e+"="+i},unset:function(e){this.set(e,"",-1)}};return e},clearCombo:function(e,t){for(var n=e.length-1;n>=t;n--){e.remove(n)}},comboAddOption:function(e,t){var n=document.createElement("option");n.text=t.label;n.value=t.value;try{e.add(n,null)}catch(r){e.add(n)}},colors:{aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]},keys:{backspace:8,tab:9,enter:13,shift:16,ctrl:17,alt:18,pause:19,capslock:20,escape:27,pageup:33,pagedown:34,end:35,home:36,leftarrow:37,uparrow:38,rightarrow:39,downarrow:40,insert:45,del:46,f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123,zero:48,one:49,two:50,three:51,four:52,five:53,six:54,seven:55,eight:56,nine:57},addCell:function(e,t,n){var r=e.insertCell(-1);for(var i in t){r[i]=t[i]}if(n!=null&&typeof n=="function")n.call(null,r);return r},deleteRow:function(e,t,n,r){var i=e.rows[t];if(r!=null){e.deleteRow.call(r,t)}else{e.deleteRow(t)}if(n!=null)n.call(null,i)},addRow:function(e,t,n){var r=e.insertRow(e.rows.length);$_.forEach(t,function(e,t){$_.addCell(r,e)});if(n!=null&&typeof n=="function")n.call(null,r);return r},clearRows:function(e,t){var n=e.rows.length;while(n>0){n--;if(t!=null){e.deleteRow.call(t,n)}else{e.deleteRow(n)}}},addEvent:function(e,t,n){if(n!=null&&typeof n=="function"){if(t.addEventListener){t.addEventListener(e,n,false);return}else if(t.attachEvent){t.attachEvent("on"+e,n);return}else{t["on"+e]=n;return}}},removeEvent:function(e,t,n){if(t.removeEventListener){t.removeEventListener(e,n);return}else if(t.dettachEvent){t.dettachEvent("on"+e,n);return}else{t["on"+e]=null;return}},rightClick:function(e,t){if(t==null&&typeof t=="function"){if(e==null)e=document;$_.addEvent("mousedown",e,function(e){if(e.button==2||e.button==3){t.call(this)}})}},click:function(e,t){if(t==null&&typeof t=="function"){if(e==null)e=document;$_.addEvent("click",e,t)}},addKeyEvent:function(e,t,n){if(e==null)e=document;$_.addEvent("keyup",e,function(e){var r=window.Event?true:false;var i=r?e.which:e.keyCode;if(i==t){n.call(this)}})},enter:function(e,t){if(t!=null&&typeof t=="function"){if(e==null)e=document;$_.addKeyEvent(e,$_.keys.enter,t)}},addElement:function(e,t,n,r){if(n==null){n=document}var i=document.createElement(e);for(var s in t){i[s]=t[s]}if(r!=null&&$_.browser.isIE()==false){n.appendChild.call(r,i)}else{n.appendChild(i)}},registerEvent:function(e){var t;if(document.createEvent){t=document.createEvent("Events");t.initEvent(e,true,true)}else{t=document.createEventObject()}return t},trigger:function(e,t){if(document.createEvent){document.dispatchEvent(this.globals[e])}else{this.globals[e].call(null)}},onLoad:function(e){window.onload=e},findElement:function(e){function o(e){var t={};t.prototype=e;t.constructor=t;for(var n in e){t[n]=e[n]}return t}function u(e,t){var n=null;if(e.getAttribute){n=e.getAttribute(t);if(n==null||n==undefined){n=e[t]}}else{n=e.getAttributeNode(t)}return n}function a(e,t,n){if(e.setAttribute){e.setAttribute(t,n)}else{var r=elem.getAttributeNode(t);if(!r){r=document.createAttribute(t);elem.setAttributeNode(r)}r.nodeValue=n+""}}var t=null;if(typeof e=="string"){if((new String(e)).contains("#")){var n=(new String(e)).replace("#","");var r=document.all?document.all:document.getElementsByTagName("*");for(var i=0;i<r.length;i++){if(r[i].className==n){t=r[i];break}}}else{t=document.getElementById((new String(e)).toString())}}else{t=e}var s={};if(t!=null){s=o(t);s.prototype.addClass=function(e){$_.addClass(this,e)};s.prototype.hasClass=function(e){return $_.hasClass(this,e)};s.prototype.removeClass=function(e){$_.removeClass(this,e)};s.prototype.addElement=function(e,t){$_.addElement(e,t,s,this)};s.prototype.click=function(e){$_.click(this,e)};s.prototype.position=function(){$_.findPosition(this)};s.prototype.glow=function(e){$_.Effects.glow(s,e)};if(t.nodeName.toLowerCase()=="select"){s.prototype.clear=function(e){$_.clearCombo(t,e)};s.prototype.addOption=function(e){$_.comboAddOption(t,e)}}else if(t.nodeName.toLowerCase()=="tbody"||t.nodeName.toLowerCase()=="thead"||t.nodeName.toLowerCase()=="table"){s.prototype.clear=function(){$_.clearRows(t,this)};s.prototype.addRow=function(e,t){$_.addRow(s,e,t)};s.prototype.deleteRow=function(e,t){$_.deleteRow(s,e,t,this)};s.prototype.deleteLastRow=function(e){$_.deleteRow(s,s.rows.length-1,e,this)};s.prototype.rows=function(){return s.rows};s.prototype.rowSize=function(){return s.rows.length}}}return s.prototype},ajax:function(e){var t=null;var n=null;try{objetoAjax=new ActiveXObject("Msxml2.XMLHTTP")}catch(r){try{objetoAjax=new ActiveXObject("Microsoft.XMLHTTP")}catch(i){objetoAjax=false}}var s=0;if(!t&&typeof XMLHttpRequest!="undefined"){t=new XMLHttpRequest}if(e.method.toLowerCase()=="get"){e.url=e.url+"?";for(var o in e.data){e.url+=o+"="+e.data[o]+"&"}}else{n=new String("");for(var o in e.data){n+=o+"="+e.data[o]+"&";s++}}t.open(e.method,e.url);if(e.contentType!=null){t.setRequestHeader("Content-Type",e.contentType)}else{t.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8")}if(s>0){t.setRequestHeader("Content-length",s);t.setRequestHeader("Connection","close")}t.onreadystatechange=function(){$_.trigger("doAjaxStart",null);if(t.readyState==4&&t.status==200){if(t.responseText){$_.trigger("doAjaxFinish",null);var n=t.responseText;if(e.dataType!=null&&e.dataType=="json"){n=$_.toJSON(t.responseText)}e.success.call(null,n)}else{$_.trigger("doAjaxFail",null)}}};t.send(n)}};donovosoft.fn.init();var $_=donovosoft.fn;var $$_=donovosoft.fn.$$_