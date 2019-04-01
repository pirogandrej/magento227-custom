<?php

namespace Custom\Address\Model\Order;

class Address extends \Magento\Framework\Model\AbstractModel
{
    protected function _construct()
    {
        $this->_init('Custom\Address\Model\Order\ResourceModel\Address');
    }
}