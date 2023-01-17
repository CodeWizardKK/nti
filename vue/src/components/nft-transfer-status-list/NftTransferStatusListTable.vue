<template>
    <div>
        <a-table :dataSource="items" :columns="columns" :scroll="{ x: 0 }">
            <template #bodyCell="{ column, record }">
                <template v-if="isChainColumn(column.key)">
                    {{ blockchainLabel(record[column.key]) }}
                </template>
                <template v-if="isStatusColumn(column.key)">
                    <a-tag color="blue">{{ transferStatusLabel(record[column.key]) }}</a-tag>
                </template>
                <template v-if="isLongCharColumn(column.key)">
                    <a-typography-text
                    style="width: 100px;"
                    ellipsis
                    :content="record[column.key]"/>
                </template>
            </template>
        </a-table>
    </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import { blockchainOpts, transferStatusOpts } from '../../const';

const blockchainProps = [
    "nftSrcChain",
    "nftDestChain"
]

const longCharProps = [
    "reservedKey",
    "transactionHash",
    "nftSrcAddr",
    "nftDestAddr"
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
        dataIndex: 'nftTokenId',
        key: 'nftTokenId',
    },
    {
        title: 'Source chain',
        dataIndex: 'nftSrcChain',
        key: 'nftSrcChain',
    },
    {
        title: 'Source address',
        dataIndex: 'nftSrcAddr',
        key: 'nftSrcAddr',
    },
    {
        title: 'Destination chain',
        dataIndex: 'nftDestChain',
        key: 'nftDestChain',
    },
    {
        title: 'Destination address',
        dataIndex: 'nftDestAddr',
        key: 'nftDestAddr',
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

        const isStatusColumn = (prop: string) => {
            return prop == 'transferStatus'
        }

        const isLongCharColumn = (prop: string) => {
            return longCharProps.includes(prop)
        }

        const getLabel = (value: number, opts: any) => {
            for (const opt of opts) {
                if (opt.value == value) {
                    return opt.label
                }
            }
            return null
        }

        const blockchainLabel = (value: number) => {
            return getLabel(value, blockchainOpts)
        }

        const transferStatusLabel = (value: number) => {
            return getLabel(value, transferStatusOpts)
        }

        return {
            columns,
            items,
            isChainColumn,
            isStatusColumn,
            isLongCharColumn,
            blockchainLabel,
            transferStatusLabel,
        }
    }
};
</script>