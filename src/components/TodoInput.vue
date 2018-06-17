<template>
  <div>
      <form @submit.prevent="addTodo">
          <input type="text" v-model="newTodo" placeholder="What needs to be done?" @keyup.enter="addTodo"/>
      </form>
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
        var value = this.newTodo && this.newTodo.trim()
        this.$emit('addItem', { label: value, isCompleted: false });
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
        border: none;
        background-color: transparent;
        border-radius: 4px;
        box-sizing: border-box;
        font-size: inherit;
    }
</style>
