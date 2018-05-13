<template>
  <div>
      <form @submit.prevent="addTodo">
          <input type="text" v-model="newTodo"/>
      </form>
      <p>To add a new todo - fill in input below and press enter</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: [],
  data() {
      return {
          newTodo: ''
      }
  },
  methods: {
      addTodo() {
        this.$emit('addItem', { label: this.newTodo, isCompleted: false });
        this.newTodo = '';
      }
  }
})
</script>

<style scoped>
    input[type=text] {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }
</style>
