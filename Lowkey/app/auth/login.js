import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вход</Text>
      <Text style={styles.subtitle}>Экран входа ещё в разработке.</Text>
      <Link href="/auth/register" style={styles.link}>
        Создать аккаунт
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cfcbcb',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: { fontSize: 24, fontWeight: '800', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#444', marginBottom: 16 },
  link: { fontSize: 18, fontWeight: '700', color: '#1E88E5' },
});
