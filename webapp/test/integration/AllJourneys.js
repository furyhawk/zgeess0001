/*global QUnit*/

jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
	"sap/ui/test/Opa5",
	"zgeess0001/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"zgeess0001/test/integration/pages/Worklist",
	"zgeess0001/test/integration/pages/Object",
	"zgeess0001/test/integration/pages/NotFound",
	"zgeess0001/test/integration/pages/Browser",
	"zgeess0001/test/integration/pages/App"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "zgeess0001.view."
	});

	sap.ui.require([
		"zgeess0001/test/integration/WorklistJourney",
		"zgeess0001/test/integration/ObjectJourney",
		"zgeess0001/test/integration/NavigationJourney",
		"zgeess0001/test/integration/NotFoundJourney",
		"zgeess0001/test/integration/FLPIntegrationJourney"
	], function () {
		QUnit.start();
	});
});