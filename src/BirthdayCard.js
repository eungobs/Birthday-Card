import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';

export default function BirthdayCard() {
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState('Happy Birthday');
  const [bottomText, setBottomText] = useState('Your Text Here');
  const [backgroundColor, setBackgroundColor] = useState('#000');
  const [fontFamily, setFontFamily] = useState('Arial'); // State for font family
  const [savedCard, setSavedCard] = useState(null); // State to hold the saved card

  // Load saved data (photo, title, bottom text) from local storage
  useEffect(() => {
    const loadData = async () => {
      const savedPhoto = await AsyncStorage.getItem('photo');
      const savedTitle = await AsyncStorage.getItem('title');
      const savedBottomText = await AsyncStorage.getItem('bottomText');
      const savedFontFamily = await AsyncStorage.getItem('fontFamily');
      const savedBackgroundColor = await AsyncStorage.getItem('backgroundColor');

      if (savedPhoto) setPhoto(savedPhoto);
      if (savedTitle) setTitle(savedTitle);
      if (savedBottomText) setBottomText(savedBottomText);
      if (savedFontFamily) setFontFamily(savedFontFamily);
      if (savedBackgroundColor) setBackgroundColor(savedBackgroundColor);
    };
    loadData();
  }, []);

  // Save data to local storage and show popup message
  const saveData = async () => {
    try {
      await AsyncStorage.setItem('photo', photo || ''); // Ensure photo is saved as an empty string if null
      await AsyncStorage.setItem('title', title);
      await AsyncStorage.setItem('bottomText', bottomText);
      await AsyncStorage.setItem('fontFamily', fontFamily);
      await AsyncStorage.setItem('backgroundColor', backgroundColor);
      
      Alert.alert('Success', 'Card saved successfully!');
      
      // Update saved card state to show it on the left corner
      setSavedCard({
        photo: photo,
        title: title,
        bottomText: bottomText,
        backgroundColor: backgroundColor,
        fontFamily: fontFamily,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to save data.');
    }
  };

  // Select photo from gallery
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

  // Function to change background color
  const changeBackgroundColor = (color) => {
    setBackgroundColor(color);
  };

  // Function to change font family
  const changeFontFamily = (font) => {
    setFontFamily(font);
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Editable Title */}
      <TextInput
        style={[styles.title, { fontFamily }]}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />

      {/* Photo Frame */}
      <TouchableOpacity style={styles.photoFrame} onPress={selectPhoto}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.photo} />
        ) : (
          <Text style={styles.photoText}>Photo</Text>
        )}
      </TouchableOpacity>

      {/* Editable Bottom Text */}
      <TextInput
        style={[styles.bottomRectangle, { fontFamily }]}
        value={bottomText}
        onChangeText={(text) => setBottomText(text)}
      />

      {/* Color Changing Buttons */}
      <View style={styles.colorButtonsContainer}>
        {[
          '#FF6347', '#7FFF00', '#D2691E', '#00BFFF', '#8A2BE2', '#FF1493',
          '#808080', '#000000',
        ].map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.colorButton, { backgroundColor: color }]}
            onPress={() => changeBackgroundColor(color)}
          />
        ))}
      </View>

      {/* Font Selection Buttons */}
      <View style={styles.fontButtonsContainer}>
        {['Arial', 'Courier', 'Georgia', 'Times New Roman', 'Verdana'].map((font, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.fontButton, { backgroundColor: '#222' }]}
            onPress={() => changeFontFamily(font)}
          >
            <Text style={[styles.fontButtonText, { fontFamily: font }]}>{font}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={saveData}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>

      {/* Small Link Button */}
      <TouchableOpacity style={styles.linkButton} onPress={() => Alert.alert('Link clicked!')}>
        <Text style={styles.linkText}>Click Here</Text>
      </TouchableOpacity>

      {/* Display Saved Card on the left corner */}
      {savedCard && (
        <View style={[styles.savedCard, { backgroundColor: savedCard.backgroundColor }]}>
          <Text style={[styles.savedTitle, { fontFamily: savedCard.fontFamily }]}>
            {savedCard.title}
          </Text>
          {savedCard.photo && (
            <Image source={{ uri: savedCard.photo }} style={styles.savedPhoto} />
          )}
          <Text style={[styles.savedBottomText, { fontFamily: savedCard.fontFamily }]}>
            {savedCard.bottomText}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    color: 'gold',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'gold',
    paddingHorizontal: 10,
  },
  photoFrame: {
    width: 250,
    height: 300,
    borderWidth: 5,
    borderColor: 'gold',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20,
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
    width: '90%',
    height: 50,
    borderWidth: 2,
    borderColor: 'gold',
    color: 'gold',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30,
    paddingHorizontal: 10,
  },
  colorButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  colorButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
  },
  fontButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  fontButton: {
    width: 70,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
  },
  fontButtonText: {
    color: 'white',
    fontSize: 10,
  },
  saveButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FF6347',
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
  linkButton: {
    marginTop: 20,
  },
  linkText: {
    color: '#1E90FF',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  savedCard: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gold',
  },
  savedTitle: {
    fontSize: 20,
    color: 'gold',
    fontWeight: 'bold',
  },
  savedPhoto: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    marginTop: 10,
  },
  savedBottomText: {
    color: 'gold',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});








