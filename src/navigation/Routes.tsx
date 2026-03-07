import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../context/AuthContext';
import { COLORS } from '../theme';

// Importação das Telas
import DashboardScreen from '../screens/DashboardScreen';
import TransactionFormScreen from '../screens/TransactionFormScreen'; 
import ResumoScreen from '../screens/ResumoScreen'; 
import TransferenciaScreen from '../screens/TransferenciaScreen';
import EmprestimoScreen from '../screens/EmprestimoScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

/**
 * --- HomeStack ---
 * Gerencia a navegação interna da aba "Início".
 */
function HomeStack() {
  return (
    <Stack.Navigator id="home-stack" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="TransactionForm" component={TransactionFormScreen} />
      <Stack.Screen name="ResumoFinanceiro" component={ResumoScreen} /> 
      <Stack.Screen name="Transferencia" component={TransferenciaScreen} /> 
      <Stack.Screen name="Emprestimo" component={EmprestimoScreen} /> 
    </Stack.Navigator>
  );
}

/**
 * --- CustomDrawerContent ---
 * Personalização do Menu Lateral
 */
function CustomDrawerContent(props: any) {
  const { logout } = useAuth();
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View>
        <View style={styles.drawerHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>
          <Text style={styles.userName}>Arthur Ramos</Text>
          <Text style={styles.userEmail}>arthur@bytebank.com.br</Text>
        </View>
        <DrawerItemList {...props} />
      </View>
      
      <View style={styles.logoutContainer}>
        <Pressable 
          onPress={logout} 
          style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, styles.logoutBtn]}
        >
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </Pressable>
      </View>
    </DrawerContentScrollView>
  );
}

/**
 * --- Componente Principal de Rotas ---
 */
export default function Routes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

  return user ? (
    <Drawer.Navigator
      id="root-drawer"
      initialRouteName="Welcome"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: COLORS.primary,
        drawerActiveTintColor: COLORS.accent,
      }}
    >
      <Drawer.Screen 
        name="Welcome" 
        component={WelcomeScreen} 
        options={{ 
          drawerItemStyle: { display: 'none' }, 
          swipeEnabled: false 
        }} 
      />

      <Drawer.Screen 
        name="Home" 
        component={HomeStack} 
        options={{ title: 'Início' }} 
      />

      <Drawer.Screen 
        name="Profile" 
        component={DashboardScreen} 
        options={{ title: 'Meu Perfil' }} 
      />
      
      <Drawer.Screen 
        name="Settings" 
        component={DashboardScreen} 
        options={{ title: 'Configurações' }} 
      />
    </Drawer.Navigator>
  ) : (
    <Stack.Navigator id="auth-stack" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.primary },
  drawerHeader: { padding: 20, backgroundColor: COLORS.surface, marginBottom: 10, alignItems: 'flex-start' },
  avatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  avatarText: { color: COLORS.white, fontSize: 24, fontWeight: 'bold' },
  userName: { fontSize: 18, fontWeight: 'bold', color: COLORS.textPrimary },
  userEmail: { fontSize: 12, color: COLORS.textSecondary },
  logoutContainer: { marginTop: 'auto', padding: 20, borderTopWidth: 1, borderColor: '#E0E0E0' },
  logoutBtn: { paddingVertical: 10 },
  logoutText: { color: '#D32F2F', fontWeight: 'bold', fontSize: 16 },
});