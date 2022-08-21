import {AddTodoRequest} from '../../../repos/TodoRepo';

export const addTodo = async ({todoDetails}) => {
  if (!todoDetails.title || todoDetails.title.length < 1) {
    alertØ('Title cannot be emtpy!');
  } else if (!todoDetails.description || todoDetails.description.length < 1) {
    alert('Desctiption cannot be emtpy!');
  } else {
    let success = AddTodoRequest(todoDetails);
    if (success) {
      alert('Todo Added Successfully!');
      return true;
    } else {
      alert('Something went wrong!');
      return false;
    }
  }
};
