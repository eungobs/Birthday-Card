import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PreviewScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.previewText}>This is your card preview!</Text>
      {/* Display formatted text and chosen image here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  previewText: { fontSize: 24, fontWeight: 'bold' },
});
