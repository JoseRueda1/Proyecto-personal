// src/screens/PandaPoScreen.tsx
// Placeholder. Sistema de puntos PandaPoints: tarjeta circular,
// sellos, escaneo QR/código secreto y recompensas canjeables.

import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

export default function PandaPoScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={colors.headerDark} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>PandaPoints</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>En construcción</Text>
        <Text style={styles.subtitle}>
          Aquí estará la tarjeta de sellos, el botón SELLAR y la lista de recompensas.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.headerDark,
    paddingVertical: 18,
    alignItems: 'center',
  },
  headerTitle: {
    color: colors.textInverse,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  title: { fontSize: 22, fontWeight: '700', color: colors.text, marginBottom: 8 },
  subtitle: {
    fontSize: 15,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
});