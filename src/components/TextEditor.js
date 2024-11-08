import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function TextEditor({ cardText, setCardText }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your message..."
        value={cardText}
        onChangeText={setCardText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 18,
    borderRadius: 5,
  },
});
