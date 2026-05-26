# PROJECT_STATE

> Archivo de estado del proyecto. Si el chat se corrompe, abrir una nueva sesión y pedir a Claude: **"lee PROJECT_STATE.md"**.
> Última actualización: 2026-05-26

---

## 1. Objetivo del proyecto

Desarrollar una **app móvil real** (publicable en App Store y Play Store) para el restaurante **Panda Express**, recreando desde cero con código real una app que el usuario ya prototipó en la plataforma no-code **Scoreapps**. El objetivo es comparar la calidad del producto final hecho con código vs. el generado por una plantilla no-code.

Meta de largo plazo: cuando la app esté lista, llevarla a producción con base de datos en la nube, servidores reales y publicación en las tiendas.

---

## 2. Stack tecnológico decidido

| Capa | Herramienta | Estado |
|------|-------------|--------|
| Framework móvil | **React Native + Expo** | Pendiente de instalar |
| Lenguaje | **TypeScript** | Pendiente de configurar |
| Base de datos local (dev) | **SQLite** (`expo-sqlite`) | Pendiente |
| Editor | **VS Code** | Ya instalado |
| Control de versiones | **Git + GitHub** | Repo creado |
| Testing en dispositivo | **Expo Go** (app del celular) | Pendiente de instalar |
| Backend futuro (producción) | **Supabase** (PostgreSQL + Auth + Storage) | Para más adelante |
| Notificaciones push (futuro) | **Expo Notifications** | Para más adelante |
| Pagos (futuro) | **Stripe** | Para más adelante |
| Build/distribución (futuro) | **EAS Build** | Para más adelante |

Razones de las decisiones clave:
- **React Native + Expo** sobre Flutter: JavaScript/TypeScript es más universal que Dart, mejor para iniciar.
- **SQLite local → Supabase en producción**: ambos hablan SQL, así la migración es mínima cambiando solo la capa de acceso a datos.

---

## 3. Estructura de la app a recrear

Pantallas observadas en el prototipo de Scoreapps:

1. **Inicio** – Logo de Panda Express en rojo a pantalla completa.
2. **Login / Registro** – Email + contraseña.
3. **Navegación inferior**: Iniciar sesión / Delivery / Cupones / PandaPo / Más.
4. **Delivery (menú)**:
   - Categorías: Especialidades, Complementos, Postres.
   - Listado de platillos con precio.
   - Detalle del producto: formato (Plato/Bowl), guarniciones, cantidad.
   - Carrito con notas adicionales y código de descuento.
   - Checkout: datos del comprador, dirección facturación/envío, fecha de cumpleaños.
   - Método de entrega: en tienda / recoger en tienda, con hora.
   - Método de pago.
   - Revisión final + historial de pedidos.
5. **Cupones**: lista de promociones con detalle y botón "Usar esta promoción".
6. **PandaPo (sistema de puntos – invento del usuario)**:
   - Tarjeta circular tipo "loyalty card" con 7 espacios para sellos.
   - Contador central de puntos.
   - Botón "SELLAR" → pantalla con dos métodos:
     - **Sellar por QR**: escanea código del establecimiento.
     - **Sellar por código secreto**: ingreso de 4 dígitos.
   - Confirmación "Puntos validado con éxito" + actualización del contador.
   - Lista de recompensas canjeables:
     - Bebida Pequeña Gratis
     - Postre Gratis
     - 10% de Descuento
     - Combo Clásico + 1 Guarnición
     - 2x1 Martes Panda
     - Producto Sorpresa
7. **Más** – Historial de pedidos, configuración.

### Problemas detectados en el prototipo de Scoreapps (a mejorar en la versión real)
- Estética plana, "de plantilla", bloques rojo + negro rígidos.
- Tipografía monoespaciada (tipo terminal) — no encaja con marca de restaurante.
- Textos cortados en pestañas: "Mi…", "En…", "Historial de pedi…".
- Formulario de checkout muy largo y con campos confusos (VAT/NIF/CC/RUC juntos).
- Fecha de cumpleaños obligatoria para pedir comida.
- Logo central de inicio sin CTA claro.
- Categorías sin imágenes de producto, solo iconos genéricos blanco/negro.

### Prioridades de cambio definidas por el usuario
- **Cupones**: cambio más importante. Mejorar diseño visual (cards, fotos, jerarquía), tipos/categorías de cupones, y mecánica de canje.

---

## 4. Estado actual del proyecto

- ✅ Repositorio Git inicializado: `joserueda1/proyecto-personal`.
- ✅ Rama de trabajo activa: `claude/optimistic-turing-PbkU0`.
- ✅ Decisiones de stack tomadas.
- ✅ Este archivo PROJECT_STATE.md creado.
- ⏳ **EN CURSO**: usuario instalando herramientas en su PC (Windows).
- ❌ Proyecto Expo aún no inicializado.
- ❌ Sin pantallas, sin código de la app.

### Herramientas que el usuario debe instalar (esenciales)
1. **Node.js LTS** – descargado desde https://nodejs.org → Windows Installer (.msi)
2. **Git** – https://git-scm.com/download/win (verificar si ya está)
3. **Expo Go** en el celular – Play Store / App Store
4. **Extensiones de VS Code**: ES7+ React snippets, Prettier, ESLint, React Native Tools, Auto Rename Tag, SQLite Viewer

### Herramientas opcionales (más adelante)
- DB Browser for SQLite – https://sqlitebrowser.org
- Cuenta gratis en https://expo.dev

### NO instalar todavía
- Android Studio (pesado, no necesario al inicio con Expo Go)
- Xcode (solo Mac, ignorar)
- Docker / PostgreSQL local

---

## 5. Próximos pasos (orden propuesto)

1. Confirmar que Node.js, Git y Expo Go están instalados.
2. Inicializar proyecto Expo + TypeScript dentro de `/home/user/Proyecto-personal`.
3. Configurar estructura de carpetas (screens, components, navigation, theme, data).
4. Definir paleta de colores y tipografía del nuevo diseño (más cálido que el rojo plano).
5. Implementar navegación (bottom tabs).
6. Construir primera pantalla: **PandaPo** o **Cupones** (a decidir con el usuario).
7. Conectar con SQLite local + datos mock de platillos y cupones.
8. Iterar pantalla por pantalla.

---

## 6. Decisiones pendientes

- ¿Por cuál pantalla empezar a construir primero? (PandaPo / Home+Delivery / Cupones / Setup completo)
- Paleta de colores definitiva (mantener rojo Panda Express o reinterpretar).
- Sistema de íconos (Lucide / Phosphor / Material).
- Librería UI (NativeWind/Tailwind, Tamagui, React Native Paper, o componentes propios).

---

## 7. Convenciones de trabajo

- **Rama de desarrollo**: `claude/optimistic-turing-PbkU0` (siempre commitear y pushear aquí).
- **Idioma de comunicación**: español.
- **Mecanismo de recuperación**: este archivo `PROJECT_STATE.md` se actualiza después de cada bloque importante de trabajo y se commitea. Si el chat se corrompe, retomar pidiendo "lee PROJECT_STATE.md".
