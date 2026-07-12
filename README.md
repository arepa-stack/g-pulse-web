# G-Pulse — Landing 3D

Landing page moderna e interactiva para la app fitness **G-Pulse**. Muestra un
gimnasio rooftop futurista con estética cyberpunk que el usuario puede explorar
en 3D: rotar la cámara, hacer zoom y seleccionar máquinas para ver información.

**Live Strong. Live Future.**

## Stack

- React + Vite + TypeScript
- Three.js · React Three Fiber · @react-three/drei
- Framer Motion (animaciones de UI)
- Zustand (estado global)
- Lucide React (iconos)
- CSS Modules + variables CSS (sin dependencias de estilos externas)

## Requisitos

- Node.js 18+ (probado en Node 24)
- npm 9+

## Instalación y ejecución

```bash
npm install     # instala dependencias
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # compila TypeScript + build de producción en /dist
npm run preview  # sirve el build de producción localmente
```

## Modelos 3D

Los `.glb` viven en `public/models/`. La configuración de CADA modelo está
centralizada en **`src/config/models.ts`** — no hay posiciones ni escalas
dispersas por los componentes.

Archivos usados actualmente:

| Config (`public/models/`)   | Estado        | Máquina                  |
| --------------------------- | ------------- | ------------------------ |
| `caminadora.glb`            | ✅ presente   | Caminadora (Cardio)      |
| `lat-pulldown.glb`          | ✅ presente   | Máquina de Jalón         |
| `rack-mancuernas.glb`       | ✅ presente   | Rack de Mancuernas       |
| `silla.glb`                 | ✅ presente   | Silla de Entrenamiento   |
| `banco.glb`                 | ✅ presente   | Banco de Entrenamiento   |
| `discos.glb`                | ✅ presente   | Discos                   |
| `espejos.glb`               | ✅ presente   | Espejos (pared)          |
| `maquina-poleas.glb`        | ⛔ falta      | Máquina de Poleas        |

> El piso, las barandas y el letrero **G-PULSE** se generan de forma
> procedural (no requieren `.glb`), por eso no aparecen `piso-rooftop.glb`,
> `baranda.glb` ni `letrero-gpulse.glb`.

### Modelos faltantes

Si un `.glb` no existe, la app **sigue funcionando**: se muestra un
*placeholder* de neón con la etiqueta "Próximamente" en su lugar y el modelo
faltante queda registrado con `path: null` en `src/config/models.ts`.

## Cómo agregar un modelo nuevo

1. Copia el archivo a `public/models/mi-modelo.glb`.
2. Añade una entrada en `src/config/models.ts`:

```ts
{
  id: 'mi-modelo',                 // único; se usa para el raycast
  name: 'Mi Máquina G-Pulse',
  category: 'Fuerza',
  muscles: ['Pecho', 'Tríceps'],
  description: '…',
  level: 'Intermedio',
  calories: 300,
  path: '/models/mi-modelo.glb',   // null si aún no tienes el archivo
  position: [0, 0, 0],
  rotation: [0, 0, 0],
  scale: 2,                         // ≈ altura deseada en metros (ver abajo)
  focus: { position: [0, 2, 6], target: [0, 1, 0] },
}
```

## Cómo cambiar posición, escala y rotación

Todo en `src/config/models.ts`, por modelo:

- **`position: [x, y, z]`** — mueve el modelo sobre el piso (`y = 0` es el suelo).
- **`rotation: [x, y, z]`** — en **radianes** (`Math.PI` = 180°).
- **`scale`** — NO es un multiplicador crudo. Cada modelo se **auto-normaliza**
  para que su altura real sea `scale` unidades del mundo (≈ metros). Así los
  GLB generados por IA, aunque vengan a tamaños distintos, quedan proporcionados.
  Sube/baja este número para agrandar o achicar.
- **`focus`** — a dónde vuela la cámara al seleccionar la máquina.

### Modo desarrollo 3D

En `src/config/scene.ts`:

```ts
export const DEBUG_3D = true   // activa grid, ejes y lectura de transform por modelo
```

Con `DEBUG_3D = true` verás una rejilla, y sobre cada modelo su `id`, posición,
rotación y escala actuales para ajustarlos con facilidad.

## Rutinas guiadas

Además de explorar libremente, el usuario puede seguir una rutina completa
dentro de la escena 3D: botón **"Rutinas guiadas"** (esquina superior
izquierda) abre un selector, y al elegir una la cámara recorre cada estación
en orden mostrando series, descanso, músculos trabajados y un consejo de
ejecución.

- Rutinas en **`src/data/routines.ts`** — cada paso apunta a un `modelId` de
  `models.ts`; avanzar de paso selecciona ese modelo y `CameraController` hace
  el vuelo de cámara automáticamente.
- Estado del recorrido (`activeRoutineId`, `routineStep`) vive en el store
  Zustand (`src/store/useStore.ts`).
- UI en `src/components/ui/RoutinePanel.tsx`.
- Incluye 2 rutinas de muestra (básica de pecho/espalda/bíceps y una express
  de 3 series para principiantes) — la app G-Pulse permite armar cientos más.

## Estructura

```
src/
  components/
    layout/     Header, Footer
    ui/         Button, InfoPanel, ViewerControls, StatCounter, FeatureCard, WebGLFallback
    sections/   Hero, Experience, Features, Stats, CTA
    three/      GymScene, GymModel, GymLights, CameraController, ModelSelector, LoadingScreen, SceneEnvironment
  config/       models.ts (modelos), scene.ts (cámara/fog/debug), app.ts
  hooks/        useScrollHeader, useCountUp, useAmbientSound
  pages/        Landing.tsx
  store/        useStore.ts (Zustand)
  types/        index.ts
  utils/        webgl.ts
```

## Rendimiento y responsive

- `dpr` limitado y sombras/antialias reducidos en calidad baja.
- **Auto-detección** de dispositivos de baja potencia (`isLowPowerDevice`) que
  baja la calidad automáticamente (menos efectos, sin reflejos avanzados).
- `useGLTF.preload` precarga solo los modelos con asset real.
- Un único `<Canvas>` para no duplicar memoria de GPU.
- Layout responsive: en móvil el panel de info es una hoja inferior (bottom
  sheet), header compacto con menú, y botón de pantalla completa.

## Accesibilidad

- Contraste alto, `:focus-visible`, `aria-label` en controles y navegación.
- Respeta `prefers-reduced-motion` (desactiva pulsos de luz, cuenta atrás
  instantánea, transiciones mínimas).
- **Fallback sin WebGL**: si el dispositivo no soporta WebGL o la escena falla,
  se muestra un póster estático del gimnasio + un aviso discreto, y el resto de
  la landing funciona con normalidad.

## Variables de entorno

Opcional. Copia `.env.example` a `.env`:

```
VITE_APP_DOWNLOAD_URL=https://tu-enlace-de-descarga
```

Si no se define, los botones de descarga apuntan al ancla `#descargar`.

## Despliegue

### Vercel

1. Importa este repo en Vercel.
2. Framework preset: **Vite**. Build: `npm run build`. Output: `dist`.
3. (Opcional) añade `VITE_APP_DOWNLOAD_URL` en Environment Variables.

### Netlify

1. Nuevo sitio desde Git.
2. **Build command**: `npm run build` · **Publish directory**: `dist`.
3. (Opcional) añade `VITE_APP_DOWNLOAD_URL` en Site settings → Environment.

> Los `.glb` son grandes (~20 MB c/u). Para producción conviene comprimirlos con
> Draco/Meshopt (`gltf-transform optimize entrada.glb salida.glb`) y volver a
> apuntar `path` en `models.ts`. No es obligatorio para que funcione.

## Todo local

No se usa ningún servicio de pago. El sonido ambiental se sintetiza con la Web
Audio API (sin archivos de audio) y las luces/reflejos son shaders, así que la
experiencia funciona completamente offline.
