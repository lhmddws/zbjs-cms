<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import clock from "@/components/clock.vue";

const router = useRouter();

const Nav = ref([
  {
    img1: "/home.png",
    img2: "/home_act.png",
    title: "系统首页",
    path: "/home",
  },
  {
    img1: "/material.png",
    img2: "/material_act.png",
    title: "耗材信息",
    path: "",
    kid: [
      { title: "教学耗材", path: "/teach" },
      { title: "大赛耗材", path: "/match" },
      { title: "鉴定耗材", path: "/Identify" },
    ],
  },
  {
    img1: "/InboundRecords.png",
    img2: "/InboundRecords_act.png",
    title: "入库管理",
    path: "/InboundRecords",
  },
  {
    img1: "/OutboundRecords.png",
    img2: "/OutboundRecords_act.png",
    title: "出库管理",
    path: "/OutboundRecords",
  },
]);

onMounted(() => {
  router.push("/home");

  // 获取当前日期和星期
  const data = new Date();
  const year = data.getFullYear();
  const month = data.getMonth() + 1;
  const day = data.getDate();
  const week = data.getDay();
  const weeks = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  const weekDay = weeks[week];
  document.querySelector(".data").innerHTML =
    year + "年" + month + "月" + day + "日";
  document.querySelector(".week").innerHTML = weekDay;

  // 获取菜单和子菜单元素
  const menu = document.querySelector(".menu");
  const menuOption = menu.children;

  // 初始化所有选项为折叠状态，移除激活样式
  for (let i = 0; i < menuOption.length; i++) {
    const submenu = menuOption[i].querySelector(".submenu");
    if (submenu) {
      submenu.style.transition = "height 0.3s ease";
      submenu.style.overflow = "hidden";
      submenu.style.height = "0px";
      submenu.dataset.expanded = "false";
    }
    menuOption[i].classList.remove("active");
    menuOption[i].children[0].children[1].classList.remove("fontcolor");
    menuOption[i].children[0].children[0].src = Nav.value[i].img1;
    menuOption[i].children[0].children[2].src = "/next.png";
    menuOption[i].children[0].children[2].classList.remove("rotate");
  }

  // 自动选中“系统首页”，不激活子项
  for (let i = 0; i < Nav.value.length; i++) {
    if (Nav.value[i].title === "系统首页") {
      const item = menuOption[i];
      item.classList.add("active");
      item.children[0].children[1].classList.add("fontcolor");
      item.children[0].children[0].src = Nav.value[i].img2;
      item.children[0].children[2].src = "/next_act.png";
      break;
    }
  }

  function clearAllActive() {
    for (let j = 0; j < menuOption.length; j++) {
      const mItem = menuOption[j];
      const mSub = mItem.querySelector(".submenu");
      const mLink = mItem.children[0];

      mItem.classList.remove("active");
      mLink.children[1].classList.remove("fontcolor");
      mLink.children[0].src = Nav.value[j].img1;
      mLink.children[2].src = "/next.png";
      mLink.children[2].classList.remove("rotate");

      if (mSub) {
        mSub.dataset.expanded = "false";
        mSub.style.height = "0px";
        Array.from(mSub.children).forEach(subLi => {
          subLi.classList.remove("active");
          const subLink = subLi.querySelector("a");
          if (subLink) {
            subLink.children[0].classList.remove("fontcolor");
            const icon = subLink.querySelector(".next");
            if (icon) icon.src = "/next.png";
          }
        });
      }
    }
  }

  let currentSubmenu = null;

  for (let i = 0; i < menuOption.length; i++) {
    const item = menuOption[i];
    const submenu = item.querySelector(".submenu");

    item.addEventListener("click", (e) => {
      e.preventDefault();

      const isExpanded = submenu && submenu.dataset.expanded === "true";

      if (isExpanded) {
        // 当前已展开，再次点击时收起并清除样式
        submenu.style.height = submenu.scrollHeight + "px";
        submenu.offsetHeight;
        submenu.style.height = "0px";
        submenu.dataset.expanded = "false";

        // 清除当前项激活状态
        item.classList.remove("active");
        const link = item.children[0];
        link.children[1].classList.remove("fontcolor");
        link.children[0].src = Nav.value[i].img1;
        link.children[2].src = "/next.png";
        link.children[2].classList.remove("rotate");
        return;
      }

      // 如果未展开，切换展开，先清除全部状态
      clearAllActive();

      if (submenu) {
        submenu.style.height = submenu.scrollHeight + "px";
        submenu.dataset.expanded = "true";
        item.classList.add("active");
        const link = item.children[0];
        link.children[1].classList.add("fontcolor");
        link.children[0].src = Nav.value[i].img2;
        link.children[2].src = "/next_act.png";
        link.children[2].classList.add("rotate");
      } else {
        item.classList.add("active");
        const link = item.children[0];
        link.children[1].classList.add("fontcolor");
        link.children[0].src = Nav.value[i].img2;
        link.children[2].src = "/next_act.png";
        link.children[2].classList.add("rotate");
      }
    });

    // 为每个子菜单项添加点击事件（精简逻辑，点击子项后父菜单保持展开，仅折叠其它父菜单及子项）
    if (submenu) {
      const subItems = submenu.children;
      for (let k = 0; k < subItems.length; k++) {
        const subItem = subItems[k];
        subItem.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();

          clearAllActive();

          // 激活当前父菜单
          item.classList.add("active");
          const link = item.children[0];
          link.children[1].classList.add("fontcolor");
          link.children[0].src = Nav.value[i].img2;
          link.children[2].src = "/next_act.png";
          link.children[2].classList.add("rotate");
          submenu.style.height = submenu.scrollHeight + "px";
          submenu.dataset.expanded = "true";

          // 激活当前子菜单项
          subItem.classList.add("active");
          const subLink = subItem.querySelector("a");
          if (subLink) {
            subLink.children[0].classList.add("fontcolor");
            const icon = subLink.querySelector(".next");
            if (icon) icon.src = "/next_act.png";
          }
        });
      }
    }
  }
});
</script>

<template>
  <div id="leftNav">
    <div class="user">
      <img src="/School_badge.png" alt="" class="Picture" />
    </div>
    <ul class="menu">
      <li v-for="(item, index) in Nav" :key="index">
        <router-link :to="item.path">
          <img class="icon" :src="item.img1" />
          <span class="title">{{ item.title }}</span>
          <img src="/next.png" class="next" />
        </router-link>
        <ul v-if="item.kid && item.kid.length > 0" class="submenu">
          <li v-for="(item1, index) in item.kid" :key="index">
            <router-link :to="item1.path">
              <span class="title">{{ item1.title }}</span>
              <img src="/next.png" class="next" />
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
    <clock />
    <div class="time">
      <div class="data"></div>
      <div class="week"></div>
    </div>
  </div>
</template>

<style scoped>
#leftNav {
  width: 250px;
  height: 100%;
  background-color: #cfdfee;
  text-align: center;
}

.user {
  margin-top: 50px;
  margin-left: 75px;
  width: 100px;
  height: 100px;
  border-radius: 100px;
  background-color: #ffffff;
  text-align: center;
  position: relative;
  box-shadow: 0 0 20px -5px;
  overflow: hidden;
}

.Picture {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

ul.menu {
  height: 440px;
  list-style: none;
  padding: 0px;
  margin-top: 50px;
  margin-bottom: 40px;
}

ul.submenu {
  list-style: none;
  padding: 0px;
  transition: height 0.3s ease;
  overflow: hidden;
}

ul li {
  text-align: left;
  width: 250px;
  background: linear-gradient(to right, #4a88b1, #cfdfee) no-repeat;
  background-size: 0px 55px;
  transition: background-size 0.2s ease-in-out;
}

ul li:hover {
  background-size: 250px 55px;
}

.active {
  background: linear-gradient(to right, #4a88b1, #cfdfee) no-repeat;
  background-size: 250px 55px;
}

.title {
  margin-left: 10px;
  margin-right: 100px;
}

ul.submenu li .title {
  padding-left: 20px;
}

.icon {
  width: 20px;
  height: 20px;
  vertical-align: -2px;
  padding-left: 10px;
}

.next {
  width: 13px;
  height: 13px;
  margin-right: 30px;
}

.rotate {
  transform: rotate(90deg);
  transition: transform 0.3s ease;
}

a {
  color: #101720;
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 55px;
  line-height: 55px;
}

.fontcolor {
  color: #ffffff;
}

.time {
  width: 250px;
  color: #201016;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
}

.data {
  font-size: 16px;
  margin-top: 20px;
  margin-left: 40px;
}

.week {
  font-size: 16px;
  margin-top: 20px;
  margin-right: 40px;
}
</style>
