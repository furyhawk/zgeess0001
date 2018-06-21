sap.ui.define([], function() {
	"use strict";

	return {
		formatDate: function(v) {

			jQuery.sap.require("sap.ui.core.format.DateFormat");

			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern: "dd MMM YYYY"
			});

			return oDateFormat.format(new Date(v));

		},
		formatAlpha: function(v) {

			return ("0000000000" + v).slice(-10);
		},
		/**
		 * Rounds the number unit value to 2 digits
		 * @public
		 * @param {string} sValue the number string to be rounded
		 * @returns {string} sValue with 2 digits rounded
		 */
		numberUnit: function(sValue) {
			if (!sValue) {
				return "";
			}
			return parseFloat(sValue).toFixed(2);
		}

	};

});