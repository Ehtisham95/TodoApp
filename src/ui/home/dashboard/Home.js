import React, {useEffect} from 'react';
import {FlatList, Text} from 'react-native';
import * as Progress from 'react-native-progress';
import {useDispatch, useSelector} from 'react-redux';
import FAB from '../../../common/fab/FAB';
import {fetchTodoList} from '../../../repos/TodoRepo';
import Routes from '../../../utils/Routes';
import {getTodoList, getTodoStatus} from '../redux/TodoSlice';
import TodoListItem from './components/TodoListItem';
import {evaluateData, searchDay} from './HomeHelper';
import {FabBg, HomeBg, HomeCenterBg} from './stylables';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const todoListResponse = useSelector(getTodoList);
  const todoStatus = useSelector(getTodoStatus);
  const todoList = evaluateData(todoListResponse);
  const [authData, setAuthData] = useState({user: {id: ''}, loggedIn: false});
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    if (todoStatus === 'idle') {
      dispatch(fetchTodoList());
    }
  }, [todoStatus, dispatch]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    navigation.setOptions(
      {
        headerTintColor: Theme.colors.textColor,
        headerStyle: {backgroundColor: Theme.colors.primary},
        headerRight: () => <Text onPress={() => logOut()}>Logout</Text>,
      },
      [navigation],
    );
  });

  store.subscribe(() => {
    setAuthData(store.getState().loginSlice);
  });

  //Connecting with Firebase
  const onAuthStateChanged = async userData => {
    const loggedInUser = await getUserData();

    if (loggedInUser.loggedIn == true) {
      dispatch(loggedIn(loggedInUser));
    } else {
      dispatch(loggedOut());
    }
    if (initializing) setInitializing(false);
  };

  const logOut = async () => {
    await setUserData({user: {id: ''}, loggedIn: false});
    dispatch(loggedOut());
  };

  //Screen data
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

  /** UI */
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
