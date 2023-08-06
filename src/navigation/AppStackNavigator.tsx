import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import ContactListScreen from '../screens/ContactListScreen';
import ContactInfoScreen from '../screens/ContactInfoScreen';

// Define the root stack param list
export type RootStackParamList = {
  ContactList: undefined;
  ContactInfo: { contactId: string }; // Add the contactId parameter
};

// Define the navigation props type
export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>(); // Pass the root stack param list

const AppStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ContactList"
        component={ContactListScreen}
        options={{
          headerTitle: 'Contacts',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#F0F0F0',
            borderBottomWidth: 1,
            borderBottomColor: 'darkgray',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="ContactInfo"
        component={ContactInfoScreen}
        options={{
          headerTitle: '',
          headerBackTitle: 'Cancel',
          headerBackTitleVisible: true,
          headerBackImage: () => null,
          headerTintColor: '#FF8C00',
          headerStyle: {
            backgroundColor: '#F0F0F0',
            borderBottomWidth: 1,
            borderBottomColor: 'darkgray',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
