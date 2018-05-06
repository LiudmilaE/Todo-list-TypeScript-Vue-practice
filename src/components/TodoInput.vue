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
        this.$emit('addItem', this.newTodo);
        this.newTodo = '';
      }
  }
})
</script>

