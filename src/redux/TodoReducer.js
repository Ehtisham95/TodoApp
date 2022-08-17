import { createAction, createReducer } from '@reduxjs/toolkit';

export const AddTodoAction = createAction('todo/add');
export const UpdateTodoAction = createAction('todo/update');

export const todoReducer = createReducer({isUpdated: false}, builder => {
  builder.addCase(
    AddTodoAction, (state,action) => {
      state.isUpdated: true
    }
  ).addCase(
    UpdateTodoAction, (state,action) => {
      state.isUpdated: true
    }
  );
});
