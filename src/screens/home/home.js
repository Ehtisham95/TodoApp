import auth from '@react-native-firebase/auth';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useContext, useEffect, useState} from 'react';
import {Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {UserDataContext} from '../../navigation/app-nav';
import Routes from '../../navigation/routes';
import DashboardTabs from '../../navigation/screens/home/top-navigation';
import {getTodoStatus} from '../../redux/home/todo-slice';
import {loggedIn, loggedOut} from '../../redux/login/login-slice';
import {store} from '../../redux/store';
import {setUserData} from '../../repos/auth-repo';
import {fetchTodoList} from '../../repos/todo-repo';
import FAB from '../../utils/components/common/fab/fab';
import Theme from '../../utils/theme';
import {propTypes} from './props';
import {FabBg, HomeBg} from './stylables';

const Tab = createMaterialTopTabNavigator();

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const todoStatus = useSelector(getTodoStatus);
  const userData = useContext(UserDataContext);
  const [authData, setAuthData] = useState({user: {id: ''}, loggedIn: false});

  useEffect(() => {
    if (todoStatus == 'idle') {
      dispatch(fetchTodoList(userData));
    }
  }, [dispatch, todoStatus]);

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
  }, []);

  useEffect(() => {
    setAuthData(store.getState().loginSlice);
  }, [loggedIn, loggedOut]);

  //Connecting with Firebase
  const onAuthStateChanged = async () => {
    if (userData.loggedIn == true) {
      dispatch(loggedIn(userData));
    } else {
      dispatch(loggedOut());
    }
  };

  const logOut = async () => {
    await setUserData({user: {id: ''}, loggedIn: false});
    dispatch(loggedOut());
  };

  const onAddTodoClicked = () => () => {
    navigation.navigate(Routes.ROUTE_TODO);
  };

  /** UI */
  return (
    <HomeBg>
      <DashboardTabs />
      <FabBg>
        <FAB title="Add Todo" color="green" onPress={onAddTodoClicked()} />
      </FabBg>
    </HomeBg>
  );
};

Home.propTypes = propTypes;

export default Home;
