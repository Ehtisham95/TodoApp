import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import * as React from 'react';
import CompletedTabView from '../../../screens/home/components/tabs/completed-tab-view/completed-tab-view';
import RunningTabView from '../../../screens/home/components/tabs/running-tab-view/running-tab-view';

const Tab = createMaterialTopTabNavigator();

const DashboardTabs = () => {
  return (
    <Tab.Navigator initialRouteName="Running">
      <Tab.Screen
        name="Running"
        component={RunningTabView}
        options={{tabBarLabel: 'Running'}}
      />
      <Tab.Screen
        name="Completed"
        component={CompletedTabView}
        options={{tabBarLabel: 'Completed'}}
      />
    </Tab.Navigator>
  );
};

export default DashboardTabs;
