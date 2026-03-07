import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Navbar from '../components/ui/Navbar';

const { width } = Dimensions.get('window');

// Reutilizando os temas do seu Dashboard
const Themes = {
  light: { bg: "#F8FAFC", card: "#FFFFFF", text: "#1F2937", subText: "#6B7280", border: "#E2E8F0", accent: "#47A138", tab: "#F1F5F9" },
  dark: { bg: "#0F172A", card: "#1E293B", text: "#F8FAFC", subText: "#94A3B8", border: "#334155", accent: "#4ADE80", tab: "#334155" }
};

export default function ResumoScreen({ navigation }: any) {
  // Mantendo o estado de tema (você pode integrar isso com um Context depois)
  const [isDarkMode] = useState(false); 
  const theme = isDarkMode ? Themes.dark : Themes.light;

  const NAVBAR_HEIGHT = Platform.OS === 'ios' ? 110 : 90;

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} translucent backgroundColor="transparent" />

      {/* 1. NAVBAR FIXA NO TOPO */}
      <Navbar theme={theme} />

      {/* 2. CONTEÚDO SCROLLÁVEL */}
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={[styles.scrollContent, { paddingTop: NAVBAR_HEIGHT + 20 }]}
      >
        
        {/* BOTÃO VOLTAR (Discreto abaixo da Navbar) */}
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={theme.text} />
          <Text style={[styles.backText, { color: theme.text }]}>Voltar para o início</Text>
        </TouchableOpacity>

        {/* TÍTULO DA PÁGINA */}
        <View style={styles.headerSection}>
          <Text style={[styles.pageTitle, { color: theme.text }]}>Resumo Financeiro</Text>
          <Text style={[styles.pageSubTitle, { color: theme.subText }]}>Análise de gastos de Março</Text>
        </View>

        {/* GRÁFICO SIMULADO (FLUXO DE CAIXA) */}
        <View style={[styles.chartCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>Entradas vs Saídas</Text>
          
          <View style={styles.chartContainer}>
            {/* Barra de Entradas */}
            <View style={styles.barGroup}>
              <View style={[styles.bar, { height: 140, backgroundColor: theme.accent }]} />
              <Text style={[styles.barLabel, { color: theme.subText }]}>Receitas</Text>
              <Text style={[styles.barValue, { color: theme.text }]}>R$ 8.200</Text>
            </View>

            {/* Barra de Saídas */}
            <View style={styles.barGroup}>
              <View style={[styles.bar, { height: 90, backgroundColor: "#EF4444" }]} />
              <Text style={[styles.barLabel, { color: theme.subText }]}>Gastos</Text>
              <Text style={[styles.barValue, { color: theme.text }]}>R$ 3.450</Text>
            </View>
          </View>
        </View>

        {/* LISTA DE TRANSAÇÕES RECENTES */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Transações Recentes</Text>
          <TouchableOpacity>
            <Text style={{ color: theme.accent, fontWeight: '700' }}>Ver todas</Text>
          </TouchableOpacity>
        </View>

        <TransactionItem 
          icon="cart-outline" 
          title="Supermercado Extra" 
          date="Hoje, 14:20" 
          value="- R$ 245,00" 
          theme={theme} 
          isNegative 
        />
        <TransactionItem 
          icon="arrow-down-circle-outline" 
          title="Transferência Pix" 
          date="Ontem, 09:15" 
          value="+ R$ 1.500,00" 
          theme={theme} 
        />
        <TransactionItem 
          icon="fast-food-outline" 
          title="iFood Brasil" 
          date="04 Mar, 20:30" 
          value="- R$ 89,90" 
          theme={theme} 
          isNegative 
        />

      </ScrollView>
    </View>
  );
}

// Sub-componente para itens da lista
function TransactionItem({ icon, title, date, value, theme, isNegative }: any) {
  return (
    <View style={[styles.tItem, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={[styles.tIconContainer, { backgroundColor: theme.tab }]}>
        <Ionicons name={icon} size={22} color={isNegative ? "#EF4444" : theme.accent} />
      </View>
      <View style={{ flex: 1, marginLeft: 15 }}>
        <Text style={[styles.tTitle, { color: theme.text }]}>{title}</Text>
        <Text style={[styles.tDate, { color: theme.subText }]}>{date}</Text>
      </View>
      <Text style={[styles.tValue, { color: isNegative ? "#EF4444" : theme.accent }]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 40, paddingHorizontal: 20 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backText: { marginLeft: 8, fontWeight: '600', fontSize: 16 },
  headerSection: { marginBottom: 25 },
  pageTitle: { fontSize: 26, fontWeight: '900' },
  pageSubTitle: { fontSize: 14, marginTop: 4 },
  
  chartCard: { padding: 20, borderRadius: 28, borderWidth: 1, marginBottom: 30 },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 20 },
  chartContainer: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', height: 200, paddingBottom: 10 },
  barGroup: { alignItems: 'center' },
  bar: { width: 50, borderRadius: 15, marginBottom: 12 },
  barLabel: { fontSize: 12, fontWeight: '600' },
  barValue: { fontSize: 14, fontWeight: '800', marginTop: 4 },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: '800' },
  tItem: { flexDirection: 'row', alignItems: 'center', padding: 18, borderRadius: 24, marginBottom: 12, borderWidth: 1 },
  tIconContainer: { width: 48, height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  tTitle: { fontSize: 15, fontWeight: '700' },
  tDate: { fontSize: 12, marginTop: 2 },
  tValue: { fontSize: 16, fontWeight: '800' }
});