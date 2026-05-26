// src/data/couponsCatalog.ts
// Catálogo estático de cupones disponibles para comprar.
// Cada cupón es un "pase reutilizable": comprás una vez, lo usás cada 24h.

import { Ionicons } from '@expo/vector-icons';

type IconName = keyof typeof Ionicons.glyphMap;

export type CatalogCoupon = {
  id: string;
  name: string;
  description: string;
  items: string[];        // Productos incluidos en el combo
  price: number;          // Precio del pase (MXN)
  originalPrice: number;  // Precio sin descuento (referencia)
  pointsAwarded: number;  // Puntos que da cada uso
  icon: IconName;
};

export const COUPONS_CATALOG: CatalogCoupon[] = [
  {
    id: 'combo-familiar',
    name: 'Combo Familiar Panda',
    description: 'Perfecto para compartir en familia',
    items: ['1 Especialidad', '2 Acompañamientos', '1 Postre', '2 Bebidas'],
    price: 250,
    originalPrice: 320,
    pointsAwarded: 10,
    icon: 'people-outline',
  },
  {
    id: 'combo-clasico',
    name: 'Combo Clásico Bowl',
    description: 'El bowl tradicional con tu acompañamiento favorito',
    items: ['1 Especialidad Bowl', '1 Acompañamiento', '1 Bebida'],
    price: 110,
    originalPrice: 140,
    pointsAwarded: 4,
    icon: 'cafe-outline',
  },
  {
    id: 'pareja-panda',
    name: 'Combo Pareja',
    description: 'Dos personas, dos platos, una experiencia',
    items: ['2 Especialidades Plato', '2 Acompañamientos', '2 Bebidas'],
    price: 195,
    originalPrice: 240,
    pointsAwarded: 7,
    icon: 'heart-outline',
  },
  {
    id: 'dulce-final',
    name: 'Dulce Final',
    description: 'Para terminar tu visita',
    items: ['1 Postre', '1 Bebida'],
    price: 55,
    originalPrice: 75,
    pointsAwarded: 2,
    icon: 'ice-cream-outline',
  },
  {
    id: 'lunch-rapido',
    name: 'Lunch Rápido',
    description: 'Para el medio día sin gastar mucho',
    items: ['1 Bowl pequeño', '1 Bebida'],
    price: 85,
    originalPrice: 105,
    pointsAwarded: 3,
    icon: 'flash-outline',
  },
  {
    id: 'mega-panda',
    name: 'Mega Panda',
    description: 'El más completo, máximo ahorro y puntos',
    items: ['2 Especialidades', '3 Acompañamientos', '2 Postres', '3 Bebidas'],
    price: 380,
    originalPrice: 480,
    pointsAwarded: 15,
    icon: 'trophy-outline',
  },
];