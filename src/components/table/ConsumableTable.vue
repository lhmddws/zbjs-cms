<template>
  <form action="" method="post" class="search-form">
    <label
      >耗材名称<input type="text" name="name" placeholder="请输入耗材名称"
    /></label>
    <label
      >规格型号<input type="text" name="type" placeholder="请输入规格型号"
    /></label>
    <label
      >单位<input type="text" name="unit" placeholder="请输入耗材单位"
    /></label>
    <label
      >耗材数量<input type="text" name="num" placeholder="请输入耗材数量"
    /></label>
    <button class="btn-search">搜索</button>
    <button type="reset" class="btn-reset">重置</button>
    <addpop @addData="onAdd" />
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
        <tr v-for="(item, index) in data" :key="item.id" class="hc-content">
          <td>{{ index + 1 + (currentPage - 1) * pageSize }}</td>
          <td>{{ item.name }}</td>
          <td :title="item.type">{{ item.type }}</td>
          <td>{{ item.unit }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.price * item.num }}</td>
          <td>{{ item.num }}</td>
          <td>
            <div class="operate">
              <edit
                :edit="item"
                :id="index"
                @editData="onEdit(index, $event)"
              />
              <span class="btn-delete" @click="onDelete(index)">
                <el-icon><Delete /></el-icon>删除
              </span>
              <OutboundRecordspop :id="index" @OUTData="onOUT(index, $event)" />
              <InboundRecordspop :id="index" @INData="onIN(index, $event)" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination-wrapper">
      <el-pagination
        background
        layout="total, prev, pager, next, jumper"
        :total="allData.length"
        :page-size="pageSize"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20]"
        @current-change="$emit('update:currentPage', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import edit from "@/components/pop/edit.vue";
import InboundRecordspop from "@/components/pop/InboundRecordspop.vue";
import OutboundRecordspop from "@/components/pop/OutboundRecordspop.vue";
import addpop from "@/components/pop/addpop.vue";
defineProps({
  data: Array,
  allData: Array,
  currentPage: Number,
  pageSize: Number,
});

const emit = defineEmits([
  "addData",
  "editData",
  "deleteData",
  "INData",
  "OUTData",
]);

// Define methods to handle events
const onAdd = (item) => emit("addData", item);
const onEdit = (index, updatedItem) => emit("editData", { index, updatedItem });
const onDelete = (index) => emit("deleteData", index);
const onIN = (index, num) => emit("INData", { index, num });
const onOUT = (index, num) => emit("OUTData", { index, num });

</script>

<style scoped>
.main-table {
  margin-top: 20px;
}
.operate {
  display: flex;
  gap: 10px;
}
.btn-delete {
  color: red;
  cursor: pointer;
}
.pagination-wrapper {
  margin-top: 20px;
  text-align: right;
}
.main-table {
  margin-top: 25px;
  width: 94%;
  overflow-x: auto;
}
.main-table::-webkit-scrollbar {
  width: 0;
}
table {
  width: 100%;
  min-width: 1200px;
  border-collapse: collapse;
  table-layout: fixed;
}
thead tr {
  height: 40px;
  text-align: center;
  font-size: 0.87rem;
}
th {
  background-color: #4a88b1;
  color: #fff;
  font-weight: normal;
  white-space: nowrap;
  line-height: 40px;
  overflow: hidden;
  text-align: center;
}
tbody tr {
  height: 64px;
  text-align: center;
  font-size: 0.87rem;
  border-bottom: 1px solid #4a88b1;
}
td {
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: keep-all;
  white-space: nowrap;
  padding: 0 10px;
}
.operate {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.btn-delete {
  color: #4a88b1;
  font-weight: 500;
  cursor: pointer;
  overflow: hidden;
  width: 3.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pagination-wrapper {
  width: 94%;
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
.btn-search {
  background-color: #3388ff;
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
</style>
