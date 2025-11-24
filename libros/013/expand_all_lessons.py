#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para expandir todas las 25 lecciones del libro 013
con contenido detallado y extenso
"""

import os
import json

# Base directory
BASE_DIR = "/Users/orlandoj.jaramillog./Documents/CLUB/circulos-main/libros/013/lecciones"
os.makedirs(BASE_DIR, exist_ok=True)

# HTML Template with enhanced styling
HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <style>
        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.8;
            color: #2c3e50;
            max-width: 900px;
            margin: 0 auto;
            padding: 30px;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }}
        .container {{
            background: white;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
        }}
        h1 {{
            color: #005BAA;
            text-align: center;
            margin-bottom: 30px;
            font-size: 2.5em;
            border-bottom: 4px solid #005BAA;
            padding-bottom: 20px;
        }}
        h2 {{
            color: #142b47;
            margin-top: 35px;
            margin-bottom: 20px;
            font-size: 1.8em;
            border-left: 5px solid #005BAA;
            padding-left: 20px;
        }}
        h3 {{
            color: #005BAA;
            margin-top: 25px;
            font-size: 1.4em;
        }}
        p {{
            margin-bottom: 20px;
            text-align: justify;
            line-height: 1.9;
        }}
        .highlight {{
            background: linear-gradient(120deg, #e6f3ff 0%, #f0f8ff 100%);
            padding: 25px;
            border-left: 6px solid #005BAA;
            margin: 30px 0;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }}
        .quote {{
            background: #f8f9fa;
            border-left: 5px solid #142b47;
            padding: 20px 25px;
            margin: 25px 0;
            font-style: italic;
            color: #555;
            font-size: 1.15em;
            border-radius: 5px;
        }}
        .example {{
            background: linear-gradient(120deg, #fff8e1 0%, #fffbf0 100%);
            padding: 25px;
            border-radius: 8px;
            margin: 25px 0;
            border-left: 5px solid #ffc107;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }}
        .exercise {{
            background: linear-gradient(120deg, #e8f5e9 0%, #f1f8f4 100%);
            padding: 30px;
            border-radius: 8px;
            margin: 30px 0;
            border-left: 5px solid #4caf50;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }}
        .exercise h3 {{
            color: #2e7d32;
            margin-top: 0;
        }}
        ul, ol {{
            margin-bottom: 20px;
            padding-left: 35px;
        }}
        li {{
            margin-bottom: 15px;
            line-height: 1.7;
        }}
        strong {{
            color: #142b47;
            font-weight: 600;
        }}
        .key-point {{
            background: #fff3cd;
            padding: 15px 20px;
            border-left: 4px solid #ff9800;
            margin: 20px 0;
            border-radius: 5px;
        }}
        table {{
            width: 100%;
            border-collapse: collapse;
            margin: 25px 0;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }}
        th {{
            background-color: #005BAA;
            color: white;
            padding: 15px;
            text-align: left;
            font-weight: 600;
        }}
        td {{
            padding: 12px 15px;
            border: 1px solid #ddd;
        }}
        tr:nth-child(even) {{
            background-color: #f8f9fa;
        }}
        .icon {{
            font-size: 1.3em;
            margin-right: 10px;
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>{title}</h1>
        {content}
    </div>
</body>
</html>"""

# Import lesson content from separate file
from lesson_content import get_all_lessons

def create_lesson_file(filename, title, content):
    """Create a single lesson HTML file"""
    file_path = os.path.join(BASE_DIR, filename)
    html_content = HTML_TEMPLATE.format(title=title, content=content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    return filename

def main():
    """Main function to create all lessons"""
    print("=" * 60)
    print("Expandiendo las 25 lecciones del libro 013")
    print("Los 7 Hábitos de la Gente Altamente Efectiva")
    print("=" * 60)
    print()
    
    lessons = get_all_lessons()
    
    created_count = 0
    for lesson in lessons:
        try:
            filename = create_lesson_file(
                lesson['filename'],
                lesson['title'],
                lesson['content']
            )
            print(f"✓ Creado: {filename}")
            created_count += 1
        except Exception as e:
            print(f"✗ Error en {lesson['filename']}: {str(e)}")
    
    print()
    print("=" * 60)
    print(f"Proceso completado: {created_count}/{len(lessons)} lecciones creadas")
    print("=" * 60)

if __name__ == "__main__":
    main()
