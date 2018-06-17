<template>
    <div class="container">
        <h2>This is your TODO list!</h2>
        <header class="header-top">
            <input class="toggle-all custom mark" type="checkbox"/>
            <todo-input @addItem="addTodo($event)"></todo-input>  
        </header>
        <ul v-if="filteredTodos && filteredTodos.length">
            <li v-for="(todo, i) in filteredTodos" :key="i" :todo="todo" :class="{ completed : todo.isCompleted}">
                <div v-if="!isEditing">
                    <input class="toggle custom mark" type="checkbox" v-model="todo.isCompleted">
                    <label class="todo-text" @dblclick="editTodo(todo)">{{ todo.label }}</label>
                    <span @click="deleteItem(i)"></span>
                </div>
                <input v-else class="edit" type="text"
                    v-model="todo.label"
                    @blur="doneEdit(todo)"
                    @keyup.enter="doneEdit(todo)"
                    @keyup.esc="cancelEdit(todo)">
            </li>
        </ul>
        <p v-else>Your TODO list is empty. Please add new tasks!</p>   
        <footer class="footer" v-show="todos.length">
            <span class="todo-count">
            <strong>{{ remaining }}</strong> {{ remaining | pluralize }} left
            </span>
            <ul class="filters">
                <li><a href="#/all" :class="{ selected: visibility == 'all' }">All</a></li>
                <li><a href="#/active" :class="{ selected: visibility == 'active' }">Active</a></li>
                <li><a href="#/completed" :class="{ selected: visibility == 'completed' }">Completed</a></li>
            </ul>
            <button class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">
                Clear completed
            </button>
        </footer>  
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import TodoInput from './TodoInput.vue';

// visibility filters
var filters: any = {
  all: function (todos: any[]) {
    return todos
  },
  active: function (todos: any[]) {
    return todos.filter(function (todo) {
      return !todo.isCompleted
    })
  },
  completed: function (todos: any[]) {
    return todos.filter(function (todo) {
      return todo.isCompleted
    })
  },
  filters: {
    pluralize: function (n: number) {
      return n === 1 ? 'item' : 'items'
    }
  },
}

export default Vue.extend({
    data() {
        return {
            todo: { label: '', isCompleted: false },
            todos: [
                {label: "Write code for TODO project", isCompleted: false},
                {label:"Learn a new foreign language", isCompleted: false }
            ],
            visibility: 'all',
            editedTodo: null,
            beforeEditCache: null,
            isEditing: false
        }
    },
    methods: {
        addTodo(item: any) { 
            this.todos.push(item);
        },
        deleteItem(itemIndex: number) {
            this.todos.splice(itemIndex, 1);
        },
        editTodo: function (todo: any) {
            console.log("Edit started")
            this.beforeEditCache = todo.label
            this.editedTodo = todo
            this.isEditing = true
        },
        doneEdit: function (todo: any) {
            if (!this.editedTodo) {
                return
            }
            this.isEditing = false
            this.editedTodo = null
            todo.label = todo.label.trim()
            if (!todo.label) {
                this.deleteItem(this.todos.indexOf(todo))
            }
        },
        cancelEdit: function (todo: any) {
            this.isEditing = false
            this.editedTodo = null
            todo.label = this.beforeEditCache
        },
        removeCompleted: function () {
            this.todos = filters.active(this.todos)
        }
    },
    components: {
        TodoInput
    },
    computed: {
    filteredTodos: function (): any {
      return filters[this.visibility](this.todos)
    },
    remaining: function () : number {
      return filters.active(this.todos).length
    },
    allDone: {
      get: function () : boolean {
        return this.remaining === 0
      },
      set: function (value: any) {
        this.todos.forEach(function (todo) {
          todo.isCompleted = value
        })
      }
    },
    },
    filters: {
    pluralize: function (n: number) {
      return n === 1 ? 'item' : 'items'
    }
  },
});
</script>

<style scoped>
.container {
    position: relative;
    margin: auto;
    font-size: 20px;
    width: 500px;
    box-sizing: border-box;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    text-align: center;
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
}

.header-top {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
}

ul {
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 2px 3px rgba(0,0,0,0.23);
    padding: 0;
    text-align: left;
}

li {
    width: 300px;
    list-style: none;
    line-height: 1.5;
    padding: 5px;
}

li > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

li > div > span::after {
    margin-left: 5px;
    cursor: pointer;
    content: url('data:image/svg+xml; utf8, <svg enable-background="new 0 0 512 512" height="15px" id="Layer_1" version="1.0" viewBox="0 0 512 512" width="18px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon points="445.2,109.2 402.8,66.8 256,213.6 109.2,66.8 66.8,109.2 213.6,256 66.8,402.8 109.2,445.2 256,298.4 402.8,445.2   445.2,402.8 298.4,256 "/></svg>');
}

.filters li {
    display: inline;
}

a {
    text-decoration: none;
    padding: 5px;
    color: darkgrey;
}

a:hover, button:hover {
    color: salmon;
}

.completed {
    text-decoration-line: line-through;
    color: darkgrey;
}

.clear-completed {
    position: absolute;
    bottom: 45px;
    right: 30px;
    border: none;
    background-color: transparent;
}

.todo-count {
    padding: 5px;
    text-align: left;
    color: darkgrey;
}

.todo-text {
    padding: 0 5px;
}

input.custom:not([type=checkbox]) {
  border: 2px solid rgb(219, 232, 239);
  border-radius: 4px;
  outline: none;
  padding: 8px 12px;
  padding: 0.5em 0.5em;
  line-height: 1.25;
  color: #33425e;
  font-size: inherit;
  margin: 5px 5px 5px 0;
  transition: all .4s;
}

input.custom:not([type=checkbox]):focus {
  border: 1px solid salmon;
}

/*custom input checkbox*/
input[type=checkbox].custom {
  position: relative;
  cursor: pointer;
}

input[type=checkbox].custom:before {
  content: "";
  display: block;
  position: absolute;
  width: 1em;
  height: 1em;
  top: -1px;
  left: -1px;
  border: 2px solid #e1e6ef;
  border-radius: 3px;
  background-color: white;
}

input[type=checkbox].mark:checked:after {
  content: "";
  display: block;
  width: 0.3em;
  height: 0.7em;
  border: solid #fff;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  position: absolute;
  top: 1px;
  left: 4px;
}

input[type=checkbox].custom:checked:before {
  border-color: salmon;
  background-color: salmon;
}

</style>