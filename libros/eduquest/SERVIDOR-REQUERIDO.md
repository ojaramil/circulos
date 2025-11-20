# 🚨 Servidor HTTP Requerido

## Problema
EduQuest necesita un servidor HTTP para funcionar correctamente debido a las políticas de seguridad CORS de los navegadores.

## Solución Rápida

### 1. Abrir Terminal en la carpeta `libros`
```bash
cd /ruta/a/tu/carpeta/libros
```

### 2. Iniciar Servidor HTTP
```bash
# Opción 1: Python 3
python -m http.server 8000

# Opción 2: Python 2  
python -m SimpleHTTPServer 8000

# Opción 3: Node.js
npx http-server -p 8000
```

### 3. Abrir en Navegador
```
http://localhost:8000/eduquest/course-viewer.html?course=001
```

## Estructura de Carpetas Requerida
```
libros/
├── eduquest/           # Aplicación EduQuest
│   ├── course-viewer.html
│   ├── index.html
│   └── js/
├── 001/               # Curso 1
│   ├── pantalla_principal.html
│   ├── lecciones/
│   └── juegos/
├── 002/               # Curso 2
└── ...
```

## ¿Por qué es necesario?
- Los navegadores bloquean peticiones `fetch()` desde `file://`
- EduQuest necesita cargar contenido de diferentes carpetas
- Un servidor HTTP resuelve las restricciones CORS

## Alternativas
- **VS Code**: Usar extensión "Live Server"
- **Otros editores**: Buscar extensiones similares de servidor local
- **XAMPP/WAMP**: Si ya tienes instalado