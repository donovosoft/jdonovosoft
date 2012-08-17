/*!
 * doNovoSoft JavaScript Library v1.2.1
 * http://www.donovosoft.com/
 *
 * Copyright 2011, Mauricio Barrera
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * Require for JAlert and JQuestion the jquery and jquery-ui libraries 
 * Date: Tue Oct 18 2011
 *
 */
/// Core
var donovosoft = function() {
};
donovosoft.fn = donovosoft.prototype = {
	version : "1.2.1",
	globals : {},
	browser : ({
		// Some info about your browser
		title : navigator.appName,
		coockies : navigator.cookieEnabled,
		supportHTML5 : function() {
			if (this.supportGPS())
				return true;
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
		},
		online : function() {
			return window.navigator.onLine;
		},
		url : function() {
			return location.href;
		},
		setHomePage : function(url) {
			if (url == null) {
				url = this.url();
			}
			if (document.all) {
				document.body.style.behavior = 'url(#default#homepage)';
				document.body.setHomePage(url);
			} else if (window.sidebar) {
				if (window.netscape) {
					try {
						netscape.security.PrivilegeManager
								.enablePrivilege("UniversalXPConnect");
					} catch (e) {
					}
				}
				var prefs = Components.classes['@mozilla.org/preferences-service;1']
						.getService(Components.interfaces.nsIPrefBranch);
				prefs.setCharPref('browser.startup.homepage', url);
			}
		}
	}),
	crono : function(params) {
		var t = null;
		var delay = params.delay;
		var work = params.work;
		var limit = params.limit;
		var times = 0;
		function timed() {
			work.call(null);
			times++;
			if (limit > 0 && times == limit) {
				clearTimeout(t);
			} else {
				t = setTimeout(function() {
					timed();
				}, delay * 1000);
			}
		}
		var _crono = {
			isRunning : function() {
				if (t != null) {
					return true;
				} else {
					return false;
				}
			},
			start : function() {
				timed();
			},
			stop : function() {
				clearTimeout(t);
			}
		};
		return _crono;
	},
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
		// //////Number extend//////
		Number.prototype.round = function() {
			return Math.round(this);
		};
		Number.prototype.toRad = function() {
			return this * Math.PI / 180;
		};
		Number.prototype.toDeg = function() {
			return this * 180 / Math.PI;
		};
		Number.prototype.toBrng = function() {
			return (this.toDeg() + 360) % 360;
		};
		// ///// Date Object Extend /////////
		Date.prototype.addDay = function(days) {
			if (!isNaN(days)) {
				this.setDate(this.getDate() + days);
			}
		};
		// ////// Array Object Extend ////////////////
		Array.prototype.size = function() {
			return this.length;
		};
		this.globals["doAjaxStart"] = this.registerEvent('doAjaxStart');
		this.globals["doAjaxFinish"] = this.registerEvent('doAjaxFinish');
	},
	addClass : function(element, clasz) {
		element.className += " " + clasz;
	},
	hasClass : function(element, clasz) {
		if (element.className.match(new RegExp('(\\s|^)' + clasz + '(\\s|$)')) != null) {
			return true;
		}
		return false;
	},
	removeClass : function(element, clasz) {
		if ($_.hasClass(element, clasz)) {
			var reg = new RegExp('(\\s|^)' + clasz + '(\\s|$)');
			element.className = element.className.replace(reg, ' ');
		}
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
	cookie : function(params) {
		var name = params.name;
		var value = params.value;
		var domain = params.domain;
		var _cookie = {
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
						var galleta = document.cookie.split("=");
						var mycookie = {
							name : galleta[0],
							value : galleta[1]
						};
						cookies.push(mycookie);
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
			}
		};
		return _cookie;
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
		f12 : 123,
		zero : 48,
		one : 49,
		two : 50,
		three : 51,
		four : 52,
		five : 53,
		six : 54,
		seven : 55,
		eight : 56,
		nine : 57
	},
	addCell : function(row, properties, funcion) {
		var td = row.insertCell(-1);
		for ( var key in properties) {
			td[key] = properties[key];
		}
		funcion.call(null, td);
	},
	deleteRow : function(table, rowIndex, funcion, ref) {
		var row = table.rows[rowIndex];
		if (ref != null) {
			table.deleteRow.call(ref, rowIndex);
		} else {
			table.deleteRow(rowIndex);
		}
		if (funcion != null)
			funcion.call(null, row);
	},
	addRow : function(table, fields, funcion) {
		var row = table.insertRow(table.rows.length);
		$_.forEach(fields, function(field, index) {
			$_.addCell(row, field.properties, field.funcion);
		});
		funcion.call(null, row);
	},
	clearRows : function(table, ref) {
		var x = table.rows.length;
		while (x > 0) {
			x--;
			if (ref != null) {
				table.deleteRow.call(ref, x);
			} else {
				table.deleteRow(x);
			}
		}
	},
	addEvent : function(name, element, funcion) {
		if (!$_.browser.isIE()) {
			element.addEventListener(name, funcion, false);
		} else {
			element.attachEvent('on' + name, funcion);
		}
	},
	click : function(element, funcion) {
		$_.addEvent('click', element, funcion);
	},
	addKeyEvent : function(element, keycode, funcion) {
		if (element == null)
			element = document;
		$_.addEvent('keyup', element, function(event) {
			var nav4 = window.Event ? true : false;
			// NOTE: Backspace = 8, Enter = 13, '0' = 48, '9' = 57
			var key = nav4 ? event.which : event.keyCode;
			if (key == keycode) {
				funcion.call(this);
			}
		});
	},
	enter : function(element, funcion) {
		$_.addKeyEvent(element, $_.keys.enter, funcion);
	},
	addElement : function(tag, properties, parentNode, ref) {
		if (parentNode == null) {
			parentNode = document;
		}
		var element = document.createElement(tag);
		for ( var key in properties) {
			element[key] = properties[key];
		}

		if (ref != null && $_.browser.isIE() == false) {
			parentNode.appendChild.call(ref, element);
		} else {
			parentNode.appendChild(element);
		}
	},
	registerEvent : function(name) {
		var event;
		if (document.createEvent) {
			event = document.createEvent('Events');
			event.initEvent(name, true, true);
		} else {
			event = document.createEventObject();
		}
		return event;
	},
	trigger : function(event, params) {
		if (document.createEvent) {
			document.dispatchEvent(this.globals[event]);
		} else {
			document.fireEvent("on" + event.toLowerCase(), this.globals[event]);
		}
	},
	onLoad : function(funcion) {
		window.onload = funcion;
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
			object.prototype.addClass = function(clasz) {
				$_.addClass(this, clasz);
			};
			object.prototype.hasClass = function(clasz) {
				return $_.hasClass(this, clasz);
			};
			object.prototype.removeClass = function(clasz) {
				$_.removeClass(this, clasz);
			};
			object.prototype.addElement = function(tag, properties) {
				$_.addElement(tag, properties, object, this);
			};
			object.prototype.click = function(funcion) {
				$_.click(this, funcion);
			};
			if (tmp.nodeName.toLowerCase() == "select") {
				object.prototype.clear = function(limit) {
					$_.clearCombo(tmp, limit);
				};
				object.prototype.addOption = function(properties) {
					$_.comboAddOption(tmp, properties);
				};
			} else if (tmp.nodeName.toLowerCase() == "tbody"
					|| tmp.nodeName.toLowerCase() == "thead"
					|| tmp.nodeName.toLowerCase() == "table") {
				object.prototype.clear = function() {
					$_.clearRows(tmp, this);
				};
				object.prototype.addRow = function(fields, funcion) {
					$_.addRow(object, fields, funcion);
				};
				object.prototype.deleteRow = function(rowIndex, funcion) {
					$_.deleteRow(object, rowIndex, funcion, this);
				};
				object.prototype.deleteLastRow = function(funcion) {
					$_.deleteRow(object, (object.rows.length - 1), funcion,
							this);
				};
			}
		}
		return object.prototype;
	},
	ajax : function(object) {
		// Creando objeto ajax
		var objectAjax = null;
		var params = null;
		// Para IE
		try {
			objetoAjax = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				objetoAjax = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (E) {
				objetoAjax = false;
			}
		}
		var contenido = 0;
		// Para todos los demas
		if (!objectAjax && typeof XMLHttpRequest != 'undefined') {
			objectAjax = new XMLHttpRequest();
		}
		if (object.method.toLowerCase() == 'get') {
			object.url = object.url + "?";
			for ( var key in object.data) {
				object.url += key + "=" + object.data[key] + "&";
			}
		} else {
			params = new String("");
			for ( var key in object.data) {
				params += key + "=" + object.data[key] + "&";
				contenido++;
			}
		}
		objectAjax.open(object.method, object.url);
		// definiendo un content type default
		if (object.contentType != null) {
			objectAjax.setRequestHeader('Content-Type', object.contentType);
		} else {
			objectAjax.setRequestHeader('Content-Type',
					"application/x-www-form-urlencoded; charset=UTF-8");
		}
		if (contenido > 0) {
			objectAjax.setRequestHeader("Content-length", contenido);
			objectAjax.setRequestHeader("Connection", "close");
		}
		objectAjax.onreadystatechange = function() {
			$_.trigger("doAjaxStart", null);
			if (objectAjax.readyState == 4 && objectAjax.status == 200) {
				if (objectAjax.responseText) {
					$_.trigger("doAjaxFinish", null);
					object.success.call(null, objectAjax.responseText);
				} else {
					$_.trigger("doAjaxFail", null);
				}
			}
		};
		objectAjax.send(params);
	}

};
donovosoft.fn.init();
var $_ = donovosoft.fn;
var $$_ = donovosoft.fn.$$_;