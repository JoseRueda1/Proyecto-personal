// src/theme/colors.ts
// Paleta centralizada. Cualquier pantalla importa de aquí en vez de
// escribir colores sueltos, así un cambio se propaga automáticamente.

export const colors = {
  // Marca
  primary: '#D60023',        // Rojo Panda Express oficial
  primaryDark: '#A0001A',    // Versión oscura para hover/pressed
  accent: '#F5C518',         // Dorado cálido para sellos y recompensas premium

  // Fondos
  background: '#FFFFFF',     // Blanco principal
  surface: '#FAF7F2',        // Crema suave para zonas grandes
  headerDark: '#111111',     // Casi negro para headers internos

  // Texto
  text: '#1A1A1A',           // Texto principal
  textMuted: '#6B6B6B',      // Texto secundario / hints
  textInverse: '#FFFFFF',    // Texto sobre fondos rojo o negro

  // Bordes y separadores
  border: '#EAEAEA',

  // Estados de feedback
  success: '#2E7D32',
  danger: '#D32F2F',
  warning: '#ED6C02',

  // Navegación inferior (tab bar)
  tabBackground: '#111111',  // Fondo negro como en tu prototipo
  tabActive: '#D60023',      // Ícono+texto rojo cuando seleccionado
  tabInactive: '#888888',    // Gris medio para los otros
} as const;

export type ColorKey = keyof typeof colors;