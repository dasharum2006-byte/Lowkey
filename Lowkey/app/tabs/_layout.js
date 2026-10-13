import { Tabs } from 'expo-router';
//импорт иконок
import {Ionicons} from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ 
      headerShown: false, // Отключаем  верхний дефолтный заголовок
      tabBarActiveTintColor: '#007AFF', // Красивый активный синий цвет для выбранной вкладки
      tabBarInactiveTintColor: '#8E8E93', // Серый цвет для неактивных вкладок
      tabBarStyle: { 
        backgroundColor: '#FFFFFF', // Наша светлая тема для панели
        borderTopWidth: 1,
        borderTopColor: '#E5E5EA', // Тонкая аккуратная линия над кнопочками 
          }
        }}>
      <Tabs.Screen name="contacts" options={{ title: 'Контакты',
        tabBarIcon: ({ focused, color }) => (
        <Ionicons name={focused ? "people" : "people-outline"} size={24} color={color} />
      )
      }} />
      <Tabs.Screen name="calls" options={{ title: 'Звонки',
        tabBarIcon: ({ focused, color }) => (
        <Ionicons name={focused ? "call" : "call-outline"} size={24} color={color} />
      )
       }} />
      <Tabs.Screen name="index" options={{ title: 'Чаты',
        tabBarIcon: ({ focused, color }) => (
        <Ionicons name={focused ? "chatbubbles" : "chatbubbles-outline"} size={24} color={color} />
      )
       }} />
      <Tabs.Screen name="settings" options={{ title: 'Настройки',
        tabBarIcon: ({ focused, color }) => (
        <Ionicons name={focused ? "settings" : "settings-outline"} size={24} color={color} />
      )
       }} />
    </Tabs>
  );
}
