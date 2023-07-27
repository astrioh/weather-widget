<template>
  <div>
    <div>Hello vue counter {{ counter }}</div>
    <button @click="counter++">Count</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data: () => ({
    counter: 0
  })
});
</script>
