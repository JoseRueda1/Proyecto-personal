// src/screens/HomeScreen.tsx
// Pantalla de inicio: logo de marca a pantalla completa, da personalidad
// y es la primera impresión cuando se abre la app.

import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={styles.container}>
        <View style={styles.logoWrap}>
          <Text style={styles.logoTop}>PANDA</Text>
          <Text style={styles.logoBottom}>EXPRESS</Text>
        </View>
        <Text style={styles.tagline}>Cocina china auténtica, recién hecha</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.primary },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  logoWrap: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoTop: {
    fontSize: 64,
    fontWeight: '800',
    color: colors.textInverse,
    letterSpacing: 4,
  },
  logoBottom: {
    fontSize: 26,
    fontWeight: '600',
    color: colors.textInverse,
    letterSpacing: 10,
    marginTop: -6,
  },
  tagline: {
    fontSize: 15,
    color: colors.textInverse,
    opacity: 0.92,
    textAlign: 'center',
  },
});