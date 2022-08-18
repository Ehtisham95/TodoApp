import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {AddTodo} from '../../data/TodoRepo';
import {fetchTodoList} from '../../redux/TodoSlice';
import {RoundedTextInput} from '../../styles/textinputs/RoundedTextInput';
import {ScreenTitle} from '../../styles/texts/ScreenTitle';

const TodoDetails = ({navigation}) => {
  const [todoDetails, setTodoDetails] = useState({title: '', description: ''});
  const dispatch = useDispatch();

  const editDetails = ({newTitle, newDescription}) => {
    if (newTitle != null) setTodoDetails({...todoDetails, title: newTitle});
    else if (newDescription != null)
      setTodoDetails({...todoDetails, description: newDescription});
  };

  const addOrEditTodo = async () => {
    console.log('todo details', todoDetails);
    if (!todoDetails.title || todoDetails.title.length < 1) {
      alert('Title cannot be emtpy!');
    } else if (!todoDetails.description || todoDetails.description.length < 1) {
      alert('Desctiption cannot be emtpy!');
    } else {
      let success = AddTodo(todoDetails);
      if (success) {
        alert('Todo Added Successfully!');
        setTodoDetails({title: '', description: ''});
        dispatch(fetchTodoList());
      } else {
        alert('Something went wrong!');
      }
    }
  };

  useEffect(() => {
    navigation.setOptions(
      {
        title: '',
        headerRight: () => <Text onPress={() => addOrEditTodo()}>Done</Text>,
      },
      [navigation],
    );
  });

  return (
    <View>
      <ScreenTitle title="Add Todo Details" />
      <RoundedTextInput
        placeholder="Title"
        onChangeText={title => editDetails({newTitle: title})}
        value={todoDetails.title}
      />
      <RoundedTextInput
        placeholder="Description"
        multiline
        onChangeText={description => editDetails({newDescription: description})}
        value={todoDetails.description}
      />
    </View>
  );
};

export default TodoDetails;
