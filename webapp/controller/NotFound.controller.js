sap.ui.define([
		"zgeess0001/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("zgeess0001.controller.NotFound", {

			/**
			 * Navigates to the worklist when the link is pressed
			 * @public
			 */
			onLinkPressed : function () {
				this.getRouter().navTo("worklist");
			}

		});

	}
);