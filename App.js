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

  // Load saved data (photo, title, bottom text) from local storage
  useEffect(() => {
    const loadData = async () => {
      const savedPhoto = await AsyncStorage.getItem('photo');
      const savedTitle = await AsyncStorage.getItem('title');
      const savedBottomText = await AsyncStorage.getItem('bottomText');
      const savedFontFamily = await AsyncStorage.getItem('fontFamily');

      if (savedPhoto) setPhoto(savedPhoto);
      if (savedTitle) setTitle(savedTitle);
      if (savedBottomText) setBottomText(savedBottomText);
      if (savedFontFamily) setFontFamily(savedFontFamily);
    };
    loadData();
  }, []);

  // Save data to local storage
  const saveData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
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
      saveData('photo', uri);
    });
  };

  // Function to change background color
  const changeBackgroundColor = (color) => {
    setBackgroundColor(color);
  };

  // Function to change font family
  const changeFontFamily = (font) => {
    setFontFamily(font);
    saveData('fontFamily', font);
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Editable Title */}
      <TextInput
        style={[styles.title, { fontFamily }]}
        value={title}
        onChangeText={(text) => {
          setTitle(text);
          saveData('title', text);
        }}
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
        onChangeText={(text) => {
          setBottomText(text);
          saveData('bottomText', text);
        }}
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
});
