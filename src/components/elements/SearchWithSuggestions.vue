<template>
  <div class="suggest-input">
    <input name="search" type="text" v-model="searchText" @input="searchDebounce" />
    <div v-if="suggestions.length || loading" class="suggestions">
      <VSpinner v-if="loading" class="spinner" />
      <div v-else v-for="suggestion in suggestions" :key="suggestion.id" class="suggestion" @click="selectSuggestion(suggestion.id)">
        {{ suggestion.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { debounce } from '@/helpers';
import VSpinner from '@/components/elements/VSpinner.vue';

const searchText = ref('');

const props = withDefaults(
  defineProps<{
    suggestions: { id: number; name: string }[];
    loading: boolean;
  }>(),
  {
    loading: false
  }
);

const emit = defineEmits<{
  (event: 'search', search: string): void;
  (event: 'select', suggestion: number): void;
}>();

const searchDebounce = debounce(() => {
  emit('search', searchText.value);
}, 500);

const selectSuggestion = (suggestionId: number) => {
  emit('select', suggestionId);
  searchText.value = '';
};
</script>

<style scoped lang="scss">
.suggest-input {
  position: relative;

  display: flex;
  flex-direction: column;

  width: 100%;

  input {
    padding: 0.5rem;
  }

  .suggestions {
    position: absolute;
    top: 35px;

    width: 100%;
    border: 1px solid #000;

    .spinner {
      // TODO: add props sizes to spinner
      width: 40px;
      height: 40px;

      border-width: 8px;

      margin: 0 auto;
    }

    .suggestion {
      padding: 0.5rem 1rem;
      border-bottom: 1px solid #000;

      cursor: pointer;

      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
