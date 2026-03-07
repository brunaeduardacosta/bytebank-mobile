import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Navbar from '../components/ui/Navbar';

export default function EmprestimoScreen({ navigation, theme = { text: '#1F2937', subText: '#6B7280', accent: '#47A138', card: '#FFF', bg: '#F8FAFC', border: '#E2E8F0', tab: '#F1F5F9' } }: any) {
  const NAVBAR_HEIGHT = Platform.OS === 'ios' ? 110 : 90;

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <Navbar theme={theme} />

      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingTop: NAVBAR_HEIGHT + 20 }]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
          <Text style={[styles.backText, { color: theme.text }]}>Voltar</Text>
        </TouchableOpacity>

        <Text style={[styles.title, { color: theme.text }]}>Empréstimo</Text>

        {/* CARD DE CRÉDITO DISPONÍVEL */}
        <View style={[styles.creditCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.label, { color: theme.subText }]}>Valor disponível para você</Text>
          <Text style={[styles.amount, { color: theme.accent }]}>R$ 25.000,00</Text>
          <Text style={[styles.subLabel, { color: theme.subText }]}>Taxas a partir de 1,99% ao mês</Text>
          
          <TouchableOpacity style={[styles.simulateBtn, { backgroundColor: theme.accent }]}>
            <Text style={styles.simulateBtnText}>Simular Empréstimo</Text>
          </TouchableOpacity>
        </View>

        {/* INFORMAÇÕES ADICIONAIS */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Como funciona?</Text>
        
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={24} color={theme.accent} />
          <View style={styles.infoText}>
            <Text style={[styles.infoTitle, { color: theme.text }]}>Dinheiro na hora</Text>
            <Text style={[styles.infoSub, { color: theme.subText }]}>Cai na sua conta Bytebank imediatamente após a contratação.</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={24} color={theme.accent} />
          <View style={styles.infoText}>
            <Text style={[styles.infoTitle, { color: theme.text }]}>Até 90 dias</Text>
            <Text style={[styles.infoSub, { color: theme.subText }]}>Para começar a pagar a primeira parcela.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backText: { marginLeft: 8, fontSize: 16, fontWeight: '600' },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 25 },
  creditCard: { padding: 25, borderRadius: 24, borderWidth: 1, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 5 },
  amount: { fontSize: 32, fontWeight: '900', marginBottom: 5 },
  subLabel: { fontSize: 12, marginBottom: 25 },
  simulateBtn: { padding: 16, borderRadius: 14, alignItems: 'center' },
  simulateBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginTop: 35, marginBottom: 20 },
  infoRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20 },
  infoText: { marginLeft: 15, flex: 1 },
  infoTitle: { fontSize: 16, fontWeight: '700' },
  infoSub: { fontSize: 14, marginTop: 4, lineHeight: 20 }
});