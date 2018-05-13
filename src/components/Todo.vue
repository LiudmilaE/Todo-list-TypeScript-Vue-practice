<template>
  <div>
        <input type="checkbox" :value="todo.isCompleted"/>
        <label>{{todo.label}}</label>
        <span @click="deleteItem(i)"></span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  
})
</script>
