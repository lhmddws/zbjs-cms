<template>
  <div id="InboundRecords">
    <div class="title-name">
      入库管理<span class="en">Inbound Warehouse Management</span>
    </div>
    <div class="container">
      <!-- 搜索过滤区域 -->
      <el-row :gutter="25">
        <el-col :span="5">
          <el-form-item label="物品名称">
            <el-input
              placeholder="请输入物品名称"
              v-model="tempSearchForm.itemName"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="规格型号">
            <el-select
              placeholder="请选择规格型号"
              v-model="tempSearchForm.type"
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
        <el-col :span="6">
          <el-form-item label="入库时间">
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
          <el-form-item label="数量">
            <el-input
              placeholder="请输入数量"
              v-model="tempSearchForm.quantity"
              type="number"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4" style="display: flex; align-items: center">
          <el-button type="primary" @click="handleSearch" style="width: 100px"
            >搜索</el-button
          >
          <el-button @click="handleReset" style="width: 100px">重置</el-button>
        </el-col>
      </el-row>

      <!-- 表格区域 -->
      <div class="table-container" ref="printContent">
        <el-table
          :data="
            filteredTableData.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )
          "
          height="72vh"
          :style="{ background: 'none' }"
          width="100%"
          :row-style="{
            height: '62px',
            'background-color': 'rgba( 255, 255, 255, 0.4)',
          }"
        >
          <el-table-column prop="" label="" min-width="48"></el-table-column>
          <el-table-column
            prop="id"
            label="编号"
            min-width="150"
          ></el-table-column>
          <el-table-column
            prop="itemName"
            label="物品名称"
            min-width="160"
          ></el-table-column>
          <el-table-column
            prop="type"
            label="规格型号"
            min-width="150"
          ></el-table-column>
          <el-table-column
            prop="unit"
            label="单位"
            min-width="130"
          ></el-table-column>
          <el-table-column
            prop="quantity"
            label="数量"
            min-width="130"
          ></el-table-column>
          <el-table-column prop="price" label="单价" min-width="130">
            <template #default="{ row }">
              {{ row.price.toFixed(2) }}
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="金额" min-width="130">
            <template #default="{ row }">
              {{ row.amount.toFixed(2) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="date"
            label="入库日期"
            min-width="200"
          ></el-table-column>
        </el-table>
      </div>

      <!-- 分页区域 -->
      <div class="pagination-container-flex">
        <el-button
          type="primary"
          @click="handlePrint"
          style="width: 100px"
          class="print-button"
          >打印</el-button
        >
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="filteredTableData.length"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        itemName: "",
        type: "",
        dateRange: [],
        quantity: null,
      },
      tableData: [],
      uniqueTypes: [],
      currentPage: 1,
      pageSize: 10,
      isSearchApplied: false,
      originalTableData: [],
      // 添加临时搜索条件，用于存储用户输入但不立即应用
      tempSearchForm: {
        itemName: "",
        type: "",
        dateRange: [],
        quantity: null,
      },
    };
  },
  computed: {
    filteredTableData() {
      let data = [...this.tableData];

      if (this.isSearchApplied) {
        // 按物品名称搜索
        if (this.searchForm.itemName) {
          data = data.filter((item) =>
            item.itemName
              .toLowerCase()
              .includes(this.searchForm.itemName.toLowerCase())
          );
        }

        // 按规格型号搜索
        if (this.searchForm.type) {
          data = data.filter((item) => item.type === this.searchForm.type);
        }

        // 按日期范围搜索
        if (
          this.searchForm.dateRange &&
          this.searchForm.dateRange.length === 2
        ) {
          const [start, end] = this.searchForm.dateRange;
          data = data.filter((item) => {
            const itemDate = new Date(item.date);
            const startDate = new Date(start);
            const endDate = new Date(end);
            endDate.setHours(23, 59, 59, 999);
            return itemDate >= startDate && itemDate <= endDate;
          });
        }

        // 按数量搜索
        if (
          this.searchForm.quantity !== null &&
          this.searchForm.quantity !== ""
        ) {
          const searchQuantity = Number(this.searchForm.quantity);
          data = data.filter((item) => item.quantity === searchQuantity);
        }
      }

      return data;
    },
  },
  watch: {
    // 移除这个监听器，改为只在点击搜索时同步
    // tempSearchForm: {
    //   deep: true,
    //   handler(newVal) {
    //     this.searchForm = {...newVal};
    //   }
    // }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const AllData = [
        {
          id: 1,
          itemName: "铅笔 1",
          type: "型号1",
          unit: "个",
          quantity: 10,
          price: 1.5,
          amount: 15.0,
          date: "2025-05-01"
        },
        {
          id: 2,
          itemName: "橡皮 2",
          type: "型号2",
          unit: "盒",
          quantity: 20,
          price: 2.0,
          amount: 40.0,
          date: "2025-05-02"
        },
        {
          id: 3,
          itemName: "笔记本 3",
          type: "型号3",
          unit: "本",
          quantity: 30,
          price: 3.5,
          amount: 105.0,
          date: "2025-05-03"
        }
      ];
      this.tableData = AllData;
      this.originalTableData = [...AllData];
      this.uniqueTypes = ["型号1", "型号2", "型号3"];
    },
    handleSearch() {
      // 将临时搜索条件应用到searchForm
      this.searchForm = { ...this.tempSearchForm };
      this.isSearchApplied = true;
      this.currentPage = 1;
    },
    handlePrint() {
      // 创建打印专用表格
      const printTable = document.createElement("table");
      printTable.style.width = "100%";
      printTable.style.borderCollapse = "collapse";

      // 创建表头
      const thead = document.createElement("thead");
      const headerRow = document.createElement("tr");
      [
        "编号",
        "物品名称",
        "规格型号",
        "单位",
        "数量",
        "单价",
        "金额",
        "入库日期",
      ].forEach((text) => {
        const th = document.createElement("th");
        th.textContent = text;
        th.style.border = "1px solid #000";
        th.style.padding = "8px";
        th.style.textAlign = "center";
        th.style.backgroundColor = "#f5f7fa";
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
      printTable.appendChild(thead);

      // 创建表体
      const tbody = document.createElement("tbody");
      this.filteredTableData.forEach((item) => {
        const row = document.createElement("tr");
        [
          item.id,
          item.itemName,
          item.type,
          item.unit,
          item.quantity,
          item.price.toFixed(2),
          item.amount.toFixed(2),
          item.date,
        ].forEach((text) => {
          const td = document.createElement("td");
          td.textContent = text;
          td.style.border = "1px solid #000";
          td.style.padding = "8px";
          td.style.textAlign = "center";
          row.appendChild(td);
        });
        tbody.appendChild(row);
      });
      printTable.appendChild(tbody);

      const newWindow = window.open("", "_blank", "width=800,height=600");
      if (newWindow) {
        newWindow.document.write(`
      <html>
        <head>
          <title>打印耗材管理系统-入库管理单</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            th, td {
              border: 1px solid #000;
              padding: 8px;
              text-align: center;
              font-size: 12px;
            }
            th {
              background-color: #f5f7fa;
              font-weight: bold;
            }
            h2 {
              text-align: center;
              margin-bottom: 20px;
            }
          </style>
        </head>
        <body>
          <h2>入库管理单</h2>
          ${printTable.outerHTML}
        </body>
      </html>
    `);
        newWindow.document.close();
        newWindow.focus();
        newWindow.print();
      } else {
        this.$message.error("无法打开打印窗口。请检查浏览器设置。");
      }
    },
    handleReset() {
      this.tempSearchForm = {
        itemName: "",
        type: "",
        dateRange: [],
        quantity: null,
      };
      this.searchForm = { ...this.tempSearchForm };
      this.isSearchApplied = false;
      this.currentPage = 1;
      this.tableData = [...this.originalTableData];
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
#InboundRecords {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container {
  padding: 25px;
  width: 94%;
}
.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-table {
  margin-top: 20px; /* 如果需要，可以进一步调整表格的顶部距离 */
}
.pagination-info {
  margin-right: 20px;
}
.pagination-container-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
.table-container {
  width: 100%;
  /* height: 100%; 确保容器高度占满可用空间 */
  display: flex; /* 使用Flexbox布局 */
}
/* .el-table{
  flex: 1;
} */
.title-name {
  box-shadow: 2px 2px 7px -1px black;
  border-radius: 5px;
  margin-top: 20px;
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
.print-button {
  background-color: white;
  color: black;
  border: 1px solid #dcdfe6; /* 默认边框颜色 */
  width: 100px;
}

.print-button:hover {
  border-color: #c0c4cc; /* 悬停时的边框颜色 */
}

@media print {
  body * {
    visibility: hidden;
  }
  #app,
  .container,
  .table-container,
  .table-container * {
    visibility: visible;
  }
  .table-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  .no-print {
    display: none !important;
  }
}
</style>
