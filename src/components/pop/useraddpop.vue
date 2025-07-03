<script setup >
import { ref } from "vue";
import { addUser, changePassword } from  "@/api/user"; 
defineEmits(["addData"]);
// 定义对话框的可见性
const name = ref("");
const account = ref("");
const phone = ref("");
let dialogVisible = ref(false);


async function addData() {
  try {
    await addUser({
      name: name.value,
      account: account.value,
      phone: phone.value,
      password :12345678, 
    });
    dialogVisible.value = false; 
    location.reload(); // 刷新页面以显示最新数据
    
  } catch (error) {
    console.error("添加用户失败：", error);
    // 可根据需要使用 ElMessage 显示提示
  }
}
</script>
<template>
  <el-button plain @click="dialogVisible = true" width="80px"> 新增 </el-button>

  <el-dialog v-model="dialogVisible" title="新增用户" width="500" draggable>
    <form action="" method="post" class="addpop">
      <label
        >用户名（工号）<input
          type="text"
          name="account"
          v-model="account"
          placeholder="请输入用户名（工号）"
      /></label>
      <label
        >教师姓名<input type="text" name="name"
        v-model="name"
        placeholder="请输入"
      /></label>
      <label
        >联系方式<input
          type="text"
          name="phone"
          v-model="phone"
          placeholder="请输入联系方式（手机号）"
      /></label>
    </form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addData()">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
button {
  width: 6vw;
  height: 30px;
  border: none;
  border-radius: 5px;
  color: #fff;
  background-color: #4a88b1;
  cursor: pointer;
}
.addpop {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.addpop label {
  margin: 0px 40px;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.addpop:nth-child(1) {
  margin-top: 0px;
}
.addpop input {
  width: 250px;
  height: 40px;
  border: 1px solid #4a88b1;
  border-radius: 5px;
  background-color: #f3f2f9;
  outline: none;
  padding-left: 10px;
  margin-right: 50px;
}
.is-plain:hover {
  background-color: #3c769d !important;
  color: #fff !important;
}
.el-button {
  vertical-align: 0 !important;
  line-height: 0px !important;
}
</style>
