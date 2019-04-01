<?php

namespace Custom\Address\Model\Quote;

class Address extends \Magento\Framework\Model\AbstractModel
{
    protected function _construct()
    {
        $this->_init('Custom\Address\Model\Quote\ResourceModel\Address');
    }
}