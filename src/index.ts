import Vue from "vue";
import ListTodo from "./components/ListTodo.vue";

let v = new Vue({
    el: "#app",
    template: `
    <div>
        <list-todo :list="todos"/>
    </div>
    `,
    data: { },
    components: {
        ListTodo,
    }
});