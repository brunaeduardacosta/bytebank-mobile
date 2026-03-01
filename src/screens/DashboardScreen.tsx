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

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      
      {/* NAVBAR FIXA - Fora do ScrollView */}
      <Navbar theme={theme} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* HEADER DE BOAS VINDAS COM TOGGLE */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: theme.text }]}>Olá, Bruna! 👋</Text>
            <Text style={[styles.subGreeting, { color: theme.subText }]}>Sua vida financeira hoje</Text>
          </View>
          <TouchableOpacity 
            onPress={() => setIsDarkMode(!isDarkMode)} 
            style={[styles.themeToggle, { backgroundColor: theme.tab }]}
          >
            <Ionicons name={isDarkMode ? "sunny" : "moon"} size={20} color={theme.accent} />
          </TouchableOpacity>
        </View>

        {/* CARD DE SALDO */}
        <View style={[styles.balanceCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.rowBetween}>
            <Text style={[styles.balanceLabel, { color: theme.subText }]}>Saldo total</Text>
            <TouchableOpacity onPress={() => setShowValue(!showValue)}>
              <Ionicons name={showValue ? "eye-outline" : "eye-off-outline"} size={22} color={theme.subText} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.balanceValue, { color: theme.text }]}>
            {showValue ? "R$ 12.450,00" : "••••••"}
          </Text>
        </View>

        {/* METAS COM ANIMAÇÃO */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.rowBetween}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>Meta: Reserva de Emergência</Text>
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

        {/* AÇÕES RÁPIDAS */}
        <View style={styles.quickActionsContainer}>
          <QuickAction icon="rocket-outline" label="Investir" theme={theme} />
          <QuickAction icon="qr-code-outline" label="Pix" theme={theme} />
          <QuickAction icon="shield-checkmark-outline" label="Seguros" theme={theme} />
          <QuickAction icon="gift-outline" label="Mimos" theme={theme} />
        </View>

        {/* CARD DE CARTÃO */}
        <TouchableOpacity style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.cardTitle, { color: theme.text, marginBottom: 15 }]}>Cartão de Crédito</Text>
          <View style={styles.rowBetween}>
            <View>
              <Text style={[styles.smallText, { color: theme.subText }]}>Fatura fechada</Text>
              <Text style={[styles.bigValue, { color: theme.text }]}>R$ 1.840,20</Text>
            </View>
            <TouchableOpacity style={[styles.payBtn, { backgroundColor: theme.accent }]}>
              <Text style={styles.payBtnText}>Pagar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

function QuickAction({ icon, label, theme }) {
  return (
    <View style={styles.actionItem}>
      <TouchableOpacity style={[styles.iconCircle, { backgroundColor: theme.tab }]}>
        <Ionicons name={icon} size={24} color={theme.accent} />
      </TouchableOpacity>
      <Text style={[styles.actionText, { color: theme.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { 
    paddingHorizontal: 25, 
    paddingTop: 20, 
    paddingBottom: 25, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  greeting: { fontSize: 22, fontWeight: "800" },
  subGreeting: { fontSize: 14, marginTop: 2 },
  themeToggle: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  
  balanceCard: { marginHorizontal: 20, padding: 25, borderRadius: 28, marginBottom: 20, borderWidth: 1 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  balanceLabel: { fontSize: 14, fontWeight: '600' },
  balanceValue: { fontSize: 34, fontWeight: "800", marginTop: 10 },

  card: { marginHorizontal: 20, padding: 20, borderRadius: 24, marginBottom: 16, borderWidth: 1 },
  cardTitle: { fontWeight: "700", fontSize: 16 },
  
  progressTrack: { height: 12, borderRadius: 6, marginVertical: 12, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 6 },
  percentageText: { fontWeight: 'bold', fontSize: 14 },
  
  quickActionsContainer: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, marginBottom: 10 },
  actionItem: { alignItems: 'center' },
  iconCircle: { width: 55, height: 55, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  actionText: { fontSize: 12, fontWeight: '600' },

  smallText: { fontSize: 12, fontWeight: '500' },
  bigValue: { fontSize: 22, fontWeight: "bold" },
  payBtn: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12 },
  payBtnText: { color: '#FFF', fontWeight: 'bold' }
});