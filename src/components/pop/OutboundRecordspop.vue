<script setup lang="ts">
import { ref } from 'vue'
defineProps(["id"])
defineEmits(['OUTData'])
const dialogVisible = ref(false)
</script>
<template>
  <span @click="dialogVisible = true" width="80px" class="btn-outpop">
    <el-icon><FolderRemove /></el-icon>出库
  </span>
  <el-dialog v-model="dialogVisible" width="500" draggable>
    <template #header>
      <div class="header-title">出库管理</div>
    </template>
    <form action="" method="post" class="OutboundRecordspop">
      <label>出库数量<input type="text" name="OUT_count" placeholder="请输入出库数量" /></label>
      <label>领用人<input type="text" name="Recipient" placeholder="请输入领用人" /></label>
    </form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false;$emit('OUTData',id)">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
  .header-title{
    font-size: 18px;
    text-align: left;
    height: 26px;
    line-height: 26px;
}
  .btn-outpop{
      width: 3.5vw;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #4A88B1;
      font-weight: 500;
      cursor: pointer;
      overflow: hidden;
    }
    .OutboundRecordspop{
      width: 100%;
      display: flex;
      flex-direction: column;
      /* align-items: center; */
    }
    .OutboundRecordspop label{
      margin: 0px 40px;
      margin-top: 20px;
      width: 90%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .OutboundRecordspop:nth-child(1){
      margin-top: 0px;
    }
   .OutboundRecordspop input{
      width: 250px;
      height: 40px;
      border: 1px solid #4A88B1;
      border-radius: 5px;
      background-color: #F3F2F9;
      outline: none;
      padding-left: 10px;
      margin-right: 50px;
   }
    /* button:hover{
      background-color: #3f769b !important;
      color: #fff !important;
    } */
</style>
