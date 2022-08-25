import React, {memo, useContext} from 'react';
import {fetchTodoList, updateTodoItem} from '../../../../../repos/todo-repo';
import {
  CheckBoxBg,
  DescriptionText,
  TitleText,
  TodoListItemStyle,
} from './stylables';
import TodoCheckbox from '../todo-checkbox/todo-checkbox';
import {convertMillisToShowDate} from '../../../../../utils/time-utils';
import AppDivider from '../../../../../utils/components/common/dividers/app-divider';
import {propTypes} from './props';
import {useDispatch} from 'react-redux';
import {reloadData} from '../../../../../redux/home/todo-slice';
import {UserDataContext} from '../../../../../navigation/app-nav';

const TodoListItem = ({date, item, onItemClick}) => {
  const dispatch = useDispatch();
  const userData = useContext(UserDataContext);

  const onChecked = async checked => {
    let updated = await updateTodoItem({
      userData: userData,
      date: date,
      id: item.id,
      isCompleted: checked,
    });
    if (updated) {
      dispatch(reloadData());
    }
  };

  return (
    <TodoListItemStyle
      onPress={() => onItemClick({clickedItem: item, date: date})}>
      <TitleText>{item.title ? item.title : '--'}</TitleText>
      <DescriptionText rightMargin="50px" topMargin="8px">
        {item.description ? item.description : '--'}
      </DescriptionText>
      <CheckBoxBg>
        <TodoCheckbox checked={item.isCompleted} onChecked={onChecked} />
      </CheckBoxBg>
      <DescriptionText align="right" topMargin="8px">
        {item.id ? convertMillisToShowDate(item.id) : '--'}
      </DescriptionText>
      <AppDivider />
    </TodoListItemStyle>
  );
};

TodoListItem.propTypes = propTypes;

export default TodoListItem;
