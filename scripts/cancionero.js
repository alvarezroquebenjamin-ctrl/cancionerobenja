// =============================================================================
// 1. MÓDULO DE TRANSPOSICIÓN (JQUERY) - Lógica Musical
// =============================================================================
(function($) {
  var isChordLine = function(line) {
    return /(\bDO|\bRE|\bMI|\bFA|\bSOL|\bLA|\bSI)[b#]?/.test(line);
  };

  $.fn.transpose = function(options) {
    var opts = $.extend({}, $.fn.transpose.defaults, options);
    var currentKey = null;
    
    var keys = [
      { name: 'LAb', value: 0, type: 'F' }, { name: 'LA', value: 1, type: 'N' },
      { name: 'LA#', value: 2, type: 'S' }, { name: 'SIb', value: 2, type: 'F' },
      { name: 'SI', value: 3, type: 'N' }, { name: 'DO', value: 4, type: 'N' },
      { name: 'DO#', value: 5, type: 'S' }, { name: 'REb', value: 5, type: 'F' },
      { name: 'RE', value: 6, type: 'N' }, { name: 'RE#', value: 7, type: 'S' },
      { name: 'MIb', value: 7, type: 'F' }, { name: 'MI', value: 8, type: 'N' },
      { name: 'FA', value: 9, type: 'N' }, { name: 'FA#', value: 10, type: 'S' },
      { name: 'SOLb', value: 10, type: 'F' }, { name: 'SOL', value: 11, type: 'N' },
      { name: 'SOL#', value: 0, type: 'S' }
    ];
  
    var getKeyByName = function (name) {
        if (name.charAt(name.length-1) == "m") name = name.substring(0, name.length-1);
        for (var i = 0; i < keys.length; i++) { if (name == keys[i].name) return keys[i]; }
    };

    var getChordRoot = function (input) {
        var ind = 2;
        if(input.substring(0,2)=="SO") ind=3;
        if (input.length > ind && (input.charAt(ind) == "b" || input.charAt(ind) == "#")) return input.substr(0, ind+1);
        else return input.substr(0, ind);
    };

    var getNewKey = function (oldKey, delta, targetKey) {
        var keyValue = getKeyByName(oldKey).value + delta;
        if (keyValue > 11) keyValue -= 12; else if (keyValue < 0) keyValue += 12;
        
        var i=0;
        if (keyValue == 0 || keyValue == 2 || keyValue == 5 || keyValue == 7 || keyValue == 10) {
            switch(targetKey.name) {
              case "LA": case "LA#": case "SI": case "DO": case "DO#": case "RE": case "RE#": case "MI": case "FA#": case "SOL": case "SOL#":
                  for (;i<keys.length;i++) { if (keys[i].value == keyValue && keys[i].type == "S") return keys[i]; }
              default:
                  for (;i<keys.length;i++) { if (keys[i].value == keyValue && keys[i].type == "F") return keys[i]; }
            }
        } else {
            for (;i<keys.length;i++) { if (keys[i].value == keyValue) return keys[i]; }
        }
    };

    var getDelta = function (oldIndex, newIndex) {
        if (oldIndex > newIndex) return 0 - (oldIndex - newIndex);
        else if (oldIndex < newIndex) return 0 + (newIndex - oldIndex);
        else return 0;
    };

    var transposeSong = function (target, key) {
        var newKey = getKeyByName(key);
        if (currentKey.name == newKey.name) return;
        var delta = getDelta(currentKey.value, newKey.value);
        $("span.c", target).each(function (i, el) { transposeChord(el, delta, newKey); });
        currentKey = newKey;
    };

    var transposeChord = function (selector, delta, targetKey) {
        var el = $(selector);
        if (!el.data("orig-block-len")) {
            var next = el[0].nextSibling;
            var spaces = 0;
            if (next && next.nodeType === 3) {
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

        var spacesNeeded = originalBlockLen - newChord.length;
        if (spacesNeeded < 0) spacesNeeded = 0;

        el.text(newChord);
        var next = el[0].nextSibling;
        if (next && next.nodeType === 3) {
            next.nodeValue = " ".repeat(spacesNeeded) + next.nodeValue.replace(/^\s+/, "");
        } else if (spacesNeeded > 0) {
            el.after(document.createTextNode(" ".repeat(spacesNeeded)));
        }
    };

    var wrapChords = function (input) {
        return input.replace(opts.chordReplaceRegex, "<span class='c'>$1</span>");
    };
    
    return $(this).each(function() {
      var startKey = $(this).attr("data-key");
      if (!startKey || $.trim(startKey) == "") startKey = opts.key;
      if (!startKey || $.trim(startKey) == "") return this;
      
      currentKey = getKeyByName(startKey);

      var keyLinks = [];
      $(keys).each(function(i, key) {
          if (currentKey.name == key.name) keyLinks.push("<a href='#' class='selected'>" + key.name + "</a>");
          else keyLinks.push("<a href='#'>" + key.name + "</a>");
      });

      var $this = $(this);
      var keysHtml = $("<div class='transpose-keys justify-content-md-center' style='margin-bottom:20px;'></div>");
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
      var line;
      for (var i = 0; i < lines.length; i++) {
          line = lines[i];
          if (isChordLine(line)) output.push("<span>" + wrapChords(line) + "</span>");
          else output.push("<span>" + line + "</span>");
      };
      $(this).html(output.join("\n"));
    });
  };

  $.fn.transpose.defaults = {
    chordRegex: /^(\bDO|\bRE|\bMI|\bFA|\bSOL|\bLA|\bSI)[b\#]?(2|4|5|6|7|9|11|13|6\/9|7\-5|7\-9|7\#5|7\#9|7\+5|7\+9|7b5|7b9|7sus2|7sus4|add2|add4|add9|aug|°|dim|Ø|dim7|mb5|m7b5|m\/maj7|m6|m7|m7b5|m9|m11|m13|maj7|maj9|maj11|maj13|m|sus|sus2|sus4)*(\/[A-G][b\#]*)*$/,
    chordReplaceRegex: /((\bDO|\bRE|\bMI|\bFA|\bSOL|\bLA|\bSI)[b\#]?(2|4|5|6|7|9|11|13|6\/9|7\-5|7\-9|7\#5|7\#9|7\+5|7\+9|7b5|7b9|7sus2|7sus4|add2|add4|add9|aug|°|dim|Ø|dim7|mb5|m7b5|m\/maj7|m6|m7|m7b5|m9|m11|m13|maj7|maj9|maj11|maj13|m|sus|sus2|sus4)*)/g
  };

  $(function() {
      if($("#letra").length > 0) {
        $("#letra").transpose();
      }
  });    
    
})(jQuery);


// =============================================================================
// 2. SÚPER MENÚ FLOTANTE Y ESTILOS GLOBALES
// =============================================================================
document.addEventListener("DOMContentLoaded", function() {

    const style = document.createElement('style');
    style.innerHTML = `
        /* =======================================================
           1. AJUSTES NAVBAR MÓVIL
           ======================================================= */
        @media (max-width: 768px) {
            .navbar-toggler { display: none !important; }
            .navbar-collapse, .collapse {
                display: flex !important;
                flex-basis: auto !important;
                align-items: center !important;
                width: 100% !important;
                justify-content: space-between !important;
            }
            .navbar-nav {
                flex-direction: row !important;
                gap: 5px;
            }
            .nav-item, .dropdown, .nav-link, .dropdown-toggle {
                font-size: 13px !important;
                padding-left: 5px !important;
                padding-right: 5px !important;
            }
            #inputGlobal, .form-control {
                width: 110px !important; 
                font-size: 13px !important;
                height: 30px !important;
                padding: 2px 5px !important;
            }
            .container, .container-fluid, .navbar {
                padding-left: 5px !important;
                padding-right: 5px !important;
            }
            .navbar-nav .dropdown-menu {
                position: absolute !important; 
                float: none !important;
                top: 100% !important;
                left: 0 !important;
                margin-top: 5px !important;
                background-color: white;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                width: auto !important;
                min-width: 180px;
                z-index: 10000 !important;
            }
            .navbar, .navbar-collapse {
                overflow: visible !important;
            }
        }

        /* =======================================================
           2. ESTILOS MENÚ FLOTANTE
           ======================================================= */
        #super-menu-container {
            position: fixed;
            bottom: 30px;
            right: 20px;
            z-index: 2147483647;
            font-family: sans-serif;
            font-size: 16px !important;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
        }

        @media (max-width: 768px) {
            #super-menu-container { bottom: 80px; right: 15px; }
            #menu-trigger { width: 55px; height: 55px; }
        }

        #menu-trigger {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #0A2846;
            color: white;
            border: none;
            box-shadow: 0 4px 10px rgba(0,0,0,0.4);
            font-size: 24px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: transform 0.2s;
        }
        #menu-trigger:active { transform: scale(0.95); }

        #menu-content {
            background: white;
            border-radius: 12px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            padding: 10px;
            margin-bottom: 10px;
            display: none;
            flex-direction: column;
            gap: 10px;
            min-width: 200px; /* Un poco más ancho para Favoritos */
            border: 1px solid #eee;
        }
        #menu-content.activo { display: flex; }

        .menu-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 5px 0;
            border-bottom: 1px solid #f0f0f0;
        }
        .menu-row:last-child { border-bottom: none; }
        .menu-label { font-weight: bold; color: #555; font-size: 14px; margin-right: 10px; }

        .mini-btn {
            background: #f4f4f4;
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 8px 14px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
        }
        .mini-btn:hover { background: #e0e0e0; }
        .mini-btn.active { background: #0A2846; color: white; border-color: #0A2846; }

        /* =======================================================
           3. ESTILOS MODAL DE FAVORITOS
           ======================================================= */
        #fav-modal {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            max-width: 400px;
            max-height: 80vh;
            background: white;
            z-index: 2147483648;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.5);
            padding: 20px;
            overflow-y: auto;
            border: 1px solid #ccc;
        }
        #fav-overlay {
            display: none;
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 2147483647;
        }
        .fav-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            border-bottom: 1px solid #eee;
        }
        .fav-item a { text-decoration: none; font-weight: bold; color: #333; }
        .fav-delete { color: red; cursor: pointer; font-weight: bold; padding: 5px; }

        /* =======================================================
           4. ESTILOS MODO NOCHE
           ======================================================= */
        
        body.modo-oscuro { background-color: #121212 !important; color: #e0e0e0 !important; }
        
        /* ENLACES */
        body.modo-oscuro a,
        body.modo-oscuro a:visited { color: #90caf9 !important; } 

        /* NAVBAR BLANCO */
        body.modo-oscuro nav a,
        body.modo-oscuro .navbar a,
        body.modo-oscuro .nav-link,
        body.modo-oscuro .navbar-brand,
        body.modo-oscuro .dropdown-toggle {
            color: #ffffff !important;
        }
        
        /* BOTONES Y TARJETAS */
        body.modo-oscuro .card,
        body.modo-oscuro .list-group-item,
        body.modo-oscuro .btn,
        body.modo-oscuro a.btn, 
        body.modo-oscuro .card a {
            color: #ffffff !important;
        }

        /* FONDOS OSCUROS */
        body.modo-oscuro .card,
        body.modo-oscuro .list-group-item {
            background-color: #1e1e1e !important; 
            border-color: #333 !important;
        }
        
        body.modo-oscuro .btn:not(.btn-primary):not(.azul) {
            background-color: #1e1e1e !important;
            border-color: #333 !important;
        }
        
        body.modo-oscuro .btn-primary, body.modo-oscuro .azul {
             color: #ffffff !important;
        }

        /* INPUTS */
        body.modo-oscuro input,
        body.modo-oscuro .form-control {
            background-color: #222 !important;
            color: #fff !important;
            border-color: #444 !important;
        }
        body.modo-oscuro input::placeholder { color: #888 !important; }

        /* LISTAS, MENÚS Y MODAL FAVORITOS */
        body.modo-oscuro #listaGlobal, 
        body.modo-oscuro .dropdown-menu,
        body.modo-oscuro #fav-modal {
            background-color: #222 !important;
            border: 1px solid #444 !important;
            color: #fff !important;
        }
        body.modo-oscuro #listaGlobal a,
        body.modo-oscuro .dropdown-item,
        body.modo-oscuro .fav-item a {
            border-bottom: 1px solid #333 !important;
            color: #e0e0e0 !important;
        }
        body.modo-oscuro #listaGlobal a:hover,
        body.modo-oscuro .dropdown-item:hover {
            background-color: #333 !important;
            color: #fff !important;
        }

        /* ACORDES ROJOS */
        body.modo-oscuro span.c, 
        body.modo-oscuro .c { 
            color: red !important; 
            font-weight: bold;
        }

        /* MENÚ FLOTANTE */
        body.modo-oscuro #menu-content { background: #222; border-color: #444; }
        body.modo-oscuro .menu-label { color: #ccc; }
        body.modo-oscuro .mini-btn { background: #333; border-color: #555; color: #fff; }
        body.modo-oscuro #menu-trigger { background: #fff; color: #000; }
        
        /* TRANSPOSICIÓN */
        body.modo-oscuro .transpose-keys a {
            background-color: #000 !important;
            color: #fff !important;
            border: 1px solid #444 !important;
        }
        body.modo-oscuro .transpose-keys a.selected {
            background-color: #444 !important; 
            border-color: #fff !important;
        }
    `;
    document.head.appendChild(style);

    // --- B. HTML DEL MENÚ Y MODAL ---
    const menuHTML = `
        <div id="super-menu-container">
            <div id="menu-content">
                
                <div class="menu-row">
                    <span class="menu-label">Favoritos</span>
                    <div style="display:flex; gap:5px;">
                        <button class="mini-btn" id="fav-toggle" title="Guardar/Quitar">🤍</button>
                        <button class="mini-btn" id="fav-view" title="Ver Lista">📂</button>
                    </div>
                </div>

                <div class="menu-row">
                    <span class="menu-label">AutoScroll</span>
                    <div style="display:flex; gap:5px; align-items:center;">
                        <button class="mini-btn" id="scroll-minus">－</button>
                        <span id="scroll-speed-display" style="font-size:14px; width:20px; text-align:center;">3</span>
                        <button class="mini-btn" id="scroll-plus">＋</button>
                        <button class="mini-btn" id="scroll-play" style="font-weight:bold;">▶</button>
                    </div>
                </div>

                <div class="menu-row">
                    <span class="menu-label">Letra</span>
                    <div>
                        <button class="mini-btn" id="font-minus">A-</button>
                        <button class="mini-btn" id="font-plus">A+</button>
                    </div>
                </div>

                <div class="menu-row">
                    <span class="menu-label">Tema</span>
                    <button class="mini-btn" id="toggle-theme">🌙</button>
                </div>

            </div>
            <button id="menu-trigger">☰</button>
        </div>

        <div id="fav-overlay"></div>
        <div id="fav-modal">
            <h3 style="margin-top:0;">Mis Favoritos ❤️</h3>
            <div id="fav-list-container">
                <p>No tienes canciones guardadas.</p>
            </div>
            <button class="mini-btn" id="fav-close" style="margin-top:15px; width:100%;">Cerrar</button>
        </div>
    `;

    const divWrapper = document.createElement('div');
    divWrapper.innerHTML = menuHTML;
    document.body.appendChild(divWrapper);

    // --- C. LÓGICA ---

    // 1. MENU
    const menuTrigger = document.getElementById("menu-trigger");
    const menuContent = document.getElementById("menu-content");
    menuTrigger.addEventListener("click", () => {
        menuContent.classList.toggle("activo");
        menuTrigger.innerHTML = menuContent.classList.contains("activo") ? "✖" : "☰";
    });

    // 2. FAVORITOS (LÓGICA NUEVA)
    const favToggle = document.getElementById("fav-toggle");
    const favView = document.getElementById("fav-view");
    const favModal = document.getElementById("fav-modal");
    const favOverlay = document.getElementById("fav-overlay");
    const favClose = document.getElementById("fav-close");
    const favListContainer = document.getElementById("fav-list-container");

    // Leer favoritos del almacenamiento
    let favorites = JSON.parse(localStorage.getItem('cancionero_favoritos')) || [];
    
    // Datos de la canción actual
    const currentUrl = window.location.pathname;
    const currentTitle = document.title.split("-")[0].trim(); // Intenta limpiar el título

    // Verificar si la actual ya es favorita
    function checkFavStatus() {
        if (!document.getElementById("letra")) {
            favToggle.disabled = true; // Desactivar si no es canción
            return;
        }
        const exists = favorites.some(fav => fav.u === currentUrl);
        favToggle.innerHTML = exists ? "❤️" : "🤍";
    }
    checkFavStatus();

    // Botón Corazón
    favToggle.onclick = () => {
        const existsIndex = favorites.findIndex(fav => fav.u === currentUrl);
        
        if (existsIndex > -1) {
            favorites.splice(existsIndex, 1); // Quitar
        } else {
            favorites.push({ t: currentTitle, u: currentUrl }); // Agregar
        }
        
        localStorage.setItem('cancionero_favoritos', JSON.stringify(favorites));
        checkFavStatus();
    };

    // Botón Ver Lista (Carpeta)
    favView.onclick = () => {
        renderFavList();
        favModal.style.display = "block";
        favOverlay.style.display = "block";
        // Cerrar menú flotante
        menuContent.classList.remove("activo");
        menuTrigger.innerHTML = "☰";
    };

    // Cerrar Modal
    const closeFavModal = () => {
        favModal.style.display = "none";
        favOverlay.style.display = "none";
    };
    favClose.onclick = closeFavModal;
    favOverlay.onclick = closeFavModal;

    // Renderizar lista en el modal
    function renderFavList() {
        favorites = JSON.parse(localStorage.getItem('cancionero_favoritos')) || [];
        if (favorites.length === 0) {
            favListContainer.innerHTML = "<p>No tienes canciones guardadas.</p>";
            return;
        }
        
        let html = "";
        favorites.forEach((fav, index) => {
            html += `
                <div class="fav-item">
                    <a href="${fav.u}">${fav.t}</a>
                    <span class="fav-delete" onclick="eliminarFav(${index})">🗑️</span>
                </div>
            `;
        });
        favListContainer.innerHTML = html;
    }

    // Función global para borrar desde la lista
    window.eliminarFav = (index) => {
        favorites.splice(index, 1);
        localStorage.setItem('cancionero_favoritos', JSON.stringify(favorites));
        renderFavList(); // Actualizar lista visible
        checkFavStatus(); // Actualizar corazón si estamos en esa canción
    };


    // 3. AUTOSCROLL
    let scrollSpeed = 3;
    let isScrolling = false;
    let scrollInterval;
    const scrollDisplay = document.getElementById("scroll-speed-display");
    const btnPlay = document.getElementById("scroll-play");

    function stopScroll() {
        clearInterval(scrollInterval);
        isScrolling = false;
        btnPlay.innerHTML = "▶";
        btnPlay.classList.remove("active");
        document.documentElement.style.scrollBehavior = "smooth";
    }

    function startScroll() {
        clearInterval(scrollInterval);
        document.documentElement.style.scrollBehavior = "auto";
        const delay = 220 - (scrollSpeed * 20);
        scrollInterval = setInterval(() => {
             const currentY = window.pageYOffset || document.documentElement.scrollTop;
             const totalHeight = document.documentElement.scrollHeight;
             if ((window.innerHeight + currentY) >= totalHeight) stopScroll();
             else window.scrollTo(0, currentY + 1);
        }, delay);
        btnPlay.innerHTML = "⏸";
        btnPlay.classList.add("active");
        isScrolling = true;
    }

    document.getElementById("scroll-play").onclick = () => isScrolling ? stopScroll() : startScroll();
    document.getElementById("scroll-plus").onclick = () => { if(scrollSpeed < 10) { scrollSpeed++; scrollDisplay.innerText = scrollSpeed; if(isScrolling) startScroll(); }};
    document.getElementById("scroll-minus").onclick = () => { if(scrollSpeed > 1) { scrollSpeed--; scrollDisplay.innerText = scrollSpeed; if(isScrolling) startScroll(); }};

    // 4. TAMAÑO DE LETRA (SIN GUARDAR)
    const letraDiv = document.getElementById("letra");
    let fontSizePercent = 100; 
    
    if (letraDiv) {
        letraDiv.style.fontSize = fontSizePercent + "%";
        letraDiv.style.lineHeight = "1.5";
    }

    const updateFont = (val) => {
        if (!letraDiv) return; 
        
        fontSizePercent += val;
        if(fontSizePercent < 60) fontSizePercent = 60;
        if(fontSizePercent > 250) fontSizePercent = 250;
        
        letraDiv.style.fontSize = fontSizePercent + "%";
    };

    document.getElementById("font-plus").onclick = () => updateFont(10);
    document.getElementById("font-minus").onclick = () => updateFont(-10);

    // 5. MODO OSCURO
    const btnTheme = document.getElementById("toggle-theme");
    const isDark = localStorage.getItem("cancionero_darkmode") === "true";
    
    const applyTheme = (dark) => {
        if(dark) {
            document.body.classList.add("modo-oscuro");
            btnTheme.innerText = "☀️";
        } else {
            document.body.classList.remove("modo-oscuro");
            btnTheme.innerText = "🌙";
        }
        localStorage.setItem("cancionero_darkmode", dark);
    };
    applyTheme(isDark);
    
    btnTheme.onclick = () => {
        const currentDark = document.body.classList.contains("modo-oscuro");
        applyTheme(!currentDark);
    };

    // 6. REACTIVAR TU BOTÓN ORIGINAL DE ACORDES
    const oldBtn = document.getElementById("toggleChordsButton");
    if(oldBtn) {
        oldBtn.onclick = function() {
            const chords = document.querySelectorAll(".c");
            if(chords.length === 0) return;
            const isVisible = chords[0].style.display !== "none";
            chords.forEach(c => {
                c.style.display = isVisible ? "none" : "inline";
            });
        };
    }

});

// ==================================================
// WAKE LOCK Y BUSCADOR
// ==================================================
document.addEventListener("DOMContentLoaded", async function() {
    if ('wakeLock' in navigator) {
        try {
            let wakeLock = await navigator.wakeLock.request('screen');
            document.addEventListener('visibilitychange', async () => {
                if (wakeLock !== null && document.visibilityState === 'visible') await navigator.wakeLock.request('screen');
            });
        } catch (err) {}
    }
});

function filtrarGlobal() {
    var input = document.getElementById("inputGlobal");
    var contenedor = document.getElementById("listaGlobal");
    if(!input || !contenedor) return;

    var enlaces = contenedor.getElementsByTagName("a");
    var filtro = input.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    if (filtro.length === 0) {
        contenedor.style.display = "none";
        return;
    } else {
        contenedor.style.display = "block";
    }

    for (var i = 0; i < enlaces.length; i++) {
        var texto = enlaces[i].textContent || enlaces[i].innerText;
        var letra = enlaces[i].getAttribute("data-letra") || ""; 
        var textoCompleto = texto + " " + letra;
        if (textoCompleto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf(filtro) > -1) {
            enlaces[i].style.display = ""; 
        } else {
            enlaces[i].style.display = "none"; 
        }
    }
}

document.addEventListener('click', function(event) {
    var contenedor = document.getElementById('listaGlobal');
    var input = document.getElementById('inputGlobal');
    if (contenedor && input && event.target !== input && event.target !== contenedor) {
        contenedor.style.display = 'none';
    }
});