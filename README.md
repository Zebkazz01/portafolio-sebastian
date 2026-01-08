# Portafolio Espacial 3D - Sebastian Castillo

Portafolio web inmersivo con tematica espacial, construido con React + TypeScript + Vite y efectos 3D realistas usando React Three Fiber.

## Tabla de Contenidos

- [Descripcion General](#descripcion-general)
- [Stack Tecnologico](#stack-tecnologico)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalacion](#instalacion)
- [Sistema de Animacion 3D](#sistema-de-animacion-3d)
- [Sistema de Scroll y Planetas](#sistema-de-scroll-y-planetas)
- [Internacionalizacion](#internacionalizacion)
- [Guia de Modificacion](#guia-de-modificacion)
- [Archivos Criticos](#archivos-criticos)

---

## Descripcion General

Este portafolio presenta una experiencia inmersiva de viaje espacial donde el usuario navega a traves del cosmos haciendo scroll. Cada seccion del portafolio esta acompanada por un planeta diferente que aparece y desaparece suavemente.

### Flujo Visual del Scroll

1. **0% - 20%**: Galaxia de fondo + Cohete viajando por el espacio
2. **20% - 36%**: Tierra + Luna (seccion About)
3. **32% - 48%**: Marte (seccion Experience)
4. **44% - 75%**: Jupiter (seccion Education)
5. **75% - 100%**: Saturno con anillos (secciones finales)

---

## Stack Tecnologico

### Core
| Tecnologia | Version | Proposito |
|------------|---------|-----------|
| React | 19.2.0 | Framework UI |
| TypeScript | 5.9.3 | Tipado estatico |
| Vite | 7.2.4 | Build tool |

### 3D y Graficos
| Tecnologia | Version | Proposito |
|------------|---------|-----------|
| Three.js | 0.182.0 | Motor 3D |
| @react-three/fiber | 9.4.2 | React renderer para Three.js |
| @react-three/drei | 10.7.7 | Helpers y componentes 3D |
| @react-three/postprocessing | 3.0.4 | Efectos visuales (bloom, glow) |

### UI y Animaciones
| Tecnologia | Version | Proposito |
|------------|---------|-----------|
| Framer Motion | 12.23.26 | Animaciones de UI |
| TailwindCSS | 4.1.18 | Estilos utilitarios |

### Estado e i18n
| Tecnologia | Version | Proposito |
|------------|---------|-----------|
| Zustand | 5.0.9 | Estado global |
| i18next | 25.7.3 | Internacionalizacion |
| react-i18next | 16.5.0 | Bindings React para i18n |

---

## Estructura del Proyecto

```
src/
├── components/
│   ├── 3d/                      # Componentes 3D (Three.js)
│   │   ├── SpaceScene.tsx       # Escena principal - Canvas 3D
│   │   ├── Galaxy.tsx           # Galaxia espiral de fondo
│   │   ├── Stars.tsx            # Campo de estrellas con parallax
│   │   ├── Nebula.tsx           # Nubes de gas coloridas
│   │   ├── Earth.tsx            # Planeta Tierra con atmosfera
│   │   ├── Moon.tsx             # Luna orbitando la Tierra
│   │   ├── Planets.tsx          # Marte, Jupiter, Saturno
│   │   ├── Rocket.tsx           # Cohete con llamas y humo
│   │   └── Meteorites.tsx       # Meteoritos cruzando
│   │
│   ├── sections/                # Secciones del portafolio
│   │   ├── Hero.tsx             # Seccion inicial
│   │   ├── About.tsx            # Sobre mi
│   │   ├── Experience.tsx       # Experiencia laboral
│   │   ├── Education.tsx        # Educacion
│   │   ├── Projects.tsx         # Proyectos
│   │   ├── Services.tsx         # Servicios
│   │   ├── Skills.tsx           # Habilidades tecnicas
│   │   └── Contact.tsx          # Contacto
│   │
│   └── ui/                      # Componentes de interfaz
│       ├── Navbar.tsx           # Navegacion con indicador activo
│       ├── LanguageSwitcher.tsx # Toggle ES/EN
│       ├── ProjectCard.tsx      # Tarjeta de proyecto
│       ├── TechBadge.tsx        # Badge de tecnologia
│       ├── Section.tsx          # Wrapper de seccion
│       └── CVUploader.tsx       # Descarga de CV
│
├── data/
│   ├── projects.json            # Datos de proyectos
│   ├── technologies.json        # Lista de tecnologias
│   └── translations/
│       ├── es.json              # Traducciones espanol
│       └── en.json              # Traducciones ingles
│
├── hooks/
│   ├── useScrollProgress.ts     # Trackea progreso del scroll (0-1)
│   └── useProjects.ts           # CRUD de proyectos
│
├── store/
│   └── useAppStore.ts           # Estado global (Zustand)
│
├── types/
│   └── index.ts                 # Tipos TypeScript
│
├── App.tsx                      # Componente principal
├── main.tsx                     # Entry point
├── i18n.ts                      # Configuracion i18next
└── index.css                    # Estilos globales + Tailwind
```

---

## Instalacion

```bash
# Clonar repositorio
git clone <url-del-repo>
cd portafolio_sebastian

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build de produccion
npm run build

# Preview del build
npm run preview
```

---

## Sistema de Animacion 3D

### SpaceScene.tsx
Componente contenedor que renderiza todo el universo 3D:

```tsx
<Canvas>
  <Galaxy />        {/* Fondo: espiral galactica */}
  <Stars />         {/* Estrellas con parallax */}
  <Nebula />        {/* Nubes de colores */}
  <Rocket />        {/* Cohete animado */}
  <Earth />         {/* Tierra + atmosfera */}
  <Moon />          {/* Luna orbitando */}
  <Planets />       {/* Marte, Jupiter, Saturno */}
  <Meteorites />    {/* Meteoritos aleatorios */}
</Canvas>
```

### Shaders Personalizados
Cada planeta usa `THREE.ShaderMaterial` con shaders GLSL personalizados:

- **Tierra**: Continentes procedurales, oceanos, casquetes polares
- **Marte**: Superficie oxidada, Monte Olympus, casquetes polares
- **Jupiter**: Bandas atmosfericas, Gran Mancha Roja animada
- **Saturno**: Bandas doradas + anillos con Division de Cassini

### Funcion de Easing
Todos los planetas usan easing quintico para transiciones ultra-suaves:

```typescript
// Quintic ease-in-out
const eased = t * t * t * (t * (t * 6 - 15) + 10);
```

---

## Sistema de Scroll y Planetas

### Arquitectura

1. **useScrollProgress.ts**: Hook que calcula `scrollProgress` (0.0 a 1.0)
2. **useAppStore.ts**: Almacena `scrollProgress` en estado global (Zustand)
3. **Componentes 3D**: Leen `scrollProgress` y calculan posicion/escala/visibilidad

### Timing de Planetas (valores actuales)

| Planeta | enterStart | peakStart | peakEnd | exitEnd | Seccion Asociada |
|---------|------------|-----------|---------|---------|------------------|
| Cohete | 0.00 | 0.01 | 0.16 | 0.19 | Hero |
| Tierra | 0.20 | 0.25 | 0.30 | 0.36 | About |
| Luna | 0.20 | 0.25 | 0.30 | 0.36 | About |
| Marte | 0.32 | 0.37 | 0.42 | 0.48 | Experience |
| Jupiter | 0.44 | 0.50 | 0.68 | 0.75 | Education |
| Saturno | 0.75 | 1.00 | - | - | Projects en adelante |

### Logica de Visibilidad

```typescript
// Ejemplo de calculo de visibilidad
let slideIn = 0;
let fadeOut = 0;

if (scrollProgress >= enterStart && scrollProgress < peakStart) {
  slideIn = (scrollProgress - enterStart) / (peakStart - enterStart);
} else if (scrollProgress >= peakStart && scrollProgress <= peakEnd) {
  slideIn = 1;
} else if (scrollProgress > peakEnd && scrollProgress <= exitEnd) {
  slideIn = 1;
  fadeOut = (scrollProgress - peakEnd) / (exitEnd - peakEnd);
}

// Aplicar easing quintico
const slideEased = slideIn * slideIn * slideIn * (slideIn * (slideIn * 6 - 15) + 10);
const fadeEased = fadeOut * fadeOut * fadeOut * (fadeOut * (fadeOut * 6 - 15) + 10);
```

### Espaciado de Secciones (index.css)

```css
/* Secciones intermedias */
section {
  min-height: 6000vh;
  padding: 580rem 1.5rem;
}

/* Primera seccion (Hero) - espacio para galaxia + cohete */
section:first-of-type {
  min-height: 8000vh;
  padding: 780rem 1.5rem;
}

/* Ultima seccion - Saturno visible al final */
section:last-of-type {
  min-height: 4000vh;
  padding: 380rem 1.5rem;
}
```

### Como Modificar el Timing

1. **Mas tiempo visible**: Aumentar diferencia entre `peakStart` y `peakEnd`
2. **Entrada mas lenta**: Aumentar diferencia entre `enterStart` y `peakStart`
3. **Mas scroll total**: Aumentar `min-height` en `index.css`
4. **Saturno al final**: `peakStart = 1.0` significa 100% visible al terminar scroll

---

## Internacionalizacion

### Archivos de Traduccion

- `src/data/translations/es.json` - Espanol
- `src/data/translations/en.json` - Ingles

### Estructura de Claves

```json
{
  "nav": { "about": "...", "projects": "..." },
  "hero": { "greeting": "...", "title": "...", "scrollDown": "..." },
  "about": { "title": "...", "description": "..." },
  "contact": { "getInTouch": "...", "emailLabel": "...", "phoneLabel": "...", "locationLabel": "..." }
}
```

### Uso en Componentes

```tsx
import { useTranslation } from 'react-i18next';

const Component = () => {
  const { t } = useTranslation();
  return <h1>{t('hero.title')}</h1>;
};
```

### Cambio de Idioma
El componente `LanguageSwitcher.tsx` usa Zustand para persistir el idioma seleccionado.

---

## Guia de Modificacion

### Agregar un Nuevo Planeta

1. Crear componente en `src/components/3d/NuevoPlaneta.tsx`:

```tsx
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '../../store/useAppStore';

const NuevoPlaneta = () => {
  const ref = useRef<THREE.Mesh>(null);
  const scrollProgress = useAppStore((state) => state.scrollProgress);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      // ... shader configuration
    });
  }, []);

  useFrame((state) => {
    if (ref.current) {
      // Definir timing
      const enterStart = 0.XX;
      const peakStart = 0.XX;
      const peakEnd = 0.XX;
      const exitEnd = 0.XX;

      // Calcular visibilidad y posicion...
    }
  });

  return (
    <mesh ref={ref} material={material}>
      <sphereGeometry args={[radio, 64, 64]} />
    </mesh>
  );
};
```

2. Agregar al `SpaceScene.tsx`

### Modificar Colores de Planetas

Editar los shaders en el `fragmentShader` de cada planeta:

```glsl
// Colores en formato RGB normalizado (0-1)
vec3 oceanColor = vec3(0.05, 0.15, 0.4);   // Azul oscuro
vec3 landColor = vec3(0.1, 0.4, 0.15);     // Verde
vec3 desertColor = vec3(0.6, 0.5, 0.3);    // Arena
```

### Agregar Nueva Seccion

1. Crear componente en `src/components/sections/NuevaSeccion.tsx`
2. Agregar a `App.tsx` en el orden deseado
3. Agregar ID a `useScrollProgress.ts`:
   ```typescript
   const sections = ['hero', 'about', 'experience', 'education', 'projects', 'services', 'skills', 'nuevaSeccion', 'contact'];
   ```
4. Agregar traducciones en `es.json` y `en.json`
5. Agregar link en `Navbar.tsx`

### Modificar Velocidad del Scroll

En `index.css`, ajustar `min-height` de las secciones:
- **Valores mas altos** = scroll mas lento, planetas visibles mas tiempo
- **Valores mas bajos** = scroll mas rapido

### Ajustar Posicion del Cohete

En `Rocket.tsx`, modificar lineas de posicion:

```typescript
// Posicion Y: valor negativo = mas abajo, positivo = mas arriba
groupRef.current.position.y = -20 + travelEased * 30;

// Posicion X: negativo = izquierda, positivo = derecha
groupRef.current.position.x = -10 + travelEased * 18;

// Posicion Z: negativo = mas lejos, positivo = mas cerca
groupRef.current.position.z = -50 + travelEased * 80;
```

---

## Archivos Criticos

### Para Animaciones 3D
| Archivo | Proposito | Lineas Clave |
|---------|-----------|--------------|
| `src/components/3d/SpaceScene.tsx` | Orquesta toda la escena 3D | Todo el archivo |
| `src/components/3d/Earth.tsx` | Tierra con atmosfera | Timing: 108-112, Posicion: 140-142 |
| `src/components/3d/Moon.tsx` | Luna orbitando | Timing: 88-92 |
| `src/components/3d/Planets.tsx` | Marte, Jupiter, Saturno | Marte: 110-114, Jupiter: 236-240, Saturno: 369-371 |
| `src/components/3d/Rocket.tsx` | Cohete con efectos | Timing: 147-150, Posicion: 167-170 |

### Para Espaciado y Layout
| Archivo | Proposito | Lineas Clave |
|---------|-----------|--------------|
| `src/index.css` | min-height de secciones | 188-219 |
| `src/hooks/useScrollProgress.ts` | Calculo de progreso del scroll | Todo el archivo |
| `src/store/useAppStore.ts` | Estado global (scrollProgress, language) | Todo el archivo |

### Para Contenido
| Archivo | Proposito |
|---------|-----------|
| `src/data/translations/es.json` | Textos en espanol |
| `src/data/translations/en.json` | Textos en ingles |
| `src/data/projects.json` | Datos de proyectos |
| `src/data/technologies.json` | Lista de tecnologias |

---

## Tips para Futuras Modificaciones

1. **Siempre testear con scroll real**: Los cambios en timing pueden verse diferentes al hacer scroll real vs. valores estaticos

2. **Mantener proporciones**: Si cambias el `min-height` de una seccion, considera ajustar el timing de los planetas proporcionalmente

3. **Shaders son sensibles**: Un error de sintaxis en GLSL rompe todo el planeta. Usar console para debug

4. **Performance**: Los shaders complejos pueden afectar FPS. Testear en dispositivos de gama baja

5. **Mobile**: El scroll tactil se comporta diferente. Testear en dispositivos reales

6. **Easing quintico**: La formula `t * t * t * (t * (t * 6 - 15) + 10)` crea transiciones muy suaves. Usarla consistentemente

7. **Saturno al final**: Para que Saturno este 100% visible al final, usar `peakStart = 1.0`

---

## Comandos Utiles

```bash
# Desarrollo
npm run dev

# Build de produccion
npm run build

# Verificar errores de tipado y lint
npm run lint

# Preview del build de produccion
npm run preview
```

---

## Autor

Sebastian Castillo - Full Stack Developer

---

## Licencia

Proyecto privado
