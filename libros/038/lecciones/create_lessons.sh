#!/bin/bash
# Crear template para las lecciones restantes
template() {
  local num=$1
  local filename=$2
  local title=$3
  local icon=$4
  
  cat > "$filename.html" << TEMPLATE
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>$title</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.8;
      color: #2c3e50;
      max-width: 900px;
      margin: 0 auto;
      padding: 40px 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .container {
      background: white;
      padding: 40px;
      border-radius: 15px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    }
    h1 {
      color: #FF6B35;
      font-size: 2.5em;
      margin-bottom: 20px;
      text-align: center;
    }
    h2 {
      color: #667eea;
      border-bottom: 3px solid #FF6B35;
      padding-bottom: 10px;
      margin-top: 40px;
    }
    .highlight {
      background: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
      padding: 2px 8px;
      border-radius: 4px;
      font-weight: bold;
    }
    blockquote {
      border-left: 5px solid #FF6B35;
      padding-left: 20px;
      margin: 20px 0;
      font-style: italic;
      color: #555;
      background: #f9f9f9;
      padding: 20px;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>$icon $title</h1>
    
    <div class="section">
      <h2>Concepto Principal</h2>
      <p>En esta lección exploramos el concepto de $title y cómo aplicarlo a tu vida diaria para desarrollar una mentalidad de abundancia.</p>
    </div>

    <div class="section">
      <h2>Puntos Clave</h2>
      <ul>
        <li>Desarrolla una visión clara de lo que quieres lograr</li>
        <li>Mantén una mentalidad de abundancia incluso en tiempos difíciles</li>
        <li>Confía en que Dios tiene un plan de prosperidad para ti</li>
        <li>Toma acción consistente hacia tus objetivos</li>
      </ul>
    </div>

    <div class="section">
      <h2>Reflexión</h2>
      <blockquote>
        "Where there is no vision, the people perish."
      </blockquote>
      <p>¿Qué tipo de visión tienes para tu vida? ¿Estás pensando en abundancia o en escasez?</p>
    </div>
  </div>
</body>
</html>
TEMPLATE
}

# Crear todas las lecciones
template "08" "08_imagenes_interior" "Las Imágenes en tu Interior" "🎨"
template "09" "09_cambiar_cuadros" "Cambiar los Cuadros" "🖼️"
template "10" "10_preparar_tierra_abundancia" "Preparar la Tierra para Abundancia" "🌱"
template "11" "11_pierdas_nunca_vision" "Nunca Pierdas la Visión" "👁️"
template "12" "12_actualizar_expectativas" "Actualizar tus Expectativas" "📈"
template "13" "13_sueños_dios" "Los Sueños de Dios" "💫"
template "14" "14_derecho_abundancia" "Tu Derecho a la Abundancia" "⚖️"
template "15" "15_subir_niveles_superiores" "Subir a Niveles Superiores" "🌟"
template "16" "16_incrementar_poder" "Incrementar el Poder" "⚡"
template "17" "17_fuente_poder" "La Fuente del Poder" "🔥"
template "18" "18_cambiar_mentalidad_limitada" "Cambiar Mentalidad Limitada" "🔄"
template "19" "19_usar_poder_correctamente" "Usar el Poder Correctamente" "💪"
template "20" "20_ser_milagro" "Ser el Milagro de Alguien" "🙏"
template "21" "21_llamado_ser_bendicion" "Tu Llamado a Ser una Bendición" "💝"
template "22" "22_invertir_vidas" "Invertir en Vidas" "🤝"
template "23" "23_sembrar_abundancia" "Sembrar para Abundancia" "🌾"
template "24" "24_cadena_bendicion" "Una Cadena de Bendición" "⛓️"
template "25" "25_conclusion" "Conclusión" "🏁"

chmod +x create_lessons.sh
./create_lessons.sh
