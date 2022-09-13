<template>
  <div>
    <a-table :dataSource="items" :columns="columns" />
  </div>
</template>

<script>

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
    setup(props) {
        const items = props.items

        return {
            columns,
            items,
        }
    }
};
</script>