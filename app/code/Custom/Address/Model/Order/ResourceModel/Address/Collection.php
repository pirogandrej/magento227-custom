<?php

namespace Custom\Address\Model\Order\ResourceModel\Address;

class Collection extends \Magento\Framework\Model\ResourceModel\Db\Collection\AbstractCollection
{
    protected function _construct()
    {
        $this->_init('Custom\Address\Model\Order\Address', 'Custom\Address\Model\Order\ResourceModel\Address');
    }

}