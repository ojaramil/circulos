#!/bin/bash

# Script para agregar botón "Volver a la Biblioteca" a todos los libros

for i in {001..040}; do
    file="${i}/pantalla_principal.html"
    
    if [ -f "$file" ]; then
        echo "Procesando $file..."
        
        # Crear backup
        cp "$file" "${file}.backup"
        
        # Buscar la línea que contiene <nav> y reemplazar su contenido
        # Usamos sed para reemplazar la sección de navegación
        sed -i '' '/<nav>/,/<\/nav>/ {
            /<nav>/!{
                /<\/nav>/!d
            }
            /<nav>/a\
      <a href="../index2.html" style="display: flex; align-items: center; gap: 0.5rem;"><span style="font-size: 1.2rem;">📚</span> Volver a la Biblioteca</a>\
      <a href="#">Siguiente Libro <span class="arrow-down">▼</span></a>
        }' "$file"
        
        echo "✓ Actualizado $file"
    else
        echo "✗ No existe $file"
    fi
done

echo ""
echo "¡Proceso completado!"
echo "Se crearon backups con extensión .backup"
