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

  // Load saved data (photo, title, bottom text) from local storage
  useEffect(() => {
    const loadData = async () => {
      const savedPhoto = await AsyncStorage.getItem('photo');
      const savedTitle = await AsyncStorage.getItem('title');
      const savedBottomText = await AsyncStorage.getItem('bottomText');

      if (savedPhoto) setPhoto(savedPhoto);
      if (savedTitle) setTitle(savedTitle);
      if (savedBottomText) setBottomText(savedBottomText);
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

  return (
    <View style={styles.container}>
      {/* Editable Title */}
      <TextInput
        style={styles.title}
        value={title}
        onChangeText={(text) => {
          setTitle(text);
          saveData('title', text);
        }}
      />
      
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>by.ee ndzukule</Text>
      </View>

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
        style={styles.bottomRectangle}
        value={bottomText}
        onChangeText={(text) => {
          setBottomText(text);
          saveData('bottomText', text);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    padding: 20,
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
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'gold',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  logoText: {
    color: 'gold',
    fontSize: 8,
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
});
 