# CONTEXTO COMPLETO — Red de Concejales Socialistas de Santa Fe
## Para pegar al inicio de una nueva tarea en Cowork

---

## QUÉ ES ESTE PROYECTO

Sitio web para la **Red de Concejales Socialistas de Santa Fe**.  
Es un espacio interno para concejales del PS de la provincia. Requiere login para entrar.

- **URL actual:** concejalesps.vercel.app
- **Hosting:** Vercel (gratuito, sitio estático)
- **Stack:** HTML + CSS + JS puro. Sin frameworks. Sin Node. Sin build tools.
- **Contacto:** autoridadeslocales@gmail.com
- **Drive del proyecto:** cpn.bonadeo@gmail.com

---

## ARCHIVOS QUE HAY QUE GENERAR

| Archivo | Función |
|---|---|
| `login.html` | Pantalla de acceso con usuario/contraseña individuales |
| `index.html` | Sitio principal completo |

---

## NOMBRE Y CONCEPTO

**Nombre:** Red de Concejales Socialistas de Santa Fe  
**Tagline:** *"Las mejores ideas de un concejo pueden servir en toda la provincia."*

El sitio se organiza alrededor de una pregunta:  
**¿Por qué un concejal debería entrar todos los días?**  
Respuesta: porque acá encontrás proyectos, ordenanzas y experiencias que te ahorran semanas de trabajo.

---

## ESTRUCTURA DEL SITIO (orden exacto de secciones)

```
1. Nav
2. Hero
3. Banco de Iniciativas  ← SECCIÓN PRINCIPAL
4. Problemas comunes
5. La Red (directorio de concejales)
6. Capacitaciones
7. Agenda
8. Biblioteca Legal
9. Gobiernos socialistas de referencia
10. Sumarse a la red
11. Footer
```

---

## DETALLE DE CADA SECCIÓN

### NAV
- Logo PS Santa Fe (SVG): https://temporal.pssantafe.org/wp-content/themes/theme-template-websimple/public/images/logo-header.svg
- Fallback si falla: texto "PS" en rojo
- Texto: "Red de Concejales PS · Santa Fe"
- Links: Iniciativas | Problemas | La Red | Biblioteca | Agenda
- Botón: "Salir" (borra localStorage y redirige a login.html)

---

### HERO

**Titular:**
> Ningún concejal debería gobernar solo.

**Bajada:**
> La ordenanza que aprobaste en tu municipio puede ahorrarle semanas de trabajo a un colega de otra ciudad. Esta red existe para eso: compartir lo que funciona, conectar quien tiene el problema con quien ya lo resolvió, y construir un socialismo local más fuerte en cada rincón de la provincia.

**CTA principal:** "Ver el banco de iniciativas" (ancla a #banco)  
**CTA secundario:** "Ver quién trabaja tu tema" (ancla a #la-red)

---

### BANCO DE INICIATIVAS ← corazón del sitio

**Descripción intro:**
> Proyectos, ordenanzas y experiencias de concejales socialistas de toda la provincia. Lo que funcionó en un concejo puede funcionar en el tuyo.

**Vista por tema** con íconos (no carpetas de Drive):
| Tema | Ícono | Carpeta Drive |
|---|---|---|
| Gobierno y gestión | 🏛️ | https://drive.google.com/drive/folders/1Io5We8CdbzruHABt1W5gb2SLJr01NQml |
| Obras y servicios públicos | 🔧 | https://drive.google.com/drive/folders/12Me91WZz5HKO7rVRObVUcz50eh-eUqij |
| Planeamiento urbano | 📐 | https://drive.google.com/drive/folders/1NyVEXn2q92p4ktDh-jlG80zeAPQbIMaH |
| Desarrollo humano | 🤝 | https://drive.google.com/drive/folders/10IyZ8hkfQs9qSHCs5MaazL-QJ2cf1n3U |
| Fiscalización y control | 🔍 | https://drive.google.com/drive/folders/1UEBpesGI94TFxtSGgn5MVtAkwENYsByu |
| Género, Seguridad, DDHH | ✊ | https://drive.google.com/drive/folders/1IjgsMR_70qUTAHfhW8B70H8rlvSrp_si |
| Transparencia | 📋 | https://drive.google.com/drive/folders/1z6V_xCbNZqc_i7ZLES76rVXvhn413Va5 |

**Subsección "Quién ya hizo esto"** (ejemplo visual):
```
Ordenanza de Arbolado Urbano
✅ Rosario · Federico Lifschitz
✅ Sunchales · José Delmastro
✅ Recreo · Omar Picard
[Etiqueta: REPLICABLE]
```
Mostrar 3 ejemplos con datos ficticios de muestra. El contenido real se carga después.

---

### PROBLEMAS COMUNES

**Intro:** El concejal piensa desde el problema que tiene enfrente, no desde la categoría temática.

**Categorías (cards clicables que filtran el banco):**
- 🚗 Seguridad vial
- 🗑️ Microbasurales
- 💊 Consumo problemático
- ♿ Accesibilidad
- 🌿 Ambiente
- 🚌 Transporte
- 🐄 Animales sueltos
- 👶 Empleo joven
- 🏠 Hábitat y vivienda
- 👩‍⚖️ Género y DDHH

Al hacer click en un problema → scroll al banco + filtrar por tema correspondiente.

---

### LA RED (directorio de concejales)

**Intro:** Encontrá rápidamente quién trabaja tu tema en otra ciudad.

**Filtros:**
- Por departamento
- Por tema de interés

**Cada tarjeta muestra:**
- Avatar (foto o inicial con fondo rojo)
- Nombre
- Ciudad · Departamento
- 2 etiquetas de tema
- Al hacer click → modal con perfil completo

**Modal de perfil** (ya diseñado, integrar):
- Foto grande
- Nombre en Playfair Display
- Ciudad · Departamento en rojo
- Bio
- Instagram (link)
- Email (link)
- Teléfono (link tel:)
- Cerrar con botón X

---

### LOS 38 CONCEJALES (array completo con datos reales)

```javascript
const CONCEJALES = [
  // CASEROS
  { id: 1, nombre: "Yoana Dalbello", localidad: "San José de la Esquina", departamento: "Caseros", tel: "3467 43-8952", ig: "", mail: "", foto: "", temas: ["Desarrollo humano", "Género, Seguridad, DDHH"] },
  { id: 2, nombre: "Juan Pablo Coniglio", localidad: "San José de la Esquina", departamento: "Caseros", tel: "3467 41-7291", ig: "", mail: "", foto: "", temas: ["Gobierno y gestión", "Fiscalización y control"] },
  // CASTELLANOS
  { id: 3, nombre: "José Delmastro", localidad: "Sunchales", departamento: "Castellanos", tel: "3493 41-6305", ig: "", mail: "josedelmastro41@gmail.com", foto: "", temas: ["Obras y servicios públicos", "Planeamiento urbano"] },
  { id: 4, nombre: "Brenda Torrini", localidad: "Sunchales", departamento: "Castellanos", tel: "3493 45-5600", ig: "", mail: "brendatorririconcejal@gmail.com", foto: "", temas: ["Ambiente", "Gobierno y gestión"] },
  { id: 5, nombre: "Juano Astor", localidad: "Sunchales", departamento: "Castellanos", tel: "3493 49-5863", ig: "", mail: "juan.astor95@gmail.com", foto: "", temas: ["Gobierno y gestión", "Transparencia"] },
  { id: 6, nombre: "Juan Carlos Marchese", localidad: "San Vicente", departamento: "Castellanos", tel: "3401 64-0111", ig: "", mail: "", foto: "", temas: ["Desarrollo humano"] },
  // CONSTITUCIÓN
  { id: 7, nombre: "Diego Martin", localidad: "Villa Constitución", departamento: "Constitución", tel: "3400 41-7834", ig: "", mail: "", foto: "", temas: ["Obras y servicios públicos"] },
  { id: 8, nombre: "Francisco Bracalenti", localidad: "Villa Constitución", departamento: "Constitución", tel: "3364 64-2204", ig: "", mail: "", foto: "", temas: ["Fiscalización y control"] },
  // GENERAL LÓPEZ
  { id: 9, nombre: "Micaela Mineiro", localidad: "Venado Tuerto", departamento: "Gral. López", tel: "3462 63-9815", ig: "", mail: "", foto: "", temas: ["Género, Seguridad, DDHH", "Desarrollo humano"] },
  { id: 10, nombre: "Alina Vargas Amato", localidad: "Firmat", departamento: "Gral. López", tel: "3465 59-2384", ig: "", mail: "", foto: "", temas: ["Género, Seguridad, DDHH"] },
  // GENERAL OBLIGADO
  { id: 11, nombre: "Alejandro Delssin", localidad: "Las Toscas", departamento: "Gral. Obligado", tel: "3482 55-4567", ig: "", mail: "", foto: "", temas: ["Obras y servicios públicos"] },
  { id: 12, nombre: "Miguel Gutierrez", localidad: "Las Toscas", departamento: "Gral. Obligado", tel: "3482 37-6610", ig: "", mail: "", foto: "", temas: ["Gobierno y gestión"] },
  { id: 13, nombre: "Marisa Flores", localidad: "Reconquista", departamento: "Gral. Obligado", tel: "3482 51-4685", ig: "", mail: "", foto: "", temas: ["Desarrollo humano", "Género, Seguridad, DDHH"] },
  { id: 14, nombre: "Daina Ramirez", localidad: "Villa Ocampo", departamento: "Gral. Obligado", tel: "3482 60-4622", ig: "", mail: "", foto: "", temas: ["Desarrollo humano"] },
  { id: 15, nombre: "Andrea Cracogna", localidad: "Villa Ocampo", departamento: "Gral. Obligado", tel: "3482 39-4937", ig: "", mail: "", foto: "", temas: ["Género, Seguridad, DDHH"] },
  // LA CAPITAL
  { id: 16, nombre: "Omar Picard", localidad: "Recreo", departamento: "La Capital", tel: "3426 29-8463", ig: "", mail: "", foto: "", temas: ["Gobierno y gestión", "Obras y servicios públicos"] },
  { id: 17, nombre: "Camila Rodriguez del Curto", localidad: "San José del Rincón", departamento: "La Capital", tel: "3425 35-7954", ig: "", mail: "", foto: "", temas: ["Desarrollo humano", "Género, Seguridad, DDHH"] },
  { id: 18, nombre: "Melina Andrés", localidad: "Laguna Paiva", departamento: "La Capital", tel: "3425 46-2249", ig: "@andres.melina", mail: "", foto: "", temas: ["Género, Seguridad, DDHH", "Desarrollo humano"] },
  { id: 19, nombre: "Alejandra Chena", localidad: "Santo Tomé", departamento: "La Capital", tel: "3424 05-4647", ig: "", mail: "", foto: "", temas: ["Desarrollo humano"] },
  // LAS COLONIAS
  { id: 20, nombre: "Judith Perren", localidad: "San Carlos Centro", departamento: "Las Colonias", tel: "3404 41-9610", ig: "", mail: "", foto: "", temas: ["Fiscalización y control", "Transparencia"] },
  { id: 21, nombre: "Gabriel Otazo", localidad: "San Carlos Centro", departamento: "Las Colonias", tel: "3425 36-5763", ig: "", mail: "", foto: "", temas: ["Obras y servicios públicos"] },
  // NUEVE DE JULIO
  { id: 22, nombre: "Pedro Junco", localidad: "Villa Minetti", departamento: "9 de Julio", tel: "3491 69-8608", ig: "", mail: "", foto: "", temas: ["Desarrollo humano", "Gobierno y gestión"] },
  // ROSARIO
  { id: 23, nombre: "Benjamín Perruccio", localidad: "Alvear", departamento: "Rosario", tel: "3417 04-6068", ig: "", mail: "", foto: "", temas: ["Gobierno y gestión"] },
  { id: 24, nombre: "Flavia Banfi", localidad: "Alvear", departamento: "Rosario", tel: "3412 09-0213", ig: "", mail: "", foto: "", temas: ["Género, Seguridad, DDHH", "Desarrollo humano"] },
  { id: 25, nombre: "Federico Lifschitz", localidad: "Rosario", departamento: "Rosario", tel: "3413 49-4950", ig: "@fede_lifschitz", mail: "federicolifschitz@concejorosario.gov.ar", foto: "", temas: ["Fiscalización y control", "Obras y servicios públicos"] },
  { id: 26, nombre: "Manuel Sciutto", localidad: "Rosario", departamento: "Rosario", tel: "3412 29-6544", ig: "", mail: "", foto: "", temas: ["Gobierno y gestión", "Planeamiento urbano"] },
  { id: 27, nombre: "Alicia Pino", localidad: "Rosario", departamento: "Rosario", tel: "3412 79-7712", ig: "", mail: "", foto: "", temas: ["Desarrollo humano", "Género, Seguridad, DDHH"] },
  { id: 28, nombre: "Esteban Lenci", localidad: "Villa Gobernador Gálvez", departamento: "Rosario", tel: "3416 43-3416", ig: "", mail: "", foto: "", temas: ["Obras y servicios públicos"] },
  { id: 29, nombre: "Patricia González", localidad: "Villa Gobernador Gálvez", departamento: "Rosario", tel: "3413 21-6254", ig: "", mail: "", foto: "", temas: ["Género, Seguridad, DDHH", "Desarrollo humano"] },
  { id: 30, nombre: "José Bulsicco", localidad: "Villa Gobernador Gálvez", departamento: "Rosario", tel: "3415 02-5501", ig: "", mail: "", foto: "", temas: ["Fiscalización y control"] },
  { id: 31, nombre: "Maximiliano Lopez", localidad: "San Cristóbal", departamento: "Rosario", tel: "3416 88-0285", ig: "", mail: "", foto: "", temas: ["Gobierno y gestión"] },
  // SAN CRISTÓBAL
  { id: 32, nombre: "Agustín Peretti", localidad: "Suardi", departamento: "San Cristóbal", tel: "3562 52-1673", ig: "", mail: "aperetti.suardi@gmail.com", foto: "", temas: ["Gobierno y gestión", "Desarrollo humano"] },
  { id: 33, nombre: "Gonzalo Rui", localidad: "Suardi", departamento: "San Cristóbal", tel: "3562 41-0017", ig: "", mail: "", foto: "", temas: ["Obras y servicios públicos"] },
  // SAN JERÓNIMO
  { id: 34, nombre: "Santiago Pestarini", localidad: "Gálvez", departamento: "San Jerónimo", tel: "", ig: "", mail: "", foto: "", temas: ["Gobierno y gestión"] },
  { id: 35, nombre: "Monica Rivelo", localidad: "Gálvez", departamento: "San Jerónimo", tel: "3404 49-1935", ig: "", mail: "", foto: "", temas: ["Género, Seguridad, DDHH"] },
  // SAN MARTÍN
  { id: 36, nombre: "Rodrigo Duín", localidad: "San Jorge", departamento: "San Martín", tel: "3406 64-4909", ig: "", mail: "", foto: "", temas: ["Obras y servicios públicos"] },
  { id: 37, nombre: "Laura Raspantti", localidad: "El Trébol", departamento: "San Martín", tel: "", ig: "", mail: "", foto: "", temas: ["Desarrollo humano", "Género, Seguridad, DDHH"] },
  // VERA
  { id: 38, nombre: "Ana Paula Capello", localidad: "Vera", departamento: "Vera", tel: "", ig: "", mail: "", foto: "", temas: ["Desarrollo humano"] },
];
```

---

### CAPACITACIONES

6 módulos en cards:
1. Técnica legislativa — cómo redactar ordenanzas y resoluciones
2. Presupuesto municipal — lectura e interpretación
3. Comunicación política local — redes y medios
4. Género en el concejo — aplicación práctica
5. Medio ambiente — herramientas normativas
6. Control y fiscalización — rol del concejal opositor

Cada card: título + descripción breve + botón "Ver módulo" (link a Drive).  
Filtro visual: "Primer mandato" / "Mandatos avanzados"

---

### AGENDA

4 eventos de ejemplo. Formato: fecha + título + lugar + botón "Ver más".

---

### BIBLIOTECA LEGAL

12 leyes con links verificados, filtrables por categoría.

| Ley | Descripción | Link |
|---|---|---|
| Constitución Nacional 1994 | Art. 123 autonomía municipal | https://www.argentina.gob.ar/sites/default/files/constitucion-nacional-7-0.pdf |
| Constitución SF 2025 | Nueva carta magna, 161 artículos | https://www.santafe.gob.ar/ms/reforma-constitucion/wp-content/uploads/sites/86/2025/09/CONSTITUCION-DE-LA-PROV-DE-SF-2025_VF-WEB.pdf |
| Ley 2756 SF | Ley Orgánica de Municipalidades | https://www.santafe.gov.ar/tribunalelectoral/wp-content/uploads/2022/11/Ley-N%C2%B0-2756.pdf |
| Ley 13.513 SF | Acceso a la Información Pública SF | https://www.santafe.gov.ar/index.php/web/content/view/full/143174/(subtema)/93811 |
| Ley 2439 SF | Ley Orgánica de Comunas | https://www.santafe.gov.ar/index.php/web/content/view/full/82019 |
| Ley 27.275 Nacional | Acceso a la Información Pública | https://servicios.infoleg.gob.ar/infolegInternet/anexos/265000-269999/265949/norma.htm |
| Ley 27.412 Nacional | Paridad de género | https://servicios.infoleg.gob.ar/infolegInternet/anexos/305000-309999/305386/norma.htm |
| Ley 27.499 Nacional | Ley Micaela | https://servicios.infoleg.gob.ar/infolegInternet/anexos/315000-319999/318666/norma.htm |
| Ley 25.675 Nacional | Ley General del Ambiente | https://servicios.infoleg.gob.ar/infolegInternet/anexos/75000-79999/79980/norma.htm |
| Ley 26.061 Nacional | Protección de niños/as/adolescentes | https://servicios.infoleg.gob.ar/infolegInternet/anexos/110000-114999/110778/norma.htm |

Categorías para filtro: Nacional / Provincial SF / Municipal

---

### GOBIERNOS SOCIALISTAS DE REFERENCIA

Sección secundaria, compacta. 7 intendentes:

| Municipio | Departamento | Intendente |
|---|---|---|
| San José de la Esquina | Caseros | Ezequiel Ruani |
| Sunchales | Castellanos | Pablo Pinotti |
| Las Toscas | Gral. Obligado | Ivan Sanchez |
| Recreo | La Capital | Omar Colombo |
| Alvear | Rosario | Carlos Pighin |
| Pueblo Esther | Rosario | Martin Gherardi |
| Villa Gobernador Gálvez | Rosario | Alberto Ricci |

---

### SUMARSE A LA RED

Formulario (por ahora sin backend, mostrar mensaje "próximamente"):
- Nombre completo
- Municipio / Ciudad
- Email
- Teléfono
- Mensaje / Por qué quiero sumarme

---

### FOOTER

- Logo PS + "Red de Concejales Socialistas de Santa Fe"
- Contacto: autoridadeslocales@gmail.com
- "Acceso concejales" → link a login.html

---

## LOGIN (login.html)

Sistema con localStorage. Lista de usuarios hardcodeada.

```javascript
const USUARIOS = {
  "admin": "pssantafe2026",
  // agregar: "nombre.apellido": "clave2026"
};
```

Al loguearse correctamente → redirige a index.html  
Al entrar a index.html sin sesión → redirige a login.html  
Botón "Salir" → borra localStorage → redirige a login.html

---

## DISEÑO Y ESTILO

**Paleta:**
- Fondo: `#0D0509` (casi negro con toque bordo)
- Rojo PS: `#C41230`
- Rojo oscuro: `#8a0c20`
- Texto principal: `#ffffff`
- Texto secundario: `#c0a0b0`
- Bordes/cards: `#1a0a10` con borde `#2a1020`

**Tipografía:**
- Títulos: `Playfair Display` (Google Fonts, weight 700)
- Cuerpo: `Inter` (Google Fonts, weight 400/500/600)

**Componentes ya definidos (copiar exacto del modal):**
```css
/* Cards de concejal */
background: #1a0a10;
border: 1px solid #2a1020;
border-radius: 12px;
hover: border-color #C41230, translateY(-2px)

/* Franja de acento */
background: linear-gradient(135deg, #C41230 0%, #8a0c20 100%)

/* Bio block */
border-left: 3px solid #C41230;
background: rgba(196,18,48,0.06);
```

**Logo PS:**
```html
<img src="https://temporal.pssantafe.org/wp-content/themes/theme-template-websimple/public/images/logo-header.svg"
     onerror="this.style.display='none'; this.nextElementSibling.style.display='inline'"
     alt="PS">
<span style="display:none; color:#C41230; font-weight:700; font-size:1.2rem">PS</span>
```

---

## REGLAS DE TONO Y ESCRITURA

- Siempre "concejales" (no "concejales y concejalas")
- Siempre "gobiernos locales" (no "municipios y comunas")
- Primera persona del plural: "nosotros", "trabajamos", "gobernamos"
- Tono directo, sin grandilocuencia institucional

---

## ESTADO ACTUAL / LO QUE YA EXISTE

- ✅ Modal de perfil de concejal diseñado (CSS + JS listo para integrar)
- ✅ Array de 38 concejales con teléfonos reales
- ✅ Links del Banco de Iniciativas (Drive) verificados
- ✅ Links de Biblioteca Legal verificados
- ✅ Arquitectura v2 definida
- ⬜ index.html completo con nueva arquitectura ← **LO QUE HAY QUE GENERAR**
- ⬜ login.html actualizado con nuevo nombre
- ⬜ Fotos de concejales (pendiente, usar ui-avatars.com como fallback)
- ⬜ Supabase para formulario y carga de archivos
- ⬜ Instagram y bio de cada concejal

---

## INSTRUCCIÓN PARA EL CHAT

Generá `login.html` e `index.html` completos con la arquitectura descripta arriba.

Requisitos técnicos:
- HTML/CSS/JS puro, sin frameworks, deployable directo en Vercel
- Responsive (mobile first)
- Todas las secciones en el orden indicado
- El modal de perfil integrado en la sección "La Red"
- Los 38 concejales cargados en el array CONCEJALES
- Fotos: usar `https://ui-avatars.com/api/?name=NOMBRE&background=C41230&color=fff&size=200` como fallback
- Filtros funcionales en "La Red" (por departamento y por tema)
- Login con localStorage
- Protección de index.html: si no hay sesión, redirigir a login.html
