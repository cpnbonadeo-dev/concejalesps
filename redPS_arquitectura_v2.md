# Red de Concejales Socialistas de Santa Fe
## Propuesta de arquitectura v2

---

## 1. Nombre y concepto

**Nombre:** Red de Concejales Socialistas de Santa Fe  
**URL:** concejalesps.vercel.app  
**Tagline:** *"Las mejores ideas de un concejo pueden servir en toda la provincia."*

El cambio de nombre no es cosmético. "Autoridades Locales" genera ambigüedad sobre quiénes son los protagonistas. "Red de Concejales" dice exactamente qué es, para quién es y qué hace. Desde el primer segundo.

---

## 2. Principio organizador

El sitio se organiza alrededor de **una pregunta**: ¿por qué un concejal debería entrar todos los días?

La respuesta no es el manifiesto. No es el directorio. Es:

> "Porque acá encontrás proyectos, ordenanzas y experiencias que te ahorran semanas de trabajo."

Ese es el valor político real. Todo lo demás sirve ese valor.

---

## 3. Nueva estructura de secciones (orden de jerarquía)

### 3.1 Hero
**Titular:** *"Ningún concejal debería gobernar solo."*

**Bajada:**  
Las mejores ideas de un concejo pueden servir en toda la provincia. Esta red existe para que lo que funcionó en Sunchales llegue a Vera, y lo que aprendiste en tu primer mandato no se pierda cuando empiece el segundo.

**CTA principal:** Entrar al banco de iniciativas  
**CTA secundario:** Ver quién trabaja tu tema

*Sin mención a intendentes. Sin "autoridades". Sin institucional.*

---

### 3.2 Banco de Iniciativas ← **SECCIÓN PRINCIPAL**

Esta es la razón de entrar. Reorganizar como:

**Vista por tema** (no por carpeta de Drive):
- Ambiente y residuos
- Seguridad vial
- Género y diversidad
- Niñez y educación
- Salud y consumos problemáticos
- Empleo joven
- Accesibilidad
- Transporte
- Animales sueltos / fauna urbana
- Transparencia y control

**Cada iniciativa muestra:**
- Nombre de la ordenanza/proyecto
- Autor/a (concejal)
- Ciudad donde se aprobó
- Año
- Etiqueta "Replicable" si fue adoptada en más de un lugar
- Link al documento

**Nueva subsección: "Quién ya hizo esto"**  
Ejemplo:  
`Ordenanza de Arbolado Urbano`  
✅ Rosario · Federico Lifschitz  
✅ Sunchales · José Delmastro  
✅ Recreo · Omar Picard  

Esto genera reconocimiento político entre pares y motiva a cargar más material.

---

### 3.3 Problemas comunes

*Entrada por gestión, no por ideología.*

El concejal piensa desde el problema que tiene enfrente. La navegación debería reflejar eso.

**Categorías:**
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

**Cada problema enlaza directo** a las iniciativas del Banco correspondientes + a los concejales que trabajaron ese tema.

---

### 3.4 La Red ← reemplaza "Directorio de concejales"

No una guía telefónica. Una red real.

**Cada tarjeta muestra:**
- Foto
- Nombre y ciudad
- Comisión donde trabaja
- 2-3 temas de interés (etiquetas)
- Instagram / Email / Teléfono

**Filtros activos:**
- Por departamento
- Por tema
- Por comisión

*Propósito: que un concejal de Vera encuentre en 10 segundos quién trabajó ambiente en Rosario o género en Las Toscas.*

---

### 3.5 Capacitaciones

Sin cambios estructurales. Mantener los 6 módulos.  
Agregar filtro: "Para primer mandato" / "Para mandatos avanzados".

---

### 3.6 Agenda

Sin cambios. Mantener eventos próximos.

---

### 3.7 Biblioteca Legal

Sin cambios. Ya está bien organizada.

---

### 3.8 Gobiernos socialistas de referencia ← reemplaza "Gobiernos locales"

*Sección secundaria, no protagonista.*

Los 7 intendentes aparecen acá, no en el hero ni en el concepto central. Son contexto territorial, no el núcleo de la plataforma.

Formato compacto: ciudad + intendente + un dato de gestión destacado.

---

### 3.9 Sumarse a la red ← reemplaza "Sumarse al foro"

Sin cambios técnicos (sigue necesitando Supabase). Cambio de nombre y tono.  
*"Sumarse a la red"* suena menos institucional que *"Sumarse al foro"*.

---

## 4. Textos clave reescritos

### Hero — nuevo titular
> Ningún concejal debería gobernar solo.

### Hero — nueva bajada
> La ordenanza que aprobaste en tu municipio puede ahorrarle semanas de trabajo a un colega de otra ciudad. Esta red existe para eso: compartir lo que funciona, conectar quien tiene el problema con quien ya lo resolvió, y construir un socialismo local más fuerte en cada rincón de la provincia.

### Manifiesto — nuevo titular
> Las mejores ideas de un concejo pueden servir en toda la provincia.

### Manifiesto — nuevo texto
> No trabajamos solos. Lo que aprendiste en tu primer mandato no se pierde: se multiplica. La ordenanza que funcionó en Sunchales puede servir en Vera. El debate que diste en comisión puede abrirle camino a quien está empezando.  
>  
> Compartir no es perder protagonismo. Es construir un socialismo que gobierna en serio desde lo local.

---

## 5. Jerarquía visual propuesta

```
1. Hero                          ← identidad + propósito
2. Banco de Iniciativas          ← razón de volver todos los días
3. Problemas comunes             ← entrada por gestión
4. La Red (concejales)           ← directorio útil, no guía telefónica
5. Capacitaciones                ← formación
6. Agenda                        ← próximos encuentros
7. Biblioteca Legal              ← referencia normativa
8. Gobiernos de referencia       ← contexto, secundario
9. Sumarse a la red              ← formulario de incorporación
```

---

## 6. Lo que se saca

- Mención a "Foro de Autoridades Locales" en hero y nav
- Protagonismo de intendentes en la sección principal
- Sección "El rol del concejal + 4 pilares" (muy institucional, baja conversión)
- "Presencia territorial" con mapa de calor SVG (bonito pero no genera valor diario)

---

## 7. Lo que se agrega

- Filtro por tema en el directorio
- "Quién ya hizo esto" en el Banco de Iniciativas
- Sección Problemas comunes (entrada por gestión)
- Etiqueta "Replicable" en iniciativas con múltiples adopciones

---

## 8. Pendientes técnicos sin cambio

- Supabase para formulario + carga de archivos al banco
- Modal de perfil de concejal (ya diseñado)
- Fotos de concejales (pendiente de recopilación)
- Migración a dominio definitivo
