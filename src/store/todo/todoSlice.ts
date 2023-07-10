import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface Todo {
    id: number;
    text: string;
    comleted?: boolean;
};
const initialState: Todo[] = [];
export const TodoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<Todo>) {
            state.push(action.payload)
            console.log(action.payload);
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            return state.filter(todo => todo.id !== id);
        },
        completedTodo(state, action) {
            console.log(action.payload);

            const { id, comleted } = action.payload;
            const todo = state.find((item) => item.id === id);
            if (todo) {
                todo.comleted = comleted;
            }
        },
        updatedTodo: (state, action: PayloadAction<{ id: number, description: string }>) => {
            const { id, description } = action.payload;
            const todo = state.find(todo => todo.id === id);
            if (todo) {
                todo.text = description;
            }
        },

    }
})
export const TodoSliceActions = TodoSlice.actions