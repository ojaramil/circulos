#!/bin/bash

echo "🚀 Iniciando servidor web local..."
echo "📁 Directorio actual: $(pwd)"
echo ""
echo "🌐 El sitio estará disponible en:"
echo "   http://localhost:8000"
echo ""
echo "📚 Páginas principales:"
echo "   - Círculos: http://localhost:8000/circulos/landing-circulos.html"
echo "   - Club de Lectura: http://localhost:8000/circulos/circulo-lectura.html"
echo "   - Marketing: http://localhost:8000/circulos/circulo-marketing.html"
echo ""
echo "⚠️  Para detener el servidor, presiona Ctrl+C"
echo ""

# Verificar si Python está disponible
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    python -m http.server 8000
else
    echo "❌ Error: Python no está instalado"
    echo "💡 Instala Python desde: https://www.python.org/downloads/"
    exit 1
fi 