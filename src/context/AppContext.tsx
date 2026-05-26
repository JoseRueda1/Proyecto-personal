// src/context/AppContext.tsx
// Estado global de la app: puntos del usuario y cupones comprados.
// Cualquier pantalla puede leer/modificar este estado usando el hook useApp().

import { createContext, useContext, useState, ReactNode } from 'react';
import { COUPONS_CATALOG, CatalogCoupon } from '../data/couponsCatalog';
import { REWARDS_CATALOG, Reward } from '../data/rewardsCatalog';

const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 horas

export type OwnedCoupon = {
  id: string;             // ID único de este cupón comprado
  couponId: string;       // ID del cupón del catálogo
  code: string;           // Código único de 6 dígitos
  purchasedAt: Date;
  lastUsedAt: Date | null; // null = nunca usado
};

export type CouponStatus =
  | { status: 'ready' }
  | { status: 'cooldown'; remainingMs: number };

type AppContextValue = {
  points: number;
  ownedCoupons: OwnedCoupon[];
  catalog: CatalogCoupon[];
  rewards: Reward[];
  buyCoupon: (couponId: string) => void;
  useCoupon: (ownedCouponId: string) => { ok: true } | { ok: false; reason: string };
  redeemReward: (reward: Reward) => { ok: true } | { ok: false; reason: string };
  getCouponStatus: (owned: OwnedCoupon) => CouponStatus;
};

const AppContext = createContext<AppContextValue | null>(null);

function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [points, setPoints] = useState(0);
  const [ownedCoupons, setOwnedCoupons] = useState<OwnedCoupon[]>([]);

  const buyCoupon = (couponId: string) => {
    const newOwned: OwnedCoupon = {
      id: `${couponId}-${Date.now()}`,
      couponId,
      code: generateCode(),
      purchasedAt: new Date(),
      lastUsedAt: null,
    };
    setOwnedCoupons((prev) => [...prev, newOwned]);
  };

  const getCouponStatus: AppContextValue['getCouponStatus'] = (owned) => {
    if (!owned.lastUsedAt) return { status: 'ready' };
    const elapsed = Date.now() - owned.lastUsedAt.getTime();
    if (elapsed >= COOLDOWN_MS) return { status: 'ready' };
    return { status: 'cooldown', remainingMs: COOLDOWN_MS - elapsed };
  };

  const useCoupon: AppContextValue['useCoupon'] = (ownedCouponId) => {
    const owned = ownedCoupons.find((c) => c.id === ownedCouponId);
    if (!owned) return { ok: false, reason: 'Cupón no encontrado' };

    const status = getCouponStatus(owned);
    if (status.status === 'cooldown') {
      const hoursLeft = Math.ceil(status.remainingMs / (60 * 60 * 1000));
      return { ok: false, reason: `Este cupón vuelve a estar disponible en ${hoursLeft}h.` };
    }

    const catalogItem = COUPONS_CATALOG.find((c) => c.id === owned.couponId);
    if (!catalogItem) return { ok: false, reason: 'Cupón inválido' };

    setOwnedCoupons((prev) =>
      prev.map((c) => (c.id === ownedCouponId ? { ...c, lastUsedAt: new Date() } : c))
    );
    setPoints((prev) => prev + catalogItem.pointsAwarded);
    return { ok: true };
  };

  const redeemReward: AppContextValue['redeemReward'] = (reward) => {
    if (points < reward.cost) {
      return { ok: false, reason: `Te faltan ${reward.cost - points} puntos.` };
    }
    setPoints((prev) => prev - reward.cost);
    return { ok: true };
  };

  return (
    <AppContext.Provider
      value={{
        points,
        ownedCoupons,
        catalog: COUPONS_CATALOG,
        rewards: REWARDS_CATALOG,
        buyCoupon,
        useCoupon,
        redeemReward,
        getCouponStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp debe usarse dentro de AppProvider');
  return ctx;
}