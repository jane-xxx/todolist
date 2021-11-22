<template>
    <div class="todo-container">
        <div class="todo-wrap">
            <Header :addTodos="addTodos"/>
            <List
                :todos="todos"
                :deleteTodos="deleteTodos"
                :updateTodos="updateTodos"
            />
            <Footer
                :todos="todos"
                :checkAll="checkAll"
                :clearSelected="clearSelected"
            />
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs, watch, onMounted} from 'vue';
import Header from './components/Header.vue';
import List from './components/List.vue';
import Footer from './components/Footer.vue';
import {Todo} from './types/todo';
import {saveStorage, getStorage} from './utils/localStorageData';

export default defineComponent({
    name: 'App',
    components: {
        Header,
        List,
        Footer
    },
    setup() {
        // 创建list数据[{id, title, isCompleted}]
        const state = reactive<{todos: Todo []}>({
            todos: []
        });
        onMounted(() => {
            setTimeout(() => {
                state.todos = getStorage();
            }, 1000);
        });
        const addTodos = (list: Todo) => {
            state.todos.unshift(list);
        };
        const deleteTodos = (index: number) => {
            state.todos.splice(index, 1);
        };
        const updateTodos = (todo: Todo, flag: boolean) => {
            todo.isCompleted = flag;
        };
        const checkAll = (isCompleted: boolean) => {
            state.todos.forEach(item => {
                item.isCompleted = isCompleted;
            });
        };
        const clearSelected = () => {
            state.todos = state.todos.filter(item => !item.isCompleted);
        };
        watch(
            () => state.todos,
            saveStorage,
            {deep: true}
        );
        return {
            ...toRefs(state),
            addTodos,
            deleteTodos,
            updateTodos,
            checkAll,
            clearSelected
        };
    }
});
</script>

<style>
.btn {
    display: inline-block;
    padding: 4px 12px;
    margin-bottom: 0;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, .2), 0 1px 2px rgba(0, 0, 0, .05);
    border-radius: 4px;
}
.btn-danger {
    color: #fff;
    background: #da4f49;
    border: 1px solid #bd362f;
}
.btn-danger:hover {
    color: #fff;
    background: #bd362f;
}
.btn:focus {
    outline: none;
}
/* app */
.todo-container {
    width: 600px;
    margin: 0 auto;
}
.todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}
</style>
