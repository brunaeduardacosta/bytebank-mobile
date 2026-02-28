import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';
import { COLORS } from '../theme';

export default function WelcomeScreen({ navigation }: any) {
  
  useEffect(() => {
    // O temporizador mágico de 2.5 segundos
    const timer = setTimeout(() => {
      // Usamos o 'replace' em vez de 'navigate' para que o usuário não 
      // consiga voltar para essa tela de boas-vindas sem querer.
    navigation.navigate('Home');  
  }, 2500);

    // Limpeza de segurança
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      <View style={styles.logoCircle}>
        <Text style={styles.logoText}>B</Text>
      </View>
      
      <Text style={styles.welcomeText}>Bem-vindo de volta,</Text>
      <Text style={styles.nameText}>Arthur!</Text>
      
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={COLORS.accent} />
        <Text style={styles.loadingText}>Preparando seu ambiente seguro...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  welcomeText: {
    fontSize: 18,
    color: COLORS.textSecondary,
    marginBottom: 5,
  },
  nameText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 50,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  loadingText: {
    color: COLORS.accent,
    marginLeft: 10,
    fontSize: 14,
  }
});