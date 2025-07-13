(function() {
  const myths = [
    {
      s: "La pobreza extrema ha aumentado en los últimos 50 años.",
      answer: false,
      exp: "Falso. La pobreza extrema ha disminuido drásticamente en las últimas décadas."
    },
    {
      s: "La esperanza de vida mundial ha aumentado en el último siglo.",
      answer: true,
      exp: "Verdadero. La esperanza de vida global ha crecido gracias a avances médicos y sociales."
    },
    {
      s: "La mayoría de los niños en el mundo asisten a la escuela primaria.",
      answer: true,
      exp: "Verdadero. El acceso a la educación primaria es mayor que nunca."
    },
    {
      s: "Las guerras son más frecuentes ahora que antes.",
      answer: false,
      exp: "Falso. El número de guerras y muertes por conflictos ha disminuido en términos relativos."
    },
    {
      s: "La innovación tecnológica ha mejorado la calidad de vida.",
      answer: true,
      exp: "Verdadero. La tecnología ha traído mejoras en salud, comunicación y bienestar."
    },
    {
      s: "La mortalidad infantil ha aumentado en el mundo.",
      answer: false,
      exp: "Falso. La mortalidad infantil ha disminuido notablemente en las últimas décadas." 
    },
    {
      s: "El acceso al agua potable es menor que nunca.",
      answer: false,
      exp: "Falso. Más personas que nunca tienen acceso a agua potable segura." 
    },
    {
      s: "La alfabetización mundial ha mejorado en el último siglo.",
      answer: true,
      exp: "Verdadero. La tasa de alfabetización global ha aumentado significativamente." 
    },
    {
      s: "La cooperación internacional ha permitido erradicar enfermedades.",
      answer: true,
      exp: "Verdadero. Ejemplo: la viruela fue erradicada gracias a la cooperación global." 
    },
    {
      s: "El acceso a internet ha disminuido en los últimos años.",
      answer: false,
      exp: "Falso. El acceso a internet sigue creciendo en todo el mundo." 
    },
    {
      s: "La energía renovable es cada vez más accesible.",
      answer: true,
      exp: "Verdadero. El costo de la energía solar y eólica ha bajado y su uso crece." 
    },
    {
      s: "La violencia global ha aumentado en el siglo XXI.",
      answer: false,
      exp: "Falso. La violencia y los homicidios han disminuido en términos relativos." 
    },
    {
      s: "La innovación solo beneficia a los países ricos.",
      answer: false,
      exp: "Falso. Muchas innovaciones han mejorado la vida en países en desarrollo." 
    },
    {
      s: "El cambio climático no tiene solución.",
      answer: false,
      exp: "Falso. Hay avances tecnológicos y acuerdos internacionales para combatirlo." 
    },
    {
      s: "La educación universitaria es menos accesible que antes.",
      answer: false,
      exp: "Falso. El acceso a la educación superior ha crecido globalmente." 
    },
    {
      s: "La esperanza de vida en África ha disminuido.",
      answer: false,
      exp: "Falso. La esperanza de vida en África ha aumentado en las últimas décadas." 
    },
    {
      s: "La innovación médica ha permitido erradicar enfermedades mortales.",
      answer: true,
      exp: "Verdadero. Ejemplo: la viruela y avances en vacunas." 
    },
    {
      s: "El acceso a la electricidad es universal.",
      answer: false,
      exp: "Falso. Aunque ha mejorado, aún hay regiones sin acceso, pero la tendencia es positiva." 
    },
    {
      s: "La igualdad de género ha avanzado globalmente.",
      answer: true,
      exp: "Verdadero. Hay más acceso de mujeres a educación y trabajo que nunca." 
    },
    {
      s: "La cooperación internacional no tiene impacto en la ciencia.",
      answer: false,
      exp: "Falso. La ciencia avanza más rápido gracias a la colaboración global." 
    },
    {
      s: "El optimismo racional se basa en datos y evidencia, no en ignorar los problemas.",
      answer: true,
      exp: "Verdadero. El optimismo racional reconoce los desafíos, pero confía en la capacidad de resolverlos." 
    }
  ];
  let current = 0, score = 0;
  function renderMyth() {
    if (current < myths.length) {
      document.getElementById('statement').textContent = myths[current].s;
      document.getElementById('result').textContent = '';
    } else {
      document.getElementById('statement').textContent = '';
      document.getElementById('result').textContent = `¡Puntaje final: ${score} de ${myths.length}!`;
    }
  }
  function choose(val) {
    if (current < myths.length) {
      if (val === myths[current].answer) {
        score++;
        document.getElementById('result').textContent = '¡Correcto! ' + myths[current].exp;
      } else {
        document.getElementById('result').textContent = 'Incorrecto. ' + myths[current].exp;
      }
      setTimeout(() => { current++; renderMyth(); }, 1800);
    }
  }
  window.choose = choose;
  renderMyth();
})(); 