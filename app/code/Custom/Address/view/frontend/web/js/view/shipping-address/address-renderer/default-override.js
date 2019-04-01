define([
    'jquery',
    'ko',
    'uiComponent',
    'Magento_Checkout/js/action/select-shipping-address',
    'Magento_Checkout/js/model/quote',
    'Magento_Checkout/js/model/shipping-address/form-popup-state',
    'Magento_Checkout/js/checkout-data',
    'Magento_Customer/js/customer-data'
], function ($, ko, Component, selectShippingAddressAction, quote, formPopUpState, checkoutData, customerData) {
    'use strict';

    var countryData = customerData.get('directory-data');

    return Component.extend({
        defaults: {
            template: 'Custom_Address/shipping-address/address-renderer/default'
        },

        initObservable: function () {
            this._super();
            this.isSelected = ko.computed(function () {
                var isSelected = false,
                    shippingAddress = quote.shippingAddress();

                if (shippingAddress) {
                    isSelected = shippingAddress.getKey() == this.address().getKey();
                }
                return isSelected;
            }, this);

            return this;
        },

        getCountryName: function (countryId) {
            return countryData()[countryId] != undefined ? countryData()[countryId].name : '';
        },

        selectAddress: function () {
            selectShippingAddressAction(this.address());
            checkoutData.setSelectedShippingAddress(this.address().getKey());
        },

        getType:function(typeAddressId){
            var val;
            $.each(window.checkoutConfig.type, function(index, value ) {
                if (index == typeAddressId){
                    val = value;
                }
            });
            return val;
        },

        editAddress: function () {
            formPopUpState.isVisible(true);
            this.showPopup();

        },

        showPopup: function () {
            $('[data-open-modal="opc-new-shipping-address"]').trigger('click');
        }
    });
});
