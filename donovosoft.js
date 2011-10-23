/*!
 * doNovoSoft JavaScript Library v0.0.5
 * http://www.donovosoft.com/
 *
 * Copyright 2011, Mauricio Barrera
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * 
 * Date: Tue Oct 18 2011
 *
 */
// Extending native objects...
String.prototype.ltrim = function() {
	var whitespace = new String(" \t\n\r");
	var s = new String(this);
	if (whitespace.indexOf(s.charAt(0)) != -1) {
		var j = 0, i = s.length;
		while (j < i && whitespace.indexOf(s.charAt(j)) != -1)
			j++;
		s = s.substring(j, i);
	}
	return s;

};
String.prototype.rtrim = function() {
	var whitespace = new String(" \t\n\r");
	var s = new String(this);
	if (whitespace.indexOf(s.charAt(s.length - 1)) != -1) {
		var i = s.length - 1; // Get length of string
		while (i >= 0 && whitespace.indexOf(s.charAt(i)) != -1)
			i--;
		s = s.substring(0, i + 1);
	}
	return s;

};
String.prototype.trim = function() {
	return this.ltrim().rtrim();
};

String.prototype.isEmail = function() {
	var pattern = "^[\\w-_\.]*[\\w-_\.]\@[\\w]\.+[\\w]+[\\w]$";
	var regex = new RegExp(pattern);
	return regex.test(this);
};
String.prototype.escapeHTML = function() {
	return this.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g,
			'&gt;');
};
String.prototype.toArray = function() {
	return this.split('');
};
String.prototype.contains = function(text) {
	var a = this.toArray();
	for ( var x = 0; x < a.length; x++) {
		if (a[x] == text) {
			return true;
		}
	}
	return false;
};
String.prototype.encode = function() {
	var string = this.replace(/\r\n/g, "\n");
	var utftext = "";
	for ( var n = 0; n < string.length; n++) {

		var c = string.charCodeAt(n);

		if (c < 128) {
			utftext += String.fromCharCode(c);
		} else if ((c > 127) && (c < 2048)) {
			utftext += String.fromCharCode((c >> 6) | 192);
			utftext += String.fromCharCode((c & 63) | 128);
		} else {
			utftext += String.fromCharCode((c >> 12) | 224);
			utftext += String.fromCharCode(((c >> 6) & 63) | 128);
			utftext += String.fromCharCode((c & 63) | 128);
		}

	}
	return string;
};

String.prototype.decode = function() {
	var string = "";
	var i = 0;
	var c = c1 = c2 = 0;
	var utftext = this;
	while (i < utftext.length) {
		c = utftext.charCodeAt(i);
		if (c < 128) {
			string += String.fromCharCode(c);
			i++;
		} else if ((c > 191) && (c < 224)) {
			c2 = utftext.charCodeAt(i + 1);
			string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
			i += 2;
		} else {
			c2 = utftext.charCodeAt(i + 1);
			c3 = utftext.charCodeAt(i + 2);
			string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6)
					| (c3 & 63));
			i += 3;
		}
	}
	return string;

};
String.prototype.replaceChar = function(position, newChar) {
	var cadena = this.substring(0, position);
	var end = this.substring(position + 1, -1);
	return cadena + newChar + end;
};
Number.prototype.round = function() {
	return Math.round(this);
};
Date.prototype.addDay = function(days) {
	if (!isNaN(days)) {
		this.setDate(this.getDate() + days);
	}
};
HTMLElement.prototype.show = function() {
	try {
		this.style.visibility = "visible";
	} catch (e) {
	}
};
HTMLElement.prototype.hide = function() {
	try {
		this.style.visibility = "hidden";
	} catch (e) {
	}
};
HTMLInputElement.prototype.enable = function() {
	try {
		this.disabled = false;
	} catch (e) {
	}
};

HTMLInputElement.prototype.changeToUpper = function(){
	var convierte = function(){
		this.value = new String(this.value).toUpperCase();
		return true;
	};
	if(this.addEventListener){
		this.addEventListener("keyup", convierte,false);
	}else{
		this.attachEvent("onkeyup", convierte);
	}
};
HTMLInputElement.prototype.disable = function() {
	try {
		this.disabled = true;
	} catch (e) {
		alert(e);
		console.log(e);
	}
};

HTMLInputElement.prototype.click = function(funcion){
	if((typeof funcion) == 'function'){
		if(this.addEventListener){
			this.addEventListener("click", funcion, false);
		}else{
			this.attachEvent("onclick", funcion);
		}
	}
};
HTMLImageElement.prototype.click = function(funcion){
	if((typeof funcion) == 'function'){
		if(this.addEventListener){
			this.addEventListener("click", funcion, false);
		}else{
			this.attachEvent("onclick", funcion);
		}
	}
};
HTMLSelectElement.prototype.append = function(label, value) {
	var elOptNew = document.createElement('option');
	elOptNew.text = label;
	elOptNew.value = value;
	try {
		this.add(elOptNew, null);
	} catch (ex) {
		this.add(elOptNew);
	}
};
HTMLSelectElement.prototype.clear = function() {
	this.options.length = 0;
};
// Helpers

var colors = {
	aqua : [ 0, 255, 255 ],
	azure : [ 240, 255, 255 ],
	beige : [ 245, 245, 220 ],
	black : [ 0, 0, 0 ],
	blue : [ 0, 0, 255 ],
	brown : [ 165, 42, 42 ],
	cyan : [ 0, 255, 255 ],
	darkblue : [ 0, 0, 139 ],
	darkcyan : [ 0, 139, 139 ],
	darkgrey : [ 169, 169, 169 ],
	darkgreen : [ 0, 100, 0 ],
	darkkhaki : [ 189, 183, 107 ],
	darkmagenta : [ 139, 0, 139 ],
	darkolivegreen : [ 85, 107, 47 ],
	darkorange : [ 255, 140, 0 ],
	darkorchid : [ 153, 50, 204 ],
	darkred : [ 139, 0, 0 ],
	darksalmon : [ 233, 150, 122 ],
	darkviolet : [ 148, 0, 211 ],
	fuchsia : [ 255, 0, 255 ],
	gold : [ 255, 215, 0 ],
	green : [ 0, 128, 0 ],
	indigo : [ 75, 0, 130 ],
	khaki : [ 240, 230, 140 ],
	lightblue : [ 173, 216, 230 ],
	lightcyan : [ 224, 255, 255 ],
	lightgreen : [ 144, 238, 144 ],
	lightgrey : [ 211, 211, 211 ],
	lightpink : [ 255, 182, 193 ],
	lightyellow : [ 255, 255, 224 ],
	lime : [ 0, 255, 0 ],
	magenta : [ 255, 0, 255 ],
	maroon : [ 128, 0, 0 ],
	navy : [ 0, 0, 128 ],
	olive : [ 128, 128, 0 ],
	orange : [ 255, 165, 0 ],
	pink : [ 255, 192, 203 ],
	purple : [ 128, 0, 128 ],
	violet : [ 128, 0, 128 ],
	red : [ 255, 0, 0 ],
	silver : [ 192, 192, 192 ],
	white : [ 255, 255, 255 ],
	yellow : [ 255, 255, 0 ],
	transparent : [ 255, 255, 255 ]
};

var keys = {
	backspace : 8,
	tab : 9,
	enter : 13,
	shift : 16,
	ctrl : 17,
	alt : 18,
	pause : 19,
	capslock : 20,
	escape : 27,
	pageup : 33,
	pagedown : 34,
	end : 35,
	home : 36,
	leftarrow : 37,
	uparrow : 38,
	rightarrow : 39,
	downarrow : 40,
	insert : 45,
	del : 46,
	f1 : 112,
	f2 : 113,
	f3 : 114,
	f4 : 115,
	f5 : 116,
	f6 : 117,
	f7 : 118,
	f8 : 119,
	f9 : 120,
	f10 : 121,
	f11 : 122,
	f12 : 123
};

// / Core
var doNovosoft = (function(selector) {
	doNovosoft.fn = doNovosoft.prototype = {
		version : "0.1.0 BETA",
		constructor : doNovosoft,
		init : function(selector) {
			if ((typeof selector) == 'function') {
				this.ready = selector;
			}
			if (document.addEventListener) {
				window.addEventListener("load", this.ready, false);
			} else {
				window.attachEvent("onload", this.ready);
			}
			return this;
		},
		ready : function() {
		}
	};
	return new doNovosoft.fn.init(selector);
});
var ajax = function(){};
ajax.prototype = {
	aObject : null,
	complete : false,
	json: false,
	url : "",
	method : "post",
	contentType : 'application/x-www-form-urlencoded',
	init : function() {
		var o;
		try {
			o = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				o = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (E) {
			}
		}
		if (!o && typeof XMLHttpRequest != 'undefined') {
			o = new XMLHttpRequest();
		}
		this.aObject = o;
	},
	complete : function() {
		
	},

};

function $_(element) {
	if (new String(element).contains("#")) {
		var ele = new String(element).replace("#", '');
		var nodes = (document.all) ? document.all : document
				.getElementsByTagName("*");
		for ( var x = 0; x < nodes.length; x++) {
			if (nodes[x].className == ele)
				return nodes[x];
		}
	} else {
		return document.getElementById(new String(element).toString());
	}
}

var List = function() {
};
List.prototype = {
	arreglo : new Array(),
	add : function(obj) {
		this.arreglo.push(obj);
	},
	size : function() {
		return this.arreglo.length;
	},
	get : function(pos) {
		if (!isNaN(pos)) {
			return this.arreglo[pos];
		}
	},
	clear : function() {
		this.arreglo = null;
		this.arreglo = new Array();
	},
	isEmpty : function() {
		if (this.arreglo.length < 1)
			return true;
		else
			return false;
	}
};