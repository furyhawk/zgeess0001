/*global location*/
sap.ui.define([
	"zgeess0001/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"zgeess0001/model/formatter"
], function(
	BaseController,
	JSONModel,
	History,
	formatter
) {
	"use strict";

	return BaseController.extend("zgeess0001.controller.CreateIncident", {

		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit: function() {
			console.log("CreateIncident.onInit");
			// Model used to manipulate control states. The chosen values make sure,
			// detail page is busy indication immediately so there is no break in
			// between the busy indication for loading the view's meta data
			var iOriginalBusyDelay,
				oViewModel = new JSONModel({
					busy: false,
					delay: 0
				});

			this.getRouter().getRoute("createIncident").attachPatternMatched(this._onObjectMatched, this);

			// Store original busy indicator delay, so it can be restored later on
			iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();
			this.setModel(oViewModel, "createView");
			this.getOwnerComponent().getModel().metadataLoaded().then(function() {
				// Restore original busy indicator delay for the object view
				oViewModel.setProperty("/delay", iOriginalBusyDelay);
			});
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */

		/**
		 * Binds the view to the object path.
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
		 * @private
		 */
		_onObjectMatched: function(oEvent) {
			console.log("CreateIncident._onObjectMatched");
			// var oViewModel = this.getModel("createView");

			var htmlText = {
				htmlText: "<strong>A incident qualifies to be a Service Injury only if a person is:</strong><br />(a) Injured by an accident arising out of and in the course of employment.<br />(b) Injured while on an overseas assignment<br />(c) Contracted an Occupational Disease.<br />(d) Contracted a disease from exposure to biological or chemical agents at work.<br /><br /><strong>Claim can be submitted under WICA or IM2J. The features are:</strong><br /><strong>WICA</strong><br />Cumulative claims under this scheme are capped at a limit of $36,000 per year. You will be eligible to make claims even after you leave the organisation. Claims accrued under Private Hospitals may be submitted under this scheme.<br /><br /><strong>IM2J</strong><br />Cumulative claims under this scheme are not subject to any limits; however, you will be eligible to make claims only for thee period during which you are employed by the government. Only claims accrued under Government Hospitals and/or Restructure Hospitals may be submitted under this scheme.<br />"
			};
			
			// <div><div><div><div><strong>A incident qualifies to be a Service Injury only if a person is:</strong>                     </div>                     <div>(a) Injured by an accident arising out of and in the course of employment.</div>                     <div>(b) Injured while on an overseas assignment.</div>                     <div>(c) Contracted an Occupational Disease.</div>                     <div>(d) Contracted a disease from exposure to biological or chemical agents at work.</div>                     <br />                     <div>                         <strong>Claim can be submitted under WICA or IM2J. The features are:</strong>                     </div>                     <br />                     <div>                         <strong>WICA</strong>                     </div>                     <div>Cumulative claims under this scheme are capped at a limit of $36,000 per year. You will be eligible to make claims                         even after you leave the organisation. Claims accrued under Private Hospitals may be submitted under this                         scheme.</div>                     <br />                     <div>                         <strong>IM2J</strong>                     </div>                     <div>Cumulative claims under this scheme are not subject to any limits, however, you will be eligible to make claims                         only for thee period during which you are employed by the government. Only claims accrued under Government Hospitals and/or Restructure Hospitals may be submitted under this scheme.</div></div></div>         </div>
				var oModel = new JSONModel();
				oModel.setData(htmlText);
				this.getView().setModel(oModel, "html");
			// var sObjectId =  oEvent.getParameter("arguments").objectId;
			// this.getModel().metadataLoaded().then(function() {
			// 	var sObjectPath = this.getModel().createKey("ServiceTextSet", {
			// 		Id: "0000000001"
			// 	});
			// 	this._bindView("/" + sObjectPath);
			// }.bind(this));
			// oViewModel.setProperty("/busy", false);
		},
		/**
		 * Binds the view to the object path.
		 * @function
		 * @param {string} sObjectPath path to the object to be bound
		 * @private
		 */
		_bindView: function(sObjectPath) {
			var oViewModel = this.getModel("createView"),
				oDataModel = this.getModel();

			this.getView().bindElement({
				path: sObjectPath,
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function() {
						oDataModel.metadataLoaded().then(function() {
							// Busy indicator on view should only be set if metadata is loaded,
							// otherwise there may be two busy indications next to each other on the
							// screen. This happens because route matched handler already calls '_bindView'
							// while metadata is loaded.
							oViewModel.setProperty("/busy", true);
						});
					},
					dataReceived: function() {
						oViewModel.setProperty("/busy", false);
					}
				}
			});
		},
		_onBindingChange: function() {
			var oView = this.getView(),
				oViewModel = this.getModel("createView"),
				oElementBinding = oView.getElementBinding();

			// No data for the binding
			if (!oElementBinding.getBoundContext()) {
				this.getRouter().getTargets().display("objectNotFound");
				return;
			}

			console.log("oElementBinding", oElementBinding);

			var oResourceBundle = this.getResourceBundle(),
				oObject = oView.getBindingContext().getObject(),
				sObjectId = oObject.Id,
				sObjectName = oObject.Subject;

			oViewModel.setProperty("/busy", false);
			// Add the object page to the flp routing history
			this.addHistoryEntry({
				title: this.getResourceBundle().getText("objectTitle") + " - " + sObjectName,
				icon: "sap-icon://enter-more",
				intent: "#ztest1-display&/PositionDetailsSet/" + sObjectId
			});

			oViewModel.setProperty("/saveAsTileTitle", oResourceBundle.getText("saveAsTileTitle", [sObjectName]));
			oViewModel.setProperty("/shareOnJamTitle", sObjectName);
			oViewModel.setProperty("/shareSendEmailSubject",
				oResourceBundle.getText("shareSendEmailObjectSubject", [sObjectId]));
			oViewModel.setProperty("/shareSendEmailMessage",
				oResourceBundle.getText("shareSendEmailObjectMessage", [sObjectName, sObjectId, location.href]));
		}

	});

});