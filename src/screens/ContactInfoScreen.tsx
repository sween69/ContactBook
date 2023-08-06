import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackNavigationProp, RootStackParamList } from '../navigation/AppStackNavigator';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { Contact } from '../models/Contact'

type ContactInfoScreenRouteProp = RouteProp<RootStackParamList, 'ContactInfo'>;

type Props = {
  route: ContactInfoScreenRouteProp;
};

const ContactInfoScreen: React.FC<Props> = ({ route }) => {
  const { contactId } = route.params;
  const [contactData, setContactData] = useState<any | null>(null);
  const [editedContact, setEditedContact] = useState<any | null>(null);
  const navigation = useNavigation<RootStackNavigationProp>();


  useEffect(() => {
    // Fetch the contact data from AsyncStorage based on contactId
    AsyncStorage.getItem('@contacts').then((jsonValue) => {
      if (jsonValue) {
        const contacts = JSON.parse(jsonValue);
        const contact = contacts.find((c: any) => c.id === contactId);
        setContactData(contact);
        setEditedContact(contact);
      }
    });
  }, [contactId]);

  const handleInputChange = (key: keyof Contact, value: string) => {
    setEditedContact((prev: Contact | null) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      // Get the current contacts from AsyncStorage
      const jsonValue = await AsyncStorage.getItem('@contacts');
      if (jsonValue) {
        const contacts = JSON.parse(jsonValue);
        // Find the index of the edited contact
        const contactIndex = contacts.findIndex((c: any) => c.id === contactId);
        if (contactIndex !== -1) {
          // Update the contact with the edited data
          contacts[contactIndex] = editedContact;
          // Save the updated contacts back to AsyncStorage
          await AsyncStorage.setItem('@contacts', JSON.stringify(contacts));
          // Update the contactData state to reflect the changes
          setContactData(editedContact);
          // Pass the updated contact data back to ContactListScreen
          navigation.navigate('ContactList', { updatedContact: editedContact });

          Alert.alert('Success', 'Contact information updated successfully!');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save changes. Please try again.');
    }
  };

  // Render loading or display contact information if available
  if (!contactData || !editedContact) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Render the contact information */}
      <View style={styles.profilePicContainer} />
      <View>
        <Text style={styles.sectionText}>Main Information</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={editedContact.firstName}
            onChangeText={(value) => handleInputChange('firstName', value)}
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={editedContact.lastName}
            onChangeText={(value) => handleInputChange('lastName', value)}
          />
        </View>
      </View>
      <View>
        <Text style={styles.sectionText}>Sub Information</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={editedContact.email}
            onChangeText={(value) => handleInputChange('email', value)}
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={editedContact.phone}
            onChangeText={(value) => handleInputChange('phone', value)}
          />
        </View>
      </View>
      <View style={styles.divider} />
      {/* Save button */}
      <TouchableOpacity onPress={handleSaveChanges}>
        <Text>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profilePicContainer: {
    width: 150,
    height: 150,
    aspectRatio: 1,
    borderRadius: 75,
    backgroundColor: '#FF8C00',
    alignSelf: 'center',
    marginVertical: 32,
  },
  sectionText: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontWeight: 'bold',
    fontSize: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  label: {
    flex: 1,
    paddingHorizontal: 16,
  },
  input: {
    flex: 4,
    height: 40,
    paddingHorizontal: 8,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 4,
  },
  divider: {
    height: 1,
    backgroundColor: 'lightgray',
    marginLeft: 16,
  },
});

export default ContactInfoScreen;
