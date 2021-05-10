<template functional>
  <div class="bowling-frame" :class="{
    'last-frame': props.frame.frameNumber === 10,
    'active': props.frame.isActive
  }">
    <div class="frame-number">{{ props.frame.frameNumber }}</div>
    <div class="left-box">{{ props.frame.leftBox }}</div>
    <div class="right-box">{{ props.frame.rightBox }}</div>
    <div v-if="props.frame.frameNumber === 10" class="bonus-box">{{ props.frame.bonusBox }}</div>
    <div class="score">{{ props.frame.score }}</div>
  </div>
</template>

<script>
export default {
  name: 'bowling-frame',
  props: {
    frame: { type: Object },
  },
};
</script>

<style scoped>

.bowling-frame {
  display: grid;
  grid-template-columns: repeat(2, 40px);
  grid-template-rows: auto 30px 20px;
  grid-template-areas:
    "frameNumber frameNumber"
    "leftBox rightBox"
    "score score";
  border: solid black 1px;
  border-right: none;
}

.active {
  background-color: orange;
}

.frame-number {
  grid-area: frameNumber;
  border-bottom: solid black 2px;
}
.left-box {
  grid-area: leftBox;
}
.right-box {
  grid-area: rightBox;
}
.bonus-box {
  grid-area: bonusBox;
}
.score {
  grid-area: score;
}

.last-frame {
  grid-template-columns: repeat(3, 40px);
  grid-template-areas:
    "frameNumber frameNumber frameNumber"
    "leftBox rightBox bonusBox"
    "score score score";
  border-right: solid black 1px;
}

</style>
