import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute, RouteProp  } from '@react-navigation/native';
import { RootStackNavigationProp, RootStackParamList } from '../navigation/AppStackNavigator';
import ContactItem from '../components/ContactItem';
import contactData from '../data/contacts.json';

type ContactListScreenRouteProp = RouteProp<RootStackParamList, 'ContactList'>; 


const ContactListScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>(); // Get the navigation object
  const route = useRoute<ContactListScreenRouteProp>(); 
  const [contacts, setContacts] = useState<any[]>([]); 

  useEffect(() => {
    // Check if the data exists in AsyncStorage
    AsyncStorage.getItem('@contacts').then((jsonValue) => {
      if (jsonValue === null) {
        // Data doesn't exist in AsyncStorage, so load it from contacts.json
        saveDataToStorage(contactData);
      } else {
        // Data exists in AsyncStorage, update the state with it
        const contactsFromStorage = JSON.parse(jsonValue);
        setContacts(contactsFromStorage); // Update the contacts state with the data from AsyncStorage
        const updatedContact = route.params?.updatedContact;
        if (updatedContact) {
          // Find the index of the updated contact in the current state
          const contactIndex = contacts.findIndex((c) => c.id === updatedContact.id);
          if (contactIndex !== -1) {
            // Update the contacts state with the updated contact
            const updatedContacts = [...contacts];
            updatedContacts[contactIndex] = updatedContact;
            setContacts(updatedContacts);
          }
        }
      }
    });
  }, [route.params?.updatedContact]); 

  const saveDataToStorage = async (data: any) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('@contacts', jsonValue);
      const contactsFromStorage = JSON.parse(jsonValue);
      setContacts(contactsFromStorage); // Update the contacts state with the data from AsyncStorage
      // Data saved successfully
    } catch (e) {
      // Error saving data
    }
  };

  // Function to handle contact item click
  const handleContactItemClick = (contactId: string) => {
    // Navigate to ContactInfo screen and pass the contact ID as a parameter
    navigation.navigate('ContactInfo', { contactId });
  };

  return (
    <ScrollView style={styles.container}>
      {contacts.map((contact) => (
        <TouchableOpacity key={contact.id} onPress={() => handleContactItemClick(contact.id)}>
          <ContactItem name={`${contact.firstName} ${contact.lastName}`} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default ContactListScreen;