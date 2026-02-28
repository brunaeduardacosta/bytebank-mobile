import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, SPACING } from '../theme';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  
  // Header com Menu Lateral
  header: { 
    paddingHorizontal: SPACING.m, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingTop: 60,
    marginBottom: 20 
  },
  menuButton: { padding: 8 },
  profileCircle: { 
    width: 40, height: 40, borderRadius: 20, 
    backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' 
  },

  // DESTAQUE DO SALDO (Ultra Premium)
  balanceSection: { paddingHorizontal: SPACING.m, alignItems: 'center', marginBottom: 30 },
  balanceLabel: { fontSize: 13, color: COLORS.textSecondary, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 },
  balanceValue: { fontSize: 42, fontWeight: '800', color: COLORS.primary, letterSpacing: -1 },
  currency: { fontSize: 20, fontWeight: '400', color: COLORS.accent },

  // CATEGORIAS MINIMALISTAS (Action Bar)
  actionsWrapper: { paddingLeft: SPACING.m, marginBottom: 35 },
  actionCircle: { 
    width: 60, height: 60, borderRadius: 18, // Quadrado arredondado moderno
    backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', marginBottom: 8,
    borderWidth: 1, borderColor: '#EEE'
  },
  actionLabel: { fontSize: 11, fontWeight: '600', color: COLORS.textPrimary, textAlign: 'center' },

  // GRÁFICO ÁREA (Diferenciado)
  chartContainer: { 
    marginHorizontal: SPACING.m, 
    backgroundColor: COLORS.primary, 
    borderRadius: 32, 
    paddingTop: 25, 
    overflow: 'hidden', 
    elevation: 10, shadowColor: COLORS.primary, shadowOpacity: 0.3, shadowRadius: 15 
  },
  chartTitle: { color: 'rgba(255,255,255,0.6)', marginLeft: 25, fontSize: 12, fontWeight: '600' },
  chartValue: { color: COLORS.white, marginLeft: 25, fontSize: 22, fontWeight: 'bold', marginBottom: 10 },

  // HISTÓRICO (Scroll Infinito / Lista Separada)
  historySection: { 
    flex: 1, 
    backgroundColor: COLORS.surface, 
    borderTopLeftRadius: 35, borderTopRightRadius: 35, 
    marginTop: 20, paddingHorizontal: SPACING.m, paddingTop: 30 
  },
  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  historyTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textPrimary },

  transactionCard: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, 
    padding: 16, borderRadius: 20, marginBottom: 12,
    shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 10
  },
  iconWrapper: { 
    width: 48, height: 48, borderRadius: 14, 
    backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', marginRight: 15 
  },
  transDetails: { flex: 1 },
  transName: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary },
  transDate: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  transAmount: { fontSize: 15, fontWeight: 'bold' },

  fab: { 
    position: 'absolute', bottom: 30, right: 25, width: 64, height: 64, 
    borderRadius: 22, backgroundColor: COLORS.accent, 
    justifyContent: 'center', alignItems: 'center', elevation: 8 
  }
});