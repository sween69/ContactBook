import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ContactItem: React.FC<{ name: string }> = ({ name }) => {
  return (
    <View style={styles.container}>
      <View style={styles.profilePicContainer} />
      <View style={styles.contentContainer}>
        <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
          {name}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  profilePicContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FF8C00', 
    marginRight: 16,
  },
  contentContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ContactItem;
