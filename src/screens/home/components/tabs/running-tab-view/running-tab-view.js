import React from 'react';
import {FlatList, Text, View} from 'react-native';
import * as Progress from 'react-native-progress';
import {useSelector} from 'react-redux';
import Routes from '../../../../../navigation/routes';
import {getTodoList, getTodoStatus} from '../../../../../redux/home/todo-slice';
import {evaluateData, searchDay} from '../../../utils';
import TodoListItem from '../../todo-flatlist/todo-list-item/todo-list-item';
import {ScreenTextBg} from '../stylables';

const RunningTabView = ({navigation}) => {
  const todoListResponse = useSelector(getTodoList);
  const todoStatus = useSelector(getTodoStatus);
  const todoList = evaluateData({todos: todoListResponse, isCompleted: false});

  const onItemClick = ({todo: todo, date: date}) => {
    navigation.navigate(Routes.ROUTE_TODO, {date: date, todo: todo});
  };

  //Screen data
  let screenData;
  if (todoStatus === 'loading') {
    screenData = (
      <ScreenTextBg>
        <Progress.Circle size={50} indeterminate={true} color="green" />
      </ScreenTextBg>
    );
  } else if (todoStatus === 'succeeded') {
    screenData = (
      <FlatList
        data={todoList}
        renderItem={({item}) => (
          <TodoListItem
            item={item}
            date={searchDay({item: item, response: todoListResponse})}
            onItemClick={({clickedItem, date}) =>
              onItemClick({todo: clickedItem, date: date})
            }
          />
        )}
      />
    );
  } else if (todoStatus === 'failed') {
    screenData = (
      <ScreenTextBg>
        <Text>No data available</Text>
      </ScreenTextBg>
    );
  }

  /** UI */
  return <View>{screenData}</View>;
};

export default RunningTabView;
