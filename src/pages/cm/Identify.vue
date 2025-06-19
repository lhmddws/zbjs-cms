<script setup>
import { ref, computed } from "vue";
import ConsumableTable from "@/components/table/ConsumableTable.vue";
const allData = ref([
  { id: 1, name: "耗材1", type: "规格1", unit: "单位1", price: 10, num: 100 },
  { id: 2, name: "耗材2", type: "规格2", unit: "单位2", price: 20, num: 200 },
  { id: 3, name: "耗材3", type: "规格3", unit: "单位3", price: 30, num: 300 },
  { id: 4, name: "耗材4", type: "规格4", unit: "单位4", price: 40, num: 400 },
  { id: 5, name: "耗材5", type: "规格5", unit: "单位5", price: 50, num: 500 },
  { id: 6, name: "耗材6", type: "规格6", unit: "单位6", price: 60, num: 600 },
  { id: 7, name: "耗材7", type: "规格7", unit: "单位7", price: 70, num: 700 },
  { id: 8, name: "耗材8", type: "规格8", unit: "单位8", price: 80, num: 800 },
  { id: 9, name: "耗材9", type: "规格9", unit: "单位9", price: 90, num: 900 },
  {
    id: 10,
    name: "耗材10",
    type: "规格10",
    unit: "单位10",
    price: 100,
    num: 1000,
  },
  {
    id: 11,
    name: "耗材11",
    type: "规格11",
    unit: "单位11",
    price: 110,
    num: 1100,
  },
  {
    id: 12,
    name: "耗材12",
    type: "规格12",
    unit: "单位12",
    price: 120,
    num: 1200,
  },
]);
// 当前分页参数
const currentPage = ref(1);
const pageSize = ref(10);

// 分页后的数据
const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return allData.value.slice(start, start + pageSize.value);
});

// 页码变更
const handlePageChange = (page) => {
  currentPage.value = page;
};

// 添加用户数据
function addData(newItem) {
  allData.value.unshift({
    id: allData.value.length + 1,
    name: newItem.name,
    type: newItem.type,
    unit: newItem.unit,
    price: newItem.price,
    num: newItem.num,
  });
  currentPage.value = Math.floor(allData.value.length / pageSize.value) + 1;
}
// 修改数据
function editdata({ index, newItem }) {
  const realIndex = index + (currentPage.value - 1) * pageSize.value;
  if (allData.value[realIndex]) {
    allData.value[realIndex].name = newItem.name;
    allData.value[realIndex].type = newItem.type;
    allData.value[realIndex].unit = newItem.unit;
    allData.value[realIndex].price = newItem.price;
    allData.value[realIndex].num = newItem.num;
  }
}
//删除数据
function deleteData(index) {
  let result = window.confirm("您是否要执行此操作？");
  if (result) {
    const realIndex = index + (currentPage.value - 1) * pageSize.value;
    allData.value.splice(realIndex, 1);
  }
}
//出库
function outdata({ index, amount }) {
  const realIndex = index + (currentPage.value - 1) * pageSize.value;
  if (allData.value[realIndex]) {
    allData.value[realIndex].num = allData.value[realIndex].num - amount;
  }
}
//入库
function indata({ index, amount }) {
  const realIndex = index + (currentPage.value - 1) * pageSize.value;
  if (allData.value[realIndex]) {
    allData.value[realIndex].num = allData.value[realIndex].num + amount;
  }
}
</script>
<template>
  <div id="teach">
    <div class="title-name">
      鉴定耗材<span class="en">Identify consumables </span>
    </div>
    <ConsumableTable
      :data="pagedData"
      :all-data="allData"
      :current-page="currentPage"
      :page-size="pageSize"
      @addData="addData"
      @editData="editdata"
      @deleteData="deleteData"
      @INData="indata"
      @OUTData="outdata"
    />
  </div>
</template>
<style scoped>
  *{
    margin: 0;
    padding: 0; 
  }
  #teach{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .title-name{
    white-space:nowrap;
    box-shadow: 2px 2px 7px -1px black;
    border-radius: 5px;
    margin-top: 10px;
    padding-left: 20px;
    width: 94%;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    color: #fff;
    background: linear-gradient(to right, #4A88B1, #F3F2F9) no-repeat;
  }
  .en{
    font-size: 0.9em;
    color: #fff;
    margin-left: 10px;
    }
    .pagination-wrapper{
      width: 94%;
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
    }
</style>
