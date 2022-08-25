import database from '@react-native-firebase/database';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const AddTodoRequest = async ({userData, title, description}) => {
  const currentTime = Date.now().valueOf();
  const reference = database().ref(
    `/users/${userData.user.id}/todos/${new Date()
      .toISOString()
      .slice(0, 10)}/${currentTime}`,
  );

  try {
    let response = await reference.set({
      title: title,
      description: description,
      id: currentTime,
      isCompleted: false,
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const updateTodoItem = async ({
  userData,
  date,
  id,
  title,
  description,
  isCompleted,
}) => {
  const reference = database().ref(
    `/users/${userData.user.id}/todos/${date}/${id}`,
  );
  try {
    if (id == null) {
      return false;
    }
    let newItem = {
      id: id,
    };
    if (isCompleted != null) {
      newItem.isCompleted = isCompleted;
    }
    if (title != null) {
      newItem.title = title;
    }
    if (description != null) {
      newItem.description = description;
    }

    let response = await reference.update(newItem);
    return true;
  } catch (err) {
    return false;
  }
};

/** Redux Async Thunks */
export const fetchTodoList = createAsyncThunk(
  'todo/fetchList',
  async userData => {
    try {
      const reference = database().ref(`/users/${userData.user.id}/todos/`);
      let respone = await reference.once('value');
      if (respone) {
        return respone.val();
      } else return null;
    } catch (err) {
      return err;
    }
  },
);
