import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, StatusBar, SafeAreaView, ActivityIndicator } from 'react-native';
import { useTransactions } from '../context/TransactionContext';
import { COLORS } from '../theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DashboardScreen({ navigation }: any) {
  const { transactions, totalBalance, loading } = useTransactions();
  const [showBalance, setShowBalance] = useState(true);

  if (loading) {
    return (
      <View style={styles.loadingFull}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá, Arthur</Text>
          <Text style={styles.dateText}>Sexta-feira, 27 de fevereiro</Text>
        </View>
        <Pressable style={styles.menuButton} onPress={() => navigation.openDrawer()}>
          <MaterialCommunityIcons name="menu" size={28} color={COLORS.primary} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>Saldo disponível</Text>
            <Pressable onPress={() => setShowBalance(!showBalance)}>
              <MaterialCommunityIcons name={showBalance ? "eye-outline" : "eye-off-outline"} size={24} color="#666" />
            </Pressable>
          </View>
          <Text style={styles.balanceValue}>
            {showBalance ? `R$ ${totalBalance.toFixed(2)}` : "••••••"}
          </Text>
          <View style={styles.divider} />
          <Pressable style={styles.statementButton}>
            <Text style={styles.statementText}>Ver extrato completo</Text>
            <MaterialCommunityIcons name="chevron-right" size={20} color={COLORS.accent} />
          </Pressable>
        </View>

        <View style={styles.actionsGrid}>
          <ActionItem 
  icon="plus-circle" 
  label="Nova" 
  onPress={() => navigation.navigate('Home', { screen: 'TransactionForm' })} 
/>
          <ActionItem icon="bank-transfer" label="Transferir" />
          <ActionItem icon="barcode-scan" label="Pagar" />
          <ActionItem icon="cellphone-arrow-down" label="Recarga" />
        </View>

        <View style={styles.transactionsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Últimas atividades</Text>
            <Pressable><Text style={styles.seeAll}>Ver todas</Text></Pressable>
          </View>

          {transactions.length === 0 ? (
            <View style={styles.emptyContainer}><Text style={styles.emptyText}>Nenhuma movimentação ainda.</Text></View>
          ) : (
            transactions.slice(0, 5).map((item) => (
              <View key={item.id} style={styles.transactionItem}>
                <View style={[styles.iconBox, { backgroundColor: item.type === 'receita' ? '#E8F5E9' : '#FFEBEE' }]}>
                  <MaterialCommunityIcons name={item.type === 'receita' ? "trending-up" : "trending-down"} size={22} color={item.type === 'receita' ? '#2E7D32' : '#C62828'} />
                </View>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionLabel}>{item.description}</Text>
                  <Text style={styles.transactionDate}>{item.date instanceof Date ? item.date.toLocaleDateString('pt-BR') : 'Data inválida'}</Text>
                </View>
                <Text style={[styles.transactionValue, { color: item.type === 'receita' ? '#2E7D32' : '#333' }]}>
                  {item.type === 'receita' ? `+ R$ ${item.amount.toFixed(2)}` : `- R$ ${item.amount.toFixed(2)}`}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ActionItem({ icon, label, onPress }: any) {
  return (
    <Pressable style={styles.actionItem} onPress={onPress}>
      <View style={styles.actionIconCircle}>
        <MaterialCommunityIcons name={icon} size={26} color={COLORS.primary} />
      </View>
      <Text style={styles.actionLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  loadingFull: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FA' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10, backgroundColor: '#FFF' },
  greeting: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  dateText: { fontSize: 13, color: '#666', marginTop: 2 },
  menuButton: { padding: 5 },
  scrollContent: { padding: 20 },
  balanceCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 20, marginBottom: 25, elevation: 3 },
  balanceHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  balanceLabel: { fontSize: 14, color: '#666' },
  balanceValue: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginBottom: 15 },
  statementButton: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statementText: { color: COLORS.primary, fontWeight: 'bold' },
  actionsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  actionItem: { alignItems: 'center', width: '22%' },
  actionIconCircle: { width: 55, height: 55, borderRadius: 20, backgroundColor: '#F0F3F0', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  actionLabel: { fontSize: 12, fontWeight: '600', color: '#333' },
  transactionsContainer: { backgroundColor: '#FFF', borderRadius: 20, padding: 20, elevation: 2 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold' },
  seeAll: { fontSize: 13, color: COLORS.accent, fontWeight: 'bold' },
  transactionItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  iconBox: { width: 45, height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  transactionInfo: { flex: 1, marginLeft: 15 },
  transactionLabel: { fontSize: 15, fontWeight: '600' },
  transactionDate: { fontSize: 12, color: '#666' },
  transactionValue: { fontSize: 15, fontWeight: 'bold' },
  emptyContainer: { padding: 20, alignItems: 'center' },
  emptyText: { color: '#666' }
});