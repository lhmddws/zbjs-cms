<template>
  <div class="page-background">
    <div class="header">
      <img :src="background" alt="My Image" class="bg" />
      <div class="logo-and-title">
        <img :src="imageSrc" alt="My Image" class="logo" />
      </div>
      <div class="login-section">
        <div>
          <LoginBox />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Logo from "@/assets/Logo.png";
import LoginBox from "@/components/LoginBox.vue";
import background from "@/assets/bg.jpg";

const imageSrc = ref(Logo);
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.page-background {
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: auto;
  background: linear-gradient(
    to bottom,
    #002b73 10%,
    #7a97ee 100%,
    #002b73 100%
  );
}

.login-section input[type="text"],
.login-section input[type="password"],
.login-section button {
  width: 85%;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  position: relative;
  right: 2.5%;
  top: 25%;
}

.bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.logo {
  width: 450px;
  /* 根据需要调整宽度 */
  height: auto;
  /* 保持图像的宽高比 */
  position: absolute;
  top: 15px;
  /* 根据需要调整距离顶部的距离 */
  left: 35px;
  /* 根据需要调整距离左侧的距离 */
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  color: white;
}

.login-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 40px;
  height: 550px;
  border-radius: 13px;
  position: absolute;
  top: 55%;
  right: 15%;
  transform: translateY(-50%);
  width: 50%;
  max-width: 500px;
  box-sizing: border-box;
  width: min(90%, 500px);
}

.login-section input[type="text"],
.login-section input[type="password"],
.login-section button {
  width: 85%;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

@media (max-width: 1280px) {
  .Login_left_bgg {
    display: none;
  }
}

@media (max-width: 850px) {
  .Login_left_bgg {
    display: none;
  }
}

@media (max-width: 768px) {
  .login-section {
    width: 90%;
    max-width: 500px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, 0);
    position: absolute;
    padding: 20px;
  }

  .logo {
    width: 120px;
    top: 10px;
    left: 10px;
  }

  /* 调整登录区域样式 */
  .login-section {
    width: 85%;
    right: auto;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 15px;
    height: auto;
    max-height: 60vh;
    position: absolute;
  }

  .header {
    padding: 10px;
  }
}

@media (max-width: 480px) {
  .Login_left_bgg {
    display: none;
  }

  .logo {
    width: 80%;
    top: 15px;
    left: 8px;
  }

  .login-section {
    width: 90%;
    right: auto;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 70vh;
  }

  .login input[type="submit"] {
    width: 70%;
    height: 5vh;
    font-size: 14px;
    margin-top: 8vh;
  }
}

@media (min-width: 452px) and (max-width: 800px) {
  .Login_left_bgg {
    display: none;
  }

  .page-background {
    height: auto;
    min-height: 100vh;
    overflow-x: hidden;
  }

  .mobile_text[data-v-1fe7029a][data-v-5ce1ed71][data-v-5ce1ed71] {
    text-align: center;
    color: #cac9c9;
    position: absolute;
    top: 2%;
    right: 35%;
  }

  /* 调整logo位置 */
  .login[data-v-5ce1ed71][data-v-5ce1ed71] {
    width: 400px;
    min-height: 350px;
  }

  /* 调整登录区域样式 */
  .login-section {
    width: 85%;
    right: auto;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 15px;
    height: auto;
    max-height: 60vh;
    position: absolute;
  }

  .logo {
    width: 60%;
    top: 15px;
    left: 8px;
  }

  .message {
    font-size: 12px;
    margin-top: 0.5vh;
  }

  .header {
    padding: 10px;
  }
}

@media (min-width: 770px) and (max-width: 1000px) {
  .Login_left_bgg {
    display: none;
  }

  .page-background {
    height: auto;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* 隐藏左边背景图片 */
  .login-image1 {
    display: none;
  }

  .mobile_text[data-v-1fe7029a][data-v-5ce1ed71][data-v-5ce1ed71] {
    text-align: center;
    color: #cac9c9;
    position: absolute;
    top: 2%;
    right: 35%;
  }

  /* 调整logo位置 */
  .login[data-v-5ce1ed71][data-v-5ce1ed71] {
    width: 400px;
    min-height: 350px;
  }

  /* 调整登录区域样式 */
  .login-section {
    width: 100%;
    right: auto;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 15px;
    height: auto;
    max-height: 60vh;
    position: absolute;
  }

  .logo {
    width: 60%;
    top: 15px;
    left: 8px;
  }

  .header {
    padding: 10px;
  }
}

@media (max-width: 960px) and (max-height: 540px) {
  .page-background {
    transform: scale(0.8);
    transform-origin: top left;
    width: 125%;
    height: 125%;
    overflow: hidden;
    position: relative;
  }

  .logo {
    width: 200px;
    top: 15px;
    left: 15px;
  }
}
</style>
