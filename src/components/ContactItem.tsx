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
    borderBottomColor: 'darkgray',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  profilePicContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
