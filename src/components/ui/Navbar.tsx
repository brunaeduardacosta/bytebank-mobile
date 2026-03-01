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
import { auth } from '../../services/firebase'; // ajuste se necessário

interface NavbarProps {
  theme: any;
}

const Navbar: React.FC<NavbarProps> = ({ theme }) => {

  const handleLogout = () => {
    Alert.alert(
      "Sair da conta",
      "Tem certeza que deseja sair?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sair",
          style: "destructive",
          onPress: async () => {
            try {
              await signOut(auth);
            } catch (error) {
              console.log("Erro ao sair:", error);
            }
          },
        },
      ]
    );
  };

  return (
    <View
      style={[
        navStyles.topbar,
        {
          backgroundColor: theme.card,
          borderBottomColor: theme.border,
        },
      ]}
    >
      <View style={navStyles.topbarInner}>
        
        {/* ESQUERDA: LOGO */}
        <View style={navStyles.leftSection}>
          <View
            style={[
              navStyles.logoBadge,
              { backgroundColor: theme.accent },
            ]}
          >
            <Text style={navStyles.logoBadgeText}>B</Text>
          </View>

          <Text style={[navStyles.logoText, { color: theme.text }]}>
            Byte<Text style={{ color: theme.accent }}>bank</Text>
          </Text>
        </View>

        {/* DIREITA: AÇÕES */}
        <View style={navStyles.rightSection}>
          
          <TouchableOpacity style={navStyles.iconBtn}>
            <Ionicons
              name="search-outline"
              size={22}
              color={theme.subText}
            />
          </TouchableOpacity>

          <TouchableOpacity style={navStyles.iconBtn}>
            <Ionicons
              name="notifications-outline"
              size={22}
              color={theme.subText}
            />
            <View style={navStyles.notifDot} />
          </TouchableOpacity>

          {/* AVATAR COM LOGOUT */}
          <TouchableOpacity
            onPress={handleLogout}
            style={[
              navStyles.userAvatar,
              { backgroundColor: theme.accent },
            ]}
          >
            <Text style={navStyles.avatarText}>BS</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const navStyles = StyleSheet.create({
  topbar: {
    width: '100%',
    height: Platform.OS === 'ios' ? 110 : 90,
    borderBottomWidth: 1,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    justifyContent: 'center',
    zIndex: 1000,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  topbarInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  logoBadgeText: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 16,
  },

  logoText: {
    fontSize: 20,
    fontWeight: '800',
  },

  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBtn: {
    padding: 8,
    position: 'relative',
  },

  notifDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    backgroundColor: '#EF4444',
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#FFF',
  },

  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },

  avatarText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
});

export default Navbar;