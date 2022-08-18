import React, {useEffect} from 'react';
import {FlatList, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTodoList, getTodoList, getTodoStatus} from '../../redux/TodoSlice';
import FAB from '../../styles/buttons/FAB';
import Routes from '../../utils/Routes';
import {FabBg, HomeBg, HomeCenterBg} from './stylables';
import TodoListItem from './TodoListItem';

const evaluateData = todos => {
  if (todos) {
    let itemsArray = new Array();

    Object.keys(todos).map(dayKey => {
      Object.keys(todos[dayKey]).map(timeKey => {
        itemsArray.push(todos[dayKey][timeKey]);
      });
    });
    itemsArray.sort((a, b) => b.id - a.id);
    return itemsArray;
  }
};

const searchDay = ({item, response}) => {
  let day = '';
  Object.keys(response).map(dayKey => {
    Object.keys(response[dayKey]).map(timeKey => {
      if (item.id == timeKey) {
        day = dayKey;
      }
    });
  });
  return day;
};

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const todoListResponse = useSelector(getTodoList);
  const todoStatus = useSelector(getTodoStatus);
  const todoList = evaluateData(todoListResponse);

  useEffect(() => {
    console.log('Todo Status:', todoStatus);
    if (todoStatus === 'idle') {
      dispatch(fetchTodoList());
    }
  }, [todoStatus, dispatch]);

  let screenData;
  if (todoStatus === 'loading') {
    screenData = (
      <HomeCenterBg>
        <Text>Loading data...</Text>
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
