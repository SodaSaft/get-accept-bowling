<template>
  <div id="app">
    <div class="reset-button">
      <button @click="resetBowlingGame">Reset game</button>
    </div>
    <pins></pins>
    <bowling-game :bowling-game-view="bowlingGameView"></bowling-game>
  </div>
</template>

<script>
import BowlingGame from '@/components/bowling-game.vue';
import Pins from '@/components/pins.vue';

export default {
  name: 'Home',
  components: {
    BowlingGame,
    Pins,
  },
  methods: {
    resetBowlingGame() {
      this.$store.commit('resetBowlingGame');
    },
  },
  computed: {
    bowlingGameView() {
      return this.$store.state.bowlingGameView;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  max-width: 1024px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.reset-button {
  height: 30px;
  display: flex;
  justify-content: flex-start;
}

</style>
