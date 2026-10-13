// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//авторизация и бд
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
//добавляем штуку которая запоминает пользователя
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//ключи
const firebaseConfig = {
  apiKey: "AIzaSyDbo6Wtxre5iP4xqfjHZxqtgu0b9wgSS_Q",
  authDomain: "lowkey-9b6c2.firebaseapp.com",
  projectId: "lowkey-9b6c2",
  storageBucket: "lowkey-9b6c2.firebasestorage.app",
  messagingSenderId: "876228065029",
  appId: "1:876228065029:web:df1b7acbeb1053326a696c",
  measurementId: "G-M7ZSDZ09TY"
};

// Initialize Firebase - вызываем функции
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
//инициализируем авторизацию с памятью телефна
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const database = getFirestore(app);

//экраны регистрации и логина могли брать настройки из этого файла.
export {auth, database};
