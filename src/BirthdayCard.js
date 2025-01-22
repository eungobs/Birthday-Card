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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';

export default function BirthdayCard() {
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState('Happy Birthday');
  const [bottomText, setBottomText] = useState('Your Text Here');
  const [backgroundColor, setBackgroundColor] = useState('#000');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [savedCards, setSavedCards] = useState([]);
  const [editingCard, setEditingCard] = useState(null);

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

  useEffect(() => {
    if (editingCard) {
      setPhoto(editingCard.photo);
      setTitle(editingCard.title);
      setBottomText(editingCard.bottomText);
      setBackgroundColor(editingCard.backgroundColor);
      setFontFamily(editingCard.fontFamily);
    }
  }, [editingCard]);

  const selectPhoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage);
        return;
      }
      const uri = response.assets[0]?.uri;
      setPhoto(uri);
    });
  };

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
        updatedCards = savedCards.map(card => 
          card.id === editingCard.id ? newCard : card
        );
      } else {
        updatedCards = [...savedCards, newCard];
      }

      await AsyncStorage.setItem('savedCards', JSON.stringify(updatedCards));
      setSavedCards(updatedCards);
      setEditingCard(null);
      
      // Reset form
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

  const handleEditCard = (card) => {
    setEditingCard(card);
  };

  const handleDeleteCard = async (cardId) => {
    try {
      const updatedCards = savedCards.filter(card => card.id !== cardId);
      await AsyncStorage.setItem('savedCards', JSON.stringify(updatedCards));
      setSavedCards(updatedCards);
    } catch (error) {
      Alert.alert('Error', 'Failed to delete card');
    }
  };

  const SavedCardComponent = ({ card }) => (
    <View style={[styles.savedCard, { backgroundColor: card.backgroundColor }]}>
      <Text style={[styles.savedTitle, { fontFamily: card.fontFamily }]}>
        {card.title}
      </Text>
      {card.photo && (
        <Image source={{ uri: card.photo }} style={styles.savedPhoto} />
      )}
      <Text style={[styles.savedBottomText, { fontFamily: card.fontFamily }]}>
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
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={[styles.container, { backgroundColor }]}>
        <TextInput
          style={[styles.title, { fontFamily }]}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter Title"
          placeholderTextColor="rgba(255,215,0,0.5)"
        />

        <TouchableOpacity style={styles.photoFrame} onPress={selectPhoto}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.photo} />
          ) : (
            <Text style={styles.photoText}>Tap to add photo</Text>
          )}
        </TouchableOpacity>

        <TextInput
          style={[styles.bottomRectangle, { fontFamily }]}
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
              <Text style={[styles.fontButtonText, { fontFamily: font }]}>{font}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={saveData}
        >
          <Text style={styles.saveButtonText}>
            {editingCard ? 'Update Card' : 'Save New Card'}
          </Text>
        </TouchableOpacity>

        {editingCard && (
          <TouchableOpacity 
            style={styles.cancelButton} 
            onPress={() => setEditingCard(null)}
          >
            <Text style={styles.cancelButtonText}>Cancel Edit</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.savedCardsContainer}>
        <Text style={styles.savedCardsTitle}>Saved Cards</Text>
        {savedCards.map((card) => (
          <SavedCardComponent key={card.id} card={card} />
        ))}
      </View>
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');
const cardWidth = width * 0.9;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: 'gold',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'gold',
    paddingHorizontal: 10,
    width: '100%',
  },
  photoFrame: {
    width: cardWidth,
    height: cardWidth * 1.2,
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
    fontSize: 18,
  },
  bottomRectangle: {
    width: cardWidth,
    height: 50,
    borderWidth: 2,
    borderColor: 'gold',
    color: 'gold',
    fontSize: 16,
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
    width: cardWidth,
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
    width: cardWidth,
  },
  fontButton: {
    width: cardWidth / 2.5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
  },
  fontButtonText: {
    color: 'white',
    fontSize: 12,
  },
  saveButton: {
    width: cardWidth,
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cancelButton: {
    width: cardWidth,
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#666',
    borderRadius: 10,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  savedCardsContainer: {
    padding: 15,
  },
  savedCardsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  savedCard: {
    width: cardWidth,
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gold',
    alignSelf: 'center',
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
    height: cardWidth * 0.8,
    resizeMode: 'cover',
    borderRadius: 5,
    marginVertical: 10,
  },
  savedTitle: {
    fontSize: 20,
    color: 'gold',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  savedBottomText: {
    color: 'gold',
    fontSize: 16,
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
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  editButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  deleteButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});








