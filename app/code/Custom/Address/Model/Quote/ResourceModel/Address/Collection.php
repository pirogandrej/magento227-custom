<?php

namespace Custom\Address\Model\Quote\ResourceModel\Address;

class Collection extends \Magento\Framework\Model\ResourceModel\Db\Collection\AbstractCollection
{
    protected function _construct()
    {
        $this->_init('Custom\Address\Model\Quote\Address', 'Custom\Address\Model\Quote\ResourceModel\Address');
    }

}