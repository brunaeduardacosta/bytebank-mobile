import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../context/AuthContext';
import { COLORS } from '../theme';

import DashboardScreen from '../screens/DashboardScreen';
import TransactionFormScreen from '../screens/TransactionFormScreen'; 
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// --- Pilha da Home: Dashboard e Formulário ---
function HomeStack() {
  return (
    <Stack.Navigator id="home-stack" screenOptions={{ headerShown: false }}>
      {/* O nome aqui é "Dashboard", usado para voltar do formulário */}
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="TransactionForm" component={TransactionFormScreen} />
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props: any) {
  const { logout } = useAuth();
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View>
        <View style={styles.drawerHeader}>
          <View style={styles.avatar}><Text style={styles.avatarText}>A</Text></View>
          <Text style={styles.userName}>Arthur Ramos</Text>
          <Text style={styles.userEmail}>arthur@bytebank.com.br</Text>
        </View>
        <DrawerItemList {...props} />
      </View>
      <View style={{ marginTop: 'auto', padding: 20, borderTopWidth: 1, borderColor: '#E0E0E0' }}>
        <Pressable onPress={logout} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, { paddingVertical: 10 }]}>
          <Text style={{ color: '#D32F2F', fontWeight: 'bold', fontSize: 16 }}>Sair da Conta</Text>
        </Pressable>
      </View>
    </DrawerContentScrollView>
  );
}

export default function Routes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.primary }}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

  return user ? (
    <Drawer.Navigator
      id="root-drawer"
      initialRouteName="Welcome" // Garante que comece na tela de boas-vindas
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: COLORS.primary,
        drawerActiveTintColor: COLORS.accent,
      }}
    >
      {/* 1. Tela de Boas-vindas (Escondida do menu) */}
      <Drawer.Screen 
        name="Welcome" 
        component={WelcomeScreen} 
        options={{ drawerItemStyle: { display: 'none' }, swipeEnabled: false }} 
      />

      {/* 2. Rota Principal renomeada para "Home" para evitar o erro de navegação */}
      <Drawer.Screen 
        name="Home" 
        component={HomeStack} 
        options={{ title: 'Início' }} 
      />

      <Drawer.Screen name="Profile" component={DashboardScreen} options={{ title: 'Meu Perfil' }} />
      <Drawer.Screen name="Settings" component={DashboardScreen} options={{ title: 'Configurações' }} />
    </Drawer.Navigator>
  ) : (
    <Stack.Navigator id="auth-stack" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerHeader: { padding: 20, backgroundColor: COLORS.surface, marginBottom: 10, alignItems: 'flex-start' },
  avatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  avatarText: { color: COLORS.white, fontSize: 24, fontWeight: 'bold' },
  userName: { fontSize: 18, fontWeight: 'bold', color: COLORS.textPrimary },
  userEmail: { fontSize: 12, color: COLORS.textSecondary },
});