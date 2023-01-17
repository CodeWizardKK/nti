<template>
    <div>
        <a-table :dataSource="items" :columns="columns" :scroll="{ x: 0 }">
            <template #bodyCell="{ column, record }">
                <template v-if="isChainColumn(column.key)">
                    {{ blockchainLabel(record[column.key]) }}
                </template>
            </template>
        </a-table>
    </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import { blockchainOpts } from '../../const';

const blockchainProps = [
    "srcChain",
    "destChain"
]

const columns = [
    {
        title: 'Reserved key',
        dataIndex: 'reservedKey',
        key: 'reservedKey',
    },
    {
        title: 'Status',
        dataIndex: 'transferStatus',
        key: 'transferStatus',
    },
    {
        title: 'Transaction hash',
        dataIndex: 'transactionHash',
        key: 'transactionHash',
    },
    {
        title: 'Token ID',
        dataIndex: 'reservedData',
        key: 'reservedData',
    },
    {
        title: 'Source chain',
        dataIndex: 'srcChain',
        key: 'srcChain',
    },
    {
        title: 'Source address',
        dataIndex: 'srcAddr',
        key: 'srcAddr',
    },
    {
        title: 'Destination chain',
        dataIndex: 'destChain',
        key: 'destChain',
    },
    {
        title: 'Destination address',
        dataIndex: 'destAddr',
        key: 'destAddr',
    },
];

export default {
    props: {
        items: Object
    },
    setup(props: any) {
        const items = computed(() => props.items)

        const isChainColumn = (prop: string) => {
            return blockchainProps.includes(prop)
        }

        const blockchainLabel = (value: number) => {
            for (const blockchainOpt of blockchainOpts) {
                if (blockchainOpt.value == value) {
                    return blockchainOpt.label
                }
            }
            return null
        }

        return {
            columns,
            items,
            isChainColumn,
            blockchainLabel,
        }
    }
};
</script>