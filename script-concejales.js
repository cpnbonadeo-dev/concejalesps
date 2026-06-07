// ═══════════════════════════════════════════════════════
//  FORO AUTORIDADES LOCALES · PS SANTA FE
//  Google Apps Script — Formulario de perfil de concejales
//  Pegá este código en Apps Script del sheet "liga de concejales"
// ═══════════════════════════════════════════════════════

const SHEET_ID   = '16Y5BqzJauMD_DAbR0HZ3CFk9LhbYe234v3G-3D6-ZBw';
const SHEET_NAME = 'Hoja 1';

// ── Columnas del sheet (índice base 1 para getRange) ──
// A=1  MUNICIPIO (departamento)
// B=2  MUNICIPIO/LOCALIDAD
// C=3  CARGO
// D=4  NOMBRE Y APELLIDO
// E=5  COLUMNA PERETTI  ← interno, nunca se muestra
// F=6  SECTOR           ← interno, NUNCA se muestra
// G=7  INSTAGRAM        ← nuevo
// H=8  EMAIL            ← nuevo
// I=9  FOTO_URL         ← nuevo
// J=10 BIO              ← nuevo
// K=11 PROYECTO         ← nuevo
// L=12 AREA_TEMATICA    ← nuevo
// M=13 ORDENANZA_LINK   ← nuevo (requerido para activar perfil)
// N=14 FORM_URL         ← generado automáticamente

const AREAS = [
  'Gobierno y Habilitaciones',
  'Obras y Servicios Públicos',
  'Planeamiento y Ambiente',
  'Desarrollo Humano y Producción',
  'Fiscalización',
  'Género, Seguridad y DD.HH.',
  'Transparencia y Administración'
];

// ───────────────────────────────────────────────────────
//  INICIALIZAR: Agrega los encabezados nuevos y genera URLs
//  Ejecutar UNA sola vez desde el menú Apps Script
// ───────────────────────────────────────────────────────
function inicializar() {
  const ss    = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);

  // Agregar encabezados en columnas G-N si están vacías
  const headers = ['INSTAGRAM','EMAIL','CELULAR','FOTO_URL','BIO',
                   'ORDENANZA_NOMBRE','ORDENANZA_AREA',
                   'ORDENANZA_DESCRIPCION','ORDENANZA_LINK','FORM_URL'];
  headers.forEach((h, i) => {
    const col = i + 7; // G=7
    if (!sheet.getRange(1, col).getValue()) {
      sheet.getRange(1, col).setValue(h);
    }
  });

  // Generar URL para cada fila y escribirla en columna N
  generarURLs();

  SpreadsheetApp.getUi().alert('✅ Inicializado correctamente.\n\nColumnas agregadas y URLs generadas.');
}

// ───────────────────────────────────────────────────────
//  Genera los links únicos y los escribe en col N
// ───────────────────────────────────────────────────────
function generarURLs() {
  const sheet   = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  const baseUrl = ScriptApp.getService().getUrl();
  const lastRow = sheet.getLastRow();

  for (let row = 2; row <= lastRow; row++) {
    const nombre = sheet.getRange(row, 4).getValue();
    if (nombre) {
      const url = `${baseUrl}?rowId=${row}`;
      sheet.getRange(row, 14).setValue(url);
    }
  }
}

// ───────────────────────────────────────────────────────
//  doGet — pantalla de selección o formulario pre-llenado
// ───────────────────────────────────────────────────────
function doGet(e) {
  const rowId = parseInt(e.parameter.rowId);

  // Sin rowId → mostrar pantalla de selección de nombre
  if (!rowId || rowId < 2) {
    const sheet   = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const lastRow = sheet.getLastRow();
    const datos   = sheet.getRange(2, 1, lastRow - 1, 4).getValues();
    const scriptUrl = ScriptApp.getService().getUrl();

    const opciones = datos
      .map((fila, i) => ({ row: i + 2, nombre: fila[3], localidad: fila[1], cargo: fila[2] }))
      .filter(d => d.nombre)
      .map(d => `<option value="${d.row}">${d.nombre} — ${d.localidad} (${d.cargo})</option>`)
      .join('');

    const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Foro PS Santa Fe · Mi perfil</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:system-ui,-apple-system,sans-serif;background:#0D0509;color:#fff;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:1.5rem}
.logo{width:56px;height:56px;background:#C41230;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1.25rem;color:#fff;margin:0 auto 1.25rem}
h1{font-size:1.2rem;font-weight:700;text-align:center;margin-bottom:.4rem}
p{font-size:.82rem;color:rgba(255,255,255,.45);text-align:center;margin-bottom:2rem;line-height:1.55}
.box{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09);border-radius:16px;padding:1.75rem;width:100%;max-width:380px}
label{display:block;font-size:.75rem;font-weight:600;color:rgba(255,255,255,.5);margin-bottom:.5rem;text-transform:uppercase;letter-spacing:.06em}
select{width:100%;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);border-radius:9px;padding:.8rem .9rem;color:#fff;font-family:inherit;font-size:.9rem;outline:none;margin-bottom:1.1rem;cursor:pointer}
select option{background:#1A0C0F;color:#fff}
.btn{width:100%;background:#C41230;color:#fff;border:none;padding:.9rem;border-radius:9px;font-size:.95rem;font-weight:700;cursor:pointer;font-family:inherit;transition:background .2s}
.btn:hover{background:#E8192C}
.nota{font-size:.7rem;color:rgba(255,255,255,.22);text-align:center;margin-top:1.25rem;line-height:1.5}
</style>
</head>
<body>
  <div class="logo">PS</div>
  <h1>Completá tu perfil en el foro</h1>
  <p>Foro Autoridades Locales · Partido Socialista Santa Fe</p>
  <div class="box">
    <form onsubmit="ir(event)">
      <label>Seleccioná tu nombre</label>
      <select id="sel" required>
        <option value="">— elegí tu nombre —</option>
        ${opciones}
      </select>
      <button type="submit" class="btn">Ver mi formulario →</button>
    </form>
    <p class="nota">Solo aparecen los concejales habilitados.<br>Si no encontrás tu nombre contactá al administrador.</p>
  </div>
  <script>
    function ir(e) {
      e.preventDefault();
      const v = document.getElementById('sel').value;
      if (v) window.location.href = '${scriptUrl}?rowId=' + v;
    }
  </script>
</body>
</html>`;
    return HtmlService.createHtmlOutput(html).setTitle('Foro PS Santa Fe · Mi perfil').addMetaTag('viewport','width=device-width,initial-scale=1');
  }

  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  const fila  = sheet.getRange(rowId, 1, 1, 13).getValues()[0];
  const lastRow = sheet.getLastRow();

  // Datos de identidad (no editables)
  const depto    = fila[0] || '';
  const localidad= fila[1] || '';
  const cargo    = fila[2] || '';
  const nombre   = fila[3] || '';

  // Datos de perfil (editables)
  const instagram = (fila[6] || '').replace('@','');
  const email     = fila[7] || '';
  const fotoUrl   = fila[8] || '';
  const bio       = fila[9] || '';
  const proyecto  = fila[10] || '';
  const area      = fila[11] || '';
  const ordenanza = fila[12] || '';

  if (!nombre) {
    return HtmlService.createHtmlOutput(errorHTML('No encontramos tu registro. Contactá al administrador.'));
  }

  const html = HtmlService.createHtmlOutput(
    formHTML({
      rowId, nombre, depto, localidad, cargo,
      instagram, email, fotoUrl, bio, proyecto, area, ordenanza,
      scriptUrl: ScriptApp.getService().getUrl()
    })
  );
  html.setTitle('Mi perfil · Foro PS Santa Fe');
  html.addMetaTag('viewport', 'width=device-width, initial-scale=1');
  return html;
}

// ───────────────────────────────────────────────────────
//  doPost — guarda los datos enviados
// ───────────────────────────────────────────────────────
function doPost(e) {
  const p     = e.parameter;
  const rowId = parseInt(p.rowId);

  if (!rowId || rowId < 2) {
    return HtmlService.createHtmlOutput(errorHTML('Error al guardar. Intentá de nuevo.'));
  }

  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

  // Solo escribe columnas G-P, nunca toca A-F (identidad e internos)
  const ig = p.instagram ? (p.instagram.startsWith('@') ? p.instagram : '@' + p.instagram) : '';
  sheet.getRange(rowId, 7).setValue(ig);
  sheet.getRange(rowId, 8).setValue(p.email       || '');
  sheet.getRange(rowId, 9).setValue(p.celular     || '');
  sheet.getRange(rowId, 10).setValue(p.foto_url   || '');
  sheet.getRange(rowId, 11).setValue(p.bio        || '');
  sheet.getRange(rowId, 12).setValue(p.proyecto   || '');  // Nombre ordenanza
  sheet.getRange(rowId, 13).setValue(p.area       || '');  // Área de la ordenanza
  sheet.getRange(rowId, 14).setValue(p.descripcion|| '');  // Descripción
  sheet.getRange(rowId, 15).setValue(p.ordenanza  || '');  // Link

  // Leer nombre y localidad para generar credenciales
  const fila = sheet.getRange(rowId, 1, 1, 4).getValues()[0];
  const nombreGuardado   = fila[3];
  const localidadGuardada= fila[1];

  // Enviar mail de bienvenida si tiene email
  if (p.email && p.ordenanza) {
    const creds = generarCredenciales(nombreGuardado, localidadGuardada);
    enviarBienvenida(p.email, nombreGuardado, creds.usuario, creds.clave, localidadGuardada);
  }

  return HtmlService.createHtmlOutput(exitoHTML(p.nombre || ''));
}

// ───────────────────────────────────────────────────────
//  HTML del formulario
// ───────────────────────────────────────────────────────
function formHTML(d) {
  const ini = d.nombre.trim().split(' ').filter(Boolean).slice(0,2).map(p => p[0]).join('').toUpperCase();
  const areaOpts = AREAS.map(a =>
    `<option value="${a}"${d.area === a ? ' selected' : ''}>${a}</option>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Mi perfil · Foro PS Santa Fe</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:system-ui,-apple-system,sans-serif;background:#0D0509;color:#fff;-webkit-font-smoothing:antialiased;background-image:radial-gradient(ellipse 80% 40% at 50% 0%,rgba(250,35,35,.22) 0%,transparent 70%),radial-gradient(ellipse 50% 30% at 100% 80%,rgba(196,18,48,.12) 0%,transparent 60%)}
.nav{background:#C41230;padding:1rem 1.25rem;display:flex;align-items:center;gap:.65rem;box-shadow:0 2px 20px rgba(196,18,48,.4)}
.escudo{width:30px;height:30px;background:rgba(255,255,255,.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.8rem;color:#fff;flex-shrink:0;border:1px solid rgba(255,255,255,.3)}
.nav strong{font-size:.82rem;display:block;color:#fff;font-weight:700}
.nav span{font-size:.68rem;color:rgba(255,255,255,.75);text-transform:uppercase;letter-spacing:.05em}
.id-card{background:rgba(196,18,48,.18);border:1px solid rgba(196,18,48,.4);border-left:4px solid #C41230;border-radius:12px;margin:1.25rem;padding:1rem 1.25rem;display:flex;align-items:center;gap:.9rem}
.avatar{width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#FA2323,#8B0A1F);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1.1rem;color:#fff;flex-shrink:0;border:2px solid rgba(255,255,255,.2)}
.id-info strong{display:block;font-size:.95rem;color:#fff;margin-bottom:.15rem}
.id-info .lugar{font-size:.72rem;color:rgba(255,255,255,.6)}
.badge{display:inline-block;background:#C41230;color:#fff;font-size:.62rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;padding:.2rem .6rem;border-radius:8px;margin-top:.3rem}
.card{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-top:2px solid rgba(196,18,48,.5);border-radius:14px;margin:1.25rem;padding:1.5rem}
.sec-title{font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#FA2323;margin-bottom:1rem;padding-bottom:.5rem;border-bottom:1px solid rgba(196,18,48,.2)}
.field{margin-bottom:1.1rem}
.field label{display:block;font-size:.75rem;font-weight:600;color:rgba(255,255,255,.65);margin-bottom:.4rem}
.field input,.field textarea,.field select{width:100%;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);border-radius:9px;padding:.7rem .9rem;color:#fff;font-family:inherit;font-size:.88rem;outline:none;transition:all .18s}
.field input:focus,.field textarea:focus,.field select:focus{border-color:#FA2323;background:rgba(250,35,35,.08);box-shadow:0 0 0 3px rgba(250,35,35,.12)}
.field input::placeholder,.field textarea::placeholder{color:rgba(255,255,255,.2)}
.field select option{background:#1A0C0F;color:#fff}
.field textarea{resize:vertical;min-height:85px;line-height:1.55}
.hint{font-size:.69rem;color:rgba(255,255,255,.35);margin-top:.3rem;line-height:1.4}
.prefix{position:relative}
.prefix .pre{position:absolute;left:.85rem;top:50%;transform:translateY(-50%);color:rgba(255,255,255,.4);font-size:.88rem;pointer-events:none}
.prefix input{padding-left:1.6rem}
.req{color:#FA2323}
.ordenanza-box{border:1.5px dashed rgba(250,35,35,.5);border-radius:10px;padding:1.25rem;background:rgba(250,35,35,.06)}
.ordenanza-box p{font-size:.8rem;color:rgba(255,255,255,.6);line-height:1.55}
.ordenanza-box strong{color:#fff}
.ordenanza-box a{color:#FA2323;font-weight:600}
.ordenanza-box input{margin-top:.85rem}
.btn{width:100%;background:#C41230;color:#fff;border:none;padding:1rem;border-radius:10px;font-size:.95rem;font-weight:700;cursor:pointer;font-family:inherit;transition:all .2s;letter-spacing:.02em;box-shadow:0 4px 20px rgba(196,18,48,.35)}
.btn:hover{background:#FA2323;transform:translateY(-1px);box-shadow:0 6px 24px rgba(250,35,35,.45)}
.footer{text-align:center;font-size:.7rem;color:rgba(255,255,255,.25);padding:1rem 1.25rem 2rem;line-height:1.6}
</style>
</head>
<body>

<nav class="nav">
  <div class="escudo">PS</div>
  <div>
    <strong>Foro Autoridades Locales</strong>
    <span>Concejales en acción · Santa Fe</span>
  </div>
</nav>

<div class="id-card">
  <div class="avatar">${ini}</div>
  <div class="id-info">
    <strong>${d.nombre}</strong>
    <div class="lugar">${d.localidad}${d.depto ? ' · ' + d.depto : ''}</div>
    <span class="badge">${d.cargo}</span>
  </div>
</div>

<form method="POST" action="${d.scriptUrl}">
  <input type="hidden" name="rowId" value="${d.rowId}">
  <input type="hidden" name="nombre" value="${d.nombre}">

  <div class="card">
    <div class="sec-title">Contacto público</div>

    <div class="field">
      <label>Instagram <span class="req">*</span></label>
      <div class="prefix">
        <span class="pre">@</span>
        <input type="text" name="instagram" value="${d.instagram}" placeholder="tu_instagram">
      </div>
    </div>

    <div class="field">
      <label>Email de contacto público <span class="req">*</span></label>
      <input type="email" name="email" value="${d.email}" placeholder="tu@email.com">
      <p class="hint">Te mandamos tu usuario y clave a este mail cuando guardés.</p>
    </div>

    <div class="field">
      <label>Celular / WhatsApp</label>
      <input type="tel" name="celular" value="${d.celular||''}" placeholder="Ej: 3413 123456">
      <p class="hint">Solo visible para los miembros del foro, no se publica.</p>
    </div>

    <div class="field">
      <label>Foto de perfil</label>
      <input type="url" name="foto_url" value="${d.fotoUrl}" placeholder="https://... (link a tu foto en Drive o Instagram)">
      <p class="hint">Pegá el link a una foto tuya. Puede ser de Google Drive (compartida) o de cualquier sitio.</p>
    </div>
  </div>

  <div class="card">
    <div class="sec-title">Tu perfil en el foro</div>

    <div class="field">
      <label>Bio breve <span class="req">*</span></label>
      <textarea name="bio" placeholder="Contanos quién sos y qué hacés en el Concejo. 2 o 3 oraciones.">${d.bio}</textarea>
    </div>
  </div>

  <div class="card">
    <div class="sec-title">📄 Subí una iniciativa al banco colectivo</div>
    <p style="font-size:.78rem;color:rgba(255,255,255,.45);margin-bottom:1.25rem;line-height:1.55;">
      Para activar tu perfil compartí al menos una <strong style="color:rgba(255,255,255,.75);">ordenanza, resolución o proyecto</strong> que hayas impulsado.
      Así todos aprendemos de lo que funciona en cada gobierno local.
    </p>

    <div class="field">
      <label>Nombre de la ordenanza o proyecto <span class="req">*</span></label>
      <input type="text" name="proyecto" value="${d.proyecto}" placeholder="Ej: Ordenanza de presupuesto participativo">
    </div>

    <div class="field">
      <label>¿A qué área pertenece? <span class="req">*</span></label>
      <select name="area">
        <option value="">Seleccioná el área temática...</option>
        ${areaOpts}
      </select>
      <p class="hint">Clasificala según el banco de iniciativas del foro.</p>
    </div>

    <div class="field">
      <label>Descripción breve</label>
      <textarea name="descripcion" style="min-height:65px" placeholder="¿Qué problema resuelve? ¿Por qué la impulsaste?">${d.descripcion||''}</textarea>
    </div>

    <div class="field">
      <label>Link al documento <span class="req">*</span></label>
      <input type="url" name="ordenanza" value="${d.ordenanza}" placeholder="https://drive.google.com/...">
      <p class="hint">Subí el archivo a Google Drive y pegá el link. Si es papel, sacale foto. <a href="https://drive.google.com" target="_blank" style="color:#E8192C;">Ir a Drive →</a></p>
    </div>
  </div>

  <div style="margin:0 1.25rem 1rem">
    <button type="submit" class="btn">Guardar mi perfil →</button>
  </div>
</form>

<p class="footer">
  Tu información es visible solo para los miembros del foro.<br>
  El sector interno y los datos de alineación <strong>nunca se publican</strong>.
</p>

</body>
</html>`;
}

// ───────────────────────────────────────────────────────
//  HTML de éxito
// ───────────────────────────────────────────────────────
function exitoHTML(nombre) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
body{font-family:system-ui,sans-serif;background:#0D0509;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;text-align:center}
.box{max-width:340px}
.icon{font-size:3rem;margin-bottom:1rem}
h2{font-size:1.35rem;margin-bottom:.5rem}
p{color:rgba(255,255,255,.5);font-size:.88rem;line-height:1.65;margin-top:.5rem}
.ok{display:inline-block;background:rgba(39,174,96,.12);border:1px solid rgba(39,174,96,.25);color:#7DC87D;padding:.4rem 1.1rem;border-radius:20px;font-size:.75rem;font-weight:600;margin-top:1.5rem;letter-spacing:.04em}
</style>
</head>
<body>
<div class="box">
  <div class="icon">✅</div>
  <h2>¡Perfil guardado!</h2>
  <p>Gracias ${nombre}.<br>Tus datos se actualizaron en el foro y pronto vas a ver tu perfil publicado.</p>
  <div class="ok">DATOS RECIBIDOS</div>
</div>
</body>
</html>`;
}

// ───────────────────────────────────────────────────────
//  Genera usuario y contraseña a partir del nombre y localidad
// ───────────────────────────────────────────────────────
function normalizar(texto) {
  return texto.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

function generarCredenciales(nombre, localidad) {
  const partes   = nombre.trim().split(/\s+/).filter(Boolean);
  const primero  = normalizar(partes[0]);
  const apellido = normalizar(partes[partes.length - 1]);
  const usuario  = primero + '.' + apellido;

  const locNorm  = normalizar(localidad.split(' ').slice(0, 2).join(''));
  const clave    = locNorm + '2026';

  return { usuario, clave };
}

// ───────────────────────────────────────────────────────
//  Envía el mail de bienvenida con credenciales
// ───────────────────────────────────────────────────────
function enviarBienvenida(email, nombre, usuario, clave, localidad) {
  const sitio = 'https://foro-ps.vercel.app'; // ← cambiá por la URL real cuando publiques

  const asunto = '✅ Tu perfil en el Foro PS Santa Fe está activo';

  const cuerpo = `Hola ${nombre},

Tu perfil en el Foro de Autoridades Locales del Partido Socialista de la Provincia de Santa Fe ya está activo.

Tus datos de acceso al sitio:

  Usuario:    ${usuario}
  Contraseña: ${clave}

Ingresá en: ${sitio}

Una vez adentro vas a poder ver el banco de iniciativas, la agenda, las capacitaciones y el directorio de concejales de toda la provincia.

La distancia entre la política y el sentir de la gente se cierra desde acá.

Foro Autoridades Locales · PS Santa Fe
autoridadeslocales@gmail.com`;

  try {
    MailApp.sendEmail(email, asunto, cuerpo);
  } catch(err) {
    Logger.log('Error enviando mail a ' + email + ': ' + err.message);
  }
}

// ───────────────────────────────────────────────────────
//  HTML de error
// ───────────────────────────────────────────────────────
function errorHTML(msg) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<style>
body{font-family:system-ui,sans-serif;background:#0D0509;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;text-align:center}
.box{max-width:320px}
.icon{font-size:2.5rem;margin-bottom:1rem}
h2{font-size:1.2rem;margin-bottom:.5rem}
p{color:rgba(255,255,255,.45);font-size:.85rem;line-height:1.6}
a{color:#E8192C}
</style>
</head>
<body>
<div class="box">
  <div class="icon">⚠️</div>
  <h2>Algo salió mal</h2>
  <p>${msg}<br><br>Escribinos a <a href="mailto:autoridadeslocales@gmail.com">autoridadeslocales@gmail.com</a></p>
</div>
</body>
</html>`;
}
