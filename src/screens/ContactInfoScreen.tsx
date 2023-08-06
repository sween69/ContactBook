import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppStackNavigator';

type ContactInfoScreenRouteProp = RouteProp<RootStackParamList, 'ContactInfo'>;

type Props = {
  route: ContactInfoScreenRouteProp;
};

const ContactInfoScreen: React.FC<Props> = ({ route }) => {
  const { contactId } = route.params;

  return (
    <View style={styles.container}>     

      <View style={styles.profilePicContainer} />

      <View>
        <Text style={styles.sectionText}>Main Information</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput style={styles.input} />
        </View>

        <View style={styles.divider} />

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput style={styles.input} />
        </View>
      </View>

      <View>
        <Text style={styles.sectionText}>Sub Information</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder="Enter email" />
        </View>

        <View style={styles.divider} />

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone</Text>
          <TextInput style={styles.input} placeholder="Enter phone" />
        </View>
      </View>

      <View style={styles.divider} />
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
