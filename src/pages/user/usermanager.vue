<script setup>
import { ref, computed } from "vue";
import addpop from "@/components/pop/useraddpop.vue";
import edit from "@/components/pop/usereditpop.vue";
import { useRouter } from "vue-router";
import { resetPassword } from "@/api/index";
import { Refresh } from "@element-plus/icons-vue";
function handleResetPassword(jobId) {
  if (!jobId) {
    alert("无效的工号");
    return;
  }
  const confirmed = window.confirm(`确认为工号 ${jobId} 重置密码？`);
  if (confirmed) {
    resetPassword({ jobId })
      .then(() => {
        alert("密码重置成功");
      })
      .catch((error) => {
        console.error("重置密码失败:", error);
        const msg =
          error?.response?.data?.message || "密码重置失败";
        alert(msg);
      });
  }
}
const router = useRouter();
const allData = ref([
  { id: 1, name: "张三", jobId: "A001", phone: "13800000001" },
  { id: 2, name: "李四", jobId: "A002", phone: "13800000002" },
  { id: 3, name: "王五", jobId: "A003", phone: "13800000003" },
  { id: 4, name: "赵六", jobId: "A004", phone: "13800000004" },
  { id: 5, name: "钱七", jobId: "A005", phone: "13800000005" },
  { id: 6, name: "孙八", jobId: "A006", phone: "13800000006" },
  { id: 7, name: "周九", jobId: "A007", phone: "13800000007" },
  { id: 8, name: "吴十", jobId: "A008", phone: "13800000008" },
  { id: 9, name: "郑十一", jobId: "A009", phone: "13800000009" },
  { id: 10, name: "冯十二", jobId: "A010", phone: "13800000010" },
  { id: 11, name: "陈十三", jobId: "A011", phone: "13800000011" },
  { id: 12, name: "褚十四", jobId: "A012", phone: "13800000012" },
]);
// 当前分页参数
const currentPage = ref(1);
const pageSize = ref(10);
// 每页显示的条数
const totalItems = computed(() => allData.value.length);

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
// const userCounter = ref(allData.value.length + 1)
function addData() {
  const dialog = document.querySelectorAll(".addpop label");
  allData.value.unshift({
    id: allData.value.length + 1,
    name: dialog[0].children[0].value,
    jobId: dialog[1].children[0].value,
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
  allData.value[index + 1 + (currentPage.value - 1) * 10 - 1].jobId =
    dialog[1].children[0].value;
}

//删除数据
function deleteData(index) {
  let result = window.confirm("您是否要执行此操作？");
  if (result) {
    allData.value.splice(index, 1);
  }
}

const handlePrint = () => {
  router.push("/home");
};
</script>

<template>
  <div id="usermanager">
    <div class="title-name">用户管理<span class="en">User Manager</span></div>
    <form action="" method="post" class="search-form">
      <div class="form-left">
        <label
          >教师姓名<input type="text" name="name" placeholder="请输入教师姓名"
        /></label>
        <label
          >工号<input type="text" name="jobId" placeholder="请输入工号"
        /></label>
      </div>
      <div class="form-right">
        <button class="btn-search">搜索</button>
        <button type="reset" class="btn-reset">重置</button>
        <addpop @addData="addData"></addpop>
      </div>
    </form>
    <div class="main-table">
      <table>
        <thead>
          <tr>
            <th width="10%">ID</th>
            <th width="20%">教师姓名</th>
            <th width="20%">工号</th>
            <th width="30%">联系方式</th>
            <th width="20%">操作</th>
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
            <td>{{ item.jobId }}</td>
            <td>{{ item.phone }}</td>
            <td>
              <div class="operate">
                <edit :edit="item" :id="index" @editData="editdata"></edit>
                <span
                  class="btn-delete"
                  @click="handleResetPassword(item.jobId)"
                >
                  <el-icon><Refresh /></el-icon>重置密码
                </span>
                <span class="btn-delete" @click="deleteData(index)">
                  <el-icon><Delete /></el-icon>删除
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 分页控件 -->
    <div class="pagination-wrapper">
      <el-button
        type="primary"
        @click="handlePrint"
        style="width: 100px"
        class="back-btn"
        >返回</el-button
      >
      <el-pagination
        background
        layout="total, prev, pager, next, jumper"
        :total="allData.length"
        :page-size="pageSize"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20]"
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
#usermanager {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url("@/assets/backgroundIcon.png");
  background-size: 70%;
  background-position: center;
  background-repeat: no-repeat;
}
.title-name {
  white-space: nowrap;
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
.form-left,
.form-right {
  display: flex;
  align-items: center;
  gap: 10px;
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
  width: vw;
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
  overflow: auto;
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
  height: 25px;
  text-align: center;
  font-size: 0.87rem;
}
th {
  text-align: center;
  background-color: #4a88b1;
  color: #fff;
  font-weight: normal;
  white-space: nowrap;
  line-height: 40px;
  overflow: hidden;
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
  padding: 0px 10px;
  overflow: hidden;
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
  overflow: hidden;
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
  justify-content: space-between;
}
</style>
