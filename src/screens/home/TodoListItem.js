import React from 'react';
import {UpdateTodo} from '../../data/TodoRepo';
import AppDivider from '../../styles/dividers/AppDivider';
import {convertMillisToShowDate} from '../../utils/TimeUtils';
import {
  CheckBoxBg,
  DescriptionText,
  TitleText,
  TodoListItemStyle,
} from './stylables';
import TodoCheckbox from './TodoCheckBox';

const TodoListItem = ({date, item}) => {
  const onChecked = async checked => {
    const updated = await UpdateTodo({
      date: date,
      id: item.id,
      isCompleted: checked,
    });
  };

  return (
    <TodoListItemStyle>
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

export default TodoListItem;
