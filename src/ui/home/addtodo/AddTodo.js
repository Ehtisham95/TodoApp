import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {RoundedTextInput} from '../../../common/roundedtextinput/RoundedTextInput';
import {ScreenTitle} from '../../../common/screentitle/ScreenTitle';
import {AddTodo} from '../../../repos/remote/TodoRepo';
import {fetchTodoList} from '../../../repos/TodoRepo';
import Theme from '../../../utils/theme';
import {addTodo} from './AddTodoHelper';

const AddTodo = ({navigation}) => {
  const [todoDetails, setTodoDetails] = useState({title: '', description: ''});
  const dispatch = useDispatch();

  const editDetails = ({newTitle, newDescription}) => {
    if (newTitle != null) setTodoDetails({...todoDetails, title: newTitle});
    else if (newDescription != null)
      setTodoDetails({...todoDetails, description: newDescription});
  };

  const callAddTodo = async () => {
    let success = addTodo(todoDetails);
    if (success) {
      setTodoDetails({title: '', description: ''});
      dispatch(fetchTodoList());
    }
  };

  useEffect(() => {
    navigation.setOptions(
      {
        title: '',
        headerRight: () => <Text onPress={() => callAddTodo()}>Done</Text>,
        headerTintColor: Theme.colors.textColor,
        headerStyle: {backgroundColor: Theme.colors.primary},
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

export default AddTodo;
