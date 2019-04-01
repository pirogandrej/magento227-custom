define([
    'jquery',
    'uiComponent',
    'Magento_Customer/js/customer-data',
], function ($, Component, customerData) {
    'use strict';

    var countryData = customerData.get('directory-data');

    return Component.extend({
        defaults: {
            template: 'Custom_Address/shipping-information/address-renderer/default'
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

        getCountryName: function (countryId) {
            return countryData()[countryId] != undefined ? countryData()[countryId].name : '';
        }
    });
});