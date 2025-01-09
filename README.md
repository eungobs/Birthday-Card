Birthday Card Creator
This React Native project enables users to design personalized birthday cards with custom text, photo uploads, and a golden-themed design. The application is available for web and mobile platforms and provides persistent storage for user inputs.

Features
Editable Text
Title: Editable text at the top of the card.
Bottom Text: Editable text at the bottom of the card.
Text changes are saved locally for session persistence.
Photo Upload
Users can upload and display a photo from their gallery within a decorative frame.
Custom Design
A sleek golden theme with an elegant logo (by.ee ndzukule) in a circular frame.
Persistent Storage
Card customizations (photo, title, bottom text) are saved using AsyncStorage to ensure changes are retained.
Multi-Platform Support
Compatible with web, Android, and iOS platforms.
The app can be run in a browser or scanned for use on mobile devices via the Expo app.
How to Use
Editing Text
Edit Title:
Tap on the title (Happy Birthday) at the top of the card.
Type your desired text. The app automatically saves and displays the update.
Edit Bottom Text:
Tap on the bottom text (Your Text Here) at the bottom of the card.
Type your desired text. The app saves and displays the update instantly.
Adding a Photo
Tap on the photo frame in the middle of the card.
Select an image from your device gallery.
The selected image will appear in the frame.
Running the App
Run on the web:
arduino
Copy code
npm run web
Alternatively, start the project:

npm start
Open the Expo Developer Tools in your browser and scan the QR code using the Expo Go app for Android/iOS devices.
Installation and Setup
Clone the Repository
To get the project, clone it from GitHub:


git clone https://github.com/eungobs/Birthday-Card.git
cd Birthday-Card
Install Dependencies
Install the blank Expo template:

npx create-expo-app card --template blank
Install required dependencies:
AsyncStorage:

npx expo install @react-native-async-storage/async-storage
Image Picker:
arduino

npx expo install react-native-image-picker
Start the Project
For the web:
arduino

npm run web
For mobile devices:
Start the project:
sql

npm start
Scan the QR code displayed in the Expo Developer Tools using the Expo Go app.
Dependencies
The project is built with the following key libraries:

React Native: Core framework for building the app.
Expo: Tools and APIs for running the app.
@react-native-async-storage/async-storage: Manages local data storage for user inputs.
react-native-image-picker: Facilitates photo selection from the user's gallery.
Troubleshooting
Image Picker Not Working:

Ensure react-native-image-picker is installed:


npx expo install react-native-image-picker
Grant necessary permissions for gallery access.
Persistent Storage Issues:

Verify that @react-native-async-storage/async-storage is correctly installed:

npx expo install @react-native-async-storage/async-storage
Expo Go Issues:

Ensure both your phone and computer are on the same Wi-Fi network to scan the QR code.
Author
Designed and implemented by Elizabeth Eunice Ndzukule.
For any questions or contributions, please visit the GitHub repository:

Birthday Card GitHub Repository

Birthday Card GitHub Repository

