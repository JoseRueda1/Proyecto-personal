// src/screens/PandaPoScreen.tsx
// Muestra puntos, sellos visuales y recompensas canjeables.
// Estado leído desde AppContext (los puntos solo suben al usar cupones).

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useApp } from '../context/AppContext';
import type { Reward } from '../data/rewardsCatalog';

const STAMPS_TOTAL = 7;

export default function PandaPoScreen() {
  const { points, rewards, redeemReward } = useApp();
  const stampsFilled = Math.min(points, STAMPS_TOTAL);

  const handleRedeem = (reward: Reward) => {
    if (points < reward.cost) {
      Alert.alert(
        'Puntos insuficientes',
        `Necesitas ${reward.cost - points} punto(s) más para canjear "${reward.title}".`
      );
      return;
    }
    Alert.alert(
      '¿Canjear recompensa?',
      `Vas a usar ${reward.cost} puntos por:\n${reward.title}`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Canjear',
          onPress: () => {
            const result = redeemReward(reward);
            if (result.ok) {
              Alert.alert('¡Listo!', `Disfruta tu ${reward.title.toLowerCase()}.`);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={colors.headerDark} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>PandaPoints</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.pointsCard}>
          <View style={styles.stampsRing}>
            <View style={styles.ringTrack} />
            {Array.from({ length: STAMPS_TOTAL }).map((_, i) => {
              const angle = (i / STAMPS_TOTAL) * 2 * Math.PI - Math.PI / 2;
              const radius = 110;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const filled = i < stampsFilled;
              return (
                <View
                  key={i}
                  style={[
                    styles.stamp,
                    filled && styles.stampFilled,
                    { transform: [{ translateX: x }, { translateY: y }] },
                  ]}
                >
                  <Ionicons
                    name="gift"
                    size={18}
                    color={filled ? colors.primary : colors.textInverse}
                  />
                </View>
              );
            })}

            <View style={styles.center}>
              <Text style={styles.pointsValue}>{points}</Text>
              <Text style={styles.pointsLabel}>PUNTOS</Text>
            </View>
          </View>

          <Text style={styles.helpText}>
            Acumula puntos usando tus cupones y canjéalos por recompensas
          </Text>
        </View>

        <View style={styles.rewardsSection}>
          <Text style={styles.sectionTitle}>Recompensas</Text>
          {rewards.map((reward) => {
            const canAfford = points >= reward.cost;
            return (
              <TouchableOpacity
                key={reward.id}
                style={[styles.rewardCard, !canAfford && styles.rewardCardLocked]}
                activeOpacity={0.7}
                onPress={() => handleRedeem(reward)}
              >
                <View style={styles.rewardIconWrap}>
                  <Ionicons name={reward.icon} size={22} color={colors.primary} />
                </View>
                <View style={styles.rewardInfo}>
                  <Text style={styles.rewardTitle}>{reward.title}</Text>
                  <Text
                    style={[
                      styles.rewardCost,
                      canAfford && styles.rewardCostAvailable,
                    ]}
                  >
                    {reward.cost} {reward.cost === 1 ? 'punto' : 'puntos'}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={colors.textMuted}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const STAMP_SIZE = 42;

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

  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 32 },

  pointsCard: {
    backgroundColor: colors.primary,
    paddingTop: 30,
    paddingBottom: 28,
    alignItems: 'center',
  },
  stampsRing: {
    width: 280,
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringTrack: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 6,
    borderColor: colors.headerDark,
  },
  stamp: {
    position: 'absolute',
    width: STAMP_SIZE,
    height: STAMP_SIZE,
    borderRadius: STAMP_SIZE / 2,
    borderWidth: 2,
    borderColor: colors.textInverse,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stampFilled: {
    backgroundColor: colors.textInverse,
    borderColor: colors.textInverse,
  },
  center: { alignItems: 'center' },
  pointsValue: {
    fontSize: 72,
    fontWeight: '800',
    color: colors.textInverse,
    lineHeight: 76,
  },
  pointsLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textInverse,
    letterSpacing: 6,
    marginTop: 2,
    opacity: 0.9,
  },
  helpText: {
    color: colors.textInverse,
    opacity: 0.85,
    fontSize: 13,
    marginTop: 18,
    textAlign: 'center',
    paddingHorizontal: 40,
  },

  rewardsSection: { padding: 20 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 14,
  },
  rewardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  rewardCardLocked: { opacity: 0.6 },
  rewardIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFE9EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  rewardInfo: { flex: 1 },
  rewardTitle: { fontSize: 15, fontWeight: '600', color: colors.text },
  rewardCost: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  rewardCostAvailable: { color: colors.success, fontWeight: '700' },
});