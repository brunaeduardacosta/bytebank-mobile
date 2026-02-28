import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Pressable, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  Alert,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { useTransactions } from '../context/TransactionContext';
import { COLORS } from '../theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TransactionFormScreen({ navigation }: any) {
  const { addTransaction } = useTransactions();
  
  // Estados para o formulário
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'receita' | 'despesa'>('despesa');

  const handleSave = async () => {
    // Validação básica
    if (!description || !amount) {
      Alert.alert("Campos vazios", "Por favor, preencha a descrição e o valor.");
      return;
    }

    try {
      // Transformamos a vírgula em ponto para o banco de dados entender como número
      const finalAmount = parseFloat(amount.replace(',', '.'));
      
      await addTransaction({
        description,
        amount: finalAmount,
        type,
        category: 'Geral', 
      });

      Alert.alert("Sucesso!", "Sua transação foi registrada.");
      // Voltamos especificamente para a tela Dashboard
      navigation.navigate('Dashboard'); 
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a transação.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      
      {/* HEADER LIMPO */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" size={32} color={COLORS.primary} />
        </Pressable>
        <Text style={styles.headerTitle}>Nova Transação</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          {/* SELETOR DE TIPO (ESTILO BANCO INTER) */}
          <View style={styles.typeSelector}>
            <Pressable 
              style={[styles.typeBtn, type === 'receita' && styles.typeBtnActiveIncome]}
              onPress={() => setType('receita')}
            >
              <MaterialCommunityIcons 
                name="trending-up" 
                size={22} 
                color={type === 'receita' ? '#FFF' : '#2E7D32'} 
              />
              <Text style={[styles.typeText, type === 'receita' && styles.typeTextActive]}>Entrada</Text>
            </Pressable>

            <Pressable 
              style={[styles.typeBtn, type === 'despesa' && styles.typeBtnActiveExpense]}
              onPress={() => setType('despesa')}
            >
              <MaterialCommunityIcons 
                name="trending-down" 
                size={22} 
                color={type === 'despesa' ? '#FFF' : '#C62828'} 
              />
              <Text style={[styles.typeText, type === 'despesa' && styles.typeTextActive]}>Saída</Text>
            </Pressable>
          </View>

          {/* CARD DE ENTRADA DE DADOS */}
          <View style={styles.card}>
            <Text style={styles.label}>O que você comprou ou recebeu?</Text>
            <TextInput 
              style={styles.input}
              placeholder="Ex: Aluguel, Salário, Café..."
              placeholderTextColor="#999"
              value={description}
              onChangeText={setDescription}
            />

            <Text style={styles.label}>Qual o valor?</Text>
            <View style={styles.amountContainer}>
              <Text style={styles.currencyPrefix}>R$</Text>
              <TextInput 
                style={styles.amountInput}
                placeholder="0,00"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              />
            </View>

            <Pressable style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Confirmar</Text>
            </Pressable>

            <Pressable style={styles.cancelButton} onPress={() => navigation.navigate('Dashboard')}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </Pressable>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 15, 
    paddingVertical: 15, 
    backgroundColor: '#FFF' 
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  backButton: { padding: 5 },
  scrollContent: { padding: 20 },

  typeSelector: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  typeBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    width: '48%', 
    paddingVertical: 15, 
    borderRadius: 15, 
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0'
  },
  typeBtnActiveIncome: { backgroundColor: '#2E7D32', borderColor: '#2E7D32' },
  typeBtnActiveExpense: { backgroundColor: '#C62828', borderColor: '#C62828' },
  typeText: { marginLeft: 10, fontWeight: 'bold', color: '#666' },
  typeTextActive: { color: '#FFF' },

  card: { backgroundColor: '#FFF', borderRadius: 20, padding: 20, elevation: 3 },
  label: { fontSize: 14, color: '#666', marginBottom: 10, fontWeight: '600' },
  input: { 
    backgroundColor: '#F8F9FA', 
    padding: 15, 
    borderRadius: 12, 
    fontSize: 16, 
    color: '#333', 
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#F0F0F0' 
  },
  amountContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F8F9FA', 
    paddingHorizontal: 15, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#F0F0F0',
    marginBottom: 35
  },
  currencyPrefix: { fontSize: 20, fontWeight: 'bold', color: '#333', marginRight: 10 },
  amountInput: { flex: 1, paddingVertical: 15, fontSize: 28, fontWeight: 'bold', color: '#333' },

  saveButton: { backgroundColor: COLORS.primary, paddingVertical: 18, borderRadius: 15, alignItems: 'center' },
  saveButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold', textTransform: 'uppercase' },
  cancelButton: { marginTop: 15, paddingVertical: 10, alignItems: 'center' },
  cancelButtonText: { color: '#999', fontSize: 14, fontWeight: '600' }
});