import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import ImagePickerComponent from '../components/ImagePickerComponent';
import TextEditor from '../components/TextEditor';

export default function CardEditorScreen({ navigation }) {
  const [cardText, setCardText] = useState('');

  return (
    <View style={styles.container}>
      <TextEditor cardText={cardText} setCardText={setCardText} />
      <ImagePickerComponent />
      <Button title="Preview Card" onPress={() => navigation.navigate('Preview')} />
    </View>
  );
}
// styles //
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'space-between' },
});
