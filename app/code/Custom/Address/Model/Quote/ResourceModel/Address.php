<?php

namespace Custom\Address\Model\Quote\ResourceModel;

class Address extends \Magento\Framework\Model\ResourceModel\Db\AbstractDb
{
    protected function _construct()
    {
        $this->_init('custom_quote_address', 'address_id');
        $this->_isPkAutoIncrement=false;
    }
}