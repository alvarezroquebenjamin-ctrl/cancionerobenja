(function($) {

  // Función para determinar si una línea es de acordes
  var isChordLine = function(line) {
    return /(\bDO|\bRE|\bMI|\bFA|\bSOL|\bLA|\bSI)[b#]?/.test(line);
  };

  // Función para ocultar/mostrar acordes
  function toggleChords() {
    $('#letra span').each(function() {
      var lineText = $(this).text();
      if (isChordLine(lineText)) {
        $(this).toggle(); // Alterna la visibilidad del elemento
      }
    });
  }

  // Asociar la función al evento de clic del botón
  $('#toggleChordsButton').click(function() {
    toggleChords();
  });

  $.fn.transpose = function(options) {
    var opts = $.extend({}, $.fn.transpose.defaults, options);
    
    var currentKey = null;
    
    var keys = [
      { name: 'LAb',  value: 0,   type: 'F' },
      { name: 'LA',   value: 1,   type: 'N' },
      { name: 'LA#',  value: 2,   type: 'S' },
      { name: 'SIb',  value: 2,   type: 'F' },
      { name: 'SI',   value: 3,   type: 'N' },
      { name: 'DO',   value: 4,   type: 'N' },
      { name: 'DO#',  value: 5,   type: 'S' },
      { name: 'REb',  value: 5,   type: 'F' },
      { name: 'RE',   value: 6,   type: 'N' },
      { name: 'RE#',  value: 7,   type: 'S' },
      { name: 'MIb',  value: 7,   type: 'F' },
      { name: 'MI',   value: 8,   type: 'N' },
      { name: 'FA',   value: 9,   type: 'N' },
      { name: 'FA#',  value: 10,  type: 'S' },
      { name: 'SOLb',  value: 10,  type: 'F' },
      { name: 'SOL',   value: 11,  type: 'N' },
      { name: 'SOL#',  value: 0,   type: 'S' }
    ];
  
    var getKeyByName = function (name) {
        if (name.charAt(name.length-1) == "m") {
          name = name.substring(0, name.length-1);
        }
        for (var i = 0; i < keys.length; i++) {
            if (name == keys[i].name) {
                return keys[i];
            }
        }
    };

    var getChordRoot = function (input) {
        var ind = 2;
        console.log("getChordRoot: "+input);
        if(input.substring(0,2)=="SO"){
            ind=3;}
        if (input.length > ind && (input.charAt(ind) == "b" || input.charAt(ind) == "#"))
            return input.substr(0, ind+1);
        else
            return input.substr(0, ind);
    };

    var getNewKey = function (oldKey, delta, targetKey) {
        console.log("oldKey: "+oldKey + " - delta: " + delta);
        var keyValue = getKeyByName(oldKey).value + delta;
        console.log(keyValue);
        if (keyValue > 11) {
            keyValue -= 12;
        } else if (keyValue < 0) {
            keyValue += 12;
        }
        
        var i=0;
        if (keyValue == 0 || keyValue == 2 || keyValue == 5 || keyValue == 7 || keyValue == 10) {
            // Return the Flat or Sharp Key
            switch(targetKey.name) {
              case "LA":
              case "LA#":
              case "SI":
              case "DO":
              case "DO#":
              case "RE":
              case "RE#":
              case "MI":
              case "FA#":
              case "SOL":
              case "SOL#":
                  for (;i<keys.length;i++) {
                    if (keys[i].value == keyValue && keys[i].type == "S") {
                      return keys[i];
                    }
                  }
              default:
                  for (;i<keys.length;i++) {
                    if (keys[i].value == keyValue && keys[i].type == "F") {
                      return keys[i];
                    }
                  }
            }
        }
        else {
            // Return the Natural Key
            for (;i<keys.length;i++) {
              if (keys[i].value == keyValue) {
                return keys[i];
              }
            }
        }
    };

    var getChordType = function (key) {
        switch (key.charAt(key.length - 1)) {
            case "b":
                return "F";
            case "#":
                return "S";
            default:
              return "N";
        }
    };

    var getDelta = function (oldIndex, newIndex) {
        if (oldIndex > newIndex)
            return 0 - (oldIndex - newIndex);
        else if (oldIndex < newIndex)
            return 0 + (newIndex - oldIndex);
        else
            return 0;
    };

    var transposeSong = function (target, key) {
        var newKey = getKeyByName(key);

        if (currentKey.name == newKey.name) {
          return;
        }

        var delta = getDelta(currentKey.value, newKey.value);
        
        $("span.c", target).each(function (i, el) {
            transposeChord(el, delta, newKey);
        });
        
        currentKey = newKey;
    };

    // ---- ESPACIADO INTELIGENTE SOLO EN LA FUNCIÓN DE TRANSPOSICIÓN ----
    var transposeChord = function (selector, delta, targetKey) {
        var el = $(selector);

        // Guardar longitud original del acorde + espacios a la derecha
        if (!el.data("orig-block-len")) {
            // Calcula cuántos espacios siguen al acorde en la línea original
            var next = el[0].nextSibling;
            var spaces = 0;
            if (next && next.nodeType === 3) { // nodo de texto
                var m = next.nodeValue.match(/^(\s+)/);
                if (m) spaces = m[1].length;
            }
            el.data("orig-block-len", el.text().length + spaces);
        }

        var originalBlockLen = el.data("orig-block-len");
        var oldChord = el.text();
        var oldChordRoot = getChordRoot(oldChord);
        var newChordRoot = getNewKey(oldChordRoot, delta, targetKey);
        var newChord = newChordRoot.name + oldChord.substr(oldChordRoot.length);

        // Calcular cuántos espacios se necesitan a la derecha
        var spacesNeeded = originalBlockLen - newChord.length;
        if (spacesNeeded < 0) spacesNeeded = 0;

        // Modificar el texto del acorde y los espacios a la derecha (en el nodo de texto siguiente)
        el.text(newChord);

        var next = el[0].nextSibling;
        if (next && next.nodeType === 3) {
            // Reemplaza los espacios por los nuevos
            next.nodeValue = " ".repeat(spacesNeeded) + next.nodeValue.replace(/^\s+/, "");
        } else if (spacesNeeded > 0) {
            // Si no hay nodo de texto, agrégalo
            el.after(document.createTextNode(" ".repeat(spacesNeeded)));
        }
    };

    var getNewWhiteSpaceLength = function (a, b, c) {
        if (a > b)
            return (c + (a - b));
        else if (a < b)
            return (c - (b - a));
        else
            return c;
    };

    var makeString = function (s, repeat) {
        var o = [];
        for (var i = 0; i < repeat; i++) o.push(s);
        return o.join("");
    }
    
    // Función para determinar si una línea es de acordes
    var isChordLine = function(line) {
        return /(\bDO|\bRE|\bMI|\bFA|\bSOL|\bLA|\bSI)[b#]?/.test(line);
    };

    var wrapChords = function (input) {
        return input.replace(opts.chordReplaceRegex, "<span class='c'>$1</span>");
    };
    
    return $(this).each(function() {
    
      var startKey = $(this).attr("data-key");
      if (!startKey || $.trim(startKey) == "") {
        startKey = opts.key;
      }

      if (!startKey || $.trim(startKey) == "") {
        throw("Starting key not defined.");
        return this;
      }
      
      currentKey = getKeyByName(startKey);

      // Build tranpose links ===========================================
      var keyLinks = [];
      $(keys).each(function(i, key) {
          if (currentKey.name == key.name)
              keyLinks.push("<a href='#' class='selected'>" + key.name + "</a>");
          else
              keyLinks.push("<a href='#'>" + key.name + "</a>");
      });

      var $this = $(this);
      var keysHtml = $("<div class='transpose-keys justify-content-md-center'></div>");
      keysHtml.html(keyLinks.join(""));
      $("a", keysHtml).click(function(e) {
          e.preventDefault();
          transposeSong($this, $(this).html());
          $(".transpose-keys a").removeClass("selected");
          $(this).addClass("selected");
          return false;
      });
      
      $(this).before(keysHtml);

      var output = [];
      var lines = $(this).html().split("\n");
      var line, tmp = "";

      for (var i = 0; i < lines.length; i++) {
          line = lines[i];

          if (isChordLine(line))
              output.push("<span>" + wrapChords(line) + "</span>");
          else
              output.push("<span>" + line + "</span>");
      };

      $(this).html(output.join("\n"));
    });
  };



  $.fn.transpose.defaults = {
    chordRegex: /^(\bDO|\bRE|\bMI|\bFA|\bSOL|\bLA|\bSI)[b\#]?(2|4|5|6|7|9|11|13|6\/9|7\-5|7\-9|7\#5|7\#9|7\+5|7\+9|7b5|7b9|7sus2|7sus4|add2|add4|add9|aug|°|dim|Ø|dim7|mb5|m7b5|m\/maj7|m6|m7|m7b5|m9|m11|m13|maj7|maj9|maj11|maj13|m|sus|sus2|sus4)*(\/[A-G][b\#]*)*$/,
    chordReplaceRegex: /((\bDO|\bRE|\bMI|\bFA|\bSOL|\bLA|\bSI)[b\#]?(2|4|5|6|7|9|11|13|6\/9|7\-5|7\-9|7\#5|7\#9|7\+5|7\+9|7b5|7b9|7sus2|7sus4|add2|add4|add9|aug|°|dim|Ø|dim7|mb5|m7b5|m\/maj7|m6|m7|m7b5|m9|m11|m13|maj7|maj9|maj11|maj13|m|sus|sus2|sus4)*)/g
  };


$(function() {
        $(".btn").show();
        $("#letra").transpose();
        
    });    
    
})(jQuery);

// Función que se llama cada vez que se presiona una tecla en el buscador
function filtrarCanciones() {
    // 1. Tomar lo que escribió el usuario en el cuadro de búsqueda
    let input = document.getElementById("searchInput");
    let filtro = input.value.toUpperCase(); // Lo ponemos en mayúsculas para no distinguir entre mayús/minús

    // 2. Localizar la lista de canciones
    let ul = document.getElementById("lista-canciones");

    // 3. Obtener todos los elementos de la lista (cada canción)
    let li = ul.getElementsByTagName("li");

    // 4. Recorrer la lista, canción por canción
    for (let i = 0; i < li.length; i++) {
        
        // Obtener el nombre de la canción (el texto dentro del enlace <a>)
        let a = li[i].getElementsByTagName("a")[0];
        
        // Verificar si el nombre de la canción contiene lo que el usuario escribió
        if (a.innerHTML.toUpperCase().indexOf(filtro) > -1) {
            // Si sí lo contiene, mostrar la canción
            li[i].style.display = ""; 
        } else {
            // Si no lo contiene, ocultar la canción
            li[i].style.display = "none";
        }
    }
}

// ==================================================
// AUTOSCROLL CON NIVELES (1-10)
// ==================================================

document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. Variables de Estado ---
    let isScrolling = false;
    let speedLevel = 5;    // Velocidad inicial (1 a 10)
    let scrollInterval;

    // Función para calcular los milisegundos según el nivel (Matemática simple)
    // Nivel 1 = 100ms (Lento) | Nivel 10 = 10ms (Rápido)
    function getDelay() {
        return 110 - (speedLevel * 10);
    }

    // --- 2. Crear la Barra de Herramientas ---
    const toolbar = document.createElement("div");
    Object.assign(toolbar.style, {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: "1000",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        backgroundColor: "#0A2846", // Azul oscuro
        padding: "8px 12px",
        borderRadius: "50px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
        fontFamily: "sans-serif"
    });

    // --- 3. Estilos comunes para botones ---
    const btnStyle = {
        backgroundColor: "rgba(255,255,255,0.1)", // Transparente clarito
        border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: "50%",
        width: "32px",
        height: "32px",
        fontSize: "18px",
        cursor: "pointer",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.2s"
    };

    // --- 4. Crear Elementos (Botones y Display) ---

    // Botón Menos (-)
    const btnMinus = document.createElement("button");
    btnMinus.innerHTML = "−"; // Signo menos
    Object.assign(btnMinus.style, btnStyle);

    // Display del Número (1-10)
    const speedDisplay = document.createElement("span");
    speedDisplay.innerText = speedLevel;
    Object.assign(speedDisplay.style, {
        color: "white",
        fontWeight: "bold",
        fontSize: "18px",
        minWidth: "25px",
        textAlign: "center"
    });

    // Botón Más (+)
    const btnPlus = document.createElement("button");
    btnPlus.innerHTML = "+";
    Object.assign(btnPlus.style, btnStyle);

    // Separador visual
    const separator = document.createElement("div");
    Object.assign(separator.style, {
        width: "1px",
        height: "25px",
        backgroundColor: "rgba(255,255,255,0.3)",
        margin: "0 5px"
    });

    // Botón PLAY / PAUSA (Más grande y destacado)
    const btnPlay = document.createElement("button");
    btnPlay.innerHTML = "▶";
    Object.assign(btnPlay.style, btnStyle);
    // Sobrescribimos estilos específicos para el Play
    Object.assign(btnPlay.style, {
        backgroundColor: "#f8f9fa", // Blanco
        color: "#0A2846", // Icono azul
        width: "42px",
        height: "42px",
        fontSize: "20px",
        marginLeft: "5px",
        border: "none"
    });

    // --- 5. Armar la barra ---
    toolbar.appendChild(btnMinus);
    toolbar.appendChild(speedDisplay);
    toolbar.appendChild(btnPlus);
    toolbar.appendChild(separator);
    toolbar.appendChild(btnPlay);
    document.body.appendChild(toolbar);

    // --- 6. Lógica de Scroll ---

    function startScroll() {
        clearInterval(scrollInterval); // Limpiar anterior
        const delay = getDelay();
        
        scrollInterval = setInterval(() => {
            // Check si llegamos al final
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                stopScroll();
            } else {
                window.scrollBy(0, 1); // Baja 1 pixel
            }
        }, delay);
    }

    function stopScroll() {
        clearInterval(scrollInterval);
        isScrolling = false;
        btnPlay.innerHTML = "▶";
        btnPlay.style.backgroundColor = "#f8f9fa"; // Blanco
        btnPlay.style.color = "#0A2846"; // Azul
    }

    function updateSpeedDisplay() {
        speedDisplay.innerText = speedLevel;
    }

    // --- 7. Eventos (Clics) ---

    // Botón Play
    btnPlay.addEventListener("click", function() {
        if (isScrolling) {
            stopScroll();
        } else {
            isScrolling = true;
            btnPlay.innerHTML = "⏸";
            btnPlay.style.backgroundColor = "#dc3545"; // Rojo
            btnPlay.style.color = "white";
            startScroll();
        }
    });

    // Botón Menos
    btnMinus.addEventListener("click", function() {
        if (speedLevel > 1) {
            speedLevel--;
            updateSpeedDisplay();
            if (isScrolling) startScroll(); // Actualizar velocidad en vivo
        }
    });

    // Botón Más
    btnPlus.addEventListener("click", function() {
        if (speedLevel < 10) {
            speedLevel++;
            updateSpeedDisplay();
            if (isScrolling) startScroll(); // Actualizar velocidad en vivo
        }
    });
});

// ==================================================
// WAKE LOCK (EVITAR QUE SE APAGUE LA PANTALLA)
// ==================================================
document.addEventListener("DOMContentLoaded", async function() {
    if ('wakeLock' in navigator) {
        try {
            let wakeLock = null;
            const requestWakeLock = async () => {
                try {
                    wakeLock = await navigator.wakeLock.request('screen');
                    console.log('Pantalla mantenida encendida');
                } catch (err) {
                    console.error(`${err.name}, ${err.message}`);
                }
            };
            // Solicitar bloqueo al cargar
            await requestWakeLock();
            
            // Si te vas de la app y volvés, solicitar de nuevo
            document.addEventListener('visibilitychange', async () => {
                if (wakeLock !== null && document.visibilityState === 'visible') {
                    await requestWakeLock();
                }
            });
        } catch (err) {
            console.log("El navegador no soporta Wake Lock");
        }
    }
});