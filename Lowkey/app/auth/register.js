import React from 'react';
import { useState } from 'react';
//кнопка войти
import { useRouter } from 'expo-router';

import {View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
//Alert - чтобы выводить ошибки на экран, ToachableOpacity - красивая кнопка
import { auth } from '../../config/firebase';
// import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
//doc - знать куда класть данные 
//setDoc - чтобы их туда писать
import {doc, setDoc} from 'firebase/firestore';
import { database } from '../../config/firebase';

export default function RegisterScreen() {

//для перехода между экранами
const router = useRouter();
//переключения 
// true — режим логина, false — режим регистрации
const [isLogin, setIsLogin] = useState(true); 

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [username, setUsername] = useState('');

//так как мы работает с сервером firebase функция должна быть асинхронной
const  handleAuth = async() =>  {
//сюда логику - типо при нажатии на кнопку данные улетали в облако FirebaseLowkey  и в приложухе создавался новый пользователь
    //проверяем поля в зависимости от режима
    if (isLogin) {
        if (!email || !password) {
            Alert.alert('Ошибка','Заполните email и пароль');
            return;
        }
    } else {
        //1. проверить что пользователь заполнил все поля
        if (!email || !password || !username) {
            Alert.alert('Ошибка','Заполни все поля');
            return;
        }
    }
    //2. вызвать функцию firebase для регистрации по почте и паролю если все поля заполнены
     //запускаем попытку регистрации
     try {
        if (isLogin) {
            //если мы в режиме логина - входим
            await signInWithEmailAndPassword(auth, email, password);
            Alert.alert('Успех','Успешно вошли в аккаунт');
            //переход на главную страницу 
            router.replace('/tabs');
        } else {
            //если в режиме регистрации - создаем аккаунт
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            //создаем переменную которая будет указывать нам путь
            const userDocRef =  doc(database, 'users', user.uid);
            // создай в базе данных строчку под именем uid и положи туда уникальный ID, который нам выдал сервер.
            await setDoc (userDocRef, {uid:user.uid,username:username,email : email, createdAt: new Date()});
            Alert.alert('Успех', 'Аккаунт создан');
            //перекидываем пользователя после регистрации
            router.replace('/tabs');
            }
        } catch (error) {
        //3. обработать ошибки если пароль короткий
            Alert.alert('Ошибка',error.message);
        }
    };
     

    
    
    return (
        //интерфейс
        //корневой контейнер
        <View style={styles.container}>

            <TouchableOpacity style={styles.loginHeaderButton} onPress={() => router.push('/auth/login')}>
                <Text style={styles.loginHeaderButtonText}>Текст</Text>
            </TouchableOpacity>

            <View style={styles.smallcontainer}>
                {/* Меняем заголовок на лету */}
            <Text style={styles.title}>{isLogin ? 'Вход в Lowkey' : 'Регистрация'}</Text>

            {/* Инпут никнейма показываем только если мы не в режиме логина */}
            {!isLogin && (
                <TextInput placeholder="Придумай никнейм" value= {username} onChangeText={setUsername} style={styles.input}/>
            )}  
                {/* //чтобы текст из инпута попадал в память надо каждому интпуту добавить свойства */}
                <TextInput placeholder="Введи email" value= {email} onChangeText={setEmail} 
                style={styles.input} autoCapitalize='none'/> 
                {/* autoCapitalize -  чтобы буква не становилась большой */}
                {/* //для пароля инпута другое свойство чтобы за тремя точками скрывалось */}
                <TextInput placeholder="Введите пароль" value= {password} onChangeText={setPassword} 
                    secureTextEntry={true}  //спятали пароль за тремя точками
                    style={styles.input}
                />
                <TouchableOpacity style={styles.button} onPress={handleAuth}>
                    <Text style={styles.buttonText}>{isLogin ? 'Войти' : 'Создать'}</Text>
                </TouchableOpacity>
                {/* кнопка в низу меняет логин на противоположный */}
                <TouchableOpacity onPress={() => setIsLogin(!isLogin)} style={{ marginTop: 15 }}>
                <Text style={{ color: '#007AFF', fontSize: 14, fontWeight: '600' }}>
                    {isLogin ? 'Еще нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'}
                </Text>
            </TouchableOpacity>
            </View>
        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    smallcontainer: {
        width: '70%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // height: 300,
        backgroundColor: '#1c1c1eee',
        borderRadius: 24,
        padding: 24,
        // тень для карточки
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 10 },
        // shadowOpacity: 0.15,
        // shadowRadius: 12,
        // elevation: 8, // Тень для Android
    },
    loginHeaderButton: {
        position: 'absolute',
        top: 60, // Отступ сверху от шторки телефона
        right: 25, // Отступ справа
        padding: 10,
    },
    loginHeaderButtonText: {
        color: '#007AFF', // Фирменный синий цвет ссылки
        fontSize: 16,
        fontWeight: '600',
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 20,
        color: '#FFFFFF',
    },
    input: {
        backgroundColor: '#6666669f',
        width: '100%',
        height: 50,
        borderRadius: 14,
        marginVertical: 6,
        paddingHorizontal: 16,
        color: '#FFFFFF',
        fontSize: 16,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFFFFF',
        marginTop: 15,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1C1C1E'
    }
});
