import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  StatusBar,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Navbar from "../components/ui/Navbar";

const { width: screenWidth } = Dimensions.get("window");

const Themes = {
  light: {
    bg: "#F8FAFC",
    card: "#FFFFFF",
    text: "#1F2937",
    subText: "#6B7280",
    border: "#E2E8F0",
    accent: "#47A138",
    tab: "#F1F5F9"
  },
  dark: {
    bg: "#0F172A",
    card: "#1E293B",
    text: "#F8FAFC",
    subText: "#94A3B8",
    border: "#334155",
    accent: "#4ADE80",
    tab: "#334155"
  }
};

export default function MobileDashboardScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showValue, setShowValue] = useState(true);
  const theme = isDarkMode ? Themes.dark : Themes.light;

  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    progressAnim.setValue(0);
    Animated.timing(progressAnim, {
      toValue: 0.65, 
      duration: 1500,
      useNativeDriver: false, 
    }).start();
  }, [isDarkMode]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  // Definimos a altura da Navbar para compensar no ScrollView
  const NAVBAR_HEIGHT = Platform.OS === 'ios' ? 110 : 90;

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar 
        barStyle={isDarkMode ? "light-content" : "dark-content"} 
        backgroundColor="transparent" 
        translucent 
      />
      
      {/* 1. NAVBAR FIXA NO TOPO - Renderizada por último no JSX para garantir clique */}
      <Navbar theme={theme} />

      {/* 2. CONTEÚDO SCROLLÁVEL */}
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        // O segredo está aqui: paddingTop empurra o conteúdo para baixo da Navbar
        contentContainerStyle={[
          styles.scrollContent, 
          { paddingTop: NAVBAR_HEIGHT + 10 } 
        ]}
      >
        
        {/* HEADER DE BOAS VINDAS */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: theme.text }]}>Olá, Bruna! 👋</Text>
            <Text style={[styles.subGreeting, { color: theme.subText }]}>Sua vida financeira hoje</Text>
          </View>
          
          <TouchableOpacity 
            onPress={() => setIsDarkMode(!isDarkMode)} 
            style={[styles.themeToggle, { backgroundColor: theme.tab }]}
            activeOpacity={0.7}
          >
            <Ionicons name={isDarkMode ? "sunny" : "moon"} size={20} color={theme.accent} />
          </TouchableOpacity>
        </View>

        {/* CARD DE SALDO TOTAL */}
        <View style={[styles.balanceCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.rowBetween}>
            <Text style={[styles.balanceLabel, { color: theme.subText }]}>Saldo total</Text>
            <TouchableOpacity onPress={() => setShowValue(!showValue)} hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
              <Ionicons name={showValue ? "eye-outline" : "eye-off-outline"} size={22} color={theme.subText} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.balanceValue, { color: theme.text }]}>
            {showValue ? "R$ 12.450,00" : "••••••"}
          </Text>
        </View>

        {/* METAS FINANCEIRAS */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.rowBetween}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>Reserva de Emergência</Text>
            <Text style={[styles.percentageText, { color: theme.accent }]}>65%</Text>
          </View>
          <View style={[styles.progressTrack, { backgroundColor: isDarkMode ? "#334155" : "#E2E8F0" }]}>
            <Animated.View style={[styles.progressFill, { backgroundColor: theme.accent, width: progressWidth }]} />
          </View>
          <View style={styles.rowBetween}>
            <Text style={[styles.smallText, { color: theme.subText }]}>R$ 6.500,00</Text>
            <Text style={[styles.smallText, { color: theme.subText }]}>Alvo: R$ 10.000</Text>
          </View>
        </View>

        {/* BOTÕES DE AÇÃO RÁPIDA */}
        <View style={styles.quickActionsContainer}>
          <QuickAction icon="rocket-outline" label="Investir" theme={theme} />
          <QuickAction icon="qr-code-outline" label="Pix" theme={theme} />
          <QuickAction icon="shield-checkmark-outline" label="Seguros" theme={theme} />
          <QuickAction icon="gift-outline" label="Mimos" theme={theme} />
        </View>

        {/* CARD DE CARTÃO DE CRÉDITO */}
        <TouchableOpacity style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]} activeOpacity={0.9}>
          <View style={styles.rowBetween}>
             <Text style={[styles.cardTitle, { color: theme.text }]}>Cartão de Crédito</Text>
             <Ionicons name="card-outline" size={20} color={theme.accent} />
          </View>
          <View style={[styles.rowBetween, { marginTop: 15 }]}>
            <View>
              <Text style={[styles.smallText, { color: theme.subText }]}>Fatura fechada</Text>
              <Text style={[styles.bigValue, { color: theme.text }]}>R$ 1.840,20</Text>
            </View>
            <TouchableOpacity style={[styles.payBtn, { backgroundColor: theme.accent }]}>
              <Text style={styles.payBtnText}>Pagar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        {/* CARD DE EMPRÉSTIMOS */}
        <TouchableOpacity style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]} activeOpacity={0.8}>
          <View style={styles.rowBetween}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.cardTitle, { color: theme.text }]}>Empréstimos</Text>
              <Text style={[styles.smallText, { color: theme.subText, marginTop: 4 }]}>Crédito disponível para você:</Text>
              <Text style={[styles.bigValue, { color: theme.accent, fontSize: 20, marginTop: 8 }]}>R$ 25.000,00</Text>
            </View>
            <Ionicons name="cash-outline" size={24} color={theme.subText} />
          </View>
        </TouchableOpacity>

        {/* CARD INDIQUE AMIGOS */}
        <TouchableOpacity 
          style={[styles.card, { 
            backgroundColor: isDarkMode ? theme.tab : "#E8F5E9", 
            borderColor: theme.accent,
            borderStyle: 'dashed' 
          }]}
          activeOpacity={0.8}
        >
          <View style={styles.rowBetween}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.cardTitle, { color: theme.text }]}>Indique amigos</Text>
              <Text style={[styles.smallText, { color: theme.text, marginTop: 4 }]}>Ganhe até R$ 50 por indicação!</Text>
            </View>
            <View style={[styles.iconCircle, { backgroundColor: theme.accent, marginBottom: 0, width: 40, height: 40 }]}>
              <Ionicons name="gift" size={20} color="#FFF" />
            </View>
          </View>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

function QuickAction({ icon, label, theme }) {
  return (
    <View style={styles.actionItem}>
      <TouchableOpacity style={[styles.iconCircle, { backgroundColor: theme.tab }]} activeOpacity={0.6}>
        <Ionicons name={icon} size={24} color={theme.accent} />
      </TouchableOpacity>
      <Text style={[styles.actionText, { color: theme.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 40 },
  header: { paddingHorizontal: 25, paddingBottom: 25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting: { fontSize: 22, fontWeight: "800" },
  subGreeting: { fontSize: 14, marginTop: 2 },
  themeToggle: { width: 42, height: 42, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  balanceCard: { marginHorizontal: 20, padding: 25, borderRadius: 30, marginBottom: 20, borderWidth: 1 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  balanceLabel: { fontSize: 14, fontWeight: '600' },
  balanceValue: { fontSize: 34, fontWeight: "900", marginTop: 8, letterSpacing: -0.5 },
  card: { marginHorizontal: 20, padding: 22, borderRadius: 24, marginBottom: 16, borderWidth: 1 },
  cardTitle: { fontWeight: "700", fontSize: 16 },
  progressTrack: { height: 10, borderRadius: 5, marginVertical: 14, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 5 },
  percentageText: { fontWeight: 'bold', fontSize: 14 },
  quickActionsContainer: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, marginBottom: 10 },
  actionItem: { alignItems: 'center' },
  iconCircle: { width: 58, height: 58, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  actionText: { fontSize: 12, fontWeight: '700' },
  smallText: { fontSize: 12, fontWeight: '500' },
  bigValue: { fontSize: 24, fontWeight: "800", marginTop: 4 },
  payBtn: { paddingHorizontal: 22, paddingVertical: 12, borderRadius: 14 },
  payBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 }
});