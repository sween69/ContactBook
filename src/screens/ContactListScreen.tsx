import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; 
import { RootStackNavigationProp } from '../navigation/AppStackNavigator';
import ContactItem from '../components/ContactItem';
import contactData from '../data/contacts.json';

const ContactListScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>(); // Get the navigation object


  useEffect(() => {
    // Check if the data exists in AsyncStorage
    AsyncStorage.getItem('@contacts').then((jsonValue) => {
      if (jsonValue === null) {
        // Data doesn't exist in AsyncStorage, so load it from contacts.json
        saveDataToStorage(contactData);
      }
    });
  }, []);

  const saveDataToStorage = async (data: any) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('@contacts', jsonValue);
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
      {contactData.map((contact) => (
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
