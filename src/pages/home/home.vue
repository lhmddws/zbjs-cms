<script setup>
// 引入 Vue 的响应式和生命周期钩子
import { ref,onMounted } from 'vue'
// 所有申请记录数据（静态模拟）
const allData=ref([
    {name:'教师1',hcname:'耗材1',type:'规格2',unit:'单位2',num:200},
    {name:'教师2',hcname:'耗材2',type:'规格2',unit:'单位2',num:200},
    {name:'教师3',hcname:'耗材3',type:'规格2',unit:'单位2',num:200},
    {name:'教师4',hcname:'耗材4',type:'规格2',unit:'单位2',num:200},
    {name:'教师5',hcname:'耗材5',type:'规格2',unit:'单位2',num:200},
    {name:'教师6',hcname:'耗材6',type:'规格2',unit:'单位2',num:200},
    {name:'教师7',hcname:'耗材7',type:'规格2',unit:'单位2',num:200},
    {name:'教师8',hcname:'耗材8',type:'规格2',unit:'单位2',num:200},
    {name:'教师9',hcname:'耗材9',type:'规格2',unit:'单位2',num:200},
    {name:'教师10',hcname:'耗材10',type:'规格2',unit:'单位2',num:200},
    {name:'教师11',hcname:'耗材11',type:'规格2',unit:'单位2',num:200}
  ])
// 审核状态选项
const uniqueTypes = ref([
  '待审核',
  '审核通过',
  '审核未通过'
])
// 搜索表单数据绑定对象
const tempSearchForm= ref({
        itemName: "",
        state: "",
        dateRange: [],
        Recipient: "",
      })
// 页面挂载后，根据时间段设置问候语
onMounted(() => {
  const welcome= document.querySelector('.welcome')
  const data = new Date()
  const hour = data.getHours()
  if(hour>=5&&hour<12){
    welcome.innerHTML='Hello管理员，上午好！欢迎使用信息工程系耗材管理系统' 
  }
  else if(hour>=12&&hour<18){
    welcome.innerHTML='Hello管理员，下午好！欢迎使用信息工程系耗材管理系统' 
  }
  else{
    welcome.innerHTML='Hello管理员，晚上好！欢迎使用信息工程系耗材管理系统'
  }
})
</script>
<template>
  <!-- 欢迎语区域（根据时间动态更新） -->
  <div id="home">
    <div class="welcome"></div>
    <!-- 搜索条件区域 -->
    <div class="msg-search">
      <el-row :gutter="25">
        <el-col :span="5">
          <el-form-item label="物品名称">
            <el-input
              placeholder="请输入物品名称"
              v-model="tempSearchForm.itemName"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="时间">
            <el-date-picker
              v-model="tempSearchForm.dateRange"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="经手人">
            <el-input
              v-model="tempSearchForm.Recipient"
              placeholder="请输入经手人"
            ></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="5">
          <el-form-item label="状态">
            <el-select
              placeholder="请选择状态"
              v-model="tempSearchForm.state"
              clearable
            >
              <el-option
                v-for="type in uniqueTypes"
                :key="type"
                :label="type"
                :value="type"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4" style="display: flex; align-items: center">
          <el-button type="primary" @click="handleSearch" style="width: 100px"
            >搜索</el-button>
          <el-button @click="handleReset" style="width: 100px">重置</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 申请记录展示区域 -->
    <div id="message">
      <div class="title-name">申请记录</div>
      <div class="main-table">
      <!-- 表格渲染每条记录 -->
      <table>
        <tbody>
          <tr v-for="(item,index) in allData" :key="item.id">
            <td width="80%">{{item.name}}申请{{item.num}}{{item.unit}}{{item.type}}的{{item.hcname}}</td>
            <td width="10%">2025-02-15</td>
            <td width="10%">
              <div class="operate">
                <span class="agree">同意</span>
                <span class="refuse">拒绝</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
  </div>
</div>
    </div>
</template>
<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  /* 页面根容器 */
  #home{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  /* 顶部问候语样式 */
  .welcome{
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
  /* 搜索栏区域样式 */
  .msg-search{
    width: 94%;
    margin-top: 20px;
  }
  /* 表格容器样式 */
  #message{
    width: 94%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
  /* 表格标题样式 */
  .title-name{
    width: 100%;
    font-size: 20px;
    font-weight: 500;
    padding: 10px 10px;
    color: #fff;
    background-color: #4A88B1;
  }
  /* 表格主体区域 */
    .main-table{
      width: 100%;
      overflow: auto;
      height: 640px;
    }
  /* 表格滚动条样式隐藏 */
    .main-table::-webkit-scrollbar {
      width: 0;
    }
  /* 表格结构样式 */
    table{
      width: 100%;
      min-width: 1200px;
      border-collapse: collapse;
      table-layout:fixed;
    }
  /* 表格每行样式 */
    tbody tr{
      height: 64px;
      text-align: center;
      font-size: 0.87rem;
      border-bottom: 1px solid #4A88B1;
    }
  /* 单元格样式 */
    td{
      text-align: left;
      cursor: pointer;
      overflow:hidden;
      text-overflow:ellipsis;
      word-break:keep-all;
      white-space:nowrap;
      padding: 0px 10px;
      overflow: hidden;
    }
  /* 操作按钮容器 */
    .operate{
      color: #4A88B1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 500;
    }
  /* 同意按钮额外右间距 */
    .agree{
      margin-right: 10px;
    }
</style>
