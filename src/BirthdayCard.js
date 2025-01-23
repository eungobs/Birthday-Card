import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions,
  Share,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker'; // Use expo-image-picker for iOS
import Icon from 'react-native-vector-icons/MaterialIcons';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

// Helper function to scale sizes based on screen width
const scaleSize = (size) => {
  const scaleFactor = width / 360; // 360 is the base width for mobile design
  return size * Math.min(scaleFactor, 1.5); // Limit scaling for larger screens
};

export default function BirthdayCard() {
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState('Happy Birthday');
  const [bottomText, setBottomText] = useState('Your Text Here');
  const [backgroundColor, setBackgroundColor] = useState('#000');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [savedCards, setSavedCards] = useState([]);
  const [editingCard, setEditingCard] = useState(null);

  // Load saved cards from AsyncStorage on component mount
  useEffect(() => {
    const loadSavedCards = async () => {
      try {
        const savedCardsString = await AsyncStorage.getItem('savedCards');
        if (savedCardsString) {
          setSavedCards(JSON.parse(savedCardsString));
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load saved cards');
      }
    };
    loadSavedCards();
  }, []);

  // Populate form fields when editing a card
  useEffect(() => {
    if (editingCard) {
      setPhoto(editingCard.photo);
      setTitle(editingCard.title);
      setBottomText(editingCard.bottomText);
      setBackgroundColor(editingCard.backgroundColor);
      setFontFamily(editingCard.fontFamily);
    }
  }, [editingCard]);

  // Open image library to select a photo
  const selectPhoto = async () => {
    // Request permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'You need to grant storage permissions to upload images.');
      return;
    }

    // Launch the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Square aspect ratio
      quality: 1,
    });

    console.log('Image Picker Result:', result); // Debugging
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setPhoto(uri);
    }
  };

  // Save or update a card
  const saveData = async () => {
    try {
      const newCard = {
        id: editingCard ? editingCard.id : Date.now().toString(),
        photo,
        title,
        bottomText,
        backgroundColor,
        fontFamily,
      };

      let updatedCards;
      if (editingCard) {
        updatedCards = savedCards.map((card) =>
          card.id === editingCard.id ? newCard : card
        );
      } else {
        updatedCards = [...savedCards, newCard];
      }

      await AsyncStorage.setItem('savedCards', JSON.stringify(updatedCards));
      setSavedCards(updatedCards);
      setEditingCard(null);

      // Reset form fields
      setPhoto(null);
      setTitle('Happy Birthday');
      setBottomText('Your Text Here');
      setBackgroundColor('#000');
      setFontFamily('Arial');

      Alert.alert('Success', 'Card saved successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save card');
    }
  };

  // Edit a saved card
  const handleEditCard = (card) => {
    setEditingCard(card);
  };

  // Delete a saved card
  const handleDeleteCard = async (cardId) => {
    try {
      const updatedCards = savedCards.filter((card) => card.id !== cardId);
      await AsyncStorage.setItem('savedCards', JSON.stringify(updatedCards));
      setSavedCards(updatedCards);
    } catch (error) {
      Alert.alert('Error', 'Failed to delete card');
    }
  };

  // Share a saved card
  const handleShareCard = async (card) => {
    try {
      const message = `${card.title}\n${card.bottomText}`;
      await Share.share({
        message,
        url: card.photo,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share card');
    }
  };

  // Render a saved card
  const SavedCardComponent = ({ card }) => (
    <View style={[styles.savedCard, { backgroundColor: card.backgroundColor }]}>
      <Text style={[styles.savedTitle, { fontFamily: card.fontFamily, fontSize: scaleSize(20) }]}>
        {card.title}
      </Text>
      {card.photo && (
        <Image source={{ uri: card.photo }} style={styles.savedPhoto} />
      )}
      <Text style={[styles.savedBottomText, { fontFamily: card.fontFamily, fontSize: scaleSize(16) }]}>
        {card.bottomText}
      </Text>
      <View style={styles.cardButtons}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEditCard(card)}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteCard(card.id)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.shareButton}
          onPress={() => handleShareCard(card)}
        >
          <Icon name="share" size={scaleSize(20)} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <View style={[styles.container, { backgroundColor }]}>
        <TextInput
          style={[styles.title, { fontFamily, fontSize: scaleSize(28) }]}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter Title"
          placeholderTextColor="rgba(255,215,0,0.5)"
        />

        <TouchableOpacity style={styles.photoFrame} onPress={selectPhoto}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.photo} />
          ) : (
            <Text style={[styles.photoText, { fontSize: scaleSize(18) }]}>Tap to add photo</Text>
          )}
        </TouchableOpacity>

        <TextInput
          style={[styles.bottomRectangle, { fontFamily, fontSize: scaleSize(16) }]}
          value={bottomText}
          onChangeText={setBottomText}
          placeholder="Enter bottom text"
          placeholderTextColor="rgba(255,215,0,0.5)"
        />

        <View style={styles.colorButtonsContainer}>
          {[
            '#FF6347', '#7FFF00', '#D2691E', '#00BFFF', '#8A2BE2',
            '#FF1493', '#808080', '#000000',
          ].map((color, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.colorButton, { backgroundColor: color }]}
              onPress={() => setBackgroundColor(color)}
            />
          ))}
        </View>

        <View style={styles.fontButtonsContainer}>
          {['Arial', 'Courier', 'Georgia', 'Times New Roman', 'Verdana'].map((font, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.fontButton, { backgroundColor: '#222' }]}
              onPress={() => setFontFamily(font)}
            >
              <Text style={[styles.fontButtonText, { fontFamily: font, fontSize: scaleSize(12) }]}>{font}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={saveData}
        >
          <Text style={[styles.saveButtonText, { fontSize: scaleSize(16) }]}>
            {editingCard ? 'Update Card' : 'Save New Card'}
          </Text>
        </TouchableOpacity>

        {editingCard && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setEditingCard(null)}
          >
            <Text style={[styles.cancelButtonText, { fontSize: scaleSize(16) }]}>Cancel Edit</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.savedCardsContainer}>
        <Text style={[styles.savedCardsTitle, { fontSize: scaleSize(24) }]}>Saved Cards</Text>
        <FlatList
          horizontal
          data={savedCards}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SavedCardComponent card={item} />}
          contentContainerStyle={styles.savedCardsList}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    paddingVertical: 20,
    maxWidth: 500,
    alignSelf: 'center',
    width: '100%',
  },
  container: {
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  title: {
    color: 'gold',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'gold',
    paddingHorizontal: 10,
    width: '90%',
  },
  photoFrame: {
    width: '90%',
    aspectRatio: 1,
    borderWidth: 5,
    borderColor: 'gold',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 15,
  },
  photo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  photoText: {
    color: 'gold',
  },
  bottomRectangle: {
    width: '90%',
    height: 50,
    borderWidth: 2,
    borderColor: 'gold',
    color: 'gold',
    textAlign: 'center',
    marginVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  colorButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 15,
    width: '90%',
  },
  colorButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
    borderWidth: 1,
    borderColor: '#fff',
  },
  fontButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 15,
    width: '90%',
  },
  fontButton: {
    width: '45%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
  },
  fontButtonText: {
    color: 'white',
  },
  saveButton: {
    width: '90%',
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
  },
  saveButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cancelButton: {
    width: '90%',
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#666',
    borderRadius: 10,
  },
  cancelButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  savedCardsContainer: {
    padding: 15,
    width: '100%',
  },
  savedCardsTitle: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  savedCardsList: {
    paddingHorizontal: 10,
  },
  savedCard: {
    width: 200,
    marginHorizontal: 10,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gold',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  savedPhoto: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'cover',
    borderRadius: 5,
    marginVertical: 10,
  },
  savedTitle: {
    color: 'gold',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  savedBottomText: {
    color: 'gold',
    textAlign: 'center',
    marginVertical: 10,
  },
  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 6,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  editButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: scaleSize(8), // Smaller text size
  },
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 6,
    borderRadius: 2,
    flex: 1,
    marginLeft: 5,
  },
  deleteButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
   fontSize: scaleSize(7),
  },
  shareButton: {
    backgroundColorS: '#2196F3',
    padding: 6,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
});