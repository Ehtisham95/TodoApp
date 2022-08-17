import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {FAB} from 'react-native-elements';
import styled from 'styled-components/native';
import {getTodosOnce} from '../../data/TodoRepo';
import Routes from '../../utils/Routes';
import TodoListItem from './TodoListItem';

const HomeBg = styled.View`
  flex: 1;
`;

const FabStyle = styled.View`
  position: absolute;
  bottom: 24px;
  right: 24px;
`;

const Home = ({navigation}) => {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let response = await getTodosOnce();
    let list = evaluateData(response);
    setTodoList(list);
  };

  const evaluateData = response => {
    let items = Object.keys(response).map(k => response[k]);
    var itemsArray = new Array();

    Object.keys(response).map(dayKey => {
      Object.keys(response[dayKey]).map(timeKey => {
        itemsArray.push(response[dayKey][timeKey]);
      });
    });
    return itemsArray;
  };

  return (
    <HomeBg>
      <FlatList
        data={todoList}
        renderItem={({item}) => <TodoListItem item={item} />}
      />
      <FabStyle>
        <FAB
          title="Add Todo"
          color="green"
          onPress={() => navigation.navigate(Routes.ROUTE_TODO)}
        />
      </FabStyle>
    </HomeBg>
  );
};

export default Home;
