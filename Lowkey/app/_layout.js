import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Первая группа экранов — авторизация */}
      <Stack.Screen name="auth/register" />
      {/* Вторая группа — вкладки чата после логина */}
      <Stack.Screen name="tabs" />
    </Stack>
  );
}
