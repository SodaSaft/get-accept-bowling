<template>
  <div class="bowling-game">
    <bowling-frame
      v-for="(frame, index) in bowlingGameView"
      :key="`bowling-frame${index}`"
      :frame="frame"
    ></bowling-frame>
  </div>
</template>

<script>
import BowlingFrame from './bowling-frame.vue';

export default {
  name: 'bowling-game',
  components: { BowlingFrame },
  props: {
    bowlingGameView: { type: Array },
  },
};
</script>

<style scoped>

.bowling-game {
  display: flex;
  justify-content: flex-start;
}

</style>
