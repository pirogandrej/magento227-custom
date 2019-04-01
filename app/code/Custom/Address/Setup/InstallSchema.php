<?php

namespace Custom\Address\Setup;

use Magento\Framework\Setup\InstallSchemaInterface;
use Magento\Framework\Setup\SchemaSetupInterface;
use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\DB\Ddl\Table;

class InstallSchema implements InstallSchemaInterface
{
    public function install
    (
        SchemaSetupInterface $setup,
        ModuleContextInterface $context
    )
    {
        $installer = $setup;
        $installer->startSetup();
        if (!$installer->tableExists('custom_quote_address')) {
            $table = $installer->getConnection()->newTable(
                $installer->getTable('custom_quote_address')
            )
                ->addColumn(
                    'address_id',
                    Table::TYPE_SMALLINT,
                    null,
                    [
                        'nullable' => false,
                        'unsigned' => true,
                    ],
                    'Address ID'
                )
                ->addColumn(
                    'type',
                    Table::TYPE_SMALLINT,
                    null,
                    [
                        'nullable' => false,
                        'unsigned' => true,
                    ],
                    'Type'
                )
                ->setComment('Quote Address Table');
            $installer->getConnection()->createTable($table);
        }

        if (!$installer->tableExists('custom_order_address')) {
            $table = $installer->getConnection()->newTable(
                $installer->getTable('custom_order_address')
            )
                ->addColumn(
                    'entity_id',
                    Table::TYPE_SMALLINT,
                    null,
                    [
                        'nullable' => false,
                        'unsigned' => true,
                    ],
                    'Entity ID'
                )
                ->addColumn(
                    'type',
                    Table::TYPE_SMALLINT,
                    null,
                    [
                        'nullable' => false,
                        'unsigned' => true,
                    ],
                    'Type'
                )
                ->setComment('Order Address Table');
            $installer->getConnection()->createTable($table);
        }

        $installer->endSetup();
    }
}