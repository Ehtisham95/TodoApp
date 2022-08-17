import database from '@react-native-firebase/database';
import {getUserData} from './AuthRepo';

export const AddTodo = async ({title, description}) => {
  const userData = await getUserData();
  const currentTime = Date.now().valueOf();
  const reference = database().ref(
    `/users/${userData.user.id}/todos/${new Date()
      .toISOString()
      .slice(0, 10)}/${currentTime}`,
  );

  let response = await reference.set({
    title: title,
    description: description,
    id: currentTime,
    isCompleted: false,
  });

  if (response) {
    return true;
  } else {
    return false;
  }
};

export const UpdateTodo = async ({
  date,
  id,
  title,
  description,
  isCompleted,
}) => {
  const userData = await getUserData();
  const reference = database().ref(
    `/users/${userData.user.id}/todos/${date}/${id}`,
  );
  let updatedObject = {
    title: title,
    description: description,
    isCompleted: isCompleted,
  };

  let respone = await reference.update(updatedObject);
  if (respone) {
    return true;
  } else return false;
};

export const getTodosOnce = async () => {
  const userData = await getUserData();
  const reference = database().ref(`/users/${userData.user.id}/todos/`);
  let respone = await reference.once('value');
  if (respone) {
    return respone.val();
  } else return null;
};
