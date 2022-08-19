import React, {useEffect, useCallback} from 'react';
import {FlatList, Text} from 'react-native';
import * as Progress from 'react-native-progress';
import {useDispatch, useSelector} from 'react-redux';
import FAB from '../../styles/buttons/FAB';
import Routes from '../../utils/Routes';
import {FabBg, HomeBg, HomeCenterBg} from './stylables';
import TodoListItem from './TodoListItem';
import {fetchTodoList, getTodoList, getTodoStatus} from './TodoSlice';
import {evaluateData, searchDay} from './utils';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const todoListResponse = useSelector(getTodoList);
  const todoStatus = useSelector(getTodoStatus);
  const todoList = evaluateData(todoListResponse);

  useEffect(() => {
    if (todoStatus === 'idle') {
      dispatch(fetchTodoList());
    }
  }, [todoStatus, dispatch]);

  let screenData;
  if (todoStatus === 'loading') {
    screenData = (
      <HomeCenterBg>
        <Progress.Circle size={50} indeterminate={true} color="green" />
      </HomeCenterBg>
    );
  } else if (todoStatus === 'succeeded') {
    screenData = (
      <FlatList
        data={todoList}
        renderItem={({item}) => (
          <TodoListItem
            item={item}
            date={searchDay({item: item, response: todoListResponse})}
          />
        )}
      />
    );
  } else if (todoStatus === 'failed') {
    screenData = (
      <HomeCenterBg>
        <Text>No data available</Text>
      </HomeCenterBg>
    );
  }

  return (
    <HomeBg>
      {screenData}
      <FabBg>
        <FAB
          title="Add Todo"
          color="green"
          onPress={() => navigation.navigate(Routes.ROUTE_TODO)}
        />
      </FabBg>
    </HomeBg>
  );
};

export default Home;
