<template>
  <div class="M-Flipper" :class="[flipType, { go: isFlipping }]">
    <div class="digital front" :class="_textClass(frontTextFromData)"></div>
    <div class="digital back" :class="_textClass(backTextFromData)"></div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue"

const props = defineProps({
  // front paper text
  // 前牌文字
  frontText: {
    type: [Number, String],
    default: "00"
  },
  // back paper text
  // 后牌文字
  backText: {
    type: [Number, String],
    default: "01"
  },
  // flipping duration, please be consistent with the CSS animation-duration value.
  // 翻牌动画时间，与CSS中设置的animation-duration保持一致
  duration: {
    type: Number,
    default: 600
  }
})
const isFlipping = ref(false)
const flipType = ref("down")
const frontTextFromData = ref(props.frontText)
const backTextFromData = ref(props.backText)

function _textClass(number) {
  return "number" + number
}
function _flip(type, front, back) {
  // 如果处于翻转中，则不执行
  if (isFlipping.value) {
    return false
  }
  frontTextFromData.value = front
  backTextFromData.value = back
  // 根据传递过来的type设置翻转方向
  flipType.value = type
  // 设置翻转状态为true
  isFlipping.value = true
  setTimeout(() => {
    // 设置翻转状态为false
    isFlipping.value = false
    frontTextFromData.value = back
  }, props.duration)
}
// 下翻牌
function flipDown(front, back) {
  _flip("down", front, back)
}
// 上翻牌
function flipUp(front, back) {
  _flip("up", front, back)
}
// 设置前牌文字
function setFront(text) {
  frontTextFromData.value = text
}
// 设置后牌文字
function setBack(text) {
  backTextFromData.value = text
}
defineExpose({
  flipDown,
  flipUp,
  setFront,
  setBack
})
</script>

<style lang="scss" scoped>
.M-Flipper {
  display: inline-block;
  position: relative;
  width: 50px;
  height: 65px;
  line-height: 65px;
  border: solid 1px #4A88B1;
  border-radius: 10px;
  background: #fff;
  font-size: 35px;
  color: #fff;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  text-align: center;
  font-family: "Helvetica Neue";
}

.M-Flipper .digital:before,
.M-Flipper .digital:after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  background: #4A88B1;
  overflow: hidden;
  box-sizing: border-box;
}

.M-Flipper .digital:before {
  top: 0;
  bottom: 50%;
  border-radius: 10px 10px 0 0;
  border-bottom: solid 1px #666;
}

.M-Flipper .digital:after {
  top: 50%;
  bottom: 0;
  border-radius: 0 0 10px 10px;
  line-height: 0;
}

/*向下翻*/
.M-Flipper.down .front:before {
  z-index: 3;
}

.M-Flipper.down .back:after {
  z-index: 2;
  transform-origin: 50% 0%;
  transform: perspective(160px) rotateX(180deg);
}

.M-Flipper.down .front:after,
.M-Flipper.down .back:before {
  z-index: 1;
}

.M-Flipper.down.go .front:before {
  transform-origin: 50% 100%;
  animation: frontFlipDown 0.6s ease-in-out both;
  box-shadow: 0 -2px 6px rgba(255, 255, 255, 0.3);
  backface-visibility: hidden;
}

.M-Flipper.down.go .back:after {
  animation: backFlipDown 0.6s ease-in-out both;
}

/*向上翻*/
.M-Flipper.up .front:after {
  z-index: 3;
}

.M-Flipper.up .back:before {
  z-index: 2;
  transform-origin: 50% 100%;
  transform: perspective(160px) rotateX(-180deg);
}

.M-Flipper.up .front:before,
.M-Flipper.up .back:after {
  z-index: 1;
}

.M-Flipper.up.go .front:after {
  transform-origin: 50% 0;
  animation: frontFlipUp 0.6s ease-in-out both;
  box-shadow: 0 2px 6px rgba(255, 255, 255, 0.3);
  backface-visibility: hidden;
}

.M-Flipper.up.go .back:before {
  animation: backFlipUp 0.6s ease-in-out both;
}

@keyframes frontFlipDown {
  0% {
    transform: perspective(160px) rotateX(0deg);
  }

  100% {
    transform: perspective(160px) rotateX(-180deg);
  }
}

@keyframes backFlipDown {
  0% {
    transform: perspective(160px) rotateX(180deg);
  }

  100% {
    transform: perspective(160px) rotateX(0deg);
  }
}

@keyframes frontFlipUp {
  0% {
    transform: perspective(160px) rotateX(0deg);
  }

  100% {
    transform: perspective(160px) rotateX(180deg);
  }
}

@keyframes backFlipUp {
  0% {
    transform: perspective(160px) rotateX(-180deg);
  }

  100% {
    transform: perspective(160px) rotateX(0deg);
  }
}
.M-Flipper {
  @for $i from 0 through 59 {
    $classPrefix: if($i <= 9, "number0", "number");
    $content: if($i <= 9, "0" + $i, $i);
    .digital.#{$classPrefix}#{$i}:before,
    .digital.#{$classPrefix}#{$i}:after {
      // 你的样式
      content: "#{$content}";
    }
  }
}
</style>
