import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const projectRoot = process.cwd();
const policyPath = path.join(projectRoot, 'language-policy.json');
const policy = JSON.parse(fs.readFileSync(policyPath, 'utf8'));
const includeOutput = process.argv.includes('--include-dist');
const errors = [];

const ignoredDirectories = new Set(policy.scan.ignoredDirectories);
const ignoredFiles = new Set(policy.scan.ignoredFiles.map((file) => path.normalize(file)));
const allowedExtensions = new Set(policy.scan.extensions);

function relative(filePath) {
  return path.relative(projectRoot, filePath).split(path.sep).join('/');
}

function compile(pattern) {
  return new RegExp(pattern, 'giu');
}

function shouldSkip(filePath) {
  const rel = relative(filePath);
  if (ignoredFiles.has(path.normalize(rel))) return true;
  if (!includeOutput && (rel === 'dist' || rel.startsWith('dist/'))) return true;
  const parts = rel.split('/');
  if (parts.some((part) => ignoredDirectories.has(part))) return true;
  return !allowedExtensions.has(path.extname(filePath).toLowerCase());
}

function addMatchErrors(filePath, content) {
  const rel = relative(filePath);
  const allRules = [
    ...policy.blockedPatterns.map((rule) => ({ ...rule, category: 'bloqueo' })),
    ...policy.regionalPatterns.map((rule) => ({ ...rule, category: 'vocabulario' }))
  ];

  for (const rule of allRules) {
    const matcher = compile(rule.pattern);
    for (const match of content.matchAll(matcher)) {
      const before = content.slice(0, match.index);
      const line = before.split('\n').length;
      const column = match.index - before.lastIndexOf('\n');
      errors.push(`${rel}:${line}:${column} · ${rule.category} · ${rule.message}`);
    }
  }
}

function inspectPath(filePath) {
  const rel = relative(filePath);
  for (const rule of policy.blockedPatterns) {
    if (compile(rule.pattern).test(rel)) {
      errors.push(`${rel} · nombre o ruta · ${rule.message}`);
    }
  }
}

function inspectFile(filePath) {
  const rel = relative(filePath);
  const parts = rel.split('/');
  if (parts.some((part) => ignoredDirectories.has(part))) return;
  if (!includeOutput && (rel === 'dist' || rel.startsWith('dist/'))) return;
  inspectPath(filePath);
  if (shouldSkip(filePath)) return;
  let content;
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch {
    return;
  }
  addMatchErrors(filePath, content);
}

function walk(directory) {
  if (!fs.existsSync(directory)) return;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (!ignoredDirectories.has(entry.name)) {
        inspectPath(entryPath);
        walk(entryPath);
      }
    } else if (entry.isFile()) {
      inspectFile(entryPath);
    }
  }
}

for (const directory of policy.scan.directories) {
  if (directory === 'dist' && !includeOutput) continue;
  walk(path.join(projectRoot, directory));
}

for (const file of policy.scan.files) {
  inspectFile(path.join(projectRoot, file));
}

const indexPath = path.join(projectRoot, 'index.html');
if (fs.existsSync(indexPath)) {
  const index = fs.readFileSync(indexPath, 'utf8');
  if (!/<html[^>]+\blang=["']es-CO["']/iu.test(index)) {
    errors.push('index.html · configuración · El documento raíz debe declarar lang="es-CO".');
  }
}

const manifestPath = path.join(projectRoot, 'guide.manifest.json');
if (fs.existsSync(manifestPath)) {
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    if (manifest.guide?.language !== policy.locale) {
      errors.push(`guide.manifest.json · configuración · El idioma debe ser ${policy.locale}.`);
    }
  } catch {
    errors.push('guide.manifest.json · formato · No se pudo leer el manifiesto para comprobar el idioma.');
  }
}

if (errors.length > 0) {
  console.error('Validación de lenguaje es-CO: FALLÓ');
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Validación de lenguaje es-CO: OK (${includeOutput ? 'fuentes y salida' : 'fuentes'})`);
}
