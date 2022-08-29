import React, {useContext, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {UserDataContext} from '../../navigation/app-nav';
import {
  AddTodoRequest,
  fetchTodoList,
  updateTodoItem,
} from '../../repos/todo-repo';
import RoundedTextInput from '../../utils/components/common/roundedtextinput/rounded-text-input';
import ScreenTitle from '../../utils/components/common/screentitle/screen-title';
import Theme from '../../utils/theme';
import {propTypes} from './props';

const AddTodo = ({navigation, route}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({defaultValues: route.params?.todo || null});
  const dispatch = useDispatch();
  const userData = useContext(UserDataContext);

  const callAddTodo = async todoDetails => {
    let success = false;
    if (route.params == null) {
      success = await AddTodoRequest({
        userData: userData,
        title: todoDetails.title,
        description: todoDetails.description,
      });
      if (success) {
        alert('Todo Added Successfully!');
        control.title = '';
        control.description = '';
        dispatch(fetchTodoList());
        navigation.goBack();
      } else {
        alert('Something went wrong!');
      }
    } else {
      success = await updateTodoItem({
        userData: userData,
        date: route.params.date,
        id: todoDetails.id,
        title: todoDetails.title,
        description: todoDetails.description,
      });
      if (success) {
        alert('Todo Updated Successfully!');
        dispatch(fetchTodoList(userData));
        navigation.goBack();
      } else {
        alert('Something went wrong!');
      }
    }
  };

  useEffect(() => {
    navigation.setOptions(
      {
        title: '',
        headerRight: () => (
          <Text onPress={handleSubmit(callAddTodo)}>Done</Text>
        ),
        headerTintColor: Theme.colors.textColor,
        headerStyle: {backgroundColor: Theme.colors.primary},
      },
      [navigation],
    );
  });

  return (
    <View>
      <ScreenTitle
        title={
          route.params == null ? 'Add Todo Details' : 'Update Todo Details'
        }
      />
      <RoundedTextInput
        name="title"
        required
        control={control}
        placeholder="Title"
      />
      <RoundedTextInput
        name="description"
        control={control}
        placeholder="Description"
        multiline
        required
      />
      {errors.title && alert('Title cannot be empty')}
      {errors.description && alert('Description cannot be empty')}
    </View>
  );
};

AddTodo.propTypes = propTypes;

export default AddTodo;
