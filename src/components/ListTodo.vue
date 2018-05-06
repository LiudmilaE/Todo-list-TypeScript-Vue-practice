<template>
    <div class="container">
        <h2>This is your TODO list!</h2>
        <ul v-if="todos && todos.length">
            <li v-for="(todo, i) in todos" :key="i" :todo="todo">{{todo}}<span @click="deleteItem(i)"></span></li>
        </ul>
        <p v-else>Your TODO list is empty. Please add new tasks!</p>   
        <todo-input @addItem="addTodo($event)"></todo-input>    
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import TodoInput from './TodoInput.vue';

export default Vue.extend({
    data() {
        return {
            todo: '',
            todos: ["Write code for TODO project",
            "Learn French till level C1 at least"],
        }
    },
    methods: {
        addTodo(item: any) { 
            this.todos.push(item);
        },
        deleteItem(itemIndex: number) {
            this.todos.splice(itemIndex, 1);
        },
    },
    components: {
        TodoInput
    }
    // computed: {
    // }
});
</script>

<style scoped>
.container {
    padding: 10px;
    font-size: 20px;
}

/* li {
    display: flex;
    align-items: center;
    justify-content: space-around;
} */

li > span::after {
    margin-left: 5px;
    cursor: pointer;
    content: url('data:image/svg+xml; utf8, <svg enable-background="new 0 0 512 512" height="15px" id="Layer_1" version="1.0" viewBox="0 0 512 512" width="18px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon points="445.2,109.2 402.8,66.8 256,213.6 109.2,66.8 66.8,109.2 213.6,256 66.8,402.8 109.2,445.2 256,298.4 402.8,445.2   445.2,402.8 298.4,256 "/></svg>');
}

</style>