/*!
 * doNovoSoft JavaScript Library v1.1.5 BETA
 * http://www.donovosoft.com/
 *
 * Copyright 2011, Mauricio Barrera
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * Require for JAlert and JQuestion the jquery and jquery-ui libraries 
 * Date: Tue Oct 18 2011
 *
 */
// / The following code needs the jQueryUI plugins
var JAlert = function() {
};
var JQuestion = function() {
};

JAlert.prototype = {
	title : "::..iFactmeX..::",
	width : "400px",
	mensaje : "<center>Aviso Generico</center>",
	after : function() {
	},
	show : "blind",
	hide : "explode",
	resizable : false,
	open : function() {
		var div = document.getElementById("generic_alert");
		div.innerHTML = "<center>" + this.mensaje + "</center>";
		jQuery("#generic_alert").dialog("option", "title", this.title);
		jQuery("#generic_alert").dialog("option", "resizable", this.resizable);
		jQuery("#generic_alert").dialog("open");
		jQuery("#generic_alert").bind("dialogclose", function() {
			this.after.call(null, null);
		});
	},
	get : function(what) {
		return this[what];
	},
	set : function(option, what) {
		this[what] = option;
	}

};

JQuestion.prototype = {
	title : "::..iFactmeX..::",
	width : "300px",
	question : "Are you insane??",
	after : null,
	buttons : new Array(),
	show : "blind",
	hide : "explode",
	resizable : false,
	open : function() {
		var div = document.getElementById("generic_question");
		div.innerHTML = "<center>" + this.question + "</center>";
		jQuery("#generic_question").dialog("option", "title", this.title);
		jQuery("#generic_question").dialog("option", "buttons", this.buttons);
		jQuery("#generic_question").dialog("option", "show", this.show);
		jQuery("#generic_question").dialog("option", "hide", this.hide);
		jQuery("#generic_question").dialog("option", "resizable",
				this.resizable);
		jQuery("#generic_question").dialog("open");
	},
	close : function() {
		jQuery("#generic_question").dialog("close");
	}
};
// / Core
var donovosoft = function() {
};
donovosoft.fn = donovosoft.prototype = {
	version : "1.1.5 BETA",
	browser : ({
		// Some info about your browser
		title : navigator.appName,
		coockies : navigator.cookieEnabled,
		supportHTML5 : function() {

		},
		size : function() {
			return "[" + window.screen.width + "," + window.screen.height + "]";
		},
		supportGPS : function() {
			if (window.navigator != null) {
				return true;
			} else
				return false;
		},
		supportCanvas : function() {
			if (window.canvas != null) {
				return true;
			} else {
				return false;
			}
		},
		isIE : function() {
			var a = this.title.split(' ');
			for ( var x = 0; x < a.length; x++) {
				if (a[x] == 'Explorer') {
					return true;
				}
			}
			return false;
		}

	}),
	toJSON : function(cadena) {
		if (typeof cadena == "string") {
			var obj = null;
			cadena = cadena.trim();
			if (window.JSON && window.JSON.parse) {
				obj = window.JSON.parse(cadena);
			}
			return obj;
		} else {
			return null;
		}
	},
	forEach : function(array, funcion) {
		if (array.length != null && typeof funcion == 'function') {
			for ( var x = 0; x < array.length; x++) {
				funcion.call(null, array[x], x);
			}
		}
	},
	init : function() {
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
			return this.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(
					/>/g, '&gt;');
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
					string += String.fromCharCode(((c & 15) << 12)
							| ((c2 & 63) << 6) | (c3 & 63));
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
		Array.prototype.size = function() {
			return this.length;
		};

	},
	addClass : function(element,clasz){
		element.className += " "+clasz;
	},
	hasClass: function(element,clasz){
		if(element.className.match(new RegExp('(\\s|^)' + clasz + '(\\s|$)')) != null){
			return true;
		}
		return false;
	},
	removeClass: function(element,clasz){
		if ($_.hasClass(element, clasz)) {
            var reg = new RegExp('(\\s|^)' + clasz + '(\\s|$)');
            element.className = element.className.replace(reg, ' ');
        }
	},
	alert : function(message, funcion) {
		var a = new JAlert();
		a.resizable = false;
		a.width = 400;
		a["after"] = funcion;
		a.mensaje = message.toString();
		a.open();
	},
	$$_ : function(tag, filtro) {
		var arreglo = new Array();
		var nodes = (document.all) ? document.all : document
				.getElementsByTagName(tag);
		for ( var x = 0; x < nodes.length; x++) {
			if (filtro == null) {
				arreglo.push(nodes[x]);
			} else {
				for ( var key in filtro) {
					if (nodes[x][key] == null || nodes[x][key] != filtro[key]) {
						return arreglo;
					}
				}
				arreglo.push(nodes[x]);
			}
		}
		return arreglo;
	},
	checkAll : function(bool) {
		var checks = this.$$_("input", {
			type : "checkbox"
		});
		for ( var x = 0; x < checks.length; x++) {
			if (checks[x].checked != null) {
				checks[x].checked = bool;
			}
		}
	},
	Cookie : function() {
		var name;
		var value;
		var domain;
	},
	getCookies : function() {
		if (typeof document.cookie != "undefined") {
			var cookies = new Array();
			if (new String(document.cookie).contains(';')) {
				var items = document.cookie.split(";");
				$_.forEach(items, function(item, index) {
					var cookie = document.cookie.split("=");
					this.cookie = {
						name : cookie[0],
						value : cookie[1]
					};
					cookies.push(this.cookie);
				});
			} else {
				var cookie = document.cookie.split("=");
				this.cookie = {
					name : cookie[0],
					value : cookie[1]
				};
				cookies.push(this.cookie);
			}
			return cookies;
		} else {
			return null;
		}
	},
	getCookie : function(name) {
		$_.forEach(this.getCookies(), function(cookie, pos) {
			if (name == cookie.name) {
				return cookie;
			}
		});
	},
	setCookie : function(name, value, exp) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + exp);
		var c_value = escape(value);
		document.cookie = name + "=" + c_value;
	},
	clearCombo : function(combobox, limit) {
		for ( var i = combobox.length - 1; i >= limit; i--) {
			combobox.remove(i);
		}
	},
	comboAddOption : function(combobox, properties) {
		var elOptNew = document.createElement('option');
		elOptNew.text = properties.label;
		elOptNew.value = properties.value;
		try {
			combobox.add(elOptNew, null);
		} catch (ex) {
			combobox.add(elOptNew);
		}
	},
	colors : {
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
	},
	
	keys : {
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
	},
	addCell : function(row,properties,funcion){
		var td = row.insertCell(-1);
		for ( var key in properties) {
			td[key] = properties[key];
		}
		funcion.call(null,td);
	},
	deleteRow : function(table,rowIndex,funcion){
		var row = table.rows[rowIndex];
		table.deleteRow(rowIndex);
		if(funcion != null)
			funcion.call(null,row);
	},
	addRow : function(table,fields,funcion){
		var row = table.insertRow(table.rows.length);
		$_.forEach(fields,function(field,index){
			$_.addCell(row,field.properties,field.funcion);
		});
		funcion.call(null,row);
	},
	clearRows : function(table){
		var x=table.rows.length;
		while(table.rows.length > 0){
			x--;
			table.deleteRow(x);
		}
	},
	extend : function(obj) {
		var newobj = {};
		newobj.prototype = obj;
		newobj.constructor = newobj;
		for ( var key in obj) {
			newobj[key] = obj[key];
		}
		return newobj;
	},
	findElement : function(element) {
		var tmp = null;
		if (new String(element).contains("#")) {
			var ele = new String(element).replace("#", '');
			var nodes = (document.all) ? document.all : document
					.getElementsByTagName("*");
			for ( var x = 0; x < nodes.length; x++) {
				if (nodes[x].className == ele) {
					tmp = nodes[x];
					break;
				}
			}
		} else {
			tmp = document.getElementById(new String(element).toString());
		}
		var object = {};
		if (tmp != null) {
			object = $_.extend(tmp);
			object.prototype.addClass = function(clasz){
				$_.addClass(object,clasz);
			};
			object.prototype.hasClass = function(clasz){
				return $_.hasClass(object,clasz);
			};
			object.prototype.removeClass = function(clasz){
				$_.removeClass(object,clasz);
			};
			if (tmp.nodeName.toLowerCase() == "select") {
				object.prototype.clear = function(limit) {
					$_.clearCombo(tmp, limit);
				};
				object.prototype.addOption = function(properties) {
					$_.comboAddOption(tmp, properties);
				};
			}else if(tmp.nodeName.toLowerCase() == "tbody" || tmp.nodeName.toLowerCase() == "thead" || tmp.nodeName.toLowerCase() =="table"){
				object.prototype.clear = function(){
					$_.clearRows(tmp);
				};
				object.prototype.addRow = function(fields,funcion){
					$_.addRow(object,fields,funcion);
				};
				object.prototype.deleteRow = function(rowIndex,funcion){
					$_.deleteRow(object,rowIndex,funcion);
				};
				object.prototype.deleteLastRow = function(funcion){
					$_.deleteRow(object,(object.rows.length - 1),funcion);
				};
			}
		}
		return object.prototype;
	},
	ajax : function() {
		// not implemented yet...
	}

};
donovosoft.fn.init();
var $_ = donovosoft.fn;
var $$_ = donovosoft.fn.$$_;
