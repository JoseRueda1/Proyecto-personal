// src/navigation/RootTabs.tsx
// Barra de navegación inferior con 5 secciones:
// Inicio · Delivery · Cupones · PandaPoints · Más

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import DeliveryScreen from '../screens/DeliveryScreen';
import CuponesScreen from '../screens/CuponesScreen';
import PandaPoScreen from '../screens/PandaPoScreen';
import MasScreen from '../screens/MasScreen';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator();

// Mapeo de cada ruta al ícono que se mostrará en el tab bar.
// Usamos los íconos de Ionicons que vienen incluidos con Expo.
const ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  Inicio: 'home',
  Delivery: 'bicycle',
  Cupones: 'pricetag',
  PandaPoints: 'gift',
  Mas: 'menu',
};

export default function RootTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // cada pantalla maneja su propio header
        tabBarActiveTintColor: colors.tabActive,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarStyle: {
          backgroundColor: colors.tabBackground,
          borderTopWidth: 0,
          height: 64,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          letterSpacing: 0.2,
        },
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons
            name={ICONS[route.name]}
            size={focused ? size + 2 : size}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Delivery" component={DeliveryScreen} />
      <Tab.Screen name="Cupones" component={CuponesScreen} />
      <Tab.Screen
  name="PandaPoints"
  component={PandaPoScreen}
  options={{ tabBarLabel: 'Puntos' }}
/>
      <Tab.Screen name="Mas" component={MasScreen} options={{ tabBarLabel: 'Más' }} />
    </Tab.Navigator>
  );
}