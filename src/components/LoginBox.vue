<template>
  <div class="login-container">
    <div class="login-wrapper">
      <div class="login-box">
        <h2 class="title">{{ isResetMode ? "找回密码" : "用户登录" }}</h2>

        <!-- 提示信息 -->
        <p v-if="message" :class="['feedback-message', messageType]">
          {{ message }}
        </p>

        <!-- 登录表单 -->
        <form v-if="!isResetMode" @submit.prevent="handleLogin">
          <div class="input-group">
            <label for="account">工号</label>
            <input
              v-model="account"
              id="account"
              type="text"
              placeholder="请输入工号"
            />
          </div>

          <div class="input-group">
            <label for="password">密码</label>
            <input
              v-model="password"
              id="password"
              type="password"
              placeholder="请输入密码"
            />
          </div>

          <button type="submit" class="login-button">登录</button>
          <button type="button" class="login-button" @click="debugLogin">
            调试登录
          </button>
          <p style="color: #808080" class="link" @click="isResetMode = true">
            忘记密码？
          </p>
        </form>

        <!-- 重置密码表单 -->
        <form v-else @submit.prevent="handlePasswordReset">
          <div class="input-group">
            <label for="resetID">工号</label>
            <input
              v-model="resetForm.teacherID"
              id="resetID"
              type="text"
              placeholder="请输入工号"
            />
          </div>

          <div class="input-group">
            <label for="newPass">新密码</label>
            <input
              v-model="resetForm.newPassword"
              id="newPass"
              type="password"
              placeholder="新密码（至少8位）"
            />
          </div>

          <div class="input-group">
            <label for="confirmPass">确认密码</label>
            <input
              v-model="resetForm.confirmPassword"
              id="confirmPass"
              type="password"
              placeholder="再次输入密码"
            />
          </div>

          <button type="submit" class="login-button">重置密码</button>
          <p style="color: #808080" class="link" @click="isResetMode = false">
            返回登录
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/api/login";
import { useUserStore } from "@/stores/user";
const router = useRouter();
const userStore = useUserStore();

// 模式切换
const isResetMode = ref(false);

// 登录信息
const account = ref("");
const password = ref("");

// 重置密码表单
const resetForm = ref({
  teacherID: "",
  newPassword: "",
  confirmPassword: "",
});

// 提示信息
const message = ref("");
const messageType = ref(""); // 'success' 或 'error'

// 新的登录逻辑，调用 login API
async function handleLogin() {
  if (!account.value || !password.value) {
    message.value = "请输入工号和密码";
    messageType.value = "error";
    return;
  }

  const invalidCharPattern = /[^a-zA-Z0-9_]/;
  if (account.value.length < 4 || password.value.length < 4) {
    message.value = "工号和密码长度不得少于4位";
    messageType.value = "error";
    return;
  }

  if (
    invalidCharPattern.test(account.value) ||
    invalidCharPattern.test(password.value)
  ) {
    message.value = "工号和密码只能包含字母、数字或下划线";
    messageType.value = "error";
    return;
  }

  try {
    const response = await login({
      account: account.value,
      password: password.value,
    });

    if (response.data.msg == "success") {
      // 登录成功后的提示信息
      message.value = `欢迎，${response.data.data.name}`;
      // 设置提示类型为成功
      messageType.value = "success";

      // 解构后端返回的数据
      const { account, token, name, isAdmin, id } = response.data.data;

      // 存入 Pinia 状态管理
      userStore.id = id;
      userStore.token = token;
      userStore.account = account;
      userStore.name = name;
      userStore.is_admin = isAdmin === 0;

      userStore.persistToLocalStorage();

      const box = document.querySelector(".login-box");
      if (box) {
        box.classList.add("fade-out");
      }

      setTimeout(() => {
        router.push("/main");
      }, 1000);
    } else {
      message.value = response.message || "工号或密码错误";
      messageType.value = "error";
    }
  } catch (error) {
    console.error("登录错误:", error);
    message.value = "登录请求失败，请稍后重试";
    messageType.value = "error";
  }
}

// 新增调试登录方法
const debugLogin = () => {
  message.value = "调试登录成功";
  messageType.value = "success";

  // 调试用默认数据
  const mockData = {
    id: 0,
    token: "debug-token",
    account: "debug_user",
    name: "调试用户",
    is_admin: true,
  };

  userStore.id = mockData.id;
  userStore.token = mockData.token;
  userStore.account = mockData.account;
  userStore.name = mockData.name;
  userStore.is_admin = mockData.is_admin;

  userStore.persistToLocalStorage();

  router.push("/main");
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  background-color: transparent;
  overflow: hidden;
}

.login-wrapper {
  background: #ffffff;
  border-radius: 2rem;
  padding: 3rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
}

.login-box {
  width: 300px;
}

.title {
  color: #000;
  text-align: center;
  margin-bottom: 1.5rem;
}

.input-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

.input-group label {
  margin-bottom: 0.5rem;
  color: #333;
}

.input-group input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

.login-button:hover {
  background-color: #0056b3;
}

.link-box {
  text-align: center;
  margin-top: 1rem;
}

.link-box a {
  color: #007bff;
  text-decoration: none;
}

.link-box a:hover {
  text-decoration: underline;
}

.feedback-message {
  margin-top: 1rem;
  text-align: center;
  font-weight: bold;
}

.feedback-message.success {
  color: #28a745;
}

.feedback-message.error {
  color: #dc3545;
}
</style>
