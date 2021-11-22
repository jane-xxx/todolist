<template>
    <li>
        <label>
            <input
                type="checkbox"
                v-model="isCompleted"
            />
            <span>{{ item.title }}</span>
        </label>
        <button class="btn btn-danger" @click="deleteTodo">删除</button>
    </li>
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue';
import {Todo} from '../types/todo';

export default defineComponent({
    name: 'App',
    props: {
        item: {
            type: Object as () => Todo, // 函数返回的是Todo类型
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        deleteTodos: {
            typeof: Function,
            required: true
        },
        updateTodos: {
            typeof: Function,
            required: true
        }
    },
    setup(props) {
        const deleteTodo = () => {
            if (window.confirm('你确定要删除嘛？')) {
                props.deleteTodos(props.index);
            }
        };
        // 计算属性的方式---操作当前复选框的选中/不选中
        const isCompleted = computed({
            get() {
                return props.item.isCompleted;
            },
            set(val) {
                props.updateTodos(props.item, val);
            }
        });
        return {
            deleteTodo,
            isCompleted
        };
    }
});
</script>

<style scoped>
/* item */
li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 6px;
    border-bottom: 1px solid #ddd;
}
li label {
    float: left;
    cursor: pointer;
}
li label input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
}
li button {
    float: right;
    display: none;
    margin-top: 3px;
}
li:last-child {
    border-bottom: 0;
}
li:hover {
    background: rgba(0,102,255,.086);;
    color: #2c79ef;
}
li:hover button {
    display: inline-block;
}
</style>
