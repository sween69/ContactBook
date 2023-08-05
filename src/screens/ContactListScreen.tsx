import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ContactItem from '../components/ContactItem';

const ContactList: React.FC = () => {
  const contacts = [
    { id: 1, name: 'Phoebe Monroe' },
    { id: 2, name: 'Lidia Wilkins' },
  ];

  return (
    <View style={styles.container}>
      {contacts.map((contact) => (
        <ContactItem key={contact.id} name={contact.name} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default ContactList;
