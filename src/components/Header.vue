<template>
    <div class="todo-header">
        <input
            v-model="title"
            type="text"
            placeholder="请输入你的任务名称，按回车键确认"
            @keyup.enter="add"
        />
    </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';

export default defineComponent({
    name: 'App',
    props: {
        addTodos: {
            type: Function,
            required: true
        }
    },
    setup(props) {
        let title = ref('');
        const add = () => {
            if (!title.value.trim()) {
                return;
            }
            const todo = {
                id: Date.now(),
                title: title.value,
                isCompleted: false
            };
            props.addTodos(todo);
            title.value = '';
        };
        return {
            title,
            add
        };
    }
});
</script>

<style scoped>
/* header */
.todo-header input {
    width: 560px;
    height: 28px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px 8px;
}
.todo-header input:focus {
    outline: none;
    border-color: rgba(82, 168, 236, .8);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 1px 2px rgba(82, 168, 236, .6);
}
</style>
