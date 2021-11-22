<template>
    <div class="todo-footer">
        <label>
            <input type="checkbox" v-model="isCheckAll"/>
        </label>
        <span>
            <span>已完成{{ count }}</span>/全部{{ todos.length }}
        </span>
        <button class="btn btn-danger" @click="clearSelected">清除已完成任务</button>
    </div>
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue';
import {Todo} from '../types/todo';

export default defineComponent({
    name: 'App',
    props: {
        todos: {
            type: Array as () => Todo[],
            reuqired: true
        },
        checkAll: {
            type: Function,
            required: true
        },
        clearSelected: {
            type: Function, 
            required: true
        }
    },
    setup(props) {
        let count = computed(() => {
            return props.todos.reduce((value, todo) => value+(todo.isCompleted ? 1 : 0), 0);
        });
        let isCheckAll = computed({
            get() {
                return count.value > 0 && (count.value === props.todos.length);
            },
            set(value) {
                props.checkAll(value);
            }
        });
        return {
            count,
            isCheckAll
        };
    }
});
</script>

<style scoped>
/* footer */
.todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 4px;
}
.todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
}
.todo-footer .btn {
    margin-left: 20px;
}
</style>
