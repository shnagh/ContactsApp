import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ContactsProvider } from './ContactsContext';
import ContactsScreen from './ContactsScreen';
import AddContactScreen from './AddContactScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <ContactsProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Contacts" component={ContactsScreen} />
            <Stack.Screen name="AddContact" component={AddContactScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ContactsProvider>
  );
}