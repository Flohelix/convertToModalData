<script setup>
import { onMounted, ref } from 'vue';
import TreeTable from 'primevue/treetable';
import Column from 'primevue/column';
import { useUtilityStore } from '@/stores/utility';

const utility = useUtilityStore();
const { convertToModalData } = utility;

const nodes = ref([]);

const testData = {
  name: 'John Doe',
  age: 42,
  address: {
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zip: '12345'
  },
  nestedData: {
    nestedName: 'Jane Doe',
    nestedAge: 32,
    nestedObj: {
      nestedObjName: 'Joe Doe',
      nestedObjAge: 22,
      nestedObjObj: {
        nestedObjObjName: 'Jill Doe',
        nestedObjObjAge: 12
      }
    }
  },
  nestedDataArray: [
    {
      nestedArrayName: 'Array Doe',
      nestedArrayAge: 10
    },
    {
      nestedArrayName: 'Array Doe',
      nestedArrayAge: 11
    },
    {
      nestedArrayName: 'Array Doe',
      nestedArrayAge: 12
    }
  ]
}

onMounted(() => {
  const modalData = convertToModalData(testData);
  nodes.value = modalData;

  console.log('onMount called!', modalData);
});

</script>

<template>
  <main>
    <h1>TreeView</h1>
    <TreeTable :value="nodes">
      <Column field="name" header="Name" :expander="true"></Column>
      <Column field="value" header="Value"></Column>
    </TreeTable>
  </main>
</template>