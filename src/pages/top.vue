<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { changePassword } from "@/api/user";

const router = useRouter();

const username = ref("");
const account = ref("");
const oldpassword = ref("");
const newpassword = ref("");
const edituser = function () {
  changePassword({
    account: account.value,
    oldpassword: oldpassword.value,
    newpassword: newpassword.value,
  }).then((res) => {
      alert("修改成功");
  }).catch((err) => {
    alert("修改失败");
  });
};
onMounted(() => {
  const name = localStorage.getItem("name");
  if (name) {
    username.value = name;
  }
});

const goToUserManager = () => {
  router.push("/UserManager");
};
const logOut = () => {
  localStorage.removeItem("account");
  localStorage.removeItem("name"); // 清除 username 对应的 localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("id");
  localStorage.removeItem("is_admin");
  router.push("/sign");
};
const dialogVisible = ref(false);
const dropdownRef = ref(null);

const handleCommand = (command) => {
  if (command === "showDialog") {
    dialogVisible.value = true;
    // 阻止下拉框自动隐藏
    dropdownRef.value.handleClose();
  }
};
</script>
<template>
  <div id="header">
    <div class="header-systemName">
      <img src="@/assets/icons/warehouse.png" />&nbsp;&nbsp;耗材管理系统
    </div>
    <div class="header-username">
      <el-dropdown
        ref="dropdownRef"
        :hide-on-click="false"
        @command="handleCommand"
      >
        <div class="username">
          <img src="@/assets/icons/user.png" />&nbsp;&nbsp;{{ username }}
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="goToUserManager"
              >人员管理</el-dropdown-item
            >
            <el-dropdown-item command="showDialog">修改密码</el-dropdown-item>
            <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dialog v-model="dialogVisible" title="修改密码" width="500" draggable>
        <form action="" method="post" class="changePassword">
          <label
            >账号<input type="text" name="account" placeholder="请输入账号" v-model="account"
          /></label>
          <label
            >原密码<input type="text" name="type" placeholder="请输入原密码" v-model="oldpassword"
          /></label>
          <label
            >新密码<input type="text" name="unit" placeholder="请输入新密码" v-model="newpassword"
          /></label>
        </form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogVisible = false;edituser()">
              确定
            </el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
#header {
  width: 100%;
  height: 45px;
  background-color: #4a88b1;
  color: #ffffff;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-systemName {
  margin-left: 2vw;
  align-items: center;
  display: flex;
}
.header-systemName img {
  width: 30px;
}
img {
  width: 20px;
}
.username {
  margin-right: 2vw;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.el-dropdown {
  color: white;
  font-size: 18px;
  line-height: 45px;
  height: 45px;
  width: 150px;
}

:deep(.el-tooltip__trigger:focus-visible) {
  outline: unset;
}
.changePassword {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.changePassword label {
  margin: 0px 40px;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.changePassword:nth-child(1) {
  margin-top: 0px;
}
.changePassword input {
  width: 250px;
  height: 40px;
  border: 1px solid #4a88b1;
  border-radius: 5px;
  background-color: #f3f2f9;
  outline: none;
  padding-left: 10px;
  margin-right: 50px;
}
button {
  width: 6vw;
  height: 30px;
  border: none;
  border-radius: 5px;
  color: #fff;
  background-color: #4a88b1;
  cursor: pointer;
}
</style>
