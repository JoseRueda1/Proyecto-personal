// src/data/rewardsCatalog.ts
// Catálogo de recompensas que el usuario puede canjear con sus puntos.

import { Ionicons } from '@expo/vector-icons';

type IconName = keyof typeof Ionicons.glyphMap;

export type Reward = {
  id: string;
  icon: IconName;
  title: string;
  cost: number;
};

export const REWARDS_CATALOG: Reward[] = [
  { id: 'r1', icon: 'wine-outline', title: 'Bebida pequeña gratis', cost: 5 },
  { id: 'r2', icon: 'ice-cream-outline', title: 'Postre gratis', cost: 7 },
  { id: 'r3', icon: 'pricetag-outline', title: '10% de descuento', cost: 4 },
  { id: 'r4', icon: 'restaurant-outline', title: 'Combo clásico + 1 guarnición', cost: 10 },
  { id: 'r5', icon: 'calendar-outline', title: '2x1 Martes Panda', cost: 6 },
  { id: 'r6', icon: 'gift-outline', title: 'Producto sorpresa', cost: 8 },
];