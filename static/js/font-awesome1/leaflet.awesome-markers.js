/*
  Leaflet.AwesomeMarkers, a plugin that adds colorful iconic markers for Leaflet, based on the Font Awesome icons
  (c) 2012-2013, Lennard Voogdt

  http://leafletjs.com
  https://github.com/lvoogdt
*/

/*global L*/

(function (window, document, undefined) {
    "use strict";
    /*
     * Leaflet.AwesomeMarkers assumes that you have already included the Leaflet library.
     */

    L.AwesomeMarkers = {};

    L.AwesomeMarkers.version = '1.0';

    L.AwesomeMarkers.Icon = L.Icon.extend({
        options: {
            //iconSize: [35, 45],
            iconSize: [35, 25],
            //iconAnchor:   [17, 42],
            iconAnchor:   [17, 25],
            popupAnchor: [1, -32],
            shadowAnchor: [10, 12],
            shadowSize: [36, 16],
            className: 'awesome-marker',
            prefix: 'glyphicon',
            spinClass: 'fa-spin',
            icon: 'home',
            markerColor: 'blue',
            iconColor: 'white',
	    html: ''/*Changed*/
        },

        initialize: function (options) {
            options = L.Util.setOptions(this, options);
        },

        createIcon: function () {
            var div = document.createElement('div'),
                options = this.options;

            //if (options.icon) {/*Changed*/
                div.innerHTML = this._createInner();
            //}/*Changed*/

            if (options.bgPos) {
                div.style.backgroundPosition =
                    (-options.bgPos.x) + 'px ' + (-options.bgPos.y) + 'px';
            }

            this._setIconStyles(div, 'icon-' + options.markerColor);
            return div;
        },

        _createInner: function() {
            var iconClass, iconSpinClass = "", iconColorClass = "", iconColorStyle = "", options = this.options;

            if(options.icon.slice(0,options.prefix.length+1) === options.prefix + "-") {
                iconClass = options.icon;
            } else {
                iconClass = options.prefix + "-" + options.icon;
            }

            if(options.spin && typeof options.spinClass === "string") {
                iconSpinClass = options.spinClass;
            }

            if(options.iconColor) {
                if(options.iconColor === 'white' || options.iconColor === 'black') {
                    iconColorClass = "icon-" + options.iconColor;
                } else {
                    //iconColorStyle = "style='color: " + options.iconColor + "' ";
                    iconColorClass = "icon-" + options.iconColor;
                }
            }

            //return "<i " + iconColorStyle + "class='" + options.prefix + " " + iconClass + " " + iconSpinClass + " " + iconColorClass + "'></i>";/*Changed*/
            //return "<i " + iconColorStyle + "class='" + options.prefix + " " + iconClass + " " + iconSpinClass + " " + iconColorClass + "'>"+options.html+"</i>";


	    if(options.html > 0){	
		    return '<span class="fa fa-3x" style="margin-top: -18px;">'
			+'<i class="fa fa-map-marker" style=" font-size: 56px; margin-top: 0px; color:#2A81CA; text-shadow: 1px 0.1px 0px black;"></i>'
			//+' <strong class="fa-stack-1x calendar-text" style="margin-top: -0.3em;font-size: x-small; margin-top: -40px;margin-bottom: 10px;color:black; ">'+options.html+'</strong></span>';	
			+' <strong class="fa-stack-1x calendar-text" style="margin-top: -0.3em;font-size: x-small; margin-top: -40px;margin-bottom: 10px;color:black; ">'+options.html+'</strong></span>';	
	    }	
	    else{

		return "<i " + iconColorStyle + "class='" + options.prefix + " " + iconClass + " " + iconSpinClass + " " + iconColorClass 
				+ "' style='margin-top: 0px;font-size: 30px; color:#2A81CA;text-shadow: 1px 0.1px 0px black;'>"+options.html+"</i>";
	    }

        },

        _setIconStyles: function (img, name) {
            var options = this.options,
                size = L.point(options[name === 'shadow' ? 'shadowSize' : 'iconSize']),
                anchor;

            if (name === 'shadow') {
                anchor = L.point(options.shadowAnchor || options.iconAnchor);
            } else {
                anchor = L.point(options.iconAnchor);
            }

            if (!anchor && size) {
                anchor = size.divideBy(2, true);
            }

            img.className = 'awesome-marker-' + name + ' ' + options.className;

            if (anchor) {
                img.style.marginLeft = (-anchor.x) + 'px';
                img.style.marginTop  = (-anchor.y) + 'px';
            }

            if (size) {
                img.style.width  = size.x + 'px';
                img.style.height = size.y + 'px';
            }
        },

        createShadow: function () {
            var div = document.createElement('div');

            this._setIconStyles(div, 'shadow');
            return div;
      //} /*Changed*/
      },
    });
        
    L.AwesomeMarkers.icon = function (options) {
        return new L.AwesomeMarkers.Icon(options);
    };

}(this, document));



