var config = {
    map: {
        '*': {
            "Magento_Checkout/js/view/shipping-address/address-renderer/default":
                "Custom_Address/js/view/shipping-address/address-renderer/default-override",
            "Magento_Checkout/js/view/shipping-information/address-renderer/default":
                "Custom_Address/js/view/shipping-information/address-renderer/default-override",
            "Magento_Checkout/js/view/billing-address":
                "Custom_Address/js/view/billing-address-override"
        }
    },
    config: {
        mixins: {
            'Magento_Checkout/js/action/set-shipping-information': {
                'Custom_Address/js/action/set-shipping-information-mixin': true
            },
            'Magento_Checkout/js/action/create-billing-address': {
                'Custom_Address/js/action/set-billing-address-mixin': true
            },
            'Magento_Checkout/js/action/create-shipping-address': {
                'Custom_Address/js/action/create-shipping-address-mixin': true
            },
            'Magento_Checkout/js/action/place-order': {
                'Custom_Address/js/action/place-order-mixin': true
            }
        }
    }
};