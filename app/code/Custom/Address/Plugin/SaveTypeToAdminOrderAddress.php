<?php

namespace Custom\Address\Plugin;

class SaveTypeToAdminOrderAddress
{
    public function beforeGetFormattedAddress($block, $address)
    {
        if($attributes = $address->getExtensionAttributes()){
            $address->setType($attributes->getType());
        }
        return array($address);
    }
}