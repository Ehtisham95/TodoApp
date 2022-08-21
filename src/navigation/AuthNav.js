import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../ui/auth/login/Login';
import Routes from '../utils/Routes';

const Stack = createNativeStackNavigator();

export const AuthNav = () => {
  return (
    <Stack.Navigator>
      <>
        <Stack.Screen name={Routes.ROUTE_LOGIN} component={Login} />
      </>
    </Stack.Navigator>
  );
};
