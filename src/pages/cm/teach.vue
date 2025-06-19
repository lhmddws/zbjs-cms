<script setup>
import { ref, computed, defineAsyncComponent, onMounted } from "vue";
const addpop = defineAsyncComponent(() =>
  import("@/components/pop/addpop.vue")
);
const edit = defineAsyncComponent(() => import("@/components/pop/edit.vue"));
const InboundRecordspop = defineAsyncComponent(() =>
  import("@/components/pop/InboundRecordspop.vue")
);
const OutboundRecordspop = defineAsyncComponent(() =>
  import("@/components/pop/OutboundRecordspop.vue")
);
import { OutboundRecords, InboundRecords } from "@/api";
// allData 初始为空，onMounted 后模拟异步加载
const allData = ref([]);
onMounted(() => {
  // 模拟加载数据
  setTimeout(() => {
    allData.value = [
      {
        id: 1,
        name: "耗材1",
        type: "规格1",
        unit: "单位1",
        price: 10,
        num: 100,
      },
      {
        id: 2,
        name: "耗材2",
        type: "规格2",
        unit: "单位2",
        price: 20,
        num: 200,
      },
      {
        id: 3,
        name: "耗材3",
        type: "规格3",
        unit: "单位3",
        price: 30,
        num: 300,
      },
      {
        id: 4,
        name: "耗材4",
        type: "规格4",
        unit: "单位4",
        price: 40,
        num: 400,
      },
      {
        id: 5,
        name: "耗材5",
        type: "规格5",
        unit: "单位5",
        price: 50,
        num: 500,
      },
      {
        id: 6,
        name: "耗材6",
        type: "规格6",
        unit: "单位6",
        price: 60,
        num: 600,
      },
      {
        id: 7,
        name: "耗材7",
        type: "规格7",
        unit: "单位7",
        price: 70,
        num: 700,
      },
      {
        id: 8,
        name: "耗材8",
        type: "规格8",
        unit: "单位8",
        price: 80,
        num: 800,
      },
      {
        id: 9,
        name: "耗材9",
        type: "规格9",
        unit: "单位9",
        price: 90,
        num: 900,
      },
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
    ];
  }, 30);
});
// 当前分页参数
const currentPage = ref(1);
const pageSize = ref(10);
// 每页显示的条数
const totalItems = computed(() => allData.value.length);

// 搜索字段
const searchQuery = ref({
  name: "",
  type: "",
  unit: "",
  num: "",
});

const filteredData = computed(() => {
  return allData.value.filter((item) => {
    return (
      (!searchQuery.value.name || item.name.includes(searchQuery.value.name)) &&
      (!searchQuery.value.type || item.type.includes(searchQuery.value.type)) &&
      (!searchQuery.value.unit || item.unit.includes(searchQuery.value.unit)) &&
      (!searchQuery.value.num ||
        item.num.toString().includes(searchQuery.value.num))
    );
  });
});

// 分页后的数据
const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredData.value.slice(start, start + pageSize.value);
});

// 页码变更
const handlePageChange = (page) => {
  currentPage.value = page;
};

function handleSearch(e) {
  e.preventDefault();
  currentPage.value = 1;
}

// 添加用户数据
// const userCounter = ref(allData.value.length + 1)
function addData() {
  const dialog = document.querySelectorAll(".addpop label");
  allData.value.unshift({
    id: allData.value.length + 1,
    name: dialog[0].children[0].value,
    type: dialog[1].children[0].value,
    unit: dialog[2].children[0].value,
    price: dialog[3].children[0].value,
    num: dialog[4].children[0].value,
  });
  // userCounter.value++

  // 如果当前页是最后一页，可能需要刷新视图
  // 自动跳转到最后一页
  currentPage.value = Math.floor(allData.value.length / pageSize.value);
}
// 修改数据
function editdata(index) {
  const dialog = document.querySelectorAll(".editpop label");
  allData.value[index + 1 + (currentPage.value - 1) * 10 - 1].name =
    dialog[0].children[0].value;
  allData.value[index + 1 + (currentPage.value - 1) * 10 - 1].type =
    dialog[1].children[0].value;
  allData.value[index + 1 + (currentPage.value - 1) * 10 - 1].unit =
    dialog[2].children[0].value;
  allData.value[index + 1 + (currentPage.value - 1) * 10 - 1].price =
    dialog[3].children[0].value;
  allData.value[index + 1 + (currentPage.value - 1) * 10 - 1].num =
    dialog[4].children[0].value;
}
//删除数据
function deleteData(index) {
  alert("确定删除吗？");
  allData.value.splice(index, 1);
}
//出库
async function outdata(index) {
  const dialog = document.querySelectorAll(".OutboundRecordspop label");
  const quantityToOut = Number(dialog[0].children[0].value);
  const currentItem =
    allData.value[index + 1 + (currentPage.value - 1) * 10 - 1];

  let invalidInput = false;
  if (!quantityToOut || quantityToOut <= 0) {
    alert("请输入有效的出库数量");
    invalidInput = true;
  }
  if (quantityToOut > currentItem.num) {
    alert("出库数量不能大于当前库存");
    invalidInput = true;
  }
  if (invalidInput) return;

  const data = {
    id: currentItem.id,
    goods_name: currentItem.name,
    name: "",
    specification: currentItem.type,
    unit: currentItem.unit,
    quantity: quantityToOut,
    Outbound_Time: new Date().toISOString().slice(0, 19).replace("T", " "),
  };

  try {
    const res = await OutboundRecords(data);
    if (res && res.data && res.data.success) {
      alert("出库成功");
      currentItem.num -= quantityToOut;
    } else {
      alert(res.data.message || "出库失败");
    }
  } catch (error) {
    console.error("出库错误:", error);
    alert("出库请求失败");
  }
}
//入库
async function indata(index) {
  const dialog = document.querySelectorAll(".InboundRecordspop label");
  const quantityToIn = Number(dialog[0].children[0].value);
  const currentItem =
    allData.value[index + 1 + (currentPage.value - 1) * 10 - 1];

  if (!quantityToIn || quantityToIn <= 0) {
    alert("请输入有效的入库数量");
    return;
  }

  const data = {
    id: currentItem.id,
    goods_name: currentItem.name,
    name: "",
    specification: currentItem.type,
    unit: currentItem.unit,
    quantity: quantityToIn,
    Inbound_Time: new Date().toISOString().slice(0, 19).replace("T", " "),
  };

  try {
    const res = await InboundRecords(data);
    if (res && res.data && res.data.success) {
      alert("入库成功");
      currentItem.num += quantityToIn;
    } else {
      alert(res.data.message || "入库失败");
    }
  } catch (error) {
    console.error("入库错误:", error);
    alert("入库请求失败");
  }
}
</script>
<template>
  <div id="teach">
    <div class="title-name">
      教学耗材<span class="en">Teaching consumables</span>
    </div>
    <form
      action=""
      method="post"
      class="search-form"
      @submit.prevent="handleSearch"
    >
      <label
        >耗材名称<input
          type="text"
          name="name"
          v-model="searchQuery.name"
          placeholder="请输入耗材名称"
      /></label>
      <label
        >规格型号<input
          type="text"
          name="type"
          v-model="searchQuery.type"
          placeholder="请输入规格型号"
      /></label>
      <label
        >单位<input
          type="text"
          name="unit"
          v-model="searchQuery.unit"
          placeholder="请输入耗材单位"
      /></label>
      <label
        >耗材数量<input
          type="text"
          name="num"
          v-model="searchQuery.num"
          placeholder="请输入耗材数量"
      /></label>
      <button class="btn-search">搜索</button>
      <button type="reset" class="btn-reset">重置</button>
      <addpop @addData="addData"></addpop>
    </form>
    <div class="main-table">
      <table>
        <thead>
          <tr>
            <th width="5%">ID</th>
            <th width="10%">耗材名称</th>
            <th width="25%">规格型号</th>
            <th width="5%">单位</th>
            <th width="10%">单价</th>
            <th width="10%">金额</th>
            <th width="10%">耗材数量</th>
            <th width="25%">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in pagedData"
            :key="item.id"
            class="hc-content"
          >
            <td>{{ index + 1 + (currentPage - 1) * 10 }}</td>
            <td>{{ item.name }}</td>
            <td :title="item.type">{{ item.type }}</td>
            <td>{{ item.unit }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.price * item.num }}</td>
            <td>{{ item.num }}</td>
            <td>
              <div class="operate">
                <edit :edit="item" :id="index" @editData="editdata"></edit>
                <span class="btn-delete" @click="deleteData(index)"
                  ><el-icon><Delete /></el-icon>删除</span
                >
                <OutboundRecordspop
                  @OUTData="outdata"
                  :id="index"
                ></OutboundRecordspop>
                <InboundRecordspop
                  @INData="indata"
                  :id="index"
                ></InboundRecordspop>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 分页控件 -->
    <div class="pagination-wrapper">
      <el-pagination
        background
        layout="total, prev, pager, next, jumper"
        :total="filteredData.length"
        :page-size="pageSize"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20]"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
#teach {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title-name {
  box-shadow: 2px 2px 7px -1px black;
  border-radius: 5px;
  margin-top: 10px;
  padding-left: 20px;
  width: 94%;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  color: #fff;
  background: linear-gradient(to right, #4a88b1, #f3f2f9) no-repeat;
}
.en {
  font-size: 0.9em;
  color: #fff;
  margin-left: 10px;
}
.search-form {
  margin-top: 30px;
  width: 94%;
  display: flex;
  justify-content: space-between;
}
.search-form label {
  margin-right: 20px;
  white-space: nowrap;
}
button {
  width: 6vw;
  height: 30px;
  border: none;
  border-radius: 5px;
  color: #fff;
  white-space: nowrap;
  background-color: #4a88b1;
  cursor: pointer;
}
input {
  width: 9vw;
  height: 30px;
  border: 1px solid #4a88b1;
  border-radius: 5px;
  background-color: #f3f2f9;
  outline: none;
  padding-left: 10px;
  margin-left: 10px;
}
.main-table {
  margin-top: 25px;
  width: 94%;
}
table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}
thead tr {
  height: 3em;
  text-align: center;
  font-size: 14px;
}
th {
  text-align: center;
  background-color: #4a88b1;
  color: #fff;
  font-weight: normal;
  line-height: 40px;
}
tbody tr {
  height: 4.6em;
  text-align: center;
  font-size: 14px;
  border-bottom: 1px solid #4a88b1;
}
td {
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: keep-all;
  white-space: nowrap;
  padding: 0px 10px;
}
.operate {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-delete {
  width: 3.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4a88b1;
  font-weight: 500;
  cursor: pointer;
}
.btn-search {
  background-color: #3388ff;
}
.btn-search:hover {
  background-color: #2d78e1;
  color: #fff;
}
.btn-reset:hover {
  background-color: #3c769d !important;
  color: #fff !important;
}
.pagination-wrapper {
  width: 94%;
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
