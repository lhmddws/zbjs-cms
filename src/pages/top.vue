<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const goToUserManager = () => {
  router.push("/UserManager");
};
const logOut = () => {
  localStorage.removeItem("token");
  router.push("/sign");
};
</script>
<template>
  <div id="header">
    <div class="header-systemName">
      <svg
        t="1745423626641"
        class="icon"
        viewBox="0 0 1047 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="4400"
        width="20px"
      >
        <path
          d="M558.545455 714.007273h-186.181819c-19.269818 0-34.909091 15.476364-34.909091 34.583272 0 19.083636 15.639273 34.606545 34.909091 34.606546h186.181819c19.269818 0 34.909091-15.499636 34.90909-34.606546 0-19.106909-15.639273-34.583273-34.90909-34.583272m0-325.818182h-186.181819c-19.269818 0-34.909091 15.476364-34.909091 34.583273 0 19.083636 15.639273 34.583273 34.909091 34.583272h186.181819c19.269818 0 34.909091-15.499636 34.90909-34.583272 0-19.130182-15.639273-34.583273-34.90909-34.583273m476.555636 67.258182L576.651636 66.094545a81.547636 81.547636 0 0 0-106.030545 0L12.171636 455.447273a34.373818 34.373818 0 0 0-3.770181 48.756363 35.141818 35.141818 0 0 0 49.24509 3.723637L186.181818 398.801455v497.966545C186.181818 941.265455 222.72 977.454545 267.636364 977.454545h395.636363c44.916364 0 81.454545-36.212364 81.454546-80.709818V654.661818c0-19.130182-15.639273-34.606545-34.909091-34.606545s-34.909091 15.499636-34.909091 34.583272v242.129455a11.589818 11.589818 0 0 1-11.636364 11.543273h-395.636363a11.589818 11.589818 0 0 1-11.636364-11.52v-553.425455c0-1.233455-0.232727-2.350545-0.372364-3.537454l260.445091-221.184a11.636364 11.636364 0 0 1 15.127273 0L791.645091 339.781818c-0.139636 1.210182-0.372364 2.327273-0.372364 3.584v599.505455c0 19.083636 15.639273 34.56 34.909091 34.56s34.909091-15.476364 34.909091-34.583273V398.824727l128.535273 109.149091c6.609455 5.585455 14.661818 8.331636 22.714182 8.331637a34.909091 34.909091 0 0 0 26.530909-12.101819 34.373818 34.373818 0 0 0-3.770182-48.756363M558.545455 551.098182h-186.181819c-19.269818 0-34.909091 15.499636-34.909091 34.606545 0 19.083636 15.639273 34.583273 34.909091 34.583273h186.181819c19.269818 0 34.909091-15.499636 34.90909-34.583273 0-19.130182-15.639273-34.583273-34.90909-34.583272"
          fill="#ffffff"
          p-id="4401"
        ></path></svg
      >&nbsp;&nbsp;耗材管理系统
    </div>
    <div class="header-username">
      <el-dropdown>
        <div class="username"><img src="/user.png" />&nbsp;&nbsp;bourbon</div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="goToUserManager"
              >人员管理</el-dropdown-item>
            <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
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
</style>
