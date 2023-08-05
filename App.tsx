import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';

import ContactList from './src/screens/ContactListScreen';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ContactList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
