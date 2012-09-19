/*!
 * doNovoSoft JavaScript Library v1.2.1
 * http://www.donovosoft.com/
 *
 * Copyright 2011, Mauricio Barrera
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * Date: Tue Oct 18 2011
 * 
 *@autor Mauricio Barrera 
 */
/// Core
var donovosoft = function() {
};
/**
 * The core functions
 * @module Core
 */
donovosoft.fn = donovosoft.prototype = {
		/**
		 * Readonly version , just informative
		 * @property version
		 * @type {String}
		 */
	version : "1.2.1",
	// reserved space for global vars
	globals : {},
	/**
	 * Browser object extending more functions and info of your browser
	 * @class Browser
	 */
	browser : ({
		// Some info about your browser
		title : navigator.appName,
		cockies : navigator.cookieEnabled,
		/**
		 * True if the current browser supports HTML5 functions
		 * @method supportHTML5
		 * @returns {Boolean}
		 */
		supportHTML5 : function() {
			if (this.supportGPS())
				return true;
		},
		/**
		 * Return the size of your current window
		 * @method size
		 * @returns {String}
		 */
		size : function() {
			return "[" + window.screen.width + "," + window.screen.height + "]";
		},
		// method to test if your browser supports location gps
		// NOT YET TESTED
		supportGPS : function() {
			if (window.navigator != null) {
				return true;
			} else
				return false;
		},
		/**
		 * Returns true if you browser supports canvas
		 * @method supportCanvas
		 * @returns {Boolean}
		 */
		supportCanvas : function() {
			if (window.canvas != null) {
				return true;
			} else {
				return false;
			}
		},
		/**
		 * Returns true if your browser is any version of IE
		 * @method isIE
		 * @returns {Boolean}
		 */
		isIE : function() {
			var a = this.title.split(' ');
			for ( var x = 0; x < a.length; x++) {
				if (a[x] == 'Explorer') {
					return true;
				}
			}
			return false;
		},
		/**
		 * Return true if the browser detects an Internet Connection
		 * @method online
		 * @returns {boolean}
		 */
		online : function() {
			return window.navigator.onLine;
		},
		/**
		 * Return the current location of the page
		 * @method url
		 * @returns {String}
		 */
		url : function() {
			return location.href;
		},
		position : function() {
			var top = 0, left = 0;
			if (window.screenTop != null) {
				top = window.screenTop;
				left = window.screenLeft;
			} else {
				top = window.screenY;
				left = window.screenX;
			}
			return {
				top : top,
				left : left
			};
		},
		scroll : function(position) {
			window.scrollBy(position.left, position.top);
		},
		/**
		 * Set the especified url as home page on any browser
		 * @method setHomePage
		 * @param url {String}
		 */
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
	findPosition : function(element) {
		var curtop = 0;
		if (element.offsetParent) {
			do {
				curtop += element.offsetTop;
			} while (obj = element.offsetParent);
			return [ curtop ];
		}
	},
	/**
	 * A cronometer params accepted: delay: the time in seconds to execute the
	 * function work: the function to call
	 * 
	 * Return the object crono without activity use:
	 * var cron = $_.crono({delay:10,work:function(){alert('Some')}});
	 * cron.start() // To start the service cron.isRunning() // returns true if
	 * the cron is actually running cron.stop() // stop the service
	 * @class Crono
	 * @param params {Object}
	 * @returns {Object}
	 */
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
				/**
				 * Returns true if the Crono instance is active or is actually running
				 * @method isRunning
				 * @returns {Boolean}
				 */
			isRunning : function() {
				if (t != null) {
					return true;
				} else {
					return false;
				}
			},
			/**
			 * Start the activity of the Crono object
			 * @method start
			 */
			start : function() {
				timed();
			},
			stop : function() {
				clearTimeout(t);
			}
		};
		return _crono;
	},
	/**
	 * Function that set a property with the value specified in an array of
	 * elements
	 * 
	 * 
	 * @param property {String}
	 * @param value {String}
	 * @param elements {Array}
	 */
	set : function(property, value, elements) {
		for ( var x = 0; x < elements.length; x++) {
			elements[x][property] = value;
		}
	},
	/**
	 * The Effects object
	 * @class Effects
	 * 
	 */
	Effects : ({
		/**
		 * Glow the element according to the params the properties accepted are:
		 * 
		 * property: The property of the object to glow
		 * speed: The time of the event in milisecs
		 * firstColor: set the init color of the element before glowing it
		 * lastColor: the color of the element after the glow
		 * success: function to execute when the event finish
		 * 
		 * Example:
		 * 
		 * var element = document.getElementById('element');
		 * $_.Effects.glow(element,{speed:1000:success:function(){alert ('OK');}});
		 * 
		 * @method glow
		 * @param element {Element}
		 * @param params {Object}
		 */
		glow : function(element, params) {
			if (element != null) {
				element.style[params.property] = params.lastColor;
				$_.Effects.fadeOut(
						element,{speed : params.speed,
							success : function() {
								$_.Effects.fadeOut(
														element,
														{
															speed : params.speed,
															success : function() {
																element.style[params.property] = params.firstColor;
																$_.Effects
																		.fadeOut(
																				element,
																				{
																					speed : params.speed,
																					success : function() {
																						element.style[params.property] = params.lastColor;
																						$_.Effects
																								.fadeOut(
																										element,
																										{
																											speed : params.speed,
																											success : function() {
																												element.style[params.property] = params.firstColor;
																												if (params.success != null)
																													params.success
																															.call(null);
																											}
																										});
																					}
																				});
															}
														});
									}
								});
			}
		},
		/***
		 * Make a fade to the element 
		 * 
		 * @method fadeOut
		 * @param element {Element}
		 * @param params {Object}
		 */
		fadeOut : function(element, params) {
			//Private function to animate
			function animateFade(lastTick) {
				var curTick = new Date().getTime();
				var elapsedTicks = curTick - lastTick;
				if (element.FadeTimeLeft <= elapsedTicks) {
					element.style.opacity = element.FadeState == 1 ? '1' : '0';
					element.style.filter = 'alpha(opacity = '
							+ (element.FadeState == 1 ? '100' : '0') + ')';
					element.FadeState = element.FadeState == 1 ? 2 : -2;
					params.success.call(null);
					return;
				}

				element.FadeTimeLeft -= elapsedTicks;
				var newOpVal = element.FadeTimeLeft / params.speed;
				if (element.FadeState == 1)
					newOpVal = 1 - newOpVal;

				element.style.opacity = newOpVal;
				element.style.filter = 'alpha(opacity = ' + (newOpVal * 100)
						+ ')';
				setTimeout(function() {
					animateFade(curTick);
				}, 33);
			}

			if (element.FadeState == null) {
				if (element.style.opacity == null
						|| element.style.opacity == ''
						|| element.style.opacity == '1') {
					element.FadeState = 2;
				} else {
					element.FadeState = -2;
				}
			}

			if (element.FadeState == 1 || element.FadeState == -1) {
				element.FadeState = element.FadeState == 1 ? -1 : 1;
				element.FadeTimeLeft = params.speed - element.FadeTimeLeft;
			} else {
				element.FadeState = element.FadeState == 2 ? -1 : 1;
				element.FadeTimeLeft = params.speed;
				setTimeout(function() {
					animateFade(new Date().getTime());
				}, 33);
			}
		},
		/**
		 * 
		 * @method easing
		 * @param minValue {Number}
		 * @param maxValue {Number
		 * @param totalSteps {Number
		 * @param actualStep {Number
		 * @param powrr {Number}
		 * @returns {Number}
		 */
		easing : function(minValue, maxValue, totalSteps, actualStep, powrr) {
			var delta = maxValue - minValue;
			var stepp = minValue
					+ (Math.pow(((1 / totalSteps) * actualStep), powrr) * delta);
			return Math.ceil(stepp);
		},
		/**
		 * @method animateResize
		 * @param element {Element}
		 * @param params {Object}
		 */
		animateResize : function(element, params) {
			var changeInterval = null;
			if (changeInterval) {
				window.clearInterval(changeInterval);
			}
			var actStep = 0;
			var steps = params.steps;
			var intervals = params.intervals;
			var startWidth = params.start;
			var endWidth = params.end;
			var powr = params.powr;
			var attrModify = params.attribute;
			changeInterval = window.setInterval(function() {
				element.setAttribute(attrModify,$_.Effects.easing(startWidth,
						endWidth, steps, actStep, powr));
				element.style[attrModify] = element.getAttribute(attrModify)+ "px";
				actStep++;
				if (actStep > steps)
					window.clearInterval(changeInterval);
			}, intervals);
		},
		/**
		 * @method expand
		 * @param element {Element}
		 * @param params {Object}
		 */
		expand : function(element, params) {
			if (element != null) {
				$_.Effects.animateResize(element, {
					startWidth : params.start,
					endWidth : params.start * params.expand,
					steps : params.speed,
					powr : 0.5,
					attribute : params.attribute,
					intervals : 10
				});
			}
		},
		/**
		 * 
		 * @method reduce
		 * @param element {Element}
		 * @param params {Object}
		 * 
		 */
		reduce : function(element, params) {
			if (element != null) {
				$_.Effects.animateResize(element, {
					startWidth : element.width,
					endWidth : element.width / params.collapse,
					steps : params.speed,
					powr : 0.5,
					attribute : params.attribute,
					intervals : 10
				});
			}
		},
		/**
		 * Animate an object until it hides with this properties:
		 * {attribute: 'width'/'height',speed:seconds}
		 * 
		 * @param element {Element}
		 * @param params {Object}
		 * @method dissapear
		 */
		dissapear : function(element, params) {
			if (element != null) {
				$_.Effects.animateResize(element, {
					startWidth : element[params.attribute],
					endWidth : 0,
					steps : params.speed,
					powr : 0.5,
					attribute : params.attribute,
					intervals : 10
				});
			}
		}
	}),
	/**
	 * Try to create a JSON object from a string
	 * 
	 * @method toJSON
	 * @param reference {String}
	 * @returns {JSON Object}
	 */
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
	/***
	 * Beta Drawing ;) Inspired by Eve
	 * 
	 * how to use it, html5 support is needed (So...IE sucks!):
	 * var draw = $_.Drawing({
	 *		element: document.getElementById("canvas"),
	 *		lineWidth: document.getElementById("size").value,
	 *		lineColor: document.getElementById("color").value
	 *	});
	 *	Just an example:
	 *	<canvas id="canvas" width="400" height="400" style="border:1px solid #c3c3c3;"></canvas>
     *
	 * @param params {Object}
	 * @class Drawing
	 */
	Drawing: (function(params){
		var ctx = params.element.getContext("2d");
		var lineColor = params.lineColor;
		var lineWidth = params.lineWidth;
		function init(){
			var added = null;
			var mousemove = function(event){
				added = "yes";
		    	ctx.lineTo(event.clientX,(event.clientY-50));
		    	ctx.stroke();
		    };
			var listener = function(e){
				ctx.beginPath();
			    ctx.lineWidth=lineWidth;
			    ctx.strokeStyle=lineColor;
			    if(added == null){
			    	$_.addEvent("mousemove",params.element,mousemove);
			    }
			    added = "yes";
			};
			$_.addEvent("mousedown",params.element,listener);
			$_.addEvent("mouseup",params.element,function(event){
				added = null;
				ctx.stroke();
				ctx.closePath();
		    	$_.removeEvent("mousemove",params.element,mousemove);
	    	});
		}
		init();
		
		var draw = {
				/**
				 * @method clear
				 * @param funcion {Function}
				 */
			clear: function (funcion){
				ctx.clearRect(0, 0, params.element.width, params.element.height);
				if(funcion != null && typeof funcion == 'function'){
					funcion.call();
				}
			},
			/**
			 * 
			 * @method save
			 * @param format image format (PNG,JPG,GIF)
			 * @param funcion {Function}
			 */
			save: function(format,funcion){
				if(format.toLower()!='png' && format.toLower() != "jpg" && format.toLower() != 'gif')
					return;
				var image = params.element.toDataURL("image/"+format+";base64");
				if(funcion != null && typeof funcion=='function'){
					funcion.call(image,null);
				}
				//window.open(image);
			},
			rotate: function(angle,funcion){
				ctx.rotate(new Number(angle).toRad());
				if(funcion != null && typeof funcion == 'function')
					funcion.call(null);
			},
			loadPicture: function(src,properties,funcion){
				var obj = ctx.drawImage(src,properties.posx,properties.posy,properties.swidth,properties.shieght);
				if(funcion != null && typeof funcion == 'function')
					funcion.call(obj,null);
			}
		};
		return draw;
	}),
	/**
	 * Loop for each element in the array and execute the function expressed the
	 * first argument is the element in the array and the second argument is the
	 * position of the element on the array.
	 * 
	 * @param array
	 * @param funcion
	 */
	forEach : function(array, funcion) {
		if (array.length != null && typeof funcion == 'function') {
			for ( var x = 0; x < array.length; x++) {
				funcion.call(null, array[x], x);
			}
		}
	},
	/**
	 * Toggle the element's visibility from hidden to visible or from visible to
	 * hidden
	 * 
	 * @param element
	 */
	toggle : function(element) {
		if (element.style.display != 'none') {
			element.style.display = 'none';
		} else {
			element.style.display = '';
		}
	},
	/**
	 * Toggle the element's access from readonly to normal or viceversa
	 * 
	 * @param element
	 */
	toogleRead : function(element) {
		if (element.readOnly == true) {
			element.readonly = false;
		} else {
			element.readonly = true;
		}
	},
	init : function() {
		// Extending native objects...
		/**
		 * Delete any space,tab or new line character on the left of the string
		 */
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
		/**
		 * Delete any space,tab or new line character on the right of the string
		 */
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
		/**
		 * Delete any space,tab or new line character on the left and the right
		 * of the string
		 */
		String.prototype.trim = function() {
			return this.ltrim().rtrim();
		};
		/**
		 * 
		 */
		String.prototype.regex = function(exp){
			var regex = null;
			if(exp != null){
			if(typeof(exp) == 'string')
				regex = new RegExp(exp);
			else{
				regex = exp;
				return regex.test(this);
			}
			}else{
				return null;
			}
		};
		/**
		 * Return true if the String is representing an email address
		 */
		String.prototype.isEmail = function() {
			var pattern = "^[\\w-_\.]*[\\w-_\.]\@[\\w]\.+[\\w]+[\\w]$";
			return this.regex(pattern);
		};
		/**
		 * Replace html characters from the string
		 */
		String.prototype.escapeHTML = function() {
			return this.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(
					/>/g, '&gt;');
		};
		/**
		 * Turn the string into an array of characters
		 */
		String.prototype.toArray = function() {
			return this.split('');
		};
		/**
		 * Clean html content from the string
		 * 
		 * @returns
		 */
		String.prototype.stripTags = function() {
			return this.replace(/<([^>]+)>/g, '');
		};
		/**
		 * Return true if the text exists on the string
		 * 
		 * @param text
		 * @returns {Boolean}
		 */
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
		/**
		 * Round the number according to the round from the Math Object
		 */
		Number.prototype.round = function() {
			return Math.round(this);
		};
		/**
		 * Return the number expressed on Rad
		 * 
		 * @returns {Number}
		 */
		Number.prototype.toRad = function() {
			return this * Math.PI / 180;
		};
		/**
		 * Return the number expressed on Deg
		 * 
		 * @returns {Number}
		 */
		Number.prototype.toDeg = function() {
			return this * 180 / Math.PI;
		};
		/**
		 * Return the number expressed on Brng
		 * 
		 * @returns {Number}
		 */
		Number.prototype.toBrng = function() {
			return (this.toDeg() + 360) % 360;
		};
		/**
		 * Format the number to express the number with the decimals expressed
		 * 
		 * @returns {Number}
		 */
		Number.prototype.roundTo = function(decimals) {
			var format = '1';
			for ( var x = 0; x < decimals; x++) {
				format += '0';
			}
			return Math.round(this * format) / format;
		};
		/**
		 * Return the factorial of the number
		 * 
		 * @returns {Number}
		 */
		Number.prototype.factorial = function() {
			if (this <= 1) {
				return 1;
			} else {
				var fact = 1;
				for ( var n = this; n > 1; n--) {
					fact *= n;
				}
				return fact;
			}

		};
		// ///// Date Object Extend /////////
		/**
		 * Add days to the Date expressed in the argument
		 */
		Date.prototype.addDay = function(days) {
			if (!isNaN(days)) {
				this.setDate(this.getDate() + days);
			}
		};
		/**
		 * Add months to the Date expressed in the argument
		 */
		Date.prototype.addMonth = function(months) {
			if (!isNaN(months)) {
				this.setMonth(this.getMonth() + months);
			}
		};
		/**
		 * Add years to the Date expressed in the argument
		 */
		Date.prototype.addYear = function(years) {
			if (!isNaN(months)) {
				this.setYear(this.getYear() + years);
			}
		};
		/**
		 * Returns the current browser's time
		 */
		Date.prototype.now = function() {
			return new Date().getTime();
		};
		// ////// Array Object Extend ////////////////
		/**
		 * Alias function to retrive the length of the array
		 */
		Array.prototype.size = function() {
			return this.length;
		};
		/**
		 * Set the same value to every property on the elements of the array
		 * 
		 * @param property
		 * @param value
		 */
		Array.prototype.set = function(property, value) {
			for ( var i = 0; i < this.length; i++) {
				this[i][property] = value;
			}
		};
		/**
		 * Determines if an object is present on the array
		 * 
		 * @param object
		 * @returns {Boolean}
		 */
		Array.prototype.inArray = function(object) {
			var i;
			for (i = 0; i < this.length; i++) {
				if (this[i] === value) {
					return true;
				}
			}
			return false;
		};
		/**
		 * Returns the position of the argument on the array or -1 if the
		 * argument is not present
		 * 
		 * @param object
		 * @returns {Boolean}
		 */
		Array.prototype.indexOf = function(s) {
			for ( var x = 0; x < this.length; x++)
				if (this[x] == s)
					return x;
			return -1;
		};
		/**
		 * Join an array to the current array, it joins the new array at the end
		 * of the current array
		 * 
		 * @param added
		 * @returns {Number}
		 */
		Array.prototype.merge = function(added) {
			var i = this.length, j = 0;

			if (typeof added.length === "number") {
				for ( var l = added.length; j < l; j++) {
					this[i++] = added[j];
				}

			} else {
				while (added[j] !== undefined) {
					this[i++] = added[j++];
				}
			}
			return this.length;
		};
		/**
		 * Create a new array from the element of current array that executes
		 * the callback function successfully
		 * 
		 * @param callback
		 * @returns {Array}
		 */
		Array.prototype.grep = function(callback) {
			var ret = new Array();
			for ( var i = 0; i < this.length; i++) {
				if (callback.call(this, this[i], i)) {
					ret.push(this[i]);
				}
			}
			return ret;
		};

		this.globals["doAjaxStart"] = this.registerEvent('doAjaxStart');
		this.globals["doAjaxFinish"] = this.registerEvent('doAjaxFinish');
	},
	/**
	 * Add a class style to the element
	 * 
	 * @param element
	 * @param clasz
	 */
	addClass : function(element, clasz) {
		element.className += " " + clasz;
	},
	/**
	 * Return true if the expressed class is in the element
	 * 
	 * @param element
	 * @param clasz
	 * @returns {Boolean}
	 */
	hasClass : function(element, clasz) {
		if (new String(element.className).regex('(\\s|^)' + clasz + '(\\s|$)') != null) {
			return true;
		}
		return false;
	},
	/**
	 * Tries to remove the class from the element
	 * 
	 * @param element
	 * @param clasz
	 */
	removeClass : function(element, clasz) {
		if ($_.hasClass(element, clasz)) {
			var reg = new RegExp('(\\s|^)' + clasz + '(\\s|$)');
			element.className = element.className.replace(reg, ' ');
		}
	},
	/**
	 * Replace the class expressed in clasz with the newclasz on the element
	 * 
	 * @param element
	 * @param clasz
	 */
	replaceClass : function(element, clasz, newclasz) {
		this.removeClass(element, clasz);
		this.addClass(element, newclasz);
	},
	/**
	 * 
	 * @param element
	 * @returns {Array}
	 */
	children : function(element) {
		var array = new Array();
		if (element.hasChildNodes()) {
			var nodes = element.childNodes;
			for ( var i = 0; i < nodes.length; i++) {
				array.push($_.findElement(nodes.item(i)));
			}
		}
		return array;
	},
	/**
	 * 
	 * @param form
	 * @returns {Array}
	 */
	validForm : function(form) {
		var bad = new Array();
		function isEmpty(element) {
			if (element.value == '' || element.value.length < 1)
				return true;
			else
				return false;
		};
		for ( var i = 0; i < form.elements.length; i++) {
			var error = 0;
			var item = $_.findElement(form.elements[i]);
			if (item.getAttribute("notEmpty") != null
					&& item.getAttribute("notEmpty") == '1') {
				if (isEmpty(item)) {
					error = 1;
				}
			}
			if(item.getAttribute("match") != null && item.getAttribute("match") != ''){
				if(item.getAttribute("match") == 'email'){
					if(!(new String(item.value).isEmail())){
						error = 1;
					}
				}else{
					if(!(new String(item.value).regex(item.getAttribute("match")))){
						error = 1;
					}
				}
			}
			if(item.getAttribute("notEqual") != null && item.getAttribute("notEqual") != ''){
				if(item.value == item.getAttribute("notEqual")){
					error = 1;
				}
			}
			if (error > 0) {
				bad.push(item);
			}
			error = 0;
		}
		return bad;
	},
	/**
	 * 
	 * @param tag
	 * @param filtro
	 * @returns {Array}
	 */
	$$_ : function(tag, filtro) {
		var arreglo = new Array();
		var nodes = (document.all) ? document.all : document
				.getElementsByTagName(tag);
		for ( var x = 0; x < nodes.length; x++) {
			if (filtro == null) {
				arreglo.push(nodes[x]);
			} else {
				var t;
				for ( var key in filtro) {
					if (nodes[x][key] != null && nodes[x][key] == filtro[key]) {
						t=true;
					}else
						t=false;
				}
				if(t)
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
	/**
	 * Add a cell on the row and with the properties expressed
	 * 
	 * @param row
	 * @param properties
	 * @param funcion
	 * @returns
	 */
	addCell : function(row, properties, funcion) {
		var td = row.insertCell(-1);
		for ( var key in properties) {
			td[key] = properties[key];
		}
		if (funcion != null && typeof funcion == 'function')
			funcion.call(null, td);
		return td;
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
	/**
	 * Add a row to the table setting its celds with the argument fields the
	 * param fields is expressed like an object with the td properties like:
	 * fields: {innerHTML:'content',width:'20%'} If funcion is setted it calls
	 * after adding the new row
	 * 
	 * @param table
	 * @param fields
	 * @param funcion
	 * @returns
	 */
	addRow : function(table, fields, funcion) {
		var row = table.insertRow(table.rows.length);
		$_.forEach(fields, function(field, index) {
			$_.addCell(row, field);
		});
		if (funcion != null && typeof funcion == 'function')
			funcion.call(null, row);
		return row;
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
	/**
	 * 
	 * @param name
	 * @param element
	 * @param funcion
	 */
	addEvent : function(name, element, funcion) {
		if (funcion != null && typeof funcion == 'function') {
			if (element.addEventListener) {
				element.addEventListener(name, funcion, false);
				return;
			} else if (element.attachEvent) {
				element.attachEvent('on' + name, funcion);
				return;
			} else {
				element['on' + name] = funcion;
				return;
			}
		}
	},
	removeEvent: function(name,element,funcion){
		if (element.removeEventListener) {
			element.removeEventListener(name,funcion);
			return;
		} else if (element.dettachEvent) {
			element.dettachEvent('on' + name, funcion);
			return;
		} else {
			element['on' + name] = null;
			return;
		}
	},
	/**
	 * Perform a function when the user made a rightclick over the element
	 * especified if no element was especified the event will be added to the
	 * whole page.
	 * 
	 * @param element
	 * @param funcion
	 */
	rightClick : function(element, funcion) {
		if (funcion == null && typeof funcion == 'function') {
			if (element == null)
				element = document;
			$_.addEvent('mousedown', element, function(event) {
				if ((event.button == 2) || (event.button == 3)) {
					funcion.call(this);
				}
			});
		}
	},
	/**
	 * 
	 * @param element
	 * @param funcion
	 */
	click : function(element, funcion) {
		if (funcion == null && typeof funcion == 'function') {
			if (element == null)
				element = document;
			$_.addEvent('click', element, funcion);
		}
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
		if (funcion != null && typeof funcion == 'function') {
			if (element == null)
				element = document;
			$_.addKeyEvent(element, $_.keys.enter, funcion);
		}
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
	/**
	 * Execute a function when the browser is load the entire page
	 * 
	 * @param funcion
	 */
	onLoad : function(funcion) {
		window.onload = funcion;
	},
	/**
	 * Search an element identified by the ID and return a jdoNovoSoft object
	 * 
	 * @param element
	 * @returns {jdoNovosoft}
	 */
	findElement : function(element) {
		var tmp = null;
		if (typeof element == 'string') {
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
		} else {
			tmp = element;
		}
		var object = {};
		function extend(obj) {
			var newobj = {};
			newobj.prototype = obj;
			newobj.constructor = newobj;
			for ( var key in obj) {
					newobj[key] = obj[key];
			}
			return newobj;
		}
		;
		// Fixing IE6/7 functions
		function _getAttribute(element, attr) {
			var ret = null;
			if (element.getAttribute) {
				ret = element.getAttribute(attr);
				if (ret == null || ret == undefined) {
					ret = element[attr];
				}
			} else {
				ret = element.getAttributeNode(attr);
			}
			return ret;
		}
		;
		function _setAttribute(element, key, value) {
			if (element.setAttribute) {
				element.setAttribute(key, value);
			} else {
				var ret = elem.getAttributeNode(key);
				if (!ret) {
					ret = document.createAttribute(key);
					elem.setAttributeNode(ret);
				}
				ret.nodeValue = value + "";
			}
		}
		if (tmp != null) {
			object = extend(tmp);
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
			object.prototype.position = function() {
				$_.findPosition(this);
			};
			object.prototype.glow = function(params) {
				$_.Effects.glow(object, params);
			};
			/*if (tmp.nodeName.toLowerCase() != "form") {
				object.prototype.getAttribute = function(attr) {
					return _getAttribute(tmp, attr);
				};
				object.prototype.setAttribute = function(key, value) {
					_setAttribute(tmp, key, value);
				};
			}*/
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
				object.prototype.rows = function(){
					return object.rows;
				};
				object.prototype.rowSize = function(){
					return object.rows.length;
				};
			}
		}
		return object.prototype;
	},
	/**
	 * Ajax Function
	 */
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