// ═══════════════════════════════════════════════════════════════════════
// Code.gs — Red de Concejales PS · Santa Fe
// Google Apps Script backend
// ═══════════════════════════════════════════════════════════════════════

var SHEET_ID    = '16Y5BqzJauMD_DAbR0HZ3CFk9LhbYe234v3G-3D6-ZBw';
var SHEET_NAME  = 'Hoja 1';
var SITE_URL    = 'https://concejalesps.vercel.app';
var ADMIN_EMAIL = 'autoridadeslocales@gmail.com';

// ── ROUTER ──────────────────────────────────────────────────────────────
function doPost(e) {
  var p = e.parameter;

  // Formulario público "sumarse" desde la página principal
  if (p.tipo === 'sumarse') {
    return procesarSumarse(p);
  }

  // Formulario de perfil de concejales (existente)
  if (p.email && p.ordenanza) {
    return procesarPerfilConcejal(p);
  }

  return HtmlService.createHtmlOutput('<p>Solicitud no reconocida.</p>');
}

// ═══════════════════════════════════════════════════════════════════════
// NUEVO: Formulario público "Sumarme a la red"
// ═══════════════════════════════════════════════════════════════════════

function procesarSumarse(p) {
  var nombre    = (p.nombre   || '').trim();
  var localidad = (p.ciudad   || '').trim();
  var email     = (p.email    || '').trim();
  var telefono  = (p.telefono || '').trim();
  var cargo     = (p.cargo    || 'Autoridad local').trim();

  if (!nombre || !email) {
    return HtmlService.createHtmlOutput('<p>Faltan datos requeridos (nombre y email).</p>');
  }

  var creds = generarCredenciales(nombre, localidad);

  // Enviar bienvenida al solicitante
  try { enviarBienvenidaNuevo(email, nombre, localidad, cargo, creds.usuario, creds.clave); }
  catch (err) { Logger.log('Error mail bienvenida: ' + err.message); }

  // Notificar al admin
  try { notificarAdmin(nombre, localidad, cargo, telefono, email, creds.usuario, creds.clave); }
  catch (err) { Logger.log('Error mail admin: ' + err.message); }

  // Guardar en hoja "Solicitudes"
  try { registrarSolicitud(nombre, localidad, cargo, telefono, email, creds.usuario, creds.clave); }
  catch (err) { Logger.log('Error sheet: ' + err.message); }

  return HtmlService.createHtmlOutput('<p>OK</p>');
}

function enviarBienvenidaNuevo(email, nombre, localidad, cargo, usuario, clave) {
  var asunto = 'Bienvenidos a la Red de Autoridades Locales PS · Santa Fe';
  var primerNombre = nombre.trim().split(/\s+/)[0];
  var cuerpo =
    'Hola ' + primerNombre + ',\n\n' +
    'Tu solicitud para sumarte a la Red de Autoridades Locales del Partido Socialista de Santa Fe fue recibida.\n\n' +
    '---\n' +
    'Qué es esta red\n' +
    '---\n\n' +
    'Es un espacio de intercambio entre autoridades del PS en toda la provincia: intendentes, concejales ' +
    'y presidentes comunales. La idea es simple: la ordenanza que aprobaste en ' + (localidad || 'tu municipio') + ' ' +
    'puede ahorrarle semanas de trabajo a un colega de otra ciudad. Los problemas que enfrentamos ' +
    '—microbasurales, seguridad vial, empleo joven, accesibilidad— son los mismos en Reconquista ' +
    'y en Venado Tuerto. La red existe para que no tengamos que resolverlos solos.\n\n' +
    '---\n' +
    'Tus datos de acceso provisorios\n' +
    '---\n\n' +
    '  Usuario:     ' + usuario + '\n' +
    '  Contraseña:  ' + clave + '\n\n' +
    'Ingresá en: ' + SITE_URL + '\n\n' +
    'En los próximos días nos pondremos en contacto para confirmar tu incorporación.\n\n' +
    'Cualquier consulta respondé este correo o escribí a ' + ADMIN_EMAIL + '\n\n' +
    '—\n' +
    'Foro de Autoridades Locales · Partido Socialista Santa Fe\n' +
    'Red de Concejales\n' +
    ADMIN_EMAIL + '\n' +
    SITE_URL;

  MailApp.sendEmail(email, asunto, cuerpo);
}

function notificarAdmin(nombre, localidad, cargo, telefono, email, usuario, clave) {
  var asunto = 'Nueva solicitud de ingreso — ' + nombre + ' (' + (localidad || '?') + ')';
  var cuerpo =
    'Nueva solicitud de ingreso a la red:\n\n' +
    'Nombre:    ' + nombre    + '\n' +
    'Localidad: ' + localidad + '\n' +
    'Cargo:     ' + cargo     + '\n' +
    'Teléfono:  ' + (telefono || '(no informado)') + '\n' +
    'Email:     ' + email     + '\n\n' +
    'Credenciales generadas automáticamente:\n' +
    'Usuario:   ' + usuario + '\n' +
    'Clave:     ' + clave   + '\n\n' +
    'Acordate de agregar este usuario a login.html una vez que confirmes la incorporación.\n\n' +
    'URL del sitio: ' + SITE_URL;

  MailApp.sendEmail(ADMIN_EMAIL, asunto, cuerpo);
}

function registrarSolicitud(nombre, localidad, cargo, telefono, email, usuario, clave) {
  var ss    = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName('Solicitudes');
  if (!sheet) {
    sheet = ss.insertSheet('Solicitudes');
    sheet.appendRow(['Fecha', 'Nombre', 'Localidad', 'Cargo', 'Teléfono', 'Email', 'Usuario', 'Clave']);
  }
  sheet.appendRow([new Date(), nombre, localidad, cargo, telefono, email, usuario, clave]);
}

// ═══════════════════════════════════════════════════════════════════════
// EXISTENTE: Formulario de perfil de concejal
// ═══════════════════════════════════════════════════════════════════════

function procesarPerfilConcejal(p) {
  try {
    var sheet   = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var data    = sheet.getDataRange().getValues();
    var emailIdx = headers.indexOf('Email');

    var row = -1;
    for (var i = 1; i < data.length; i++) {
      if (String(data[i][emailIdx]).trim().toLowerCase() === p.email.trim().toLowerCase()) {
        row = i + 1; break;
      }
    }

    var fields = {
      'Nombre':    p.nombre,
      'Localidad': p.localidad,
      'Cargo':     p.cargo,
      'Teléfono': p.telefono,
      'Ordenanza': p.ordenanza,
      'Tema':      p.tema,
      'Bio':       p.bio,
      'Mandato':   p.mandato,
    };

    if (row === -1) {
      var newRow = headers.map(function(h) { return fields[h] !== undefined ? fields[h] : ''; });
      newRow[emailIdx] = p.email;
      sheet.appendRow(newRow);
    } else {
      Object.keys(fields).forEach(function(field) {
        var idx = headers.indexOf(field);
        if (idx !== -1 && fields[field] !== undefined) {
          sheet.getRange(row, idx + 1).setValue(fields[field]);
        }
      });
    }

    if (p.email && p.nombre && p.localidad) {
      var creds = generarCredenciales(p.nombre, p.localidad);
      enviarBienvenida(p.email, p.nombre, creds.usuario, creds.clave);
    }

    return HtmlService.createHtmlOutput('<p>Perfil guardado correctamente.</p>');
  } catch (err) {
    Logger.log('Error procesarPerfilConcejal: ' + err.message);
    return HtmlService.createHtmlOutput('<p>Error: ' + err.message + '</p>');
  }
}

function enviarBienvenida(email, nombre, usuario, clave) {
  var asunto = 'Tus datos de acceso — Red de Concejales PS Santa Fe';
  var cuerpo =
    'Hola ' + nombre.split(' ')[0] + ',\n\n' +
    'Tu perfil en la Red de Concejales PS Santa Fe fue completado.\n\n' +
    'Tus datos de acceso:\n\n' +
    '  Usuario:    ' + usuario + '\n' +
    '  Contraseña: ' + clave   + '\n\n' +
    'Ingresá en: ' + SITE_URL + '\n\n' +
    'Cualquier consulta escribí a ' + ADMIN_EMAIL + '\n\n' +
    '—\n' +
    'Red de Concejales PS · Santa Fe\n' +
    SITE_URL;
  try { MailApp.sendEmail(email, asunto, cuerpo); }
  catch (err) { Logger.log('Error enviarBienvenida: ' + err.message); }
}

// ── UTILS ────────────────────────────────────────────────────────────────
function normalizar(str) {
  return (str || '').toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

function generarCredenciales(nombre, localidad) {
  var partes   = nombre.trim().split(/\s+/).filter(Boolean);
  var primero  = normalizar(partes[0]);
  var apellido = normalizar(partes[partes.length - 1]);
  var usuario  = primero + '.' + apellido;
  var locNorm  = normalizar((localidad || '').split(' ').slice(0, 2).join(''));
  var clave    = locNorm + '2026';
  return { usuario: usuario, clave: clave };
}

function doGet() {
  return HtmlService.createHtmlOutput(
    '<h3>Red de Concejales PS · Santa Fe</h3><p>Endpoint activo. Usar POST para enviar datos.</p>'
  );
}
