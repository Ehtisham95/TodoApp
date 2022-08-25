import {createSlice} from '@reduxjs/toolkit';
import {fetchTodoList} from '../../repos/todo-repo';

const initialState = {
  response: {},
  status: 'idle', // 'idle' || 'loading' || 'succeeded' || 'failed'
  error: '',
};

export const todoSlice = createSlice({
  name: 'todoSlice',
  initialState: initialState,
  reducers: {
    reloadData(state) {
      state.status = 'idle';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodoList.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchTodoList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.response = action.payload;
      })
      .addCase(fetchTodoList.rejected, (stat, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const getTodoList = state => state.todoSlice.response;
export const getTodoStatus = state => state.todoSlice.status;
export const getTodoError = state => state.todoSlice.error;

export const {reloadData} = todoSlice.actions;
