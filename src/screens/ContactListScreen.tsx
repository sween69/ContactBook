import React, { useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ContactItem from '../components/ContactItem';
import contactData from '../data/contacts.json';

const ContactList: React.FC = () => {

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

  return (
    <ScrollView style={styles.container}>
      {contactData.map((contact) => (
        <ContactItem
          key={contact.id}
          name={`${contact.firstName} ${contact.lastName}`} />
      ))}
    </ScrollView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default ContactList;
