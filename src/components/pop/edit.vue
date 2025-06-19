<script setup lang="ts">
import { ref } from "vue";
defineProps(["edit", "id"]);
defineEmits(["editData"]);
const dialogVisible = ref(false);
</script>
<template>
  <span @click="dialogVisible = true" width="80px" class="btn-edit">
    <el-icon><EditPen /></el-icon>编辑
  </span>
  <el-dialog v-model="dialogVisible" width="500" draggable>
    <template #header>
      <div class="header-title">编辑耗材</div>
    </template>
    <form action="" method="post" class="editpop">
      <label
        >耗材名称<input
          type="text"
          name="name"
          placeholder="请输入耗材名称"
          :value="edit.name"
      /></label>
      <label
        >规格型号<input
          type="text"
          name="type"
          placeholder="请输入规格型号"
          :value="edit.type"
      /></label>
      <label
        >单位<input
          type="text"
          name="unit"
          placeholder="请输入耗材单位"
          :value="edit.unit"
      /></label>
      <label
        >单价<input
          type="text"
          name="price"
          placeholder="请输入耗材单价"
          :value="edit.price"
      /></label>
      <label
        >耗材数量<input
          type="text"
          name="num"
          placeholder="请输入耗材数量"
          :value="edit.num"
      /></label>
    </form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="
            dialogVisible = false;
            $emit('editData', id);
          "
        >
          确定
        </el-button>
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
