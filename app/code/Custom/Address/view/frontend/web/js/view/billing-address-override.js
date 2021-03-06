define([
        'jquery',
        'ko',
        'underscore',
        'Magento_Ui/js/form/form',
        'Magento_Customer/js/model/customer',
        'Magento_Customer/js/model/address-list',
        'Magento_Checkout/js/model/quote',
        'Magento_Checkout/js/action/create-billing-address',
        'Magento_Checkout/js/action/select-billing-address',
        'Magento_Checkout/js/checkout-data',
        'Magento_Checkout/js/model/checkout-data-resolver',
        'Magento_Customer/js/customer-data',
        'Magento_Checkout/js/action/set-billing-address',
        'Magento_Ui/js/model/messageList',
        'mage/translate'
    ],
    function (
        $,
        ko,
        _,
        Component,
        customer,
        addressList,
        quote,
        createBillingAddress,
        selectBillingAddress,
        checkoutData,
        checkoutDataResolver,
        customerData,
        setBillingAddressAction,
        globalMessageList,
        $t
    ) {
        'use strict';

        var lastSelectedBillingAddress = null,
            newAddressOption = {
                getAddressInline: function () {
                    return $t('New Address');
                },
                customerAddressId: null
            },
            countryData = customerData.get('directory-data'),
            addressOptions = addressList().filter(function (address) {
                return address.getType() == 'customer-address'; //eslint-disable-line eqeqeq
            });

        addressOptions.push(newAddressOption);

        return Component.extend({
            defaults: {
                template: 'Custom_Address/billing-address'
            },
            currentBillingAddress: quote.billingAddress,
            addressOptions: addressOptions,
            customerHasAddresses: addressOptions.length > 1,

            initialize: function () {
                this._super();
                quote.paymentMethod.subscribe(function () {
                    checkoutDataResolver.resolveBillingAddress();
                }, this);
            },

            initObservable: function () {
                this._super()
                    .observe({
                        selectedAddress: null,
                        isAddressDetailsVisible: quote.billingAddress() != null,
                        isAddressFormVisible: !customer.isLoggedIn() || addressOptions.length === 1,
                        isAddressSameAsShipping: false,
                        saveInAddressBook: 1
                    });

                quote.billingAddress.subscribe(function (newAddress) {
                    if (quote.isVirtual()) {
                        this.isAddressSameAsShipping(false);
                    } else {
                        this.isAddressSameAsShipping(
                            newAddress != null &&
                            newAddress.getCacheKey() == quote.shippingAddress().getCacheKey()
                        );
                    }

                    if (newAddress != null && newAddress.saveInAddressBook !== undefined) {
                        this.saveInAddressBook(newAddress.saveInAddressBook);
                    } else {
                        this.saveInAddressBook(1);
                    }
                    this.isAddressDetailsVisible(true);
                }, this);

                return this;
            },

            canUseShippingAddress: ko.computed(function () {
                return !quote.isVirtual() && quote.shippingAddress() && quote.shippingAddress().canUseForBilling();
            }),

            addressOptionsText: function (address) {
                return address.getAddressInline();
            },

            useShippingAddress: function () {
                if (this.isAddressSameAsShipping()) {
                    selectBillingAddress(quote.shippingAddress());

                    this.updateAddresses();
                    this.isAddressDetailsVisible(true);
                } else {
                    lastSelectedBillingAddress = quote.billingAddress();
                    quote.billingAddress(null);
                    this.isAddressDetailsVisible(false);
                }
                checkoutData.setSelectedBillingAddress(null);

                return true;
            },

            updateAddress: function () {
                var addressData, newBillingAddress;

                if (this.selectedAddress() && this.selectedAddress() != newAddressOption) {
                    selectBillingAddress(this.selectedAddress());
                    checkoutData.setSelectedBillingAddress(this.selectedAddress().getKey());
                } else {
                    this.source.set('params.invalid', false);
                    this.source.trigger(this.dataScopePrefix + '.data.validate');

                    if (this.source.get(this.dataScopePrefix + '.custom_attributes')) {
                        this.source.trigger(this.dataScopePrefix + '.custom_attributes.data.validate');
                    }

                    if (!this.source.get('params.invalid')) {
                        addressData = this.source.get(this.dataScopePrefix);

                        if (customer.isLoggedIn() && !this.customerHasAddresses) {
                            this.saveInAddressBook(1);
                        }
                        addressData['save_in_address_book'] = this.saveInAddressBook() ? 1 : 0;
                        newBillingAddress = createBillingAddress(addressData);

                        // New address must be selected as a billing address
                        selectBillingAddress(newBillingAddress);
                        checkoutData.setSelectedBillingAddress(newBillingAddress.getKey());
                        checkoutData.setNewCustomerBillingAddress(addressData);
                    }
                }
                this.updateAddresses();
            },

            editAddress: function () {
                lastSelectedBillingAddress = quote.billingAddress();
                quote.billingAddress(null);
                this.isAddressDetailsVisible(false);
            },

            cancelAddressEdit: function () {
                this.restoreBillingAddress();

                if (quote.billingAddress()) {
                    // restore 'Same As Shipping' checkbox state
                    this.isAddressSameAsShipping(
                        quote.billingAddress() != null &&
                        quote.billingAddress().getCacheKey() == quote.shippingAddress().getCacheKey() &&
                        !quote.isVirtual()
                    );
                    this.isAddressDetailsVisible(true);
                }
            },

            restoreBillingAddress: function () {
                if (lastSelectedBillingAddress != null) {
                    selectBillingAddress(lastSelectedBillingAddress);
                }
            },

            onAddressChange: function (address) {
                this.isAddressFormVisible(address == newAddressOption);
            },

            getCountryName: function (countryId) {
                return countryData()[countryId] != undefined ? countryData()[countryId].name : '';
            },

            updateAddresses: function () {
                if (window.checkoutConfig.reloadOnBillingAddress ||
                    !window.checkoutConfig.displayBillingOnPaymentMethod
                ) {
                    setBillingAddressAction(globalMessageList);
                }
            },

            getCode: function (parent) {
                return _.isFunction(parent.getCode) ? parent.getCode() : 'shared';
            },

            getType:function(typeAddressId){
                var val;
                $.each(window.checkoutConfig.type, function(index, value ) {
                    if (index == typeAddressId){
                        val = value;
                    }
                });
                return val;
            }
        });
    });