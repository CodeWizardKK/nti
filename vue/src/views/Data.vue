<template>
  <!-- Uncomment the following component to add a form for a `modelName` -->
  <!-- <SpCrud store-name="org.repo.module" item-name="modelName" /> -->
  <div class="container">
    <div id="parent">
      <div class="child">
        <reserve-nft-transfer-form />
        <transfer-nft-form />
      </div>

      <div class="child">
        <reserved-nft-transfer-list />
        <nft-transfer-list />
      </div>
    </div>
  </div>
</template>

<style>
h3 {
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 4px;
}

table {
  font-size: 14px;
}
table, th, td {
  border: 1px solid;
  border-collapse: collapse;
}
th ,td {
  padding: 5px 10px;
}

#parent {
  display: flex;
}
.child {
  flex-grow: 1;
  margin: 20px;
}
</style>

<script>
import ReservedNftTransferList from '../components/ReservedNftTransferList.vue';
import NftTransferList from '../components/NftTransferList.vue';
import ReserveNftTransferForm from '../components/ReserveNftTransferForm.vue';
import TransferNftForm from '../components/TransferNftForm.vue';

export default {
  name: 'Data',

  components: {
    ReservedNftTransferList,
    NftTransferList,
    ReserveNftTransferForm,
    TransferNftForm,
  }
}
</script>
