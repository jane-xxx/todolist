import {Todo} from '../types/todo';

export function saveStorage(todos: Todo[]): void {
    window.localStorage.setItem('todos_key', JSON.stringify(todos));
}

export function getStorage(): Todo[] {
    return JSON.parse(window.localStorage.getItem('todos_key') || '[]');
}