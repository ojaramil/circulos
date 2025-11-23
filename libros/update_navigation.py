#!/usr/bin/env python3
"""
Script para agregar navegación "Volver a la Biblioteca" a todos los libros
"""

import os
import re
from pathlib import Path

def update_navigation(file_path):
    """Actualiza la navegación en un archivo pantalla_principal.html"""
    
    try:
        # Leer el archivo
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Crear backup
        backup_path = str(file_path) + '.backup'
        with open(backup_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        # Patrón para encontrar la sección <nav>...</nav>
        nav_pattern = r'<nav>.*?</nav>'
        
        # Nueva navegación
        new_nav = '''<nav>
      <a href="../index2.html" style="display: flex; align-items: center; gap: 0.5rem;"><span style="font-size: 1.2rem;">📚</span> Volver a la Biblioteca</a>
      <a href="#">Siguiente Libro <span class="arrow-down">▼</span></a>
    </nav>'''
        
        # Reemplazar
        updated_content = re.sub(nav_pattern, new_nav, content, flags=re.DOTALL)
        
        # Verificar que se hizo el cambio
        if updated_content != content:
            # Guardar el archivo actualizado
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(updated_content)
            return True
        else:
            print(f"  ⚠️  No se encontró <nav> en {file_path}")
            return False
            
    except Exception as e:
        print(f"  ✗ Error procesando {file_path}: {e}")
        return False

def main():
    """Función principal"""
    base_dir = Path(__file__).parent
    updated_count = 0
    failed_count = 0
    
    print("Actualizando navegación en libros 001-040...\n")
    
    for i in range(1, 41):
        folder = f"{i:03d}"
        file_path = base_dir / folder / "pantalla_principal.html"
        
        if file_path.exists():
            print(f"Procesando {folder}/pantalla_principal.html...")
            if update_navigation(file_path):
                print(f"  ✓ Actualizado correctamente")
                updated_count += 1
            else:
                failed_count += 1
        else:
            print(f"✗ No existe {folder}/pantalla_principal.html")
            failed_count += 1
    
    print(f"\n{'='*50}")
    print(f"Proceso completado:")
    print(f"  ✓ Actualizados: {updated_count}")
    print(f"  ✗ Fallidos: {failed_count}")
    print(f"  📁 Backups creados con extensión .backup")
    print(f"{'='*50}")

if __name__ == "__main__":
    main()
