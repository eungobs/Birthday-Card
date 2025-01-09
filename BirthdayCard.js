import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert, Share, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import * as Sharing from 'expo-sharing';

export default function BirthdayCard() {
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState('Happy Birthday');
  const [bottomText, setBottomText] = useState('Your Text Here');
  const [backgroundColor, setBackgroundColor] = useState('#000');
  const [fontFamily, setFontFamily] = useState('Arial');

  // Load data when component mounts
  useEffect(() => {
    try {
      const savedData = window.localStorage.getItem('birthdayCardData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setPhoto(parsedData.photo);
        setTitle(parsedData.title || 'Happy Birthday');
        setBottomText(parsedData.bottomText || 'Your Text Here');
        setBackgroundColor(parsedData.backgroundColor || '#000');
        setFontFamily(parsedData.fontFamily || 'Arial');
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }, []);

  // Save data whenever any state changes
  useEffect(() => {
    try {
      const dataToSave = {
        photo,
        title,
        bottomText,
        backgroundColor,
        fontFamily
      };
      window.localStorage.setItem('birthdayCardData', JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }, [photo, title, bottomText, backgroundColor, fontFamily]);

  const selectPhoto = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    };

    try {
      const response = await launchImageLibrary(options);
      
      if (response.didCancel) return;

      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage);
        return;
      }

      if (response.assets && response.assets[0]) {
        const selectedImage = response.assets[0];
        setPhoto({
          uri: selectedImage.uri,
          base64: selectedImage.base64
        });
      }
    } catch (error) {
      console.error('Photo selection error:', error);
      Alert.alert('Error', 'Failed to select photo');
    }
  };

  const shareToWhatsApp = async () => {
    try {
      const message = `${title}\n${bottomText}`;
      
      if (Platform.OS === 'web') {
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
      } else {
        const shareOptions = {
          message: message,
          social: Share.Social.WHATSAPP
        };
        
        const result = await Share.shareSingle(shareOptions);
        
        if (result.action === Share.sharedAction) {
          Alert.alert('Success', 'Shared successfully');
        }
      }
    } catch (error) {
      console.error('Share error:', error);
      Alert.alert('Error', 'Make sure WhatsApp is installed');
    }
  };

  const renderImage = () => {
    if (!photo) {
      return <Text style={styles.photoText}>Tap to add photo</Text>;
    }
    return <Image source={{ uri: photo.uri }} style={styles.photo} />;
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <TextInput
        style={[styles.title, { fontFamily }]}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
        placeholderTextColor="rgba(255, 215, 0, 0.5)"
      />
      <TouchableOpacity style={styles.photoFrame} onPress={selectPhoto}>
        {renderImage()}
      </TouchableOpacity>
      <TextInput
        style={[styles.bottomRectangle, { fontFamily }]}
        value={bottomText}
        onChangeText={setBottomText}
        placeholder="Enter message"
        placeholderTextColor="rgba(255, 215, 0, 0.5)"
      />
      <TouchableOpacity 
        style={styles.shareButton} 
        onPress={shareToWhatsApp}
      >
        <Text style={styles.shareButtonText}>Share on WhatsApp</Text>
      </TouchableOpacity>
      <View style={styles.colorButtonsContainer}>
        {[
          '#FF6347', '#7FFF00', '#D2691E', '#00BFFF', '#8A2BE2', '#FF1493',
          '#808080', '#000000',
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
    minHeight: '100vh',
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
    width: '90%',
    maxWidth: 400,
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
    cursor: 'pointer',
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
    maxWidth: 400,
    height: 50,
    borderWidth: 2,
    borderColor: 'gold',
    color: 'gold',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  shareButton: {
    backgroundColor: '#25D366', // WhatsApp green
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    width: '90%',
    maxWidth: 400,
  },
  shareButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  colorButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 30,
    width: '90%',
    maxWidth: 400,
  },
  colorButton: {
    width: 35,
    height: 35,
    borderRadius: 18,
    margin: 5,
    borderWidth: 2,
    borderColor: '#fff',
    cursor: 'pointer',
  },
  fontButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
    width: '90%',
    maxWidth: 400,
  },
  fontButton: {
    width: 80,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 8,
    backgroundColor: '#222',
    borderWidth: 1,
    borderColor: 'gold',
    cursor: 'pointer',
  },
  fontButtonText: {
    color: 'gold',
    fontSize: 12,
  },
});