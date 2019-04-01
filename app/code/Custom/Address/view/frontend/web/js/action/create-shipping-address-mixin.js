define([
    'jquery',
    'mage/utils/wrapper',
    'Magento_Checkout/js/model/quote'
], function ($, wrapper,quote) {
    'use strict';

    return function (setShippingInformationAction) {
        return wrapper.wrap(setShippingInformationAction, function (originalAction, messageContainer) {
            if (messageContainer.custom_attributes.type.value == undefined) {
                $.each(messageContainer.custom_attributes , function( key, value ) {
                    messageContainer['custom_attributes']['type'] = {'attribute_code':key,'value':value};
                });
            }
            return originalAction(messageContainer);
        });
    };
});