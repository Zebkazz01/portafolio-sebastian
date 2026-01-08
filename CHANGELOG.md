# Changelog

Todos los cambios notables en este proyecto seran documentados en este archivo.

El formato esta basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

---

## [1.0.0] - 2024-12-20

### Resumen
Version inicial del portafolio espacial 3D con sistema completo de animaciones de planetas basadas en scroll, internacionalizacion ES/EN, y efectos visuales inmersivos.

---

### Agregado

#### Sistema 3D Espacial
- **SpaceScene.tsx**: Canvas principal de Three.js con toda la escena espacial
- **Galaxy.tsx**: Galaxia espiral de fondo con rotacion continua
- **Stars.tsx**: Campo de estrellas con efecto parallax en multiples capas
- **Nebula.tsx**: Nubes de gas coloridas con shaders personalizados
- **Meteorites.tsx**: Meteoritos con trayectorias aleatorias

#### Planetas con Shaders Procedurales
- **Earth.tsx**: Tierra con continentes procedurales, oceanos, casquetes polares y atmosfera con glow
- **Moon.tsx**: Luna con crateres procedurales orbitando la Tierra
- **Planets.tsx**: Contiene Marte, Jupiter y Saturno
  - **Marte**: Superficie oxidada, Monte Olympus, casquetes polares
  - **Jupiter**: Bandas atmosfericas animadas, Gran Mancha Roja con efecto swirl
  - **Saturno**: Planeta dorado con anillos detallados incluyendo Division de Cassini

#### Cohete Detallado
- **Rocket.tsx**: Cohete realista con:
  - Cuerpo metalico con anillos de detalle
  - Cono rojo con punta blanca
  - 3 ventanas con marcos y efecto glow
  - 4 aletas aerodinamicas
  - Seccion de motor con campana
  - Particulas de llamas (FlameParticles)
  - Estela de humo (SmokeTrail)
  - Iluminacion puntual para efecto de fuego

#### Sistema de Scroll
- **useScrollProgress.ts**: Hook que trackea el progreso del scroll (0.0 a 1.0)
- **useAppStore.ts**: Estado global con Zustand para scrollProgress y language
- Easing quintico para transiciones ultra-suaves: `t * t * t * (t * (t * 6 - 15) + 10)`

#### Secciones del Portafolio
- **Hero.tsx**: Seccion inicial con mensaje de bienvenida y indicador de scroll
- **About.tsx**: Informacion personal
- **Experience.tsx**: Experiencia laboral
- **Education.tsx**: Formacion academica con grid responsive
- **Projects.tsx**: Galeria de proyectos
- **Services.tsx**: Servicios ofrecidos
- **Skills.tsx**: Habilidades tecnicas por categoria
- **Contact.tsx**: Informacion de contacto

#### Componentes UI
- **Navbar.tsx**: Navegacion fija con indicador de seccion activa (underline animado)
- **LanguageSwitcher.tsx**: Toggle ES/EN con persistencia
- **ProjectCard.tsx**: Tarjeta de proyecto con hover effects
- **TechBadge.tsx**: Badge de tecnologia con tooltip
- **Section.tsx**: Wrapper generico de seccion
- **CVUploader.tsx**: Boton de descarga de CV

#### Internacionalizacion
- **i18n.ts**: Configuracion de i18next con deteccion automatica de idioma
- **es.json**: Traducciones completas en espanol
- **en.json**: Traducciones completas en ingles
- Soporte para todas las secciones incluyendo Contact (getInTouch, emailLabel, phoneLabel, locationLabel)

#### Estilos
- **index.css**: Estilos globales con:
  - Variables CSS para colores espaciales
  - Clases glass y glass-dark para efectos de vidrio
  - Gradientes de texto animados (ai-gradient-text)
  - Bordes animados estilo AI
  - Scrollbar personalizado
  - Espaciado de secciones configurable

---

### Configuracion de Timing de Planetas

#### Valores Finales
| Elemento | enterStart | peakStart | peakEnd | exitEnd |
|----------|------------|-----------|---------|---------|
| Cohete | 0.00 | 0.01 | 0.16 | 0.19 |
| Tierra | 0.20 | 0.25 | 0.30 | 0.36 |
| Luna | 0.20 | 0.25 | 0.30 | 0.36 |
| Marte | 0.32 | 0.37 | 0.42 | 0.48 |
| Jupiter | 0.44 | 0.50 | 0.68 | 0.75 |
| Saturno | 0.75 | 1.00 | - | - |

#### Espaciado de Secciones
```css
section { min-height: 6000vh; }
section:first-of-type { min-height: 8000vh; }
section:last-of-type { min-height: 4000vh; }
```

---

### Historial de Ajustes

#### Parallax de Estrellas
- Aumentado el movimiento del efecto parallax en Stars.tsx para mayor sensacion de profundidad

#### Animacion de Jupiter
- **Problema**: Al acercarse Jupiter, se sentia como estar dentro del planeta
- **Solucion**: Movido mas hacia atras (z=-70) y ajustada la escala de entrada

#### Transparencia de Marte
- **Problema**: Marte se volvia transparente al agrandarse
- **Solucion**: Cambiada la formula de escala para no crecer durante la entrada, solo en salida

#### Navegacion Activa
- **Problema**: La pestana "Servicios" no se subrayaba al estar activa
- **Solucion**: Agregado 'services' al array de secciones en useScrollProgress.ts

#### Seccion de Educacion Responsive
- **Problema**: El grid no se adaptaba a pantallas pequenas
- **Solucion**: Agregada clase CSS para grid responsive (1 columna en mobile, 2 en desktop)

#### Cohete Realista
- **Version inicial**: Cohete simple geometrico
- **Version final**: Cohete detallado con:
  - Multiples ventanas con marcos y glow
  - 4 aletas aerodinamicas con puntas
  - Sistema de particulas para llamas
  - Estela de humo animada
  - Cuerpo con anillos de detalle

#### Posicion del Cohete
- **Iteracion 1**: Y=-75 (demasiado bajo, no visible)
- **Iteracion 2**: Y=-35 (mejor, pero aun bajo)
- **Iteracion 3**: Y=-20 (posicion final, centrado y visible)

#### Espaciado Entre Secciones
- **Iteracion 1**: 1800vh por seccion (muy rapido)
- **Iteracion 2**: 3000vh por seccion (mejor)
- **Iteracion 3**: 6000vh por seccion (tiempo suficiente para apreciar planetas)

#### Primera Seccion (Hero)
- **Iteracion 1**: 1800vh (sin efecto de profundidad)
- **Iteracion 2**: 5000vh (mejor separacion galaxia-planetas)
- **Iteracion 3**: 8000vh (espacio epico para cohete viajando)
- **Iteracion 4**: 40000vh (excesivo, revertido)
- **Final**: 8000vh (balance optimo)

#### Saturno al Final del Scroll
- **Problema**: Saturno aparecia completamente antes de terminar el scroll
- **Solucion**: Cambiado peakStart de 0.65 a 1.0 para que este 100% visible exactamente al final

#### Traducciones de Contact
- **Problema**: Textos "Get in touch", "Email", "Phone", "Location" no cambiaban de idioma
- **Solucion**: Agregadas claves de traduccion:
  - `contact.getInTouch`
  - `contact.emailLabel`
  - `contact.phoneLabel`
  - `contact.locationLabel`

#### Mensaje de Scroll
- Agregado texto "Scrollea" / "Scroll down" debajo del icono del mouse en Hero

---

### Dependencias Instaladas

```json
{
  "dependencies": {
    "@react-three/fiber": "^9.4.2",
    "@react-three/drei": "^10.7.7",
    "@react-three/postprocessing": "^3.0.4",
    "three": "^0.182.0",
    "framer-motion": "^12.23.26",
    "i18next": "^25.7.3",
    "i18next-browser-languagedetector": "^8.2.0",
    "react-i18next": "^16.5.0",
    "zustand": "^5.0.9",
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "tailwindcss": "^4.1.18",
    "typescript": "~5.9.3",
    "vite": "^7.2.4",
    "@types/three": "^0.182.0"
  }
}
```

---

### Archivos Creados

```
src/
├── components/
│   ├── 3d/
│   │   ├── SpaceScene.tsx
│   │   ├── Galaxy.tsx
│   │   ├── Stars.tsx
│   │   ├── Nebula.tsx
│   │   ├── Earth.tsx
│   │   ├── Moon.tsx
│   │   ├── Planets.tsx
│   │   ├── Rocket.tsx
│   │   └── Meteorites.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Education.tsx
│   │   ├── Projects.tsx
│   │   ├── Services.tsx
│   │   ├── Skills.tsx
│   │   └── Contact.tsx
│   └── ui/
│       ├── Navbar.tsx
│       ├── LanguageSwitcher.tsx
│       ├── ProjectCard.tsx
│       ├── TechBadge.tsx
│       ├── Section.tsx
│       └── CVUploader.tsx
├── data/
│   ├── projects.json
│   ├── technologies.json
│   └── translations/
│       ├── es.json
│       └── en.json
├── hooks/
│   ├── useScrollProgress.ts
│   └── useProjects.ts
├── store/
│   └── useAppStore.ts
├── types/
│   └── index.ts
├── App.tsx
├── main.tsx
├── i18n.ts
└── index.css
```

---

### Notas Tecnicas

#### Formula de Easing Quintico
```typescript
const eased = t * t * t * (t * (t * 6 - 15) + 10);
```
Esta formula crea una curva de aceleracion/desaceleracion muy suave, ideal para transiciones de planetas.

#### Calculo de Visibilidad
```typescript
if (scrollProgress >= enterStart && scrollProgress < peakStart) {
  slideIn = (scrollProgress - enterStart) / (peakStart - enterStart);
} else if (scrollProgress >= peakStart && scrollProgress <= peakEnd) {
  slideIn = 1;
} else if (scrollProgress > peakEnd && scrollProgress <= exitEnd) {
  slideIn = 1;
  fadeOut = (scrollProgress - peakEnd) / (exitEnd - peakEnd);
}
```

#### Shaders GLSL
Los planetas usan shaders personalizados para:
- Generacion procedural de texturas
- Iluminacion dinamica con terminador
- Atmosferas con efecto de fresnel
- Animaciones basadas en tiempo (uniform time)

---

### Problemas Conocidos

1. **Performance en moviles de gama baja**: Los shaders complejos pueden reducir FPS
2. **Scroll tactil**: El comportamiento puede variar entre navegadores moviles
3. **WebGL requerido**: No hay fallback para navegadores sin soporte WebGL

---

### Proximos Pasos Sugeridos

1. [ ] Agregar mas planetas (Venus, Mercurio, Neptuno, Urano)
2. [ ] Implementar modo oscuro/claro
3. [ ] Agregar efectos de sonido ambiente
4. [ ] Optimizar para dispositivos moviles
5. [ ] Agregar loading screen mientras cargan texturas
6. [ ] Implementar lazy loading de componentes 3D
7. [ ] Agregar animaciones de entrada para tarjetas de proyectos
8. [ ] Crear version PWA

---

## Como Usar Este Changelog

1. **Para continuar desarrollo**: Revisar "Proximos Pasos Sugeridos"
2. **Para debugging**: Consultar "Historial de Ajustes" para ver soluciones a problemas similares
3. **Para entender el sistema**: Leer "Notas Tecnicas"
4. **Para modificar timing**: Consultar tabla de "Configuracion de Timing de Planetas"

---

## Contacto

Sebastian Castillo - Full Stack Developer
