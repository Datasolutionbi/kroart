# KRO.Art - Guía de Uso de Componentes Avanzados

## 📁 Archivos de Audio

### AmbientAudio
El componente `AmbientAudio` requiere un archivo de audio en formato MP3.

**Ubicación**: `/public/audio/ambient.mp3`

**Cómo añadir tu audio**:
1. Crea la carpeta `public/audio/` si no existe
2. Coloca tu archivo MP3 en esa carpeta
3. El componente ya está configurado para usar `/audio/ambient.mp3`

**Formatos recomendados**:
- MP3 (mejor compatibilidad)
- Bitrate: 128-192 kbps
- Duración: 2-5 minutos (loop automático)

---

## 🎨 Modelos 3D para Vista 360° y AR

### Model360Viewer y ARViewer
Estos componentes requieren modelos 3D en formatos específicos.

**Formatos requeridos**:
- **Android/Web**: `.glb` (recomendado) o `.gltf`
- **iOS**: `.usdz` (para AR en dispositivos Apple)

**Ubicación**: `/public/models/`

**Ejemplo de uso**:

```tsx
import Model360Viewer from "@/components/Model360Viewer";
import ARViewer from "@/components/ARViewer";

// Vista 360°
<Model360Viewer
  modelSrc="/models/artwork.glb"
  alt="Nombre de la obra"
  poster="/images/poster.jpg"
  autoRotate={true}
  cameraControls={true}
/>

// Realidad Aumentada
<ARViewer
  modelSrc="/models/artwork.glb"
  iosSrc="/models/artwork.usdz"
  alt="Nombre de la obra"
  poster="/images/poster.jpg"
/>
```

**Dónde conseguir modelos 3D**:
- [Sketchfab](https://sketchfab.com/) - Modelos gratuitos y de pago
- [Poly Pizza](https://poly.pizza/) - Modelos gratuitos
- Blender - Crear tus propios modelos y exportar a GLB/USDZ

**Herramientas de conversión**:
- [glTF-Transform](https://gltf-transform.donmccurdy.com/) - Optimizar GLB
- [Reality Converter](https://developer.apple.com/augmented-reality/tools/) (Mac) - Convertir a USDZ

---

## 🎭 ImageDistortion

Componente standalone para efecto de distorsión al hover.

**Ejemplo de uso**:

```tsx
import ImageDistortion from "@/components/ImageDistortion";

<ImageDistortion
  src="/images/artwork.jpg"
  alt="Descripción"
  intensity={15}
  className="w-full h-[600px]"
/>
```

---

## 📖 PageTransition

Wrapper para transiciones entre páginas tipo magazine.

**Ejemplo de uso**:

```tsx
import { PageTransition, MagazinePageTransition, CurtainTransition } from "@/components/PageTransition";

// En layout.tsx o template.tsx
<PageTransition>
  {children}
</PageTransition>

// O con efecto 3D
<MagazinePageTransition>
  {children}
</MagazinePageTransition>

// O con efecto cortina
<CurtainTransition>
  {children}
</CurtainTransition>
```

---

## 🎯 ArtFilters

Componente de filtros interactivos (pendiente de integración).

**Ejemplo de integración futura**:

```tsx
import ArtFilters from "@/components/ArtFilters";

const [activeMediums, setActiveMediums] = useState<string[]>([]);
const [activeYears, setActiveYears] = useState<string[]>([]);

<ArtFilters
  mediums={["Digital Art", "Photography", "3D"]}
  years={["2024", "2023", "2022"]}
  activeMediums={activeMediums}
  activeYears={activeYears}
  onMediumToggle={(medium) => {
    setActiveMediums(prev =>
      prev.includes(medium)
        ? prev.filter(m => m !== medium)
        : [...prev, medium]
    );
  }}
  onYearToggle={(year) => {
    setActiveYears(prev =>
      prev.includes(year)
        ? prev.filter(y => y !== year)
        : [...prev, year]
    );
  }}
  onClear={() => {
    setActiveMediums([]);
    setActiveYears([]);
  }}
/>
```

---

## ✅ Estado Actual de Integración

**Componentes Activos**:
- ✅ FluidSimulation (background global)
- ✅ Timeline (página principal)
- ✅ PresentationMode (botón flotante)
- ✅ AmbientAudio (requiere archivo MP3)
- ✅ CursorParticles (desktop)
- ✅ ThemeToggle (dark/light)

**Componentes Listos para Usar**:
- ⏳ Model360Viewer (requiere modelos .glb)
- ⏳ ARViewer (requiere modelos .glb/.usdz)
- ⏳ ImageDistortion (standalone)
- ⏳ PageTransition (wrapper de páginas)
- ⏳ ArtFilters (requiere lógica de estado)

---

## 📝 Notas Importantes

1. **Audio**: El sitio funcionará sin el archivo de audio, pero mostrará un error en consola. Añade el archivo para activar la funcionalidad.

2. **Modelos 3D**: Los componentes 3D/AR son opcionales. El sitio funciona perfectamente sin ellos.

3. **Performance**: Todos los componentes pesados usan carga dinámica (`dynamic import`) para optimizar el bundle.

4. **Accesibilidad**: Todos los componentes respetan `prefers-reduced-motion` automáticamente.
