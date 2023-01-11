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
import { blockchainOpts } from '../../const';

const blockchainProps = [
    "nftSrcChain",
    "nftDestChain",
    "ftChain"
]

const columns = [
    {
        title: 'Reserved key',
        dataIndex: 'reservedKey',
        key: 'reservedKey',
    },
    {
        title: 'NFT token ID',
        dataIndex: 'nftTokenId',
        key: 'nftTokenId',
    },
    {
        title: 'NFT source chain',
        dataIndex: 'nftSrcChain',
        key: 'nftSrcChain',
    },
    {
        title: 'NFT source address',
        dataIndex: 'nftSrcAddr',
        key: 'nftSrcAddr',
    },
    {
        title: 'NFT destination chain',
        dataIndex: 'nftDestChain',
        key: 'nftDestChain',
    },
    {
        title: 'NFT destination address',
        dataIndex: 'nftDestAddr',
        key: 'nftDestAddr',
    },
    {
        title: 'Fungible token',
        dataIndex: 'fungibleToken',
        key: 'fungibleToken',
    },
    {
        title: 'FT chain',
        dataIndex: 'ftChain',
        key: 'ftChain',
    },
    {
        title: 'FT source address',
        dataIndex: 'ftSrcAddr',
        key: 'ftSrcAddr',
    },
    {
        title: 'FT destination address',
        dataIndex: 'ftDestAddr',
        key: 'ftDestAddr',
    },
    {
        title: 'Block height',
        dataIndex: 'blockHeight',
        key: 'blockHeight',
    },
    {
        title: 'Created at',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
];

export default {
    props: {
        items: Object
    },
    setup(props: any) {
        const items = props.items

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
            blockchainLabel
        }
    }
};
</script>