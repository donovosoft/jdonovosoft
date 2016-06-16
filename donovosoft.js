
/// Core
var donovosoft = function() {
};

donovosoft.fn = donovosoft.prototype = {
	/**
	 * Readonly version , just informative
	 * @return int
	 */
	version : "1.5.4",
	// reserved space for global vars
	globals : {},
	/**
	 * Browser object extending more functions and info of your browser
	 * 
	 * @class browser
	 */
	browser : ({
		
		title : navigator.appName,
		cookies : navigator.cookieEnabled,
		/**
		 * True if the current browser supports HTML5 functions
		 * 
		 * @return {Boolean}
		 */
		supportHTML5 : function() {
			if (this.supportGPS())
				return true;
		},
		/**
		 * Return the size of your current window
		 * 
		 * @return {String}
		 */
		size : function() {
			return "[" + window.screen.width + "," + window.screen.height + "]";
		},
		/**
		* Check if your browser has location support
		* @return {Boolean}
		**/
		supportGPS : function() {
			if (window.navigator != null) {
				return true;
			} else
				return false;
		},
		/**
		 * Returns true if you browser supports canvas
		 * 
		 * @return {Boolean}
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
		 * 
		 * @return {Boolean}
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
		 * 
		 * @return {Boolean}
		 */
		online : function() {
			return window.navigator.onLine;
		},
		/**
		 * Return the current location of the page
		 * 
		 * @return {String}
		 */
		url : function() {
			return location.href;
		},
		/**
		* Gets the current position of the page inside the window
		* @return {Object}
		**/
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
		/**
		* Scroll page to a position
		* @param {Object} Object with left,top values
		* 
		**/
		scroll : function(position) {
			window.scrollBy(position.left, position.top);
		},
		/**
		 * Set the especified url as home page on any browser
		 * 
		 * @param {String} Url
		 * 
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
    /**
	* Find a position of the element
	* @param {Object} HttmlElement
	* 
    **/
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
	 * Return the object crono without activity use: var cron =
	 * $_.crono({delay:10,work:function(){alert('Some')}}); cron.start() // To
	 * start the service cron.isRunning() // returns true if the cron is
	 * actually running cron.stop() // stop the service
	 * 
	 * @param {Object}
	 * @return {Object}
	 */
	crono : function(params) {
		var t = null;
		var delay = params.delay;
		var work = params.work;
		var limit = params.limit;
		var times = 0;
		function timed() {
			times++;
			if (limit > 0 && times == limit) {
				clearTimeout(t);
			} else {
				t = setTimeout(function() {
					work.call(null);
					timed();
				}, delay * 1000);
			}
		}
		var _crono = {
			/**
			 * Returns true if the Crono instance is active or is actually
			 * running
			 *
			 * @return {Boolean}
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
			 * 
			 * 
			 **/
			start : function() {
				timed();
			},
			/**
			* Stop the activity of the current cron obect
			**/
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
	 * @param {String}
	 * @param {String}
	 * @param {Array}
	 */
	set : function(property, value, elements) {
		for ( var x = 0; x < elements.length; x++) {
			elements[x][property] = value;
		}
	},
	/**
	 * Function to make an object draggable TODO: 1) Make object only draggable
	 * inside the parent object 2) Make the object droppable only inside another
	 * object
	 * 
	 * @param {Object}
	 * 
	 */
	draggable : (function(params) {
		var _startX = 0;
		var _startY = 0;
		var _offsetX = 0;
		var _offsetY = 0;
		var _dragElement = null;
		var _oldZIndex = 0;
		init();
		function init() {
			params.element.style.position = 'relative';
			params.element.style.zIndex = 100000000;
			params.element.onmousedown = mousedown;
			params.element.onmouseup = mouseup;
			params.element.onmouseover = mouseover;
		}
		function extractNumber(value) {
			var n = parseInt(value);
			return n == null || isNaN(n) ? 0 : n;
		}
		function mouseover(e) {
			params.element.style.cursor = 'move';
		}
		function mousedown(e) {
			if (e == null)
				e = window.event;
			var target = e.target != null ? e.target : e.srcElement;
			if ((e.button == 1 && window.event != null || e.button == 0)) {
				_startX = e.clientX;
				_startY = e.clientY;
				_offsetX = extractNumber(target.style.left);
				_offsetY = extractNumber(target.style.top);
				_oldZIndex = target.style.zIndex;
				target.style.zIndex = 100000000;
				_dragElement = target;
				params.element.onmousemove = mousemove;
				document.body.focus();
				document.onselectstart = function() {
					return false;
				};
				target.ondragstart = function() {
					return false;
				};
				return false;
			}
		}

		function mousemove(e) {
			if (e == null)
				var e = window.event;
			_dragElement.style.left = (_offsetX + e.clientX - _startX) + 'px';
			_dragElement.style.top = (_offsetY + e.clientY - _startY) + 'px';
			if (params.onmove != null && typeof (params.onmove) == 'function') {
				params.onmove.call(null, e);
			}
		}

		function mouseup(e) {
			if (_dragElement != null) {
				_dragElement.style.zIndex = _oldZIndex;
				params.element.onmousemove = null;
				params.element.onselectstart = null;
				_dragElement.ondragstart = null;
				_dragElement = null;
				if (params.ondrop != null
						&& typeof (params.ondrop) == 'function') {
					params.ondrop.call(null, e);
				}
			}
		}
	}),

	/**
	 * The Effects object
	 * 
	 *
	 * 
	 */
	effects : ({
		/**
		 * Glow the element according to the params the properties accepted are:
		 * 
		 * property: The property of the object to glow speed: The time of the
		 * event in milisecs firstColor: set the init color of the element
		 * before glowing it lastColor: the color of the element after the glow
		 * success: function to execute when the event finish
		 * 
		 * Example:
		 * 
		 * var element = document.getElementById('element');
		 * $_.Effects.glow(element,{speed:1000:success:function(){alert
		 * ('OK');}});
		 * 
		 * @param {Element}
		 * @param {Object}
		 */
		glow : function(element, params) {
			if (element != null) {
				element.style[params.property] = params.lastColor;
				i=0
				do{
					params.success = function(){
						element.style[params.property] = params.firstColor;	
					};
					$_.effects.fadeOut(element,params);
					params.success = function(){
						element.style[params.property] = params.lastColor;	
					};
					$_.effects.fadeOut(element,params);
					i++;
				}while(i<params.times);
			}
		},
		/***********************************************************************
		 * Make a fade to the element
		 * 
		 * @param {HtmlElement}
		 * @param {Object}
		 */
		fadeOut : function(element, params) {
			// Private function to animate
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
		 * Easing effect to the element
		 * @param {Number} minValue
		 * @param {Number} maxValue
		 * @param {Number} totalSteps
		 * @param {Number} actualStep
		 * @param {Number} powrr
		 * @return {Number}
		 */
		easing : function(minValue, maxValue, totalSteps, actualStep, powrr) {
			var delta = maxValue - minValue;
			var stepp = minValue
					+ (Math.pow(((1 / totalSteps) * actualStep), powrr) * delta);
			return Math.ceil(stepp);
		},
		/**
		 * Animating resize of an element
		 * @param {Element} element
		 * @param {Object} params
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
				element.setAttribute(attrModify, $_.effects.easing(startWidth,
						endWidth, steps, actStep, powr));
				element.style[attrModify] = element.getAttribute(attrModify)
						+ "px";
				actStep++;
				if (actStep > steps)
					window.clearInterval(changeInterval);
			}, intervals);
		},
		/**
		 * @method expand
		 * @param element
		 *            {Element}
		 * @param params
		 *            {Object}
		 */
		expand : function(element, params) {
			if (element != null) {
				$_.effects.animateResize(element, {
					start : params.start,
					end : params.start * params.expand,
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
		 * @param element
		 *            {Element}
		 * @param params
		 *            {Object}
		 * 
		 */
		reduce : function(element, params) {
			if (element != null) {
				$_.effects.animateResize(element, {
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
		 * Animate an object until it hides with this properties: {attribute:
		 * width/height,speed:seconds}
		 * 
		 * @param {Element} element
		 * @param {Object} params
		 */
		dissapear : function(element, params) {
			if (element != null) {
				$_.effects.animateResize(element, {
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
	 * @param {String} strobj
	 * @return {Object}
	 */
	toJSON : function(strobj) {
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

	/**
	* 
	**/
	ul : (function(element) {
		var list = element;
		var _ul = {
			clear : function() {
				var len = list.getElementsByTagName('li').length;
				while (len--) {
					list.removeChild(list.getElementsByTagName('li')[len]);
				}
			},
			add : function(properties) {
				$_.append(list, 'li', properties);
			}
		};
		return _ul;
	}),
	/***************************************************************************
	 * Alpha Drawing ;) Inspired by Eve
	 * 
	 * how to use it, html5 support is needed (So...IE sucks!): var draw =
	 * $_.drawing({ element: document.getElementById("canvas"), lineWidth: 10,
	 * lineColor: #FFFFFFF });
	 * 
	 * @param {Object}
	 */
	drawing : (function(params) {
		var ctx = params.element.getContext("2d");
		var lineColor = params.lineColor;
		var lineWidth = params.lineWidth;
		var angle = 0;
		var loadedImage = null;

		function position(e) {
			var x,y;
			var obj = params.element;
			if (e.pageX || e.pageY) {
				x = e.pageX;
				y = e.pageY;
			} else {
				x = e.clientX + document.body.scrollLeft
						+ document.documentElement.scrollLeft;
				y = e.clientY + document.body.scrollTop
						+ document.documentElement.scrollTop;
			}
			// Convert to coordinates relative to the canvas
			while(obj.offsetParent){ 
				if(obj==document.getElementsByTagName('body')[0]){break;} 
				else{ 
				x-=obj.offsetParent.offsetLeft; 
				y-=obj.offsetParent.offsetTop; 
				obj=obj.offsetParent; 
				} 
			} 
			return [ x, y ];
		}
		var mousemove = null;
		var listener = null;
		var mouseup = null;
		function init() {
			var added = null;
			mousemove = function(event) {
				event.preventDefault();
				added = "yes";
				var pos = position(event);
				ctx.lineTo(pos[0], pos[1]);
				ctx.stroke();
			};
			listener = function(e) {
				e.preventDefault();
				ctx.beginPath();
				ctx.lineWidth = lineWidth;
				ctx.strokeStyle = lineColor;
				if (added == null) {
					$_.addEvent("mousemove", params.element, mousemove);
				}
				added = "yes";
			};
			mouseup = function(event) {
				event.preventDefault();
				added = null;
				ctx.stroke();
				ctx.closePath();
				$_.removeEvent("mousemove", params.element, mousemove);
			};
			$_.addEvent("mousedown", params.element, listener);
			$_.addEvent("mouseup", params.element, mouseup);
		}
		init();

		var _draw = {
			/**
			 * @method clear
			 * @param funcion
			 *            {Function}
			 */
			clear : function(funcion) {
				ctx
						.clearRect(0, 0, params.element.width,
								params.element.height);
				if (loadedImage != null) {
					ctx.drawImage(loadedImage, 0, 0, loadedImage.width,
							loadedImage.height);
				}
				if (funcion != null && typeof funcion == 'function') {
					funcion.call();
				}
			},
			stop : function(funcion) {
				$_.removeEvent("mousemove", params.element, mousemove);
				$_.removeEvent("mouseup", params.element, mouseup);
				$_.removeEvent("mousedown", params.element, listener);
				ctx = null;
				if (funcion != null && typeof funcion == 'function') {
					funcion.call();
				}
			},
			continueDraw : function(funcion) {
				ctx = params.element.getContext("2d");
				init();
			},
			/**
			 * 
			 * @method save
			 * @param format
			 *            image format (PNG,JPG,GIF)
			 * @param funcion
			 *            {Function}
			 */
			save : function(format, funcion) {
				if (format.toLowerCase() != 'png'
						&& format.toLowerCase() != "jpg"
						&& format.toLowerCase() != 'gif')
					return;
				var image = params.element.toDataURL("image/" + format
						+ ";base64");
				if (funcion != null && typeof funcion == 'function') {
					funcion.call(null, image);
				}
			},
			getAngle : function() {
				return angle;
			},
			/**
			 * @method rotate
			 * @param angle
			 *            {Number}
			 * @param funcion
			 *            {Function}
			 */
			rotate : function(angle, funcion) {
				// angle = new Number(angle);

				ctx.rotate(new Number(angle).toRad());
				if (funcion != null && typeof funcion == 'function')
					funcion.call(null);
			},
			/**
			 * 
			 * @param src
			 *            {String}
			 * @param properties
			 *            {Object}
			 * @param funcion
			 *            {Function}
			 */
			loadPicture : function(src, properties, funcion) {
				var img = new Image();
				img.onload = function() {
					ctx.drawImage(img, properties.posx, properties.posy,
							img.width, img.height);
					if (funcion != null && typeof funcion == 'function') {
						funcion.call(null, img);
					}
				};
				loadedImage = img;
				img.src = src;
			},
			getImages : function() {
				return loadedImages;
			},
			setProperties : function(param) {
				lineWidth = param.lineWidth;
				lineColor = param.lineColor;
			}

		};
		return _draw;
	}),
	/**
	 * Loop for each element in the array and execute the function expressed the
	 * first argument is the element in the array and the second argument is the
	 * position of the element on the array.
	 * 
	 * @method
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
	 * Repeat 'funcion' n times, receive the current index and the number of
	 * times to be executed on the function args
	 * 
	 * @param times
	 *            {Number}
	 * @param funcion
	 *            {Function}
	 */
	repeat : function(n, funcion) {
		if (n > 0) {
			for ( var i = 0; i < n; i++) {
				funcion.call(null, i, n);
			}
		}
	},
	/**
	 * Toggle the element's visibility from hidden to visible or from visible to
	 * hidden
	 * 
	 * @method
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
	 * @method
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
		 * 
		 * @method ltrim
		 * @extends {String}
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
		 * 
		 * @method rtrim
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
		 * Return the Capitalized version of the String, the first letter to
		 * Upper Case and the rest of the string to lowercase,always Example:
		 * 
		 * HELLO = Hello wORLD = World
		 * 
		 * @returns {String}
		 */
		String.prototype.capitalize = function() {
			var s = this.toLowerCase();
			var c = s.charAt(0).toUpperCase();
			return c + s.substring(1, s.length);
		};

		/**
		 * Delete any space,tab or new line character on the left and the right
		 * of the string
		 * 
		 * @method trim
		 */
		String.prototype.trim = function() {
			return this.ltrim().rtrim();
		};
		/**
		 * 
		 * @method regex
		 */
		String.prototype.regex = function(exp) {
			var regex = null;
			if (exp != null) {
				if (typeof (exp) == 'string')
					regex = new RegExp(exp);
				else {
					regex = exp;
					return regex.test(this);
				}
			} else {
				return null;
			}
		};
		/**
		 * Return true if the String is representing an email address
		 * 
		 * @method isEmail
		 */
		String.prototype.isEmail = function() {
			var pattern = "^[\\w-_\.]*[\\w-_\.]\@[\\w]\.+[\\w]+[\\w]$";
			return this.regex(pattern);
		};
		/**
		 * Return the String with Replaced html characters from it
		 * 
		 * @method escapeHTML
		 */
		String.prototype.escapeHTML = function() {
			return this.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(
					/>/g, '&gt;');
		};
		/**
		 * Replace html characters from the string
		 * 
		 * @method escapeHTML
		 */
		String.prototype.escapeHTML$ = function() {
			this.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g,
					'&gt;');
		};

		/**
		 * Turn the string into an array of characters
		 * 
		 * @method toArray
		 * @returns {Array}
		 */
		String.prototype.toArray = function() {
			return this.split('');
		};
		/**
		 * Clean html content from the string and return it
		 * 
		 * @method stripTags
		 * @returns {String}
		 */
		String.prototype.stripTags = function() {
			return this.replace(/<([^>]+)>/g, '');
		};
		/**
		 * Clean html content from the string
		 * 
		 * @method stripTags
		 * @returns {String}
		 */
		String.prototype.stripTags$ = function() {
			this.replace(/<([^>]+)>/g, '');
		};
		/**
		 * Return true if the text exists on the string
		 * 
		 * @method contains
		 * @param text
		 *            {String}
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
		/**
		 * @method encode
		 * @returns {String}
		 */
		String.prototype.encode = function() {
			var s = this;
			 for(var c, i = -1, l = (s = s.split("")).length, o = String.fromCharCode; ++i < l;
	            s[i] = (c = s[i].charCodeAt(0)) >= 127 ? o(0xc0 | (c >>> 6)) + o(0x80 | (c & 0x3f)) : s[i]
	        );
	        return s.join("");
		};
		/**
		 * @method decode
		 * @returns {String}
		 */
		String.prototype.decode = function() {
			var s = this;
			  for(var a, b, i = -1, l = (s = s.split("")).length, o = String.fromCharCode, c = "charCodeAt"; ++i < l;
	            ((a = s[i][c](0)) & 0x80) &&
	            (s[i] = (a & 0xfc) == 0xc0 && ((b = s[i + 1][c](0)) & 0xc0) == 0x80 ?
	            o(((a & 0x03) << 6) + (b & 0x3f)) : o(128), s[++i] = "")
	        );
	        return s.join("");

		};
		/**
		 * 
		 * @method replaceChar
		 * @param position
		 *            {String}
		 * @param newChar
		 *            {String}
		 * @returns {String}
		 */
		String.prototype.replaceChar = function(position, newChar) {
			var cadena = this.substring(0, position);
			var end = this.substring(position + 1, -1);
			return cadena + newChar + end;
		};
		/**
		 * @method reverse
		 * @param
		 * @returns {String}
		 */
		String.prototype.reverse = function() {
			var cadena = "";
			for ( var i = this.length; i > 0; i--) {
				cadena += this.charAt(i);
			}
			return cadena;
		};
		String.prototype.lines = function() {
			return this.split('\\r');
		};
		String.prototype.replaceAll = function(token, newToken, ignoreCase) {
			var str, i = -1, _token;
			if ((str = this.toString()) && typeof token === "string") {
				_token = ignoreCase === true ? token.toLowerCase() : undefined;
				while ((i = (_token !== undefined ? str.toLowerCase().indexOf(
						_token, i >= 0 ? i + newToken.length : 0) : str
						.indexOf(token, i >= 0 ? i + newToken.length : 0))) !== -1) {
					str = str.substring(0, i).concat(newToken).concat(
							str.substring(i + token.length));
				}
			}
			return str;
		};
		// //////Number extend//////
		/**
		 * Round the number according to the round from the Math Object
		 * 
		 * @method round
		 * @returns {Number}
		 */
		Number.prototype.round = function() {
			return Math.round(this);
		};
		/**
		 * Return the number expressed on Rad
		 * 
		 * @method toRad
		 * @returns {Number}
		 */
		Number.prototype.toRad = function() {
			return this * Math.PI / 180;
		};
		/**
		 * Return the number expressed on Deg
		 * 
		 * @method toDeg
		 * @returns {Number}
		 */
		Number.prototype.toDeg = function() {
			return this * 180 / Math.PI;
		};
		/**
		 * Return the number expressed on Brng
		 * 
		 * @method toBrng
		 * @returns {Number}
		 */
		Number.prototype.toBrng = function() {
			return (this.toDeg() + 360) % 360;
		};
		/**
		 * Format the number to express the number with the decimals expressed
		 * 
		 * @method roundTo
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
		 * @method factorial
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
		Number.prototype.abs = function() {
			if (this < 0) {
				return this * -1;
			}
			return this;
		};
		
		/**
		 * Number.prototype.format(n, x, s, c)
		 * 
		 * @param integer n: length of decimal
		 * @param integer x: length of whole part
		 * @param mixed   s: sections delimiter
		 * @param mixed   c: decimal delimiter
		 */
		Number.prototype.format = function(n, x, s, c) {
		    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
		        num = this.toFixed(Math.max(0, ~~n));
		    
		    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
		};


		// ///// Date Object Extend /////////
		/**
		 * Add days to the Date expressed in the argument
		 * 
		 * @method addDay
		 * @param days
		 *            {Number}
		 */
		Date.prototype.addDay = function(days) {
			if (!isNaN(days)) {
				this.setDate(this.getDate() + days);
			}
		};
		/**
		 * Add months to the Date expressed in the argument
		 * @param {Number} months
		 */
		Date.prototype.addMonth = function(months) {
			if (!isNaN(months)) {
				this.setMonth(this.getMonth() + months);
			}
		};
		/**
		 * Add years to the Date expressed in the argument
		 * @param {Number} years
		 */
		Date.prototype.addYear = function(years) {
			if (!isNaN(months)) {
				this.setYear(this.getYear() + years);
			}
		};
		/**
		 * Returns the current browser's time
		 * @return {Date}
		 */
		Date.prototype.now = function() {
			return new Date().getTime();
		};
		// ////// Array Object Extend ////////////////
		/**
		 * Alias function to retrive the length of the array
		 * @return {Number}
		 */
		Array.prototype.size = function() {
			return this.length;
		};
		/**
		* Convert an array into a String, separated by sep
		* @param {String} sep
		* @return {String}
		**/
		Array.prototype.parseString = function(sep){
			var ret="";
			for(var i=0;i<this.length;i++){
				ret += this[i]+sep;
			}
			return ret.substring(0,ret.length-sep.length);
		};
		/**
		 * Set the same value to every property on the elements of the array
		 * 
		 * @param {String} property
		 * @param {String} value
		 */
		Array.prototype.set = function(property, value) {
			for ( var i = 0; i < this.length; i++) {
				this[i][property] = value;
			}
		};
		/**
		 * Get all propoerties of a dict or array
		 * @param {Object}
		 * @return {Array}
		 */
		Array.prototype.get = function(property) {
			var _array = new Array();
			for ( var i = 0; i < this.length; i++) {
				_array.push(this[i][property]);
			}
			return _array;
		};
		/**
		 * Determines if an object is present on the array
		 * 
		 * @param {Object}
		 * @return {Boolean}
		 */
		Array.prototype.inArray = function(object) {
			var i;
			for (i = 0; i < this.length; i++) {
				if (this[i] === object) {
					return true;
				}
			}
			return false;
		};
		
		/**
		 * Returns an array of unique objects in this array
		 * @return {Array}
		 */
		Array.prototype.unique = function(){
			var _tmp = new Array();
			_tmp[0] = this[0];
			for(var i = 1;i<this.length;i++){
				if(!_tmp.inArray(this[i])){
					_tmp.push(this[i]);
				}
			}
			return _tmp;
		};
		/**
		 * Return an Object if exists in array according with the property if
		 * there is more than one object with this property and the same value
		 * it will return return the first one and its position in the array
		 * 
		 * @param {String} property
		 * @param {String} value
		 * @return {Object}
		 */
		Array.prototype.find = function(property, value) {
			var obj = null;
			var x = -1;
			for ( var i = 0; i < this.length; i++) {
				if (typeof (this[i]) == 'object') {
					if (this[i][property] == value) {
						obj = this[i];
						x = i;
						break;
					}
				}
			}
			return {
				pos : x,
				element : obj
			};
		};
		/**
		 * Returns the position of the argument on the array or -1 if the
		 * argument is not present
		 * 
		 * @param {Object}
		 * @return {Number}
		 */
		Array.prototype.indexOf = function(s) {
			for ( var x = 0; x < this.length; x++)
				if (this[x] == s)
					return x;
			return -1;
		};
		/**
		 * Remove item from array which is equal to s
		 * @param {Object}
		 * @return {Array}
		 */
		Array.prototype.remove = function(s) {
			var _arr = new Array();
			for ( var i = 0; i < this.length; i++) {
				if (this[i] != s) {
					_arr.push(this[i]);
				}
			}
			return _arr;
		};
		/**
		 * 
		 * @return {Array}
		 */
		Array.prototype.compact = function() {
			var _arr = new Array();
			for ( var i = 0; i < this.length; i++) {
				if (this[i] != null) {
					_arr.push(this[i]);
				}
			}
			return _arr;
		};
		/**
		 * Returns the number of non-null elements in array
		 * 
		 * @return {Number}
		 */
		Array.prototype.items = function() {
			return this.compact().length;
		};
		/**
		 * Returns the first element of the Array, alias for Array[0]
		 * 
		 * @return {Object}
		 */
		Array.prototype.first = function() {
			return this[0];
		};
		/**
		 * Returns the last element of the array, alias for Array[Array.length -
		 * 1]
		 * 
		 * @return {Object}
		 */
		Array.prototype.last = function() {
			return this[this.length - 1];
		};
		/**
		 * Returns a new array that is a one-dimensional flattening of this
		 * array (recursively). That is, for every element that is an array,
		 * extract its elements into the new array.
		 * 
		 * @return {Array}
		 */
		Array.prototype.flatten = function() {
			var _arr = new Array();
			for ( var i = 0; i < this.length; i++) {
				if (typeof (this[i]) == 'Array' && this[i] != null) {
					for ( var j = 0; j < this[i].length; j++) {
						_arr.push(this[i][j]);
					}
				} else {
					_arr.push(this[i]);
				}
			}
			return _arr;
		};
		/**
		 * Returns a new array consisting of elements at the given indices. May
		 * insert null for indices out of range.
		 * 
		 * @param {Array}
		 * @return {Array}
		 */
		Array.prototype.indexes = function(arr) {
			var _arr = new Array();
			if (typeof (arr) == 'Array' && arr != null) {
				for ( var i = 0; i < arr.length; i++) {
					if (typeof (arr[i]) == 'Number') {
						if (arr[i] != null) {
							_arr.push(this.at(arr[i]));
						} else {
							_arr.push(null);
						}
					} else {
						_arr.push(null);
					}
				}
			}
			return _arr;
		};
		/**
		 * Join an array to the current array, it joins the new array at the end
		 * of the current array
		 * 
		 * @param {Number} added
		 * @return {Number}
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
		 * @param {Function} callback
		 * @return {Array}
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
		Array.prototype.each = function(funcion) {
			for ( var i = 0; i < this.length; i++) {
				funcion.call(this, this[i], i);
			}
		};

		Array.prototype.at = function(pos) {
			return this[pos];
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
			if (new String(element.tagName).toLowerCase() != 'form') {
				var nodes = element.childNodes;
				for ( var i = 0; i < nodes.length; i++) {
					array.push($_.findElement(nodes.item(i)));
				}
			} else {
				for ( var i = 0; i < element.elements.length; i++) {
					array.push($_.findElement(element.elements[i]));
				}
			}
		}
		return array;
	},
	/**
	 * 
	 * @param {Element} form
	 * @returns {Array}
	 */
	validForm : function(form) {
		var bad = new Array();
		function isEmpty(element) {
			if (element.value == '' || element.value.length < 1)
				return true;
			else
				return false;
		}
		;
		for ( var i = 0; i < form.elements.length; i++) {
			var error = 0;
			var item = $_.findElement(form.elements[i]);
			if (item.getAttribute("notEmpty") != null
					&& item.getAttribute("notEmpty") == '1') {
				if (isEmpty(item)) {
					error = 1;
				}
			}
			if (item.getAttribute("match") != null
					&& item.getAttribute("match") != '') {
				if (item.getAttribute("match") == 'email') {
					if (!(new String(item.value).isEmail())) {
						error = 1;
					}
				} else {
					if (!(new String(item.value).regex(item
							.getAttribute("match")))) {
						error = 1;
					}
				}
			}
			if (item.getAttribute("notEqual") != null
					&& item.getAttribute("notEqual") != '') {
				if (item.value == item.getAttribute("notEqual")) {
					error = 1;
				}
			}
			if (item.getAttribute("equalElement") != null
					&& item.getAttribute("equalElement") != '') {
				if (item.value != $_.findElement(item
						.getAttribute("equalElement")).value) {
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
	 * @param {String} tag
	 * @param {String} filtro
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
						t = true;
					} else
						t = false;
				}
				if (t)
					arreglo.push(nodes[x]);
			}
		}
		return arreglo;
	},
	append : function(element, tag, properties) {
		var dd = document.createElement(tag);
		for ( var key in properties) {
			dd[key] = properties[key];
		}
		element.appendChild(dd);
	},
	checkAll : function(bool, filter) {
		var checks = null;
		if (filter == null)
			checks = this.$$_("input", {
				type : "checkbox"
			});
		else {
			checks = this.$$_("input", filter);
		}
		for ( var x = 0; x < checks.length; x++) {
			if (checks[x].checked != null) {
				checks[x].checked = bool;
			}
		}
	},
	cookie : function() {
		var _cookie = {
			gets : function() {
				if (typeof document.cookie != "undefined") {
					var cookies = new Array();
					if (new String(document.cookie).contains(';')) {
						var items = document.cookie.split(";");
						$_.forEach(items, function(item, index) {
							var cookie = item.split("=");
							var mycookie = {
								name : cookie[0],
								value : cookie[1]
							};
							cookies.push(mycookie);
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
			get : function(name) {
				var coo = null;
				$_.forEach(this.gets(), function(cookie, pos) {
					if (name == cookie.name.trim()) {
						coo = cookie;
					}
				});
				return coo;
			},
			set : function(name, value, exp) {
				var exdate = new Date();
				exdate.setDate(exdate.getDate() + exp);
				var c_value = value.trim();
				document.cookie = name + "=" + c_value;
			},
			unset : function(name) {
				this.set(name, '', -1);
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
		var td;
		if (properties['type'] != null && properties['type'] == 'th') {
			td = document.createElement('th');
		} else {
			td = row.insertCell(-1);
		}
		for ( var key in properties) {
			td[key] = properties[key];
		}
		if (properties['type'] != null && properties['type'] == 'th') {
			row.appendChild(td);
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
	getRow : function(table,rowIndex){
		return table.rows[rowIndex];
	},
	/*
	 * Add a row to the table setting its celds with the argument fields the
	 * param fields is expressed like an object with the td properties like:
	 * fields: {innerHTML:'content',width:'20%'} If funcion is setted it calls
	 * after adding the new row
	 * 
	 * @param {Element} table
	 * @param {Array} fields
	 * @param {Function} funcion
	 * @return {Object}
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
	clearCells : function(row,functi) {
		while(row.cells.length > 0){
			row.deleteCell(-1);
		}
		if (functi != null && typeof functi == 'function')
			functi.call(null, row);
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
	removeEvent : function(name, element, funcion) {
		if (element.removeEventListener) {
			element.removeEventListener(name, funcion);
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
	/**
	 * 
	 * @param element
	 * @param keycode
	 * @param funcion
	 */
	addKeyEvent : function(element, keycode, funcion) {
		if (element == null)
			element = document;
		$_.addEvent('keyup', element, function(event) {
			var nav4 = window.Event ? true : false;
			var key = nav4 ? event.which : event.keyCode;
			if (key == keycode) {
				funcion.call(this);
			}
		});
	},
	/**
	 * 
	 * @param element
	 * @param funcion
	 */
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
			var evt = document.createEventObject(window.event);
			document.fireEvent(event.toLowerCase(), evt);
		}
	},
	/***************************************************************************
	 * Beta linkPreview
	 * 
	 * Options : element = (Object) A Text field to add the listeners preview =
	 * (Object) Optional Element to place the link's preview url = (String) Url
	 * of the server's algorithm (Javascript can't handle this thats why it
	 * needs a server side script) data = (Object) optional extra data for the
	 * ajax request sendType = (String) Send type for the request (POST, GET,
	 * PUT) default GET callback = (Function) Optional function for a custom
	 * callback after the response of the server side script
	 * 
	 * 
	 */
	linkPreview : function(options) {
		var urlRegex = /(https?\:\/\/|\s)[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})(\/+[a-z0-9_.\:\;-]*)*(\?[\&\%\|\+a-z0-9_=,\.\:\;-]*)?([\&\%\|\+&a-z0-9_=,\:\;\.-]*)([\!\#\/\&\%\|\+a-z0-9_=,\:\;\.-]*)}*/i;
		var preview = false;
		if (options.sendType == null) {
			options.sendType = 'get';
		}
		var _preview = {
			init : function() {
				$_.addEvent('keyup', options.element, function(e) {
					if ((e.which == 13 || e.which == 32 || e.which == 17)
							&& new String(options.element.value).trim() != "")
						_preview.fetch();
				});
			},
			fetch : function() {
				var text = new String("" + options.element.value);
				if (text.regex(urlRegex)) {
					$.ajax({
						url : options.url + "?text=" + text,
						data : options.data,
						dataType : 'json',
						type : options.sendType,
						success : function(data) {
							preview = true;
							if (options.callback == null
									|| typeof (options.callback) != 'function')
								_preview.defaultPreview(data);
							else {
								options.callback.call(null, data);
							}
						}
					});
				}
			},
			defaultPreview : function(answer) {
				preview = true;
				options.preview.innerHTML = answer;
			}
		};
		_preview.init();
		return _preview;
	},
	geo : ({
		azimuth : 6371,
		distance : function(lat1, lon1, lat2, lon2) {
			var dLat = (lat2 - lat1).toRad();
			var dLon = (lon2 - lon1).toRad();
			lat1 = lat1.toRad();
			lat2 = lat2.toRad();
			var a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
					+ Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1)
					* Math.cos(lat2);
			return geo.azimuth
					* (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
		},
		spherical : function(lat1, lon1, lat2, lon2) {
			return Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1)
					* Math.cos(lat2) * Math.cos(lon2 - lon1))
					* geo.azimuth;
		},
		equirectangular : function(lat1, lat2, lat1, lat2) {
			var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
			var y = (lat2 - lat1);
			return Math.sqrt(x * x + y * y) * this.azimuth;
		}
	}),
	/**
	 * Execute a function when the browser is load the entire page
	 * 
	 * @param {Function} funct
	 */
	onLoad : function(funct) {
		window.onload = funct;
	},
	/**
	 * Search an element identified by the ID and return a jdoNovoSoft object
	 * 
	 * @param element
	 * @return {jdoNovosoft}
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
			try {
				newobj.prototype = obj;
				newobj.constructor = newobj;
				for ( var key in obj) {
					newobj[key] = obj[key];
				}
			} catch (e) {

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
				$_.effects.glow(object, params);
			};
			object.prototype.append = function(tag, properties) {
				$_.append(object, tag, properties);
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
				
				object.prototype.deleteLastRow = function(funcion) {
					$_.deleteRow(object, (object.rows.length - 1), funcion,
							this);
				};
				
				object.prototype.rowSize = function() {
					return object.rows.length;
				};
			}
		}
		return object.prototype;
	},
	/**
	 * Ajax Function Beta
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
				object.url += key + "=" + encodeURIComponent(object.data[key])
						+ "&";
			}
		} else {
			params = new String("");
			for ( var key in object.data) {
				params += key + "=" + encodeURIComponent(object.data[key])
						+ "&";
				contenido++;
			}
		}
		objectAjax.open(object.method, object.url);
		// definiendo un content type default
		if (object.method.toLowerCase() == 'post') {
			var charset = "";
			if (object.charset != null) {
				charset = "charset=" + object.charset;
			}
			objectAjax.setRequestHeader('Content-Type',
					"application/x-www-form-urlencoded;" + charset);
		}
		
		objectAjax.onreadystatechange = function() {
			$_.trigger("doAjaxStart", null);
			if (objectAjax.readyState == 4) {
				if (objectAjax.status == 200) {
					if (objectAjax.responseText) {
						$_.trigger("doAjaxFinish", null);
						var arg = objectAjax.responseText;
						if (object.dataType != null
								&& object.dataType == 'json') {
							arg = $_.toJSON(objectAjax.responseText);
						}
						object.success.call(null, arg);
					} else {
						$_.trigger("doAjaxFail", null);
					}
				} else {
					object.error.call(null, objectAjax.status,
							objectAjax.statusText);
				}
			}
		};
		if (object.beforeSend != null
				&& typeof (object.beforeSend) == 'function') {
			object.beforeSend.call(null);
		}
		objectAjax.send(params);
	}

};
donovosoft.fn.init();
var $_ = donovosoft.fn;
var $$_ = donovosoft.fn.$$_;