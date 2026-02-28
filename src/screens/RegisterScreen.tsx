import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { COLORS } from '../theme';

export default function RegisterScreen({ navigation }: any) {
  // ATENÇÃO: Confirme se a sua função de cadastro no AuthContext se chama "register" ou "signUp"
  const { register } = useAuth(); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !name) {
      alert("Preencha todos os campos.");
      return;
    }
    setIsLoading(true);
    try {
    await register(email, password);
    } catch (error) {
      alert("Erro ao criar conta. Tente novamente.");
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.topHalf}>
        <Text style={styles.brandName}>Abra sua conta</Text>
        <Text style={styles.subtitle}>É rápido, fácil e seguro.</Text>
      </View>

      <View style={styles.bottomHalf}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Como quer ser chamado?"
            placeholderTextColor={COLORS.textSecondary}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Seu melhor e-mail"
            placeholderTextColor={COLORS.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Crie uma senha forte"
            placeholderTextColor={COLORS.textSecondary}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Pressable style={styles.primaryButton} onPress={handleRegister} disabled={isLoading}>
            {isLoading ? <ActivityIndicator color={COLORS.primary} /> : <Text style={styles.primaryButtonText}>Criar Conta</Text>}
          </Pressable>

          <Pressable style={styles.secondaryButton} onPress={() => navigation.goBack()}>
            <Text style={styles.secondaryButtonText}>Já tem conta? Fazer Login</Text>
          </Pressable>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

// Os estilos são idênticos aos da tela de Login para manter o padrão!
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary },
  topHalf: { flex: 0.3, justifyContent: 'center', paddingHorizontal: 30 },
  brandName: { fontSize: 32, fontWeight: 'bold', color: COLORS.white },
  subtitle: { fontSize: 16, color: COLORS.accent, marginTop: 5 },
  bottomHalf: { flex: 0.7, backgroundColor: COLORS.background || '#F5F6F8', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingHorizontal: 20, paddingTop: 30 },
  label: { fontSize: 14, fontWeight: '600', color: COLORS.textSecondary, marginBottom: 8 },
  input: { backgroundColor: COLORS.white, paddingHorizontal: 16, paddingVertical: 15, borderRadius: 12, fontSize: 16, color: COLORS.textPrimary, marginBottom: 20, borderWidth: 1, borderColor: '#E0E0E0' },
  primaryButton: { backgroundColor: COLORS.accent, paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  primaryButtonText: { color: COLORS.primary, fontSize: 16, fontWeight: 'bold', textTransform: 'uppercase' },
  secondaryButton: { marginTop: 20, alignItems: 'center', padding: 10, marginBottom: 40 },
  secondaryButtonText: { color: COLORS.primary, fontSize: 14, fontWeight: 'bold' },
});