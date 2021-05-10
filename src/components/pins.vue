<template>
  <div class="pins">
    <button
      v-for="(value, index) in possibleHits"
      :key="`pin-${index}`"
      :number="index"
      @click="pinsHit(index)"
    >{{ index }}</button>
  </div>
</template>

<script>

export default {
  name: 'pins',
  methods: {
    pinsHit(amount) {
      this.$store.dispatch('pinsHit', { amount });
    },
  },
  computed: {
    possibleHits() {
      return this.$store.state.pinsLeft + 1;
    },
  },
};
</script>

<style scoped>

.pins {
  display: flex;
  justify-content: flex-start;
  column-gap: 10px;
  height: 30px;
}

</style>
