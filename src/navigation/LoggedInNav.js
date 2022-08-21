import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../ui/auth/login/Login';
import AddTodo from '../ui/home/addtodo/AddTodo';
import Home from '../ui/home/dashboard/Home';
import Routes from '../utils/Routes';
import Theme from '../utils/theme';

const Stack = createNativeStackNavigator();

export const LoggedInNav = () => {
  return (
    <Stack.Navigator>
      <>
        <Stack.Screen name={Routes.ROUTE_HOME} component={Home} />
        <Stack.Screen name={Routes.ROUTE_TODO} component={AddTodo} />
      </>
    </Stack.Navigator>
  );
};
