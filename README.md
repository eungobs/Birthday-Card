# Birthday Card Creator

## Overview

The **Birthday Card Creator** is a fun and easy-to-use mobile and web application that lets you design personalized birthday cards. You can add custom text, upload photos, and choose from a beautiful golden-themed design. The app is perfect for creating unique birthday greetings that you can share with friends and family!

## Key Features

1. **Editable Text**: 
   - **Title**: You can easily change the title text at the top of the card (like changing “Happy Birthday” to something special).
   - **Bottom Text**: The text at the bottom of the card can also be customized.
   - The app automatically saves your changes, so you don't need to worry about losing them during your session.

2. **Photo Upload**: 
   - Users can upload a photo from their device's gallery and place it within a decorative frame on the card. This personal touch makes the card even more special!

3. **Custom Design**: 
   - The app boasts a sleek golden theme, giving your card an elegant look. There’s also a stylish logo designed by Elizabeth Eunice Ndzukule.

4. **Persistent Storage**: 
   - Any changes you make (like the photo, title, and bottom text) will be saved using a feature called AsyncStorage. This means your customizations will be retained even if you leave the app.

5. **Multi-Platform Support**: 
   - The app works on web browsers as well as on Android and iOS devices. You can create cards right in a browser or use your phone by scanning a QR code.

## How to Use the App

### Editing Text
- **Edit Title**: Tap on the title at the top of your card (which says “Happy Birthday”). You can type in your preferred text, and the app will save and show your update immediately.
  
- **Edit Bottom Text**: Tap on the bottom text area (where it says “Your Text Here”). Enter your custom message, and watch it save and update instantly!

### Adding a Photo
- To add a photo, tap on the decorative photo frame in the center of the card. You’ll be able to select an image from your device’s gallery. Once you choose a photo, it will appear nicely within the frame.

## Running the App

If you want to use the app on the web or on your mobile device, follow these simple steps:

### For Web:
- To run the app in a web browser, type this command:
 
  npm run web

### For Mobile:
1. To start the project, type:
 
   npm start

2. Open the Expo Developer Tools that will appear in your browser.
3. Use the Expo Go app on your iOS or Android device to scan the QR code displayed in your browser. This will allow you to use the app on your mobile device.

## Installation and Setup

To get everything set up on your computer, follow these steps:

1. **Clone the Repository**: Download the app's source code from GitHub. Open your terminal and type:

   git clone https://github.com/eungobs/Birthday-Card.git
   cd Birthday-Card
  

2. **Install Dependencies**: Make sure you have the blank Expo template installed. If you haven’t done it yet, type:

   npx create-expo-app card --template blank


3. **Install Required Dependencies**: Next, install these essential tools:
   - For AsyncStorage (to save data locally):
  
     npx expo install @react-native-async-storage/async-storage
  
   - For the Image Picker (to choose photos):
   
     npx expo install react-native-image-picker
   

4. **Start the Project**:
   - For the web, type:
   
     npm run web
    
   - For mobile devices, start the project by typing:
    
     npm start
   
   - Then scan the QR code to access it on your phone.

## Troubleshooting

If you run into any issues, here are some tips:
- **Image Picker Not Working**: Make sure you have installed the react-native-image-picker correctly. You can check this by running:

  npx expo install react-native-image-picker

  Also, ensure that you have granted any necessary permissions for access to your gallery.

- **Persistent Storage Issues**: Confirm that AsyncStorage was installed correctly:

  npx expo install @react-native-async-storage/async-storage


- **Expo Go Issues**: Make sure that both your phone and your computer are connected to the same Wi-Fi network to scan the QR code.

## Author 

This app was designed and developed by **Elizabeth Eunice Ndzukule**. For any questions or contributions, feel free to visit the project’s GitHub repository where you can find additional information and resources: [Birthday Card GitHub Repository](https://github.com/eungobs/Birthday-Card.git).

