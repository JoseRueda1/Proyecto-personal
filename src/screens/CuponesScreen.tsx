// src/screens/CuponesScreen.tsx
// Pantalla de cupones con dos vistas:
// - Catálogo: cupones disponibles para comprar.
// - Mis cupones: tarjetas con código + QR (sin info operativa).
// Incluye un modal de demo "Modo Empleado" que simula la validación
// que en producción haría una caja registradora escaneando el QR.

import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';

import { colors } from '../theme/colors';
import { useApp } from '../context/AppContext';
import type { CatalogCoupon } from '../data/couponsCatalog';
import type { OwnedCoupon } from '../context/AppContext';

type Tab = 'catalog' | 'owned';

export default function CuponesScreen() {
  const { catalog, ownedCoupons, buyCoupon, useCoupon } = useApp();
  const [tab, setTab] = useState<Tab>('catalog');
  const [staffModalOpen, setStaffModalOpen] = useState(false);

  const handleBuy = (coupon: CatalogCoupon) => {
    Alert.alert(
      '¿Comprar cupón?',
      `${coupon.name}\nPrecio: $${coupon.price} MXN`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Comprar',
          onPress: () => {
            buyCoupon(coupon.id);
            Alert.alert('¡Cupón agregado!', 'Lo encontrarás en "Mis cupones".', [
              { text: 'Ver ahora', onPress: () => setTab('owned') },
              { text: 'Seguir viendo', style: 'cancel' },
            ]);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={colors.headerDark} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cupones</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, tab === 'catalog' && styles.tabActive]}
          onPress={() => setTab('catalog')}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabText, tab === 'catalog' && styles.tabTextActive]}>
            Catálogo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, tab === 'owned' && styles.tabActive]}
          onPress={() => setTab('owned')}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabText, tab === 'owned' && styles.tabTextActive]}>
            Mis cupones{ownedCoupons.length > 0 ? ` (${ownedCoupons.length})` : ''}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {tab === 'catalog' ? (
          catalog.map((c) => <CatalogCard key={c.id} coupon={c} onBuy={handleBuy} />)
        ) : ownedCoupons.length === 0 ? (
          <EmptyState />
        ) : (
          ownedCoupons.map((o) => {
            const catalogItem = catalog.find((c) => c.id === o.couponId);
            if (!catalogItem) return null;
            return <OwnedCouponCard key={o.id} owned={o} catalog={catalogItem} />;
          })
        )}

        <TouchableOpacity
          style={styles.demoLink}
          onPress={() => setStaffModalOpen(true)}
          activeOpacity={0.6}
        >
          <Ionicons name="construct-outline" size={14} color={colors.textMuted} />
          <Text style={styles.demoLinkText}>
            Demo: Simular validación de empleado
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <StaffValidationModal
        visible={staffModalOpen}
        onClose={() => setStaffModalOpen(false)}
        ownedCoupons={ownedCoupons}
        catalog={catalog}
        useCoupon={useCoupon}
      />
    </SafeAreaView>
  );
}

function CatalogCard({
  coupon,
  onBuy,
}: {
  coupon: CatalogCoupon;
  onBuy: (c: CatalogCoupon) => void;
}) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardIconWrap}>
          <Ionicons name={coupon.icon} size={28} color={colors.textInverse} />
        </View>
        <View style={styles.cardHeaderText}>
          <Text style={styles.cardName}>{coupon.name}</Text>
          <Text style={styles.cardDescription}>{coupon.description}</Text>
        </View>
      </View>

      <View style={styles.itemsBox}>
        {coupon.items.map((item, i) => (
          <View key={i} style={styles.itemRow}>
            <Ionicons name="checkmark-circle" size={14} color={colors.success} />
            <Text style={styles.itemText}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={styles.cardFooter}>
        <View>
          <View style={styles.priceRow}>
            <Text style={styles.priceCurrent}>${coupon.price}</Text>
            <Text style={styles.priceOriginal}>${coupon.originalPrice}</Text>
          </View>
          <Text style={styles.pointsHint}>+{coupon.pointsAwarded} puntos por uso</Text>
        </View>
        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => onBuy(coupon)}
          activeOpacity={0.8}
        >
          <Text style={styles.buyButtonText}>Comprar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function OwnedCouponCard({
  owned,
  catalog,
}: {
  owned: OwnedCoupon;
  catalog: CatalogCoupon;
}) {
  return (
    <View style={styles.ownedCard}>
      <View style={styles.cardHeader}>
        <View style={styles.cardIconWrap}>
          <Ionicons name={catalog.icon} size={28} color={colors.textInverse} />
        </View>
        <View style={styles.cardHeaderText}>
          <Text style={styles.cardName}>{catalog.name}</Text>
          <Text style={styles.cardDescription}>{catalog.description}</Text>
        </View>
      </View>

      <View style={styles.itemsBox}>
        {catalog.items.map((item, i) => (
          <View key={i} style={styles.itemRow}>
            <Ionicons name="checkmark-circle" size={14} color={colors.success} />
            <Text style={styles.itemText}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={styles.qrSection}>
        <View style={styles.qrBox}>
          <QRCode value={owned.code} size={110} backgroundColor="white" color={colors.text} />
        </View>
        <View style={styles.codeSection}>
          <Text style={styles.codeLabel}>CÓDIGO</Text>
          <Text style={styles.codeValue}>{owned.code}</Text>
          <Text style={styles.codeHint}>Muéstralo en caja</Text>
        </View>
      </View>
    </View>
  );
}

function StaffValidationModal({
  visible,
  onClose,
  ownedCoupons,
  catalog,
  useCoupon,
}: {
  visible: boolean;
  onClose: () => void;
  ownedCoupons: OwnedCoupon[];
  catalog: CatalogCoupon[];
  useCoupon: (id: string) => { ok: true } | { ok: false; reason: string };
}) {
  const [code, setCode] = useState('');
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  const handleValidate = () => {
    const owned = ownedCoupons.find((c) => c.code === code);
    if (!owned) {
      setResult({ ok: false, message: 'Código no encontrado.' });
      return;
    }
    const res = useCoupon(owned.id);
    if (res.ok) {
      const catalogItem = catalog.find((c) => c.id === owned.couponId)!;
      setResult({
        ok: true,
        message: `Cupón validado. +${catalogItem.pointsAwarded} puntos sumados al cliente.`,
      });
    } else {
      setResult({ ok: false, message: res.reason });
    }
  };

  const handleClose = () => {
    setCode('');
    setResult(null);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.modalRoot}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={handleClose}
        />
        <View style={styles.modalCard}>
          <View style={styles.modalHeader}>
            <Ionicons name="construct" size={20} color={colors.primary} />
            <Text style={styles.modalTitle}>Modo Empleado</Text>
            <TouchableOpacity onPress={handleClose}>
              <Ionicons name="close" size={24} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          <Text style={styles.modalSubtitle}>
            Ingresa el código de 6 dígitos del cupón del cliente para validarlo.
          </Text>

          <TextInput
            style={styles.codeInput}
            value={code}
            onChangeText={(t) => {
              setCode(t.replace(/[^0-9]/g, '').slice(0, 6));
              setResult(null);
            }}
            placeholder="000000"
            placeholderTextColor={colors.textMuted}
            keyboardType="number-pad"
            maxLength={6}
            autoFocus
          />

          <TouchableOpacity
            style={[styles.validateButton, code.length !== 6 && styles.validateButtonDisabled]}
            onPress={handleValidate}
            disabled={code.length !== 6}
            activeOpacity={0.8}
          >
            <Text style={styles.validateButtonText}>Validar cupón</Text>
          </TouchableOpacity>

          {result && (
            <View style={[styles.resultBox, result.ok ? styles.resultOk : styles.resultError]}>
              <Ionicons
                name={result.ok ? 'checkmark-circle' : 'alert-circle'}
                size={22}
                color={result.ok ? colors.success : colors.primary}
              />
              <Text style={styles.resultText}>{result.message}</Text>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

function EmptyState() {
  return (
    <View style={styles.emptyState}>
      <Ionicons name="ticket-outline" size={64} color={colors.textMuted} />
      <Text style={styles.emptyTitle}>Aún no tienes cupones</Text>
      <Text style={styles.emptyDescription}>
        Compra alguno del catálogo y aparecerá aquí con su código y QR.
      </Text>
    </View>
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

  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: 'center',
    backgroundColor: '#F2F2F4',
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  tabText: { fontSize: 14, fontWeight: '600', color: colors.textMuted },
  tabTextActive: { color: colors.textInverse },

  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 32 },

  // Catalog card
  card: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  cardIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardHeaderText: { flex: 1 },
  cardName: { fontSize: 16, fontWeight: '700', color: colors.text },
  cardDescription: { fontSize: 13, color: colors.textMuted, marginTop: 2 },

  itemsBox: {
    backgroundColor: '#F7F7F8',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    gap: 6,
  },
  itemText: { fontSize: 13, color: colors.text },

  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8 },
  priceCurrent: { fontSize: 22, fontWeight: '800', color: colors.primary },
  priceOriginal: {
    fontSize: 13,
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  pointsHint: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.success,
    marginTop: 2,
  },

  buyButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  buyButtonText: { color: colors.textInverse, fontWeight: '700', fontSize: 14 },

  // Owned card
  ownedCard: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  qrSection: {
    flexDirection: 'row',
    backgroundColor: '#F7F7F8',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    gap: 14,
  },
  qrBox: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  codeSection: { flex: 1, alignItems: 'center' },
  codeLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 1,
  },
  codeValue: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: 3,
    fontVariant: ['tabular-nums'],
    marginVertical: 4,
  },
  codeHint: { fontSize: 11, color: colors.textMuted },

  // Empty state
  emptyState: { alignItems: 'center', paddingTop: 60, paddingHorizontal: 32 },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
  },
  emptyDescription: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 20,
  },

  // Demo link at footer
  demoLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 18,
    opacity: 0.7,
  },
  demoLinkText: {
    fontSize: 12,
    color: colors.textMuted,
    textDecorationLine: 'underline',
  },

  // Staff modal
  modalRoot: { flex: 1, justifyContent: 'flex-end' },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalCard: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 32,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  modalTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  modalSubtitle: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 16,
    lineHeight: 18,
  },
  codeInput: {
    backgroundColor: '#F7F7F8',
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 18,
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 8,
    color: colors.text,
    fontVariant: ['tabular-nums'],
    marginBottom: 14,
  },
  validateButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  validateButtonDisabled: { backgroundColor: colors.textMuted, opacity: 0.5 },
  validateButtonText: {
    color: colors.textInverse,
    fontWeight: '700',
    fontSize: 15,
  },
  resultBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 10,
    marginTop: 14,
    borderWidth: 1,
  },
  resultOk: { backgroundColor: '#E8F8EF', borderColor: colors.success },
  resultError: { backgroundColor: '#FDECEE', borderColor: colors.primary },
  resultText: { flex: 1, fontSize: 13, color: colors.text, lineHeight: 18 },
});