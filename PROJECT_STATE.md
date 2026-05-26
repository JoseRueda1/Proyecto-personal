# PROJECT_STATE

> Archivo de estado del proyecto. Si el chat se corrompe, abrir una nueva sesión y pedir a Claude: **"lee PROJECT_STATE.md"**.
> Última actualización: 2026-05-26

---

## 1. Objetivo del proyecto

App móvil real (publicable en App Store y Play Store) para **Panda Express**, recreando con código real una app que el usuario prototipó en la plataforma no-code **Scoreapps**. Meta: comparar calidad final código vs. no-code y llevar a producción con backend en la nube.

---

## 2. Stack tecnológico

| Capa | Herramienta | Estado |
|------|-------------|--------|
| Framework móvil | **React Native + Expo** (SDK 54) | ✅ Instalado |
| Lenguaje | **TypeScript** | ✅ Configurado |
| Navegación | **React Navigation v7** (bottom tabs) | ✅ Funcionando |
| Íconos | **@expo/vector-icons** (Ionicons) | ✅ Instalado |
| Editor | **VS Code** | ✅ |
| Control de versiones | **Git + GitHub** | ✅ Rama `claude/optimistic-turing-PbkU0` |
| Testing en dispositivo | **Expo Go** | ✅ Funcionando vía QR + WiFi local |
| Base de datos local (dev) | **SQLite** (`expo-sqlite`) | ⏳ Pendiente, cuando se necesite |
| Backend producción | **Supabase** (PostgreSQL + Auth + Storage) | ⏳ Para más adelante |
| Notificaciones push | **Expo Notifications** | ⏳ Para más adelante |
| Pagos | **Stripe** | ⏳ Para más adelante |
| Build/distribución | **EAS Build** | ⏳ Para más adelante |

---

## 3. Estructura de archivos actual
src/
theme/
colors.ts → Paleta centralizada (rojo Panda #D60023, dorado #F5C518, etc.)
screens/
HomeScreen.tsx → Pantalla inicio (logo PANDA EXPRESS sobre rojo)
DeliveryScreen.tsx → Placeholder "En construcción"
CuponesScreen.tsx → Placeholder "En construcción"
PandaPoScreen.tsx → Placeholder "En construcción"
MasScreen.tsx → Placeholder "En construcción"
navigation/
RootTabs.tsx → Bottom tabs: Inicio · Delivery · Cupones · Puntos · Más
App.tsx → SafeAreaProvider + NavigationContainer + RootTabs
---
## 4. Paleta y diseño decididos
- **primary**: `#D60023` (rojo Panda Express oficial, más profundo que el de Scoreapps)
- **primaryDark**: `#A0001A`
- **accent**: `#F5C518` (dorado cálido, para sellos y recompensas premium en PandaPoints)
- **headerDark**: `#111111` (headers internos)
- **surface**: `#FAF7F2` (crema para zonas amplias)
- **tabBackground**: `#111111` con activo en rojo
Pendiente de decidir:
- Tipografía custom (Poppins / Inter) — por ahora usa la del sistema.
- Si añadimos un splash screen personalizado.
---
## 5. App a recrear — pantallas observadas en Scoreapps
1. Inicio (logo a pantalla completa)
2. Login / Registro
3. Delivery: categorías → productos → detalle → carrito → checkout → método entrega/pago → revisión
4. Cupones: lista de promociones con detalle y canje
5. PandaPoints (sistema de puntos – invento del usuario):
   - Tarjeta circular con 7 espacios de sellos
   - Botón SELLAR → QR o código secreto de 4 dígitos
   - Lista de recompensas: Bebida pequeña, Postre, 10% desc., Combo+guarnición, 2x1 Martes Panda, Producto Sorpresa
6. Más: historial de pedidos, configuración, login
**Prioridad de mejora respecto a Scoreapps**: Cupones (rediseño completo). PandaPoints es el feature más diferenciador.
---
## 6. Estado actual del proyecto
- ✅ Repositorio Git con remoto en GitHub.
- ✅ Scaffold completo de Expo + TypeScript + React Navigation.
- ✅ Paleta de colores aplicada y centralizada.
- ✅ Navegación inferior funcionando con 5 tabs e íconos Ionicons.
- ✅ Home screen con logo PANDA EXPRESS sobre rojo + tagline.
- ✅ 4 pantallas placeholder con header negro consistente.
- ✅ App corre en celular vía Expo Go (probado).
- ⏳ Contenido real de cada pantalla — pendiente.
---
## 7. Próximos pasos
1. **Elegir primera pantalla real a construir** (decisión pendiente):
   - (a) **PandaPoints**: feature más diferenciador, visual, motivante. Bueno para destacar.
   - (b) **Cupones**: el que el usuario más quería mejorar respecto a Scoreapps.
   - (c) **Delivery (menú)**: el core de la app, pero el más grande.
   - (d) **Home enriquecido**: añadir CTAs y accesos rápidos a la pantalla de inicio.
2. Considerar instalar tipografía custom (`@expo-google-fonts/poppins`) para identidad.
3. Decidir si necesitamos un componente compartido `<ScreenHeader />` (los 4 placeholders ya repiten el patrón).
4. Cuando empecemos a manejar datos: configurar `expo-sqlite` con datos mock.
---
## 8. Convenciones de trabajo
- **Rama de desarrollo**: `claude/optimistic-turing-PbkU0` (siempre commitear y pushear aquí).
- **Idioma de comunicación**: español.
- **Workflow**: Claude da comandos de terminal (PowerShell) para crear archivos y contenido a pegar en VS Code. El usuario corre todos los `git`, `npm` y `expo` en su PC local.
- **Hot reload**: Expo detecta cambios al guardar (Ctrl+S) y recarga el celular en ~1 segundo.
- **Recuperación**: este archivo se actualiza después de cada hito y se commitea.