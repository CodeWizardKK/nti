<template>
  <!-- Uncomment the following component to add a form for a `modelName` -->
  <!-- <SpCrud store-name="org.repo.module" item-name="modelName" /> -->
  <div class="container">
    <div id="parent">
      <div class="child">
        <reserve-nft-transfer-form />
      </div>

      <div class="child">
        <reserved-nft-transfer-list />
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
import ReserveNftTransferForm from '../components/ReserveNftTransferForm.vue';

export default {
  name: 'Data',

  components: {
    ReservedNftTransferList,
    ReserveNftTransferForm,
  }
}
</script>
