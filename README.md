# Bulltrack Speech To Text conversion App
Converts speech to text and gives an output with Company names and keywords related to Stock Trading
## Features
- Recording auto-stops after 3 seconds of silence.
- The companies.csv and keywords.csv contain alternate pronounciations of every word. The first element in every row is the intended word or name, and all words after that are alternate pronounciations.
- The algorithm generates a hashMap containing every alternate pronounciation as a key and its intended pronounciation as its value.
- The algorithm then compares the Speech To Text output with the keys in the hashMap and saves and displays the Value of any detected keyword.
- If the spoken word is either missing or incorrect, the user can choose their intended word from a dropdown list.
- Instead of using the csv files, you could also use a set of constants located in ```/components/constants/keywordsAndCompanies.js```. Additional instructions can be found in ```/components/keywordCompanyFinder/index.js```.

## Running the App

This project runs on the React Native CLI, which can be installed by following the instructions found [here](https://reactnative.dev/docs/environment-setup).
### Step 1:
Install @react-native-voice/voice, @react-native-picker/picker, and react-native-fs using the command
```bash
npm install @react-native-voice/voice @react-native-picker/picker react-native-fs
```
### Step 2:

1. From the root directory, run
```bash
npm start
``` 
2. Keeping the first terminal active, open another terminal and run the command 
```bash
npm run android
``` 

## Generating a Standalone APK (debug APK):
### Step 1:
From the root of the project, run
```bash
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
```
### Step 2:
Change directory to Android:
```bash
cd Android
```
Then, run
```bash
./gradlew assembleDebug
```
The generated APK can be found at ```/android/app/build/outputs/apk/debug/app-debug.apk```

## To Add this Component to an Existing App
- The following line needs to be added to ```/android/app/src/main/AndroidManifest.xml``` to handle Audio Recording permissions for Android.
```
<uses-permission android:name="android.permission.RECORD_AUDIO"/>
``` 

- The CSV files should be stored in the folder 
```/android/app/src/main/assets/```.
- When adding more keywords and companies to companies.csv and keywords.csv, ensure no spaces before or after commas, and at the end of a line. There is an extra line at the end of each CSV file so that the picker displays an empty value.

## Extras
The folder ```/pythonScripts``` contains python scripts to:
1.   ```csvToJson.py``` to turn CSVs into a an array to be used in ```/components/constants/keywordsAndCompanies.js```
2.  ```csvAlphaSort.py``` to alphabetically sort a CSV file by the elements in its first column, for use in the item picker.
