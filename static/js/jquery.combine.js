/*
1.jquery.easing.min.js or jquery.easing.1.3
2.jquery.selectBoxIt.js
3.jquery.bxslider.js
4.jquery.mousewheel.js
5.jquery.jscrollpane.min.js
6.jquery.jqpagination.js
*/

/*
 * jQuery Easing v1.1 - http://gsgd.co.uk/sandbox/jquery.easing.php
 *
 * Uses the built in easing capabilities added in jQuery 1.1
 * to offer multiple easing options
 *
 * Copyright (c) 2007 George Smith
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 */
/*jQuery.easing={easein:function(x,t,b,c,d){return c*(t/=d)*t+b},easeinout:function(x,t,b,c,d){if(t<d/2)return 2*c*t*t/(d*d)+b;var a=t-d/2;return-2*c*a*a/(d*d)+2*c*a/d+c/2+b},easeout:function(x,t,b,c,d){return-c*t*t/(d*d)+2*c*t/d+b},expoin:function(x,t,b,c,d){var a=1;if(c<0){a*=-1;c*=-1}return a*(Math.exp(Math.log(c)/d*t))+b},expoout:function(x,t,b,c,d){var a=1;if(c<0){a*=-1;c*=-1}return a*(-Math.exp(-Math.log(c)/d*(t-d))+c+1)+b},expoinout:function(x,t,b,c,d){var a=1;if(c<0){a*=-1;c*=-1}if(t<d/2)return a*(Math.exp(Math.log(c/2)/(d/2)*t))+b;return a*(-Math.exp(-2*Math.log(c/2)/d*(t-d))+c+1)+b},bouncein:function(x,t,b,c,d){return c-jQuery.easing['bounceout'](x,d-t,0,c,d)+b},bounceout:function(x,t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b}else{return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b}},bounceinout:function(x,t,b,c,d){if(t<d/2)return jQuery.easing['bouncein'](x,t*2,0,c,d)*.5+b;return jQuery.easing['bounceout'](x,t*2-d,0,c,d)*.5+c*.5+b},elasin:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b},elasout:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b},elasinout:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d/2)==2)return b+c;if(!p)p=d*(.3*1.5);if(a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b},backin:function(x,t,b,c,d){var s=1.70158;return c*(t/=d)*t*((s+1)*t-s)+b},backout:function(x,t,b,c,d){var s=1.70158;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},backinout:function(x,t,b,c,d){var s=1.70158;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b},linear:function(x,t,b,c,d){return c*t/d+b}};*/

/**/
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */


/* 2 */

/*! jquery.selectBoxIt - v3.8.0 - 2013-08-13 
* http://www.selectboxit.com
* Copyright (c) 2013 Greg Franko; Licensed MIT*/

// Immediately-Invoked Function Expression (IIFE) [Ben Alman Blog Post](http://benalman.com/news/2010/11/immediately-invoked-function-expression/) that calls another IIFE that contains all of the plugin logic.  I used this pattern so that anyone viewing this code would not have to scroll to the bottom of the page to view the local parameters that were passed to the main IIFE.

;(function (selectBoxIt) {

    //ECMAScript 5 Strict Mode: [John Resig Blog Post](http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/)
    "use strict";

    // Calls the second IIFE and locally passes in the global jQuery, window, and document objects
    selectBoxIt(window.jQuery, window, document);

}

// Locally passes in `jQuery`, the `window` object, the `document` object, and an `undefined` variable.  The `jQuery`, `window` and `document` objects are passed in locally, to improve performance, since javascript first searches for a variable match within the local variables set before searching the global variables set.  All of the global variables are also passed in locally to be minifier friendly. `undefined` can be passed in locally, because it is not a reserved word in JavaScript.

(function ($, window, document, undefined) {

    // ECMAScript 5 Strict Mode: [John Resig Blog Post](http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/)
    "use strict";

    // Calling the jQueryUI Widget Factory Method
    $.widget("selectBox.selectBoxIt", {

        // Plugin version
        VERSION: "3.8.0",

        // These options will be used as defaults
        options: {

            // **showEffect**: Accepts String: "none", "fadeIn", "show", "slideDown", or any of the jQueryUI show effects (i.e. "bounce")
            "showEffect": "none",

            // **showEffectOptions**: Accepts an object literal.  All of the available properties are based on the jqueryUI effect options
            "showEffectOptions": {},

            // **showEffectSpeed**: Accepts Number (milliseconds) or String: "slow", "medium", or "fast"
            "showEffectSpeed": "medium",

            // **hideEffect**: Accepts String: "none", "fadeOut", "hide", "slideUp", or any of the jQueryUI hide effects (i.e. "explode")
            "hideEffect": "none",

            // **hideEffectOptions**: Accepts an object literal.  All of the available properties are based on the jqueryUI effect options
            "hideEffectOptions": {},

            // **hideEffectSpeed**: Accepts Number (milliseconds) or String: "slow", "medium", or "fast"
            "hideEffectSpeed": "medium",

            // **showFirstOption**: Shows the first dropdown list option within the dropdown list options list
            "showFirstOption": true,

            // **defaultText**: Overrides the text used by the dropdown list selected option to allow a user to specify custom text.  Accepts a String.
            "defaultText": "",

            // **defaultIcon**: Overrides the icon used by the dropdown list selected option to allow a user to specify a custom icon.  Accepts a String (CSS class name(s)).
            "defaultIcon": "",

            // **downArrowIcon**: Overrides the default down arrow used by the dropdown list to allow a user to specify a custom image.  Accepts a String (CSS class name(s)).
            "downArrowIcon": "",

            // **theme**: Provides theming support for Twitter Bootstrap and jQueryUI
            "theme": "default",

            // **keydownOpen**: Opens the dropdown if the up or down key is pressed when the dropdown is focused
            "keydownOpen": true,

            // **isMobile**: Function to determine if a user's browser is a mobile browser
            "isMobile": function() {

                // Adapted from http://www.detectmobilebrowsers.com
                var ua = navigator.userAgent || navigator.vendor || window.opera;

                // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
                return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);

            },

            // **native**: Triggers the native select box when a user interacts with the drop down
            "native": false,

            // **aggressiveChange**: Will select a drop down item (and trigger a change event) when a user navigates to the item via the keyboard (up and down arrow or search), before a user selects an option with a click or the enter key
            "aggressiveChange": false,

            // **selectWhenHidden: Will allow a user to select an option using the keyboard when the drop down list is hidden and focused
            "selectWhenHidden": true,

            // **viewport**: Allows for a custom domnode used for the viewport. Accepts a selector.  Default is $(window).
            "viewport": $(window),

            // **similarSearch**: Optimizes the search for lists with many similar values (i.e. State lists) by making it easier to navigate through
            "similarSearch": false,

            // **copyAttributes**: HTML attributes that will be copied over to the new drop down
            "copyAttributes": [

                "title",

                "rel"

            ],

            // **copyClasses**: HTML classes that will be copied over to the new drop down.  The value indicates where the classes should be copied.  The default value is 'button', but you can also use 'container' (recommended) or 'none'.
            "copyClasses": "button",

            // **nativeMousedown**: Mimics native firefox drop down behavior by opening the drop down on mousedown and selecting the currently hovered drop down option on mouseup
            "nativeMousedown": false,

            // **customShowHideEvent**: Prevents the drop down from opening on click or mousedown, which allows a user to open/close the drop down with a custom event handler.
            "customShowHideEvent": false,

            // **autoWidth**: Makes sure the width of the drop down is wide enough to fit all of the drop down options
            "autoWidth": false,

            // **html**: Determines whether or not option text is rendered as html or as text
            "html": true,

            // **populate**: Convenience option that accepts JSON data, an array, a single object, or valid HTML string to add options to the drop down list
            "populate": "",

            // **dynamicPositioning**: Determines whether or not the drop down list should fit inside it's viewport
            "dynamicPositioning": true,

            // **hideCurrent**: Determines whether or not the currently selected drop down option is hidden in the list
            "hideCurrent": false

        },

        // Get Themes
        // ----------
        //      Retrieves the active drop down theme and returns the theme object
        "getThemes": function() {

            var self = this,
                theme = $(self.element).attr("data-theme") || "c";

            return {

                // Twitter Bootstrap Theme
                "bootstrap": {

                    "focus": "active",

                    "hover": "",

                    "enabled": "enabled",

                    "disabled": "disabled",

                    "arrow": "caret",

                    "button": "btn",

                    "list": "dropdown-menu",

                    "container": "bootstrap",

                    "open": "open"

                },

                // jQueryUI Theme
                "jqueryui": {

                    "focus": "ui-state-focus",

                    "hover": "ui-state-hover",

                    "enabled": "ui-state-enabled",

                    "disabled": "ui-state-disabled",

                    "arrow": "ui-icon ui-icon-triangle-1-s",

                    "button": "ui-widget ui-state-default",

                    "list": "ui-widget ui-widget-content",

                    "container": "jqueryui",

                    "open": "selectboxit-open"

                },

                // jQuery Mobile Theme
                "jquerymobile": {

                    "focus": "ui-btn-down-" + theme,

                    "hover": "ui-btn-hover-" + theme,

                    "enabled": "ui-enabled",

                    "disabled": "ui-disabled",

                    "arrow": "ui-icon ui-icon-arrow-d ui-icon-shadow",

                    "button": "ui-btn ui-btn-icon-right ui-btn-corner-all ui-shadow ui-btn-up-" + theme,

                    "list": "ui-btn ui-btn-icon-right ui-btn-corner-all ui-shadow ui-btn-up-" + theme,

                    "container": "jquerymobile",

                    "open": "selectboxit-open"

                },

                "default": {

                    "focus": "selectboxit-focus",

                    "hover": "selectboxit-hover",

                    "enabled": "selectboxit-enabled",

                    "disabled": "selectboxit-disabled",

                    "arrow": "selectboxit-default-arrow",

                    "button": "selectboxit-btn",

                    "list": "selectboxit-list",

                    "container": "selectboxit-container",

                    "open": "selectboxit-open"

                }

            };

        },

        // isDeferred
        // ----------
        //      Checks if parameter is a defered object      
        isDeferred: function(def) {
            return $.isPlainObject(def) && def.promise && def.done;
        },

        // _Create
        // -------
        //      Sets the Plugin Instance variables and
        //      constructs the plugin.  Only called once.
        _create: function(internal) {

            var self = this,
                populateOption = self.options["populate"],
                userTheme = self.options["theme"];

            // If the element calling SelectBoxIt is not a select box or is not visible
            if(!self.element.is("select")) {

                // Exits the plugin
                return;

            }

            // Stores a reference to the parent Widget class
            self.widgetProto = $.Widget.prototype;

            // The original select box DOM element
            self.originalElem = self.element[0];

            // The original select box DOM element wrapped in a jQuery object
            self.selectBox = self.element;

            if(self.options["populate"] && self.add && !internal) {

                self.add(populateOption);

            }

            // All of the original select box options
            self.selectItems = self.element.find("option");

            // The first option in the original select box
            self.firstSelectItem = self.selectItems.slice(0, 1);

            // The html document height
            self.documentHeight = $(document).height();

            self.theme = $.isPlainObject(userTheme) ? $.extend({}, self.getThemes()["default"], userTheme) : self.getThemes()[userTheme] ? self.getThemes()[userTheme] : self.getThemes()["default"];

            // The index of the currently selected dropdown list option
            self.currentFocus = 0;

            // Keeps track of which blur events will hide the dropdown list options
            self.blur = true;

             // Array holding all of the original select box options text
            self.textArray = [];

            // Maintains search order in the `search` method
            self.currentIndex = 0;

            // Maintains the current search text in the `search` method
            self.currentText = "";

            // Whether or not the dropdown list opens up or down (depending on how much room is on the page)
            self.flipped = false;

            // If the create method is not called internally by the plugin
            if(!internal) {

                // Saves the original select box `style` attribute within the `selectBoxStyles` plugin instance property
                self.selectBoxStyles = self.selectBox.attr("style");

            }

            // Creates the dropdown elements that will become the dropdown
            // Creates the ul element that will become the dropdown options list
            // Add's all attributes (excluding id, class names, and unselectable properties) to the drop down and drop down items list
            // Hides the original select box and adds the new plugin DOM elements to the page
            // Adds event handlers to the new dropdown list
            self._createDropdownButton()._createUnorderedList()._copyAttributes()._replaceSelectBox()._addClasses(self.theme)._eventHandlers();

            if(self.originalElem.disabled && self.disable) {

                // Disables the dropdown list if the original dropdown list had the `disabled` attribute
                self.disable();

            }

            // If the Aria Accessibility Module has been included
            if(self._ariaAccessibility) {

                // Adds ARIA accessibillity tags to the dropdown list
                self._ariaAccessibility();

            }

            self.isMobile = self.options["isMobile"]();

            if(self._mobile) {

                // Adds mobile support
                self._mobile();

            }

            // If the native option is set to true
            if(self.options["native"]) {

                // Triggers the native select box when a user is interacting with the drop down
                this._applyNativeSelect();

            }

            // Triggers a custom `create` event on the original dropdown list
            self.triggerEvent("create");

            // Maintains chainability
            return self;

        },

        // _Create dropdown button
        // -----------------------
        //      Creates new dropdown and dropdown elements to replace
        //      the original select box with a dropdown list
        _createDropdownButton: function() {

            var self = this,
                originalElemId = self.originalElemId = self.originalElem.id || "",
                originalElemValue = self.originalElemValue = self.originalElem.value || "",
                originalElemName = self.originalElemName = self.originalElem.name || "",
                copyClasses = self.options["copyClasses"],
                selectboxClasses = self.selectBox.attr("class") || "";

            // Creates a dropdown element that contains the dropdown list text value
            self.dropdownText = $("<span/>", {

                // Dynamically sets the dropdown `id` attribute
                "id": originalElemId && originalElemId + "SelectBoxItText",

                "class": "selectboxit-text",

                // IE specific attribute to not allow the element to be selected
                "unselectable": "on",

                // Sets the dropdown `text` to equal the original select box default value
                "text": self.firstSelectItem.text()

            }).

            // Sets the HTML5 data attribute on the dropdownText `dropdown` element
            attr("data-val", originalElemValue);

            self.dropdownImageContainer = $("<span/>", {

                "class": "selectboxit-option-icon-container"

            });

            // Creates a dropdown element that contains the dropdown list text value
            self.dropdownImage = $("<i/>", {

                // Dynamically sets the dropdown `id` attribute
                "id": originalElemId && originalElemId + "SelectBoxItDefaultIcon",

                "class": "selectboxit-default-icon",

                // IE specific attribute to not allow the element to be selected
                "unselectable": "on"

            });

            // Creates a dropdown to act as the new dropdown list
            self.dropdown = $("<span/>", {

                // Dynamically sets the dropdown `id` attribute
                "id": originalElemId && originalElemId + "SelectBoxIt",

                "class": "selectboxit " + (copyClasses === "button" ? selectboxClasses: "") + " " + (self.selectBox.prop("disabled") ? self.theme["disabled"]: self.theme["enabled"]),

                // Sets the dropdown `name` attribute to be the same name as the original select box
                "name": originalElemName,

                // Sets the dropdown `tabindex` attribute to 0 to allow the dropdown to be focusable
                "tabindex": self.selectBox.attr("tabindex") || "0",

                // IE specific attribute to not allow the element to be selected
                "unselectable": "on"

            }).

            // Appends the default text to the inner dropdown list dropdown element
            append(self.dropdownImageContainer.append(self.dropdownImage)).append(self.dropdownText);

            // Create the dropdown container that will hold all of the dropdown list dom elements
            self.dropdownContainer = $("<span/>", {

                "id": originalElemId && originalElemId + "SelectBoxItContainer",

                "class": 'selectboxit-container ' + self.theme.container + ' ' + (copyClasses === "container" ? selectboxClasses: "")

            }).

            // Appends the inner dropdown list dropdown element to the dropdown list container dropdown element
            append(self.dropdown);

            // Maintains chainability
            return self;

        },

        // _Create Unordered List
        // ----------------------
        //      Creates an unordered list element to hold the
        //        new dropdown list options that directly match
        //        the values of the original select box options
        _createUnorderedList: function() {

            // Storing the context of the widget
            var self = this,

                dataDisabled,

                optgroupClass,

                optgroupElement,

                iconClass,

                iconUrl,

                iconUrlClass,

                iconUrlStyle,

                // Declaring the variable that will hold all of the dropdown list option elements
                currentItem = "",

                originalElemId = self.originalElemId || "",

                // Creates an unordered list element
                createdList = $("<ul/>", {

                    // Sets the unordered list `id` attribute
                    "id": originalElemId && originalElemId + "SelectBoxItOptions",

                    "class": "selectboxit-options",

                    //Sets the unordered list `tabindex` attribute to -1 to prevent the unordered list from being focusable
                    "tabindex": -1

                }),

                currentDataSelectedText,

                currentDataText,

                currentDataSearch,

                currentText,

                currentOption,

                parent;

            // Checks the `showFirstOption` plugin option to determine if the first dropdown list option should be shown in the options list.
            if (!self.options["showFirstOption"]) {

                // Disables the first select box option
                self.selectItems.first().attr("disabled", "disabled");

                // Excludes the first dropdown list option from the options list
                self.selectItems = self.selectBox.find("option").slice(1);

            }

            // Loops through the original select box options list and copies the text of each
            // into new list item elements of the new dropdown list
            self.selectItems.each(function(index) {

                currentOption = $(this);

                optgroupClass = "";

                optgroupElement = "";

                dataDisabled = currentOption.prop("disabled");

                iconClass = currentOption.attr("data-icon") || "";

                iconUrl = currentOption.attr("data-iconurl") || "";

                iconUrlClass = iconUrl ? "selectboxit-option-icon-url": "";

                iconUrlStyle = iconUrl ? 'style="background-image:url(\'' + iconUrl + '\');"': "";

                currentDataSelectedText = currentOption.attr("data-selectedtext");

                currentDataText = currentOption.attr("data-text");

                currentText = currentDataText ? currentDataText: currentOption.text();

                parent = currentOption.parent();

                // If the current option being traversed is within an optgroup

                if(parent.is("optgroup")) {

                    optgroupClass = "selectboxit-optgroup-option";

                    if(currentOption.index() === 0) {

                         optgroupElement = '<span class="selectboxit-optgroup-header ' + parent.first().attr("class") + '"data-disabled="true">' + parent.first().attr("label") + '</span>';

                    }

                }

                // Uses string concatenation for speed (applies HTML attribute encoding)
                currentItem += optgroupElement + '<li data-id="' + index + '" data-val="' + this.value + '" data-disabled="' + dataDisabled + '" class="' + optgroupClass + " selectboxit-option " + ($(this).attr("class") || "") + '"><a class="selectboxit-option-anchor"><span class="selectboxit-option-icon-container"><i class="selectboxit-option-icon ' + iconClass + ' ' + (iconUrlClass || self.theme["container"]) + '"' + iconUrlStyle + '></i></span>' + (self.options["html"] ? currentText: self.htmlEscape(currentText)) + '</a></li>';

                currentDataSearch = currentOption.attr("data-search");

                // Stores all of the original select box options text inside of an array
                // (Used later in the `searchAlgorithm` method)
                self.textArray[index] = dataDisabled ? "": currentDataSearch ? currentDataSearch: currentText;

                // Checks the original select box option for the `selected` attribute
                if (this.selected) {

                    // Replaces the default text with the selected option text
                    self._setText(self.dropdownText, currentDataSelectedText || currentText);

                    //Set the currently selected option
                    self.currentFocus = index;

                }

            });

            // If the `defaultText` option is being used
            if ((self.options["defaultText"] || self.selectBox.attr("data-text"))) {

                var defaultedText = self.options["defaultText"] || self.selectBox.attr("data-text");

                // Overrides the current dropdown default text with the value the user specifies in the `defaultText` option
                self._setText(self.dropdownText, defaultedText);

                self.options["defaultText"] = defaultedText;

            }

            // Append the list item to the unordered list
            createdList.append(currentItem);

            // Stores the dropdown list options list inside of the `list` instance variable
            self.list = createdList;

            // Append the dropdown list options list to the dropdown container element
            self.dropdownContainer.append(self.list);

            // Stores the individual dropdown list options inside of the `listItems` instance variable
            self.listItems = self.list.children("li");

            self.listAnchors = self.list.find("a");

            // Sets the 'selectboxit-option-first' class name on the first drop down option
            self.listItems.first().addClass("selectboxit-option-first");

            // Sets the 'selectboxit-option-last' class name on the last drop down option
            self.listItems.last().addClass("selectboxit-option-last");

            // Set the disabled CSS class for select box options
            self.list.find("li[data-disabled='true']").not(".optgroupHeader").addClass(self.theme["disabled"]);

            self.dropdownImage.addClass(self.selectBox.attr("data-icon") || self.options["defaultIcon"] || self.listItems.eq(self.currentFocus).find("i").attr("class"));

            self.dropdownImage.attr("style", self.listItems.eq(self.currentFocus).find("i").attr("style"));

            //Maintains chainability
            return self;

        },

        // _Replace Select Box
        // -------------------
        //      Hides the original dropdown list and inserts
        //        the new DOM elements
        _replaceSelectBox: function() {

            var self = this,
                height,
                originalElemId = self.originalElem.id || "",
                size = self.selectBox.attr("data-size"),
                listSize = self.listSize = size === undefined ? "auto" : size === "0" || "size" === "auto" ? "auto" : +size,
                downArrowContainerWidth,
                dropdownImageWidth;

            // Hides the original select box
            self.selectBox.css("display", "none").

            // Adds the new dropdown list to the page directly after the hidden original select box element
            after(self.dropdownContainer);

            self.dropdownContainer.appendTo('body').

            addClass('selectboxit-rendering');

            // The height of the dropdown list
            height = self.dropdown.height();

            // The down arrow element of the dropdown list
            self.downArrow = $("<i/>", {

                // Dynamically sets the dropdown `id` attribute of the dropdown list down arrow
                "id": originalElemId && originalElemId + "SelectBoxItArrow",

                "class": "selectboxit-arrow",

                // IE specific attribute to not allow the dropdown list text to be selected
                "unselectable": "on"

            });

            // The down arrow container element of the dropdown list
            self.downArrowContainer = $("<span/>", {

                // Dynamically sets the dropdown `id` attribute for the down arrow container element
                "id": originalElemId && originalElemId + "SelectBoxItArrowContainer",

                "class": "selectboxit-arrow-container",

                // IE specific attribute to not allow the dropdown list text to be selected
                "unselectable": "on"

            }).

            // Inserts the down arrow element inside of the down arrow container element
            append(self.downArrow);

            // Appends the down arrow element to the dropdown list
            self.dropdown.append(self.downArrowContainer);

            // Adds the `selectboxit-selected` class name to the currently selected drop down option
            self.listItems.removeClass("selectboxit-selected").eq(self.currentFocus).addClass("selectboxit-selected");

            // The full outer width of the down arrow container
            downArrowContainerWidth = self.downArrowContainer.outerWidth(true);

            // The full outer width of the dropdown image
            dropdownImageWidth = self.dropdownImage.outerWidth(true);

            // If the `autoWidth` option is true
            if(self.options["autoWidth"]) {

                // Sets the auto width of the drop down
                self.dropdown.css({ "width": "auto" }).css({

                    "width": self.list.outerWidth(true) + downArrowContainerWidth + dropdownImageWidth

                });

                self.list.css({

                    "min-width": self.dropdown.width()

                });

            }

            // Dynamically adds the `max-width` and `line-height` CSS styles of the dropdown list text element
            self.dropdownText.css({

                "max-width": self.dropdownContainer.outerWidth(true) - (downArrowContainerWidth + dropdownImageWidth)

            });

            // Adds the new dropdown list to the page directly after the hidden original select box element
            self.selectBox.after(self.dropdownContainer);

            self.dropdownContainer.removeClass('selectboxit-rendering');

            if($.type(listSize) === "number") {

                // Stores the new `max-height` for later
                self.maxHeight = self.listAnchors.outerHeight(true) * listSize;

            }

            // Maintains chainability
            return self;

        },

        // _Scroll-To-View
        // ---------------
        //      Updates the dropdown list scrollTop value
        _scrollToView: function(type) {

            var self = this,

                currentOption = self.listItems.eq(self.currentFocus),

                // The current scroll positioning of the dropdown list options list
                listScrollTop = self.list.scrollTop(),

                // The height of the currently selected dropdown list option
                currentItemHeight = currentOption.height(),

                // The relative distance from the currently selected dropdown list option to the the top of the dropdown list options list
                currentTopPosition = currentOption.position().top,

                absCurrentTopPosition = Math.abs(currentTopPosition),

                // The height of the dropdown list option list
                listHeight = self.list.height(),

                currentText;

            // Scrolling logic for a text search
            if (type === "search") {

                // Increases the dropdown list options `scrollTop` if a user is searching for an option
                // below the currently selected option that is not visible
                if (listHeight - currentTopPosition < currentItemHeight) {

                    // The selected option will be shown at the very bottom of the visible options list
                    self.list.scrollTop(listScrollTop + (currentTopPosition - (listHeight - currentItemHeight)));

                }

                // Decreases the dropdown list options `scrollTop` if a user is searching for an option above the currently selected option that is not visible
                else if (currentTopPosition < -1) {

                    self.list.scrollTop(currentTopPosition - currentItemHeight);

                }
            }

            // Scrolling logic for the `up` keyboard navigation
            else if (type === "up") {

                // Decreases the dropdown list option list `scrollTop` if a user is navigating to an element that is not visible
                if (currentTopPosition < -1) {

                    self.list.scrollTop(listScrollTop - absCurrentTopPosition);

                }
            }

            // Scrolling logic for the `down` keyboard navigation
            else if (type === "down") {

                // Increases the dropdown list options `scrollTop` if a user is navigating to an element that is not fully visible
                if (listHeight - currentTopPosition < currentItemHeight) {

                    // Increases the dropdown list options `scrollTop` by the height of the current option item.
                    self.list.scrollTop((listScrollTop + (absCurrentTopPosition - listHeight + currentItemHeight)));

                }
            }

            // Maintains chainability
            return self;

        },

        // _Callback
        // ---------
        //      Call the function passed into the method
        _callbackSupport: function(callback) {

            var self = this;

            // Checks to make sure the parameter passed in is a function
            if ($.isFunction(callback)) {

                // Calls the method passed in as a parameter and sets the current `SelectBoxIt` object that is stored in the jQuery data method as the context(allows for `this` to reference the SelectBoxIt API Methods in the callback function. The `dropdown` DOM element that acts as the new dropdown list is also passed as the only parameter to the callback
                callback.call(self, self.dropdown);

            }

            // Maintains chainability
            return self;

        },

        // _setText
        // --------
        //      Set's the text or html for the drop down
        _setText: function(elem, currentText) {

            var self = this;

            if(self.options["html"]) {

                elem.html(currentText);

            }

            else {

                elem.text(currentText);

            }

            return self;

        },

        // Open
        // ----
        //      Opens the dropdown list options list
        open: function(callback) {

            var self = this,
                showEffect = self.options["showEffect"],
                showEffectSpeed = self.options["showEffectSpeed"],
                showEffectOptions = self.options["showEffectOptions"],
                isNative = self.options["native"],
                isMobile = self.isMobile;

            // If there are no select box options, do not try to open the select box
            if(!self.listItems.length || self.dropdown.hasClass(self.theme["disabled"])) {

                return self;

            }

            // If the new drop down is being used and is not visible
            if((!isNative && !isMobile) && !this.list.is(":visible")) {

                // Triggers a custom "open" event on the original select box
                self.triggerEvent("open");

                if (self._dynamicPositioning && self.options["dynamicPositioning"]) {

                    // Dynamically positions the dropdown list options list
                    self._dynamicPositioning();

                }

                // Uses `no effect`
                if(showEffect === "none") {

                    // Does not require a callback function because this animation will complete before the call to `scrollToView`
                    self.list.show();

                }

                // Uses the jQuery `show` special effect
                else if(showEffect === "show" || showEffect === "slideDown" || showEffect === "fadeIn") {

                    // Requires a callback function to determine when the `show` animation is complete
                    self.list[showEffect](showEffectSpeed);

                }

                // If none of the above options were passed, then a `jqueryUI show effect` is expected
                else {

                    // Allows for custom show effects via the [jQueryUI core effects](http://http://jqueryui.com/demos/show/)
                    self.list.show(showEffect, showEffectOptions, showEffectSpeed);

                }

                self.list.promise().done(function() {

                    // Updates the list `scrollTop` attribute
                    self._scrollToView("search");

                });

            }

            // Provide callback function support
            self._callbackSupport(callback);

            // Maintains chainability
            return self;

        },

        // Close
        // -----
        //      Closes the dropdown list options list
        close: function(callback) {

            var self = this,
                hideEffect = self.options["hideEffect"],
                hideEffectSpeed = self.options["hideEffectSpeed"],
                hideEffectOptions = self.options["hideEffectOptions"],
                isNative = self.options["native"],
                isMobile = self.isMobile;

            // If the drop down is being used and is visible
            if((!isNative && !isMobile) && self.list.is(":visible")) {

                // Triggers a custom "close" event on the original select box
                self.triggerEvent("close");

                // Uses `no effect`
                if(hideEffect === "none") {

                    // Does not require a callback function because this animation will complete before the call to `scrollToView`
                    self.list.hide();

                }

                // Uses the jQuery `hide` special effect
                else if(hideEffect === "hide" || hideEffect === "slideUp" || hideEffect === "fadeOut") {

                    self.list[hideEffect](hideEffectSpeed);

                }

                // If none of the above options were passed, then a `jqueryUI hide effect` is expected
                else {

                    // Allows for custom hide effects via the [jQueryUI core effects](http://http://jqueryui.com/demos/hide/)
                    self.list.hide(hideEffect, hideEffectOptions, hideEffectSpeed);

                }

            }

            // Provide callback function support
            self._callbackSupport(callback);

            // Maintains chainability
            return self;

        },

        toggle: function() {

            var self = this,
                listIsVisible = self.list.is(":visible");

            if(listIsVisible) {

                self.close();

            }

            else if(!listIsVisible) {

                self.open();

            }

        },

        // _Key Mappings
        // -------------
        //      Object literal holding the string representation of each key code
        _keyMappings: {

            "38": "up",

            "40": "down",

            "13": "enter",

            "8": "backspace",

            "9": "tab",

            "32": "space",

            "27": "esc"

        },

        // _Key Down Methods
        // -----------------
        //      Methods to use when the keydown event is triggered
        _keydownMethods: function() {

            var self = this,
                moveToOption = self.list.is(":visible") || !self.options["keydownOpen"];

            return {

                "down": function() {

                    // If the plugin options allow keyboard navigation
                    if (self.moveDown && moveToOption) {

                        self.moveDown();

                    }

                },

                "up": function() {

                     // If the plugin options allow keyboard navigation
                    if (self.moveUp && moveToOption) {

                        self.moveUp();

                    }

                },

                "enter": function() {

                    var activeElem = self.listItems.eq(self.currentFocus);

                    // Updates the dropdown list value
                    self._update(activeElem);

                    if (activeElem.attr("data-preventclose") !== "true") {

                        // Closes the drop down list options list
                        self.close();

                    }

                    // Triggers the `enter` events on the original select box
                    self.triggerEvent("enter");

                },

                "tab": function() {

                    // Triggers the custom `tab-blur` event on the original select box
                    self.triggerEvent("tab-blur");

                    // Closes the drop down list
                    self.close();

                },

                "backspace": function() {

                    // Triggers the custom `backspace` event on the original select box
                    self.triggerEvent("backspace");

                },

                "esc": function() {

                    // Closes the dropdown options list
                    self.close();

                }

            };

        },


        // _Event Handlers
        // ---------------
        //      Adds event handlers to the new dropdown and the original select box
        _eventHandlers: function() {

            // LOCAL VARIABLES
            var self = this,
                nativeMousedown = self.options["nativeMousedown"],
                customShowHideEvent = self.options["customShowHideEvent"],
                currentDataText,
                currentText,
                focusClass = self.focusClass,
                hoverClass = self.hoverClass,
                openClass = self.openClass;

            // Select Box events
            this.dropdown.on({

                // `click` event with the `selectBoxIt` namespace
                "click.selectBoxIt": function() {

                    // Used to make sure the dropdown becomes focused (fixes IE issue)
                    self.dropdown.trigger("focus", true);

                    // The `click` handler logic will only be applied if the dropdown list is enabled
                    if (!self.originalElem.disabled) {

                        // Triggers the `click` event on the original select box
                        self.triggerEvent("click");

                        if(!nativeMousedown && !customShowHideEvent) {

                            self.toggle();

                        }

                    }

                },

                // `mousedown` event with the `selectBoxIt` namespace
                "mousedown.selectBoxIt": function() {

                    // Stores data in the jQuery `data` method to help determine if the dropdown list gains focus from a click or tabstop.  The mousedown event fires before the focus event.
                    $(this).data("mdown", true);

                    self.triggerEvent("mousedown");

                    if(nativeMousedown && !customShowHideEvent) {

                        self.toggle();

                    }

                },

                // `mouseup` event with the `selectBoxIt` namespace
                "mouseup.selectBoxIt": function() {

                    self.triggerEvent("mouseup");

                },

                // `blur` event with the `selectBoxIt` namespace.  Uses special blur logic to make sure the dropdown list closes correctly
                "blur.selectBoxIt": function() {

                    // If `self.blur` property is true
                    if (self.blur) {

                        // Triggers both the `blur` and `focusout` events on the original select box.
                        // The `focusout` event is also triggered because the event bubbles
                        // This event has to be used when using event delegation (such as the jQuery `delegate` or `on` methods)
                        // Popular open source projects such as Backbone.js utilize event delegation to bind events, so if you are using Backbone.js, use the `focusout` event instead of the `blur` event
                        self.triggerEvent("blur");

                        // Closes the dropdown list options list
                        self.close();

                        $(this).removeClass(focusClass);

                    }

                },

                "focus.selectBoxIt": function(event, internal) {

                    // Stores the data associated with the mousedown event inside of a local variable
                    var mdown = $(this).data("mdown");

                    // Removes the jQuery data associated with the mousedown event
                    $(this).removeData("mdown");

                    // If a mousedown event did not occur and no data was passed to the focus event (this correctly triggers the focus event), then the dropdown list gained focus from a tabstop
                    if (!mdown && !internal) {

                        setTimeout(function() {

                            // Triggers the `tabFocus` custom event on the original select box
                            self.triggerEvent("tab-focus");

                        }, 0);

                    }

                    // Only trigger the `focus` event on the original select box if the dropdown list is hidden (this verifies that only the correct `focus` events are used to trigger the event on the original select box
                    if(!internal) {

                        if(!$(this).hasClass(self.theme["disabled"])) {

                            $(this).addClass(focusClass);

                        }

                        //Triggers the `focus` default event on the original select box
                        self.triggerEvent("focus");

                    }

                },

                // `keydown` event with the `selectBoxIt` namespace.  Catches all user keyboard navigations
                "keydown.selectBoxIt": function(e) {

                    // Stores the `keycode` value in a local variable
                    var currentKey = self._keyMappings[e.keyCode],

                        keydownMethod = self._keydownMethods()[currentKey];

                    if(keydownMethod) {

                        keydownMethod();

                        if(self.options["keydownOpen"] && (currentKey === "up" || currentKey === "down")) {

                            self.open();

                        }

                    }

                    if(keydownMethod && currentKey !== "tab") {

                        e.preventDefault();

                    }

                },

                // `keypress` event with the `selectBoxIt` namespace.  Catches all user keyboard text searches since you can only reliably get character codes using the `keypress` event
                "keypress.selectBoxIt": function(e) {

                    // Sets the current key to the `keyCode` value if `charCode` does not exist.  Used for cross
                    // browser support since IE uses `keyCode` instead of `charCode`.
                    var currentKey = e.charCode || e.keyCode,

                        key = self._keyMappings[e.charCode || e.keyCode],

                        // Converts unicode values to characters
                        alphaNumericKey = String.fromCharCode(currentKey);

                    // If the plugin options allow text searches
                    if (self.search && (!key || (key && key === "space"))) {

                        // Calls `search` and passes the character value of the user's text search
                        self.search(alphaNumericKey, true, true);

                    }

                    if(key === "space") {

                        e.preventDefault();

                    }

                },

                // `mousenter` event with the `selectBoxIt` namespace .The mouseenter JavaScript event is proprietary to Internet Explorer. Because of the event's general utility, jQuery simulates this event so that it can be used regardless of browser.
                "mouseenter.selectBoxIt": function() {

                    // Trigger the `mouseenter` event on the original select box
                    self.triggerEvent("mouseenter");

                },

                // `mouseleave` event with the `selectBoxIt` namespace. The mouseleave JavaScript event is proprietary to Internet Explorer. Because of the event's general utility, jQuery simulates this event so that it can be used regardless of browser.
                "mouseleave.selectBoxIt": function() {

                    // Trigger the `mouseleave` event on the original select box
                    self.triggerEvent("mouseleave");

                }

            });

            // Select box options events that set the dropdown list blur logic (decides when the dropdown list gets
            // closed)
            self.list.on({

                // `mouseover` event with the `selectBoxIt` namespace
                "mouseover.selectBoxIt": function() {

                    // Prevents the dropdown list options list from closing
                    self.blur = false;

                },

                // `mouseout` event with the `selectBoxIt` namespace
                "mouseout.selectBoxIt": function() {

                    // Allows the dropdown list options list to close
                    self.blur = true;

                },

                // `focusin` event with the `selectBoxIt` namespace
                "focusin.selectBoxIt": function() {

                    // Prevents the default browser outline border to flicker, which results because of the `blur` event
                    self.dropdown.trigger("focus", true);

                }

            });

            // Select box individual options events bound with the jQuery `delegate` method.  `Delegate` was used because binding indropdownidual events to each list item (since we don't know how many there will be) would decrease performance.  Instead, we bind each event to the unordered list, provide the list item context, and allow the list item events to bubble up (`event bubbling`). This greatly increases page performance because we only have to bind an event to one element instead of x number of elements. Delegates the `click` event with the `selectBoxIt` namespace to the list items
            self.list.on({

                "mousedown.selectBoxIt": function() {

                    self._update($(this));

                    self.triggerEvent("option-click");

                    // If the current drop down option is not disabled
                    if ($(this).attr("data-disabled") === "false" && $(this).attr("data-preventclose") !== "true") {

                        // Closes the drop down list
                        self.close();

                    }

                    setTimeout(function() {

                        self.dropdown.trigger('focus', true);

                    }, 0);

                },

               // Delegates the `focusin` event with the `selectBoxIt` namespace to the list items
               "focusin.selectBoxIt": function() {

                    // Removes the hover class from the previous drop down option
                    self.listItems.not($(this)).removeAttr("data-active");

                    $(this).attr("data-active", "");

                    var listIsHidden = self.list.is(":hidden");

                    if((self.options["searchWhenHidden"] && listIsHidden) || self.options["aggressiveChange"] || (listIsHidden && self.options["selectWhenHidden"])) {

                        self._update($(this));

                    }

                    // Adds the focus CSS class to the currently focused dropdown list option
                   $(this).addClass(focusClass);

                },

                // Delegates the `focus` event with the `selectBoxIt` namespace to the list items
                "mouseup.selectBoxIt": function() {

                    if(nativeMousedown && !customShowHideEvent) {

                        self._update($(this));

                        self.triggerEvent("option-mouseup");

                        // If the current drop down option is not disabled
                        if ($(this).attr("data-disabled") === "false" && $(this).attr("data-preventclose") !== "true") {

                            // Closes the drop down list
                            self.close();

                        }

                    }

                },

                // Delegates the `mouseenter` event with the `selectBoxIt` namespace to the list items
                "mouseenter.selectBoxIt": function() {

                    // If the currently moused over drop down option is not disabled
                    if($(this).attr("data-disabled") === "false") {

                        self.listItems.removeAttr("data-active");

                        $(this).addClass(focusClass).attr("data-active", "");

                        // Sets the dropdown list indropdownidual options back to the default state and sets the focus CSS class on the currently hovered option
                        self.listItems.not($(this)).removeClass(focusClass);

                        $(this).addClass(focusClass);

                        self.currentFocus = +$(this).attr("data-id");

                    }

                },

                // Delegates the `mouseleave` event with the `selectBoxIt` namespace to the list items
                "mouseleave.selectBoxIt": function() {

                    // If the currently moused over drop down option is not disabled
                    if($(this).attr("data-disabled") === "false") {

                        // Removes the focus class from the previous drop down option
                        self.listItems.not($(this)).removeClass(focusClass).removeAttr("data-active");

                        $(this).addClass(focusClass);

                        self.currentFocus = +$(this).attr("data-id");

                    }

                },

                // Delegates the `blur` event with the `selectBoxIt` namespace to the list items
                "blur.selectBoxIt": function() {

                    // Removes the focus CSS class from the previously focused dropdown list option
                    $(this).removeClass(focusClass);

                }

            }, ".selectboxit-option");

            // Select box individual option anchor events bound with the jQuery `delegate` method.  `Delegate` was used because binding indropdownidual events to each list item (since we don't know how many there will be) would decrease performance.  Instead, we bind each event to the unordered list, provide the list item context, and allow the list item events to bubble up (`event bubbling`). This greatly increases page performance because we only have to bind an event to one element instead of x number of elements. Delegates the `click` event with the `selectBoxIt` namespace to the list items
            self.list.on({

                "click.selectBoxIt": function(ev) {

                    // Prevents the internal anchor tag from doing anything funny
                    ev.preventDefault();

                }

            }, "a");

            // Original dropdown list events
            self.selectBox.on({

                // `change` event handler with the `selectBoxIt` namespace
                "change.selectBoxIt, internal-change.selectBoxIt": function(event, internal) {

                    var currentOption,
                        currentDataSelectedText;

                    // If the user called the change method
                    if(!internal) {

                        currentOption = self.list.find('li[data-val="' + self.originalElem.value + '"]');

                        // If there is a dropdown option with the same value as the original select box element
                        if(currentOption.length) {

                            self.listItems.eq(self.currentFocus).removeClass(self.focusClass);

                            self.currentFocus = +currentOption.attr("data-id");

                        }

                    }

                    currentOption = self.listItems.eq(self.currentFocus);

                    currentDataSelectedText = currentOption.attr("data-selectedtext");

                    currentDataText = currentOption.attr("data-text");

                    currentText = currentDataText ?  currentDataText: currentOption.find("a").text();

                    // Sets the new dropdown list text to the value of the current option
                    self._setText(self.dropdownText, currentDataSelectedText || currentText);

                    self.dropdownText.attr("data-val", self.originalElem.value);

                    if(currentOption.find("i").attr("class")) {

                        self.dropdownImage.attr("class", currentOption.find("i").attr("class")).addClass("selectboxit-default-icon");

                        self.dropdownImage.attr("style", currentOption.find("i").attr("style"));
                    }

                    // Triggers a custom changed event on the original select box
                    self.triggerEvent("changed");

                },

                // `disable` event with the `selectBoxIt` namespace
                "disable.selectBoxIt": function() {

                    // Adds the `disabled` CSS class to the new dropdown list to visually show that it is disabled
                    self.dropdown.addClass(self.theme["disabled"]);

                },

                // `enable` event with the `selectBoxIt` namespace
                "enable.selectBoxIt": function() {

                    // Removes the `disabled` CSS class from the new dropdown list to visually show that it is enabled
                    self.dropdown.removeClass(self.theme["disabled"]);

                },

                // `open` event with the `selectBoxIt` namespace
                "open.selectBoxIt": function() {

                    var currentElem = self.list.find("li[data-val='" + self.dropdownText.attr("data-val") + "']"),
                        activeElem;

                    // If no current element can be found, then select the first drop down option
                    if(!currentElem.length) {

                        // Sets the default value of the dropdown list to the first option that is not disabled
                        currentElem = self.listItems.not("[data-disabled=true]").first();

                    }

                    self.currentFocus = +currentElem.attr("data-id");

                    activeElem = self.listItems.eq(self.currentFocus);

                    self.dropdown.addClass(openClass).

                    // Removes the focus class from the dropdown list and adds the library focus class for both the dropdown list and the currently selected dropdown list option
                    removeClass(hoverClass).addClass(focusClass);

                    self.listItems.removeClass(self.selectedClass).

                    removeAttr("data-active").not(activeElem).removeClass(focusClass);

                    activeElem.addClass(self.selectedClass).addClass(focusClass);

                    if(self.options.hideCurrent) {

                        self.listItems.show();

                        activeElem.hide();

                    }

                },

                "close.selectBoxIt": function() {

                    // Removes the open class from the dropdown container
                    self.dropdown.removeClass(openClass);

                },

                "blur.selectBoxIt": function() {

                    self.dropdown.removeClass(focusClass);

                },

                // `mousenter` event with the `selectBoxIt` namespace
                "mouseenter.selectBoxIt": function() {

                    if(!$(this).hasClass(self.theme["disabled"])) {
                        self.dropdown.addClass(hoverClass);
                    }

                },

                // `mouseleave` event with the `selectBoxIt` namespace
                "mouseleave.selectBoxIt": function() {

                    // Removes the hover CSS class on the previously hovered dropdown list option
                    self.dropdown.removeClass(hoverClass);

                },

                // `destroy` event
                "destroy": function(ev) {

                    // Prevents the default action from happening
                    ev.preventDefault();

                    // Prevents the destroy event from propagating
                    ev.stopPropagation();

                }

            });

            // Maintains chainability
            return self;

        },

        // _update
        // -------
        //      Updates the drop down and select box with the current value
        _update: function(elem) {

            var self = this,
                currentDataSelectedText,
                currentDataText,
                currentText,
                defaultText = self.options["defaultText"] || self.selectBox.attr("data-text"),
                currentElem = self.listItems.eq(self.currentFocus);

            if (elem.attr("data-disabled") === "false") {

                currentDataSelectedText = self.listItems.eq(self.currentFocus).attr("data-selectedtext");

                currentDataText = currentElem.attr("data-text");

                currentText = currentDataText ? currentDataText: currentElem.text();

                // If the default text option is set and the current drop down option is not disabled
                if ((defaultText && self.options["html"] ? self.dropdownText.html() === defaultText: self.dropdownText.text() === defaultText) && self.selectBox.val() === elem.attr("data-val")) {

                    self.triggerEvent("change");

                }

                else {

                    // Sets the original dropdown list value and triggers the `change` event on the original select box
                    self.selectBox.val(elem.attr("data-val"));

                    // Sets `currentFocus` to the currently focused dropdown list option.
                    // The unary `+` operator casts the string to a number
                    // [James Padolsey Blog Post](http://james.padolsey.com/javascript/terse-javascript-101-part-2/)
                    self.currentFocus = +elem.attr("data-id");

                    // Triggers the dropdown list `change` event if a value change occurs
                    if (self.originalElem.value !== self.dropdownText.attr("data-val")) {

                        self.triggerEvent("change");

                    }

                }

            }

        },

        // _addClasses
        // -----------
        //      Adds SelectBoxIt CSS classes
        _addClasses: function(obj) {

            var self = this,

                focusClass = self.focusClass = obj.focus,

                hoverClass = self.hoverClass = obj.hover,

                buttonClass = obj.button,

                listClass = obj.list,

                arrowClass = obj.arrow,

                containerClass = obj.container,

                openClass = self.openClass = obj.open;

            self.selectedClass = "selectboxit-selected";

            self.downArrow.addClass(self.selectBox.attr("data-downarrow") || self.options["downArrowIcon"] || arrowClass);

            // Adds the correct container class to the dropdown list
            self.dropdownContainer.addClass(containerClass);

            // Adds the correct class to the dropdown list
            self.dropdown.addClass(buttonClass);

            // Adds the default class to the dropdown list options
            self.list.addClass(listClass);

            // Maintains chainability
            return self;

        },

        // Refresh
        // -------
        //    The dropdown will rebuild itself.  Useful for dynamic content.
        refresh: function(callback, internal) {

            var self = this;

            // Destroys the plugin and then recreates the plugin
            self._destroySelectBoxIt()._create(true);

            if(!internal) {
                self.triggerEvent("refresh");
            }

            self._callbackSupport(callback);

            //Maintains chainability
            return self;

        },

        // HTML Escape
        // -----------
        //      HTML encodes a string
        htmlEscape: function(str) {

            return String(str)
                .replace(/&/g, "&amp;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");

        },

        // triggerEvent
        // ------------
        //      Trigger's an external event on the original select box element
        triggerEvent: function(eventName) {

            var self = this,
                // Finds the currently option index
                currentIndex = self.options["showFirstOption"] ? self.currentFocus : ((self.currentFocus - 1) >= 0 ? self.currentFocus: 0);

            // Triggers the custom option-click event on the original select box and passes the select box option
            self.selectBox.trigger(eventName, { "selectbox": self.selectBox, "selectboxOption": self.selectItems.eq(currentIndex), "dropdown": self.dropdown, "dropdownOption": self.listItems.eq(self.currentFocus) });

            // Maintains chainability
            return self;

        },

        // _copyAttributes
        // ---------------
        //      Copies HTML attributes from the original select box to the new drop down 
        _copyAttributes: function() {

            var self = this;

            if(self._addSelectBoxAttributes) {

                self._addSelectBoxAttributes();

            }

            return self;

        },

        // _realOuterWidth
        // ---------------
        //      Retrieves the true outerWidth dimensions of a hidden DOM element
        _realOuterWidth: function(elem) {

            if(elem.is(":visible")) {

                return elem.outerWidth(true);

            }

            var self = this,
                clonedElem = elem.clone(),
                outerWidth;

            clonedElem.css({

                "visibility": "hidden",

                "display": "block",

                "position": "absolute"

            }).appendTo("body");

            outerWidth = clonedElem.outerWidth(true);

            clonedElem.remove();

            return outerWidth;
        }

    });

    // Stores the plugin prototype object in a local variable
    var selectBoxIt = $.selectBox.selectBoxIt.prototype;

    // Add Options Module
    // ==================

    // add
    // ---
    //    Adds drop down options
    //    using JSON data, an array,
    //    a single object, or valid HTML string

    selectBoxIt.add = function(data, callback) {

        this._populate(data, function(data) {

            var self = this,
                dataType = $.type(data),
                value,
                x = 0,
                dataLength,
                elems = [],
                isJSON = self._isJSON(data),
                parsedJSON = isJSON && self._parseJSON(data);

            // If the passed data is a local or JSON array
            if(data && (dataType === "array" || (isJSON && parsedJSON.data && $.type(parsedJSON.data) === "array")) || (dataType === "object" && data.data && $.type(data.data) === "array")) {

                // If the data is JSON
                if(self._isJSON(data)) {

                    // Parses the JSON and stores it in the data local variable
                    data = parsedJSON;

                }

                // If there is an inner `data` property stored in the first level of the JSON array
                if(data.data) {

                    // Set's the data to the inner `data` property
                    data = data.data;

                }

                // Loops through the array
                for(dataLength = data.length; x <= dataLength - 1; x += 1) {

                    // Stores the currently traversed array item in the local `value` variable
                    value = data[x];

                    // If the currently traversed array item is an object literal
                    if($.isPlainObject(value)) {

                        // Adds an option to the elems array
                        elems.push($("<option/>", value));

                    }

                    // If the currently traversed array item is a string
                    else if($.type(value) === "string") {

                        // Adds an option to the elems array
                        elems.push($("<option/>", { text: value, value: value }));

                    }

                }

                // Appends all options to the drop down (with the correct object configurations)
                self.selectBox.append(elems);

            }

            // if the passed data is an html string and not a JSON string
            else if(data && dataType === "string" && !self._isJSON(data)) {

                // Appends the html string options to the original select box
                self.selectBox.append(data);

            }

            else if(data && dataType === "object") {

                // Appends an option to the original select box (with the object configurations)
                self.selectBox.append($("<option/>", data));

            }

            else if(data && self._isJSON(data) && $.isPlainObject(self._parseJSON(data))) {

                // Appends an option to the original select box (with the object configurations)
                self.selectBox.append($("<option/>", self._parseJSON(data)));

            }

            // If the dropdown property exists
            if(self.dropdown) {

                // Rebuilds the dropdown
                self.refresh(function() {

                    // Provide callback function support
                    self._callbackSupport(callback);

                }, true);

            } else {

                // Provide callback function support
                self._callbackSupport(callback);

            }

            // Maintains chainability
            return self;

        });

    };

    // parseJSON
    // ---------
    //      Detects JSON support and parses JSON data
    selectBoxIt._parseJSON = function(data) {

        return (JSON && JSON.parse && JSON.parse(data)) || $.parseJSON(data);

    };

    // isjSON
    // ------
    //    Determines if a string is valid JSON

    selectBoxIt._isJSON = function(data) {

        var self = this,
            json;

        try {

            json = self._parseJSON(data);

            // Valid JSON
            return true;

        } catch (e) {

            // Invalid JSON
            return false;

        }

    };

    // _populate
    // --------
    //    Handles asynchronous and synchronous data
    //    to populate the select box

    selectBoxIt._populate = function(data, callback) {

        var self = this;

        data = $.isFunction(data) ? data.call() : data;

        if(self.isDeferred(data)) {

            data.done(function(returnedData) {

                callback.call(self, returnedData);

            });

        }

        else {

            callback.call(self, data);

        }

        // Maintains chainability
        return self;

    };

    // Accessibility Module
    // ====================

    // _ARIA Accessibility
    // ------------------
    //      Adds ARIA (Accessible Rich Internet Applications)
    //      Accessibility Tags to the Select Box

    selectBoxIt._ariaAccessibility = function() {

        var self = this,
            dropdownLabel = $("label[for='" + self.originalElem.id + "']");

        // Adds `ARIA attributes` to the dropdown list
        self.dropdownContainer.attr({

            // W3C `combobox` description: A presentation of a select; usually similar to a textbox where users can type ahead to select an option.
            "role": "combobox",

            //W3C `aria-autocomplete` description: Indicates whether user input completion suggestions are provided.
            "aria-autocomplete": "list",

            "aria-haspopup": "true",

            // W3C `aria-expanded` description: Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.
            "aria-expanded": "false",

            // W3C `aria-owns` description: The value of the aria-owns attribute is a space-separated list of IDREFS that reference one or more elements in the document by ID. The reason for adding aria-owns is to expose a parent/child contextual relationship to assistive technologies that is otherwise impossible to infer from the DOM.
            "aria-owns": self.list[0].id

        });

        self.dropdownText.attr({

            "aria-live": "polite"

        });

        // Dynamically adds `ARIA attributes` if the new dropdown list is enabled or disabled
        self.dropdown.on({

            //Select box custom `disable` event with the `selectBoxIt` namespace
            "disable.selectBoxIt" : function() {

                // W3C `aria-disabled` description: Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
                self.dropdownContainer.attr("aria-disabled", "true");

            },

            // Select box custom `enable` event with the `selectBoxIt` namespace
            "enable.selectBoxIt" : function() {

                // W3C `aria-disabled` description: Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
                self.dropdownContainer.attr("aria-disabled", "false");

            }

        });

        if(dropdownLabel.length) {

            // MDN `aria-labelledby` description:  Indicates the IDs of the elements that are the labels for the object.
            self.dropdownContainer.attr("aria-labelledby", dropdownLabel[0].id);

        }

        // Adds ARIA attributes to the dropdown list options list
        self.list.attr({

            // W3C `listbox` description: A widget that allows the user to select one or more items from a list of choices.
            "role": "listbox",

            // Indicates that the dropdown list options list is currently hidden
            "aria-hidden": "true"

        });

        // Adds `ARIA attributes` to the dropdown list options
        self.listItems.attr({

            // This must be set for each element when the container element role is set to `listbox`
            "role": "option"

        });

        // Dynamically updates the new dropdown list `aria-label` attribute after the original dropdown list value changes
        self.selectBox.on({

            // Custom `open` event with the `selectBoxIt` namespace
            "open.selectBoxIt": function() {

                // Indicates that the dropdown list options list is currently visible
                self.list.attr("aria-hidden", "false");

                // Indicates that the dropdown list is currently expanded
                self.dropdownContainer.attr("aria-expanded", "true");

            },

            // Custom `close` event with the `selectBoxIt` namespace
            "close.selectBoxIt": function() {

                // Indicates that the dropdown list options list is currently hidden
                self.list.attr("aria-hidden", "true");

                // Indicates that the dropdown list is currently collapsed
                self.dropdownContainer.attr("aria-expanded", "false");

            }

        });

        // Maintains chainability
        return self;

    };

    // Copy Attributes Module
    // ======================

    // addSelectBoxAttributes
    // ----------------------
    //      Add's all attributes (excluding id, class names, and the style attribute) from the default select box to the new drop down

    selectBoxIt._addSelectBoxAttributes = function() {

        // Stores the plugin context inside of the self variable
        var self = this;

        // Add's all attributes to the currently traversed drop down option
        self._addAttributes(self.selectBox.prop("attributes"), self.dropdown);

        // Add's all attributes to the drop down items list
        self.selectItems.each(function(iterator) {

            // Add's all attributes to the currently traversed drop down option
            self._addAttributes($(this).prop("attributes"), self.listItems.eq(iterator));

        });

        // Maintains chainability
        return self;

    };

    // addAttributes
    // -------------
    //  Add's attributes to a DOM element
    selectBoxIt._addAttributes = function(arr, elem) {

        // Stores the plugin context inside of the self variable
        var self = this,
            whitelist = self.options["copyAttributes"];

        // If there are array properties
        if(arr.length) {

            // Iterates over all of array properties
            $.each(arr, function(iterator, property) {

                // Get's the property name and property value of each property
                var propName = (property.name).toLowerCase(), propValue = property.value;

                // If the currently traversed property value is not "null", is on the whitelist, or is an HTML 5 data attribute
                if(propValue !== "null" && ($.inArray(propName, whitelist) !== -1 || propName.indexOf("data") !== -1)) {

                    // Set's the currently traversed property on element
                    elem.attr(propName, propValue);

                }

            });

        }

        // Maintains chainability
        return self;

    };
// Destroy Module
// ==============

// Destroy
// -------
//    Removes the plugin from the page

selectBoxIt.destroy = function(callback) {

    // Stores the plugin context inside of the self variable
    var self = this;

    self._destroySelectBoxIt();

    // Calls the jQueryUI Widget Factory destroy method
    self.widgetProto.destroy.call(self);

    // Provides callback function support
    self._callbackSupport(callback);

    // Maintains chainability
    return self;

};

// Internal Destroy Method
// -----------------------
//    Removes the plugin from the page

selectBoxIt._destroySelectBoxIt = function() {

    // Stores the plugin context inside of the self variable
    var self = this;

    // Unbinds all of the dropdown list event handlers with the `selectBoxIt` namespace
    self.dropdown.off(".selectBoxIt");

    // If the original select box has been placed inside of the new drop down container
    if ($.contains(self.dropdownContainer[0], self.originalElem)) {

        // Moves the original select box before the drop down container
        self.dropdownContainer.before(self.selectBox);

    }

    // Remove all of the `selectBoxIt` DOM elements from the page
    self.dropdownContainer.remove();

    // Resets the style attributes for the original select box
    self.selectBox.removeAttr("style").attr("style", self.selectBoxStyles);

    // Shows the original dropdown list
    self.selectBox.show();

    // Triggers the custom `destroy` event on the original select box
    self.triggerEvent("destroy");

    // Maintains chainability
    return self;

};

    // Disable Module
    // ==============

    // Disable
    // -------
    //      Disables the new dropdown list

    selectBoxIt.disable = function(callback) {

        var self = this;

        if(!self.options["disabled"]) {

            // Makes sure the dropdown list is closed
            self.close();

            // Sets the `disabled` attribute on the original select box
            self.selectBox.attr("disabled", "disabled");

            // Makes the dropdown list not focusable by removing the `tabindex` attribute
            self.dropdown.removeAttr("tabindex").

            // Disables styling for enabled state
            removeClass(self.theme["enabled"]).

            // Enabled styling for disabled state
            addClass(self.theme["disabled"]);

            self.setOption("disabled", true);

            // Triggers a `disable` custom event on the original select box
            self.triggerEvent("disable");

        }

        // Provides callback function support
        self._callbackSupport(callback);

        // Maintains chainability
        return self;

    };

    // Disable Option
    // --------------
    //      Disables a single drop down option

    selectBoxIt.disableOption = function(index, callback) {

        var self = this, currentSelectBoxOption, hasNextEnabled, hasPreviousEnabled, type = $.type(index);

        // If an index is passed to target an indropdownidual drop down option
        if(type === "number") {

            // Makes sure the dropdown list is closed
            self.close();

            // The select box option being targeted
            currentSelectBoxOption = self.selectBox.find("option").eq(index);

            // Triggers a `disable-option` custom event on the original select box and passes the disabled option
            self.triggerEvent("disable-option");

            // Disables the targeted select box option
            currentSelectBoxOption.attr("disabled", "disabled");

            // Disables the drop down option
            self.listItems.eq(index).attr("data-disabled", "true").

            // Applies disabled styling for the drop down option
            addClass(self.theme["disabled"]);

            // If the currently selected drop down option is the item being disabled
            if(self.currentFocus === index) {

                hasNextEnabled = self.listItems.eq(self.currentFocus).nextAll("li").not("[data-disabled='true']").first().length;

                hasPreviousEnabled = self.listItems.eq(self.currentFocus).prevAll("li").not("[data-disabled='true']").first().length;

                // If there is a currently enabled option beneath the currently selected option
                if(hasNextEnabled) {

                    // Selects the option beneath the currently selected option
                    self.moveDown();

                }

                // If there is a currently enabled option above the currently selected option
                else if(hasPreviousEnabled) {

                    // Selects the option above the currently selected option
                    self.moveUp();

                }

                // If there is not a currently enabled option
                else {

                    // Disables the entire drop down list
                    self.disable();

                }

            }

        }

        // Provides callback function support
        self._callbackSupport(callback);

        // Maintains chainability
        return self;

    };

    // _Is Disabled
    // -----------
    //      Checks the original select box for the
    //    disabled attribute

    selectBoxIt._isDisabled = function(callback) {

        var self = this;

        // If the original select box is disabled
        if (self.originalElem.disabled) {

            // Disables the dropdown list
            self.disable();

        }

        // Maintains chainability
        return self;

    };

    // Dynamic Positioning Module
    // ==========================

    // _Dynamic positioning
    // --------------------
    //      Dynamically positions the dropdown list options list

    selectBoxIt._dynamicPositioning = function() {

        var self = this;

        // If the `size` option is a number
        if($.type(self.listSize) === "number") {

            // Set's the max-height of the drop down list
            self.list.css("max-height", self.maxHeight || "none");

        }

        // If the `size` option is not a number
        else {

            // Returns the x and y coordinates of the dropdown list options list relative to the document
            var listOffsetTop = self.dropdown.offset().top,

                // The height of the dropdown list options list
                listHeight = self.list.data("max-height") || self.list.outerHeight(),

                // The height of the dropdown list DOM element
                selectBoxHeight = self.dropdown.outerHeight(),

                viewport = self.options["viewport"],

                viewportHeight = viewport.height(),

                viewportScrollTop = $.isWindow(viewport.get(0)) ? viewport.scrollTop() : viewport.offset().top,

                topToBottom = (listOffsetTop + selectBoxHeight + listHeight <= viewportHeight + viewportScrollTop),

                bottomReached = !topToBottom;

            if(!self.list.data("max-height")) {

              self.list.data("max-height", self.list.outerHeight());

            }

            // If there is room on the bottom of the viewport to display the drop down options
            if (!bottomReached) {

                self.list.css("max-height", listHeight);

                // Sets custom CSS properties to place the dropdown list options directly below the dropdown list
                self.list.css("top", "auto");

            }

            // If there is room on the top of the viewport
            else if((self.dropdown.offset().top - viewportScrollTop) >= listHeight) {

                self.list.css("max-height", listHeight);

                // Sets custom CSS properties to place the dropdown list options directly above the dropdown list
                self.list.css("top", (self.dropdown.position().top - self.list.outerHeight()));

            }

            // If there is not enough room on the top or the bottom
            else {

                var outsideBottomViewport = Math.abs((listOffsetTop + selectBoxHeight + listHeight) - (viewportHeight + viewportScrollTop)),

                    outsideTopViewport = Math.abs((self.dropdown.offset().top - viewportScrollTop) - listHeight);

                // If there is more room on the bottom
                if(outsideBottomViewport < outsideTopViewport) {

                    self.list.css("max-height", listHeight - outsideBottomViewport - (selectBoxHeight/2));

                    self.list.css("top", "auto");

                }

                // If there is more room on the top
                else {

                    self.list.css("max-height", listHeight - outsideTopViewport - (selectBoxHeight/2));

                    // Sets custom CSS properties to place the dropdown list options directly above the dropdown list
                    self.list.css("top", (self.dropdown.position().top - self.list.outerHeight()));

                }

            }

        }

        // Maintains chainability
        return self;

    };

    // Enable Module
    // =============

    // Enable
    // ------
    //      Enables the new dropdown list

    selectBoxIt.enable = function(callback) {

        var self = this;

        if(self.options["disabled"]) {

            // Triggers a `enable` custom event on the original select box
            self.triggerEvent("enable");

            // Removes the `disabled` attribute from the original dropdown list
            self.selectBox.removeAttr("disabled");

            // Make the dropdown list focusable
            self.dropdown.attr("tabindex", 0).

            // Disable styling for disabled state
            removeClass(self.theme["disabled"]).

            // Enables styling for enabled state
            addClass(self.theme["enabled"]);

            self.setOption("disabled", false);

            // Provide callback function support
            self._callbackSupport(callback);

        }

        // Maintains chainability
        return self;

    };

    // Enable Option
    // -------------
    //      Disables a single drop down option

    selectBoxIt.enableOption = function(index, callback) {

        var self = this, currentSelectBoxOption, currentIndex = 0, hasNextEnabled, hasPreviousEnabled, type = $.type(index);

        // If an index is passed to target an indropdownidual drop down option
        if(type === "number") {

            // The select box option being targeted
            currentSelectBoxOption = self.selectBox.find("option").eq(index);

            // Triggers a `enable-option` custom event on the original select box and passes the enabled option
            self.triggerEvent("enable-option");

            // Disables the targeted select box option
            currentSelectBoxOption.removeAttr("disabled");

            // Disables the drop down option
            self.listItems.eq(index).attr("data-disabled", "false").

            // Applies disabled styling for the drop down option
            removeClass(self.theme["disabled"]);

        }

        // Provides callback function support
        self._callbackSupport(callback);

        // Maintains chainability
        return self;

    };

    // Keyboard Navigation Module
    // ==========================

    // Move Down
    // ---------
    //      Handles the down keyboard navigation logic

    selectBoxIt.moveDown = function(callback) {

        var self = this;

        // Increments `currentFocus`, which represents the currently focused list item `id` attribute.
        self.currentFocus += 1;

        // Determines whether the dropdown option the user is trying to go to is currently disabled
        var disabled = self.listItems.eq(self.currentFocus).attr("data-disabled") === "true" ? true: false,

            hasNextEnabled = self.listItems.eq(self.currentFocus).nextAll("li").not("[data-disabled='true']").first().length;

        // If the user has reached the top of the list
        if (self.currentFocus === self.listItems.length) {

            // Does not allow the user to continue to go up the list
            self.currentFocus -= 1;

        }

        // If the option the user is trying to go to is disabled, but there is another enabled option
        else if (disabled && hasNextEnabled) {

            // Blur the previously selected option
            self.listItems.eq(self.currentFocus - 1).blur();

           // Call the `moveDown` method again
            self.moveDown();

            // Exit the method
            return;

        }

        // If the option the user is trying to go to is disabled, but there is not another enabled option
        else if (disabled && !hasNextEnabled) {

            self.currentFocus -= 1;

        }

        // If the user has not reached the bottom of the unordered list
        else {

            // Blurs the previously focused list item
            // The jQuery `end()` method allows you to continue chaining while also using a different selector
            self.listItems.eq(self.currentFocus - 1).blur().end().

            // Focuses the currently focused list item
            eq(self.currentFocus).focusin();

            // Calls `scrollToView` to make sure the `scrollTop` is correctly updated. The `down` user action
            self._scrollToView("down");

            // Triggers the custom `moveDown` event on the original select box
            self.triggerEvent("moveDown");

        }

        // Provide callback function support
        self._callbackSupport(callback);

        // Maintains chainability
        return self;

    };

    // Move Up
    // ------
    //      Handles the up keyboard navigation logic
    selectBoxIt.moveUp = function(callback) {

        var self = this;

        // Increments `currentFocus`, which represents the currently focused list item `id` attribute.
        self.currentFocus -= 1;

        // Determines whether the dropdown option the user is trying to go to is currently disabled
        var disabled = self.listItems.eq(self.currentFocus).attr("data-disabled") === "true" ? true: false,

            hasPreviousEnabled = self.listItems.eq(self.currentFocus).prevAll("li").not("[data-disabled='true']").first().length;

        // If the user has reached the top of the list
        if (self.currentFocus === -1) {

            // Does not allow the user to continue to go up the list
            self.currentFocus += 1;

        }

        // If the option the user is trying to go to is disabled and the user is not trying to go up after the user has reached the top of the list
        else if (disabled && hasPreviousEnabled) {

            // Blur the previously selected option
            self.listItems.eq(self.currentFocus + 1).blur();

            // Call the `moveUp` method again
            self.moveUp();

            // Exits the method
            return;

        }

        else if (disabled && !hasPreviousEnabled) {

            self.currentFocus += 1;

        }

        // If the user has not reached the top of the unordered list
        else {

            // Blurs the previously focused list item
            // The jQuery `end()` method allows you to continue chaining while also using a different selector
            self.listItems.eq(this.currentFocus + 1).blur().end().

            // Focuses the currently focused list item
            eq(self.currentFocus).focusin();

            // Calls `scrollToView` to make sure the `scrollTop` is correctly updated. The `down` user action
            self._scrollToView("up");

            // Triggers the custom `moveDown` event on the original select box
            self.triggerEvent("moveUp");

        }

        // Provide callback function support
        self._callbackSupport(callback);

        // Maintains chainability
        return self;

    };

    // Keyboard Search Module
    // ======================

    // _Set Current Search Option
    // -------------------------
    //      Sets the currently selected dropdown list search option

    selectBoxIt._setCurrentSearchOption = function(currentOption) {

        var self = this;

        // Does not change the current option if `showFirstOption` is false and the matched search item is the hidden first option.
        // Otherwise, the current option value is updated
        if ((self.options["aggressiveChange"] || self.options["selectWhenHidden"] || self.listItems.eq(currentOption).is(":visible")) && self.listItems.eq(currentOption).data("disabled") !== true) {

            // Calls the `blur` event of the currently selected dropdown list option
            self.listItems.eq(self.currentFocus).blur();

            // Sets `currentIndex` to the currently selected dropdown list option
            self.currentIndex = currentOption;

            // Sets `currentFocus` to the currently selected dropdown list option
            self.currentFocus = currentOption;

            // Focuses the currently selected dropdown list option
            self.listItems.eq(self.currentFocus).focusin();

            // Updates the scrollTop so that the currently selected dropdown list option is visible to the user
            self._scrollToView("search");

            // Triggers the custom `search` event on the original select box
            self.triggerEvent("search");

        }

        // Maintains chainability
        return self;

    };

    // _Search Algorithm
    // -----------------
    //      Uses regular expressions to find text matches
    selectBoxIt._searchAlgorithm = function(currentIndex, alphaNumeric) {

        var self = this,

            // Boolean to determine if a pattern match exists
            matchExists = false,

            // Iteration variable used in the outermost for loop
            x,

            // Iteration variable used in the nested for loop
            y,

            // Variable used to cache the length of the text array (Small enhancement to speed up traversing)
            arrayLength,

            // Variable storing the current search
            currentSearch,

            // Variable storing the textArray property
            textArray = self.textArray,

            // Variable storing the current text property
            currentText = self.currentText;

        // Loops through the text array to find a pattern match
        for (x = currentIndex, arrayLength = textArray.length; x < arrayLength; x += 1) {

            currentSearch = textArray[x];

            // Nested for loop to help search for a pattern match with the currently traversed array item
            for (y = 0; y < arrayLength; y += 1) {

                // Searches for a match
                if (textArray[y].search(alphaNumeric) !== -1) {

                    // `matchExists` is set to true if there is a match
                    matchExists = true;

                    // Exits the nested for loop
                    y = arrayLength;

                }

            } // End nested for loop

            // If a match does not exist
            if (!matchExists) {

                // Sets the current text to the last entered character
                self.currentText = self.currentText.charAt(self.currentText.length - 1).

                // Escapes the regular expression to make sure special characters are seen as literal characters instead of special commands
                replace(/[|()\[{.+*?$\\]/g, "\\$0");

                currentText = self.currentText;

            }

            // Resets the regular expression with the new value of `self.currentText`
            alphaNumeric = new RegExp(currentText, "gi");

            // Searches based on the first letter of the dropdown list options text if the currentText < 3 characters
            if (currentText.length < 3) {

                alphaNumeric = new RegExp(currentText.charAt(0), "gi");

                // If there is a match based on the first character
                if ((currentSearch.charAt(0).search(alphaNumeric) !== -1)) {

                    // Sets properties of that dropdown list option to make it the currently selected option
                    self._setCurrentSearchOption(x);

                    if((currentSearch.substring(0, currentText.length).toLowerCase() !== currentText.toLowerCase()) || self.options["similarSearch"]) {

                        // Increments the current index by one
                        self.currentIndex += 1;

                    }

                    // Exits the search
                    return false;

                }

            }

            // If `self.currentText` > 1 character
            else {

                // If there is a match based on the entire string
                if ((currentSearch.search(alphaNumeric) !== -1)) {

                    // Sets properties of that dropdown list option to make it the currently selected option
                    self._setCurrentSearchOption(x);

                    // Exits the search
                    return false;

                }

            }

            // If the current text search is an exact match
            if (currentSearch.toLowerCase() === self.currentText.toLowerCase()) {

                // Sets properties of that dropdown list option to make it the currently selected option
                self._setCurrentSearchOption(x);

                // Resets the current text search to a blank string to start fresh again
                self.currentText = "";

                // Exits the search
                return false;

            }

        }

       // Returns true if there is not a match at all
        return true;

    };

    // Search
    // ------
    //      Calls searchAlgorithm()
    selectBoxIt.search = function(alphaNumericKey, callback, rememberPreviousSearch) {

        var self = this;

        // If the search method is being called internally by the plugin, and not externally as a method by a user
        if (rememberPreviousSearch) {

            // Continued search with history from past searches.  Properly escapes the regular expression
            self.currentText += alphaNumericKey.replace(/[|()\[{.+*?$\\]/g, "\\$0");

        }

        else {

            // Brand new search.  Properly escapes the regular expression
            self.currentText = alphaNumericKey.replace(/[|()\[{.+*?$\\]/g, "\\$0");

        }

        // Searches globally
        var searchResults = self._searchAlgorithm(self.currentIndex, new RegExp(self.currentText, "gi"));

        // Searches the list again if a match is not found.  This is needed, because the first search started at the array indece of the currently selected dropdown list option, and does not search the options before the current array indece.
        // If there are many similar dropdown list options, starting the search at the indece of the currently selected dropdown list option is needed to properly traverse the text array.
        if (searchResults) {

            // Searches the dropdown list values starting from the beginning of the text array
            self._searchAlgorithm(0, self.currentText);

        }

        // Provide callback function support
        self._callbackSupport(callback);

        // Maintains chainability
        return self;

    };

    // Mobile Module
    // =============

    // Set Mobile Text
    // ---------------
    //      Updates the text of the drop down
    selectBoxIt._updateMobileText = function() {

        var self = this,
            currentOption,
            currentDataText,
            currentText;

        currentOption = self.selectBox.find("option").filter(":selected");

        currentDataText = currentOption.attr("data-text");

        currentText = currentDataText ? currentDataText: currentOption.text();

        // Sets the new dropdown list text to the value of the original dropdown list
        self._setText(self.dropdownText, currentText);

        if(self.list.find('li[data-val="' + currentOption.val() + '"]').find("i").attr("class")) {

           self.dropdownImage.attr("class", self.list.find('li[data-val="' + currentOption.val() + '"]').find("i").attr("class")).addClass("selectboxit-default-icon");

        }

    };

    // Apply Native Select
    // -------------------
    //      Applies the original select box directly over the new drop down

    selectBoxIt._applyNativeSelect = function() {

        // Stores the plugin context inside of the self variable
        var self = this;

        // Appends the native select box to the drop down (allows for relative positioning using the position() method)
        self.dropdownContainer.append(self.selectBox);

        self.dropdown.attr("tabindex", "-1");

        // Positions the original select box directly over top the new dropdown list using position absolute and "hides" the original select box using an opacity of 0.  This allows the mobile browser "wheel" interface for better usability.
        self.selectBox.css({

            "display": "block",

            "visibility": "visible",

            "width": self._realOuterWidth(self.dropdown),

            "height": self.dropdown.outerHeight(),

            "opacity": "0",

            "position": "absolute",

            "top": "0",

            "left": "0",

            "cursor": "pointer",

            "z-index": "999999",

            "margin": self.dropdown.css("margin"),

            "padding": "0",

            "-webkit-appearance": "menulist-button"

        });

        if(self.originalElem.disabled) {

            self.triggerEvent("disable");

        }

        return this;

    };

    // Mobile Events
    // -------------
    //      Listens to mobile-specific events
    selectBoxIt._mobileEvents = function() {

        var self = this;

        self.selectBox.on({

            "changed.selectBoxIt": function() {

                self.hasChanged = true;

                self._updateMobileText();

                // Triggers the `option-click` event on mobile
                self.triggerEvent("option-click");

            },

            "mousedown.selectBoxIt": function() {

                // If the select box has not been changed, the defaultText option is being used
                if(!self.hasChanged && self.options.defaultText && !self.originalElem.disabled) {

                    self._updateMobileText();

                    self.triggerEvent("option-click");

                }

            },

            "enable.selectBoxIt": function() {

                // Moves SelectBoxIt onto the page
                self.selectBox.removeClass('selectboxit-rendering');

            },

            "disable.selectBoxIt": function() {

                // Moves SelectBoxIt off the page
                self.selectBox.addClass('selectboxit-rendering');

            }

        });

    };

    // Mobile
    // ------
    //      Applies the native "wheel" interface when a mobile user is interacting with the dropdown

    selectBoxIt._mobile = function(callback) {

        // Stores the plugin context inside of the self variable
        var self = this;

            if(self.isMobile) {

                self._applyNativeSelect();

                self._mobileEvents();

            }

            // Maintains chainability
            return this;

    };

    // Remove Options Module
    // =====================

    // remove
    // ------
    //    Removes drop down list options
    //    using an index

    selectBoxIt.remove = function(indexes, callback) {

        var self = this,
            dataType = $.type(indexes),
            value,
            x = 0,
            dataLength,
            elems = "";

        // If an array is passed in
        if(dataType === "array") {

            // Loops through the array
            for(dataLength = indexes.length; x <= dataLength - 1; x += 1) {

                // Stores the currently traversed array item in the local `value` variable
                value = indexes[x];

                // If the currently traversed array item is an object literal
                if($.type(value) === "number") {

                    if(elems.length) {

                        // Adds an element to the removal string
                        elems += ", option:eq(" + value + ")";

                    }

                    else {

                        // Adds an element to the removal string
                        elems += "option:eq(" + value + ")";

                    }

                }

            }

            // Removes all of the appropriate options from the select box
            self.selectBox.find(elems).remove();

        }

        // If a number is passed in
        else if(dataType === "number") {

            self.selectBox.find("option").eq(indexes).remove();

        }

        // If anything besides a number or array is passed in
        else {

            // Removes all of the options from the original select box
            self.selectBox.find("option").remove();

        }

        // If the dropdown property exists
        if(self.dropdown) {

            // Rebuilds the dropdown
            self.refresh(function() {

                // Provide callback function support
                self._callbackSupport(callback);

            }, true);

        } else {

            // Provide callback function support
            self._callbackSupport(callback);

        }

        // Maintains chainability
        return self;

    };

    // Select Option Module
    // ====================

    // Select Option
    // -------------
    //      Programatically selects a drop down option by either index or value

    selectBoxIt.selectOption = function(val, callback) {

        // Stores the plugin context inside of the self variable
        var self = this,
            type = $.type(val);

        // Makes sure the passed in position is a number
        if(type === "number") {

            // Set's the original select box value and triggers the change event (which SelectBoxIt listens for)
            self.selectBox.val(self.selectItems.eq(val).val()).change();

        }

        else if(type === "string") {

            // Set's the original select box value and triggers the change event (which SelectBoxIt listens for)
            self.selectBox.val(val).change();

        }

        // Calls the callback function
        self._callbackSupport(callback);

        // Maintains chainability
        return self;

    };

    // Set Option Module
    // =================

    // Set Option
    // ----------
    //      Accepts an string key, a value, and a callback function to replace a single
    //      property of the plugin options object

    selectBoxIt.setOption = function(key, value, callback) {

        var self = this;

        //Makes sure a string is passed in
        if($.type(key) === "string") {

            // Sets the plugin option to the new value provided by the user
            self.options[key] = value;

        }

        // Rebuilds the dropdown
        self.refresh(function() {

            // Provide callback function support
            self._callbackSupport(callback);

        }, true);

        // Maintains chainability
        return self;

    };

    // Set Options Module
    // ==================

    // Set Options
    // ----------
    //      Accepts an object to replace plugin options
    //      properties of the plugin options object

    selectBoxIt.setOptions = function(newOptions, callback) {

        var self = this;

        // If the passed in parameter is an object literal
        if($.isPlainObject(newOptions)) {

            self.options = $.extend({}, self.options, newOptions);

        }

        // Rebuilds the dropdown
        self.refresh(function() {

            // Provide callback function support
            self._callbackSupport(callback);

        }, true);

        // Maintains chainability
        return self;

    };

    // Wait Module
    // ===========

    // Wait
    // ----
    //    Delays execution by the amount of time
    //    specified by the parameter

    selectBoxIt.wait = function(time, callback) {

        var self = this;

        self.widgetProto._delay.call(self, callback, time);

        // Maintains chainability
        return self;

    };
})); // End of all modules


/* 3 */

/**
 * BxSlider v4.1.2 - Fully loaded, responsive content slider
 * http://bxslider.com
 *
 * Copyright 2014, Steven Wanderski - http://stevenwanderski.com - http://bxcreative.com
 * Written while drinking Belgian ales and listening to jazz
 *
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */

;(function($){

	var plugin = {};

	var defaults = {

		// GENERAL
		mode: 'horizontal',
		slideSelector: '',
		infiniteLoop: true,
		hideControlOnEnd: false,
		speed: 500,
		easing: null,
		slideMargin: 0,
		startSlide: 0,
		randomStart: false,
		captions: false,
		ticker: false,
		tickerHover: false,
		adaptiveHeight: false,
		adaptiveHeightSpeed: 500,
		video: false,
		useCSS: true,
		preloadImages: 'visible',
		responsive: true,
		slideZIndex: 50,
		wrapperClass: 'bx-wrapper',

		// TOUCH
		touchEnabled: true,
		swipeThreshold: 50,
		oneToOneTouch: true,
		preventDefaultSwipeX: true,
		preventDefaultSwipeY: false,

		// PAGER
		pager: true,
		pagerType: 'full',
		pagerShortSeparator: ' / ',
		pagerSelector: null,
		buildPager: null,
		pagerCustom: null,

		// CONTROLS
		controls: true,
		nextText: 'Next',
		prevText: 'Prev',
		nextSelector: null,
		prevSelector: null,
		autoControls: false,
		startText: 'Start',
		stopText: 'Stop',
		autoControlsCombine: false,
		autoControlsSelector: null,

		// AUTO
		auto: false,
		pause: 4000,
		autoStart: true,
		autoDirection: 'next',
		autoHover: false,
		autoDelay: 0,
		autoSlideForOnePage: false,

		// CAROUSEL
		minSlides: 1,
		maxSlides: 1,
		moveSlides: 0,
		slideWidth: 0,

		// CALLBACKS
		onSliderLoad: function() {},
		onSlideBefore: function() {},
		onSlideAfter: function() {},
		onSlideNext: function() {},
		onSlidePrev: function() {},
		onSliderResize: function() {}
	}

	$.fn.bxSlider = function(options){

		if(this.length == 0) return this;

		// support mutltiple elements
		if(this.length > 1){
			this.each(function(){$(this).bxSlider(options)});
			return this;
		}

		// create a namespace to be used throughout the plugin
		var slider = {};
		// set a reference to our slider element
		var el = this;
		plugin.el = this;

		/**
		 * Makes slideshow responsive
		 */
		// first get the original window dimens (thanks alot IE)
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();



		/**
		 * ===================================================================================
		 * = PRIVATE FUNCTIONS
		 * ===================================================================================
		 */

		/**
		 * Initializes namespace settings to be used throughout plugin
		 */
		var init = function(){
			// merge user-supplied options with the defaults
			slider.settings = $.extend({}, defaults, options);
			// parse slideWidth setting
			slider.settings.slideWidth = parseInt(slider.settings.slideWidth);
			// store the original children
			slider.children = el.children(slider.settings.slideSelector);
			// check if actual number of slides is less than minSlides / maxSlides
			if(slider.children.length < slider.settings.minSlides) slider.settings.minSlides = slider.children.length;
			if(slider.children.length < slider.settings.maxSlides) slider.settings.maxSlides = slider.children.length;
			// if random start, set the startSlide setting to random number
			if(slider.settings.randomStart) slider.settings.startSlide = Math.floor(Math.random() * slider.children.length);
			// store active slide information
			slider.active = { index: slider.settings.startSlide }
			// store if the slider is in carousel mode (displaying / moving multiple slides)
			slider.carousel = slider.settings.minSlides > 1 || slider.settings.maxSlides > 1;
			// if carousel, force preloadImages = 'all'
			if(slider.carousel) slider.settings.preloadImages = 'all';
			// calculate the min / max width thresholds based on min / max number of slides
			// used to setup and update carousel slides dimensions
			slider.minThreshold = (slider.settings.minSlides * slider.settings.slideWidth) + ((slider.settings.minSlides - 1) * slider.settings.slideMargin);
			slider.maxThreshold = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
			// store the current state of the slider (if currently animating, working is true)
			slider.working = false;
			// initialize the controls object
			slider.controls = {};
			// initialize an auto interval
			slider.interval = null;
			// determine which property to use for transitions
			slider.animProp = slider.settings.mode == 'vertical' ? 'top' : 'left';
			// determine if hardware acceleration can be used
			slider.usingCSS = slider.settings.useCSS && slider.settings.mode != 'fade' && (function(){
				// create our test div element
				var div = document.createElement('div');
				// css transition properties
				var props = ['WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
				// test for each property
				for(var i in props){
					if(div.style[props[i]] !== undefined){
						slider.cssPrefix = props[i].replace('Perspective', '').toLowerCase();
						slider.animProp = '-' + slider.cssPrefix + '-transform';
						return true;
					}
				}
				return false;
			}());
			// if vertical mode always make maxSlides and minSlides equal
			if(slider.settings.mode == 'vertical') slider.settings.maxSlides = slider.settings.minSlides;
			// save original style data
			el.data("origStyle", el.attr("style"));
			el.children(slider.settings.slideSelector).each(function() {
			  $(this).data("origStyle", $(this).attr("style"));
			});
			// perform all DOM / CSS modifications
			setup();
		}

		/**
		 * Performs all DOM and CSS modifications
		 */
		var setup = function(){
			// wrap el in a wrapper
			el.wrap('<div class="' + slider.settings.wrapperClass + '"><div class="bx-viewport"></div></div>');
			// store a namspace reference to .bx-viewport
			slider.viewport = el.parent();
			// add a loading div to display while images are loading
			slider.loader = $('<div class="bx-loading" />');
			slider.viewport.prepend(slider.loader);
			// set el to a massive width, to hold any needed slides
			// also strip any margin and padding from el
			el.css({
				width: slider.settings.mode == 'horizontal' ? (slider.children.length * 100 + 215) + '%' : 'auto',
				position: 'relative'
			});
			// if using CSS, add the easing property
			if(slider.usingCSS && slider.settings.easing){
				el.css('-' + slider.cssPrefix + '-transition-timing-function', slider.settings.easing);
			// if not using CSS and no easing value was supplied, use the default JS animation easing (swing)
			}else if(!slider.settings.easing){
				slider.settings.easing = 'swing';
			}
			var slidesShowing = getNumberSlidesShowing();
			// make modifications to the viewport (.bx-viewport)
			slider.viewport.css({
				width: '100%',
				overflow: 'hidden',
				position: 'relative'
			});
			slider.viewport.parent().css({
				maxWidth: getViewportMaxWidth()
			});
			// make modification to the wrapper (.bx-wrapper)
			if(!slider.settings.pager) {
				slider.viewport.parent().css({
				margin: '0'
				});
			}
			// apply css to all slider children
			slider.children.css({
				'float': slider.settings.mode == 'horizontal' ? 'left' : 'none',
				listStyle: 'none',
				position: 'relative'
			});
			// apply the calculated width after the float is applied to prevent scrollbar interference
			slider.children.css('width', getSlideWidth());
			// if slideMargin is supplied, add the css
			if(slider.settings.mode == 'horizontal' && slider.settings.slideMargin > 0) slider.children.css('marginRight', slider.settings.slideMargin);
			if(slider.settings.mode == 'vertical' && slider.settings.slideMargin > 0) slider.children.css('marginBottom', slider.settings.slideMargin);
			// if "fade" mode, add positioning and z-index CSS
			if(slider.settings.mode == 'fade'){
				slider.children.css({
					position: 'absolute',
					zIndex: 0,
					display: 'none'
				});
				// prepare the z-index on the showing element
				slider.children.eq(slider.settings.startSlide).css({zIndex: slider.settings.slideZIndex, display: 'block'});
			}
			// create an element to contain all slider controls (pager, start / stop, etc)
			slider.controls.el = $('<div class="bx-controls" />');
			// if captions are requested, add them
			if(slider.settings.captions) appendCaptions();
			// check if startSlide is last slide
			slider.active.last = slider.settings.startSlide == getPagerQty() - 1;
			// if video is true, set up the fitVids plugin
			if(slider.settings.video) el.fitVids();
			// set the default preload selector (visible)
			var preloadSelector = slider.children.eq(slider.settings.startSlide);
			if (slider.settings.preloadImages == "all") preloadSelector = slider.children;
			// only check for control addition if not in "ticker" mode
			if(!slider.settings.ticker){
				// if pager is requested, add it
				if(slider.settings.pager) appendPager();
				// if controls are requested, add them
				if(slider.settings.controls) appendControls();
				// if auto is true, and auto controls are requested, add them
				if(slider.settings.auto && slider.settings.autoControls) appendControlsAuto();
				// if any control option is requested, add the controls wrapper
				if(slider.settings.controls || slider.settings.autoControls || slider.settings.pager) slider.viewport.after(slider.controls.el);
			// if ticker mode, do not allow a pager
			}else{
				slider.settings.pager = false;
			}
			// preload all images, then perform final DOM / CSS modifications that depend on images being loaded
			loadElements(preloadSelector, start);
		}

		var loadElements = function(selector, callback){
			var total = selector.find('img, iframe').length;
			if (total == 0){
				callback();
				return;
			}
			var count = 0;
			selector.find('img, iframe').each(function(){
				$(this).one('load', function() {
				  if(++count == total) callback();
				}).each(function() {
				  if(this.complete) $(this).load();
				});
			});
		}

		/**
		 * Start the slider
		 */
		var start = function(){
			// if infinite loop, prepare additional slides
			if(slider.settings.infiniteLoop && slider.settings.mode != 'fade' && !slider.settings.ticker){
				var slice = slider.settings.mode == 'vertical' ? slider.settings.minSlides : slider.settings.maxSlides;
				var sliceAppend = slider.children.slice(0, slice).clone().addClass('bx-clone');
				var slicePrepend = slider.children.slice(-slice).clone().addClass('bx-clone');
				el.append(sliceAppend).prepend(slicePrepend);
			}
			// remove the loading DOM element
			slider.loader.remove();
			// set the left / top position of "el"
			setSlidePosition();
			// if "vertical" mode, always use adaptiveHeight to prevent odd behavior
			if (slider.settings.mode == 'vertical') slider.settings.adaptiveHeight = true;
			// set the viewport height
			slider.viewport.height(getViewportHeight());
			// make sure everything is positioned just right (same as a window resize)
			el.redrawSlider();
			// onSliderLoad callback
			slider.settings.onSliderLoad(slider.active.index);
			// slider has been fully initialized
			slider.initialized = true;
			// bind the resize call to the window
			if (slider.settings.responsive) $(window).bind('resize', resizeWindow);
			// if auto is true and has more than 1 page, start the show
			if (slider.settings.auto && slider.settings.autoStart && (getPagerQty() > 1 || slider.settings.autoSlideForOnePage)) initAuto();
			// if ticker is true, start the ticker
			if (slider.settings.ticker) initTicker();
			// if pager is requested, make the appropriate pager link active
			if (slider.settings.pager) updatePagerActive(slider.settings.startSlide);
			// check for any updates to the controls (like hideControlOnEnd updates)
			if (slider.settings.controls) updateDirectionControls();
			// if touchEnabled is true, setup the touch events
			if (slider.settings.touchEnabled && !slider.settings.ticker) initTouch();
		}

		/**
		 * Returns the calculated height of the viewport, used to determine either adaptiveHeight or the maxHeight value
		 */
		var getViewportHeight = function(){
			var height = 0;
			// first determine which children (slides) should be used in our height calculation
			var children = $();
			// if mode is not "vertical" and adaptiveHeight is false, include all children
			if(slider.settings.mode != 'vertical' && !slider.settings.adaptiveHeight){
				children = slider.children;
			}else{
				// if not carousel, return the single active child
				if(!slider.carousel){
					children = slider.children.eq(slider.active.index);
				// if carousel, return a slice of children
				}else{
					// get the individual slide index
					var currentIndex = slider.settings.moveSlides == 1 ? slider.active.index : slider.active.index * getMoveBy();
					// add the current slide to the children
					children = slider.children.eq(currentIndex);
					// cycle through the remaining "showing" slides
					for (i = 1; i <= slider.settings.maxSlides - 1; i++){
						// if looped back to the start
						if(currentIndex + i >= slider.children.length){
							children = children.add(slider.children.eq(i - 1));
						}else{
							children = children.add(slider.children.eq(currentIndex + i));
						}
					}
				}
			}
			// if "vertical" mode, calculate the sum of the heights of the children
			if(slider.settings.mode == 'vertical'){
				children.each(function(index) {
				  height += $(this).outerHeight();
				});
				// add user-supplied margins
				if(slider.settings.slideMargin > 0){
					height += slider.settings.slideMargin * (slider.settings.minSlides - 1);
				}
			// if not "vertical" mode, calculate the max height of the children
			}else{
				height = Math.max.apply(Math, children.map(function(){
					return $(this).outerHeight(false);
				}).get());
			}

			if(slider.viewport.css('box-sizing') == 'border-box'){
				height +=	parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom')) +
							parseFloat(slider.viewport.css('border-top-width')) + parseFloat(slider.viewport.css('border-bottom-width'));
			}else if(slider.viewport.css('box-sizing') == 'padding-box'){
				height +=	parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom'));
			}

			return height;
		}

		/**
		 * Returns the calculated width to be used for the outer wrapper / viewport
		 */
		var getViewportMaxWidth = function(){
			var width = '100%';
			if(slider.settings.slideWidth > 0){
				if(slider.settings.mode == 'horizontal'){
					width = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
				}else{
					width = slider.settings.slideWidth;
				}
			}
			return width;
		}

		/**
		 * Returns the calculated width to be applied to each slide
		 */
		var getSlideWidth = function(){
			// start with any user-supplied slide width
			var newElWidth = slider.settings.slideWidth;
			// get the current viewport width
			var wrapWidth = slider.viewport.width();
			// if slide width was not supplied, or is larger than the viewport use the viewport width
			if(slider.settings.slideWidth == 0 ||
				(slider.settings.slideWidth > wrapWidth && !slider.carousel) ||
				slider.settings.mode == 'vertical'){
				newElWidth = wrapWidth;
			// if carousel, use the thresholds to determine the width
			}else if(slider.settings.maxSlides > 1 && slider.settings.mode == 'horizontal'){
				if(wrapWidth > slider.maxThreshold){
					// newElWidth = (wrapWidth - (slider.settings.slideMargin * (slider.settings.maxSlides - 1))) / slider.settings.maxSlides;
				}else if(wrapWidth < slider.minThreshold){
					newElWidth = (wrapWidth - (slider.settings.slideMargin * (slider.settings.minSlides - 1))) / slider.settings.minSlides;
				}
			}
			return newElWidth;
		}

		/**
		 * Returns the number of slides currently visible in the viewport (includes partially visible slides)
		 */
		var getNumberSlidesShowing = function(){
			var slidesShowing = 1;
			if(slider.settings.mode == 'horizontal' && slider.settings.slideWidth > 0){
				// if viewport is smaller than minThreshold, return minSlides
				if(slider.viewport.width() < slider.minThreshold){
					slidesShowing = slider.settings.minSlides;
				// if viewport is larger than minThreshold, return maxSlides
				}else if(slider.viewport.width() > slider.maxThreshold){
					slidesShowing = slider.settings.maxSlides;
				// if viewport is between min / max thresholds, divide viewport width by first child width
				}else{
					var childWidth = slider.children.first().width() + slider.settings.slideMargin;
					slidesShowing = Math.floor((slider.viewport.width() +
						slider.settings.slideMargin) / childWidth);
				}
			// if "vertical" mode, slides showing will always be minSlides
			}else if(slider.settings.mode == 'vertical'){
				slidesShowing = slider.settings.minSlides;
			}
			return slidesShowing;
		}

		/**
		 * Returns the number of pages (one full viewport of slides is one "page")
		 */
		var getPagerQty = function(){
			var pagerQty = 0;
			// if moveSlides is specified by the user
			if(slider.settings.moveSlides > 0){
				if(slider.settings.infiniteLoop){
					pagerQty = Math.ceil(slider.children.length / getMoveBy());
				}else{
					// use a while loop to determine pages
					var breakPoint = 0;
					var counter = 0
					// when breakpoint goes above children length, counter is the number of pages
					while (breakPoint < slider.children.length){
						++pagerQty;
						breakPoint = counter + getNumberSlidesShowing();
						counter += slider.settings.moveSlides <= getNumberSlidesShowing() ? slider.settings.moveSlides : getNumberSlidesShowing();
					}
				}
			// if moveSlides is 0 (auto) divide children length by sides showing, then round up
			}else{
				pagerQty = Math.ceil(slider.children.length / getNumberSlidesShowing());
			}
			return pagerQty;
		}

		/**
		 * Returns the number of indivual slides by which to shift the slider
		 */
		var getMoveBy = function(){
			// if moveSlides was set by the user and moveSlides is less than number of slides showing
			if(slider.settings.moveSlides > 0 && slider.settings.moveSlides <= getNumberSlidesShowing()){
				return slider.settings.moveSlides;
			}
			// if moveSlides is 0 (auto)
			return getNumberSlidesShowing();
		}

		/**
		 * Sets the slider's (el) left or top position
		 */
		var setSlidePosition = function(){
			// if last slide, not infinite loop, and number of children is larger than specified maxSlides
			if(slider.children.length > slider.settings.maxSlides && slider.active.last && !slider.settings.infiniteLoop){
				if (slider.settings.mode == 'horizontal'){
					// get the last child's position
					var lastChild = slider.children.last();
					var position = lastChild.position();
					// set the left position
					setPositionProperty(-(position.left - (slider.viewport.width() - lastChild.outerWidth())), 'reset', 0);
				}else if(slider.settings.mode == 'vertical'){
					// get the last showing index's position
					var lastShowingIndex = slider.children.length - slider.settings.minSlides;
					var position = slider.children.eq(lastShowingIndex).position();
					// set the top position
					setPositionProperty(-position.top, 'reset', 0);
				}
			// if not last slide
			}else{
				// get the position of the first showing slide
				var position = slider.children.eq(slider.active.index * getMoveBy()).position();
				// check for last slide
				if (slider.active.index == getPagerQty() - 1) slider.active.last = true;
				// set the repective position
				if (position != undefined){
					if (slider.settings.mode == 'horizontal') setPositionProperty(-position.left, 'reset', 0);
					else if (slider.settings.mode == 'vertical') setPositionProperty(-position.top, 'reset', 0);
				}
			}
		}

		/**
		 * Sets the el's animating property position (which in turn will sometimes animate el).
		 * If using CSS, sets the transform property. If not using CSS, sets the top / left property.
		 *
		 * @param value (int)
		 *  - the animating property's value
		 *
		 * @param type (string) 'slider', 'reset', 'ticker'
		 *  - the type of instance for which the function is being
		 *
		 * @param duration (int)
		 *  - the amount of time (in ms) the transition should occupy
		 *
		 * @param params (array) optional
		 *  - an optional parameter containing any variables that need to be passed in
		 */
		var setPositionProperty = function(value, type, duration, params){
			// use CSS transform
			if(slider.usingCSS){
				// determine the translate3d value
				var propValue = slider.settings.mode == 'vertical' ? 'translate3d(0, ' + value + 'px, 0)' : 'translate3d(' + value + 'px, 0, 0)';
				// add the CSS transition-duration
				el.css('-' + slider.cssPrefix + '-transition-duration', duration / 1000 + 's');
				if(type == 'slide'){
					// set the property value
					el.css(slider.animProp, propValue);
					// bind a callback method - executes when CSS transition completes
					el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(){
						// unbind the callback
						el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
						updateAfterSlideTransition();
					});
				}else if(type == 'reset'){
					el.css(slider.animProp, propValue);
				}else if(type == 'ticker'){
					// make the transition use 'linear'
					el.css('-' + slider.cssPrefix + '-transition-timing-function', 'linear');
					el.css(slider.animProp, propValue);
					// bind a callback method - executes when CSS transition completes
					el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(){
						// unbind the callback
						el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
						// reset the position
						setPositionProperty(params['resetValue'], 'reset', 0);
						// start the loop again
						tickerLoop();
					});
				}
			// use JS animate
			}else{
				var animateObj = {};
				animateObj[slider.animProp] = value;
				if(type == 'slide'){
					el.animate(animateObj, duration, slider.settings.easing, function(){
						updateAfterSlideTransition();
					});
				}else if(type == 'reset'){
					el.css(slider.animProp, value)
				}else if(type == 'ticker'){
					el.animate(animateObj, speed, 'linear', function(){
						setPositionProperty(params['resetValue'], 'reset', 0);
						// run the recursive loop after animation
						tickerLoop();
					});
				}
			}
		}

		/**
		 * Populates the pager with proper amount of pages
		 */
		var populatePager = function(){
			var pagerHtml = '';
			var pagerQty = getPagerQty();
			// loop through each pager item
			for(var i=0; i < pagerQty; i++){
				var linkContent = '';
				// if a buildPager function is supplied, use it to get pager link value, else use index + 1
				if(slider.settings.buildPager && $.isFunction(slider.settings.buildPager)){
					linkContent = slider.settings.buildPager(i);
					slider.pagerEl.addClass('bx-custom-pager');
				}else{
					linkContent = i + 1;
					slider.pagerEl.addClass('bx-default-pager');
				}
				// var linkContent = slider.settings.buildPager && $.isFunction(slider.settings.buildPager) ? slider.settings.buildPager(i) : i + 1;
				// add the markup to the string
				pagerHtml += '<div class="bx-pager-item"><a href="" data-slide-index="' + i + '" class="bx-pager-link">' + linkContent + '</a></div>';
			};
			// populate the pager element with pager links
			slider.pagerEl.html(pagerHtml);
		}

		/**
		 * Appends the pager to the controls element
		 */
		var appendPager = function(){
			if(!slider.settings.pagerCustom){
				// create the pager DOM element
				slider.pagerEl = $('<div class="bx-pager" />');
				// if a pager selector was supplied, populate it with the pager
				if(slider.settings.pagerSelector){
					$(slider.settings.pagerSelector).html(slider.pagerEl);
				// if no pager selector was supplied, add it after the wrapper
				}else{
					slider.controls.el.addClass('bx-has-pager').append(slider.pagerEl);
				}
				// populate the pager
				populatePager();
			}else{
				slider.pagerEl = $(slider.settings.pagerCustom);
			}
			// assign the pager click binding
			slider.pagerEl.on('click', 'a', clickPagerBind);
		}

		/**
		 * Appends prev / next controls to the controls element
		 */
		var appendControls = function(){
			slider.controls.next = $('<a class="bx-next" href="">' + slider.settings.nextText + '</a>');
			slider.controls.prev = $('<a class="bx-prev" href="">' + slider.settings.prevText + '</a>');
			// bind click actions to the controls
			slider.controls.next.bind('click', clickNextBind);
			slider.controls.prev.bind('click', clickPrevBind);
			// if nextSlector was supplied, populate it
			if(slider.settings.nextSelector){
				$(slider.settings.nextSelector).append(slider.controls.next);
			}
			// if prevSlector was supplied, populate it
			if(slider.settings.prevSelector){
				$(slider.settings.prevSelector).append(slider.controls.prev);
			}
			// if no custom selectors were supplied
			if(!slider.settings.nextSelector && !slider.settings.prevSelector){
				// add the controls to the DOM
				slider.controls.directionEl = $('<div class="bx-controls-direction" />');
				// add the control elements to the directionEl
				slider.controls.directionEl.append(slider.controls.prev).append(slider.controls.next);
				// slider.viewport.append(slider.controls.directionEl);
				slider.controls.el.addClass('bx-has-controls-direction').append(slider.controls.directionEl);
			}
		}

		/**
		 * Appends start / stop auto controls to the controls element
		 */
		var appendControlsAuto = function(){
			slider.controls.start = $('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + slider.settings.startText + '</a></div>');
			slider.controls.stop = $('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + slider.settings.stopText + '</a></div>');
			// add the controls to the DOM
			slider.controls.autoEl = $('<div class="bx-controls-auto" />');
			// bind click actions to the controls
			slider.controls.autoEl.on('click', '.bx-start', clickStartBind);
			slider.controls.autoEl.on('click', '.bx-stop', clickStopBind);
			// if autoControlsCombine, insert only the "start" control
			if(slider.settings.autoControlsCombine){
				slider.controls.autoEl.append(slider.controls.start);
			// if autoControlsCombine is false, insert both controls
			}else{
				slider.controls.autoEl.append(slider.controls.start).append(slider.controls.stop);
			}
			// if auto controls selector was supplied, populate it with the controls
			if(slider.settings.autoControlsSelector){
				$(slider.settings.autoControlsSelector).html(slider.controls.autoEl);
			// if auto controls selector was not supplied, add it after the wrapper
			}else{
				slider.controls.el.addClass('bx-has-controls-auto').append(slider.controls.autoEl);
			}
			// update the auto controls
			updateAutoControls(slider.settings.autoStart ? 'stop' : 'start');
		}

		/**
		 * Appends image captions to the DOM
		 */
		var appendCaptions = function(){
			// cycle through each child
			slider.children.each(function(index){
				// get the image title attribute
				var title = $(this).find('img:first').attr('title');
				// append the caption
				if (title != undefined && ('' + title).length) {
                    $(this).append('<div class="bx-caption"><span>' + title + '</span></div>');
                }
			});
		}

		/**
		 * Click next binding
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
		var clickNextBind = function(e){
			// if auto show is running, stop it
			if (slider.settings.auto) el.stopAuto();
			el.goToNextSlide();
			e.preventDefault();
		}

		/**
		 * Click prev binding
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
		var clickPrevBind = function(e){
			// if auto show is running, stop it
			if (slider.settings.auto) el.stopAuto();
			el.goToPrevSlide();
			e.preventDefault();
		}

		/**
		 * Click start binding
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
		var clickStartBind = function(e){
			el.startAuto();
			e.preventDefault();
		}

		/**
		 * Click stop binding
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
		var clickStopBind = function(e){
			el.stopAuto();
			e.preventDefault();
		}

		/**
		 * Click pager binding
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
		var clickPagerBind = function(e){
			// if auto show is running, stop it
			if (slider.settings.auto) el.stopAuto();
			var pagerLink = $(e.currentTarget);
			if(pagerLink.attr('data-slide-index') !== undefined){
				var pagerIndex = parseInt(pagerLink.attr('data-slide-index'));
				// if clicked pager link is not active, continue with the goToSlide call
				if(pagerIndex != slider.active.index) el.goToSlide(pagerIndex);
				e.preventDefault();
			}
		}

		/**
		 * Updates the pager links with an active class
		 *
		 * @param slideIndex (int)
		 *  - index of slide to make active
		 */
		var updatePagerActive = function(slideIndex){
			// if "short" pager type
			var len = slider.children.length; // nb of children
			if(slider.settings.pagerType == 'short'){
				if(slider.settings.maxSlides > 1) {
					len = Math.ceil(slider.children.length/slider.settings.maxSlides);
				}
				slider.pagerEl.html( (slideIndex + 1) + slider.settings.pagerShortSeparator + len);
				return;
			}
			// remove all pager active classes
			slider.pagerEl.find('a').removeClass('active');
			// apply the active class for all pagers
			slider.pagerEl.each(function(i, el) { $(el).find('a').eq(slideIndex).addClass('active'); });
		}

		/**
		 * Performs needed actions after a slide transition
		 */
		var updateAfterSlideTransition = function(){
			// if infinte loop is true
			if(slider.settings.infiniteLoop){
				var position = '';
				// first slide
				if(slider.active.index == 0){
					// set the new position
					position = slider.children.eq(0).position();
				// carousel, last slide
				}else if(slider.active.index == getPagerQty() - 1 && slider.carousel){
					position = slider.children.eq((getPagerQty() - 1) * getMoveBy()).position();
				// last slide
				}else if(slider.active.index == slider.children.length - 1){
					position = slider.children.eq(slider.children.length - 1).position();
				}
				if(position){
					if (slider.settings.mode == 'horizontal') { setPositionProperty(-position.left, 'reset', 0); }
					else if (slider.settings.mode == 'vertical') { setPositionProperty(-position.top, 'reset', 0); }
				}
			}
			// declare that the transition is complete
			slider.working = false;
			// onSlideAfter callback
			slider.settings.onSlideAfter(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
		}

		/**
		 * Updates the auto controls state (either active, or combined switch)
		 *
		 * @param state (string) "start", "stop"
		 *  - the new state of the auto show
		 */
		var updateAutoControls = function(state){
			// if autoControlsCombine is true, replace the current control with the new state
			if(slider.settings.autoControlsCombine){
				slider.controls.autoEl.html(slider.controls[state]);
			// if autoControlsCombine is false, apply the "active" class to the appropriate control
			}else{
				slider.controls.autoEl.find('a').removeClass('active');
				slider.controls.autoEl.find('a:not(.bx-' + state + ')').addClass('active');
			}
		}

		/**
		 * Updates the direction controls (checks if either should be hidden)
		 */
		var updateDirectionControls = function(){
			if(getPagerQty() == 1){
				slider.controls.prev.addClass('disabled');
				slider.controls.next.addClass('disabled');
			}else if(!slider.settings.infiniteLoop && slider.settings.hideControlOnEnd){
				// if first slide
				if (slider.active.index == 0){
					slider.controls.prev.addClass('disabled');
					slider.controls.next.removeClass('disabled');
				// if last slide
				}else if(slider.active.index == getPagerQty() - 1){
					slider.controls.next.addClass('disabled');
					slider.controls.prev.removeClass('disabled');
				// if any slide in the middle
				}else{
					slider.controls.prev.removeClass('disabled');
					slider.controls.next.removeClass('disabled');
				}
			}
		}

		/**
		 * Initialzes the auto process
		 */
		var initAuto = function(){
			// if autoDelay was supplied, launch the auto show using a setTimeout() call
			if(slider.settings.autoDelay > 0){
				var timeout = setTimeout(el.startAuto, slider.settings.autoDelay);
			// if autoDelay was not supplied, start the auto show normally
			}else{
				el.startAuto();
			}
			// if autoHover is requested
			if(slider.settings.autoHover){
				// on el hover
				el.hover(function(){
					// if the auto show is currently playing (has an active interval)
					if(slider.interval){
						// stop the auto show and pass true agument which will prevent control update
						el.stopAuto(true);
						// create a new autoPaused value which will be used by the relative "mouseout" event
						slider.autoPaused = true;
					}
				}, function(){
					// if the autoPaused value was created be the prior "mouseover" event
					if(slider.autoPaused){
						// start the auto show and pass true agument which will prevent control update
						el.startAuto(true);
						// reset the autoPaused value
						slider.autoPaused = null;
					}
				});
			}
		}

		/**
		 * Initialzes the ticker process
		 */
		var initTicker = function(){
			var startPosition = 0;
			// if autoDirection is "next", append a clone of the entire slider
			if(slider.settings.autoDirection == 'next'){
				el.append(slider.children.clone().addClass('bx-clone'));
			// if autoDirection is "prev", prepend a clone of the entire slider, and set the left position
			}else{
				el.prepend(slider.children.clone().addClass('bx-clone'));
				var position = slider.children.first().position();
				startPosition = slider.settings.mode == 'horizontal' ? -position.left : -position.top;
			}
			setPositionProperty(startPosition, 'reset', 0);
			// do not allow controls in ticker mode
			slider.settings.pager = false;
			slider.settings.controls = false;
			slider.settings.autoControls = false;
			// if autoHover is requested
			if(slider.settings.tickerHover && !slider.usingCSS){
				// on el hover
				slider.viewport.hover(function(){
					el.stop();
				}, function(){
					// calculate the total width of children (used to calculate the speed ratio)
					var totalDimens = 0;
					slider.children.each(function(index){
					  totalDimens += slider.settings.mode == 'horizontal' ? $(this).outerWidth(true) : $(this).outerHeight(true);
					});
					// calculate the speed ratio (used to determine the new speed to finish the paused animation)
					var ratio = slider.settings.speed / totalDimens;
					// determine which property to use
					var property = slider.settings.mode == 'horizontal' ? 'left' : 'top';
					// calculate the new speed
					var newSpeed = ratio * (totalDimens - (Math.abs(parseInt(el.css(property)))));
					tickerLoop(newSpeed);
				});
			}
			// start the ticker loop
			tickerLoop();
		}

		/**
		 * Runs a continuous loop, news ticker-style
		 */
		var tickerLoop = function(resumeSpeed){
			speed = resumeSpeed ? resumeSpeed : slider.settings.speed;
			var position = {left: 0, top: 0};
			var reset = {left: 0, top: 0};
			// if "next" animate left position to last child, then reset left to 0
			if(slider.settings.autoDirection == 'next'){
				position = el.find('.bx-clone').first().position();
			// if "prev" animate left position to 0, then reset left to first non-clone child
			}else{
				reset = slider.children.first().position();
			}
			var animateProperty = slider.settings.mode == 'horizontal' ? -position.left : -position.top;
			var resetValue = slider.settings.mode == 'horizontal' ? -reset.left : -reset.top;
			var params = {resetValue: resetValue};
			setPositionProperty(animateProperty, 'ticker', speed, params);
		}

		/**
		 * Initializes touch events
		 */
		var initTouch = function(){
			// initialize object to contain all touch values
			slider.touch = {
				start: {x: 0, y: 0},
				end: {x: 0, y: 0}
			}
			slider.viewport.bind('touchstart', onTouchStart);
		}

		/**
		 * Event handler for "touchstart"
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
		var onTouchStart = function(e){
			if(slider.working){
				e.preventDefault();
			}else{
				// record the original position when touch starts
				slider.touch.originalPos = el.position();
				var orig = e.originalEvent;
				// record the starting touch x, y coordinates
				slider.touch.start.x = orig.changedTouches[0].pageX;
				slider.touch.start.y = orig.changedTouches[0].pageY;
				// bind a "touchmove" event to the viewport
				slider.viewport.bind('touchmove', onTouchMove);
				// bind a "touchend" event to the viewport
				slider.viewport.bind('touchend', onTouchEnd);
			}
		}

		/**
		 * Event handler for "touchmove"
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
		var onTouchMove = function(e){
			var orig = e.originalEvent;
			// if scrolling on y axis, do not prevent default
			var xMovement = Math.abs(orig.changedTouches[0].pageX - slider.touch.start.x);
			var yMovement = Math.abs(orig.changedTouches[0].pageY - slider.touch.start.y);
			// x axis swipe
			if((xMovement * 3) > yMovement && slider.settings.preventDefaultSwipeX){
				e.preventDefault();
			// y axis swipe
			}else if((yMovement * 3) > xMovement && slider.settings.preventDefaultSwipeY){
				e.preventDefault();
			}
			if(slider.settings.mode != 'fade' && slider.settings.oneToOneTouch){
				var value = 0;
				// if horizontal, drag along x axis
				if(slider.settings.mode == 'horizontal'){
					var change = orig.changedTouches[0].pageX - slider.touch.start.x;
					value = slider.touch.originalPos.left + change;
				// if vertical, drag along y axis
				}else{
					var change = orig.changedTouches[0].pageY - slider.touch.start.y;
					value = slider.touch.originalPos.top + change;
				}
				setPositionProperty(value, 'reset', 0);
			}
		}

		/**
		 * Event handler for "touchend"
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
		var onTouchEnd = function(e){
			slider.viewport.unbind('touchmove', onTouchMove);
			var orig = e.originalEvent;
			var value = 0;
			// record end x, y positions
			slider.touch.end.x = orig.changedTouches[0].pageX;
			slider.touch.end.y = orig.changedTouches[0].pageY;
			// if fade mode, check if absolute x distance clears the threshold
			if(slider.settings.mode == 'fade'){
				var distance = Math.abs(slider.touch.start.x - slider.touch.end.x);
				if(distance >= slider.settings.swipeThreshold){
					slider.touch.start.x > slider.touch.end.x ? el.goToNextSlide() : el.goToPrevSlide();
					el.stopAuto();
				}
			// not fade mode
			}else{
				var distance = 0;
				// calculate distance and el's animate property
				if(slider.settings.mode == 'horizontal'){
					distance = slider.touch.end.x - slider.touch.start.x;
					value = slider.touch.originalPos.left;
				}else{
					distance = slider.touch.end.y - slider.touch.start.y;
					value = slider.touch.originalPos.top;
				}
				// if not infinite loop and first / last slide, do not attempt a slide transition
				if(!slider.settings.infiniteLoop && ((slider.active.index == 0 && distance > 0) || (slider.active.last && distance < 0))){
					setPositionProperty(value, 'reset', 200);
				}else{
					// check if distance clears threshold
					if(Math.abs(distance) >= slider.settings.swipeThreshold){
						distance < 0 ? el.goToNextSlide() : el.goToPrevSlide();
						el.stopAuto();
					}else{
						// el.animate(property, 200);
						setPositionProperty(value, 'reset', 200);
					}
				}
			}
			slider.viewport.unbind('touchend', onTouchEnd);
		}

		/**
		 * Window resize event callback
		 */
		var resizeWindow = function(e){
			// don't do anything if slider isn't initialized.
			if(!slider.initialized) return;
			// get the new window dimens (again, thank you IE)
			var windowWidthNew = $(window).width();
			var windowHeightNew = $(window).height();
			// make sure that it is a true window resize
			// *we must check this because our dinosaur friend IE fires a window resize event when certain DOM elements
			// are resized. Can you just die already?*
			if(windowWidth != windowWidthNew || windowHeight != windowHeightNew){
				// set the new window dimens
				windowWidth = windowWidthNew;
				windowHeight = windowHeightNew;
				// update all dynamic elements
				el.redrawSlider();
				// Call user resize handler
				slider.settings.onSliderResize.call(el, slider.active.index);
			}
		}

		/**
		 * ===================================================================================
		 * = PUBLIC FUNCTIONS
		 * ===================================================================================
		 */

		/**
		 * Performs slide transition to the specified slide
		 *
		 * @param slideIndex (int)
		 *  - the destination slide's index (zero-based)
		 *
		 * @param direction (string)
		 *  - INTERNAL USE ONLY - the direction of travel ("prev" / "next")
		 */
		el.goToSlide = function(slideIndex, direction){
			// if plugin is currently in motion, ignore request
			if(slider.working || slider.active.index == slideIndex) return;
			// declare that plugin is in motion
			slider.working = true;
			// store the old index
			slider.oldIndex = slider.active.index;
			// if slideIndex is less than zero, set active index to last child (this happens during infinite loop)
			if(slideIndex < 0){
				slider.active.index = getPagerQty() - 1;
			// if slideIndex is greater than children length, set active index to 0 (this happens during infinite loop)
			}else if(slideIndex >= getPagerQty()){
				slider.active.index = 0;
			// set active index to requested slide
			}else{
				slider.active.index = slideIndex;
			}
			// onSlideBefore, onSlideNext, onSlidePrev callbacks
			slider.settings.onSlideBefore(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
			if(direction == 'next'){
				slider.settings.onSlideNext(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
			}else if(direction == 'prev'){
				slider.settings.onSlidePrev(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
			}
			// check if last slide
			slider.active.last = slider.active.index >= getPagerQty() - 1;
			// update the pager with active class
			if(slider.settings.pager) updatePagerActive(slider.active.index);
			// // check for direction control update
			if(slider.settings.controls) updateDirectionControls();
			// if slider is set to mode: "fade"
			if(slider.settings.mode == 'fade'){
				// if adaptiveHeight is true and next height is different from current height, animate to the new height
				if(slider.settings.adaptiveHeight && slider.viewport.height() != getViewportHeight()){
					slider.viewport.animate({height: getViewportHeight()}, slider.settings.adaptiveHeightSpeed);
				}
				// fade out the visible child and reset its z-index value
				slider.children.filter(':visible').fadeOut(slider.settings.speed).css({zIndex: 0});
				// fade in the newly requested slide
				slider.children.eq(slider.active.index).css('zIndex', slider.settings.slideZIndex+1).fadeIn(slider.settings.speed, function(){
					$(this).css('zIndex', slider.settings.slideZIndex);
					updateAfterSlideTransition();
				});
			// slider mode is not "fade"
			}else{
				// if adaptiveHeight is true and next height is different from current height, animate to the new height
				if(slider.settings.adaptiveHeight && slider.viewport.height() != getViewportHeight()){
					slider.viewport.animate({height: getViewportHeight()}, slider.settings.adaptiveHeightSpeed);
				}
				var moveBy = 0;
				var position = {left: 0, top: 0};
				// if carousel and not infinite loop
				if(!slider.settings.infiniteLoop && slider.carousel && slider.active.last){
					if(slider.settings.mode == 'horizontal'){
						// get the last child position
						var lastChild = slider.children.eq(slider.children.length - 1);
						position = lastChild.position();
						// calculate the position of the last slide
						moveBy = slider.viewport.width() - lastChild.outerWidth();
					}else{
						// get last showing index position
						var lastShowingIndex = slider.children.length - slider.settings.minSlides;
						position = slider.children.eq(lastShowingIndex).position();
					}
					// horizontal carousel, going previous while on first slide (infiniteLoop mode)
				}else if(slider.carousel && slider.active.last && direction == 'prev'){
					// get the last child position
					var eq = slider.settings.moveSlides == 1 ? slider.settings.maxSlides - getMoveBy() : ((getPagerQty() - 1) * getMoveBy()) - (slider.children.length - slider.settings.maxSlides);
					var lastChild = el.children('.bx-clone').eq(eq);
					position = lastChild.position();
				// if infinite loop and "Next" is clicked on the last slide
				}else if(direction == 'next' && slider.active.index == 0){
					// get the last clone position
					position = el.find('> .bx-clone').eq(slider.settings.maxSlides).position();
					slider.active.last = false;
				// normal non-zero requests
				}else if(slideIndex >= 0){
					var requestEl = slideIndex * getMoveBy();
					position = slider.children.eq(requestEl).position();
				}

				/* If the position doesn't exist
				 * (e.g. if you destroy the slider on a next click),
				 * it doesn't throw an error.
				 */
				if ("undefined" !== typeof(position)) {
					var value = slider.settings.mode == 'horizontal' ? -(position.left - moveBy) : -position.top;
					// plugin values to be animated
					setPositionProperty(value, 'slide', slider.settings.speed);
				}
			}
		}

		/**
		 * Transitions to the next slide in the show
		 */
		el.goToNextSlide = function(){
			// if infiniteLoop is false and last page is showing, disregard call
			if (!slider.settings.infiniteLoop && slider.active.last) return;
			var pagerIndex = parseInt(slider.active.index) + 1;
			el.goToSlide(pagerIndex, 'next');
		}

		/**
		 * Transitions to the prev slide in the show
		 */
		el.goToPrevSlide = function(){
			// if infiniteLoop is false and last page is showing, disregard call
			if (!slider.settings.infiniteLoop && slider.active.index == 0) return;
			var pagerIndex = parseInt(slider.active.index) - 1;
			el.goToSlide(pagerIndex, 'prev');
		}

		/**
		 * Starts the auto show
		 *
		 * @param preventControlUpdate (boolean)
		 *  - if true, auto controls state will not be updated
		 */
		el.startAuto = function(preventControlUpdate){
			// if an interval already exists, disregard call
			if(slider.interval) return;
			// create an interval
			slider.interval = setInterval(function(){
				slider.settings.autoDirection == 'next' ? el.goToNextSlide() : el.goToPrevSlide();
			}, slider.settings.pause);
			// if auto controls are displayed and preventControlUpdate is not true
			if (slider.settings.autoControls && preventControlUpdate != true) updateAutoControls('stop');
		}

		/**
		 * Stops the auto show
		 *
		 * @param preventControlUpdate (boolean)
		 *  - if true, auto controls state will not be updated
		 */
		el.stopAuto = function(preventControlUpdate){
			// if no interval exists, disregard call
			if(!slider.interval) return;
			// clear the interval
			clearInterval(slider.interval);
			slider.interval = null;
			// if auto controls are displayed and preventControlUpdate is not true
			if (slider.settings.autoControls && preventControlUpdate != true) updateAutoControls('start');
		}

		/**
		 * Returns current slide index (zero-based)
		 */
		el.getCurrentSlide = function(){
			return slider.active.index;
		}

		/**
		 * Returns current slide element
		 */
		el.getCurrentSlideElement = function(){
			return slider.children.eq(slider.active.index);
		}

		/**
		 * Returns number of slides in show
		 */
		el.getSlideCount = function(){
			return slider.children.length;
		}

		/**
		 * Update all dynamic slider elements
		 */
		el.redrawSlider = function(){
			// resize all children in ratio to new screen size
			slider.children.add(el.find('.bx-clone')).width(getSlideWidth());
			// adjust the height
			slider.viewport.css('height', getViewportHeight());
			// update the slide position
			if(!slider.settings.ticker) setSlidePosition();
			// if active.last was true before the screen resize, we want
			// to keep it last no matter what screen size we end on
			if (slider.active.last) slider.active.index = getPagerQty() - 1;
			// if the active index (page) no longer exists due to the resize, simply set the index as last
			if (slider.active.index >= getPagerQty()) slider.active.last = true;
			// if a pager is being displayed and a custom pager is not being used, update it
			if(slider.settings.pager && !slider.settings.pagerCustom){
				populatePager();
				updatePagerActive(slider.active.index);
			}
		}

		/**
		 * Destroy the current instance of the slider (revert everything back to original state)
		 */
		el.destroySlider = function(){
			// don't do anything if slider has already been destroyed
			if(!slider.initialized) return;
			slider.initialized = false;
			$('.bx-clone', this).remove();
			slider.children.each(function() {
				$(this).data("origStyle") != undefined ? $(this).attr("style", $(this).data("origStyle")) : $(this).removeAttr('style');
			});
			$(this).data("origStyle") != undefined ? this.attr("style", $(this).data("origStyle")) : $(this).removeAttr('style');
			$(this).unwrap().unwrap();
			if(slider.controls.el) slider.controls.el.remove();
			if(slider.controls.next) slider.controls.next.remove();
			if(slider.controls.prev) slider.controls.prev.remove();
			if(slider.pagerEl && slider.settings.controls) slider.pagerEl.remove();
			$('.bx-caption', this).remove();
			if(slider.controls.autoEl) slider.controls.autoEl.remove();
			clearInterval(slider.interval);
			if(slider.settings.responsive) $(window).unbind('resize', resizeWindow);
		}

		/**
		 * Reload the slider (revert all DOM changes, and re-initialize)
		 */
		el.reloadSlider = function(settings){
			if (settings != undefined) options = settings;
			el.destroySlider();
			init();
		}

		init();

		// returns the current jQuery object
		return this;
	}

})(jQuery);

/* 4 */
/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.9
 *
 * Requires: jQuery 1.2.2+
 */

(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
        toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
                    ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
        slice  = Array.prototype.slice,
        nullLowestDeltaTimeout, lowestDelta;

    if ( $.event.fixHooks ) {
        for ( var i = toFix.length; i; ) {
            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
        }
    }

    var special = $.event.special.mousewheel = {
        version: '3.1.9',

        setup: function() {
            if ( this.addEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.addEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
            // Store the line height and page height for this particular element
            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.removeEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
        },

        getLineHeight: function(elem) {
            return parseInt($(elem)['offsetParent' in $.fn ? 'offsetParent' : 'parent']().css('fontSize'), 10);
        },

        getPageHeight: function(elem) {
            return $(elem).height();
        },

        settings: {
            adjustOldDeltas: true
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
        },

        unmousewheel: function(fn) {
            return this.unbind('mousewheel', fn);
        }
    });


    function handler(event) {
        var orgEvent   = event || window.event,
            args       = slice.call(arguments, 1),
            delta      = 0,
            deltaX     = 0,
            deltaY     = 0,
            absDelta   = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
        if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
        if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
        if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
        if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
            deltaX = deltaY * -1;
            deltaY = 0;
        }

        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
        delta = deltaY === 0 ? deltaX : deltaY;

        // New school wheel delta (wheel event)
        if ( 'deltaY' in orgEvent ) {
            deltaY = orgEvent.deltaY * -1;
            delta  = deltaY;
        }
        if ( 'deltaX' in orgEvent ) {
            deltaX = orgEvent.deltaX;
            if ( deltaY === 0 ) { delta  = deltaX * -1; }
        }

        // No change actually happened, no reason to go any further
        if ( deltaY === 0 && deltaX === 0 ) { return; }

        // Need to convert lines and pages to pixels if we aren't already in pixels
        // There are three delta modes:
        //   * deltaMode 0 is by pixels, nothing to do
        //   * deltaMode 1 is by lines
        //   * deltaMode 2 is by pages
        if ( orgEvent.deltaMode === 1 ) {
            var lineHeight = $.data(this, 'mousewheel-line-height');
            delta  *= lineHeight;
            deltaY *= lineHeight;
            deltaX *= lineHeight;
        } else if ( orgEvent.deltaMode === 2 ) {
            var pageHeight = $.data(this, 'mousewheel-page-height');
            delta  *= pageHeight;
            deltaY *= pageHeight;
            deltaX *= pageHeight;
        }

        // Store lowest absolute delta to normalize the delta values
        absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

        if ( !lowestDelta || absDelta < lowestDelta ) {
            lowestDelta = absDelta;

            // Adjust older deltas if necessary
            if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
                lowestDelta /= 40;
            }
        }

        // Adjust older deltas if necessary
        if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
            // Divide all the things by 40!
            delta  /= 40;
            deltaX /= 40;
            deltaY /= 40;
        }

        // Get a whole, normalized value for the deltas
        delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
        deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
        deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

        // Add information to the event object
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;
        // Go ahead and set deltaMode to 0 since we converted to pixels
        // Although this is a little odd since we overwrite the deltaX/Y
        // properties with normalized deltas.
        event.deltaMode = 0;

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

    function nullLowestDelta() {
        lowestDelta = null;
    }

    function shouldAdjustOldDeltas(orgEvent, absDelta) {
        // If this is an older event and the delta is divisable by 120,
        // then we are assuming that the browser is treating this as an
        // older mouse wheel event and that we should divide the deltas
        // by 40 to try and get a more usable deltaFactor.
        // Side note, this actually impacts the reported scroll distance
        // in older browsers and can cause scrolling to be slower than native.
        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
    }

}));

/* 5 */
/*!
 * jScrollPane - v2.0.19 - 2013-11-16
 * http://jscrollpane.kelvinluck.com/
 *
 * Copyright (c) 2013 Kelvin Luck
 * Dual licensed under the MIT or GPL licenses.
 */
!function(a,b){var c=function(c){return a(c,b)};"function"==typeof define&&define.amd?define(["jquery"],c):"object"==typeof exports?module.exports=c:c(jQuery)}(function(a,b,c){a.fn.jScrollPane=function(d){function e(d,e){function f(b){var e,h,j,l,m,n,q=!1,r=!1;if(P=b,Q===c)m=d.scrollTop(),n=d.scrollLeft(),d.css({overflow:"hidden",padding:0}),R=d.innerWidth()+tb,S=d.innerHeight(),d.width(R),Q=a('<div class="jspPane" />').css("padding",sb).append(d.children()),T=a('<div class="jspContainer" />').css({width:R+"px",height:S+"px"}).append(Q).appendTo(d);else{if(d.css("width",""),q=P.stickToBottom&&C(),r=P.stickToRight&&D(),l=d.innerWidth()+tb!=R||d.outerHeight()!=S,l&&(R=d.innerWidth()+tb,S=d.innerHeight(),T.css({width:R+"px",height:S+"px"})),!l&&ub==U&&Q.outerHeight()==V)return void d.width(R);ub=U,Q.css("width",""),d.width(R),T.find(">.jspVerticalBar,>.jspHorizontalBar").remove().end()}Q.css("overflow","auto"),U=b.contentWidth?b.contentWidth:Q[0].scrollWidth,V=Q[0].scrollHeight,Q.css("overflow",""),W=U/R,X=V/S,Y=X>1,Z=W>1,Z||Y?(d.addClass("jspScrollable"),e=P.maintainPosition&&(ab||db),e&&(h=A(),j=B()),g(),i(),k(),e&&(y(r?U-R:h,!1),x(q?V-S:j,!1)),H(),E(),N(),P.enableKeyboardNavigation&&J(),P.clickOnTrack&&o(),L(),P.hijackInternalLinks&&M()):(d.removeClass("jspScrollable"),Q.css({top:0,left:0,width:T.width()-tb}),F(),I(),K(),p()),P.autoReinitialise&&!rb?rb=setInterval(function(){f(P)},P.autoReinitialiseDelay):!P.autoReinitialise&&rb&&clearInterval(rb),m&&d.scrollTop(0)&&x(m,!1),n&&d.scrollLeft(0)&&y(n,!1),d.trigger("jsp-initialised",[Z||Y])}function g(){Y&&(T.append(a('<div class="jspVerticalBar" />').append(a('<div class="jspCap jspCapTop" />'),a('<div class="jspTrack" />').append(a('<div class="jspDrag" />').append(a('<div class="jspDragTop" />'),a('<div class="jspDragBottom" />'))),a('<div class="jspCap jspCapBottom" />'))),eb=T.find(">.jspVerticalBar"),fb=eb.find(">.jspTrack"),$=fb.find(">.jspDrag"),P.showArrows&&(jb=a('<a class="jspArrow jspArrowUp" />').bind("mousedown.jsp",m(0,-1)).bind("click.jsp",G),kb=a('<a class="jspArrow jspArrowDown" />').bind("mousedown.jsp",m(0,1)).bind("click.jsp",G),P.arrowScrollOnHover&&(jb.bind("mouseover.jsp",m(0,-1,jb)),kb.bind("mouseover.jsp",m(0,1,kb))),l(fb,P.verticalArrowPositions,jb,kb)),hb=S,T.find(">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow").each(function(){hb-=a(this).outerHeight()}),$.hover(function(){$.addClass("jspHover")},function(){$.removeClass("jspHover")}).bind("mousedown.jsp",function(b){a("html").bind("dragstart.jsp selectstart.jsp",G),$.addClass("jspActive");var c=b.pageY-$.position().top;return a("html").bind("mousemove.jsp",function(a){r(a.pageY-c,!1)}).bind("mouseup.jsp mouseleave.jsp",q),!1}),h())}function h(){fb.height(hb+"px"),ab=0,gb=P.verticalGutter+fb.outerWidth(),Q.width(R-gb-tb);try{0===eb.position().left&&Q.css("margin-left",gb+"px")}catch(a){}}function i(){Z&&(T.append(a('<div class="jspHorizontalBar" />').append(a('<div class="jspCap jspCapLeft" />'),a('<div class="jspTrack" />').append(a('<div class="jspDrag" />').append(a('<div class="jspDragLeft" />'),a('<div class="jspDragRight" />'))),a('<div class="jspCap jspCapRight" />'))),lb=T.find(">.jspHorizontalBar"),mb=lb.find(">.jspTrack"),bb=mb.find(">.jspDrag"),P.showArrows&&(pb=a('<a class="jspArrow jspArrowLeft" />').bind("mousedown.jsp",m(-1,0)).bind("click.jsp",G),qb=a('<a class="jspArrow jspArrowRight" />').bind("mousedown.jsp",m(1,0)).bind("click.jsp",G),P.arrowScrollOnHover&&(pb.bind("mouseover.jsp",m(-1,0,pb)),qb.bind("mouseover.jsp",m(1,0,qb))),l(mb,P.horizontalArrowPositions,pb,qb)),bb.hover(function(){bb.addClass("jspHover")},function(){bb.removeClass("jspHover")}).bind("mousedown.jsp",function(b){a("html").bind("dragstart.jsp selectstart.jsp",G),bb.addClass("jspActive");var c=b.pageX-bb.position().left;return a("html").bind("mousemove.jsp",function(a){t(a.pageX-c,!1)}).bind("mouseup.jsp mouseleave.jsp",q),!1}),nb=T.innerWidth(),j())}function j(){T.find(">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow").each(function(){nb-=a(this).outerWidth()}),mb.width(nb+"px"),db=0}function k(){if(Z&&Y){var b=mb.outerHeight(),c=fb.outerWidth();hb-=b,a(lb).find(">.jspCap:visible,>.jspArrow").each(function(){nb+=a(this).outerWidth()}),nb-=c,S-=c,R-=b,mb.parent().append(a('<div class="jspCorner" />').css("width",b+"px")),h(),j()}Z&&Q.width(T.outerWidth()-tb+"px"),V=Q.outerHeight(),X=V/S,Z&&(ob=Math.ceil(1/W*nb),ob>P.horizontalDragMaxWidth?ob=P.horizontalDragMaxWidth:ob<P.horizontalDragMinWidth&&(ob=P.horizontalDragMinWidth),bb.width(ob+"px"),cb=nb-ob,u(db)),Y&&(ib=Math.ceil(1/X*hb),ib>P.verticalDragMaxHeight?ib=P.verticalDragMaxHeight:ib<P.verticalDragMinHeight&&(ib=P.verticalDragMinHeight),$.height(ib+"px"),_=hb-ib,s(ab))}function l(a,b,c,d){var e,f="before",g="after";"os"==b&&(b=/Mac/.test(navigator.platform)?"after":"split"),b==f?g=b:b==g&&(f=b,e=c,c=d,d=e),a[f](c)[g](d)}function m(a,b,c){return function(){return n(a,b,this,c),this.blur(),!1}}function n(b,c,d,e){d=a(d).addClass("jspActive");var f,g,h=!0,i=function(){0!==b&&vb.scrollByX(b*P.arrowButtonSpeed),0!==c&&vb.scrollByY(c*P.arrowButtonSpeed),g=setTimeout(i,h?P.initialDelay:P.arrowRepeatFreq),h=!1};i(),f=e?"mouseout.jsp":"mouseup.jsp",e=e||a("html"),e.bind(f,function(){d.removeClass("jspActive"),g&&clearTimeout(g),g=null,e.unbind(f)})}function o(){p(),Y&&fb.bind("mousedown.jsp",function(b){if(b.originalTarget===c||b.originalTarget==b.currentTarget){var d,e=a(this),f=e.offset(),g=b.pageY-f.top-ab,h=!0,i=function(){var a=e.offset(),c=b.pageY-a.top-ib/2,f=S*P.scrollPagePercent,k=_*f/(V-S);if(0>g)ab-k>c?vb.scrollByY(-f):r(c);else{if(!(g>0))return void j();c>ab+k?vb.scrollByY(f):r(c)}d=setTimeout(i,h?P.initialDelay:P.trackClickRepeatFreq),h=!1},j=function(){d&&clearTimeout(d),d=null,a(document).unbind("mouseup.jsp",j)};return i(),a(document).bind("mouseup.jsp",j),!1}}),Z&&mb.bind("mousedown.jsp",function(b){if(b.originalTarget===c||b.originalTarget==b.currentTarget){var d,e=a(this),f=e.offset(),g=b.pageX-f.left-db,h=!0,i=function(){var a=e.offset(),c=b.pageX-a.left-ob/2,f=R*P.scrollPagePercent,k=cb*f/(U-R);if(0>g)db-k>c?vb.scrollByX(-f):t(c);else{if(!(g>0))return void j();c>db+k?vb.scrollByX(f):t(c)}d=setTimeout(i,h?P.initialDelay:P.trackClickRepeatFreq),h=!1},j=function(){d&&clearTimeout(d),d=null,a(document).unbind("mouseup.jsp",j)};return i(),a(document).bind("mouseup.jsp",j),!1}})}function p(){mb&&mb.unbind("mousedown.jsp"),fb&&fb.unbind("mousedown.jsp")}function q(){a("html").unbind("dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp"),$&&$.removeClass("jspActive"),bb&&bb.removeClass("jspActive")}function r(a,b){Y&&(0>a?a=0:a>_&&(a=_),b===c&&(b=P.animateScroll),b?vb.animate($,"top",a,s):($.css("top",a),s(a)))}function s(a){a===c&&(a=$.position().top),T.scrollTop(0),ab=a;var b=0===ab,e=ab==_,f=a/_,g=-f*(V-S);(wb!=b||yb!=e)&&(wb=b,yb=e,d.trigger("jsp-arrow-change",[wb,yb,xb,zb])),v(b,e),Q.css("top",g),d.trigger("jsp-scroll-y",[-g,b,e]).trigger("scroll")}function t(a,b){Z&&(0>a?a=0:a>cb&&(a=cb),b===c&&(b=P.animateScroll),b?vb.animate(bb,"left",a,u):(bb.css("left",a),u(a)))}function u(a){a===c&&(a=bb.position().left),T.scrollTop(0),db=a;var b=0===db,e=db==cb,f=a/cb,g=-f*(U-R);(xb!=b||zb!=e)&&(xb=b,zb=e,d.trigger("jsp-arrow-change",[wb,yb,xb,zb])),w(b,e),Q.css("left",g),d.trigger("jsp-scroll-x",[-g,b,e]).trigger("scroll")}function v(a,b){P.showArrows&&(jb[a?"addClass":"removeClass"]("jspDisabled"),kb[b?"addClass":"removeClass"]("jspDisabled"))}function w(a,b){P.showArrows&&(pb[a?"addClass":"removeClass"]("jspDisabled"),qb[b?"addClass":"removeClass"]("jspDisabled"))}function x(a,b){var c=a/(V-S);r(c*_,b)}function y(a,b){var c=a/(U-R);t(c*cb,b)}function z(b,c,d){var e,f,g,h,i,j,k,l,m,n=0,o=0;try{e=a(b)}catch(p){return}for(f=e.outerHeight(),g=e.outerWidth(),T.scrollTop(0),T.scrollLeft(0);!e.is(".jspPane");)if(n+=e.position().top,o+=e.position().left,e=e.offsetParent(),/^body|html$/i.test(e[0].nodeName))return;h=B(),j=h+S,h>n||c?l=n-P.horizontalGutter:n+f>j&&(l=n-S+f+P.horizontalGutter),isNaN(l)||x(l,d),i=A(),k=i+R,i>o||c?m=o-P.horizontalGutter:o+g>k&&(m=o-R+g+P.horizontalGutter),isNaN(m)||y(m,d)}function A(){return-Q.position().left}function B(){return-Q.position().top}function C(){var a=V-S;return a>20&&a-B()<10}function D(){var a=U-R;return a>20&&a-A()<10}function E(){T.unbind(Bb).bind(Bb,function(a,b,c,d){var e=db,f=ab,g=a.deltaFactor||P.mouseWheelSpeed;return vb.scrollBy(c*g,-d*g,!1),e==db&&f==ab})}function F(){T.unbind(Bb)}function G(){return!1}function H(){Q.find(":input,a").unbind("focus.jsp").bind("focus.jsp",function(a){z(a.target,!1)})}function I(){Q.find(":input,a").unbind("focus.jsp")}function J(){function b(){var a=db,b=ab;switch(c){case 40:vb.scrollByY(P.keyboardSpeed,!1);break;case 38:vb.scrollByY(-P.keyboardSpeed,!1);break;case 34:case 32:vb.scrollByY(S*P.scrollPagePercent,!1);break;case 33:vb.scrollByY(-S*P.scrollPagePercent,!1);break;case 39:vb.scrollByX(P.keyboardSpeed,!1);break;case 37:vb.scrollByX(-P.keyboardSpeed,!1)}return e=a!=db||b!=ab}var c,e,f=[];Z&&f.push(lb[0]),Y&&f.push(eb[0]),Q.focus(function(){d.focus()}),d.attr("tabindex",0).unbind("keydown.jsp keypress.jsp").bind("keydown.jsp",function(d){if(d.target===this||f.length&&a(d.target).closest(f).length){var g=db,h=ab;switch(d.keyCode){case 40:case 38:case 34:case 32:case 33:case 39:case 37:c=d.keyCode,b();break;case 35:x(V-S),c=null;break;case 36:x(0),c=null}return e=d.keyCode==c&&g!=db||h!=ab,!e}}).bind("keypress.jsp",function(a){return a.keyCode==c&&b(),!e}),P.hideFocus?(d.css("outline","none"),"hideFocus"in T[0]&&d.attr("hideFocus",!0)):(d.css("outline",""),"hideFocus"in T[0]&&d.attr("hideFocus",!1))}function K(){d.attr("tabindex","-1").removeAttr("tabindex").unbind("keydown.jsp keypress.jsp")}function L(){if(location.hash&&location.hash.length>1){var b,c,d=escape(location.hash.substr(1));try{b=a("#"+d+', a[name="'+d+'"]')}catch(e){return}b.length&&Q.find(d)&&(0===T.scrollTop()?c=setInterval(function(){T.scrollTop()>0&&(z(b,!0),a(document).scrollTop(T.position().top),clearInterval(c))},50):(z(b,!0),a(document).scrollTop(T.position().top)))}}function M(){a(document.body).data("jspHijack")||(a(document.body).data("jspHijack",!0),a(document.body).delegate("a[href*=#]","click",function(c){var d,e,f,g,h,i,j=this.href.substr(0,this.href.indexOf("#")),k=location.href;if(-1!==location.href.indexOf("#")&&(k=location.href.substr(0,location.href.indexOf("#"))),j===k){d=escape(this.href.substr(this.href.indexOf("#")+1));try{e=a("#"+d+', a[name="'+d+'"]')}catch(l){return}e.length&&(f=e.closest(".jspScrollable"),g=f.data("jsp"),g.scrollToElement(e,!0),f[0].scrollIntoView&&(h=a(b).scrollTop(),i=e.offset().top,(h>i||i>h+a(b).height())&&f[0].scrollIntoView()),c.preventDefault())}}))}function N(){var a,b,c,d,e,f=!1;T.unbind("touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick").bind("touchstart.jsp",function(g){var h=g.originalEvent.touches[0];a=A(),b=B(),c=h.pageX,d=h.pageY,e=!1,f=!0}).bind("touchmove.jsp",function(g){if(f){var h=g.originalEvent.touches[0],i=db,j=ab;return vb.scrollTo(a+c-h.pageX,b+d-h.pageY),e=e||Math.abs(c-h.pageX)>5||Math.abs(d-h.pageY)>5,i==db&&j==ab}}).bind("touchend.jsp",function(){f=!1}).bind("click.jsp-touchclick",function(){return e?(e=!1,!1):void 0})}function O(){var a=B(),b=A();d.removeClass("jspScrollable").unbind(".jsp"),d.replaceWith(Ab.append(Q.children())),Ab.scrollTop(a),Ab.scrollLeft(b),rb&&clearInterval(rb)}var P,Q,R,S,T,U,V,W,X,Y,Z,$,_,ab,bb,cb,db,eb,fb,gb,hb,ib,jb,kb,lb,mb,nb,ob,pb,qb,rb,sb,tb,ub,vb=this,wb=!0,xb=!0,yb=!1,zb=!1,Ab=d.clone(!1,!1).empty(),Bb=a.fn.mwheelIntent?"mwheelIntent.jsp":"mousewheel.jsp";"border-box"===d.css("box-sizing")?(sb=0,tb=0):(sb=d.css("paddingTop")+" "+d.css("paddingRight")+" "+d.css("paddingBottom")+" "+d.css("paddingLeft"),tb=(parseInt(d.css("paddingLeft"),10)||0)+(parseInt(d.css("paddingRight"),10)||0)),a.extend(vb,{reinitialise:function(b){b=a.extend({},P,b),f(b)},scrollToElement:function(a,b,c){z(a,b,c)},scrollTo:function(a,b,c){y(a,c),x(b,c)},scrollToX:function(a,b){y(a,b)},scrollToY:function(a,b){x(a,b)},scrollToPercentX:function(a,b){y(a*(U-R),b)},scrollToPercentY:function(a,b){x(a*(V-S),b)},scrollBy:function(a,b,c){vb.scrollByX(a,c),vb.scrollByY(b,c)},scrollByX:function(a,b){var c=A()+Math[0>a?"floor":"ceil"](a),d=c/(U-R);t(d*cb,b)},scrollByY:function(a,b){var c=B()+Math[0>a?"floor":"ceil"](a),d=c/(V-S);r(d*_,b)},positionDragX:function(a,b){t(a,b)},positionDragY:function(a,b){r(a,b)},animate:function(a,b,c,d){var e={};e[b]=c,a.animate(e,{duration:P.animateDuration,easing:P.animateEase,queue:!1,step:d})},getContentPositionX:function(){return A()},getContentPositionY:function(){return B()},getContentWidth:function(){return U},getContentHeight:function(){return V},getPercentScrolledX:function(){return A()/(U-R)},getPercentScrolledY:function(){return B()/(V-S)},getIsScrollableH:function(){return Z},getIsScrollableV:function(){return Y},getContentPane:function(){return Q},scrollToBottom:function(a){r(_,a)},hijackInternalLinks:a.noop,destroy:function(){O()}}),f(e)}return d=a.extend({},a.fn.jScrollPane.defaults,d),a.each(["arrowButtonSpeed","trackClickSpeed","keyboardSpeed"],function(){d[this]=d[this]||d.speed}),this.each(function(){var b=a(this),c=b.data("jsp");c?c.reinitialise(d):(a("script",b).filter('[type="text/javascript"],:not([type])').remove(),c=new e(b,d),b.data("jsp",c))})},a.fn.jScrollPane.defaults={showArrows:!1,maintainPosition:!0,stickToBottom:!1,stickToRight:!1,clickOnTrack:!0,autoReinitialise:!1,autoReinitialiseDelay:500,verticalDragMinHeight:0,verticalDragMaxHeight:99999,horizontalDragMinWidth:0,horizontalDragMaxWidth:99999,contentWidth:c,animateScroll:!1,animateDuration:300,animateEase:"linear",hijackInternalLinks:!1,verticalGutter:4,horizontalGutter:4,mouseWheelSpeed:3,arrowButtonSpeed:0,arrowRepeatFreq:50,arrowScrollOnHover:!1,trackClickSpeed:0,trackClickRepeatFreq:70,verticalArrowPositions:"split",horizontalArrowPositions:"split",enableKeyboardNavigation:!0,hideFocus:!1,keyboardSpeed:0,initialDelay:300,speed:30,scrollPagePercent:.8}},this);

/* 6 */
/*!
 * jqPagination, a jQuery pagination plugin (obviously)
 * Version: 1.4 (26th July 2013)
 *
 * Copyright (C) 2013 Ben Everard
 *
 * http://beneverard.github.com/jqPagination
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *     
 */

(function ($) {
	"use strict";
	
	$.jqPagination = function (el, options) {
	
		// To avoid scope issues, use 'base' instead of 'this'
		// to reference this class from internal events and functions.
	
		var base = this;

		// Access to jQuery and DOM versions of element
		base.$el = $(el);
		base.el = el;
		
		// get input jQuery object
		base.$input = base.$el.find('.page-field');

		// Add a reverse reference to the DOM object
		base.$el.data("jqPagination", base);

		base.init = function () {

			base.options = $.extend({}, $.jqPagination.defaultOptions, options);
			// if the user hasn't provided a max page number in the options try and find
			// the data attribute for it, if that cannot be found, use one as a max page number
			
			if (base.options.max_page === null) {
			
				if (base.$input.data('max-page') !== undefined) {
					base.options.max_page = base.$input.data('max-page');
				} else {
					base.options.max_page = 1;
				}
				
			}
			
			// if the current-page data attribute is specified this takes priority
			// over the options passed in, so long as it's a number
			
			if (base.$input.data('current-page') !== undefined && base.isNumber(base.$input.data('current-page'))) {
				base.options.current_page = base.$input.data('current-page');
			}
			
			// remove the readonly attribute as JavaScript must be working by now ;-)
			base.$input.removeAttr('readonly');
			
			// set the initial input value
			// pass true to prevent paged callback form being fired
			
			base.updateInput(true);

			
			 //***************
			// BIND EVENTS
			
			base.$input.on('focus.jqPagination mouseup.jqPagination', function (event) {

				// if event === focus, select all text...
				if (event.type === 'focus') {

					var current_page	= parseInt(base.options.current_page, 10);

					$(this).val(current_page).select();

				}
			
				// if event === mouse up, return false. Fixes Chrome bug
				if (event.type === 'mouseup') {
					return false;
				}
				
			});
			
			base.$input.on('blur.jqPagination keydown.jqPagination', function (event) {
				
				var $self = $(this),
					current_page	= parseInt(base.options.current_page, 10);
				
				// if the user hits escape revert the input back to the original value
				if (event.keyCode === 27) {
					$self.val(current_page);
					$self.blur();
				}
				
				// if the user hits enter, trigger blur event but DO NOT set the page value
				if (event.keyCode === 13) {
					$self.blur();
				}

				// only set the page is the event is focusout.. aka blur
				if (event.type === 'blur') {
					base.setPage($self.val());
				}
				
			});
			
			base.$el.on('click.jqPagination', 'a', function (event) {
				var $self = $(this);

				// we don't want to do anything if we've clicked a disabled link
				// return false so we stop normal link action btu also drop out of this event
				
				if ($self.hasClass('disabled')) {
					return false;
				}

				// for mac + windows (read: other), maintain the cmd + ctrl click for new tab
				if (!event.metaKey && !event.ctrlKey) {
					event.preventDefault();
					base.setPage($self.data('action'));
				}
				
			});
			
		};
		
		base.setPage = function (page, prevent_paged) {
			
			// return current_page value if getting instead of setting
			if (page === undefined) {
				return base.options.current_page;
			}
		
			var current_page	= parseInt(base.options.current_page, 10),
				max_page		= parseInt(base.options.max_page, 10);
				
			if (isNaN(parseInt(page, 10))) {
				
				switch (page) {
				
					case 'first':
						page = 1;
						break;
						
					case 'prev':
					case 'previous':
						page = current_page - 1;
						break;
						
					case 'next':
						page = current_page + 1;
						break;
						
					case 'last':
						page = max_page;
						break;
						
				}
				
			}
			
			page = parseInt(page, 10);
			
			// reject any invalid page requests
			if (isNaN(page) || page < 1 || page > max_page) {

				// update the input element
				base.setInputValue(current_page);
				
				return false;
				
			}
			
			// update current page options
			base.options.current_page = page;
			base.$input.data('current-page', page);
			
			// update the input element
			base.updateInput( prevent_paged );
			
		};
		
		base.setMaxPage = function (max_page, prevent_paged) {
			
			// return the max_page value if getting instead of setting
			if (max_page === undefined) {
				return base.options.max_page;
			}

			// ignore if max_page is not a number
			if (!base.isNumber(max_page)) {
				console.error('jqPagination: max_page is not a number');
				return false;
			}
			
			// ignore if max_page is less than the current_page
			if (max_page < base.options.current_page) {
				console.error('jqPagination: max_page lower than current_page');
				base.options.current_page=1;
				//return false;
			}
			
			// set max_page options
			base.options.max_page = max_page;
			base.$input.data('max-page', max_page);
				
			// update the input element
			base.updateInput( prevent_paged );
			
		};
		
		// ATTN this isn't really the correct name is it?
		base.updateInput = function (prevent_paged) {
			
			var current_page = parseInt(base.options.current_page, 10);
							
			// set the input value
			base.setInputValue(current_page);
			
			// set the link href attributes
			base.setLinks(current_page);
			
			// we may want to prevent the paged callback from being fired
			if (prevent_paged !== true) {

				// fire the callback function with the current page
				base.options.paged(current_page);
			
			}
			
		};
		
		base.setInputValue = function (page) {
		
			var page_string	= base.options.page_string,
				max_page	= base.options.max_page;
	
			// this looks horrible :-(
			page_string = page_string
				.replace("{current_page}", page)
				.replace("{max_page}", max_page);
			
			base.$input.val(page_string);
		
		};
		
		base.isNumber = function(n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		};
		
		base.setLinks = function (page) {
			
			var link_string		= base.options.link_string,
				current_page	= parseInt(base.options.current_page, 10),
				max_page		= parseInt(base.options.max_page, 10);
			
			if (link_string !== '') {
				
				// set initial page numbers + make sure the page numbers aren't out of range
					
				var previous = current_page - 1;
				if (previous < 1) {
					previous = 1;
				}
				
				var next = current_page + 1;
				if (next > max_page) {
					next = max_page;
				}
				
				// apply each page number to the link string, set it back to the element href attribute
				base.$el.find('a.first').attr('href', link_string.replace('{page_number}', '1'));
				base.$el.find('a.prev, a.previous').attr('href', link_string.replace('{page_number}', previous));
				base.$el.find('a.next').attr('href', link_string.replace('{page_number}', next));
				base.$el.find('a.last').attr('href', link_string.replace('{page_number}', max_page));
				
			}

			// set disable class on appropriate links
			base.$el.find('a').removeClass('disabled');

			if (current_page === max_page) {
				base.$el.find('.next, .last').addClass('disabled');
			}

			if (current_page === 1) {
				base.$el.find('.previous, .first').addClass('disabled');
			}

		};
		
		base.callMethod = function (method, key, value) {

			switch (method.toLowerCase()) {

				case 'option':

					// if we're getting, immediately return the value
					if ( value === undefined && typeof key !== "object" ) {
						return base.options[key];
					}

					// set default object to trigger the paged event (legacy opperation)
					var options = {'trigger': true},
					result = false;

					// if the key passed in is an object
					if($.isPlainObject(key) && !value){
						$.extend(options, key)
					}
					else{ // make the key value pair part of the default object
						options[key] = value;
					}

					var prevent_paged = (options.trigger === false);

					// if current_page property is set call setPage
					if(options.current_page !== undefined){
						result = base.setPage(options.current_page, prevent_paged);
					}

					// if max_page property is set call setMaxPage
					if(options.max_page !== undefined){
						result = base.setMaxPage(options.max_page, prevent_paged);
					}

					// if we've not got a result fire an error and return false
					if( result === false ) console.error('jqPagination: cannot get / set option ' + key);
					return result;
					
					break;

				case 'destroy':

					base.$el
						.off('.jqPagination')
						.find('*')
							.off('.jqPagination');

					break;

				default:

					// the function name must not exist
					console.error('jqPagination: method "' + method + '" does not exist');
					return false;

			}

		};

		// Run initializer
		base.init();
		
	};

	$.jqPagination.defaultOptions = {
		current_page	: 1,
		link_string		: '',
		max_page		: null,
		page_string		: 'Page {current_page} / {max_page}',
		paged			: function () {}
	};

	$.fn.jqPagination = function () {

		// get any function parameters
		var self = this,
			$self = $(self),
			args = Array.prototype.slice.call(arguments),
			result = false;

		// if the first argument is a string call the desired function
		// note: we can only do this to a single element, and not a collection of elements

		if (typeof args[0] === 'string') {

			// if we're getting, we can only get value for the first pagination element
			if (args[2] === undefined) {

				result = $self.first().data('jqPagination').callMethod(args[0], args[1]);

			} else {

				// if we're setting, set values for all pagination elements
				$self.each(function(){
					result = $(this).data('jqPagination').callMethod(args[0], args[1], args[2]);
				});

			}

			return result;
		}

		// if we're not dealing with a method, initialise plugin
		self.each(function () {
			(new $.jqPagination(this, args[0]));
		});
		
	};

})(jQuery);

// polyfill, provide a fallback if the console doesn't exist
if (!console) {

	var console	= {},
		func	= function () { return false; };

	console.log		= func;
	console.info	= func;
	console.warn	= func;
	console.error	= func;

}

