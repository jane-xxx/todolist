<template>
    <ul class="todo-main">
        <Item
            v-for="(item, index) in todos"
            :key="item.id"
            :item="item"
            :index="index"
            :deleteTodos="deleteTodos"
            :updateTodos="updateTodos"
        />
    </ul>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Item from './Item.vue';

export default defineComponent({
    name: 'App',
    props: ['todos', 'deleteTodos', 'updateTodos'],
    components: {
        Item
    },
    setup() {
        return {};
    }
});
</script>

<style scoped>
/* main */
.todo-main {
    margin-left: 0;
    padding: 0;
    border: 1px solid #ddd;
    border-radius: 2px;
}
.todo-empty {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 4px;
    margin-top: 10px;
}
</style>
