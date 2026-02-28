import 'react-native-gesture-handler';
import React from 'react';
// IMPORT NOVO AQUI:
import { GestureHandlerRootView } from 'react-native-gesture-handler'; 
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/navigation/Routes';
import { AuthProvider } from './src/context/AuthContext';
import { TransactionProvider } from './src/context/TransactionContext';

export default function App() {
  return (
    // ADICIONE ESTA TAG ENVOLVENDO TUDO, COM flex: 1
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AuthProvider>
          <TransactionProvider>
            <Routes />
          </TransactionProvider>
        </AuthProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}