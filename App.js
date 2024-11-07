import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';

export default function App() {
  const [message, setMessage] = useState("Happy Birthday!");
  const [name, setName] = useState("");
  const [editableMessage, setEditableMessage] = useState(message);
  const [cardImage, setCardImage] = useState(null);

  const handleEditMessage = () => {
    setMessage(editableMessage);
  };

  const handleImageChange = (imageUri) => {
    setCardImage(imageUri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Birthday Card</Text>

      {/* Image with pointerEvents: 'none' to disable interaction */}
      {cardImage && (
        <View style={{ pointerEvents: 'none' }}>...</View>
          <Image source={{ uri: cardImage }} style={styles.cardBackground} />
        </View>
      )}
      <View style={styles.card}>
        <Text style={styles.cardText}>{message}</Text>
        <Text style={styles.cardName}>To: {name || "Your Friend"}</Text>
      </View>

      {/* Input for Name */}
      <TextInput
        style={styles.input}
        placeholder="Enter a name"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      {/* Input for Message Editing */}
      <TextInput
        style={styles.input}
        placeholder="Edit message"
        value={editableMessage}
        onChangeText={(text) => setEditableMessage(text)}
      />

      {/* Button to Update Message */}
      <Button title="Update Message" onPress={handleEditMessage} />

      {/* Option to change background image */}
      <Button title="Change Card Background" onPress={() => handleImageChange('https://example.com/birthday-image.jpg')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f8ff',
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    width: '80%',
    padding: 20,
    backgroundColor: 'rgba(255, 228, 225, 0.8)',  // semi-transparent to allow the background image to show through
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
  cardBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 10,
    opacity: 0.5,  // make the image semi-transparent
  },
  cardText: {
    fontSize: 18,
    color: '#333',
    zIndex: 2,
  },
  cardName: {
    fontSize: 16,
    marginTop: 10,
    color: '#777',
    zIndex: 2,
  },
  input: {
    width: '80%',
    height: 40,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
  },
});
