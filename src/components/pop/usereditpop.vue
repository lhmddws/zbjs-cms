<script setup lang="ts">
import { ref, watch } from "vue";
import { updateUser } from "@/api/user";
const props = defineProps(["edit", "id"]);
const emit = defineEmits(["editData"]);
const dialogVisible = ref(false);

const userForm = ref({
  id: 0,
  account: "",
  name: "",
  phone: "",
});

watch(
  () => props.edit,
  (newVal) => {
    userForm.value = { ...newVal };
  },
  { immediate: true }
);

const submitEdit = () => {
  updateUser(userForm.value)
    .then(() => {
      dialogVisible.value = false;
      // 通知父组件刷新
      // location.reload();
    })
    .catch((err) => {
      console.error("更新用户失败", err);
    });
};
</script>
<template>
  <span @click="dialogVisible = true" width="80px" class="btn-edit">
    <el-icon><EditPen /></el-icon>编辑
  </span>
  <el-dialog v-model="dialogVisible" width="500" draggable>
    <template #header>
      <div class="header-title">编辑用户</div>
    </template>
    <form action="" method="post" class="editpop">
      <label
        >用户名（工号）<input
          type="text"
          name="account"
          placeholder="请输入用户名（工号）"
          v-model="userForm.account"
      /></label>
      <label
        >教师姓名<input
          type="text"
          name="name"
          placeholder="请输入教师姓名"
          v-model="userForm.name"
      /></label>
      <label
        >联系方式<input
          type="text"
          name="phone"
          placeholder="请输入联系方式"
          v-model="userForm.phone"
      /></label>
    </form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitEdit"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.header-title {
  font-size: 18px;
  text-align: left;
  height: 26px;
  line-height: 26px;
}
.btn-edit {
  /* margin-top: 20px; */
  width: 3.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4a88b1;
  font-weight: 500;
  cursor: pointer;
  overflow: hidden;
}
.editpop {
  width: 100%;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
}
.editpop label {
  margin: 0px 40px;
  margin-top: 20px;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.editpop:nth-child(1) {
  margin-top: 0px;
}
.editpop input {
  width: 250px;
  height: 40px;
  border: 1px solid #4a88b1;
  border-radius: 5px;
  background-color: #f3f2f9;
  outline: none;
  padding-left: 10px;
  margin-right: 50px;
}
/* button:hover{
      background-color: #e79b10 !important;
      color: #fff !important;
    } */
</style>
