import { Redirect } from 'expo-router';

// Стартовый маршрут: пока пользователь не залогинен — отправляем на регистрацию
export default function Index() {
  return <Redirect href="/auth/register" />;
}
