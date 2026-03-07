import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase'; 

interface NavbarProps {
  theme: any;
}

const Navbar: React.FC<NavbarProps> = ({ theme }) => {

  const handleLogout = () => {
    Alert.alert(
      "Sair da conta",
      "Tem certeza que deseja encerrar sua sessão?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sair",
          style: "destructive",
          onPress: async () => {
            try {
              await signOut(auth);
              // O listener onAuthStateChanged nas suas Routes cuidará do redirecionamento
            } catch (error) {
              console.error("Erro ao sair:", error);
              Alert.alert("Erro", "Não foi possível sair agora.");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={[navStyles.topbar, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
      <View style={navStyles.topbarInner}>
        
        {/* Lado Esquerdo: Logo */}
        <View style={navStyles.leftSection}>
          <View style={[navStyles.logoBadge, { backgroundColor: theme.accent }]}>
            <Text style={navStyles.logoBadgeText}>B</Text>
          </View>
          <Text style={[navStyles.logoText, { color: theme.text }]}>
            Byte<Text style={{ color: theme.accent }}>bank</Text>
          </Text>
        </View>

        {/* Lado Direito: Ações */}
        <View style={navStyles.rightSection}>
          
          {/* BOTÃO DE SAIR (Substituído o de pesquisa) */}
          <TouchableOpacity 
            style={navStyles.iconBtn} 
            onPress={handleLogout}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="log-out-outline" size={24} color="#EF4444" /> 
          </TouchableOpacity>

          {/* Notificações */}
          <TouchableOpacity style={navStyles.iconBtn}>
            <Ionicons name="notifications-outline" size={22} color={theme.subText} />
            <View style={navStyles.notifDot} />
          </TouchableOpacity>

          {/* Avatar do Usuário */}
          <View style={[navStyles.userAvatar, { backgroundColor: theme.accent }]}>
            <Text style={navStyles.avatarText}>BS</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const navStyles = StyleSheet.create({
  topbar: {
    // Importante para ficar fixo no topo
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    // Altura dinâmica conforme o sistema
    height: Platform.OS === 'ios' ? 110 : 90,
    borderBottomWidth: 1,
    paddingTop: Platform.OS === 'ios' ? 45 : 25,
    justifyContent: 'center',
    // Z-index alto para não ser coberto pelo conteúdo do ScrollView
    zIndex: 1000, 
    elevation: 10, 
  },
  topbarInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  leftSection: { flexDirection: 'row', alignItems: 'center' },
  logoBadge: { width: 32, height: 32, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  logoBadgeText: { color: '#FFF', fontWeight: '900', fontSize: 16 },
  logoText: { fontSize: 20, fontWeight: '800' },
  rightSection: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: { padding: 8, marginLeft: 4 },
  notifDot: { 
    position: 'absolute', 
    top: 8, 
    right: 8, 
    width: 8, 
    height: 8, 
    backgroundColor: '#EF4444', 
    borderRadius: 4, 
    borderWidth: 1.5, 
    borderColor: '#FFF' 
  },
  userAvatar: { width: 36, height: 36, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginLeft: 8 },
  avatarText: { color: '#FFF', fontWeight: 'bold', fontSize: 13 },
});

export default Navbar;