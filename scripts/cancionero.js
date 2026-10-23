function limpiarTexto(texto) {
    if (!texto) return ""; // Por si llega algún texto vacío
    return texto
        .toLowerCase() // 1. Pasa todo a minúsculas
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // 2. Saca los acentos
        .replace(/[,.\-–—_¡!¿?"'«»()[\]{}:;\/\\]/g, "") // 3. Saca comas, puntos, guiones y signos
        .trim(); // 4. Saca los espacios de más en los bordes
}
/* ===================================================
   AUTOCORRECTOR GLOBAL DE LINKS (Secciones y Álbumes)
   =================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const tituloH1 = document.querySelector("h1");
    const linksCanciones = document.querySelectorAll("a.btn-outline-primary");
    
    if (tituloH1 && linksCanciones.length > 0) {
        let nombreSeccion = tituloH1.innerText.trim();
        
        // LIMPIEZA DE TÍTULO: Ataja "Cantos de " y "Cantos "
        if (nombreSeccion.startsWith("Cantos de ")) {
            nombreSeccion = nombreSeccion.replace("Cantos de ", "");
        } else if (nombreSeccion.startsWith("Cantos ")) {
            nombreSeccion = nombreSeccion.replace("Cantos ", "");
        }
        
        linksCanciones.forEach(link => {
            const hrefOriginal = link.getAttribute("href");
            
            if (hrefOriginal && hrefOriginal.includes(".html") && !hrefOriginal.includes("?seccion=")) {
                link.setAttribute("href", `${hrefOriginal}?seccion=${encodeURIComponent(nombreSeccion)}`);
            }
        });
    }
});
// =============================================================================
// 0. BASE DE DATOS DE CANCIONES (GLOBAL)
// =============================================================================
window.canciones = {
    "Entrada": {
        "Alma misionera": { ruta: "entrada/alma-misionera.html", tono: "MI", capo: 0 },
        "Celebremos": { ruta: "entrada/celebremos.html", tono: "DO", capo: 0 },
        "Cristo Joven": { ruta: "entrada/cristo-joven.html", tono: "DO", capo: 0 },
        "Deja que nazca": { ruta: "entrada/deja-que-nazca.html", tono: "MI", capo: 0 },
        "El Dios de la vida": { ruta: "entrada/el-dios-de-la-vida.html", tono: "DO", capo: 0 },
        "El pulso de Dios": { ruta: "entrada/el-pulso-de-dios.html", tono: "MI", capo: 1 },
        "En el nombre de Dios": { ruta: "entrada/en-el-nombre-de-dios.html", tono: "DO", capo: 0 },
        "En el nombre del Padre": { ruta: "entrada/en-el-nombre-del-padre.html", tono: "SOL", capo: 0 },
        "Que lindo llegar cantando": { ruta: "entrada/que-lindo-llegar-cantando.html", tono: "DO", capo: 0 },
        "Un nuevo sol": { ruta: "entrada/un-nuevo-sol.html", tono: "MI", capo: 2 }
    },
    "Perdón": {
        "Perdón 1 (Señor ten piedad)": { ruta: "perdon/perdon-1.html", tono: "DO", capo: 1 },
        "Perdón 2 (Perdón Señor)": { ruta: "perdon/perdon-2.html", tono: "SOL", capo: 1 },
        "Perdón 3 (Renuevame)": { ruta: "perdon/perdon-3-renuevame.html", tono: "DO", capo: 0 },
        "Perdón 4 (Una vez más rezaré)": { ruta: "perdon/perdon-4-una-vez-mas-rezare.html", tono: "RE", capo: 0 },
        "Perdón 5 (Dejame nacer)": { ruta: "perdon/perdon-5-dejame-nacer.html", tono: "DO", capo: 0 }
    },
    "Gloria": {
        "Gloria 1 (Clásico)": { ruta: "gloria/gloria-1.html", tono: "RE", capo: 1 },
        "Gloria 2 (con respuesta)": { ruta: "gloria/gloria-2.html", tono: "DO", capo: 0 },
        "Gloria 3 (Litúrgico)": { ruta: "gloria/gloria-3.html", tono: "SOL", capo: 3 },
        "Gloria 4 (Nortino)": { ruta: "gloria/gloria-4.html", tono: "FA", capo: 2 },
        "Letanías": { ruta: "gloria/letanias.html", tono: "RE", capo: 0 },
        "Pregón Pascual": { ruta: "gloria/pregon-pascual.html", tono: "DO", capo: 0 }
    },
    "Salmos": {
        "Éxodo 15 (Vigilia Pascual)": { ruta: "salmos/exodo-15.html", tono: "RE", capo: 1 },
        "Salmo 18": { ruta: "salmos/salmo-18.html", tono: "LA", capo: 0 },
        "Salmo 28": { ruta: "salmos/salmo-28.html", tono: "LA", capo: 0 },
        "Salmo 30": { ruta: "salmos/salmo-30.html", tono: "LA", capo: 1 },
        "Salmo 34": { ruta: "salmos/salmo-34.html", tono: "MI", capo: 0 },
        "Salmo 41": { ruta: "salmos/salmo-41.html", tono: "RE", capo: 0 },
        "Salmo 103": { ruta: "salmos/salmo-103.html", tono: "RE", capo: 0 },
        "Salmo 115": { ruta: "salmos/salmo-115.html", tono: "LA", capo: 0 },
        "Salmo 117": { ruta: "salmos/salmo-117.html", tono: "RE", capo: 0 }
    },
    "Aleluya": {
        "Aleluya (busca primero)": { ruta: "aleluya/aleluya-busca-primero.html", tono: "LA", capo: 0 },
        "Aleluya (cada palabra)": { ruta: "aleluya/aleluya-cada-palabra.html", tono: "MI", capo: 0 },
        "Aleluya (cantad alegres)": { ruta: "aleluya/aleluya-cantad-alegres.html", tono: "DO", capo: 0 },
        "Aleluya (común)": { ruta: "aleluya/aleluya-comun.html", tono: "LA", capo: 0 },
        "Aleluya (cuaresma)": { ruta: "aleluya/aleluya-cuaresma.html", tono: "LA", capo: 0 },
        "Aleluya (JLG)": { ruta: "aleluya/aleluya-jlg.html", tono: "SOL", capo: 0 },
        "Aleluya (yo soy el maestro)": { ruta: "aleluya/aleluya-yo-soy-el-maestro.html", tono: "MI", capo: 0 },
        "Te adoramos Cristo": { ruta: "aleluya/te-adoramos-cristo.html", tono: "LA", capo: 0 },
        "Tu Palabra Señor es la Verdad": { ruta: "aleluya/tu-palabra-señor-es-la-verdad.html", tono: "DO", capo: 0 }
    },
    "Ofertorio": {
        "Alimento que da vida": { ruta: "ofertorio/alimento-que-da-vida.html", tono: "RE", capo: 2 },
        "Cinco panes y dos peces": { ruta: "ofertorio/cinco-panes.html", tono: "SOL", capo: 0 },
        "Comenzaste a hacerte pan": { ruta: "ofertorio/comenzaste-a-hacerte-pan.html", tono: "DO", capo: 0 },
        "Esto que soy, esto te doy": { ruta: "ofertorio/esto-que-soy-esto-te-doy.html", tono: "SOL", capo: 0 },
        "Juntos nos acercamos": { ruta: "ofertorio/juntos-nos-acercamos.html", tono: "SOL", capo: 0 },
        "Nuestra fe en tu amor": { ruta: "ofertorio/nuestra-fe-en-tu-amor.html", tono: "SOL", capo: 0 },
        "Oh Padre": { ruta: "ofertorio/oh-padre.html", tono: "DO", capo: 0 },
        "Oh Señor": { ruta: "ofertorio/oh-señor.html", tono: "MI", capo: 0 },
        "Para darlo a los demas": { ruta: "ofertorio/para-darlo-a-los-demas.html", tono: "RE", capo: 0 },
        "Toma Señor": { ruta: "ofertorio/toma-señor.html", tono: "MI", capo: 0 },
        "Tomame": { ruta: "ofertorio/tomame.html", tono: "LA", capo: 0 }
    },
    "Santo": {
        "Santo 1 (Hacia el Padre)": { ruta: "santo/santo1.html", tono: "DO", capo: 0 },
        "Santo 2 (Hosanna)": { ruta: "santo/santo2.html", tono: "SOL", capo: 0 },
        "Santo 3 (Clásico)": { ruta: "santo/santo3.html", tono: "DO", capo: 0 },
        "Santo 4 (Tucumano)": { ruta: "santo/santo4.html", tono: "RE", capo: 0 },
        "Santo 5 (Saaanto)": { ruta: "santo/santo5.html", tono: "LA", capo: 0 },
        "Santo 6 (Santo es)": { ruta: "santo/santo6.html", tono: "SOL", capo: 0 },
        "Santo 7 (No Pasará)": { ruta: "santo/santo7.html", tono: "FA", capo: 0 }
    },
    "Padrenuestro": {
        "Padrenuestro": { ruta: "padrenuestro/padrenuestro.html", tono: "RE", capo: 0 }
    },
    "Cordero": {
        "Cordero 1 (Clásico)": { ruta: "cordero/cordero1.html", tono: "DO", capo: 0 },
        "Cordero 2 (Movido)": { ruta: "cordero/cordero2.html", tono: "FA", capo: 0 },
        "Cordero 3 (Dios de amor)": { ruta: "cordero/cordero3.html", tono: "SOL", capo: 0 },
        "Cordero 4 (Zamba)": { ruta: "cordero/cordero4.html", tono: "MI", capo: 0 },
        "Cordero 5 (Lento)": { ruta: "cordero/cordero5.html", tono: "SOL", capo: 2 }
    },
    "Comunión": {
        "Abre": { ruta: "comunion/abre.html", tono: "LA", capo: 0 },
        "Acuérdate de mí": { ruta: "comunion/acuerdate-de-mi.html", tono: "LA", capo: 0 },
        "Al servicio de aquel": { ruta: "comunion/al-servicio-de-aquel.html", tono: "SOL", capo: 0 },
        "Alma misionera": { ruta: "entrada/alma-misionera.html", tono: "MI", capo: 0 },
        "Alza mi paz": { ruta: "comunion/alza-mi-paz.html", tono: "DO", capo: 0 },
        "Alzar banderas": { ruta: "comunion/alzar-banderas.html", tono: "DO", capo: 0 },
        "Apareces": { ruta: "comunion/apareces.html", tono: "DO", capo: 0 },
        "Arde": { ruta: "meditacion/arde.html", tono: "RE", capo: 0 },
        "Caminando": { ruta: "comunion/caminando.html", tono: "LA", capo: 0 },
        "Camino, verdad y vida": { ruta: "comunion/camino-verdad-y-vida.html", tono: "DO", capo: 0 },
        "Cantaro niño": { ruta: "comunion/cantaro-niño.html", tono: "RE", capo: 0 },
        "Cena de jueves": { ruta: "comunion/cena-de-jueves.html", tono: "DO", capo: 0 },
        "Clarifica-te": { ruta: "comunion/clarifica-te.html", tono: "MI", capo: 0 },
        "Como antes, más que antes": { ruta: "comunion/como-antes-mas-que-antes.html", tono: "RE", capo: 0 },
        "Como un niño": { ruta: "comunion/como-un-niño.html", tono: "SOL", capo: 0 },
        "Con vos": { ruta: "comunion/con-vos.html", tono: "MI", capo: 0 },
        "Creemos, Oh Dios": { ruta: "comunion/creemos-oh-dios.html", tono: "LA", capo: 0 },
        "Dame Tu Sí": { ruta: "comunion/dame-tu-si.html", tono: "SOL", capo: 4 },
        "De Cirene": { ruta: "comunion/de-cirene.html", tono: "LA", capo: 3 },
        "Dejate": { ruta: "comunion/dejate.html", tono: "DO", capo: 0 },
        "Después de caer": { ruta: "comunion/despues-de-caer.html", tono: "LA", capo: 1 },
        "Ego Paulus": { ruta: "comunion/ego-paulus.html", tono: "SOL", capo: 0 },
        "El que muere por mi": { ruta: "comunion/el-que-muere-por-mi.html", tono: "DO", capo: 2 },
        "El sale a tu encuentro": { ruta: "comunion/el-sale-a-tu-encuentro.html", tono: "MI", capo: 0 },
        "Emaús": { ruta: "comunion/emaus.html", tono: "RE", capo: 0 },
        "En Cristo somos uno": { ruta: "comunion/en-cristo-somos-uno.html", tono: "MI", capo: 0 },
        "En mi Getsemani": { ruta: "comunion/en-mi-getsemani.html", tono: "DO", capo: 0 },
        "En tus ojos": { ruta: "comunion/en-tus-ojos.html", tono: "SOL", capo: 0 },
        "Enciende nuestra misión": { ruta: "comunion/enciende-nuestra-mision.html", tono: "MI", capo: 0 },
        "Eres": { ruta: "comunion/eres.html", tono: "SOL", capo: 4 },
        "Es aquí": { ruta: "comunion/es-aqui.html", tono: "RE", capo: 0 },
        "Esclava de mi salvador": { ruta: "comunion/esclava-de-mi-salvador.html", tono: "RE", capo: 2 },
        "Estamos aquí": { ruta: "comunion/estamos-aqui.html", tono: "MI", capo: 0 },
        "Estandarte": { ruta: "comunion/estandarte.html", tono: "RE", capo: 0 },
        "Frente a ti": { ruta: "comunion/frente-a-ti.html", tono: "SOL", capo: 0 },
        "Ha sido largo el viaje": { ruta: "comunion/ha-sido-largo-el-viaje.html", tono: "MI", capo: 0 },
        "Hagase mi paz": { ruta: "comunion/hagase-mi-paz.html", tono: "MI", capo: 0 },
        "Hago nuevas todas las cosas": { ruta: "meditacion/hago-nuevas-todas-las-cosas.html", tono: "SOL", capo: 0 },
        "Hasta que el mundo arda por El": { ruta: "comunion/hasta-que-el-mundo-arda-por-el.html", tono: "SOL", capo: 0 },
        "Hoy vivo": { ruta: "comunion/hoy-vivo.html", tono: "RE", capo: 2 },
        "Jesús y Pedro": { ruta: "comunion/jesus-y-pedro.html", tono: "DO", capo: 1 },
        "Juremos con gloria morir": { ruta: "comunion/juremos-con-gloria-morir.html", tono: "SOL", capo: 0 },
        "La niña de tus ojos": { ruta: "comunion/la-niña-de-tus-ojos.html", tono: "MI", capo: 0 },
        "Labor del apostol": { ruta: "comunion/labor-del-apostol.html", tono: "DO", capo: 0 },
        "Lienzo": { ruta: "comunion/lienzo.html", tono: "SOL", capo: 4 },
        "Mais Longe": { ruta: "comunion/mais-longe.html", tono: "SOL", capo: 0 },
        "Mais Longe (Español)": { ruta: "comunion/mais-longe-español.html", tono: "SOL", capo: 0 },
        "María (Servus Mariae)": { ruta: "marianos/maria-servus-mariae.html", tono: "SOL", capo: 0 },
        "María Madre": { ruta: "comunion/maria-madre.html", tono: "MI", capo: 0 },
        "María tierra del Padre": { ruta: "comunion/maria-tierra-del-padre.html", tono: "LA", capo: 0 },
        "María vai": { ruta: "comunion/maria-vai.html", tono: "DO", capo: 0 },
        "Más allá del mar": { ruta: "comunion/mas-alla-del-mar.html", tono: "MI", capo: 0 },
        "No hay amor más grande": { ruta: "comunion/no-hay-amor-mas-grande.html", tono: "DO", capo: 0 },
        "No temas": { ruta: "comunion/no-temas.html", tono: "MI", capo: 2 },
        "Nuestra alianza": { ruta: "comunion/nuestra-alianza.html", tono: "MI", capo: 0 },
        "Para que todos tengan vida": { ruta: "comunion/para-que-todos-tengan-vida.html", tono: "FA", capo: 0 },
        "Pasión que transforma": { ruta: "comunion/pasion-que-transforma.html", tono: "RE", capo: 0 },
        "Perfume A Tus Pies": { ruta: "comunion/perfume-a-tus-pies.html", tono: "MI", capo: 0 },
        "Pescador de hombres": { ruta: "comunion/pescador-de-hombres.html", tono: "DO", capo: 0 },
        "Quedate Señor": { ruta: "comunion/quedate-señor.html", tono: "DO", capo: 0 },
        "Quiero ser tu amigo Jesucristo": { ruta: "comunion/quiero-ser-tu-amigo-jesucristo.html", tono: "SOL", capo: 0 },
        "Renace la vida y el corazón": { ruta: "comunion/renace-la-vida-y-el-corazon.html", tono: "SOL", capo: 4 },
        "Rompe el Silencio": { ruta: "comunion/rompe-el-silencio.html", tono: "SOL", capo: 0 },
        "Sal y luz": { ruta: "comunion/sal-y-luz.html", tono: "SI", capo: 0 },
        "Salmo 28": { ruta: "salmos/salmo-28.html", tono: "LA", capo: 0 },
        "Sé en quién he puesto mi confianza": { ruta: "comunion/se-en-quien-he-puesto-mi-confianza.html", tono: "MI", capo: 0 },
        "Sentidos": { ruta: "comunion/sentidos.html", tono: "SOL", capo: 6 },
        "Será Dios": { ruta: "comunion/sera-dios.html", tono: "SOL", capo: 0 },
        "Si amo mi vida": { ruta: "comunion/si-amo-mi-vida.html", tono: "SOL", capo: 3 },
        "Si quieres te acompaño en el camino": { ruta: "comunion/si-quieres-te-acompaño-en-el-camino.html", tono: "DO", capo: 0 },
        "Siempre para ti": { ruta: "comunion/siempre-para-ti.html", tono: "RE", capo: 0 },
        "Silencio en el calvario": { ruta: "comunion/silencio-en-el-calvario.html", tono: "DO", capo: 4 },
        "Sin fronteras": { ruta: "comunion/sin-fronteras.html", tono: "SOL", capo: 0 },
        "Sobre el mar (Berit II)": { ruta: "comunion/sobre-el-mar-berit2.html", tono: "DO", capo: 0 },
        "Somos JM, somos iglesia": { ruta: "comunion/somos-jm-somos-iglesia.html", tono: "SOL", capo: 0 },
        "Soñar": { ruta: "comunion/soñar.html", tono: "MI", capo: 0 },
        "Te estaba esperando": { ruta: "comunion/te-estaba-esperando.html", tono: "DO", capo: 0 },
        "Te veo": { ruta: "comunion/te-veo.html", tono: "DO", capo: 0 },
        "Tu amor": { ruta: "comunion/tu-amor.html", tono: "LA", capo: 0 },
        "Tu luz (Contigo + Feliz)": { ruta: "comunion/tu-luz.html", tono: "SOL", capo: 5 },
        "Una gota de agua": { ruta: "comunion/una-gota-de-agua.html", tono: "SOL", capo: 0 },
        "Ven Jesús de Nazareth": { ruta: "comunion/ven-jesus-de-nazareth.html", tono: "RE", capo: 2 },
        "Ven Pastor": { ruta: "comunion/ven-pastor.html", tono: "RE", capo: 0 },
        "Vengan y coman": { ruta: "comunion/vengan-y-coman.html", tono: "RE", capo: 0 },
        "Vida en abundancia": { ruta: "comunion/vida-en-abundancia.html", tono: "MI", capo: 0 },
        "Ya es hora": { ruta: "comunion/ya-es-hora.html", tono: "SOL", capo: 1 },
        "Yo soy el mar": { ruta: "comunion/yo-soy-el-mar.html", tono: "SOL", capo: 3 }
    },
    "Meditación": {
        "A Él la Gloria": { ruta: "meditacion/a-el-la-gloria.html", tono: "SOL", capo: 2 },
        "A Ti Te Alabo": { ruta: "meditacion/a-ti-te-alabo.html", tono: "DO", capo: 3 },
        "A tus pies": { ruta: "meditacion/a-tus-pies.html", tono: "SOL", capo: 3 },
        "Abramos": { ruta: "meditacion/abramos.html", tono: "RE", capo: 1 },
        "Acógeme": { ruta: "meditacion/acogeme.html", tono: "RE", capo: 1 },
        "Acuérdate de mí": { ruta: "comunion/acuerdate-de-mi.html", tono: "LA", capo: 0 },
        "Al servicio de aquel": { ruta: "comunion/al-servicio-de-aquel.html", tono: "SOL", capo: 0 },
        "Alábenlo": { ruta: "meditacion/alabenlo.html", tono: "LA", capo: 0 },
        "Algo de paz": { ruta: "meditacion/algo-de-paz.html", tono: "RE", capo: 0 },
        "Alma de Cristo": { ruta: "meditacion/alma-de-cristo.html", tono: "LA", capo: 0 },
        "Alzar banderas": { ruta: "comunion/alzar-banderas.html", tono: "DO", capo: 0 },
        "Amanecer": { ruta: "meditacion/amanecer.html", tono: "FA", capo: 0 },
        "Amigo": { ruta: "meditacion/amigo.html", tono: "RE", capo: 1 },
        "Apareces": { ruta: "comunion/apareces.html", tono: "DO", capo: 0 },
        "Apóstol de Jesucristo": { ruta: "meditacion/apostol-de-jesucristo.html", tono: "LA", capo: 0 },
        "Arde": { ruta: "meditacion/arde.html", tono: "RE", capo: 0 },
        "Arde (San José)": { ruta: "meditacion/arde-san-jose.html", tono: "LA#", capo: 0 },
        "Baja hasta lo más hondo": { ruta: "meditacion/baja-hasta-lo-mas-hondo.html", tono: "SOL", capo: 0 },
        "Barro soy": { ruta: "meditacion/barro-soy.html", tono: "RE", capo: 0 },
        "Cae el agua": { ruta: "meditacion/cae-el-agua.html", tono: "MI", capo: 0 },
        "Caminando": { ruta: "comunion/caminando.html", tono: "LA", capo: 0 },
        "Caminho de eternidade": { ruta: "meditacion/caminho-de-eternidade.html", tono: "RE", capo: 0 },
        "Cantaro niño": { ruta: "comunion/cantaro-niño.html", tono: "RE", capo: 0 },
        "Cara a cara": { ruta: "meditacion/cara-a-cara.html", tono: "LA", capo: 0 },
        "Cayado de amor": { ruta: "meditacion/cayado-de-amor.html", tono: "DO", capo: 0 },
        "Clarifica-te": { ruta: "comunion/clarifica-te.html", tono: "MI", capo: 0 },
        "Como antes, más que antes": { ruta: "comunion/como-antes-mas-que-antes.html", tono: "RE", capo: 0 },
        "Como un niño": { ruta: "comunion/como-un-niño.html", tono: "SOL", capo: 0 },
        "Con vos": { ruta: "comunion/con-vos.html", tono: "MI", capo: 0 },
        "Confiaré en tu amor": { ruta: "meditacion/confiare-en-tu-amor.html", tono: "SOL", capo: 4 },
        "Conozco tu corazón": { ruta: "meditacion/conozco-tu-corazon.html", tono: "SOL", capo: 0 },
        "Cristo calla": { ruta: "meditacion/cristo-calla.html", tono: "SOL", capo: 0 },
        "Cristo reina": { ruta: "meditacion/cristo-reina.html", tono: "DO", capo: 0 },
        "Cristo Rey": { ruta: "meditacion/cristo-rey.html", tono: "RE", capo: 2 },
        "Dame Tu Sí": { ruta: "comunion/dame-tu-si.html", tono: "SOL", capo: 4 },
        "Dame tus ojos": { ruta: "meditacion/dame-tus-ojos.html", tono: "DO", capo: 0 },
        "De Cirene": { ruta: "comunion/de-cirene.html", tono: "LA", capo: 3 },
        "Déjate": { ruta: "comunion/dejate.html", tono: "DO", capo: 0 },
        "Digno de alabar": { ruta: "meditacion/digno-de-alabar.html", tono: "SOL", capo: 0 },
        "Dime Rey": { ruta: "meditacion/dime-rey.html", tono: "LA", capo: 0 },
        "El diario de María": { ruta: "marianos/el-diario-de-maria.html", tono: "LA", capo: 0 },
        "Él me miró": { ruta: "meditacion/el-me-miro.html", tono: "SOL", capo: 1 },
        "El mismo huerto": { ruta: "meditacion/el-mismo-huerto.html", tono: "RE", capo: 0 },
        "El que muere por mi": { ruta: "comunion/el-que-muere-por-mi.html", tono: "DO", capo: 2 },
        "El sale a tu encuentro": { ruta: "comunion/el-sale-a-tu-encuentro.html", tono: "MI", capo: 0 },
        "Emaús": { ruta: "comunion/emaus.html", tono: "RE", capo: 0 },
        "En la palma de su mano": { ruta: "meditacion/en-la-palma-de-su-mano.html", tono: "RE", capo: 1 },
        "En mi Getsemani": { ruta: "comunion/en-mi-getsemani.html", tono: "DO", capo: 0 },
        "En ti": { ruta: "meditacion/en-ti.html", tono: "SOL", capo: 0 },
        "En ti descansar": { ruta: "meditacion/en-ti-descansar.html", tono: "SOL", capo: 0 },
        "En tu misericordia": { ruta: "meditacion/en-tu-misericordia.html", tono: "RE", capo: 0 },
        "En tus ojos": { ruta: "comunion/en-tus-ojos.html", tono: "SOL", capo: 0 },
        "Eres": { ruta: "comunion/eres.html", tono: "SOL", capo: 4 },
        "Esa flor siempre de pie": { ruta: "meditacion/esa-flor-siempre-de-pie.html", tono: "SOL", capo: 2 },
        "Esclava de mi salvador": { ruta: "comunion/esclava-de-mi-salvador.html", tono: "RE", capo: 2 },
        "Escúchame Dios": { ruta: "meditacion/escuchame-dios.html", tono: "SOL", capo: 0 },
        "Esperanza": { ruta: "meditacion/esperanza.html", tono: "SOL", capo: 3 },
        "Espíritu desciende": { ruta: "espiritu-santo/espiritu-desciende.html", tono: "RE", capo: 0 },
        "Espíritu Santo": { ruta: "espiritu-santo/espiritu-santo.html", tono: "RE", capo: 0 },
        "Estamos aquí": { ruta: "comunion/estamos-aqui.html", tono: "MI", capo: 0 },
        "Estar con Él": { ruta: "meditacion/estar-con-el.html", tono: "SOL", capo: 0 },
        "Estate": { ruta: "meditacion/estate.html", tono: "SOL", capo: 0 },
        "Extiende tu mano": { ruta: "meditacion/extiende-tu-mano.html", tono: "DO", capo: 0 },
        "Extranjeros": { ruta: "meditacion/extranjeros.html", tono: "DO", capo: 0 },
        "Ha sido largo el viaje": { ruta: "comunion/ha-sido-largo-el-viaje.html", tono: "MI", capo: 0 },
        "Hagase mi paz": { ruta: "comunion/hagase-mi-paz.html", tono: "MI", capo: 0 },
        "Hago nuevas todas las cosas": { ruta: "meditacion/hago-nuevas-todas-las-cosas.html", tono: "SOL", capo: 0 },
        "Hasta que el mundo arda por El": { ruta: "comunion/hasta-que-el-mundo-arda-por-el.html", tono: "SOL", capo: 0 },
        "Haz llover": { ruta: "meditacion/haz-llover.html", tono: "DO", capo: 0 },
        "Haz llover x Que se abra el cielo": { ruta: "meditacion/haz-llover-x-que-se-abra-el-cielo.html", tono: "SOL", capo: 0 },
        "Hijo amado": { ruta: "meditacion/hijo-amado.html", tono: "SI", capo: 0 },
        "Hoy quiero mirarte": { ruta: "meditacion/hoy-quiero-mirarte.html", tono: "RE", capo: 0 },
        "Huracán": { ruta: "meditacion/huracan.html", tono: "DO", capo: 0 },
        "Jesús": { ruta: "meditacion/jesus.html", tono: "DO", capo: 0 },
        "Jesús (Berit II)": { ruta: "meditacion/jesus-berit2.html", tono: "DO", capo: 0 },
        "La luz de Jesús": { ruta: "meditacion/la-luz-de-jesus.html", tono: "DO", capo: 0 },
        "La niña de tus ojos": { ruta: "comunion/la-niña-de-tus-ojos.html", tono: "MI", capo: 0 },
        "Labor del apostol": { ruta: "comunion/labor-del-apostol.html", tono: "DO", capo: 0 },
        "Llevame a la cruz / Nadie igual": { ruta: "meditacion/llevame-a-la-cruz-nadie-igual.html", tono: "LA", capo: 0 },
        "Lo que importa es el amor": { ruta: "meditacion/lo-que-importa-es-el-amor.html", tono: "RE", capo: 0 },
        "Magnificat (Portugués)": { ruta: "meditacion/magnificat.html", tono: "DO", capo: 0 },
        "Mais Longe": { ruta: "comunion/mais-longe.html", tono: "SOL", capo: 0 },
        "Mais Longe (Español)": { ruta: "comunion/mais-longe-español.html", tono: "SOL", capo: 0 },
        "Maranatha": { ruta: "espiritu-santo/maranatha.html", tono: "SOL", capo: 1 },
        "Maravillas hizo en mi": { ruta: "meditacion/maravillas-hizo-en-mi.html", tono: "DO", capo: 0 },
        "María (Servus Mariae)": { ruta: "marianos/maria-servus-mariae.html", tono: "SOL", capo: 0 },
        "María tierra del Padre": { ruta: "comunion/maria-tierra-del-padre.html", tono: "LA", capo: 0 },
        "Me llamaste amigo": { ruta: "meditacion/me-llamaste-amigo.html", tono: "DO", capo: 3 },
        "Me quieres?": { ruta: "meditacion/me-quieres.html", tono: "MI", capo: 0 },
        "Mi 110%": { ruta: "meditacion/mi-110.html", tono: "FA", capo: 0 },
        "Mi alma descansa en ti": { ruta: "meditacion/mi-alma-descansa-en-ti.html", tono: "LA", capo: 0 },
        "Mi entrega a ti": { ruta: "meditacion/mi-entrega-a-ti.html", tono: "RE", capo: 0 },
        "Milagro de amor": { ruta: "meditacion/milagro-de-amor.html", tono: "SOL", capo: 2 },
        "Nada te turbe": { ruta: "meditacion/nada-te-turbe.html", tono: "RE", capo: 2 },
        "Nadie te ama como yo": { ruta: "meditacion/nadie-te-ama-como-yo.html", tono: "LA", capo: 0 },
        "No hay amor más grande": { ruta: "comunion/no-hay-amor-mas-grande.html", tono: "DO", capo: 0 },
        "No mueras hermano": { ruta: "meditacion/no-mueras-hermano.html", tono: "SOL", capo: 0 },
        "No os preocupeis": { ruta: "meditacion/no-os-preocupeis.html", tono: "SOL", capo: 0 },
        "No te canses": { ruta: "meditacion/no-te-canses.html", tono: "SOL", capo: 4 },
        "No tienen vino": { ruta: "meditacion/no-tienen-vino.html", tono: "DO", capo: 0 },
        "Noche": { ruta: "meditacion/noche.html", tono: "FA", capo: 0 },
        "Oh Padre": { ruta: "ofertorio/oh-padre.html", tono: "DO", capo: 0 },
        "Oración de confianza": { ruta: "meditacion/oracion-de-confianza.html", tono: "DO", capo: 0 },
        "Paz": { ruta: "meditacion/paz.html", tono: "LA", capo: 0 },
        "Perdón (Helena)": { ruta: "meditacion/perdon-helena.html", tono: "DO", capo: 0 },
        "Perfume A Tus Pies": { ruta: "comunion/perfume-a-tus-pies.html", tono: "MI", capo: 0 },
        "Permanecer en ti": { ruta: "meditacion/permanecer-en-ti.html", tono: "SOL", capo: 0 },
        "Pescador de hombres": { ruta: "comunion/pescador-de-hombres.html", tono: "DO", capo: 0 },
        "Por Qué Lloras (María Magdalena)": { ruta: "meditacion/por-que-lloras.html", tono: "RE", capo: 0 },
        "Por un solo momento": { ruta: "meditacion/por-un-solo-momento.html", tono: "DO", capo: 0 },
        "Puer et Pater": { ruta: "meditacion/puer-et-pater.html", tono: "RE", capo: 0 },
        "Que se abra el cielo": { ruta: "espiritu-santo/que-se-abra-el-cielo.html", tono: "MI", capo: 0 },
        "Quiero adorarte": { ruta: "meditacion/quiero-adorarte.html", tono: "DO", capo: 3 },
        "Quiero ser Santo": { ruta: "meditacion/quiero-ser-santo.html", tono: "FA", capo: 1 },
        "Quiero ser tu amigo Jesucristo": { ruta: "comunion/quiero-ser-tu-amigo-jesucristo.html", tono: "SOL", capo: 0 },
        "Regálanos": { ruta: "meditacion/regalanos.html", tono: "MI", capo: 2 },
        "Renace la vida y el corazón": { ruta: "comunion/renace-la-vida-y-el-corazon.html", tono: "SOL", capo: 4 },
        "Restáuranos": { ruta: "meditacion/restauranos.html", tono: "SOL", capo: 0 },
        "Rompe el Silencio": { ruta: "comunion/rompe-el-silencio.html", tono: "SOL", capo: 0 },
        "Sal y luz": { ruta: "comunion/sal-y-luz.html", tono: "SI", capo: 0 },
        "Sáname": { ruta: "meditacion/saname.html", tono: "RE", capo: 0 },
        "Señor de la paz": { ruta: "meditacion/señor-de-la-paz.html", tono: "RE", capo: 0 },
        "Será Dios": { ruta: "comunion/sera-dios.html", tono: "SOL", capo: 0 },
        "Si amo mi vida": { ruta: "comunion/si-amo-mi-vida.html", tono: "SOL", capo: 3 },
        "Si quieres te acompaño en el camino": { ruta: "comunion/si-quieres-te-acompaño-en-el-camino.html", tono: "DO", capo: 0 },
        "Si rasgaras": { ruta: "meditacion/si-rasgaras.html", tono: "SOL", capo: 4 },
        "Siempre has sido Tú": { ruta: "meditacion/siempre-has-sido-tu.html", tono: "LA", capo: 0 },
        "Siempre para ti": { ruta: "comunion/siempre-para-ti.html", tono: "RE", capo: 0 },
        "Sigueme": { ruta: "meditacion/sigueme.html", tono: "MI", capo: 0 },
        "Silencio en el calvario": { ruta: "comunion/silencio-en-el-calvario.html", tono: "DO", capo: 4 },
        "Silencio en la cruz": { ruta: "meditacion/silencio-en-la-cruz.html", tono: "SOL", capo: 0 },
        "Silencio fecundo": { ruta: "meditacion/silencio-fecundo.html", tono: "SOL", capo: 0 },
        "Sobre el mar (Berit II)": { ruta: "comunion/sobre-el-mar-berit2.html", tono: "DO", capo: 0 },
        "Soledad": { ruta: "meditacion/soledad.html", tono: "LA", capo: 0 },
        "Solo por hoy": { ruta: "meditacion/solo-por-hoy.html", tono: "RE", capo: 0 },
        "Solo Tú": { ruta: "meditacion/solo-tu.html", tono: "SOL", capo: 1 },
        "Sopla": { ruta: "meditacion/sopla.html", tono: "RE", capo: 0 },
        "Stabat": { ruta: "meditacion/stabat.html", tono: "LA", capo: 0 },
        "Su canto": { ruta: "meditacion/su-canto.html", tono: "RE", capo: 2 },
        "Subido al sicomoro": { ruta: "meditacion/subido-al-sicomoro.html", tono: "RE", capo: 0 },
        "Supe que me amabas": { ruta: "meditacion/supe-que-me-amabas.html", tono: "LA", capo: 0 },
        "Surge valentía": { ruta: "meditacion/surge-valentia.html", tono: "SOL", capo: 0 },
        "También hoy": { ruta: "meditacion/tambien-hoy.html", tono: "DO", capo: 3 },
        "Te alabo": { ruta: "meditacion/te-alabo.html", tono: "RE", capo: 0 },
        "Te encontré (Mario Gazal)": { ruta: "meditacion/te-encontre.html", tono: "DO", capo: 5 },
        "Te estaba esperando": { ruta: "comunion/te-estaba-esperando.html", tono: "DO", capo: 0 },
        "Te veo": { ruta: "comunion/te-veo.html", tono: "DO", capo: 0 },
        "Tempestad": { ruta: "meditacion/tempestad.html", tono: "SOL", capo: 0 },
        "Torrente de Vida": { ruta: "meditacion/torrente-de-vida.html", tono: "DO", capo: 0 },
        "Transforma mi casa en tu hogar": { ruta: "meditacion/transforma-mi-casa-en-tu-hogar.html", tono: "RE", capo: 0 },
        "Transformación en Pentecostes": { ruta: "meditacion/transformacion-en-pentecostes.html", tono: "MI", capo: 2 },
        "Tú, el único Rey": { ruta: "meditacion/tu-el-unico-rey.html", tono: "DO", capo: 0 },
        "Tu estás aquí / De tal manera": { ruta: "meditacion/tu-estas-aqui-de-tal-manera.html", tono: "SOL", capo: 0 },
        "Tu luz (Contigo + Feliz)": { ruta: "comunion/tu-luz.html", tono: "SOL", capo: 5 },
        "Tu luz (Signos de amor)": { ruta: "meditacion/tu-luz-signos-de-amor.html", tono: "LA", capo: 2 },
        "Tu modo": { ruta: "meditacion/tu-modo.html", tono: "LA", capo: 0 },
        "Tu voluntad": { ruta: "meditacion/tu-voluntad.html", tono: "LA", capo: 0 },
        "Tu voluntad (Servus Mariae)": { ruta: "meditacion/tu-voluntad-servus.html", tono: "SI", capo: 0 },
        "Una cuerda menos": { ruta: "meditacion/una-cuerda-menos.html", tono: "LA", capo: 0 },
        "Velad por mi": { ruta: "meditacion/velad-por-mi.html", tono: "SOL", capo: 0 },
        "Ven Espíritu de amor": { ruta: "espiritu-santo/ven-espiritu-de-amor.html", tono: "RE", capo: 0 },
        "Ven Espíritu Divino": { ruta: "espiritu-santo/ven-espiritu-divino.html", tono: "DO", capo: 0 },
        "Ven y sígueme": { ruta: "meditacion/ven-y-sigueme.html", tono: "LA", capo: 0 },
        "Ven y verás": { ruta: "meditacion/ven-y-veras.html", tono: "DO", capo: 0 },
        "Vengan a mí": { ruta: "meditacion/vengan-a-mi.html", tono: "SOL", capo: 0 },
        "Vengo a adorarte": { ruta: "meditacion/vengo-a-adorarte.html", tono: "RE", capo: 0 },
        "Verás cosas mayores": { ruta: "meditacion/veras-cosas-mayores.html", tono: "DO", capo: 5 },
        "Vivir amando": { ruta: "meditacion/vivir-amando.html", tono: "RE", capo: 0 },
        "Vuelve a mi": { ruta: "meditacion/vuelve-a-mi.html", tono: "SOL", capo: 2 },
        "Vuelvo a ti": { ruta: "meditacion/vuelvo-a-ti.html", tono: "SOL", capo: 0 }
    },
    "Salida": {
        "Alma Misionera": { ruta: "entrada/alma-misionera.html", tono: "MI", capo: 0 },
        "Alzar banderas": { ruta: "comunion/alzar-banderas.html", tono: "DO", capo: 0 },
        "Avanza Reina": { ruta: "salida/avanza-reina.html", tono: "RE", capo: 2 },
        "Ave María": { ruta: "salida/ave-maria.html", tono: "MI", capo: 0 },
        "Dios te salve": { ruta: "salida/dios-te-salve.html", tono: "SOL", capo: 0 },
        "Enciende nuestra misión": { ruta: "comunion/enciende-nuestra-mision.html", tono: "MI", capo: 0 },
        "Este es mi hogar": { ruta: "salida/este-es-mi-hogar.html", tono: "RE", capo: 0 },
        "Hay un río de vida": { ruta: "salida/hay-un-rio-de-vida.html", tono: "RE", capo: 0 },
        "Ignis Mariae": { ruta: "salida/ignis-mariae.html", tono: "LA", capo: 0 },
        "Junto a tí María": { ruta: "salida/junto-a-ti-maria.html", tono: "RE", capo: 0 },
        "La de siempre": { ruta: "salida/la-de-siempre.html", tono: "MI", capo: 0 },
        "Mar adentro": { ruta: "salida/mar-adentro.html", tono: "MI", capo: 3 },
        "María de la Alianza": { ruta: "salida/maria-de-la-alianza.html", tono: "LA", capo: 1 },
        "Misioneros": { ruta: "salida/misioneros.html", tono: "LA", capo: 0 },
        "Reina de mi corazón": { ruta: "salida/reina-de-mi-corazon.html", tono: "RE", capo: 0 },
        "Sobre el mar": { ruta: "salida/sobre-el-mar.html", tono: "DO", capo: 0 },
        "Somos jm, somos iglesia": { ruta: "comunion/somos-jm-somos-iglesia.html", tono: "SOL", capo: 0 },
        "Voces de Esperanza": { ruta: "espiritu-santo/voces-de-esperanza.html", tono: "MI", capo: 0 },
        "Ven y reina, madre de Dios": { ruta: "salida/ven-y-reina-madre-de-dios.html", tono: "DO", capo: 3 }
    },
    "Marianos": {
        "A tanto amor": { ruta: "marianos/a-tanto-amor.html", tono: "SOL", capo: 0 },
        "Abrazada a ti en tu cruz": { ruta: "marianos/abrazada-a-ti-en-tu-cruz.html", tono: "SOL", capo: 0 },
        "Avanza Reina": { ruta: "salida/avanza-reina.html", tono: "RE", capo: 2 },
        "Ave María": { ruta: "salida/ave-maria.html", tono: "MI", capo: 0 },
        "Dios te salve": { ruta: "salida/dios-te-salve.html", tono: "SOL", capo: 0 },
        "El diario de María": { ruta: "marianos/el-diario-de-maria.html", tono: "LA", capo: 0 },
        "En tus ojos": { ruta: "comunion/en-tus-ojos.html", tono: "SOL", capo: 0 },
        "Esclava de mi salvador": { ruta: "comunion/esclava-de-mi-salvador.html", tono: "RE", capo: 2 },
        "Hasta que el mundo arda por Él": { ruta: "comunion/hasta-que-el-mundo-arda-por-el.html", tono: "SOL", capo: 0 },
        "Junto a ti María": { ruta: "salida/junto-a-ti-maria.html", tono: "RE", capo: 0 },
        "Juremos con gloria morir": { ruta: "comunion/juremos-con-gloria-morir.html", tono: "SOL", capo: 0 },
        "La de siempre": { ruta: "salida/la-de-siempre.html", tono: "MI", capo: 0 },
        "Magnificat (Portugués)": { ruta: "meditacion/magnificat.html", tono: "DO", capo: 0 },
        "María (Servus Mariae)": { ruta: "marianos/maria-servus-mariae.html", tono: "SOL", capo: 0 },
        "María de la alianza": { ruta: "salida/maria-de-la-alianza.html", tono: "LA", capo: 1 },
        "María está pasando por aquí": { ruta: "marianos/maria-esta-pasando-por-aqui.html", tono: "DO", capo: 0 },
        "María Madre": { ruta: "comunion/maria-madre.html", tono: "MI", capo: 0 },
        "María tierra del Padre": { ruta: "comunion/maria-tierra-del-padre.html", tono: "LA", capo: 0 },
        "María Vai": { ruta: "comunion/maria-vai.html", tono: "DO", capo: 0 },
        "Nuestra Alianza": { ruta: "comunion/nuestra-alianza.html", tono: "MI", capo: 0 },
        "Oración de consagración": { ruta: "marianos/oracion-de-consagracion.html", tono: "SOL", capo: 0 },
        "Para que todos tengan vida": { ruta: "comunion/para-que-todos-tengan-vida.html", tono: "FA", capo: 0 },
        "Reina de mi corazón": { ruta: "salida/reina-de-mi-corazon.html", tono: "RE", capo: 0 },
        "Reina y Madre": { ruta: "marianos/reina-y-madre.html", tono: "SOL", capo: 0 },
        "Se llama María": { ruta: "marianos/se-llama-maria.html", tono: "DO", capo: 0 },
        "Su canto": { ruta: "meditacion/su-canto.html", tono: "RE", capo: 2 },
        "Tu amor": { ruta: "comunion/tu-amor.html", tono: "LA", capo: 0 }
    },
    "Envío": {
        "Alma Misionera": { ruta: "entrada/alma-misionera.html", tono: "mi", capo: 0 },
        "Alzar banderas": { ruta: "comunion/alzar-banderas.html", tono: "DO", capo: 0 },
        "Avanza Reina": { ruta: "salida/avanza-reina.html", tono: "RE", capo: 2 },
        "Deja que nazca": { ruta: "entrada/deja-que-nazca.html", tono: "MI", capo: 0 },
        "Estandarte": { ruta: "comunion/estandarte.html", tono: "RE", capo: 0 },
        "Hay un río de vida": { ruta: "salida/hay-un-rio-de-vida.html", tono: "RE", capo: 0 },
        "Ignis Mariae": { ruta: "salida/ignis-mariae.html", tono: "LA", capo: 0 },
        "Mar adentro": { ruta: "salida/mar-adentro.html", tono: "MI", capo: 3 },
        "Misioneros": { ruta: "salida/misioneros.html", tono: "LA", capo: 0 },
        "Salmo 28": { ruta: "salmos/salmo-28.html", tono: "LA", capo: 0 },
        "Se llama María": { ruta: "marianos/se-llama-maria.html", tono: "DO", capo: 0 },
        "Sobre el mar": { ruta: "salida/sobre-el-mar.html", tono: "DO", capo: 0 },
        "Somos JM, somos iglesia": { ruta: "comunion/somos-jm-somos-iglesia.html", tono: "SOL", capo: 0 },
        "Voces de Esperanza": { ruta: "espiritu-santo/voces-de-esperanza.html", tono: "MI", capo: 0 }
    },
    "Espíritu Santo": {
        "Derrama": { ruta: "meditacion/derrama.html", tono: "DO", capo: 4 },
        "Espíritu Santo": { ruta: "espiritu-santo/espiritu-santo.html", tono: "RE", capo: 0 },
        "Espíritu desciende": { ruta: "espiritu-santo/espiritu-desciende.html", tono: "RE", capo: 0 },
        "Fuego Santo": { ruta: "espiritu-santo/fuego-santo.html", tono: "DO", capo: 0 },
        "Maranatha": { ruta: "espiritu-santo/maranatha.html", tono: "SOL", capo: 1 },
        "Que se abra el cielo": { ruta: "espiritu-santo/que-se-abra-el-cielo.html", tono: "MI", capo: 0 },
        "Ven Espíritu de Amor": { ruta: "espiritu-santo/ven-espiritu-de-amor.html", tono: "RE", capo: 0 },
        "Ven Espíritu Divino": { ruta: "espiritu-santo/ven-espiritu-divino.html", tono: "DO", capo: 0 },
        "Ven Espíritu Santo": { ruta: "espiritu-santo/ven-espiritu-santo.html", tono: "RE", capo: 0 },
        "Viento de Dios": { ruta: "espiritu-santo/viento-de-dios.html", tono: "SOL", capo: 0 },
        "Voces de Esperanza": { ruta: "espiritu-santo/voces-de-esperanza.html", tono: "MI", capo: 0 }
    },
    "Adoración": {
        "A Él la Gloria": { ruta: "meditacion/a-el-la-gloria.html", tono: "SOL", capo: 2 },
        "A Ti Te Alabo": { ruta: "meditacion/a-ti-te-alabo.html", tono: "DO", capo: 3 },
        "Abre": { ruta: "comunion/abre.html", tono: "LA", capo: 0 },
        "Acógeme": { ruta: "meditacion/acogeme.html", tono: "RE", capo: 1 },
        "Alabado sea el Santísimo": { ruta: "adoracion/alabado-sea-el-santisimo.html", tono: "DO", capo: 0 },
        "Alábenlo": { ruta: "meditacion/alabenlo.html", tono: "LA", capo: 0 },
        "Algo de paz": { ruta: "meditacion/algo-de-paz.html", tono: "RE", capo: 0 },
        "Alma de Cristo": { ruta: "meditacion/alma-de-cristo.html", tono: "LA", capo: 0 },
        "Arde": { ruta: "meditacion/arde.html", tono: "RE", capo: 0 },
        "Baja hasta lo más hondo": { ruta: "meditacion/baja-hasta-lo-mas-hondo.html", tono: "SOL", capo: 0 },
        "Barro soy": { ruta: "meditacion/barro-soy.html", tono: "RE", capo: 0 },
        "Caminho de eternidade": { ruta: "meditacion/caminho-de-eternidade.html", tono: "RE", capo: 0 },
        "Camino, Verdad y Vida": { ruta: "comunion/camino-verdad-y-vida.html", tono: "DO", capo: 0 },
        "Cántaro Niño": { ruta: "comunion/cantaro-niño.html", tono: "RE", capo: 0 },
        "Cara a cara": { ruta: "meditacion/cara-a-cara.html", tono: "LA", capo: 0 },
        "Con vos": { ruta: "comunion/con-vos.html", tono: "MI", capo: 0 },
        "Confiaré en tu amor": { ruta: "meditacion/confiare-en-tu-amor.html", tono: "SOL", capo: 4 },
        "Conozco tu corazón": { ruta: "meditacion/conozco-tu-corazon.html", tono: "SOL", capo: 0 },
        "Cristo calla": { ruta: "meditacion/cristo-calla.html", tono: "SOL", capo: 0 },
        "Cristo reina": { ruta: "meditacion/cristo-reina.html", tono: "DO", capo: 0 },
        "Cristo Rey": { ruta: "meditacion/cristo-rey.html", tono: "RE", capo: 2 },
        "Dame Tu Sí": { ruta: "comunion/dame-tu-si.html", tono: "SOL", capo: 4 },
        "Dame tus ojos": { ruta: "meditacion/dame-tus-ojos.html", tono: "DO", capo: 0 },
        "Déjate": { ruta: "comunion/dejate.html", tono: "DO", capo: 0 },
        "Derrama": { ruta: "meditacion/derrama.html", tono: "DO", capo: 4 },
        "Digno de alabar": { ruta: "meditacion/digno-de-alabar.html", tono: "SOL", capo: 0 },
        "Dime Rey": { ruta: "meditacion/dime-rey.html", tono: "LA", capo: 0 },
        "Él me miró": { ruta: "meditacion/el-me-miro.html", tono: "SOL", capo: 1 },
        "El que muere por mi": { ruta: "comunion/el-que-muere-por-mi.html", tono: "DO", capo: 2},
        "El sale a tu encuentro": { ruta: "comunion/el-sale-a-tu-encuentro.html", tono: "MI", capo: 0 },
        "En ti descansar": { ruta: "meditacion/en-ti-descansar.html", tono: "SOL", capo: 0 },
        "En tu misericordia": { ruta: "meditacion/en-tu-misericordia.html", tono: "RE", capo: 0 },
        "En tus ojos": { ruta: "comunion/en-tus-ojos.html", tono: "SOL", capo: 0 },
        "Eres": { ruta: "comunion/eres.html", tono: "SOL", capo: 4 },
        "Escúchame Dios": { ruta: "meditacion/escuchame-dios.html", tono: "SOL", capo: 0 },
        "Esperanza": { ruta: "meditacion/esperanza.html", tono: "SOL", capo: 3 },
        "Espíritu desciende": { ruta: "espiritu-santo/espiritu-desciende.html", tono: "RE", capo: 0 },
        "Espíritu Santo": { ruta: "espiritu-santo/espiritu-santo.html", tono: "RE", capo: 0 },
        "Estar con Él": { ruta: "meditacion/estar-con-el.html", tono: "SOL", capo: 0 },
        "Estate": { ruta: "meditacion/estate.html", tono: "SOL", capo: 0 },
        "Esto que soy, esto te doy": { ruta: "ofertorio/esto-que-soy-esto-te-doy.html", tono: "DO", capo: 0 },
        "Extiende tu mano": { ruta: "meditacion/extiende-tu-mano.html", tono: "DO", capo: 0 },
        "Ha sido largo el viaje": { ruta: "comunion/ha-sido-largo-el-viaje.html", tono: "MI", capo: 0 },
        "Hago nuevas todas las cosas": { ruta: "meditacion/hago-nuevas-todas-las-cosas.html", tono: "SOL", capo: 0 },
        "Haz llover": { ruta: "meditacion/haz-llover.html", tono: "DO", capo: 0 },
        "Haz llover x Que se abra el cielo": { ruta: "meditacion/haz-llover-x-que-se-abra-el-cielo.html", tono: "SOL", capo: 0 },
        "Hijo amado": { ruta: "meditacion/hijo-amado.html", tono: "SI", capo: 0 },
        "Hoy quiero mirarte": { ruta: "meditacion/hoy-quiero-mirarte.html", tono: "RE", capo: 0 },
        "Jesús": { ruta: "meditacion/jesus.html", tono: "DO", capo: 0 },
        "Jesús (Berit II)": { ruta: "meditacion/jesus-berit2.html", tono: "DO", capo: 0 },
        "Llevame a la cruz / Nadie igual": { ruta: "meditacion/llevame-a-la-cruz-nadie-igual.html", tono: "LA", capo: 0 },
        "Maranatha": { ruta: "espiritu-santo/maranatha.html", tono: "SOL", capo: 1 },
        "Me quieres?": { ruta: "meditacion/me-quieres.html", tono: "MI", capo: 0 },
        "Mi 110%": { ruta: "meditacion/mi-110.html", tono: "FA", capo: 0 },
        "Mi alma descansa en ti": { ruta: "meditacion/mi-alma-descansa-en-ti.html", tono: "LA", capo: 0 },
        "Mi entrega a ti": { ruta: "meditacion/mi-entrega-a-ti.html", tono: "RE", capo: 0 },
        "Milagro de amor": { ruta: "meditacion/milagro-de-amor.html", tono: "SOL", capo: 2 },
        "Nada te turbe": { ruta: "meditacion/nada-te-turbe.html", tono: "RE", capo: 2 },
        "Nadie te ama como yo": { ruta: "meditacion/nadie-te-ama-como-yo.html", tono: "LA", capo: 0 },
        "No hay amor más grande": { ruta: "comunion/no-hay-amor-mas-grande.html", tono: "DO", capo: 0 },
        "No mueras hermano": { ruta: "meditacion/no-mueras-hermano.html", tono: "SOL", capo: 0 },
        "Noche": { ruta: "meditacion/noche.html", tono: "FA", capo: 0 },
        "Paz": { ruta: "meditacion/paz.html", tono: "LA", capo: 0 },
        "Perfume A Tus Pies": { ruta: "comunion/perfume-a-tus-pies.html", tono: "MI", capo: 0 },
        "Permanecer en ti": { ruta: "meditacion/permanecer-en-ti.html", tono: "SOL", capo: 0 },
        "Por Qué Lloras (María Magdalena)": { ruta: "meditacion/por-que-lloras.html", tono: "RE", capo: 0 },
        "Que se abra el cielo": { ruta: "espiritu-santo/que-se-abra-el-cielo.html", tono: "MI", capo: 0 },
        "Quiero adorarte": { ruta: "meditacion/quiero-adorarte.html", tono: "DO", capo: 3 },
        "Quiero ser Santo": { ruta: "meditacion/quiero-ser-santo.html", tono: "FA", capo: 1 },
        "Regálanos": { ruta: "meditacion/regalanos.html", tono: "MI", capo: 2 },
        "Restáuranos": { ruta: "meditacion/restauranos.html", tono: "SOL", capo: 0 },
        "Señor de la paz": { ruta: "meditacion/señor-de-la-paz.html", tono: "RE", capo: 0 },
        "Si quieres te acompaño en el camino": { ruta: "comunion/si-quieres-te-acompaño-en-el-camino.html", tono: "DO",capo: 0 },
        "Si rasgaras": { ruta: "meditacion/si-rasgaras.html", tono: "SOL", capo: 4 },
        "Siempre para ti": { ruta: "comunion/siempre-para-ti.html", tono: "RE", capo: 0 },
        "Sígueme": { ruta: "meditacion/sigueme.html", tono: "MI", capo: 0 },
        "Silencio en el calvario": { ruta: "comunion/silencio-en-el-calvario.html", tono: "DO", capo: 4 },
        "Silencio en la cruz": { ruta: "meditacion/silencio-en-la-cruz.html", tono: "SOL", capo: 0 },
        "Silencio fecundo": { ruta: "meditacion/silencio-fecundo.html", tono: "SOL", capo: 0 },
        "Sobre el mar (Berit II)": { ruta: "comunion/sobre-el-mar-berit2.html", tono: "DO", capo: 0 },
        "Soledad": { ruta: "meditacion/soledad.html", tono: "LA", capo: 0 },
        "Solo Tú": { ruta: "meditacion/solo-tu.html", tono: "SOL", capo: 1 },
        "Sopla": { ruta: "meditacion/sopla.html", tono: "RE", capo: 0 },
        "Stabat": { ruta: "meditacion/stabat.html", tono: "LA", capo: 0 },
        "Supe que me amabas": { ruta: "meditacion/supe-que-me-amabas.html", tono: "LA", capo: 0 },
        "Surge valentía": { ruta: "meditacion/surge-valentia.html", tono: "SOL", capo: 0 },
        "También hoy": { ruta: "meditacion/tambien-hoy.html", tono: "DO", capo: 3 },
        "Te alabo": { ruta: "meditacion/te-alabo.html", tono: "RE", capo: 0 },
        "Te encontré": { ruta: "meditacion/te-encontre.html", tono: "DO", capo: 5 },
        "Te estaba esperando": { ruta: "comunion/te-estaba-esperando.html", tono: "DO", capo: 0 },
        "Te veo": { ruta: "comunion/te-veo.html", tono: "DO", capo: 0 },
        "Tempestad": { ruta: "meditacion/tempestad.html", tono: "SOL", capo: 0 },
        "Transformación en Pentecostés": { ruta: "meditacion/transformacion-en-pentecostes.html", tono: "MI", capo: 2 },
        "Tú, el único Rey": { ruta: "meditacion/tu-el-unico-rey.html", tono: "DO", capo: 0 },
        "Tu estás aquí / De tal manera": { ruta: "meditacion/tu-estas-aqui-de-tal-manera.html", tono: "SOL", capo: 0 },
        "Tu luz (Signos de amor)": { ruta: "meditacion/tu-luz-signos-de-amor.html", tono: "LA", capo: 2 },
        "Tu voluntad (Servus Mariae)": { ruta: "meditacion/tu-voluntad-servus.html", tono: "SI", capo: 0 },
        "Velad por mi": { ruta: "meditacion/velad-por-mi.html", tono: "SOL", capo: 0 },
        "Ven Espíritu de amor": { ruta: "espiritu-santo/ven-espiritu-de-amor.html", tono: "RE", capo: 0 },
        "Ven Jesús de Nazareth": { ruta: "comunion/ven-jesus-de-nazareth.html", tono: "RE", capo: 2 },
        "Ven y verás": { ruta: "meditacion/ven-y-veras.html", tono: "DO", capo: 0 },
        "Vengo a adorarte": { ruta: "meditacion/vengo-a-adorarte.html", tono: "RE", capo: 0 }
    },
    "JM":{
        "Alzar banderas": { ruta: "comunion/alzar-banderas.html", tono: "DO", capo: 0 },
        "Corazón de Fuego": { ruta: "jm/corazon-de-fuego.html", tono: "MI", capo: 0 },
        "Estandarte": { ruta: "comunion/estandarte.html", tono: "RE", capo: 0 },
        "Hasta que el mundo arda por Él": { ruta: "comunion/hasta-que-el-mundo-arda-por-el.html", tono: "SOL", capo: 0 },
        "Herencia (José Engling)": { ruta: "jm/herencia.html", tono: "DO", capo: 0 },
        "Himno de José Engling": { ruta: "jm/himno-de-jose-engling.html", tono: "FA", capo: 1 },
        "Juremos con gloria morir": { ruta: "comunion/juremos-con-gloria-morir.html", tono: "SOL", capo: 0 },
        "Mi 110%": { ruta: "meditacion/mi-110.html", tono: "FA", capo: 0 },
        "Oración de Franz Reinisch": { ruta: "jm/oracion-de-franz-reinisch.html", tono: "SOL", capo: 0 },
        "Pasión que transforma": { ruta: "comunion/pasion-que-transforma.html", tono: "RE", capo: 0 },
        "Puer et Pater": { ruta: "meditacion/puer-et-pater.html", tono: "RE", capo: 0 },
        "Somos JM, somos iglesia": { ruta: "comunion/somos-jm-somos-iglesia.html", tono: "SOL", capo: 0 },
        "Stabat": { ruta: "meditacion/stabat.html", tono: "LA", capo: 0 }
    },
    "JF":{
        "Abrazo de Padre": {ruta:"jf/abrazo-de-padre.html", tono: "DO", capo: 1 },
        "Generación fundadora": {ruta:"jf/generacion-fundadora.html", tono: "SOL", capo: 0 },
        "Talita Kum": {ruta:"jf/talita-kum.html", tono: "DO", capo: 0 }
    },
    "Tierra Nueva de la Trinidad": {
        "Siempre has sido tú": { ruta: "meditacion/siempre-has-sido-tu.html", tono: "LA", capo: 0 },
        "Agradecimiento": { ruta: "tierra-nueva-de-la-trinidad/agradecimiento.html", tono: "RE", capo: 0 },
        "Señor de mi barca": { ruta: "tierra-nueva-de-la-trinidad/señor-de-mi-barca.html", tono: "RE", capo: 0 },
        "Cristo del calvario": { ruta: "tierra-nueva-de-la-trinidad/cristo-del-calvario.html", tono: "RE", capo: 2 },
        "Hacia Ti": { ruta: "tierra-nueva-de-la-trinidad/hacia-ti.html", tono: "RE", capo: 0 },
        "Estás dentro de mí": { ruta: "tierra-nueva-de-la-trinidad/estas-dentro-de-mi.html", tono: "LA", capo: 0 },
        "Espíritu Santo (Hacia el Padre)": { ruta: "tierra-nueva-de-la-trinidad/espiritu-santo-hacia-el-padre.html", tono: "RE", capo: 0 },
        "Tierra nueva de la trinidad": { ruta: "tierra-nueva-de-la-trinidad/tierra-nueva-de-la-trinidad.html", tono: "LA", capo: 0 },
        "Quien me quiera seguir": { ruta: "tierra-nueva-de-la-trinidad/quien-me-quiera-seguir.html", tono: "DO", capo: 2 },
        "Confío (En tu poder y en tu bondad)": { ruta: "tierra-nueva-de-la-trinidad/confio.html", tono: "RE", capo: 0 },
        "Madre, aquí estoy": { ruta: "tierra-nueva-de-la-trinidad/madre-aqui-estoy.html", tono: "RE", capo: 0 },
        "María de la Alianza": { ruta: "salida/maria-de-la-alianza.html", tono: "LA", capo: 1 },
        "Solo basta Dios": { ruta: "tierra-nueva-de-la-trinidad/solo-basta-dios.html", tono: "RE", capo: 0 },
        "Por ti, hija de Sion": { ruta: "tierra-nueva-de-la-trinidad/por-ti-hija-de-sion.html", tono: "DO", capo: 0 }
    },
    "Quiero Construirte una Casa Señor": {
        "Quiero construirte una casa, Señor": { ruta: "quiero-construirte-una-casa-señor/quiero-construirte-una-casa-señor.html", tono: "LA", capo: 0 },
        "Desierto": { ruta: "quiero-construirte-una-casa-señor/desierto.html", tono: "SOL", capo: 0 },
        "Quien eres tú": { ruta: "quiero-construirte-una-casa-señor/quien-eres-tu.html", tono: "DO", capo: 0 },
        "Madre aquí estoy": { ruta: "quiero-construirte-una-casa-señor/madre-aqui-estoy-qcucs.html", tono: "LA", capo: 3 },
        "Mi Señor, mi Dios": { ruta: "quiero-construirte-una-casa-señor/mi-señor-mi-dios.html", tono: "LA", capo: 3 },
        "Ofrenda (Trilla y Vendimia)": { ruta: "quiero-construirte-una-casa-señor/ofrenda.html", tono: "DO", capo: 0 },
        "Venid a mi": { ruta: "quiero-construirte-una-casa-señor/venid-a-mi.html", tono: "LA", capo: 3 },
        "Siervo de Dios": { ruta: "quiero-construirte-una-casa-señor/siervo-de-dios.html", tono: "RE", capo: 0 },
        "Ven y verás": { ruta: "quiero-construirte-una-casa-señor/ven-y-veras-qcucs.html", tono: "SOL", capo: 0 },
        "Pasas Madre": { ruta: "quiero-construirte-una-casa-señor/pasas-madre.html", tono: "DO", capo: 0 },
        "Encuentro": { ruta: "quiero-construirte-una-casa-señor/encuentro.html", tono: "MI", capo: 1 },
        "Con la vuelta del Sol": { ruta: "quiero-construirte-una-casa-señor/con-la-vuelta-del-sol.html", tono: "DO", capo: 1 },
        "Pastor y Cordero": { ruta: "quiero-construirte-una-casa-señor/pastor-y-cordero.html", tono: "RE", capo: 2 },
        "Si pudiera": { ruta: "quiero-construirte-una-casa-señor/si-pudiera.html", tono: "MI", capo: 0 }
    },
    "Hoy Quiero Cantarte": {
        "Alza mi paz": { ruta: "comunion/alza-mi-paz.html", tono: "DO", capo: 0 },
        "Tu canto": { ruta: "hoy-quiero-cantarte/tu-canto.html", tono: "DO", capo: 0 },
        "Brille tu luz Señor": { ruta: "hoy-quiero-cantarte/brille-tu-luz-señor.html", tono: "RE", capo: 0 },
        "Que el fuego se transforme": { ruta: "hoy-quiero-cantarte/que-el-fuego-se-transforme.html", tono: "RE", capo: 0 },
        "Vivir en ti": { ruta: "hoy-quiero-cantarte/vivir-en-ti.html", tono: "DO", capo: 1 },
        "Esperaban en Jerusalén": { ruta: "hoy-quiero-cantarte/esperaban-en-jerusalen.html", tono: "FA", capo: 0 },
        "Señor de mis silencios": { ruta: "hoy-quiero-cantarte/señor-de-mis-silencios.html", tono: "LA", capo: 3 },
        "María de la trinidad": { ruta: "hoy-quiero-cantarte/maria-de-la-trinidad.html", tono: "RE", capo: 2 },
        "De mi vida eres el sol": { ruta: "hoy-quiero-cantarte/de-mi-vida-eres-el-sol.html", tono: "RE", capo: 2 },
        "Primera misionera": { ruta: "hoy-quiero-cantarte/primera-misionera.html", tono: "DO", capo: 0 },
        "Regreso": { ruta: "hoy-quiero-cantarte/regreso.html", tono: "SOL", capo: 0 },
        "Transforma mi casa en tu hogar": { ruta: "meditacion/transforma-mi-casa-en-tu-hogar.html", tono: "RE", capo: 0 },
        "Quiero decir tu nombre": { ruta: "hoy-quiero-cantarte/quiero-decir-tu-nombre.html", tono: "MI", capo: 1 },
        "Buenas noches Padre Dios": { ruta: "hoy-quiero-cantarte/buenas-noches-padre-dios.html", tono: "LA", capo: 0 }
    },
    "Santuario Corazón": {
        "Para darlo a los demás": { ruta: "ofertorio/para-darlo-a-los-demas.html", tono: "RE", capo: 0 },
        "Amanecer": { ruta: "meditacion/amanecer.html", tono: "FA", capo: 0 },
        "Amén del Padre": { ruta: "santuario-corazon/amen-del-padre.html", tono: "SOL", capo: 0 },
        "Argentina nos necesita": { ruta: "santuario-corazon/argentina-nos-necesita.html", tono: "SOL", capo: 0 },
        "En tus manos": { ruta: "santuario-corazon/en-tus-manos.html", tono: "DO", capo: 0 },
        "Deja que nazca": { ruta: "entrada/deja-que-nazca.html", tono: "MI", capo: 0 },
        "No mueras hermano": { ruta: "meditacion/no-mueras-hermano.html", tono: "SOL", capo: 0 },
        "Espíritu conquistado": { ruta: "santuario-corazon/espiritu-conquistado.html", tono: "RE", capo: 0 },
        "Ave imperatrix": { ruta: "santuario-corazon/ave-imperatrix.html", tono: "SOL", capo: 0 },
        "Jardín oculto": { ruta: "santuario-corazon/jardin-oculto.html", tono: "LA", capo: 0 },
        "Stabat": { ruta: "meditacion/stabat.html", tono: "LA", capo: 0 },
        "Cayado de amor": { ruta: "meditacion/cayado-de-amor.html", tono: "DO", capo: 0 }
    },
    "Como un Niño": {
        "Bendita eres Madre": { ruta: "como-un-niño/bendita-eres-madre.html", tono: "DO", capo: 2 },
        "En ti": { ruta: "meditacion/en-ti.html", tono: "SOL", capo: 0 },
        "Es el Señor": { ruta: "como-un-niño/es-el-señor.html", tono: "MI", capo: 0 },
        "Haz que el sol de Cristo": { ruta: "como-un-niño/haz-que-el-sol-de-cristo.html", tono: "LA", capo: 0 },
        "Por tu pureza": { ruta: "como-un-niño/por-tu-pureza.html", tono: "DO", capo: 2 },
        "Lázaro": { ruta: "como-un-niño/lazaro.html", tono: "RE", capo: 2 },
        "Rema": { ruta: "como-un-niño/rema.html", tono: "DO", capo: 4 },
        "Canción de Elías": { ruta: "como-un-niño/cancion-de-elias.html", tono: "SOL", capo: 2 },
        "Amar": { ruta: "como-un-niño/amar.html", tono: "SOL", capo: 0 },
        "Mi buen pastor": { ruta: "como-un-niño/mi-buen-pastor.html", tono: "DO", capo: 2 },
        "Por ti con alegría": { ruta: "como-un-niño/por-ti-con-alegria.html", tono: "MI", capo: 0 },
        "Te adoro con fe": { ruta: "como-un-niño/te-adoro-con-fe.html", tono: "MI", capo: 2 },
        "Lo nuestro": { ruta: "como-un-niño/lo-nuestro.html", tono: "SOL", capo: 0 },
        "Al caer la tarde": { ruta: "como-un-niño/al-caer-la-tarde.html", tono: "LA", capo: 0 },
        "Mar adentro": { ruta: "como-un-niño/mar-adentro-cun.html", tono: "RE", capo: 2 },
        "Hijos": { ruta: "como-un-niño/hijos.html", tono: "RE", capo: 0 },
        "Asemejanos a ti": { ruta: "como-un-niño/asemejanos-a-ti.html", tono: "RE", capo: 0 },
        "Vuela": { ruta: "como-un-niño/vuela.html", tono: "RE", capo: 0 },
        "Padre nuestro": { ruta: "como-un-niño/padre-nuestro-cun.html", tono: "RE", capo: 2 },
        "Como un niño": { ruta: "comunion/como-un-niño.html", tono: "SOL", capo: 0 }
    },
    "Porta": {
        "Más allá del mar": { ruta: "comunion/mas-alla-del-mar.html", tono: "MI", capo: 0 },
        "De una historia entre dos": { ruta: "porta/de-una-historia-entre-dos.html", tono: "DO", capo: 0 },
        "Será Dios": { ruta: "comunion/sera-dios.html", tono: "SOL", capo: 0 },
        "Alzar banderas": { ruta: "comunion/alzar-banderas.html", tono: "DO", capo: 0 },
        "El que muere por mi": { ruta: "comunion/el-que-muere-por-mi.html", tono: "DO", capo: 2 },
        "Soñar": { ruta: "comunion/soñar.html", tono: "MI", capo: 0 },
        "Confia": { ruta: "porta/confia.html", tono: "LA", capo: 1 },
        "Ego Paulus": { ruta: "comunion/ego-paulus.html", tono: "SOL", capo: 0 },
        "Entrega": { ruta: "porta/entrega.html", tono: "SOL", capo: 0 },
        "María, luz de esperanza": { ruta: "porta/maria-luz-de-esperanza.html", tono: "FA", capo: 0 },
        "Estamos aquí": { ruta: "comunion/estamos-aqui.html", tono: "MI", capo: 0 },
        "Contigo María": { ruta: "porta/contigo-maria.html", tono: "RE", capo: 0 }
    },
    "Ciudad Multicor": {
        "La de siempre": { ruta: "salida/la-de-siempre.html", tono: "MI", capo: 0 },
        "Tu amor": { ruta: "comunion/tu-amor.html", tono: "LA", capo: 0 },
        "Te vuelvo a entregar": { ruta: "ciudad-multicor/te-vuelvo-a-entregar.html", tono: "DO", capo: 0 },
        "Cena de jueves": { ruta: "comunion/cena-de-jueves.html", tono: "DO", capo: 0 },
        "Brother to brother": { ruta: "ciudad-multicor/brother-to-brother.html", tono: "LA", capo: 0 },
        "Cristo Rey": { ruta: "meditacion/cristo-rey.html", tono: "RE", capo: 2 },
        "Alimento que da vida": { ruta: "ofertorio/alimento-que-da-vida.html", tono: "RE", capo: 2 },
        "Cuerdas de barro": { ruta: "ciudad-multicor/cuerdas-de-barro.html", tono: "LA", capo: 0 },
        "Vivir": { ruta: "ciudad-multicor/vivir.html", tono: "RE", capo: 0 },
        "Kurahy Ose Jevy (El sol vuelve a alumbrar)": { ruta: "ciudad-multicor/kuarahy-ose-jevy.html", tono: "SOL", capo: 0 },
        "Abriendo el sol": { ruta: "ciudad-multicor/abriendo-el-sol.html", tono: "LA", capo: 0 },
        "No hay amor más grande": { ruta: "comunion/no-hay-amor-mas-grande.html", tono: "DO", capo: 0 },
        "María Madre": { ruta: "comunion/maria-madre.html", tono: "MI", capo: 0 },
        "Estandarte": { ruta: "comunion/estandarte.html", tono: "RE", capo: 0 },
        "Sião Multicor": { ruta: "ciudad-multicor/siao-multicor.html", tono: "MI", capo: 0 }
    },
    "En Tus Ojos": {
        "Avanza Reina": { ruta: "salida/avanza-reina.html", tono: "RE", capo: 2 },
        "Quiero cantar": { ruta: "en-tus-ojos/quiero-cantar.html", tono: "LA", capo: 0 },
        "En tus ojos": { ruta: "comunion/en-tus-ojos.html", tono: "SOL", capo: 0 },
        "Movimiento": { ruta: "en-tus-ojos/movimiento.html", tono: "DO", capo: 0 },
        "De tu mano": { ruta: "en-tus-ojos/de-tu-mano.html", tono: "SOL", capo: 0 },
        "Mi alianza de amor": { ruta: "en-tus-ojos/mi-alianza-de-amor.html", tono: "RE", capo: 0 },
        "Navegar la barca": { ruta: "en-tus-ojos/navegar-la-barca.html", tono: "LA", capo: 0 },
        "Mirarán al que traspasaron": { ruta: "en-tus-ojos/miraran-al-que-traspasaron.html", tono: "LA", capo: 0 },
        "En ti Señor": { ruta: "en-tus-ojos/en-ti-señor.html", tono: "SOL", capo: 0 },
        "La fuerza en ti": { ruta: "en-tus-ojos/la-fuerza-en-ti.html", tono: "RE", capo: 0 },
        "Quédate": { ruta: "en-tus-ojos/quedate.html", tono: "MI", capo: 0 },
        "Reina de la misión": { ruta: "en-tus-ojos/reina-de-la-mision.html", tono: "FA", capo: 0 }
    },
    "Queda Entre Nosotros": {
        "Misioneros": { ruta: "salida/misioneros.html", tono: "LA", capo: 0 },
        "Somos JM, somos iglesia": { ruta: "comunion/somos-jm-somos-iglesia.html", tono: "SOL", capo: 0 },
        "Por un solo momento": { ruta: "meditacion/por-un-solo-momento.html", tono: "DO", capo: 0 },
        "Corazón + ancho": { ruta: "queda-entre-nosotros/corazon-+-ancho.html", tono: "DO", capo: 3 },
        "De Cirene": { ruta: "comunion/de-cirene.html", tono: "LA", capo: 3 },
        "Cántaro niño": { ruta: "comunion/cantaro-niño.html", tono: "RE", capo: 0 },
        "Nuevas playas": { ruta: "queda-entre-nosotros/nuevas-playas.html", tono: "MI", capo: 0 },
        "Después de caer": { ruta: "comunion/despues-de-caer.html", tono: "LA", capo: 1 },
        "Subido al sicomoro": { ruta: "meditacion/subido-al-sicomoro.html", tono: "RE", capo: 0 },
        "Todavía una vez más": { ruta: "queda-entre-nosotros/todavia-una-vez-mas.html", tono: "RE", capo: 0 },
        "Herencia (José Engling)": { ruta: "jm/herencia.html", tono: "DO", capo: 0 }
    },
    "Para Darlo a los Demás": {
        "Para darlo a los demás": { ruta: "ofertorio/para-darlo-a-los-demas.html", tono: "RE", capo: 0 },
        "La de siempre": { ruta: "salida/la-de-siempre.html", tono: "MI", capo: 0 },
        "Tu amor": { ruta: "comunion/tu-amor.html", tono: "LA", capo: 0 },
        "Amanecer": { ruta: "meditacion/amanecer.html", tono: "FA", capo: 0 },
        "Cena de jueves": { ruta: "comunion/cena-de-jueves.html", tono: "DO", capo: 0 },
        "No mueras hermano": { ruta: "meditacion/no-mueras-hermano.html", tono: "SOL", capo: 0 },
        "Cristo Rey": { ruta: "meditacion/cristo-rey.html", tono: "RE", capo: 2 },
        "En tus manos": { ruta: "santuario-corazon/en-tus-manos.html", tono: "", capo: 0 },
        "Cayado de amor": { ruta: "meditacion/cayado-de-amor.html", tono: "DO", capo: 0 },
        "María Madre": { ruta: "comunion/maria-madre.html", tono: "MI", capo: 0 },
        "Argentina nos necesita": { ruta: "santuario-corazon/argentina-nos-necesita.html", tono: "", capo: 0 },
        "Stabat": { ruta: "meditacion/stabat.html", tono: "LA", capo: 0 },
        "Deja que nazca": { ruta: "entrada/deja-que-nazca.html", tono: "MI", capo: 0 },
        "Estandarte": { ruta: "comunion/estandarte.html", tono: "RE", capo: 0 }
    },
    "Tiempo de Alianza": {
        "Reina y Madre": { ruta: "marianos/reina-y-madre.html", tono: "SOL", capo: 0 },
        "Apareces": { ruta: "comunion/apareces.html", tono: "DO", capo: 0 },
        "Frente a ti": { ruta: "comunion/frente-a-ti.html", tono: "SOL", capo: 0 },
        "Caminho de eternidade": { ruta: "meditacion/caminho-de-eternidade.html", tono: "RE", capo: 0 },
        "En manos del Padre": { ruta: "tiempo-de-alianza/en-manos-del-padre.html", tono: "", capo: 0 },
        "Milagro en el Jordán": { ruta: "tiempo-de-alianza/milagro-en-el-jordan.html", tono: "", capo: 0 },
        "Acuérdate de mí": { ruta: "comunion/acuerdate-de-mi.html", tono: "LA", capo: 0 },
        "Mi entrega a ti": { ruta: "meditacion/mi-entrega-a-ti.html", tono: "RE", capo: 0 },
        "Siempre para ti": { ruta: "comunion/siempre-para-ti.html", tono: "RE", capo: 0 },
        "Apóstol de Jesucristo": { ruta: "meditacion/apostol-de-jesucristo.html", tono: "LA", capo: 0 },
        "Caminando": { ruta: "comunion/caminando.html", tono: "LA", capo: 0 },
        "Tu voz": { ruta: "tiempo-de-alianza/tu-voz.html", tono: "", capo: 0 },
        "Labor del Apóstol": { ruta: "comunion/labor-del-apostol.html", tono: "DO", capo: 0 },
        "Sin fronteras": { ruta: "comunion/sin-fronteras.html", tono: "SOL", capo: 0 },
        "Sé en quién he puesto mi confianza": { ruta: "comunion/se-en-quien-he-puesto-mi-confianza.html", tono: "MI", capo: 0 }
    },
    "Contigo + Feliz": {
        "Ya es hora": { ruta: "comunion/ya-es-hora.html", tono: "SOL", capo: 1 },
        "Sabes que te quiero": { ruta: "contigo-+-feliz/sabes-que-te-quiero.html", tono: "MI", capo: 3 },
        "En tu misericordia": { ruta: "meditacion/en-tu-misericordia.html", tono: "RE", capo: 0 },
        "Esclava de mi salvador": { ruta: "comunion/esclava-de-mi-salvador.html", tono: "RE", capo: 2 },
        "María de los campos": { ruta: "contigo-+-feliz/maria-de-los-campos.html", tono: "LA", capo: 3 },
        "Mais feliz": { ruta: "contigo-+-feliz/mais-feliz.html", tono: "RE", capo: 0 },
        "Quiero ser tu amigo Jesucristo": { ruta: "comunion/quiero-ser-tu-amigo-jesucristo.html", tono: "SOL", capo: 0 },
        "Vem Maria com tua cor": { ruta: "contigo-+-feliz/vem-maria-com-tua-cor.html", tono: "RE", capo: 3 },
        "Barro soy": { ruta: "meditacion/barro-soy.html", tono: "RE", capo: 0 },
        "Surge valentía": { ruta: "meditacion/surge-valentia.html", tono: "SOL", capo: 0 },
        "Mais longe": { ruta: "comunion/mais-longe.html", tono: "SOL", capo: 0 },
        "María Vai": { ruta: "comunion/maria-vai.html", tono: "SO", capo: 0 },
        "Sígueme": { ruta: "meditacion/sigueme.html", tono: "MI", capo: 0 },
        "Clarifica-te": { ruta: "comunion/clarifica-te.html", tono: "MI", capo: 0 },
        "Tu luz": { ruta: "comunion/tu-luz.html", tono: "SOL", capo: 5 }
    },
    "Nos Junta el Sol": {
        "El pulso de Dios": { ruta: "entrada/el-pulso-de-dios.html", tono: "MI", capo: 1 },
        "Hágase mi paz": { ruta: "comunion/hagase-mi-paz.html", tono: "MI", capo: 0 },
        "Quédate Señor": { ruta: "comunion/quedate-señor.html", tono: "DO", capo: 0 }
    },
    "JM Argentina": {
        "Vida en abundancia": { ruta: "comunion/vida-en-abundancia.html", tono: "MI", capo: 0 },
        "El que muere por mi": { ruta: "comunion/el-que-muere-por-mi.html", tono: "DO", capo: 2 },
        "Stabat": { ruta: "meditacion/stabat.html", tono: "LA", capo: 0 },
        "La de siempre": { ruta: "salida/la-de-siempre.html", tono: "MI", capo: 0 },
        "Juremos con gloria morir": { ruta: "comunion/juremos-con-gloria-morir.html", tono: "SOL", capo: 0 },
        "Oración de Franz Reinisch": { ruta: "jm/oracion-de-franz-reinisch.html", tono: "SOL", capo: 0 }
    },
    "¡Vive Dios!": {
        "Abre": { ruta: "comunion/abre.html", tono: "LA", capo: 0 },
        "Resplandor del sol eterno": { ruta: "vive-dios/resplandor-del-sol-eterno.html", tono: "SOL", capo: 0 },
        "Mi alma descansa en ti": { ruta: "meditacion/mi-alma-descansa-en-ti.html", tono: "LA", capo: 0 },
        "Fica conosco": { ruta: "vive-dios/fica-conosco.html", tono: "DO", capo: 1 },
        "¿Me quieres?": { ruta: "meditacion/me-quieres.html", tono: "MI", capo: 0 },
        "Más allá": { ruta: "vive-dios/mas-alla.html", tono: "SOL", capo: 0 },
        "Permanecer en ti": { ruta: "meditacion/permanecer-en-ti.html", tono: "SOL", capo: 0 },
        "Fado ao amigo": { ruta: "vive-dios/fado-ao-amigo.html", tono: "MI", capo: 2 },
        "Vuelve a mí": { ruta: "meditacion/vuelve-a-mi.html", tono: "SOL", capo: 2 },
        "Forevermore": { ruta: "vive-dios/forevermore.html", tono: "DO", capo: 2 },
        "Para que todos tengan vida": { ruta: "comunion/para-que-todos-tengan-vida.html", tono: "FA", capo: 0 },
        "Nuestra fe en tu amor": { ruta: "ofertorio/nuestra-fe-en-tu-amor.html", tono: "SOL", capo: 0 },
        "Mãe da confiança": { ruta: "vive-dios/mae-da-confianca.html", tono: "SOL", capo: 0 },
        "Ven Jesús": { ruta: "vive-dios/ven-jesus.html", tono: "SOL", capo: 2 },
        "Me llamaste amigo": { ruta: "meditacion/me-llamaste-amigo.html", tono: "DO", capo: 3 },
        "And we go": { ruta: "vive-dios/and-we-go.html", tono: "SOL", capo: 6 },
        "Ahí vino Jesús": { ruta: "vive-dios/ahi-vino-jesus.html", tono: "SOL", capo: 0 },
        "María, te quiero cantar": { ruta: "vive-dios/maria-te-quiero-cantar.html", tono: "MI", capo: 0 }
    },
    "Berit I": {
        "Sígueme": { ruta: "meditacion/sigueme.html", tono: "MI", capo: 0 },
        "Quiero ser tu amigo Jesucristo": { ruta: "comunion/quiero-ser-tu-amigo-jesucristo.html", tono: "SOL", capo: 0 },
        "Renuévanos Señor": { ruta: "berit-1/renuevanos-señor.html", tono: "MI", capo: 0 },
        "Señor de la paz": { ruta: "meditacion/señor-de-la-paz.html", tono: "RE", capo: 0 },
        "Nuestra alianza": { ruta: "comunion/nuestra-alianza.html", tono: "MI", capo: 0 },
        "Jesús en Ti confío": { ruta: "berit-1/jesus-en-ti-confio.html", tono: "RE", capo: 1 },
        "Si quieres te acompaño en el camino": { ruta: "comunion/si-quieres-te-acompaño-en-el-camino.html", tono: "DO", capo: 0 },
        "Surge valentía": { ruta: "meditacion/surge-valentia.html", tono: "SOL", capo: 0 },
        "También hoy": { ruta: "meditacion/tambien-hoy.html", tono: "DO", capo: 3 },
        "Ven y verás": { ruta: "meditacion/ven-y-veras.html", tono: "DO", capo: 0 },
        "Vivir amando": { ruta: "meditacion/vivir-amando.html", tono: "RE", capo: 0 },
        "Silencio fecundo": { ruta: "meditacion/silencio-fecundo.html", tono: "SOL", capo: 0 }
    },
    "Berit II": {
        "Jesús (Berit II)": { ruta: "meditacion/jesus-berit2.html", tono: "DO", capo: 0 },
        "Oración de confianza": { ruta: "meditacion/oracion-de-confianza.html", tono: "DO", capo: 0 },
        "El sale a tu encuentro": { ruta: "comunion/el-sale-a-tu-encuentro.html", tono: "MI", capo: 0 },
        "Hago nuevas todas las cosas": { ruta: "meditacion/hago-nuevas-todas-las-cosas.html", tono: "SOL", capo: 0 },
        "Stay": { ruta: "berit-2/stay.html", tono: "MI", capo: 2 },
        "De Cirene": { ruta: "comunion/de-cirene.html", tono: "LA", capo: 3 },
        "Sobre el mar": { ruta: "comunion/sobre-el-mar-berit2.html", tono: "DO", capo: 0 },
        "Verás cosas mayores": { ruta: "meditacion/veras-cosas-mayores.html", tono: "DO", capo: 5 },
        "Arde": { ruta: "meditacion/arde.html", tono: "RE", capo: 0 },
        "Te estaba esperando": { ruta: "comunion/te-estaba-esperando.html", tono: "DO", capo: 0 },
        "Te veo": { ruta: "comunion/te-veo.html", tono: "DO", capo: 0 },
        "La luz de Jesús": { ruta: "meditacion/la-luz-de-jesus.html", tono: "DO", capo: 0 }
    },
    "De Peregrinos y Mediodías": {
        "Ven Espíritu Santo": { ruta: "espiritu-santo/ven-espiritu-santo.html", tono: "RE", capo: 0 },
        "Jesús y Pedro": { ruta: "comunion/jesus-y-pedro.html", tono: "DO", capo: 1 },
        "Amigo": { ruta: "meditacion/amigo.html", tono: "RE", capo: 1 },
        "No tienen vino": { ruta: "meditacion/no-tienen-vino.html", tono: "DO", capo: 0 },
        "Ven Pastor": { ruta: "comunion/ven-pastor.html", tono: "RE", capo: 0 },
        "Solo por hoy": { ruta: "meditacion/solo-por-hoy.html", tono: "RE", capo: 0 },
        "Sáname": { ruta: "meditacion/saname.html", tono: "RE", capo: 0 },
        "El mismo huerto": { ruta: "meditacion/el-mismo-huerto.html", tono: "RE", capo: 0 },
        "Es aquí": { ruta: "comunion/es-aqui.html", tono: "RE", capo: 0 },
        "Una cuerda menos": { ruta: "meditacion/una-cuerda-menos.html", tono: "LA", capo: 0 },
        "Vengan y coman": { ruta: "comunion/vengan-y-coman.html", tono: "RE", capo: 0 },
        "Hoy vivo": { ruta: "comunion/hoy-vivo.html", tono: "RE", capo: 2 },
        "Su canto": { ruta: "meditacion/su-canto.html", tono: "RE", capo: 2 },
        "Esa flor siempre de pie": { ruta: "meditacion/esa-flor-siempre-de-pie.html", tono: "SOL", capo: 2 },
        "Viento de Dios": { ruta: "espiritu-santo/viento-de-dios.html", tono: "SOL", capo: 0 },
        "Abramos": { ruta: "meditacion/abramos.html", tono: "RE", capo: 1 },
        "Una gota de agua": { ruta: "comunion/una-gota-de-agua.html", tono: "SOL", capo: 0 },
        "Voces de esperanza": { ruta: "espiritu-santo/voces-de-esperanza.html", tono: "MI", capo: 0 }
    },
    "Vengan a mí": {
        "Hoy quiero mirarte": { ruta: "meditacion/hoy-quiero-mirarte.html", tono: "RE", capo: 0 },
        "Vengan a mí": { ruta: "meditacion/vengan-a-mi.html", tono: "SOL", capo: 0 },
        "Derrama": { ruta: "meditacion/derrama.html", tono: "DO", capo: 4 },
        "Estar con Él": { ruta: "meditacion/estar-con-el.html", tono: "SOL", capo: 0 },
        "Él me miró": { ruta: "meditacion/el-me-miro.html", tono: "SOL", capo: 1 },
        "Soledad": { ruta: "meditacion/soledad.html", tono: "LA", capo: 0 },
        "Restáuranos": { ruta: "meditacion/restauranos.html", tono: "SOL", capo: 0 },
        "Paz": { ruta: "meditacion/paz.html", tono: "LA", capo: 0 },
        "Regálanos": { ruta: "meditacion/regalanos.html", tono: "MI", capo: 2 },
        "Quiero adorarte": { ruta: "meditacion/quiero-adorarte.html", tono: "DO", capo: 3 },
        "Solo Tú": { ruta: "meditacion/solo-tu.html", tono: "SOL", capo: 1 },
        "Esperanza": { ruta: "meditacion/esperanza.html", tono: "SOL", capo: 3 }
    },
    "Él me amó primero": {
        "Transformación en Pentecostes": { ruta: "meditacion/transformacion-en-pentecostes.html", tono: "MI", capo: 0 },
        "Abrazo de Padre": {ruta:"jf/abrazo-de-padre.html", tono: "DO", capo: 1 },
        "Silencio en el calvario": { ruta: "comunion/silencio-en-el-calvario.html", tono: "DO", capo: 4 },
        "En tu misericordia": { ruta: "meditacion/en-tu-misericordia.html", tono: "RE", capo: 0 },
        "Lienzo": { ruta: "comunion/lienzo.html", tono: "SOL", capo: 4 },
        "Cristo Rey (con subida)": { ruta: "meditacion/cristo-rey-con-subida.html", tono: "DO", capo: 2 },
        "Permanecer en ti": { ruta: "meditacion/permanecer-en-ti.html", tono: "SOL", capo: 0 },
        "Me quieres?": { ruta: "meditacion/me-quieres.html", tono: "MI", capo: 3 },
        "Labor del apostol": { ruta: "comunion/labor-del-apostol.html", tono: "LA", capo: 1 },
        "María de la Alianza": { ruta: "salida/maria-de-la-alianza.html", tono: "SOL", capo: 1 },
        "La de siempre": { ruta: "salida/la-de-siempre.html", tono: "MI", capo: 0 },
        "Misioneros": { ruta: "salida/misioneros.html", tono: "LA", capo: 0 },
    }
};

// =============================================================================
// 1. MÓDULO DE TRANSPOSICIÓN (JQUERY) Y CREADOR DE CAPO
// =============================================================================
(function($) {
  // =========================================================================
  // MÓDULO DE CIFRADO LATINO (DO-RE-MI) <-> AMERICANO (C-D-E)
  // =========================================================================
  var MAPA_LATINO_AMERICANO = {
    "DO#": "C#", "RE#": "D#", "FA#": "F#", "SOL#": "G#", "LA#": "A#",
    "REB": "Db", "MIB": "Eb", "SOLB": "Gb", "LAB": "Ab", "SIB": "Bb",
    "REb": "Db", "MIb": "Eb", "SOLb": "Gb", "LAb": "Ab", "SIb": "Bb",
    "DO": "C", "RE": "D", "MI": "E", "FA": "F", "SOL": "G", "LA": "A", "SI": "B"
  };

  var MAPA_AMERICANO_LATINO = {
    "C#": "DO#", "D#": "RE#", "F#": "FA#", "G#": "SOL#", "A#": "LA#",
    "DB": "REb", "EB": "MIb", "GB": "SOLb", "AB": "LAb", "BB": "SIb",
    "Db": "REb", "Eb": "MIb", "Gb": "SOLb", "Ab": "LAb", "Bb": "SIb",
    "C": "DO", "D": "RE", "E": "MI", "F": "FA", "G": "SOL", "A": "LA", "B": "SI"
  };

  window.convertirAcordeLatinoAAmericano = function(acorde) {
    if (!acorde) return acorde;
    if (acorde.indexOf("/") !== -1) {
      var partes = acorde.split("/");
      return window.convertirAcordeLatinoAAmericano(partes[0]) + "/" + window.convertirAcordeLatinoAAmericano(partes[1]);
    }
    // Si NO empieza con una nota latina, ya está en americano o formato no latino; NO TOCAR
    if (!/^(DO|RE|MI|FA|SOL|LA|SI)/i.test(acorde)) {
      return acorde;
    }
    var raiz = "";
    if (/^SOL[#bB]/i.test(acorde)) raiz = acorde.substr(0, 4);
    else if (/^SOL/i.test(acorde)) raiz = acorde.substr(0, 3);
    else if (/^(DO|RE|MI|FA|LA|SI)[#bB]/i.test(acorde)) raiz = acorde.substr(0, 3);
    else if (/^(DO|RE|MI|FA|LA|SI)/i.test(acorde)) raiz = acorde.substr(0, 2);

    var raizUpper = raiz.toUpperCase();
    if (raiz.endsWith("b") || raiz.endsWith("B")) {
      raizUpper = raiz.substr(0, raiz.length - 1).toUpperCase() + "b";
    }
    if (raizUpper && MAPA_LATINO_AMERICANO[raizUpper]) {
      return MAPA_LATINO_AMERICANO[raizUpper] + acorde.substr(raiz.length);
    }
    return acorde;
  };

  window.convertirAcordeAmericanoALatino = function(acorde) {
    if (!acorde) return acorde;
    if (acorde.indexOf("/") !== -1) {
      var partes = acorde.split("/");
      return window.convertirAcordeAmericanoALatino(partes[0]) + "/" + window.convertirAcordeAmericanoALatino(partes[1]);
    }
    // Si ya empieza con una nota latina, NO TOCAR JAMÁS (evita mutar DO en REO o FA en FAAA)
    if (/^(DO|RE|MI|FA|SOL|LA|SI)/i.test(acorde)) {
      return acorde;
    }
    var raiz = "";
    if (/^[A-G][#bB]/.test(acorde)) raiz = acorde.substr(0, 2);
    else if (/^[A-G]/.test(acorde)) raiz = acorde.substr(0, 1);

    var raizNorm = raiz.charAt(0).toUpperCase();
    if (raiz.length > 1) {
      raizNorm += (raiz.charAt(1) === "#" ? "#" : "b");
    }

    if (raizNorm && MAPA_AMERICANO_LATINO[raizNorm]) {
      return MAPA_AMERICANO_LATINO[raizNorm] + acorde.substr(raiz.length);
    }
    return acorde;
  };

  window.sistemaCifradoActual = localStorage.getItem("cancionero_sistema_cifrado") || "latino";

  window.actualizarBotonesCifrado = function(sistema) {
    var esAm = (sistema === "americano");
    $(".btn-toggle-cifrado .lbl-cifrado-modo").text(esAm ? "C" : "DO");
    $(".btn-toggle-cifrado").attr("title", esAm ? "Cifrado actual: Americano (C). Clic para cambiar a Latino (DO)" : "Cifrado actual: Latino (DO). Clic para cambiar a Americano (C)");
  };

  window.aplicarSistemaCifrado = function(sistema, $context) {
    var $targets = $context ? $context.find("span.c, .c") : $("span.c, .c");
    $targets.each(function() {
      var el = $(this);
      var chord = el.text().trim();
      if (!chord) return;
      var next = el[0].nextSibling;
      var isAtEnd = !next || (next.nodeType === 3 && /^[^\S\r\n]*[\r\n]/.test(next.nodeValue));
      if (!el.data("orig-block-len") && !el.attr("data-orig-block-len")) {
        var spaces = 0;
        if (next && next.nodeType === 3 && !isAtEnd) {
          var m = next.nodeValue.match(/^([^\S\r\n]+)/);
          if (m) spaces = m[1].length;
        }
        var cLen = el.text().length + spaces;
        el.data("orig-block-len", cLen);
        el.attr("data-orig-block-len", cLen);
      }
      var origLen = parseInt(el.data("orig-block-len") || el.attr("data-orig-block-len"), 10);
      var nuevo = chord;
      if (sistema === "americano") {
        nuevo = window.convertirAcordeLatinoAAmericano(chord);
      } else {
        nuevo = window.convertirAcordeAmericanoALatino(chord);
      }
      if (nuevo !== chord) {
        el.text(nuevo);
        if (!isAtEnd) {
          var spacesNeeded = origLen - nuevo.length;
          if (spacesNeeded < 0) spacesNeeded = 0;
          if (next && next.nodeType === 3) {
            next.nodeValue = " ".repeat(spacesNeeded) + next.nodeValue.replace(/^[^\S\r\n]+/, "");
          } else if (spacesNeeded > 0) {
            el.after(document.createTextNode(" ".repeat(spacesNeeded)));
          }
        }
      }
    });

    $(".transpose-keys").each(function() {
      $(this).find("a").each(function() {
        var $a = $(this);
        var txt = $a.text().trim();
        if (sistema === "americano") {
          $a.text(window.convertirAcordeLatinoAAmericano(txt));
        } else {
          $a.text(window.convertirAcordeAmericanoALatino(txt));
        }
      });
    });

    window.actualizarBotonesCifrado(sistema);
  };

  window.toggleSistemaCifrado = function() {
    var actual = localStorage.getItem("cancionero_sistema_cifrado") || "latino";
    var nuevo = (actual === "americano") ? "latino" : "americano";
    localStorage.setItem("cancionero_sistema_cifrado", nuevo);
    window.sistemaCifradoActual = nuevo;
    window.aplicarSistemaCifrado(nuevo);
  };

  const regexAcordeExacto = /^(\(?)(DO|RE|MI|FA|SOL|LA|SI|C|D|E|F|G|A|B)[b#]?(2|4|5|6|7|9|11|13|6\/9|6\(9\)|7\-5|7\-9|7\#5|7\#9|7\+5|7\+9|7b5|7b9|7sus2|7sus4|9sus4|add2|add4|add9|aug|°|dim|Ø|dim7|mb5|m7b5|m\/maj7|mMaj7|m6|m7|m9|m11|m13|m79|maj7|maj9|maj11|maj13|majb5|m|sus|sus2|sus4|\([0-9a-zA-Z#b\+\-\/]+\)|\+)*(\/(DO|RE|MI|FA|SOL|LA|SI|C|D|E|F|G|A|B)[b#]?)*(\)?)(x[0-9]+|\(x[0-9]+\)|\([0-9]+x\))?$/i;
  const regexAuxAcorde = /^([---\/|()xX0-9:.]+|intro:?|final:?|inter:?|puente:?|bis:?|coro:?|estribillo:?)$/i;

  var isChordLine = function(line) {
    if (!line) return false;
    if (line.indexOf("nota-inline-wrapper") !== -1 || line.indexOf("linea-tocar-nota") !== -1) return false;
    if (/<span\s+class=['"]c['"]/i.test(line)) return true;
    var sinTags = line.replace(/<[^>]*>/g, ' ').trim();
    if (!sinTags) return false;
    var tokens = sinTags.split(/\s+/);
    var cantAcordes = 0;
    for (var i = 0; i < tokens.length; i++) {
      var tok = tokens[i];
      if (regexAcordeExacto.test(tok)) {
        cantAcordes++;
      } else if (regexAuxAcorde.test(tok)) {
        // símbolo auxiliar o número de repetición
      } else if (tok.indexOf('-') !== -1) {
        // Acordes unidos por guion como FA-SOL, DO#m-RE, LAm7-RE7
        var subparts = tok.split('-');
        var ok = true;
        var subCant = 0;
        for (var s = 0; s < subparts.length; s++) {
          var sub = subparts[s].trim();
          if (!sub) continue;
          if (regexAcordeExacto.test(sub)) {
            subCant++;
          } else if (!regexAuxAcorde.test(sub)) {
            ok = false;
            break;
          }
        }
        if (ok && subCant > 0) {
          cantAcordes += subCant;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
    return cantAcordes > 0;
  };
  window.isChordLine = isChordLine;
  $.fn.transpose = function(options) {
    var opts = $.extend({}, $.fn.transpose.defaults, options);
    var currentKey = null;
    var keys = [{name:'LAb',value:0,type:'F'},{name:'LA',value:1,type:'N'},{name:'LA#',value:2,type:'S'},{name:'SIb',value:2,type:'F'},{name:'SI',value:3,type:'N'},{name:'DO',value:4,type:'N'},{name:'DO#',value:5,type:'S'},{name:'REb',value:5,type:'F'},{name:'RE',value:6,type:'N'},{name:'RE#',value:7,type:'S'},{name:'MIb',value:7,type:'F'},{name:'MI',value:8,type:'N'},{name:'FA',value:9,type:'N'},{name:'FA#',value:10,type:'S'},{name:'SOLb',value:10,type:'F'},{name:'SOL',value:11,type:'N'},{name:'SOL#',value:0,type:'S'}];
    var getKeyByName = function (name) { 
      if (!name) return null;
      name = name.trim();
      if (name.charAt(name.length-1) == "m" || name.charAt(name.length-1) == "M") name = name.substring(0, name.length-1); 
      var mapeado = MAPA_AMERICANO_LATINO[name] || MAPA_AMERICANO_LATINO[name.toUpperCase()];
      if (mapeado) name = mapeado;
      for (var i = 0; i < keys.length; i++) { 
        if (name.toUpperCase() == keys[i].name.toUpperCase()) return keys[i]; 
      } 
      return null;
    };
    var getChordRoot = function (input) { var ind = 2; if(input.substring(0,2)=="SO") ind=3; if (input.length > ind && (input.charAt(ind) == "b" || input.charAt(ind) == "#")) return input.substr(0, ind+1); else return input.substr(0, ind); };
    var getNewKey = function (oldKey, delta, targetKey) { 
      var k = getKeyByName(oldKey);
      var val = k ? k.value : 0;
      var keyValue = val + delta; 
      if (keyValue > 11) keyValue -= 12; 
      else if (keyValue < 0) keyValue += 12; 
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
      return keys[0];
    };
    var getDelta = function (oldIndex, newIndex) { if (oldIndex > newIndex) return 0 - (oldIndex - newIndex); else if (oldIndex < newIndex) return 0 + (newIndex - oldIndex); else return 0; };
    var transposeSong = function (target, key) { 
        var newKey = getKeyByName(key); 
        if (!newKey || currentKey.name == newKey.name) return; 
        var delta = getDelta(currentKey.value, newKey.value); 

        // 1. Restaurar HTML base limpio sin notas antes de transponer los acordes
        var baseHtml = $(target).data("base-song-html");
        if (baseHtml) {
            $(target).html(baseHtml);
        } else {
            $(target).find(".nota-inline-wrapper").remove();
        }

        // 2. Transponer acordes
        $("span.c", target).each(function (i, el) { transposeChord(el, delta, newKey); }); 
        currentKey = newKey; 

        // 3. Guardar la versión limpia transpuesta en base-song-html
        $(target).data("base-song-html", $(target).html());

        // 4. Re-renderizar notas para la nueva tonalidad pasando el target exacto
        var songPath = $(target).attr("data-song-path") || $(target).data("song-path") || $(target).attr("data-clave") || window.location.pathname;
        if (typeof window.renderizarNotasCancion === "function") {
            window.renderizarNotasCancion(songPath, $(target));
        }

        // 5. Si los acordes estaban ocultos, mantenerlos ocultos
        if (document.body.classList.contains("acordes-ocultos") || $(target).hasClass("acordes-ocultos")) {
            $(target).addClass("acordes-ocultos");
            $(target).find(".c, span.c").css("display", "none");
        }
    };
    
    var transposeChord = function (selector, delta, targetKey) { 
        var el = $(selector); 
        var origLenAttr = el.attr("data-orig-block-len") || el.data("orig-block-len");
        var next = el[0] ? el[0].nextSibling : null;
        var isAtEndOfLine = !next || (next.nodeType === 3 && /^[^\S\r\n]*[\r\n]/.test(next.nodeValue));

        if (!origLenAttr) { 
            var spaces = 0; 
            if (next && next.nodeType === 3 && !isAtEndOfLine) { 
                var m = next.nodeValue.match(/^([^\S\r\n]+)/); 
                if (m) spaces = m[1].length; 
            } 
            var calcLen = el.text().length + spaces;
            el.attr("data-orig-block-len", calcLen); 
            el.data("orig-block-len", calcLen);
            origLenAttr = calcLen;
        } 
        
        var originalBlockLen = parseInt(origLenAttr, 10); 
        var oldChord = el.text(); 
        var oldChordLatino = (window.sistemaCifradoActual === "americano") ? window.convertirAcordeAmericanoALatino(oldChord) : oldChord;
        var newChord = "";

        // TRANSPOSICIÓN DOBLE PARA BAJOS INVERTIDOS
        if (oldChordLatino.indexOf("/") !== -1) {
            var parts = oldChordLatino.split("/");
            var mainChord = parts[0];
            var bassChord = parts[1];

            var mainRoot = getChordRoot(mainChord);
            var newMainRoot = getNewKey(mainRoot, delta, targetKey);
            var newMain = newMainRoot.name + mainChord.substr(mainRoot.length);

            var bassRoot = getChordRoot(bassChord);
            var newBassRoot = getNewKey(bassRoot, delta, targetKey);
            var newBass = newBassRoot.name + bassChord.substr(bassRoot.length);

            newChord = newMain + "/" + newBass;
        } else {
            var oldChordRoot = getChordRoot(oldChordLatino); 
            var newChordRoot = getNewKey(oldChordRoot, delta, targetKey); 
            newChord = newChordRoot.name + oldChordLatino.substr(oldChordRoot.length); 
        }

        if (window.sistemaCifradoActual === "americano") {
            newChord = window.convertirAcordeLatinoAAmericano(newChord);
        }

        el.text(newChord); 

        // Si está al final del renglón (seguido de \n), NUNCA tocar next.nodeValue para no fusionar acordes y letra
        if (isAtEndOfLine) {
            return;
        }

        var spacesNeeded = originalBlockLen - newChord.length; 
        if (spacesNeeded < 0) spacesNeeded = 0; 

        if (next && next.nodeType === 3) { 
            next.nodeValue = " ".repeat(spacesNeeded) + next.nodeValue.replace(/^[^\S\r\n]+/, ""); 
        } else if (spacesNeeded > 0) { 
            el.after(document.createTextNode(" ".repeat(spacesNeeded))); 
        } 
    };
    
    var wrapChords = function (input) { return input.replace(opts.chordReplaceRegex, "<span class='c'>$1</span>"); };
    
    return $(this).each(function() { 
        var startKey = $(this).attr("data-key"); 
        if (!startKey || $.trim(startKey) == "") startKey = opts.key; 
        if (!startKey || $.trim(startKey) == "") return this; 
        currentKey = getKeyByName(startKey) || keys[5]; 
        var keyLinks = []; 
        var isAm = (window.sistemaCifradoActual === "americano");
        $(keys).each(function(i, key) { 
            var label = isAm ? window.convertirAcordeLatinoAAmericano(key.name) : key.name;
            if (currentKey && currentKey.name == key.name) keyLinks.push("<a href='#' class='selected'>" + label + "</a>"); 
            else keyLinks.push("<a href='#'>" + label + "</a>"); 
        }); 
        var $this = $(this); 
        var $parent = $this.parent();
        if ($parent.hasClass("d-flex")) {
            $parent.addClass("flex-column align-items-center justify-content-center w-100").css({
                "flex-direction": "column",
                "align-items": "center",
                "justify-content": "center",
                "width": "100%"
            });
        }
        $this.css({
            "display": "inline-block",
            "width": "auto",
            "max-width": "100%",
            "margin-left": "auto",
            "margin-right": "auto",
            "align-self": "center",
            "text-align": "left"
        });
        var keysHtml = $("<div class='transpose-keys justify-content-md-center' style='margin-bottom:10px;'></div>"); 
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
            if (isChordLine(line)) output.push(wrapChords(line)); 
            else output.push(line); 
        }; 
        $(this).html(output.join("\n")); 

        $("span.c", this).each(function() {
            var el = $(this);
            var next = el[0] ? el[0].nextSibling : null;
            var isAtEnd = !next || (next.nodeType === 3 && /^[^\S\r\n]*[\r\n]/.test(next.nodeValue));
            var spaces = 0;
            if (next && next.nodeType === 3 && !isAtEnd) {
                var m = next.nodeValue.match(/^([^\S\r\n]+)/);
                if (m) spaces = m[1].length;
            }
            var calcLen = el.text().length + spaces;
            el.attr("data-orig-block-len", calcLen);
            el.data("orig-block-len", calcLen);
        });

        // Guardar el HTML base prístino antes de renderizar notas
        $(this).data("base-song-html", $(this).html());
    });
  };
  
  $.fn.transpose.defaults = { 
    chordRegex: /^(\bDO|\bRE|\bMI|\bFA|\bSOL|\bLA|\bSI)[b\#]?(2|4|5|6|7|9|11|13|6\/9|6\(9\)|7\-5|7\-9|7\#5|7\#9|7\+5|7\+9|7b5|7b9|7sus2|7sus4|9sus4|add2|add4|add9|aug|°|dim|Ø|dim7|mb5|m7b5|m\/maj7|mMaj7|m6|m7|m9|m11|m13|m79|maj7|maj9|maj11|maj13|majb5|m|sus|sus2|sus4|\([0-9a-zA-Z#b\+\-\/]+\)|\+)*(\/(DO|RE|MI|FA|SOL|LA|SI)[b\#]?)*$/, 
    chordReplaceRegex: /((\bDO|\bRE|\bMI|\bFA|\bSOL|\bLA|\bSI)[b\#]?(2|4|5|6|7|9|11|13|6\/9|6\(9\)|7\-5|7\-9|7\#5|7\#9|7\+5|7\+9|7b5|7b9|7sus2|7sus4|9sus4|add2|add4|add9|aug|°|dim|Ø|dim7|mb5|m7b5|m\/maj7|mMaj7|m6|m7|m9|m11|m13|m79|maj7|maj9|maj11|maj13|majb5|m|sus|sus2|sus4|\([0-9a-zA-Z#b\+\-\/]+\)|\+)*(\/(DO|RE|MI|FA|SOL|LA|SI)[b\#]?)*)/g 
  };
  
  $(function() { 
      var targets = $("#letra, .zona-letra"); 
      $("#letra, .zona-letra, pre[id^='letra-lista']").each(function() {
          var $p = $(this).parent();
          if ($p.hasClass("d-flex")) {
              $p.addClass("flex-column align-items-center justify-content-center w-100").css({
                  "flex-direction": "column",
                  "align-items": "center",
                  "justify-content": "center",
                  "width": "100%"
              });
          }
          $(this).css({
              "display": "inline-block",
              "width": "auto",
              "max-width": "100%",
              "margin-left": "auto",
              "margin-right": "auto",
              "align-self": "center",
              "text-align": "left"
          });
      });
      if(targets.length > 0) { 
          targets.transpose(); 

          var esPaginaPrograma = /programa-(full|acordes|texto)/i.test(window.location.pathname);

          function escaparHTML(str) {
              if (!str) return "";
              return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
          }

          window.normalizarClaveCancion = function(ruta) {
              if (!ruta) return "";
              var s = ruta;
              try { s = decodeURI(s); } catch(e){}
              s = s.split("?")[0].split("#")[0];
              return s.replace(/^https?:\/\/[^\/]+/, "")
                      .replace(/^\/?cancionerobenja\//, "")
                      .replace(/^\/+/, "")
                      .trim();
          };

          window.obtenerArrayNotasCancion = function(clave) {
              var c = window.normalizarClaveCancion(clave || window.location.pathname);
              var todas = {};
              try { todas = JSON.parse(localStorage.getItem("cancionero_notas") || "{}"); } catch(e){}
              var raw = todas[c] || todas["/" + c] || todas["cancionerobenja/" + c] || null;
              if (!raw && c) {
                  try {
                      var prog = JSON.parse(localStorage.getItem("programaMisa") || "[]");
                      if (Array.isArray(prog)) {
                          var item = prog.find(function(it) {
                              return window.normalizarClaveCancion(it.cancion) === c;
                          });
                          if (item && item.nota) raw = item.nota;
                      }
                  } catch(e){}
              }
              if (!raw) return [];
              if (Array.isArray(raw)) {
                  return raw.map(function(n, idx) {
                      if (!n.id) n.id = "nota_" + idx + "_" + (n.lineIndex !== undefined ? n.lineIndex : -1);
                      return n;
                  });
              }
              if (typeof raw === "string" && raw.trim() !== "") {
                  return [{ id: "legacy_1", lineIndex: -1, nombreSeccion: "General", preview: "General", texto: raw.trim() }];
              }
              return [];
          };

          window.guardarArrayNotasCancion = function(clave, arrayNotas, $customPre) {
              var c = window.normalizarClaveCancion(clave || window.location.pathname);
              var todas = {};
              try { todas = JSON.parse(localStorage.getItem("cancionero_notas") || "{}"); } catch(e){}
              if (Array.isArray(arrayNotas) && arrayNotas.length > 0) {
                  todas[c] = arrayNotas;
              } else {
                  delete todas[c];
                  delete todas["/" + c];
                  delete todas["cancionerobenja/" + c];
              }
              localStorage.setItem("cancionero_notas", JSON.stringify(todas));

              // Sincronizar también con programaMisa si existe la canción en el repertorio
              try {
                  var prog = JSON.parse(localStorage.getItem("programaMisa") || "[]");
                  if (Array.isArray(prog)) {
                      var modificado = false;
                      prog.forEach(function(it) {
                          if (window.normalizarClaveCancion(it.cancion) === c) {
                              it.nota = (Array.isArray(arrayNotas) && arrayNotas.length > 0) ? arrayNotas : "";
                              modificado = true;
                          }
                      });
                      if (modificado) {
                          localStorage.setItem("programaMisa", JSON.stringify(prog));
                      }
                  }
              } catch(e){}

              if (typeof window.renderizarNotasCancion === "function") {
                  if ($customPre && $customPre.length > 0) {
                      window.renderizarNotasCancion(c, $customPre);
                  } else {
                      if ($("#letra").length > 0) {
                          window.renderizarNotasCancion(c, $("#letra"));
                      }
                      $("pre[data-song-path]").each(function() {
                          var p = $(this).attr("data-song-path") || $(this).data("song-path");
                          if (window.normalizarClaveCancion(p) === c) {
                              window.renderizarNotasCancion(c, $(this));
                          }
                      });
                  }
              }
          };

          window.extraerEstrofasCancion = function($pre) {
              var secciones = [{ id: 0, nombre: "📌 Al inicio de la canción (General)", preview: "General", lineIndex: 0 }];
              if (!$pre || $pre.length === 0) return secciones;

              var baseHtml = $pre.data("base-song-html");
              if (!baseHtml) {
                  var $clone = $pre.clone();
                  $clone.find(".nota-inline-wrapper").remove();
                  baseHtml = $clone.html();
                  $pre.data("base-song-html", baseHtml);
              }

              var allLines = baseHtml.split("\n");
              var numEstrofa = 1;
              var enBloque = false;
              var stanzaStartLine = null;

              for (var i = 0; i < allLines.length; i++) {
                  var line = allLines[i];
                  var sinTags = line.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
                  
                  if (sinTags === "") {
                      enBloque = false;
                      stanzaStartLine = null;
                      continue;
                  }

                  if (line.indexOf("<b>") !== -1 || line.indexOf("</b>") !== -1 || line.indexOf("<em>") !== -1 || line.indexOf("</em>") !== -1) {
                      enBloque = false;
                      stanzaStartLine = null;
                  }

                  if (window.isChordLine(line)) {
                      if (!enBloque && stanzaStartLine === null) {
                          stanzaStartLine = i;
                      }
                      continue;
                  }

                  if (!enBloque) {
                      enBloque = true;
                      if (stanzaStartLine === null) stanzaStartLine = i;
                      var resumen = sinTags.length > 35 ? (sinTags.substring(0, 35) + "...") : sinTags;
                      secciones.push({
                          id: numEstrofa,
                          nombre: `Estrofa ${numEstrofa}: "${resumen}"`,
                          preview: resumen,
                          lineIndex: stanzaStartLine
                      });
                      numEstrofa++;
                      stanzaStartLine = null;
                  }
              }
              return secciones;
          };

          window.extraerUbicacionesCancion = function($pre) {
              var ubicaciones = [{ id: "general", lineIndex: -1, nombre: "Al inicio de la canción", preview: "Al inicio", tipo: "general" }];
              if (!$pre || $pre.length === 0) return ubicaciones;

              var baseHtml = $pre.data("base-song-html");
              if (!baseHtml) {
                  var $clone = $pre.clone();
                  $clone.find(".nota-inline-wrapper").remove();
                  baseHtml = $clone.html();
                  $pre.data("base-song-html", baseHtml);
              }

              var lines = baseHtml.split("\n");
              for (var i = 0; i < lines.length; i++) {
                  var rawLine = lines[i];
                  var sinTags = rawLine.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
                  if (!sinTags) continue;

                  var esAcorde = window.isChordLine(rawLine);
                  var resumen = sinTags.length > 40 ? (sinTags.substring(0, 40) + "...") : sinTags;
                  var nombreLimpio = esAcorde ? `Acordes: "${resumen}"` : `"${resumen}"`;
                  ubicaciones.push({
                      id: "line_" + i,
                      lineIndex: i,
                      nombre: nombreLimpio,
                      preview: resumen,
                      tipo: esAcorde ? "acorde" : "letra",
                      lineText: sinTags
                  });
              }
              return ubicaciones;
          };

          window.renderizarNotasCancion = function(clave, $customPre) {
              var c = window.normalizarClaveCancion(clave || window.location.pathname);
              var arrayNotas = window.obtenerArrayNotasCancion(c);
              var cant = arrayNotas.length;

              // Actualizar botón en la barra superior (si existe)
              var $btnNota = $(".btn-nota-cancion");
              if ($btnNota.length > 0) {
                  if (cant > 0) {
                      $btnNota.css({ background: "#d97706", color: "#ffffff" });
                      $btnNota.find(".lbl-nota-cancion").text(cant === 1 ? "1 Nota" : cant + " Notas");
                  } else {
                      $btnNota.css({ background: "rgba(217,119,6,0.12)", color: "#d97706" });
                      $btnNota.find(".lbl-nota-cancion").text("+ Nota");
                  }
              }

              var $pre = ($customPre && $customPre.length > 0) ? $customPre : $("#letra");
              if ($pre.length === 0) {
                  if (c) {
                      $pre = $("pre[data-song-path*='" + c + "'], pre[data-clave*='" + c + "']");
                  }
                  if ($pre.length === 0) return;
              }

              $("#columna-margen-derecho").remove();
              $("#panel-notas-escritorio").remove();
              $("#panel-notas-movil").remove();

              $pre.each(function() {
                  var $thisPre = $(this);
                  var baseHtml = $thisPre.data("base-song-html");
                  if (!baseHtml) {
                      var $clone = $thisPre.clone();
                      $clone.find(".nota-inline-wrapper").remove();
                      baseHtml = $clone.html();
                      $thisPre.data("base-song-html", baseHtml);
                  }

                  if (cant === 0) {
                      $thisPre.html(baseHtml);
                      if (document.body.classList.contains("acordes-ocultos") || $thisPre.hasClass("acordes-ocultos")) {
                          $thisPre.addClass("acordes-ocultos");
                          $thisPre.find(".c, span.c").css("display", "none");
                      }
                      return;
                  }

                  var lines = baseHtml.split("\n");
                  var outputLines = [];

                  for (var i = 0; i < lines.length; i++) {
                      var notasDeLinea = arrayNotas.filter(function(n) {
                          var lIdx = (n.lineIndex !== undefined && n.lineIndex !== null) ? n.lineIndex : -1;
                          return (lIdx === i) || (i === 0 && lIdx < 0);
                      });

                      notasDeLinea.forEach(function(nota, nIdx) {
                          var notaId = nota.id || ("nota_" + i + "_" + nIdx);
                          var cardHTML = `<span class="nota-inline-wrapper" data-nota-id="${notaId}"><span class="nota-inline-contenido"><b class="nota-inline-tag">📌 NOTA:</b> <span class="nota-inline-cuerpo">${escaparHTML(nota.texto)}</span></span><span class="nota-inline-btn-group"><button type="button" class="btn-editar-nota-item" data-nota-id="${notaId}" title="Editar">✏️</button><button type="button" class="btn-borrar-nota-item" data-nota-id="${notaId}" title="Eliminar">🗑️</button></span></span>`;
                          outputLines.push(cardHTML);
                      });

                      outputLines.push(lines[i]);
                  }

                  $thisPre.html(outputLines.join("\n"));

                  if (document.body.classList.contains("acordes-ocultos") || $thisPre.hasClass("acordes-ocultos")) {
                      $thisPre.addClass("acordes-ocultos");
                      $thisPre.find(".c, span.c").css("display", "none");
                  }
              });
          };

          window.obtenerNotaDeStorage = function(clave) {
              var c = window.normalizarClaveCancion(clave);
              if (!c) return "";
              var todas = {};
              try { todas = JSON.parse(localStorage.getItem("cancionero_notas") || "{}"); } catch(e){}
              var val = todas[c] || todas["/" + c] || todas["cancionerobenja/" + c] || "";
              if (typeof val === "string") return val.trim();
              if (Array.isArray(val) && val.length > 0) {
                  return val.map(function(n){ return n.texto; }).filter(Boolean).join(" • ");
              }
              return "";
          };

          var claveCancionActual = window.normalizarClaveCancion(window.location.pathname);
          var prefsGuardadas = {};
          try {
              prefsGuardadas = JSON.parse(localStorage.getItem("cancionero_tonos_usuario") || "{}");
          } catch (e) { prefsGuardadas = {}; }

          function guardarPrefCancion(tono, capo, origKey, origCapo) {
              if (esPaginaPrograma || !claveCancionActual) return;
              try {
                  var tonoLatino = (window.convertirAcordeAmericanoALatino ? window.convertirAcordeAmericanoALatino(tono) : tono).toUpperCase();
                  var origKeyUpper = (origKey || "").toUpperCase();
                  var todas = JSON.parse(localStorage.getItem("cancionero_tonos_usuario") || "{}");
                  if (tonoLatino === origKeyUpper && String(capo) === String(origCapo)) {
                      delete todas[claveCancionActual];
                  } else {
                      todas[claveCancionActual] = { tono: tonoLatino, capo: String(capo) };
                  }
                  localStorage.setItem("cancionero_tonos_usuario", JSON.stringify(todas));
              } catch (e) {}
          }

          // --- CREAR SELECTOR DE CAPO Y MEMORIA DE TONO/CAPO DEBAJO DE LOS TONOS ---
          targets.each(function() {
              var $letra = $(this);
              var origKeyRaw = ($letra.attr("data-key") || "").replace(/m$/i, "").trim();
              var origKey = (window.convertirAcordeAmericanoALatino ? window.convertirAcordeAmericanoALatino(origKeyRaw) : origKeyRaw).toUpperCase();
              var defaultCapo = ($letra.attr("data-capo") || "0").toString().trim();
              var keysDiv = $letra.prev('.transpose-keys');
              
              if (keysDiv.length > 0) {
                  var opciones = "";
                  for(var i = 0; i <= 12; i++) {
                      var texto = i === 0 ? "Sin Capo" : "Traste " + i;
                      var seleccionado = (i.toString() === defaultCapo.toString()) ? "selected" : "";
                      opciones += `<option value="${i}" ${seleccionado}>${texto}</option>`;
                  }

                  var botonCompartirHTML = esPaginaPrograma ? "" : `
                          <button type="button" class="btn-compartir-tono" style="border:1px solid #2A9D8F; background:#2A9D8F; color:#ffffff;" title="Compartir link de esta canción con el tono y capo seleccionados">
                              📲 Compartir
                          </button>
                  `;

                  var botonCifradoHTML = `
                          <button type="button" class="btn-toggle-cifrado" style="border:1px solid #2A9D8F; background:rgba(42,157,143,0.12); color:#2A9D8F;" title="Cambiar sistema de acordes entre Latino (DO) y Americano (C)">
                              🔤 Cifrado: <b class="lbl-cifrado-modo">${(window.sistemaCifradoActual === "americano" ? "C" : "DO")}</b>
                          </button>
                  `;

                  var arrayNotas = window.obtenerArrayNotasCancion ? window.obtenerArrayNotasCancion(claveCancionActual) : [];
                  var cantNotas = arrayNotas.length;
                  var textoBtnNota = cantNotas > 0 ? (cantNotas === 1 ? '1 Nota' : cantNotas + ' Notas') : '+ Nota';

                  var botonNotaHTML = esPaginaPrograma ? "" : `
                          <button type="button" class="btn-nota-cancion" style="border:1px solid #d97706; background:${cantNotas > 0 ? '#d97706' : 'rgba(217,119,6,0.12)'}; color:${cantNotas > 0 ? '#ffffff' : '#d97706'};" title="Agregar o ver recordatorios de esta canción">
                              📝 <span class="lbl-nota-cancion">${textoBtnNota}</span>
                          </button>
                  `;

                  var botonImprimirDescargarHTML = esPaginaPrograma ? "" : `
                          <button type="button" class="btn-imprimir-descargar-cancion" style="border:1px solid #2A9D8F; background:rgba(42,157,143,0.12); color:#2A9D8F;" title="Imprimir o descargar esta canción en PDF o Word">
                              🖨️ Imprimir / Descargar
                          </button>
                  `;

                  var capoHTML = `
                      <div class="capo-selector-div">
                          <label>🎸 Capo: </label>
                          <select class="form-select capo-dropdown">
                              ${opciones}
                          </select>
                          ${botonCifradoHTML}
                          ${botonNotaHTML}
                          ${botonImprimirDescargarHTML}
                          ${botonCompartirHTML}
                          <button type="button" class="btn-reset-tono" style="display:none; border:1px solid #2A9D8F; background:rgba(42,157,143,0.12); color:#2A9D8F;" title="Volver al tono y capo original de fábrica">
                              ↺ Original
                          </button>
                      </div>
                  `;
                  if (keysDiv.length > 0) {
                      keysDiv.after(capoHTML);
                      var $capoDiv = keysDiv.next('.capo-selector-div');
                  } else {
                      $letra.before(capoHTML);
                      var $capoDiv = $letra.prev('.capo-selector-div');
                  }

                  if (!esPaginaPrograma && claveCancionActual) {
                      $capoDiv.on('click', '.btn-nota-cancion', function() {
                          if (typeof window.iniciarModoSeleccionUbicacionNota === 'function') {
                              window.iniciarModoSeleccionUbicacionNota(claveCancionActual);
                          } else if (typeof window.abrirModalNotaCancion === 'function') {
                              window.abrirModalNotaCancion(claveCancionActual);
                          }
                      });
                      $capoDiv.on('click', '.btn-imprimir-descargar-cancion', function() {
                          if (typeof window.abrirModalImprimirCancion === 'function') {
                              window.abrirModalImprimirCancion();
                          }
                      });
                  }

                  var $selectCapo = $capoDiv.find('select.capo-dropdown');
                  var $btnReset = $capoDiv.find('.btn-reset-tono');
                  var $btnCompartir = $capoDiv.find('.btn-compartir-tono');

                  function actualizarBotonReset() {
                      if (esPaginaPrograma) return;
                      var tonoElegido = keysDiv.find('a.selected').text().trim();
                      var tonoElegidoLatino = (window.convertirAcordeAmericanoALatino ? window.convertirAcordeAmericanoALatino(tonoElegido) : tonoElegido).toUpperCase();
                      var origKeyLatino = (origKey && window.convertirAcordeAmericanoALatino ? window.convertirAcordeAmericanoALatino(origKey) : (origKey || '')).toUpperCase();
                      var capoElegido = ($selectCapo.val() || "0").toString().trim();
                      var defaultCapoStr = (defaultCapo !== undefined && defaultCapo !== null ? defaultCapo : "0").toString().trim();
                      var cambio = (origKeyLatino && tonoElegidoLatino && tonoElegidoLatino !== origKeyLatino) || (capoElegido !== defaultCapoStr);
                      if (cambio) {
                          $btnReset.addClass("activo").show();
                      } else {
                          $btnReset.removeClass("activo").hide();
                      }
                  }

                  // 1) Si el link viene compartido con ?tono=... o ?capo=..., aplicamos eso primero
                  var urlParamsTono = new URLSearchParams(window.location.search);
                  var tonoDesdeUrl = urlParamsTono.get("tono");
                  var capoDesdeUrl = urlParamsTono.get("capo");

                  if (!esPaginaPrograma && (tonoDesdeUrl || capoDesdeUrl !== null)) {
                      if (tonoDesdeUrl) {
                          var tonoParamLatino = (window.convertirAcordeAmericanoALatino ? window.convertirAcordeAmericanoALatino(tonoDesdeUrl) : tonoDesdeUrl).toUpperCase();
                          var tonoParamAm = (window.convertirAcordeLatinoAAmericano ? window.convertirAcordeLatinoAAmericano(tonoDesdeUrl) : tonoDesdeUrl).toUpperCase();
                          var $linkUrl = keysDiv.find('a').filter(function() {
                              var t = $(this).text().trim().toUpperCase();
                              return t === tonoParamLatino || t === tonoParamAm;
                          }).first();
                          if ($linkUrl.length) {
                              $linkUrl.trigger('click');
                          }
                      }
                      if (capoDesdeUrl !== null && capoDesdeUrl !== "") {
                          $selectCapo.val(String(capoDesdeUrl));
                      }
                      var tonoAplicado = keysDiv.find('a.selected').text().trim() || origKey;
                      guardarPrefCancion(tonoAplicado, $selectCapo.val(), origKey, defaultCapo);
                      actualizarBotonReset();
                  }
                  // 2) Si no vino por link compartido, restauramos el tono y capo que el usuario usó la última vez
                  else if (!esPaginaPrograma && prefsGuardadas[claveCancionActual]) {
                      var pref = prefsGuardadas[claveCancionActual];
                      if (pref.tono) {
                          var tonoGuardadoLatino = (window.convertirAcordeAmericanoALatino ? window.convertirAcordeAmericanoALatino(pref.tono) : pref.tono).toUpperCase();
                          var tonoGuardadoAm = (window.convertirAcordeLatinoAAmericano ? window.convertirAcordeLatinoAAmericano(pref.tono) : pref.tono).toUpperCase();
                          var $linkGuardado = keysDiv.find('a').filter(function() {
                              var t = $(this).text().trim().toUpperCase();
                              return t === tonoGuardadoLatino || t === tonoGuardadoAm;
                          }).first();
                          if ($linkGuardado.length) {
                              $linkGuardado.trigger('click');
                          }
                      }
                      if (pref.capo !== undefined) {
                          $selectCapo.val(String(pref.capo));
                      }
                      actualizarBotonReset();
                  }

                  // Aseguramos evaluar el estado inicial del botón Reset
                  actualizarBotonReset();

                  // Guardar automáticamente cuando el usuario toca un tono
                  keysDiv.find('a').on('click', function() {
                      var nuevoTono = $(this).text().trim();
                      var capoActual = $selectCapo.val();
                      guardarPrefCancion(nuevoTono, capoActual, origKey, defaultCapo);
                      setTimeout(actualizarBotonReset, 15);
                  });

                  // Guardar automáticamente cuando el usuario cambia el capo
                  $selectCapo.on('change', function() {
                      var tonoActual = keysDiv.find('a.selected').text().trim() || origKey;
                      var nuevoCapo = $(this).val();
                      guardarPrefCancion(tonoActual, nuevoCapo, origKey, defaultCapo);
                      actualizarBotonReset();
                  });

                  // Botón para restaurar el tono y capo original de la canción
                  $btnReset.on('click', function() {
                      if (origKey) {
                          var isAm = (window.sistemaCifradoActual === "americano");
                          var targetLabel = isAm ? window.convertirAcordeLatinoAAmericano(origKey) : origKey;
                          var $linkOrig = keysDiv.find('a').filter(function() {
                              var txt = $(this).text().trim().toUpperCase();
                              return txt === targetLabel.toUpperCase() || txt === origKey.toUpperCase();
                          }).first();
                          if ($linkOrig.length) $linkOrig.trigger('click');
                      }
                      $selectCapo.val(String(defaultCapo));
                      guardarPrefCancion(origKey, defaultCapo, origKey, defaultCapo);
                      setTimeout(actualizarBotonReset, 30);
                  });

                  // Botón para compartir la canción con el Tono y Capo elegidos
                  $btnCompartir.on('click', async function() {
                      var tonoActual = keysDiv.find('a.selected').text().trim() || origKey;
                      var capoActual = $selectCapo.val() || "0";
                      var esMenorOrig = ($letra.attr("data-key") || "").trim().endsWith("m");
                      var etiquetaTono = tonoActual + (esMenorOrig && !tonoActual.endsWith("m") ? "m" : "");
                      var textoCapo = String(capoActual) === "0" ? "Sin Capo" : ("Capo " + capoActual);

                      var urlCompartir = new URL(window.location.href);
                      urlCompartir.searchParams.set("tono", tonoActual);
                      urlCompartir.searchParams.set("capo", String(capoActual));
                      var linkFinal = urlCompartir.toString();

                      var tituloCancion = (document.querySelector("h1") ? document.querySelector("h1").textContent : document.title.split("-")[0]).trim();
                      var mensajeCompartir = `🎵 ${tituloCancion} (Tono: ${etiquetaTono} · ${textoCapo})`;

                      try {
                          if (navigator.clipboard && navigator.clipboard.writeText) {
                              await navigator.clipboard.writeText(`${mensajeCompartir}\n${linkFinal}`);
                          }
                      } catch (e) {}

                      var textoOriginalBtn = $btnCompartir.html();
                      $btnCompartir.html("✓ ¡Link copiado!");
                      setTimeout(function() {
                          $btnCompartir.html(textoOriginalBtn);
                      }, 2500);

                      if (navigator.share) {
                          try {
                              await navigator.share({
                                  title: tituloCancion,
                                  text: mensajeCompartir,
                                  url: linkFinal
                              });
                          } catch (e) {}
                      }
                  });
              }
          });

          // Si el usuario tenía guardado el modo americano, lo aplicamos a las canciones cargadas
          if (window.sistemaCifradoActual === "americano") {
              window.aplicarSistemaCifrado("americano", targets);
          }

          // Guardar copia limpia de base-song-html antes de renderizar notas
          var $preTarget = $("#letra");
          if ($preTarget.length > 0) {
              var $cloneInit = $preTarget.clone();
              $cloneInit.find(".nota-inline-wrapper").remove();
              $preTarget.data("base-song-html", $cloneInit.html());
          }

          // Renderizar notas de la canción
          if (typeof window.renderizarNotasCancion === "function") {
              window.renderizarNotasCancion(claveCancionActual);
          }
      } 

      // Listener global para alternar cifrado Latino <-> Americano
      $(document).on("click", ".btn-toggle-cifrado", function(e) {
          e.preventDefault();
          window.toggleSistemaCifrado();
      });
  });
})(jQuery);

// =============================================================================
// 2. ESTILOS GLOBALES (CSS)
// =============================================================================
document.addEventListener("DOMContentLoaded", function() {
    const style = document.createElement('style');
    style.innerHTML = `
        @media (max-width: 768px) {
            .navbar-toggler { display: none !important; }
            .navbar-collapse, .collapse { display: flex !important; flex-basis: auto !important; align-items: center !important; width: auto !important; flex: 1 1 auto !important; min-width: 0 !important; justify-content: flex-end !important; }
            .navbar-nav { flex-direction: row !important; gap: 4px; margin: 0 !important; align-items: center !important; }
            .nav-item, .dropdown, .nav-link, .dropdown-toggle { font-size: 13px !important; padding: 0 4px !important; }
            .container, .container-fluid, .navbar { padding-left: 6px !important; padding-right: 6px !important; }
            .navbar-nav .dropdown-menu { position: absolute !important; float: none !important; top: 100% !important; left: 0 !important; margin-top: 5px !important; background-color: white; box-shadow: 0 5px 15px rgba(0,0,0,0.3); width: auto !important; min-width: 180px; z-index: 10000 !important; }
            .navbar, .navbar-collapse { overflow: visible !important; }
        }
        @media print {
            #super-menu-container, #menu-trigger, #menu-content {
                display: none !important;
            }
        }
        #super-menu-container { position: fixed; bottom: 30px; right: 20px; z-index: 2147483647; font-family: sans-serif; font-size: 16px !important; display: flex; flex-direction: column; align-items: flex-end; }
        @media (max-width: 768px) { #super-menu-container { bottom: 80px; right: 15px; } #menu-trigger { width: 55px; height: 55px; } }
        #menu-trigger { width: 50px; height: 50px; border-radius: 50%; background-color: #0A2846; color: white; border: none; box-shadow: 0 4px 10px rgba(0,0,0,0.4); font-size: 24px; cursor: pointer; display: flex; justify-content: center; align-items: center; transition: transform 0.2s; }
        #menu-trigger:active { transform: scale(0.95); }
        #menu-content { background: white; border-radius: 12px; box-shadow: 0 5px 20px rgba(0,0,0,0.2); padding: 10px; margin-bottom: 10px; display: none; flex-direction: column; gap: 10px; min-width: 200px; border: 1px solid #eee; }
        #menu-content.activo { display: flex; }
        .menu-row { display: flex; align-items: center; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #f0f0f0; }
        .menu-row:last-child { border-bottom: none; }
        .menu-label { font-weight: bold; color: #555; font-size: 14px; margin-right: 10px; }
        .mini-btn { background: #f4f4f4; border: 1px solid #ddd; border-radius: 5px; padding: 8px 14px; cursor: pointer; font-size: 16px; font-weight: bold; }
        .mini-btn:hover { background: #e0e0e0; }
        .mini-btn.active { background: #0A2846; color: white; border-color: #0A2846; }

        /* --- ESTILOS DEL CAPO (CENTRADO Y NO FLOTANTE) --- */
        .capo-selector-div {
            display: flex;
            justify-content: center; /* Esto lo centra horizontalmente siempre */
            align-items: center;
            width: 100%;
            margin-top: 10px; /* Separación con los botones de tonalidad */
            margin-bottom: 25px; /* Separación con la letra de la canción */
        }

        .capo-selector-div label {
            font-weight: bold;
            font-size: 16px;
            margin: 0;
            color: #333;
        }

        .capo-selector-div select {
            width: auto;
            margin-left: 10px;
            font-weight: bold;
            cursor: pointer;
        }

        /* --- ADAPTACIÓN AL MODO OSCURO (SOLO FONDOS OLED) --- */
        body.modo-oscuro .capo-selector-div label { color: #e0e0e0; }
        body.modo-oscuro { background-color: #000000 !important; color: #e0e0e0 !important; }
        body.modo-oscuro .texto { color: #e0e0e0 !important; }
        body.modo-oscuro a, body.modo-oscuro a:visited { color: #90caf9 !important; }
        body.modo-oscuro nav a, body.modo-oscuro .navbar a, body.modo-oscuro .nav-link, body.modo-oscuro .navbar-brand, body.modo-oscuro .dropdown-toggle { color: #ffffff !important; }
        body.modo-oscuro .card, body.modo-oscuro .list-group-item, body.modo-oscuro .btn, body.modo-oscuro a.btn, body.modo-oscuro .card a { color: #ffffff !important; }
        body.modo-oscuro .card, body.modo-oscuro .list-group-item { background-color: #000000 !important; border-color: #333 !important; }
        body.modo-oscuro .btn:not(.btn-primary):not(.azul) { background-color: #000000 !important; border-color: #333 !important; }
        body.modo-oscuro .btn-primary, body.modo-oscuro .azul { color: #ffffff !important; }
        body.modo-oscuro input, body.modo-oscuro .form-control { background-color: #000000 !important; color: #fff !important; border-color: #444 !important; }
        
        /* Asegurar que el selector de Capo también se ponga oscuro */
        body.modo-oscuro select.capo-dropdown { background-color: #000000 !important; color: #90caf9 !important; border-color: #444 !important; }
        
        body.modo-oscuro #listaGlobal, body.modo-oscuro .dropdown-menu, body.modo-oscuro #fav-modal { background-color: #121212 !important; border: 2px solid #2A9D8F !important; color: #fff !important; }
        body.modo-oscuro #listaGlobal a, body.modo-oscuro .dropdown-item, body.modo-oscuro .fav-item a { border-bottom: 1px solid #2c2c2e !important; color: #e0e0e0 !important; }
        body.modo-oscuro #listaGlobal a:hover, body.modo-oscuro .dropdown-item:hover { background-color: #2A9D8F !important; color: #fff !important; }
        body.modo-oscuro span.c, body.modo-oscuro .c { color: red !important; font-weight: bold; }
        body.modo-oscuro #menu-content { background: #000000; border-color: #444; }
        body.modo-oscuro .menu-label { color: #ccc; }
        body.modo-oscuro .mini-btn { background: #000000; border-color: #555; color: #fff; }
        body.modo-oscuro #menu-trigger { background: #fff; color: #000; }
        body.modo-oscuro .transpose-keys a { background-color: #18181b !important; color: #e4e4e7 !important; border: 1px solid #3f3f46 !important; }
        body.modo-oscuro .transpose-keys a.selected { background-color: #2A9D8F !important; color: #ffffff !important; border-color: #2A9D8F !important; }
        body.modo-oscuro .btn-toggle-cifrado { background: rgba(42,157,143,0.2) !important; color: #2A9D8F !important; border-color: #2A9D8F !important; }

        /* --- ARREGLO PARA QUE EL REPERTORIO SEA UNA SOLA PÁGINA --- */
        #letra, .zona-letra {
            max-height: none !important;
            height: auto !important;
            overflow: visible !important;
        }
        
        /* Por si los contenedores de las canciones en el programa tienen otra clase */
        .cancion-programa, .programa-item {
            max-height: none !important;
            height: auto !important;
            overflow: visible !important;
        }

        /* --- FUENTE MONOESPACIADA ESTRICTA PARA EVITAR DESFASES DE ACORDES --- */
        #letra, #letra *, span.c, .c {
            font-family: 'Consolas', 'Courier New', Courier, monospace !important;
        }

        /* --- ESTILOS DE LOS MODALES DE IMPRIMIR Y NOTAS --- */
        body.modo-oscuro #modal-imprimir-cancion > div,
        body.modo-oscuro #modal-nota-cancion > div {
            background: #18181b !important;
            border-color: #3f3f46 !important;
            color: #ffffff !important;
        }
        body.modo-oscuro #modal-imprimir-cancion p,
        body.modo-oscuro #modal-nota-cancion p,
        body.modo-oscuro #modal-nota-cancion label {
            color: #a1a1aa !important;
        }
        body.modo-oscuro #texto-nota-cancion-input,
        body.modo-oscuro #seccion-nota-cancion-select {
            background: #09090b !important;
            color: #ffffff !important;
            border-color: #3f3f46 !important;
        }
        body.modo-oscuro #modal-imprimir-cancion .btn-close-imprimir-modal,
        body.modo-oscuro #modal-nota-cancion .btn-cancel-modal-nota {
            background: #27272a !important;
            color: #ffffff !important;
            border-color: #3f3f46 !important;
        }

        /* Estilos de las tarjetas de notas en modo oscuro */
        body.modo-oscuro .nota-card-item {
            background: rgba(217, 119, 6, 0.18) !important;
            border-color: #d97706 !important;
            color: #fef3c7 !important;
        }
        body.modo-oscuro #panel-notas-movil {
            background: rgba(217, 119, 6, 0.12) !important;
            border-color: #d97706 !important;
        }

        @media print {
            .btn-imprimir-descargar-cancion,
            .btn-nota-cancion,
            #panel-notas-escritorio,
            #panel-notas-movil {
                display: none !important;
            }
        }
    `;
    document.head.appendChild(style);

    const modalHTML = `
        <div id="fav-overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:2147483647;"></div>
        <div id="fav-modal" style="display:none; position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); width:90%; max-width:400px; background:white; z-index:2147483648; border-radius:12px; padding:20px; border:1px solid #ccc; max-height:80vh; overflow-y:auto;">
            <h3 id="fav-modal-title" style="margin-top:0;">Mis Favoritos ❤️</h3>
            <div id="fav-list-container"></div>
            <button class="mini-btn" id="fav-close" style="margin-top:15px; width:100%;">Cerrar</button>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modalImprimirCancionHTML = `
        <div id="modal-imprimir-cancion" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); z-index:2147483647; justify-content:center; align-items:center; padding:15px; box-sizing:border-box;">
            <div style="background:#fff; border-radius:16px; padding:22px; max-width:440px; width:100%; box-shadow:0 8px 30px rgba(0,0,0,0.3); font-family:sans-serif; box-sizing:border-box; border:1px solid #ccc;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                    <h5 style="margin:0; color:#2A9D8F; font-weight:800; font-size:17px;">🖨️ Imprimir / Descargar Canción</h5>
                    <button type="button" class="btn-close-imprimir-modal" style="background:transparent; border:none; font-size:20px; cursor:pointer; color:#888;">✕</button>
                </div>
                <p style="font-size:13px; color:#555; margin-bottom:14px;">Elegí qué versión y formato preferís para esta canción:</p>
                <div style="display:flex; flex-direction:column; gap:10px;">
                    <button type="button" id="btn-modal-pdf-acordes" style="background:#2A9D8F; color:#fff; border:none; padding:11px 14px; border-radius:10px; font-size:13.5px; font-weight:700; cursor:pointer; text-align:left; display:flex; align-items:center; gap:12px;">
                        <span style="font-size:22px;">🎸</span>
                        <div>
                            <div>PDF / Con acordes</div>
                            <small style="font-size:11px; font-weight:400; opacity:0.9;">Tono y capo actual seleccionados</small>
                        </div>
                    </button>
                    <button type="button" id="btn-modal-pdf-texto" style="background:#0A2846; color:#fff; border:none; padding:11px 14px; border-radius:10px; font-size:13.5px; font-weight:700; cursor:pointer; text-align:left; display:flex; align-items:center; gap:12px;">
                        <span style="font-size:22px;">📄</span>
                        <div>
                            <div>PDF / Sólo texto</div>
                            <small style="font-size:11px; font-weight:400; opacity:0.9;">Letra limpia sin acordes lista para imprimir</small>
                        </div>
                    </button>
                    <button type="button" id="btn-modal-word-acordes" style="background:#2b579a; color:#fff; border:none; padding:11px 14px; border-radius:10px; font-size:13.5px; font-weight:700; cursor:pointer; text-align:left; display:flex; align-items:center; gap:12px;">
                        <span style="font-size:22px;">📝</span>
                        <div>
                            <div>Word (.doc) con acordes</div>
                            <small style="font-size:11px; font-weight:400; opacity:0.9;">Archivo editable con acordes en rojo</small>
                        </div>
                    </button>
                    <button type="button" id="btn-modal-word-texto" style="background:#1e3a8a; color:#fff; border:none; padding:11px 14px; border-radius:10px; font-size:13.5px; font-weight:700; cursor:pointer; text-align:left; display:flex; align-items:center; gap:12px;">
                        <span style="font-size:22px;">📄</span>
                        <div>
                            <div>Word (.doc) sólo texto</div>
                            <small style="font-size:11px; font-weight:400; opacity:0.9;">Archivo Word con letra pura para editar</small>
                        </div>
                    </button>
                </div>
                <button type="button" class="btn-close-imprimir-modal" style="margin-top:14px; width:100%; background:#f3f4f6; border:1px solid #ccc; padding:8px; border-radius:8px; font-size:13px; font-weight:700; cursor:pointer; color:#555;">Cancelar</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalImprimirCancionHTML);

    const modalNotaCancionHTML = `
        <div id="modal-nota-cancion" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); z-index:2147483647; justify-content:center; align-items:center; padding:15px; box-sizing:border-box;">
            <div style="background:#fff; border-radius:16px; padding:20px; max-width:480px; width:100%; border:2px solid #d97706; box-shadow:0 8px 30px rgba(0,0,0,0.3); font-family:sans-serif; box-sizing:border-box; max-height:92vh; overflow-y:auto;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                    <h5 id="titulo-modal-nota" style="margin:0; color:#d97706; font-weight:800; font-size:16px;">📌 Nota de la canción</h5>
                    <button type="button" class="btn-close-nota-modal" style="background:transparent; border:none; font-size:20px; cursor:pointer; color:#888;">✕</button>
                </div>
                <div id="box-ubicacion-nota" style="margin-bottom:12px; background:#fef3c7; border:1px solid #fde68a; border-radius:8px; padding:8px 12px; font-size:12.5px; color:#92400e; display:flex; justify-content:space-between; align-items:center; gap:8px;">
                    <div style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                        <b>Ubicación:</b> <span id="lbl-ubicacion-seleccionada">Al inicio</span>
                    </div>
                    <button type="button" id="btn-tocar-ubicacion-nota" style="background:#d97706; border:none; color:#fff; border-radius:6px; padding:4px 10px; font-size:11.5px; font-weight:700; cursor:pointer; white-space:nowrap;">🎯 Cambiar</button>
                </div>
                <select id="seccion-nota-cancion-select" style="display:none;"></select>
                <div style="margin-bottom:14px;">
                    <label style="display:block; font-size:12px; font-weight:700; color:#555; margin-bottom:4px;">Texto de la nota:</label>
                    <textarea id="texto-nota-cancion-input" rows="3" style="width:100%; border-radius:10px; border:1px solid #ccc; padding:10px; font-size:13.5px; box-sizing:border-box; outline:none; font-family:sans-serif;" placeholder="Escribí aquí lo que querés recordar..."></textarea>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <button type="button" id="btn-borrar-nota-cancion" style="display:none; background:transparent; border:none; color:#dc2626; font-size:13px; font-weight:700; cursor:pointer;">🗑️ Eliminar</button>
                    <div style="display:flex; gap:8px; margin-left:auto;">
                        <button type="button" class="btn-close-nota-modal btn-cancel-modal-nota" style="background:#f3f4f6; border:1px solid #ccc; padding:7px 14px; border-radius:8px; font-size:13px; font-weight:700; cursor:pointer;">Cancelar</button>
                        <button type="button" id="btn-guardar-modal-nota" style="background:#d97706; color:#fff; border:none; padding:7px 16px; border-radius:8px; font-size:13px; font-weight:700; cursor:pointer;">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalNotaCancionHTML);

    var estadoModalNota = { clave: "", editId: null, ubicaciones: [] };

    window.iniciarModoSeleccionUbicacionNota = function(clave) {
        var c = window.normalizarClaveCancion(clave || window.location.pathname);
        estadoModalNota.clave = c;
        $("#modal-nota-cancion").hide();
        $("#banner-seleccionar-linea").remove();

        var $pre = $("#letra");
        if ($pre.length === 0 && c) {
            $pre = $("pre[data-song-path*='" + c + "'], pre[data-clave*='" + c + "']").first();
        }
        if ($pre.length === 0) {
            window.abrirModalNotaCancion(c, null, "general");
            return;
        }

        // Obtener HTML base limpio sin tarjetas de notas
        var htmlLimpio = $pre.data("base-song-html");
        if (!htmlLimpio) {
            var $clone = $pre.clone();
            $clone.find(".nota-inline-wrapper").remove();
            htmlLimpio = $clone.html();
            $pre.data("base-song-html", htmlLimpio);
        }

        // Envolver cada línea en un contenedor tocable que resalta visualmente al pasar el dedo o el mouse
        var rawLines = htmlLimpio.split("\n");
        var wrappedLines = [];
        for (var i = 0; i < rawLines.length; i++) {
            var lineaTexto = rawLines[i];
            var contenidoVisual = lineaTexto ? lineaTexto : "&nbsp;";
            wrappedLines.push(`<span class="linea-tocar-nota" data-line-idx="${i}" style="display:block; border-radius:4px; padding:2px 4px; margin:1px 0; cursor:pointer; transition:background 0.15s ease;">${contenidoVisual}</span>`);
        }
        $pre.html(wrappedLines.join("\n"));

        var bannerHTML = `
            <div id="banner-seleccionar-linea" style="position:fixed; top:10px; left:50%; transform:translateX(-50%); z-index:2147483647; background:#0A2846; color:#ffffff; padding:4px 10px; border-radius:99px; box-shadow:0 6px 20px rgba(0,0,0,0.35); font-size:12px; font-weight:700; display:flex; gap:6px; align-items:center; justify-content:center; border:1.5px solid #2A9D8F; max-width:96vw; white-space:nowrap; box-sizing:border-box; animation: bannerAnimDown 0.2s ease-out;">
                <span style="font-size:11.5px; font-weight:700; color:#fff; white-space:nowrap;">👉 Tocá la frase o acorde</span>
                <button type="button" id="btn-nota-al-inicio" style="background:#2A9D8F; border:none; color:#fff; border-radius:99px; padding:3px 9px; font-size:11px; font-weight:700; cursor:pointer; white-space:nowrap;">📌 Al inicio</button>
                <button type="button" id="btn-cancelar-seleccion-linea" style="background:rgba(255,255,255,0.22); border:none; color:#fff; border-radius:99px; padding:3px 8px; font-size:11px; font-weight:700; cursor:pointer; white-space:nowrap;" title="Cancelar">✕</button>
            </div>
        `;
        $("body").append(bannerHTML);

        if ($("#estilo-tocar-linea").length === 0) {
            $("head").append(`
                <style id="estilo-tocar-linea">
                    @keyframes bannerAnimDown {
                        from { transform: translate(-50%, -20px); opacity: 0; }
                        to { transform: translate(-50%, 0); opacity: 1; }
                    }
                    .linea-tocar-nota:hover, .linea-tocar-nota:active {
                        background-color: rgba(42, 157, 143, 0.22) !important;
                        outline: 1.5px dashed #2A9D8F !important;
                    }
                </style>
            `);
        }

        function limpiarModo() {
            $("#banner-seleccionar-linea").remove();
            $pre.off(".elegirLinea");
            $("#estilo-tocar-linea").remove();
            if (typeof window.renderizarNotasCancion === "function") {
                window.renderizarNotasCancion(c, $pre);
            }
        }

        $(document).off("click.cancelarSel").on("click.cancelarSel", "#btn-cancelar-seleccion-linea", function(e) {
            e.stopPropagation();
            limpiarModo();
        });

        $(document).off("click.notaInicio").on("click.notaInicio", "#btn-nota-al-inicio", function(e) {
            e.stopPropagation();
            limpiarModo();
            window.abrirModalNotaCancion(c, null, "general");
        });

        $pre.off(".elegirLinea").on("click.elegirLinea", ".linea-tocar-nota", function(e) {
            e.preventDefault();
            e.stopPropagation();

            var lineIdx = parseInt($(this).attr("data-line-idx"), 10);
            if (isNaN(lineIdx) || lineIdx < 0) lineIdx = 0;

            limpiarModo();

            var lineId = "line_" + lineIdx;
            window.abrirModalNotaCancion(c, null, lineId);
        });
    };

    window.abrirModalNotaCancion = function(clave, notaIdAEditar, preselectedLineId) {
        estadoModalNota.clave = window.normalizarClaveCancion(clave || window.location.pathname);
        estadoModalNota.editId = notaIdAEditar || null;
        
        var $pre = $("#letra");
        if ($pre.length === 0 && estadoModalNota.clave) {
            $pre = $("pre[data-song-path*='" + estadoModalNota.clave + "'], pre[data-clave*='" + estadoModalNota.clave + "']").first();
        }
        estadoModalNota.ubicaciones = window.extraerUbicacionesCancion($pre);

        var $select = $("#seccion-nota-cancion-select");
        $select.empty();
        estadoModalNota.ubicaciones.forEach(function(u) {
            $select.append(`<option value="${u.id}">${u.nombre}</option>`);
        });

        var $input = $("#texto-nota-cancion-input");
        var $btnBorrar = $("#btn-borrar-nota-cancion");
        var $titulo = $("#titulo-modal-nota");

        if (notaIdAEditar) {
            var notas = window.obtenerArrayNotasCancion(estadoModalNota.clave);
            var notaActual = notas.find(function(n) { return String(n.id) === String(notaIdAEditar); });
            if (notaActual) {
                var valTarget = (notaActual.lineIndex !== undefined && notaActual.lineIndex >= 0) ? ("line_" + notaActual.lineIndex) : "general";
                $select.val(valTarget);
                $input.val(notaActual.texto || "");
                var uFound = estadoModalNota.ubicaciones.find(function(u) { return u.id === valTarget; });
                $("#lbl-ubicacion-seleccionada").text(uFound ? uFound.nombre : "Al inicio");
            }
            $btnBorrar.show();
            $titulo.text("✏️ Editar nota");
        } else {
            var valTarget = preselectedLineId || "general";
            $select.val(valTarget);
            var uFound = estadoModalNota.ubicaciones.find(function(u) { return u.id === valTarget; });
            $("#lbl-ubicacion-seleccionada").text(uFound ? uFound.nombre : "Al inicio");
            $input.val("");
            $btnBorrar.hide();
            $titulo.text("📌 Nueva nota");
        }

        var modal = document.getElementById("modal-nota-cancion");
        if (modal) modal.style.display = "flex";
        setTimeout(function() { if ($input[0]) $input[0].focus(); }, 120);
    };

    window.cerrarModalNotaCancion = function() {
        var modal = document.getElementById("modal-nota-cancion");
        if (modal) modal.style.display = "none";
    };

    window.guardarNotaModal = function() {
        var c = estadoModalNota.clave;
        if (!c) return;
        var texto = ($("#texto-nota-cancion-input").val() || "").trim();
        if (!texto) {
            alert("Por favor escribí el texto de la nota.");
            return;
        }

        var selectVal = $("#seccion-nota-cancion-select").val() || "general";
        var $pre = $("#letra");
        if ($pre.length === 0 && c) {
            $pre = $("pre[data-song-path*='" + c + "'], pre[data-clave*='" + c + "']").first();
        }
        var ubicaciones = window.extraerUbicacionesCancion($pre);
        var ubicObj = ubicaciones.find(function(u) { return u.id === selectVal; }) || { id: "general", lineIndex: -1, nombre: "General", tipo: "general" };

        var notas = window.obtenerArrayNotasCancion(c);

        if (estadoModalNota.editId) {
            var idx = notas.findIndex(function(n) { return String(n.id) === String(estadoModalNota.editId); });
            if (idx !== -1) {
                notas[idx].lineIndex = ubicObj.lineIndex;
                notas[idx].nombreSeccion = "Nota";
                notas[idx].tipoUbicacion = ubicObj.tipo;
                notas[idx].texto = texto;
            }
        } else {
            notas.push({
                id: Date.now().toString(),
                lineIndex: ubicObj.lineIndex,
                nombreSeccion: "Nota",
                tipoUbicacion: ubicObj.tipo,
                texto: texto
            });
        }

        notas.sort(function(a, b) { 
            var lA = (a.lineIndex !== undefined && a.lineIndex !== null) ? a.lineIndex : -1;
            var lB = (b.lineIndex !== undefined && b.lineIndex !== null) ? b.lineIndex : -1;
            return lA - lB; 
        });

        window.guardarArrayNotasCancion(c, notas, $pre);
        window.cerrarModalNotaCancion();
    };

    window.borrarNotaModal = function() {
        if (!estadoModalNota.editId) {
            window.cerrarModalNotaCancion();
            return;
        }
        var c = estadoModalNota.clave;
        var notas = window.obtenerArrayNotasCancion(c);
        notas = notas.filter(function(n) { return String(n.id) !== String(estadoModalNota.editId); });
        var $pre = $("#letra");
        if ($pre.length === 0 && c) {
            $pre = $("pre[data-song-path*='" + c + "'], pre[data-clave*='" + c + "']").first();
        }
        window.guardarArrayNotasCancion(c, notas, $pre);
        window.cerrarModalNotaCancion();
    };

    // Botón Cambiar ubicación dentro del modal
    $(document).on("click", "#btn-tocar-ubicacion-nota", function() {
        window.iniciarModoSeleccionUbicacionNota(estadoModalNota.clave);
    });

    $(document).on("click", ".btn-editar-nota-item", function(e) {
        e.stopPropagation();
        var $btn = $(this);
        var $wrapper = $btn.closest(".nota-inline-wrapper, .nota-card-item");
        var id = $btn.attr("data-nota-id") || $wrapper.attr("data-nota-id");
        var $pre = $wrapper.closest("pre");
        if ($pre.length === 0) $pre = $("#letra");
        var songPath = ($pre.length ? ($pre.attr("data-song-path") || $pre.data("song-path")) : null) ||
                       $wrapper.closest("[data-song-path]").attr("data-song-path") ||
                       window.location.pathname;
        var c = window.normalizarClaveCancion(songPath);
        window.abrirModalNotaCancion(c, id);
    });

    $(document).on("click", ".btn-borrar-nota-item", function(e) {
        e.stopPropagation();
        var $btn = $(this);
        var $wrapper = $btn.closest(".nota-inline-wrapper, .nota-card-item");
        var id = $btn.attr("data-nota-id") || $wrapper.attr("data-nota-id");
        var $pre = $wrapper.closest("pre");
        if ($pre.length === 0) $pre = $("#letra");
        var songPath = ($pre.length ? ($pre.attr("data-song-path") || $pre.data("song-path")) : null) ||
                       $wrapper.closest("[data-song-path]").attr("data-song-path") ||
                       window.location.pathname;
        var c = window.normalizarClaveCancion(songPath);
        var notas = window.obtenerArrayNotasCancion(c);
        var filtradas = notas.filter(function(n) { return String(n.id) !== String(id); });
        $wrapper.remove();
        window.guardarArrayNotasCancion(c, filtradas, $pre);
    });

    window.abrirModalImprimirCancion = function() {
        var modal = document.getElementById("modal-imprimir-cancion");
        if (modal) modal.style.display = "flex";
    };

    window.cerrarModalImprimirCancion = function() {
        var modal = document.getElementById("modal-imprimir-cancion");
        if (modal) modal.style.display = "none";
    };

    window.removerEmojis = function(str) {
        if (!str) return "";
        return str.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}]/gu, "").replace(/^[ \t]+/gm, "").replace(/[ \t]+$/gm, "");
    };

    function normalizarNotasParaExportar($pre) {
        if (!$pre || $pre.length === 0) return $pre;
        var $clone = $pre.clone();
        $clone.find(".nota-inline-btn-group").remove();
        $clone.find(".nota-inline-wrapper").each(function() {
            var $w = $(this);
            var cuerpo = ($w.find(".nota-inline-cuerpo").html() || $w.find(".nota-inline-cuerpo").text() || "").trim();
            $w.replaceWith(`<span class="nota-inline-wrapper"><b class="nota-inline-tag">📌 NOTA:</b> <span class="nota-inline-cuerpo">${cuerpo}</span></span>`);
        });
        return $clone;
    }

    window.obtenerLetraSoloTexto = function($pre) {
        if (!$pre || $pre.length === 0) return "";
        var $clone = normalizarNotasParaExportar($pre);
        var raw = $clone.html();
        var lines = raw.split("\n");
        var textLines = [];
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (line.indexOf("nota-inline-wrapper") !== -1 || line.indexOf("nota-inline-") !== -1) {
                textLines.push(line);
            } else if (!window.isChordLine(line)) {
                var clean = line.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/\s+$/, "");
                textLines.push(clean);
            }
        }
        return textLines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
    };

    window.imprimirCancionPDF = function(tipo) {
        window.cerrarModalImprimirCancion();
        var tituloCancion = (document.querySelector("h1") ? document.querySelector("h1").textContent : document.title.split("-")[0]).trim();
        var $pre = $('#letra');
        if ($pre.length === 0) return;

        var tonoActual = $('.transpose-keys a.selected').text().trim() || $pre.attr('data-key') || '';
        var capoActual = $('select.capo-dropdown').val() || '0';
        var textoCapo = String(capoActual) === '0' ? 'Sin Capo' : ('Capo ' + capoActual);

        var iframe = document.getElementById('iframe-imprimir-cancion');
        if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.id = 'iframe-imprimir-cancion';
            iframe.style.position = 'fixed';
            iframe.style.right = '0';
            iframe.style.bottom = '0';
            iframe.style.width = '0';
            iframe.style.height = '0';
            iframe.style.border = '0';
            document.body.appendChild(iframe);
        }

        var contenido = "";
        var subtitulo = "";
        if (tipo === 'acordes') {
            var $clone = normalizarNotasParaExportar($pre);
            contenido = $clone.html();
            subtitulo = `Tono: <b>${tonoActual}</b> · <b>${textoCapo}</b> · Cancionero Schoenstatt`;
        } else {
            contenido = window.obtenerLetraSoloTexto($pre);
            subtitulo = `Cancionero Schoenstatt`;
        }

        var docHTML = `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <title>${tituloCancion}</title>
              <style>
                @page { size: auto; margin: 1.5cm 1.2cm; }
                body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; color: #000; margin: 0; padding: 0.2cm; }
                h1 { text-align: center; font-size: 19pt; margin-top: 0; margin-bottom: 4pt; color: #0A2846; }
                .sub { text-align: center; font-size: 10.5pt; color: #555; margin-bottom: 12pt; }
                pre { font-family: 'Consolas', 'Courier New', Courier, monospace; font-size: 10.5pt; line-height: 1.4; white-space: pre-wrap; margin: 0 auto; max-width: 680px; }
                .c, span.c { font-weight: bold; color: #000; }
                .nota-inline-wrapper { background: #fef3c7 !important; background-color: #fef3c7 !important; border: 1px solid #f59e0b !important; border-left: 4px solid #d97706 !important; padding: 3pt 6pt !important; margin: 4pt 0 !important; font-size: 9.5pt !important; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif !important; white-space: normal !important; display: block !important; border-radius: 4pt !important; color: #78350f !important; page-break-inside: avoid !important; break-inside: avoid !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                .nota-inline-btn-group { display: none !important; }
                .nota-inline-tag { font-weight: 800 !important; font-size: 8.5pt !important; text-transform: uppercase !important; color: #b45309 !important; }
                .nota-inline-cuerpo { font-weight: 500 !important; display: inline !important; }
              </style>
            </head>
            <body>
              <h1>${tituloCancion}</h1>
              <div class="sub">${subtitulo}</div>
              <pre>${contenido}</pre>
            </body>
            </html>
        `;

        var doc = iframe.contentWindow.document;
        doc.open();
        doc.write(docHTML);
        doc.close();

        setTimeout(function() {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
        }, 250);
    };

    window.descargarCancionWord = function(tipo) {
        window.cerrarModalImprimirCancion();
        var tituloCancion = (document.querySelector("h1") ? document.querySelector("h1").textContent : document.title.split("-")[0]).trim();
        var $pre = $('#letra');
        if ($pre.length === 0) return;

        var tonoActual = $('.transpose-keys a.selected').text().trim() || $pre.attr('data-key') || '';
        var capoActual = $('select.capo-dropdown').val() || '0';
        var textoCapo = String(capoActual) === '0' ? 'Sin Capo' : ('Capo ' + capoActual);

        var contenidoCancion = "";
        var subtitulo = "";
        if (tipo === 'acordes') {
            var $clone = normalizarNotasParaExportar($pre);
            var raw = $clone.html();
            contenidoCancion = raw.replace(/<span class="c">([^<]+)<\/span>/g, '<span style="color:#c00000; font-weight:bold;">$1</span>');
            subtitulo = `Tono: <b>${tonoActual}</b> · <b>${textoCapo}</b> · Cancionero Schoenstatt`;
        } else {
            contenidoCancion = window.obtenerLetraSoloTexto($pre);
            subtitulo = `Cancionero Schoenstatt`;
        }

        var docHTML = `
            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
            <head>
              <meta charset='utf-8'>
              <title>${tituloCancion}</title>
              <!--[if gte mso 9]>
              <xml>
                <w:WordDocument>
                  <w:View>Print</w:View>
                  <w:Zoom>100</w:Zoom>
                  <w:DoNotOptimizeForBrowser/>
                </w:WordDocument>
              </xml>
              <![endif]-->
              <style>
                @page { size: A4; margin: 2cm; }
                body { font-family: Arial, sans-serif; font-size: 11pt; color: #000000; }
                h1 { font-size: 18pt; color: #0A2846; text-align: center; margin-bottom: 4pt; }
                .subtitulo-doc { text-align: center; font-size: 10pt; color: #555555; margin-bottom: 15pt; }
                pre { font-family: 'Consolas', 'Courier New', monospace; font-size: 10.5pt; line-height: 1.35; margin: 0; white-space: pre-wrap; }
                .nota-inline-wrapper { background: #fef3c7; border: 1px solid #f59e0b; border-left: 4px solid #d97706; padding: 3pt 6pt; margin: 4pt 0; font-size: 9.5pt; font-family: Arial, sans-serif; display: block; color: #78350f; }
                .nota-inline-btn-group { display: none !important; }
                .nota-inline-tag { font-weight: bold; font-size: 8.5pt; text-transform: uppercase; color: #b45309; }
                .nota-inline-cuerpo { font-weight: normal; font-size: 9.5pt; color: #78350f; display: inline; }
              </style>
            </head>
            <body>
              <h1>${tituloCancion}</h1>
              <div class="subtitulo-doc">${subtitulo}</div>
              <pre>${contenidoCancion}</pre>
            </body>
            </html>
        `;

        var blob = new Blob(['\ufeff' + docHTML], { type: 'application/msword;charset=utf-8' });
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        var limpioTitulo = tituloCancion.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s-_]/g, '');
        link.download = limpioTitulo + (tipo === 'acordes' ? ' (' + tonoActual + ').doc' : ' (Letra).doc');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    setTimeout(function() {
        $(document).on("click", ".btn-close-imprimir-modal", window.cerrarModalImprimirCancion);
        $(document).on("click", "#btn-modal-pdf-acordes", function() {
            window.imprimirCancionPDF('acordes');
        });
        $(document).on("click", "#btn-modal-pdf-texto", function() {
            window.imprimirCancionPDF('texto');
        });
        $(document).on("click", "#btn-modal-word-acordes", function() {
            window.descargarCancionWord('acordes');
        });
        $(document).on("click", "#btn-modal-word-texto", function() {
            window.descargarCancionWord('texto');
        });

        $(document).on("click", ".btn-close-nota-modal", window.cerrarModalNotaCancion);
        $(document).on("click", "#btn-guardar-modal-nota", window.guardarNotaModal);
        $(document).on("click", "#btn-borrar-nota-cancion", window.borrarNotaModal);

        $(document).on("click", ".btn-agregar-otra-nota", function(e) {
            e.stopPropagation();
            window.abrirModalNotaCancion(window.location.pathname, null);
        });

        $(document).on("click", "#btn-toggle-notas-movil", function(e) {
            e.preventDefault();
            var $cuerpo = $("#cuerpo-notas-movil");
            var visible = $cuerpo.is(":visible");
            if (visible) {
                $cuerpo.slideUp(150);
                $(this).text("Mostrar ▼");
                localStorage.setItem('cancionero_notas_movil_abierto', 'false');
            } else {
                $cuerpo.slideDown(150);
                $(this).text("Ocultar ▲");
                localStorage.setItem('cancionero_notas_movil_abierto', 'true');
            }
        });

        // Asegurar renderizado de notas al cargar la página
        if (typeof window.renderizarNotasCancion === "function") {
            var cActual = window.normalizarClaveCancion(window.location.pathname);
            if (cActual && $("#letra").length > 0) {
                window.renderizarNotasCancion(cActual, $("#letra"));
            }
        }
    }, 100);
});

// =============================================================================
// 3. SÚPER MENÚ Y LÓGICA DE HERRAMIENTAS (VERSIÓN UNIFICADA)
// =============================================================================
document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. CONFIGURACIÓN INICIAL ---
    const esPaginaIndice = window.location.pathname.includes("indice") || window.location.pathname.includes("alfabetico");
    if (esPaginaIndice) localStorage.setItem('cancionero_orden', 'alfabetico');
    const modoGuardado = localStorage.getItem('cancionero_orden') || 'seccion';
    const esModoAlfabetico = modoGuardado === 'alfabetico';

    // --- 2. INYECTAR EL MENÚ CON TODAS LAS HERRAMIENTAS (DISEÑO BLINDADO iOS/OLED) ---
    const menuHTML = `
        <style>
            @media print {
                #super-menu-container, #menu-trigger, #menu-content {
                    display: none !important;
                }
            }
            /* Asegurar la posición fija del contenedor del menú */
            #super-menu-container {
                position: fixed !important;
                bottom: 30px !important;
                right: 20px !important;
                z-index: 2147483647 !important;
                font-family: sans-serif !important;
                display: flex !important;
                flex-direction: column !important;
                align-items: flex-end !important;
            }
            @media (max-width: 768px) {
                #super-menu-container {
                    bottom: 20px !important;
                    right: 15px !important;
                }
            }

            /* EL CIRCULITO (BOTÓN TRIGGER) - 100% BLINDADO */
            #menu-trigger {
                width: 50px !important;
                height: 50px !important;
                border-radius: 50% !important;
                background-color: #0A2846 !important;
                color: white !important;
                border: none !important;
                box-shadow: 0 4px 10px rgba(0,0,0,0.4) !important;
                font-size: 24px !important;
                cursor: pointer !important;
                display: flex !important;
                justify-content: center !important;
                align-items: center !important;
                transition: transform 0.2s !important;
            }
            @media (max-width: 768px) {
                #menu-trigger {
                    width: 55px !important;
                    height: 55px !important;
                }
            }
            #menu-trigger:active { transform: scale(0.95) !important; }
            body.modo-oscuro #menu-trigger {
                background: #ffffff !important;
                color: #000000 !important;
                box-shadow: none !important;
            }

            /* Contenedor del contenido del menú */
            #menu-content { 
                display: none !important;
                flex-direction: column;
                background: white;
                border-radius: 18px; 
                padding: 12px 18px; 
                gap: 5px;
                border: 1px solid #eee;
                margin-bottom: 10px;
                min-width: 200px;
            }
            #menu-content.activo { 
                display: flex !important; 
            }
            body.modo-oscuro #menu-content { 
                background-color: #000000 !important; 
                border-color: #2C2C2E !important; 
            }
            
            /* Separadores de fila súper sutiles */
            .menu-row { 
                border-bottom: 1px solid #f0f0f0; 
                padding: 12px 0; 
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            body.modo-oscuro .menu-row { 
                border-bottom-color: #1C1C1E; 
            }
            .menu-row:last-child { border-bottom: none; }
            
            /* Etiquetas con jerarquía visual (tipo Apple) */
            .menu-label { 
                font-size: 12px !important; 
                font-weight: 700 !important; 
                text-transform: uppercase; 
                letter-spacing: 0.8px; 
                color: #8E8E93 !important; 
                margin-right: 10px;
            }
            
            /* Píldoras agrupadoras (Segmented Controls) */
            .pildora { 
                display: flex; 
                align-items: center; 
                background: #F2F2F7; 
                border-radius: 10px; 
                padding: 3px; 
            }
            body.modo-oscuro .pildora { background: #1C1C1E; }
            
            /* Botones dentro de la píldora */
            .btn-pildora { 
                background: transparent; 
                border: none; 
                border-radius: 8px; 
                padding: 6px 14px; 
                font-weight: 700; 
                font-size: 15px; 
                color: #1C1C1E;
                transition: background 0.2s;
            }
            body.modo-oscuro .btn-pildora { color: #FFFFFF; }
            .btn-pildora:active, .btn-pildora.active { background: #FFFFFF; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
            body.modo-oscuro .btn-pildora:active, body.modo-oscuro .btn-pildora.active { background: #2C2C2E; box-shadow: none; }
            
            /* Botones independientes (Favoritos, Luna) */
            .btn-suelto { 
                background: #F2F2F7; 
                border: none; 
                border-radius: 10px; 
                padding: 8px 14px; 
                font-weight: bold; 
                color: #1C1C1E;
                transition: transform 0.1s;
            }
            body.modo-oscuro .btn-suelto { background: #1C1C1E; color: #FFFFFF; }
            .btn-suelto:active { transform: scale(0.95); }

            /* Ventana Modal del Afinador Visual por Micrófono */
            #tuner-overlay {
                display: none;
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.65);
                z-index: 2147483647;
            }
            #tuner-modal {
                display: none;
                position: fixed;
                top: 50%; left: 50%;
                transform: translate(-50%, -50%);
                width: 92%;
                max-width: 360px;
                background: #FDFBF7;
                color: #2C3E50;
                z-index: 2147483648;
                border-radius: 18px;
                padding: 20px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.4);
                border: 2px solid rgba(42, 157, 143, 0.35);
                font-family: sans-serif;
                text-align: center;
            }
            body.modo-oscuro #tuner-modal {
                background: #121212 !important;
                color: #e0e0e0 !important;
                border-color: #333 !important;
            }
            .tuner-display-box {
                background: #ffffff;
                border: 1px solid #e2e8f0;
                border-radius: 14px;
                padding: 16px 12px;
                margin: 12px 0;
            }
            body.modo-oscuro .tuner-display-box {
                background: #1e1e1e !important;
                border-color: #333 !important;
            }
            .tuner-gauge-bar {
                position: relative;
                height: 18px;
                background: #e2e8f0;
                border-radius: 999px;
                overflow: hidden;
                margin-top: 8px;
                border: 1px solid #cbd5e1;
            }
            body.modo-oscuro .tuner-gauge-bar {
                background: #2c2c2e !important;
                border-color: #444 !important;
            }
            .tuner-gauge-center {
                position: absolute;
                top: 0; bottom: 0;
                left: 43%; right: 43%;
                background: rgba(16, 185, 129, 0.25);
                border-left: 1px dashed #10b981;
                border-right: 1px dashed #10b981;
            }
            #tuner-needle {
                position: absolute;
                top: 2px; bottom: 2px;
                width: 12px;
                border-radius: 999px;
                background: #10b981;
                left: calc(50% - 6px);
                transition: left 0.08s ease-out, background-color 0.15s;
            }
            .tuner-string-pills {
                display: flex;
                justify-content: space-between;
                gap: 4px;
                margin-top: 12px;
            }
            .tuner-string-tag {
                flex: 1;
                padding: 5px 2px;
                border-radius: 8px;
                font-size: 11px;
                font-weight: 800;
                background: #f1f5f9;
                color: #64748b;
                border: 1px solid #e2e8f0;
                transition: all 0.15s;
            }
            body.modo-oscuro .tuner-string-tag {
                background: #2c2c2e;
                color: #94a3b8;
                border-color: #3f3f46;
            }
            .tuner-string-tag.detected {
                background: #2A9D8F;
                color: #ffffff;
                border-color: #2A9D8F;
                transform: scale(1.06);
            }

            /* Input Numérico Transparente */
            .input-invisible { 
                background: transparent; 
                border: none; 
                text-align: center; 
                font-weight: 700; 
                font-size: 16px; 
                width: 45px; 
                outline: none; 
                color: #1C1C1E;
            }
            body.modo-oscuro .input-invisible { color: #FFFFFF; }
            
            /* Rayita separadora en píldoras */
            .separador-pildora {
                width: 1px; 
                background: #C7C7CC; 
                margin: 0 2px; 
                align-self: stretch; 
                opacity: 0.6;
            }
            body.modo-oscuro .separador-pildora { background: #38383A; }
            body.modo-oscuro .divisor-tema { background: #1C1C1E !important; }
            @media print {
                #super-menu-container, #menu-trigger, #menu-content, #autoscroll-flotante, .btn-float-scroll, #tuner-overlay, #tuner-modal {
                    display: none !important;
                }
            }
        </style>

        <!-- VENTANA MODAL DEL AFINADOR CON MICRÓFONO -->
        <div id="tuner-overlay"></div>
        <div id="tuner-modal">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <span style="font-weight:800; font-size:16px;">🎸 Afinador de Guitarra</span>
                <span id="tuner-badge" style="font-size:11px; font-weight:700; padding:3px 9px; border-radius:99px; background:#e0f2fe; color:#0369a1;">🎙️ Activo</span>
            </div>

            <div class="tuner-display-box">
                <div id="tuner-sub-info" style="font-size:12px; color:#64748b; font-weight:600; margin-bottom:2px;">Tocá una cuerda de tu guitarra...</div>
                <div id="tuner-main-note" style="font-size:38px; font-weight:900; line-height:1.1; margin:6px 0;">—</div>
                <div id="tuner-status-msg" style="font-size:13px; font-weight:700; color:#2A9D8F; min-height:20px;">Escuchando micrófono...</div>

                <div style="display:flex; justify-content:space-between; font-size:11px; font-weight:700; color:#64748b; margin-top:12px; padding:0 2px;">
                    <span>⏪ Baja (Ajustar)</span>
                    <span style="color:#10b981;">CENTRO</span>
                    <span>Alta (Aflojar) ⏩</span>
                </div>
                <div class="tuner-gauge-bar">
                    <div class="tuner-gauge-center"></div>
                    <div id="tuner-needle"></div>
                </div>

                <!-- Indicador de cuál de las 6 cuerdas se detectó (no son botones de sonido, solo indicador visual) -->
                <div class="tuner-string-pills">
                    <div class="tuner-string-tag" id="tag-cuerda-0">6ª MI</div>
                    <div class="tuner-string-tag" id="tag-cuerda-1">5ª LA</div>
                    <div class="tuner-string-tag" id="tag-cuerda-2">4ª RE</div>
                    <div class="tuner-string-tag" id="tag-cuerda-3">3ª SOL</div>
                    <div class="tuner-string-tag" id="tag-cuerda-4">2ª SI</div>
                    <div class="tuner-string-tag" id="tag-cuerda-5">1ª mi</div>
                </div>

                <!-- Medidor de volumen para comprobar que el micrófono toma sonido -->
                <div style="margin-top:12px; display:flex; align-items:center; gap:8px;">
                    <span style="font-size:10px; font-weight:700; color:#64748b; white-space:nowrap;">🎙️ Señal:</span>
                    <div style="flex:1; height:6px; background:#e2e8f0; border-radius:99px; overflow:hidden;">
                        <div id="tuner-vol-bar" style="width:0%; height:100%; background:#2A9D8F; transition:width 0.06s;"></div>
                    </div>
                </div>
            </div>

            <button id="tuner-close-btn" style="width:100%; background:#0A2846; color:#fff; border:none; padding:11px; border-radius:10px; font-weight:700; font-size:14px; cursor:pointer;">Cerrar afinador</button>
        </div>

        <!-- CONTENEDOR DE LAS 4 BOLITAS -->
        <div id="contenedor-bolitas" style="display:none; position:fixed; top:30px; right:30px; gap:8px; z-index:2147483647; background: rgba(0,0,0,0.5); padding: 10px; border-radius: 20px; align-items: center;">
            <div id="bolita-1" style="width:20px; height:20px; border-radius:50%; background:#ccc; opacity:1; transition:0.1s;"></div>
            <div id="bolita-2" style="width:15px; height:15px; border-radius:50%; background:#ccc; opacity:1; transition:0.1s;"></div>
            <div id="bolita-3" style="width:15px; height:15px; border-radius:50%; background:#ccc; opacity:1; transition:0.1s;"></div>
            <div id="bolita-4" style="width:15px; height:15px; border-radius:50%; background:#ccc; opacity:1; transition:0.1s;"></div>
        </div>

        <!-- CONTROL FLOTANTE DE AUTO SCROLL (AFUERA DEL MENÚ) -->
        <style>
            #autoscroll-flotante {
                display: none;
                position: fixed;
                bottom: 30px;
                right: 80px;
                z-index: 2147483646;
                background: rgba(255, 255, 255, 0.96);
                border: 2px solid #2A9D8F;
                border-radius: 999px;
                padding: 4px 8px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.22);
                align-items: center;
                gap: 4px;
                font-family: sans-serif;
            }
            @media (max-width: 768px) {
                #autoscroll-flotante {
                    bottom: 20px;
                    right: 70px;
                }
            }
            body.modo-oscuro #autoscroll-flotante {
                background: rgba(24, 24, 27, 0.96);
                border-color: #2A9D8F;
                color: #ffffff;
            }
            .btn-float-scroll {
                background: transparent;
                border: none;
                border-radius: 999px;
                width: 32px;
                height: 32px;
                font-weight: 800;
                font-size: 15px;
                color: #1C1C1E;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                padding: 0;
            }
            body.modo-oscuro .btn-float-scroll { color: #ffffff; }
            .btn-float-scroll:active { background: rgba(42, 157, 143, 0.2); }
            #float-scroll-play.active {
                background: #2A9D8F;
                color: #ffffff;
            }
            #float-scroll-speed {
                font-weight: 800;
                font-size: 14px;
                min-width: 20px;
                text-align: center;
                color: #2A9D8F;
            }
            @media print {
                #autoscroll-flotante, .btn-float-scroll { display: none !important; }
            }
        </style>
        <div id="autoscroll-flotante">
            <button class="btn-float-scroll" id="float-scroll-minus" title="Más lento">－</button>
            <span id="float-scroll-speed">3</span>
            <button class="btn-float-scroll" id="float-scroll-plus" title="Más rápido">＋</button>
            <div style="width:1px; height:18px; background:rgba(128,128,128,0.3); margin:0 2px;"></div>
            <button class="btn-float-scroll" id="float-scroll-play" title="Pausar / Reanudar">▶</button>
            <button class="btn-float-scroll" id="float-scroll-close" title="Cerrar control" style="color:#ef4444; font-size:13px;">✖</button>
        </div>
        <div id="super-menu-container">
            <div id="menu-content">
                
                <div class="menu-row">
                    <span class="menu-label">Favoritos</span>
                    <div style="display:flex; gap:8px;">
                        <button class="btn-suelto" id="fav-toggle" title="Guardar o quitar de Favoritos">🤍</button>
                        <button class="btn-suelto" id="fav-view" title="Ver mis Favoritos">📂</button>
                    </div>
                </div>

                <div class="menu-row">
                    <span class="menu-label">Tempo</span>
                    <div class="pildora">
                        <input type="number" id="bpm-number" class="input-invisible" min="30" max="240" value="120">
                        <div class="separador-pildora"></div>
                        <button class="btn-pildora" id="btn-metronomo" style="padding: 6px 14px;">▶</button>
                    </div>
                </div>

                <div class="menu-row">
                    <span class="menu-label">Afinador</span>
                    <button class="btn-suelto" id="btn-open-mic-tuner" style="background:#2A9D8F; color:#fff;">🎙️ Afina tu guitarra</button>
                </div>

                <div class="menu-row">
                    <span class="menu-label">Auto Scroll</span>
                    <div class="pildora">
                        <button class="btn-pildora" id="scroll-minus">－</button>
                        <span id="scroll-speed-display" class="input-invisible" style="width:25px; line-height:30px;">3</span>
                        <button class="btn-pildora" id="scroll-plus">＋</button>
                        <div class="separador-pildora"></div>
                        <button class="btn-pildora" id="scroll-play">▶</button>
                    </div>
                </div>

                <div class="menu-row">
                    <span class="menu-label">Letra</span>
                    <div class="pildora">
                        <button class="btn-pildora" id="font-minus">A-</button>
                        <div class="separador-pildora"></div>
                        <button class="btn-pildora" id="font-plus">A+</button>
                    </div>
                </div>

            </div>
            <button id="menu-trigger">☰</button>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', menuHTML);

    const menuTrigger = document.getElementById("menu-trigger");
    const menuContent = document.getElementById("menu-content");
    menuTrigger.onclick = () => { menuContent.classList.toggle("activo"); menuTrigger.innerHTML = menuContent.classList.contains("activo") ? "✖" : "☰"; };

    // --- 3. FAVORITOS Y RECIENTES (ÚLTIMAS CANCIONES VISTAS) ---
    let favorites = JSON.parse(localStorage.getItem('cancionero_favoritos')) || [];
    let recientes = JSON.parse(localStorage.getItem('cancionero_recientes')) || [];
    const currentUrl = window.location.pathname;
    const h1El = document.querySelector("h1");
    const currentTitle = (h1El ? h1El.textContent : document.title.split("-")[0]).trim(); 
    const favToggle = document.getElementById("fav-toggle");
    const modalTitleEl = document.getElementById("fav-modal-title");

    // Si estamos dentro de una canción, la guardamos automáticamente en "Recientes" (máximo 8 canciones)
    if (document.getElementById("letra") && currentTitle) {
        recientes = recientes.filter(r => r.u !== currentUrl);
        recientes.unshift({ t: currentTitle, u: currentUrl });
        if (recientes.length > 8) recientes = recientes.slice(0, 8);
        try {
            localStorage.setItem('cancionero_recientes', JSON.stringify(recientes));
        } catch (e) {}
    }
    
    const checkFav = () => { 
        if(!document.getElementById("letra")){ favToggle.disabled=true; return; }
        favToggle.innerHTML = favorites.some(f => f.u === currentUrl) ? "❤️" : "🤍"; 
    };
    checkFav();

    favToggle.onclick = () => {
        const idx = favorites.findIndex(f => f.u === currentUrl);
        if(idx > -1) favorites.splice(idx,1); else favorites.push({t:currentTitle, u:currentUrl});
        localStorage.setItem('cancionero_favoritos', JSON.stringify(favorites));
        checkFav();
    };

    document.getElementById("fav-view").onclick = () => {
        const listContainer = document.getElementById("fav-list-container");
        if (modalTitleEl) modalTitleEl.innerText = "Mis Favoritos ❤️";
        favorites = JSON.parse(localStorage.getItem('cancionero_favoritos')) || [];
        listContainer.innerHTML = favorites.length ? favorites.map((f,i) => `<div class="fav-item"><a href="${f.u}">${f.t}</a><span class="fav-delete" onclick="eliminarFav(${i})">🗑️</span></div>`).join('') : "<p>Todavía no guardaste canciones favoritas.</p>";
        document.getElementById("fav-modal").style.display = "block";
        document.getElementById("fav-overlay").style.display = "block";
        menuContent.classList.remove("activo"); menuTrigger.innerHTML = "☰";
    };
    window.eliminarFav = (i) => { favorites.splice(i,1); localStorage.setItem('cancionero_favoritos', JSON.stringify(favorites)); document.getElementById("fav-view").click(); checkFav(); };

    const recentViewBtn = document.getElementById("recent-view");
    if (recentViewBtn) {
        recentViewBtn.onclick = () => {
            const listContainer = document.getElementById("fav-list-container");
            if (modalTitleEl) modalTitleEl.innerText = "Últimas canciones vistas 🕒";
            recientes = JSON.parse(localStorage.getItem('cancionero_recientes')) || [];
            if (recientes.length) {
                listContainer.innerHTML = recientes.map((r, i) => `
                    <div class="fav-item" style="display:flex; justify-content:space-between; align-items:center; padding:8px 4px; border-bottom:1px solid rgba(128,128,128,0.2);">
                        <a href="${r.u}" style="text-decoration:none; font-weight:600;">${i + 1}. ${r.t}</a>
                    </div>
                `).join('') + `<button class="mini-btn" onclick="limpiarRecientes()" style="margin-top:10px; width:100%; font-size:13px; opacity:0.8;">🗑️ Limpiar historial</button>`;
            } else {
                listContainer.innerHTML = "<p>Todavía no abriste ninguna canción hoy.</p>";
            }
            document.getElementById("fav-modal").style.display = "block";
            document.getElementById("fav-overlay").style.display = "block";
            menuContent.classList.remove("activo"); menuTrigger.innerHTML = "☰";
        };
    }
    window.limpiarRecientes = () => {
        recientes = [];
        localStorage.removeItem('cancionero_recientes');
        if (recentViewBtn) recentViewBtn.click();
    };

    const closeFav = () => { document.getElementById("fav-modal").style.display="none"; document.getElementById("fav-overlay").style.display="none"; };
    document.getElementById("fav-close").onclick = closeFav; 
    document.getElementById("fav-overlay").onclick = closeFav;

    // --- 4. AUTOSCROLL (CON CONTROL FLOTANTE EXTERNO), FUENTE Y TEMA ---
    let scrollSpeed = 3, isScrolling = false, scrollInterval;
    const floatScrollBar = document.getElementById("autoscroll-flotante");
    const floatScrollPlay = document.getElementById("float-scroll-play");
    const floatScrollSpeed = document.getElementById("float-scroll-speed");
    const floatScrollPlus = document.getElementById("float-scroll-plus");
    const floatScrollMinus = document.getElementById("float-scroll-minus");
    const floatScrollClose = document.getElementById("float-scroll-close");

    const syncScrollUI = () => {
        const playBtn = document.getElementById("scroll-play");
        const speedDisp = document.getElementById("scroll-speed-display");
        if (speedDisp) speedDisp.innerText = scrollSpeed;
        if (floatScrollSpeed) floatScrollSpeed.innerText = scrollSpeed;
        if (playBtn) {
            playBtn.innerHTML = isScrolling ? "⏸" : "▶";
            playBtn.classList.toggle("active", isScrolling);
        }
        if (floatScrollPlay) {
            floatScrollPlay.innerHTML = isScrolling ? "⏸" : "▶";
            floatScrollPlay.classList.toggle("active", isScrolling);
        }
    };

    const stopScroll = () => {
        clearInterval(scrollInterval);
        isScrolling = false;
        document.documentElement.style.scrollBehavior = "smooth";
        syncScrollUI();
    };

    const startScroll = () => {
        clearInterval(scrollInterval);
        document.documentElement.style.scrollBehavior = "auto";
        const delay = 275 - (scrollSpeed * 20);
        scrollInterval = setInterval(() => {
            if ((window.innerHeight + window.pageYOffset) >= document.documentElement.scrollHeight - 2) {
                stopScroll();
            } else {
                window.scrollTo(0, window.pageYOffset + 1);
            }
        }, delay);
        isScrolling = true;
        if (floatScrollBar) floatScrollBar.style.display = "flex";
        syncScrollUI();
    };

    // Desde el menú ☰: al activar Auto Scroll, cerramos el menú grande y dejamos la barrita flotante afuera
    document.getElementById("scroll-play").onclick = () => {
        if (isScrolling) {
            stopScroll();
        } else {
            startScroll();
            menuContent.classList.remove("activo");
            menuTrigger.innerHTML = "☰";
        }
    };

    const cambiarVelocidadScroll = (delta) => {
        const nueva = scrollSpeed + delta;
        if (nueva >= 1 && nueva <= 10) {
            scrollSpeed = nueva;
            syncScrollUI();
            if (isScrolling) startScroll();
        }
    };

    document.getElementById("scroll-plus").onclick = () => cambiarVelocidadScroll(1);
    document.getElementById("scroll-minus").onclick = () => cambiarVelocidadScroll(-1);

    // Botones de la barrita flotante externa
    if (floatScrollPlay) floatScrollPlay.onclick = () => isScrolling ? stopScroll() : startScroll();
    if (floatScrollPlus) floatScrollPlus.onclick = () => cambiarVelocidadScroll(1);
    if (floatScrollMinus) floatScrollMinus.onclick = () => cambiarVelocidadScroll(-1);
    if (floatScrollClose) {
        floatScrollClose.onclick = () => {
            stopScroll();
            if (floatScrollBar) floatScrollBar.style.display = "none";
        };
    }

    let fontSize = 100;
    const obtenerLetras = () => document.querySelectorAll("#letra, pre[id^='letra-lista'], .zona-letra, #programa-completo-container pre, .cancion-content pre");
    setTimeout(() => { obtenerLetras().forEach(el => { el.style.fontSize = fontSize + "%"; el.style.lineHeight = "1.5"; }); }, 500); 

    const updFont = (v) => { 
        const letras = obtenerLetras();
        if(letras.length === 0) return; 
        fontSize += v; 
        if(fontSize < 60) fontSize = 60; 
        if(fontSize > 250) fontSize = 250; 
        letras.forEach(el => { el.style.fontSize = fontSize + "%"; });
    };
    document.getElementById("font-plus").onclick = () => updFont(10);
    document.getElementById("font-minus").onclick = () => updFont(-10);

    const isDark = localStorage.getItem("cancionero_darkmode") === "true";
    const syncThemeButtonIcon = () => {
        const oscuroActivo = document.body.classList.contains("modo-oscuro");
        document.querySelectorAll("#toggle-theme, .btn-toggle-theme").forEach((btn) => {
            const nuevoTexto = btn.getAttribute("data-full-label") === "true"
                ? (oscuroActivo ? "☀️ Modo Día" : "🌙 Modo Noche")
                : (oscuroActivo ? "☀️" : "🌙");
            if (btn.innerText !== nuevoTexto) {
                btn.innerText = nuevoTexto;
            }
        });
    };
    const applyTheme = (d) => { 
        d ? document.body.classList.add("modo-oscuro") : document.body.classList.remove("modo-oscuro"); 
        syncThemeButtonIcon();
        localStorage.setItem("cancionero_darkmode", d); 
    };
    applyTheme(isDark);
    setTimeout(syncThemeButtonIcon, 200);
    setTimeout(syncThemeButtonIcon, 700);

    // Como navbar.html se carga dinámicamente en las subpáginas, escuchamos el clic en todo el documento
    document.addEventListener("click", (e) => {
        const btn = e.target && e.target.closest("#toggle-theme, .btn-toggle-theme");
        if (btn) {
            e.preventDefault();
            applyTheme(!document.body.classList.contains("modo-oscuro"));
        }
    });

    // Funciona tanto en canciones individuales como dentro de "Programa full (con acordes)"
    document.addEventListener("click", (e) => {
        const btnAcordes = e.target && e.target.closest("#toggleChordsButton");
        if (btnAcordes) {
            const estaOculto = document.body.classList.toggle("acordes-ocultos");
            const letras = document.querySelectorAll("#letra, pre[id^='letra-lista'], .zona-letra");
            letras.forEach(el => el.classList.toggle("acordes-ocultos", estaOculto));
            
            // También alternar display inline/none explícitamente para máxima compatibilidad
            const acordes = document.querySelectorAll(".c, span.c");
            acordes.forEach(el => {
                el.style.display = estaOculto ? "none" : "inline";
            });
            
            btnAcordes.classList.toggle("active", estaOculto);
        }
    });

    // --- 5. MOTOR DE AUDIO SEGURO (METRÓNOMO Y AFINADOR) ---
    let audioCtx = null;
    let safariDesbloqueado = false;

    // La llave maestra para iOS: un buffer vacío al primer toque
    function unlockAppleAudio() {
        if (safariDesbloqueado) return;
        
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!audioCtx) audioCtx = new AudioContext();
        
        // Creamos un sonido de 0 segundos (silencio absoluto) y lo reproducimos
        const buffer = audioCtx.createBuffer(1, 1, 22050);
        const source = audioCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(audioCtx.destination);
        source.start(0);
        
        audioCtx.resume();
        safariDesbloqueado = true;
        
        // Una vez desbloqueado, dejamos de escuchar los toques
        document.removeEventListener('touchstart', unlockAppleAudio);
        document.removeEventListener('click', unlockAppleAudio);
    }

    // Le decimos a la página: "Apenas el usuario toque CUALQUIER cosa, desbloqueá el audio"
    document.addEventListener('touchstart', unlockAppleAudio, { once: true });
    document.addEventListener('click', unlockAppleAudio, { once: true });

    function initAudio() {
        if (!audioCtx) unlockAppleAudio();
        if (audioCtx.state === 'suspended') audioCtx.resume();
    }

    // Lógica del Metrónomo de 4 tiempos
    let metronomoIntervalo = null;
    let sonando = false;
    let tiempoActual = 1; // Arranca en el tiempo 1

    const contenedorBolitas = document.getElementById('contenedor-bolitas');
    const btnMetronomo = document.getElementById('btn-metronomo');
    const bpmInput = document.getElementById('bpm-number');

    function hacerBip() {
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.type = "sine"; 
        
        // Magia del sonido: Si es el tiempo 1, suena más agudo (1200), sino normal (800)
        osc.frequency.value = (tiempoActual === 1) ? 1200 : 800; 
        
        gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.05);

        // Magia visual: Pintamos las bolitas
        if (contenedorBolitas) {
            // 1. Apagamos todas las bolitas (las ponemos grises)
            for (let i = 1; i <= 4; i++) {
                document.getElementById('bolita-' + i).style.background = '#ccc';
            }
            // 2. Prendemos la que toca (Rojo para el 1, Azul para las demás)
            let bolitaActiva = document.getElementById('bolita-' + tiempoActual);
            bolitaActiva.style.background = (tiempoActual === 1) ? '#FF3B30' : '#0A84FF';
        }

        // Pasamos al siguiente tiempo. Si llegó a 4, vuelve a empezar en 1.
        tiempoActual = (tiempoActual === 4) ? 1 : tiempoActual + 1;
    }

    if (btnMetronomo && bpmInput) {
        btnMetronomo.addEventListener('click', function() {
            initAudio(); 
            
            // --- VALIDACIÓN DE MÍNIMO Y MÁXIMO ---
            let bpm = parseInt(bpmInput.value);
            
            if (isNaN(bpm) || bpm < 30) {
                bpm = 30; // Límite inferior
            }
            if (bpm > 250) {
                bpm = 250; // Límite superior
            }
            
            bpmInput.value = bpm; // Actualiza el número en la pantallita
            // -------------------------------------
            
            const milisegundos = 60000 / bpm; 
            
            if (sonando) {
                // APAGAR
                clearInterval(metronomoIntervalo);
                btnMetronomo.innerHTML = "▶";
                btnMetronomo.classList.remove("active"); 
                sonando = false;
                tiempoActual = 1; // Reseteamos para que la próxima arranque en 1
                if (contenedorBolitas) contenedorBolitas.style.display = 'none'; // Ocultamos bolitas
            } else {
                // PRENDER
                if (contenedorBolitas) contenedorBolitas.style.display = 'flex'; // Mostramos bolitas
                hacerBip(); 
                metronomoIntervalo = setInterval(hacerBip, milisegundos);
                btnMetronomo.innerHTML = "⏸";
                btnMetronomo.classList.add("active"); 
                sonando = true;
            }
        });
}

// ==========================================
// APAGAR METRÓNOMO TOCANDO LAS BOLITAS
// ==========================================
if (contenedorBolitas) {
    // Le ponemos el cursor de "manito" para que se note que es un botón
    contenedorBolitas.style.cursor = 'pointer'; 
    
    contenedorBolitas.addEventListener('click', function() {
        if (sonando) {
            clearInterval(metronomoIntervalo);
            if (btnMetronomo) {
                btnMetronomo.innerHTML = "▶";
                btnMetronomo.classList.remove("active"); 
            }
            sonando = false;
            tiempoActual = 1; 
            contenedorBolitas.style.display = 'none'; 
        }
    });
}

    // =========================================================================
    // LÓGICA DEL AFINADOR POR MICRÓFONO (ALTA SENSIBILIDAD + MEDIDOR DE SEÑAL)
    // =========================================================================
    const cuerdasGuitarra = [
        { idx: 0, nombre: 'MI', detalle: '6ª cuerda (E)', freq: 82.41 },
        { idx: 1, nombre: 'LA', detalle: '5ª cuerda (A)', freq: 110.00 },
        { idx: 2, nombre: 'RE', detalle: '4ª cuerda (D)', freq: 146.83 },
        { idx: 3, nombre: 'SOL', detalle: '3ª cuerda (G)', freq: 196.00 },
        { idx: 4, nombre: 'SI', detalle: '2ª cuerda (B)', freq: 246.94 },
        { idx: 5, nombre: 'mi', detalle: '1ª cuerda (e)', freq: 329.63 }
    ];

    let micStream = null;
    let micAudioCtx = null;
    let micAnimId = null;
    let historialFreq = [];

    const tunerModal = document.getElementById('tuner-modal');
    const tunerOverlay = document.getElementById('tuner-overlay');
    const btnOpenMicTuner = document.getElementById('btn-open-mic-tuner');
    const btnCloseTuner = document.getElementById('tuner-close-btn');

    function actualizarAgujaVisual(cents, cuerda, freqReal) {
        const needle = document.getElementById('tuner-needle');
        const mainNote = document.getElementById('tuner-main-note');
        const subInfo = document.getElementById('tuner-sub-info');
        const statusMsg = document.getElementById('tuner-status-msg');
        const badge = document.getElementById('tuner-badge');

        const limitado = Math.max(-50, Math.min(50, cents));
        const porcentaje = 50 + (limitado * 0.88);
        if (needle) needle.style.left = `calc(${porcentaje}% - 6px)`;

        if (mainNote) {
            mainNote.innerHTML = `${cuerda.nombre} <span style="font-size:16px; font-weight:700; opacity:0.65;">(${cuerda.detalle.split(' ')[0]})</span>`;
        }
        if (subInfo) {
            subInfo.innerText = `${cuerda.detalle} · ${freqReal.toFixed(1)} Hz`;
        }

        // Resaltar la pastillita de la cuerda detectada
        for (let i = 0; i < 6; i++) {
            const tag = document.getElementById('tag-cuerda-' + i);
            if (tag) {
                if (i === cuerda.idx) tag.classList.add('detected');
                else tag.classList.remove('detected');
            }
        }

        if (Math.abs(cents) <= 6) {
            if (needle) needle.style.background = '#10b981';
            if (statusMsg) {
                statusMsg.innerText = '✓ ¡Perfecto! Cuerda afinada';
                statusMsg.style.color = '#10b981';
            }
            if (badge) {
                badge.innerText = '✓ Afinada';
                badge.style.background = '#d1fae5';
                badge.style.color = '#065f46';
            }
        } else if (cents < 0) {
            if (needle) needle.style.background = '#f59e0b';
            if (statusMsg) {
                statusMsg.innerText = '⬆️ Está baja: ajustá (subí) la clavija';
                statusMsg.style.color = '#d97706';
            }
            if (badge) {
                badge.innerText = 'Baja';
                badge.style.background = '#fef3c7';
                badge.style.color = '#92400e';
            }
        } else {
            if (needle) needle.style.background = '#ef4444';
            if (statusMsg) {
                statusMsg.innerText = '⬇️ Está alta: aflojá (bajá) la clavija';
                statusMsg.style.color = '#ef4444';
            }
            if (badge) {
                badge.innerText = 'Alta';
                badge.style.background = '#fee2e2';
                badge.style.color = '#991b1b';
            }
        }
    }

    // Detector de tono NSDF normalizado con interpolación parabólica (alta sensibilidad)
    function detectarFrecuenciaNSDF(buf, sampleRate) {
        const size = buf.length;
        let rms = 0;
        let maxAbs = 0;
        for (let i = 0; i < size; i++) {
            const v = buf[i];
            rms += v * v;
            if (Math.abs(v) > maxAbs) maxAbs = Math.abs(v);
        }
        rms = Math.sqrt(rms / size);

        // Actualizamos la barrita verde de nivel de micrófono para que el usuario vea que entra sonido
        const volBar = document.getElementById('tuner-vol-bar');
        if (volBar) {
            const nivelVisual = Math.min(100, Math.round(rms * 1400));
            volBar.style.width = nivelVisual + '%';
        }

        // Umbral muy sensible para que tome el micrófono aunque esté bajito
        if (rms < 0.0015 || maxAbs === 0) return -1;

        // Normalizamos la onda a [-1, 1] para que funcione igual con micrófonos bajos o altos
        const norm = new Float32Array(size);
        for (let i = 0; i < size; i++) {
            norm[i] = buf[i] / maxAbs;
        }

        // Rango de búsqueda: entre 55 Hz y 900 Hz
        const minLag = Math.floor(sampleRate / 900);
        const maxLag = Math.min(Math.floor(sampleRate / 55), Math.floor(size / 2));

        const nsdf = new Float32Array(maxLag + 1);
        for (let tau = minLag; tau <= maxLag; tau++) {
            let acf = 0;
            let div = 0;
            // Muestreamos cada 2 puntos para máxima velocidad sin perder precisión
            for (let i = 0; i < size - maxLag; i += 2) {
                const a = norm[i];
                const b = norm[i + tau];
                acf += a * b;
                div += a * a + b * b;
            }
            nsdf[tau] = div > 0 ? (2 * acf) / div : 0;
        }

        // Buscamos el primer cruce positivo y el pico principal
        let tau = minLag;
        while (tau <= maxLag && nsdf[tau] > 0) tau++;
        while (tau <= maxLag && nsdf[tau] <= 0) tau++;
        if (tau > maxLag) tau = minLag;

        let mejorTau = -1;
        let maxVal = 0;
        for (let t = tau; t <= maxLag; t++) {
            if (nsdf[t] > maxVal) {
                maxVal = nsdf[t];
                mejorTau = t;
            }
        }

        // Claridad mínima de nota musical
        if (mejorTau <= 0 || maxVal < 0.35) return -1;

        // Buscamos el primer pico fuerte (al menos 85% del máximo) para evitar saltar a la octava
        const umbralPico = maxVal * 0.85;
        for (let t = tau + 1; t < maxLag; t++) {
            if (nsdf[t] >= umbralPico && nsdf[t] > nsdf[t - 1] && nsdf[t] >= nsdf[t + 1]) {
                mejorTau = t;
                break;
            }
        }

        // Interpolación parabólica para precisión fina
        let tauPreciso = mejorTau;
        if (mejorTau > minLag && mejorTau < maxLag) {
            const s0 = nsdf[mejorTau - 1];
            const s1 = nsdf[mejorTau];
            const s2 = nsdf[mejorTau + 1];
            const denom = 2 * s1 - s2 - s0;
            if (denom !== 0) {
                tauPreciso = mejorTau + (s2 - s0) / (2 * denom);
            }
        }

        return sampleRate / tauPreciso;
    }

    async function iniciarMicrofonoAfinador() {
        detenerMicrofonoAfinador();
        historialFreq = [];

        const subInfo = document.getElementById('tuner-sub-info');
        const mainNote = document.getElementById('tuner-main-note');
        const statusMsg = document.getElementById('tuner-status-msg');
        const badge = document.getElementById('tuner-badge');

        try {
            micStream = await navigator.mediaDevices.getUserMedia({
                audio: true
            });

            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            micAudioCtx = new AudioContextClass();
            if (micAudioCtx.state === 'suspended') {
                await micAudioCtx.resume();
            }

            const source = micAudioCtx.createMediaStreamSource(micStream);
            const analyser = micAudioCtx.createAnalyser();
            analyser.fftSize = 4096;
            source.connect(analyser);
            const buffer = new Float32Array(analyser.fftSize);

            if (badge) {
                badge.innerText = '🎙️ Escuchando';
                badge.style.background = '#e0f2fe';
                badge.style.color = '#0369a1';
            }
            if (subInfo) subInfo.innerText = 'Tocá una cuerda de tu guitarra...';
            if (mainNote) mainNote.innerText = '—';
            if (statusMsg) {
                statusMsg.innerText = 'Esperando sonido...';
                statusMsg.style.color = '#2A9D8F';
            }

            function leerTono() {
                if (!micStream || !micAudioCtx) return;
                analyser.getFloatTimeDomainData(buffer);
                const freq = detectarFrecuenciaNSDF(buffer, micAudioCtx.sampleRate);

                if (freq !== -1 && freq >= 55 && freq <= 900) {
                    historialFreq.push(freq);
                    if (historialFreq.length > 4) historialFreq.shift();

                    // Mediana de las últimas lecturas para que la aguja no salte
                    const ordenadas = [...historialFreq].sort((a, b) => a - b);
                    const freqSuave = ordenadas[Math.floor(ordenadas.length / 2)];

                    let masCercana = cuerdasGuitarra[0];
                    let menorDif = Infinity;
                    cuerdasGuitarra.forEach(c => {
                        const dif = Math.abs(1200 * Math.log2(freqSuave / c.freq));
                        if (dif < menorDif) {
                            menorDif = dif;
                            masCercana = c;
                        }
                    });
                    const cents = Math.round(1200 * Math.log2(freqSuave / masCercana.freq));
                    actualizarAgujaVisual(cents, masCercana, freqSuave);
                }
                micAnimId = requestAnimationFrame(leerTono);
            }
            leerTono();
        } catch (err) {
            if (badge) {
                badge.innerText = 'Sin permiso';
                badge.style.background = '#fee2e2';
                badge.style.color = '#991b1b';
            }
            if (subInfo) subInfo.innerText = 'No se pudo acceder al micrófono';
            if (statusMsg) {
                statusMsg.innerText = 'Permití el uso del micrófono arriba en el navegador';
                statusMsg.style.color = '#ef4444';
            }
        }
    }

    function detenerMicrofonoAfinador() {
        if (micAnimId) {
            cancelAnimationFrame(micAnimId);
            micAnimId = null;
        }
        if (micStream) {
            micStream.getTracks().forEach(t => t.stop());
            micStream = null;
        }
        if (micAudioCtx) {
            try { micAudioCtx.close(); } catch (e) {}
            micAudioCtx = null;
        }
        const volBar = document.getElementById('tuner-vol-bar');
        if (volBar) volBar.style.width = '0%';
    }

    if (btnOpenMicTuner) {
        btnOpenMicTuner.addEventListener('click', function() {
            menuContent.classList.remove('activo');
            menuTrigger.innerHTML = '☰';
            tunerOverlay.style.display = 'block';
            tunerModal.style.display = 'block';
            iniciarMicrofonoAfinador();
        });
    }

    function cerrarModalAfinador() {
        detenerMicrofonoAfinador();
        if (tunerOverlay) tunerOverlay.style.display = 'none';
        if (tunerModal) tunerModal.style.display = 'none';
    }

    if (btnCloseTuner) btnCloseTuner.addEventListener('click', cerrarModalAfinador);
    if (tunerOverlay) tunerOverlay.addEventListener('click', cerrarModalAfinador);
});

// =============================================================================
// 4. NAVEGACIÓN ENTRE CANCIONES (CORREGIDO DEFINITIVO Y BLINDADO)
// =============================================================================
document.addEventListener("DOMContentLoaded", function() {
    if (!document.getElementById("letra")) return;

    const pathCompleto = window.location.pathname;
    const archivoActual = decodeURI(pathCompleto.split("/").pop()); 
    const carpetaActual = decodeURI(pathCompleto.split("/").slice(-2, -1)[0]); 
    const carpetaLimpia = carpetaActual.replace(/-/g, " ").toLowerCase();
    const hasBaseTag = document.getElementsByTagName('base').length > 0;

    // 1. LEER LA URL: El Autocorrector nos manda un mensaje secreto por la URL
    const params = new URLSearchParams(window.location.search);
    const seccionFijada = params.get('seccion');
    
    // 2. CURA PARA EL "BUG": Decidir el modo sin quedarse trabado en la memoria vieja
    let esModoAlfabetico = localStorage.getItem('cancionero_orden') === 'alfabetico';
    
    if (seccionFijada) {
        // Si el click vino desde el Índice Alfabético...
        if (seccionFijada.toLowerCase().includes("alfab")) {
            esModoAlfabetico = true;
            localStorage.setItem('cancionero_orden', 'alfabetico'); // Refresca la memoria
        } 
        // Si el click vino desde CUALQUIER otro lado (Un álbum o sección)...
        else {
            esModoAlfabetico = false;
            localStorage.setItem('cancionero_orden', 'seccion'); // Destraba la memoria
        }
    }

    let playlist = [];

    // 3. ARMAR LA LISTA DE CANCIONES SEGÚN EL MODO
    if (esModoAlfabetico) {
        let todasLasCanciones = [];
        for (const [seccion, objCanciones] of Object.entries(window.canciones)) {
            for (const [titulo, datos] of Object.entries(objCanciones)) {
                if (!todasLasCanciones.some(c => c.ruta === datos.ruta)) { 
                    todasLasCanciones.push({ t: titulo, ...datos, sec: seccion }); 
                }
            }
        }
        todasLasCanciones.sort((a, b) => a.t.localeCompare(b.t, undefined, { numeric: true, sensitivity: 'base' }));
        playlist = todasLasCanciones;
    } else {
        for (const [nombreSeccion, cancionesDeSeccion] of Object.entries(window.canciones)) {
            const listaDeSeccion = Object.entries(cancionesDeSeccion).map(([k, v]) => ({ t: k, ...v, sec: nombreSeccion }));
            
            const estaAqui = listaDeSeccion.some(c => c.ruta.split('/').pop() === archivoActual);
            
            if (estaAqui) {
                if (seccionFijada && seccionFijada === nombreSeccion) {
                    playlist = listaDeSeccion;
                    break; // Coincidencia absoluta por la URL, ¡dejamos de buscar!
                }
                // Plan B por si el usuario tipeó el link a mano y no hay "seccionFijada"
                const coincideCarpeta = nombreSeccion.toLowerCase().includes(carpetaLimpia);
                if (coincideCarpeta || playlist.length === 0) { 
                    playlist = listaDeSeccion; 
                }
            }
        }
    }

    if (playlist.length === 0) return;

    let indiceActual = playlist.findIndex(c => c.ruta.split('/').pop() === archivoActual);
    if (indiceActual === -1) return;

    const navDiv = document.createElement("div");
    navDiv.className = "d-flex justify-content-between align-items-center my-3 nav-canciones"; 
    navDiv.style.width = "100%";

    let htmlBotones = "";
    
    // 4. ARMAR LOS LINKS (Arrastrando la memoria de la sección para el siguiente click)
    const getLink = (rutaDestino, seccion) => {
        let link = hasBaseTag ? rutaDestino : "../" + rutaDestino;
        
        if (esModoAlfabetico) {
            link += "?seccion=Índice%20alfabético";
        } else if (seccionFijada) {
            link += `?seccion=${encodeURIComponent(seccionFijada)}`;
        } else if (seccion) {
            link += `?seccion=${encodeURIComponent(seccion)}`;
        }
        return link;
    };

    if (indiceActual > 0) {
        const anterior = playlist[indiceActual - 1];
        htmlBotones += `<a href="${getLink(anterior.ruta, anterior.sec)}" class="btn btn-outline-secondary btn-sm">⬅ ${anterior.t}</a>`;
    } else { htmlBotones += `<div></div>`; }

    if (indiceActual < playlist.length - 1) {
        const siguiente = playlist[indiceActual + 1];
        htmlBotones += `<a href="${getLink(siguiente.ruta, siguiente.sec)}" class="btn btn-outline-secondary btn-sm">${siguiente.t} ➡</a>`;
    } else { htmlBotones += `<div></div>`; }

    navDiv.innerHTML = htmlBotones;
    const titulo = document.querySelector("h1") || document.querySelector(".titulo");
    if (titulo) titulo.parentNode.insertBefore(navDiv, titulo.nextSibling);
    else { const main = document.querySelector("main") || document.body; main.prepend(navDiv); }
});

// ==================================================
// WAKE LOCK, BUSCADOR GLOBAL Y MANIFEST (OFFLINE)
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

    if (!document.querySelector('link[rel="manifest"]')) {
        const link = document.createElement('link');
        link.rel = 'manifest';
        const hasBaseTag = document.getElementsByTagName('base').length > 0;
        const path = window.location.pathname;
        const esRaiz = path.endsWith("index.html") || path.endsWith("/") || path.endsWith("crear-programa.html") || path.endsWith("programa-full.html") || path.endsWith("programa-texto.html") || path.endsWith("programa-acordes.html");
        link.href = hasBaseTag ? "manifest.json" : (esRaiz ? "manifest.json" : "../manifest.json");
        document.head.appendChild(link);
    }
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/cancionerobenja/sw.js')
            .then(registration => {
                // ¡LA MAGIA! Fuerza al celular a revisar en GitHub si publicaste algo nuevo hoy
                registration.update();
                
                // Si encuentra una versión nueva instalándose, recarga la página solo 1 vez para aplicarla
                registration.onupdatefound = () => {
                    const instalando = registration.installing;
                    instalando.onstatechange = () => {
                        if (instalando.state === 'installed' && navigator.serviceWorker.controller) {
                            console.log("¡Nueva versión detectada! Recargando...");
                            window.location.reload();
                        }
                    };
                };
            })
            .catch(err => console.log('Fallo al registrar Offline:', err));
    });
}

// Cargamos automáticamente la base de datos de letras para el buscador
(function cargarBaseLetras() {
    if (window.letrasCanciones) return;
    var s = document.createElement("script");
    var hasBase = document.getElementsByTagName("base").length > 0;
    var path = window.location.pathname;
    var esRaiz = path.endsWith("index.html") || path.endsWith("/") || !path.includes(".html") || /^\/cancionerobenja\/[^\/]+\.html$/.test(path);
    s.src = hasBase ? "scripts/letras-buscador.js" : (esRaiz ? "scripts/letras-buscador.js" : "../scripts/letras-buscador.js");
    s.async = true;
    document.head.appendChild(s);
})();

function obtenerClaveCancion(href) {
    if (!href) return "";
    // Limpiamos ?seccion=... y rutas iniciales para comparar con window.letrasCanciones
    return decodeURI(href.split("?")[0]).replace(/^(\.\.\/)+/, "").replace(/^\/?cancionerobenja\//, "");
}

function construirRegexBusquedaFlexible(filtroLimpio) {
    if (!filtroLimpio || filtroLimpio.length < 2) return null;
    var palabras = filtroLimpio.split(/\s+/).filter(Boolean);
    if (palabras.length === 0) return null;

    var partes = palabras.map(function(pal) {
        var palEscaped = pal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        // Si la palabra tiene 3 o más letras, permitimos espacios o guiones entre cada carácter
        // para identificar palabras separadas con guiones/espacios (ej: Marí---a / Marí a -> maria)
        if (pal.length >= 3) {
            var chars = pal.split("").map(function(c) {
                return c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            });
            return "(?:\\b" + chars.join("[\\s\\-–—]*") + "\\b)";
        } else {
            return "(?:\\b" + palEscaped + "\\b)";
        }
    });

    try {
        return new RegExp(partes.join("[\\s\\-–—]+"), "i");
    } catch (e) {
        return null;
    }
}

function armarExtractoLetra(letraOriginal, filtroLimpio, regexFlexible) {
    if (!letraOriginal) return "";
    var letraLimpia = limpiarTexto(letraOriginal);
    var pos = -1;
    var matchLen = filtroLimpio.length;

    // 1. Buscamos primero coincidencia exacta de la frase
    pos = letraLimpia.indexOf(filtroLimpio);

    // 2. Si hay regex flexible (para palabras con guiones o espacios como Marí---a o Co---mo):
    if (regexFlexible) {
        var m = regexFlexible.exec(letraLimpia);
        if (m) {
            // Si no había coincidencia exacta, o la coincidencia flexible aparece antes:
            if (pos === -1 || m.index < pos) {
                pos = m.index;
                matchLen = m[0].length;
            }
        }
    }

    if (pos === -1) return "";

    // Aproximamos la posición en el texto original para mostrar un fragmento legible
    var inicio = Math.max(0, pos - 18);
    var fin = Math.min(letraOriginal.length, pos + matchLen + 32);
    var recorte = letraOriginal.substring(inicio, fin).trim();
    return (inicio > 0 ? "«…" : "«") + recorte + (fin < letraOriginal.length ? "…»" : "»");
}

function mostrarRecientesBuscador() {
    var input = document.getElementById("inputGlobal");
    var contenedor = document.getElementById("listaGlobal");
    if (!input || !contenedor) return;

    var filtro = limpiarTexto(input.value);
    if (filtro.length > 0) return;

    var recientes = [];
    try {
        recientes = JSON.parse(localStorage.getItem("cancionero_recientes") || "[]");
    } catch (e) { recientes = []; }

    var boxRec = document.getElementById("recientes-buscador-box");
    if (!recientes || recientes.length === 0) {
        if (boxRec) boxRec.style.display = "none";
        contenedor.style.display = "none";
        return;
    }

    // Ocultamos todas las canciones normales de la lista mientras el buscador está vacío
    var enlacesCatalogo = contenedor.querySelectorAll("a.btn");
    for (var i = 0; i < enlacesCatalogo.length; i++) {
        enlacesCatalogo[i].style.display = "none";
    }

    if (!boxRec) {
        boxRec = document.createElement("div");
        boxRec.id = "recientes-buscador-box";
        contenedor.insertBefore(boxRec, contenedor.firstChild);
    }

    var esOscuro = document.body.classList.contains("modo-oscuro");
    var colorTexto = esOscuro ? "#e0e0e0" : "#2C3E50";
    var bgItem = esOscuro ? "rgba(42,157,143,0.14)" : "rgba(42,157,143,0.08)";

    boxRec.style.display = "block";
    boxRec.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:4px 8px 6px; font-size:0.78rem; font-weight:800; color:#2A9D8F; border-bottom:1px solid rgba(42,157,143,0.25); margin-bottom:6px;">
            <span>🕒 Últimas que abriste</span>
            <button type="button" onclick="limpiarRecientesBuscador(event)" style="background:none; border:none; color:#ef4444; font-size:0.75rem; font-weight:700; cursor:pointer; padding:0;">🗑️ Limpiar</button>
        </div>
    ` + recientes.map(function(r) {
        var rutaRel = obtenerClaveCancion(r.u) || r.u;
        return `<a href="${rutaRel}" class="item-reciente-buscador" style="display:block; padding:7px 12px; margin-bottom:4px; border-radius:8px; text-decoration:none; font-weight:600; font-size:0.88rem; color:${colorTexto}; background:${bgItem}; border:1px solid rgba(42,157,143,0.22);">🕒 ${r.t}</a>`;
    }).join("");

    contenedor.style.display = "block";
}

function limpiarRecientesBuscador(ev) {
    if (ev) ev.stopPropagation();
    localStorage.removeItem("cancionero_recientes");
    var boxRec = document.getElementById("recientes-buscador-box");
    var contenedor = document.getElementById("listaGlobal");
    if (boxRec) boxRec.style.display = "none";
    if (contenedor) contenedor.style.display = "none";
}

function filtrarGlobal() {
    var input = document.getElementById("inputGlobal");
    var contenedor = document.getElementById("listaGlobal");
    if(!input || !contenedor) return;

    var enlaces = contenedor.querySelectorAll("a.btn");
    var filtro = limpiarTexto(input.value);
    var boxRec = document.getElementById("recientes-buscador-box");

    if (filtro.length === 0) {
        if (document.activeElement === input) {
            mostrarRecientesBuscador();
        } else {
            if (boxRec) boxRec.style.display = "none";
            contenedor.style.display = "none";
        }
        return;
    } else {
        if (boxRec) boxRec.style.display = "none";
        contenedor.style.display = "block";
    }

    var dbLetras = window.letrasCanciones || {};
    var empiezaTitulo = [];
    var contieneTitulo = [];
    var contieneLetra = [];
    var regexFlexible = construirRegexBusquedaFlexible(filtro);

    for (var i = 0; i < enlaces.length; i++) {
        var el = enlaces[i];
        // Guardamos el título y orden alfabético original la primera vez
        var tituloOriginal = el.getAttribute("data-titulo-orig");
        if (!tituloOriginal) {
            tituloOriginal = (el.textContent || el.innerText).trim();
            el.setAttribute("data-titulo-orig", tituloOriginal);
            el.setAttribute("data-orden-orig", String(i));
        }

        var href = el.getAttribute("href") || "";
        var clave = obtenerClaveCancion(href);
        var letra = el.getAttribute("data-letra") || dbLetras[clave] || "";

        var tituloLimpio = limpiarTexto(tituloOriginal);
        var posTitulo = tituloLimpio.indexOf(filtro);
        var coincideTitulo = posTitulo > -1;
        if (!coincideTitulo && regexFlexible && regexFlexible.test(tituloLimpio)) {
            coincideTitulo = true;
        }

        var coincideLetra = false;
        if (!coincideTitulo && filtro.length >= 2) {
            var letraLimpia = limpiarTexto(letra);
            if (letraLimpia.indexOf(filtro) > -1) {
                coincideLetra = true;
            } else if (regexFlexible && regexFlexible.test(letraLimpia)) {
                coincideLetra = true;
            }
        }

        var ordenOrig = parseInt(el.getAttribute("data-orden-orig") || i, 10);

        if (coincideTitulo) {
            el.innerHTML = tituloOriginal;
            el.style.display = "";
            if (posTitulo === 0) {
                empiezaTitulo.push({ el: el, idx: ordenOrig });
            } else {
                contieneTitulo.push({ el: el, idx: ordenOrig });
            }
        } else if (coincideLetra) {
            var extracto = armarExtractoLetra(letra, filtro, regexFlexible);
            el.innerHTML = `<div>${tituloOriginal}</div>` +
                (extracto ? `<small style="display:block; font-size:0.78em; opacity:0.75; font-weight:normal; font-style:italic; white-space:normal;">${extracto}</small>` : "");
            el.style.display = "";
            contieneLetra.push({ el: el, idx: ordenOrig });
        } else {
            el.innerHTML = tituloOriginal;
            el.style.display = "none";
        }
    }

    // Ordenamos cada grupo alfabéticamente y ponemos primero los títulos y después las letras
    empiezaTitulo.sort(function(a, b) { return a.idx - b.idx; });
    contieneTitulo.sort(function(a, b) { return a.idx - b.idx; });
    contieneLetra.sort(function(a, b) { return a.idx - b.idx; });

    var frag = document.createDocumentFragment();
    empiezaTitulo.forEach(function(item) { frag.appendChild(item.el); });
    contieneTitulo.forEach(function(item) { frag.appendChild(item.el); });
    contieneLetra.forEach(function(item) { frag.appendChild(item.el); });
    contenedor.appendChild(frag);
}

document.addEventListener('click', function(event) {
    var contenedor = document.getElementById('listaGlobal');
    var input = document.getElementById('inputGlobal');
    if (contenedor && input && event.target !== input && !contenedor.contains(event.target)) {
        contenedor.style.display = 'none';
    }
});

window.abrirBuscadorGlobal = function() {
    var $box = $('#box-buscador-desplegable');
    var $input = $('#inputGlobal');
    var $btnAbrir = $('#btn-abrir-buscador');
    if ($box.length === 0) return;

    $box.addClass('activo');
    $btnAbrir.addClass('oculto');
    setTimeout(function() {
        if ($input.length) {
            $input.focus();
            if (typeof window.mostrarRecientesBuscador === 'function' && !$input.val()) {
                window.mostrarRecientesBuscador();
            } else if (typeof mostrarRecientesBuscador === 'function' && !$input.val()) {
                mostrarRecientesBuscador();
            }
        }
    }, 70);
};

window.cerrarBuscadorGlobal = function() {
    var $box = $('#box-buscador-desplegable');
    var $input = $('#inputGlobal');
    var $btnAbrir = $('#btn-abrir-buscador');
    var $lista = $('#listaGlobal');

    if ($input.length) $input.val('');
    if ($lista.length) $lista.hide();
    var boxRec = document.getElementById("recientes-buscador-box");
    if (boxRec) boxRec.style.display = "none";

    $box.removeClass('activo');
    $btnAbrir.removeClass('oculto');
};

$(document).on('click', '#btn-abrir-buscador', function(e) {
    e.stopPropagation();
    window.abrirBuscadorGlobal();
});

$(document).on('click', '#btn-cerrar-buscador', function(e) {
    e.stopPropagation();
    window.cerrarBuscadorGlobal();
});

$(document).on('keydown', function(e) {
    if (e.key === 'Escape' || e.keyCode === 27) {
        window.cerrarBuscadorGlobal();
    }
});

$(document).on('click', function(e) {
    var $box = $('#box-buscador-desplegable');
    if ($box.hasClass('activo') && !$box.is(e.target) && $box.has(e.target).length === 0 && !$(e.target).closest('#btn-abrir-buscador').length) {
        window.cerrarBuscadorGlobal();
    }
});

// =============================================================================
// 5. DICCIONARIO DE ACORDES VISUAL
// =============================================================================
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Inyectamos los estilos del Modo Oscuro para esta ventanita
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            body.modo-oscuro #acorde-modal { background: #222 !important; border: 1px solid #555; }
            body.modo-oscuro #acorde-titulo { color: #90caf9 !important; }
            body.modo-oscuro .mastil-fondo { background: #333 !important; border-color: #777 !important; border-top-color: #777 !important; }
            body.modo-oscuro .mastil-texto { color: #e0e0e0 !important; }
        </style>
    `);

    // 2. Inyectamos la ventanita oculta (Modal) en el HTML
    const modalAcordes = `
        <div id="acorde-overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); z-index:2147483647;"></div>
        <div id="acorde-modal" style="display:none; position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:white; z-index:2147483648; border-radius:12px; padding:20px; box-shadow: 0 5px 25px rgba(0,0,0,0.4); text-align:center; min-width: 220px;">
            <h3 id="acorde-titulo" style="margin-top:0; color:#0A2846; font-weight:bold; font-size:28px;">DO</h3>
            <div id="acorde-dibujo" style="margin: 20px 0;"></div>
            <button class="mini-btn" id="acorde-close" style="width:100%; background:#0A2846; color:white; border:none; padding:12px; border-radius:8px; font-weight:bold; font-size:16px;">Cerrar</button>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalAcordes);

// 3. BASE DE DATOS DE ACORDES
// El formato es: [6ta, 5ta, 4ta, 3ra, 2da, 1ra]
// -1 significa "no tocar" (X) | 0 significa "cuerda al aire" (O) | Los números son el traste
const dbAcordes = {
    // ==========================================
    // MAYORES Y MENORES BÁSICOS
    // ==========================================
    "DO": [-1, 3, 2, 0, 1, 0], "DO#": [-1, 4, 6, 6, 6, 4], "RE": [-1, -1, 0, 2, 3, 2], "RE#": [-1, 6, 8, 8, 8, 6], 
    "MI": [0, 2, 2, 1, 0, 0], "FA": [1, 3, 3, 2, 1, 1], "FA#": [2, 4, 4, 3, 2, 2], "SOL": [3, 2, 0, 0, 0, 3], 
    "SOL#": [4, 6, 6, 5, 4, 4], "LA": [-1, 0, 2, 2, 2, 0], "LA#": [-1, 1, 3, 3, 3, 1], "SIb": [-1, 1, 3, 3, 3, 1], "SI": [-1, 2, 4, 4, 4, 2],

    "DOm": [-1, 3, 5, 5, 4, 3], "DO#m": [-1, 4, 6, 6, 5, 4], "REm": [-1, -1, 0, 2, 3, 1], "RE#m": [-1, 6, 8, 8, 7, 6], 
    "MIm": [0, 2, 2, 0, 0, 0], "FAm": [1, 3, 3, 1, 1, 1], "FA#m": [2, 4, 4, 2, 2, 2], "SOLm": [3, 5, 5, 3, 3, 3], 
    "SOL#m": [4, 6, 6, 4, 4, 4], "LAm": [-1, 0, 2, 2, 1, 0], "LA#m": [-1, 1, 3, 3, 2, 1], "SIbm": [-1, 1, 3, 3, 2, 1], "SIm": [-1, 2, 4, 4, 3, 2],

    // ==========================================
    // SÉPTIMAS (7 y m7)
    // ==========================================
    "DO7": [-1, 3, 2, 3, 1, 0], "DO#7": [-1, 4, 6, 4, 6, 4], "RE7": [-1, -1, 0, 2, 1, 2], "RE#7": [-1, 6, 8, 6, 8, 6], 
    "MI7": [0, 2, 0, 1, 0, 0], "FA7": [1, 3, 1, 2, 1, 1], "FA#7": [2, 4, 2, 3, 2, 2], "SOL7": [3, 2, 0, 0, 0, 1], 
    "SOL#7": [4, 6, 4, 5, 4, 4], "LA7": [-1, 0, 2, 0, 2, 0], "LA#7": [-1, 1, 3, 1, 3, 1], "SI7": [-1, 2, 1, 2, 0, 2],

    "DOm7": [-1, 3, 5, 3, 4, 3], "DO#m7": [-1, 4, 6, 4, 5, 4], "REm7": [-1, -1, 0, 2, 1, 1], "RE#m7": [-1, 6, 8, 6, 7, 6], 
    "MIm7": [0, 2, 0, 0, 0, 0], "FAm7": [1, 3, 1, 1, 1, 1], "FA#m7": [2, 4, 2, 2, 2, 2], "SOLm7": [3, 5, 3, 3, 3, 3], 
    "SOL#m7": [4, 6, 4, 4, 4, 4], "LAm7": [-1, 0, 2, 0, 1, 0], "LA#m7": [-1, 1, 3, 1, 2, 1], "SIm7": [-1, 2, 4, 2, 3, 2],

    // ==========================================
    // SÉPTIMAS MAYORES (maj7 / + / 7+)
    // ==========================================
    "DOmaj7": [-1, 3, 2, 0, 0, 0], "DO7+": [-1, 3, 2, 0, 0, 0],
    "DO#maj7": [-1, 4, 6, 5, 6, 4],
    "REmaj7": [-1, -1, 0, 2, 2, 2], "RE7+": [-1, -1, 0, 2, 2, 2],
    "RE#maj7": [-1, 6, 8, 7, 8, 6],
    "MImaj7": [0, 2, 1, 1, 0, 0],
    "FAmaj7": [-1, -1, 3, 2, 1, 0], "FA7+": [-1, -1, 3, 2, 1, 0],
    "FA#maj7": [2, 4, 3, 3, 2, 2],
    "SOLmaj7": [-1, 2, -1, 0, 3, 2],
    "SOL#maj7": [4, 6, 5, 5, 4, 4],
    "LAmaj7": [-1, 0, 2, 1, 2, 0], "LA7+": [-1, 0, 2, 1, 2, 0],
    "LA#maj7": [-1, 1, 3, 2, 3, 1], "SIbmaj7": [-1, 1, 3, 2, 3, 1],
    "SImaj7": [-1, 2, 4, 3, 4, 2],

    // ==========================================
    // SUSPENDIDOS (sus4 y sus2)
    // ==========================================
    "DOsus4": [-1, 3, 3, 0, 1, 1], "DO#sus4": [-1, 4, 6, 6, 7, 4], "REsus4": [-1, -1, 0, 2, 3, 3], "RE#sus4": [-1, 6, 8, 8, 9, 6],
    "MIsus4": [0, 2, 2, 2, 0, 0], "FAsus4": [1, 3, 3, 3, 1, 1], "FA#sus4": [2, 4, 4, 4, 2, 2], "SOLsus4": [3, 5, 5, 5, 3, 3],
    "SOL#sus4": [4, 6, 6, 6, 4, 4], "LAsus4": [-1, 0, 2, 2, 3, 0], "LA#sus4": [-1, 1, 3, 3, 4, 1], "SIsus4": [-1, 2, 4, 4, 5, 2],

    "DOsus2": [-1, 3, 0, 0, 1, -1], "DO#sus2": [-1, 4, 6, 6, 4, 4], "REsus2": [-1, -1, 0, 2, 3, 0], "RE#sus2": [-1, 6, 8, 8, 6, 6],
    "MIsus2": [0, 2, 4, 4, 0, 0], "FAsus2": [1, 3, 3, 0, 1, 1], "FA#sus2": [2, 4, 4, 1, 2, 2], "SOLsus2": [3, 0, 0, 0, 3, 3],
    "SOL#sus2": [4, 6, 6, 3, 4, 4], "LAsus2": [-1, 0, 2, 2, 0, 0], "LA#sus2": [-1, 1, 3, 3, 1, 1], "SIsus2": [-1, 2, 4, 4, 2, 2],

    "DO7sus4": [-1, 3, 3, 3, 1, -1], "DO#7sus4": [-1, 4, 6, 4, 7, 4], "RE7sus4": [-1, -1, 0, 2, 1, 3], "RE#7sus4": [-1, 6, 8, 6, 9, 6], 
    "MI7sus4": [0, 2, 0, 2, 0, 0], "FA7sus4": [1, 3, 1, 3, 1, 1], "SOL7sus4": [3, 5, 3, 5, 3, 3], "LA7sus4": [-1, 0, 2, 0, 3, 0], 
    "SI7sus4": [-1, 2, 4, 2, 5, 2], "SI9sus4": [-1, 2, 4, 2, 2, 2],

    // ==========================================
    // SEMIDISMINUIDOS (m7b5)
    // ==========================================
    "DOm7b5": [-1, 3, 4, 3, 4, -1], "DO#m7b5": [-1, 4, 5, 4, 5, -1], "REm7b5": [-1, 5, 6, 5, 6, -1], 
    "RE#m7b5": [-1, 6, 7, 6, 7, -1], "MIm7b5": [0, 1, 0, 0, 3, 0], "FAm7b5": [1, -1, 1, 1, 0, -1], 
    "FA#m7b5": [2, -1, 2, 2, 1, -1], "SOLm7b5": [3, -1, 3, 3, 2, -1], "SOL#m7b5": [4, -1, 4, 4, 3, -1], 
    "LAm7b5": [-1, 0, 1, 0, 1, -1], "LA#m7b5": [-1, 1, 2, 1, 2, -1], "SIm7b5": [-1, 2, 3, 2, 3, -1],

    // ==========================================
    // DISMINUIDOS BÁSICOS Y dim7
    // ==========================================
    "DOdim": [-1, 3, 4, 5, 4, -1], "REdim": [-1, -1, 0, 1, 3, 1], "MIdim": [-1, -1, 2, 3, 2, 3], "FAdim": [1, 2, 3, 1, -1, -1], "SIdim": [-1, 2, 3, 4, 3, -1], 
    "DO#dim": [-1, 4, 5, 6, 5, -1], "RE#dim": [-1, -1, 1, 2, 1, 2], "FA#dim": [-1, -1, 4, 5, 4, 5], "SOL#dim": [-1, -1, 6, 7, 6, 7],

    "DOdim7": [-1, 3, 4, 2, 4, -1], "DO#dim7": [-1, 4, 5, 3, 5, -1], "REdim7": [-1, 5, 6, 4, 6, -1], 
    "RE#dim7": [-1, -1, 1, 2, 1, 2], "MIdim7": [-1, -1, 2, 3, 2, 3], "FAdim7": [1, -1, 0, 1, 0, -1], 
    "FA#dim7": [2, -1, 1, 2, 1, -1], "SOLdim7": [3, -1, 2, 3, 2, -1], "SOL#dim7": [4, -1, 3, 4, 3, -1], 
    "LAdim7": [-1, 0, 1, 2, 1, 2], "LA#dim7": [-1, 1, 2, 0, 2, -1], "SIdim7": [-1, 2, 3, 1, 3, -1],

    // ==========================================
    // AÑADIDOS (add9)
    // ==========================================
    "DOadd9": [-1, 3, 2, 0, 3, 0], "DO#add9": [-1, 4, 6, 5, 4, 4], "REadd9": [-1, -1, 0, 2, 3, 0], 
    "RE#add9": [-1, 6, 8, 7, 6, 6], "MIadd9": [0, 2, 2, 1, 0, 2], "FAadd9": [1, -1, 3, 2, 1, 3], 
    "FA#add9": [2, -1, 4, 3, 2, 4], "SOLadd9": [3, 2, 0, 2, 0, 3], "SOL#add9": [4, -1, 6, 5, 4, 6], 
    "LAadd9": [-1, 0, 2, 4, 2, 0], "LA#add9": [-1, 1, 3, 5, 3, 1], "SIadd9": [-1, 2, 4, 6, 4, 2],

    // ==========================================
    // NOVENAS DOMINANTES (9) Y MENORES (m9)
    // ==========================================
    "DO9": [-1, 3, 2, 3, 3, -1], "DO#9": [-1, 4, 3, 4, 4, -1], "RE9": [-1, 5, 4, 5, 5, -1], "RE#9": [-1, 6, 5, 6, 6, -1], 
    "MI9": [0, 2, 0, 1, 0, 2], "FA9": [1, 3, 1, 2, 1, 3], "FA#9": [2, 4, 2, 3, 2, 4], "SOL9": [3, 5, 3, 4, 3, 5], 
    "SOL#9": [4, 6, 4, 5, 4, 6], "LA9": [-1, 0, 2, 4, 2, 0], "LA#9": [-1, 1, 0, 1, 1, -1], "SI9": [-1, 2, 1, 2, 2, -1],

    "DOm9": [-1, 3, 1, 3, 3, -1], "DO#m9": [-1, 4, 2, 4, 4, -1], "REm9": [-1, 5, 3, 5, 5, -1], "RE#m9": [-1, 6, 4, 6, 6, -1], 
    "MIm9": [0, 2, 0, 0, 0, 2], "FAm9": [1, 3, 1, 1, 1, 3], "FA#m9": [2, 4, 2, 2, 2, 4], "SOLm9": [3, 5, 3, 3, 3, 5], 
    "SOL#m9": [4, 6, 4, 4, 4, 6], "LAm9": [-1, 0, 2, 4, 1, 0], "LA#m9": [6, 8, 6, 6, 6, 8], "SIm9": [-1, 2, 0, 2, 2, -1],

    // ==========================================
    // ONCENAS, TRECENAS Y ALTERADOS ESPECIALES
    // ==========================================
    "RE11": [-1, 5, 4, 0, 3, -1], "SI11": [-1, 2, 4, 4, 4, 0],
    "DOm11": [-1, 3, 5, 3, 6, 3], "DO#m11": [-1, 4, 6, 4, 7, 4], "REm11": [-1, 5, 7, 5, 8, 5], "RE#m11": [-1, 6, 8, 6, 9, 6],
    "MIm11": [0, 0, 0, 0, 0, 0], "FAm11": [1, 1, 1, 1, 1, 1], "FA#m11": [-1, 4, 4, 2, 0, 0], "SOLm11": [3, 3, 3, 3, 3, 3],
    "SOL#m11": [4, 4, 4, 4, 4, 4], "LAm11": [-1, 0, 2, 0, 3, 0], "LA#m11": [-1, 1, 3, 1, 4, 1], "SIm11": [-1, 2, 4, 2, 5, 2],

    "FAmaj9": [-1, -1, 3, 0, 1, 0], "LAmaj9": [-1, 0, 2, 1, 0, 0], "SOLmaj9": [3, -1, 4, 2, 3, 0], "REmaj9/FA#": [2, -1, -1, 2, 2, 0], 
    "LA6+": [-1, 0, 4, 4, 0, 0], "MIb6+": [-1, -1, 1, 0, 1, -1], "SIb6(11)": [-1, 1, -1, 0, 3, 0], "MI6(9)": [-1, -1, 1, 0, 1, 1], 
    "DOm6": [-1, 3, -1, 5, 4, 5], "LAm79": [5, 5, 5, 5, 5, 7],
    "FA#7(11)": [2, 4, 4, 3, 0, 0], "FA#m7(11)": [2, -1, 2, 2, 0, 0],

    "DO9(#11)": [-1, 3, 4, 2, 3, 0], "DO#9(#11)": [-1, 4, 3, 4, 4, 3], "RE9(#11)": [-1, 5, 4, 5, 5, 4], 
    "RE#9(#11)": [-1, 6, 5, 6, 6, 5], "MI9(#11)": [-1, 7, 6, 7, 7, 6], "SOL9(#11)": [3, -1, 0, 2, 2, -1],
    "LAmaj7(#11)": [-1, 0, 2, 1, 4, 0],
    
    "DO9+": [-1, 3, 2, 1, 3, -1], "DO#9+": [-1, 4, 3, 2, 4, -1], "RE9+": [-1, 5, 4, 3, 5, -1], 
    "RE#9+": [-1, 6, 5, 4, 6, -1], "MI9+": [0, -1, 0, 1, 1, 2], "SI9+": [-1, 2, 1, 2, 3, -1], 
    "REmajb5": [-1, -1, 0, 1, 2, 2], "SIdim7+": [-1, 2, 3, 3, 3, -1], "SIm11+": [-1, 2, 3, 2, 3, -1],

    // ==========================================
    // SLASH CHORDS (Bajos Invertidos / Distintos)
    // ==========================================
    "DO/MI": [0, 3, 2, 0, 1, 0], "DO/SOL": [3, 3, 2, 0, 1, 0], "DO/RE": [-1, -1, 0, 0, 1, 0],
    "RE/FA#": [2, 0, 0, 2, 3, 2], "RE/LA": [-1, 0, 0, 2, 3, 2], "RE/DO#": [-1, 4, 0, 2, 3, 2],
    "MI/SOL#": [4, -1, 2, 1, 0, 0], "MI/RE#": [-1, -1, 1, 1, 0, 0], "MI/DO#": [-1, 4, 2, 1, 0, 0], "MI/FA#": [2, 2, 2, 1, 0, 0],
    "SOL/SI": [-1, 2, 0, 0, 3, 3], "SOL/RE": [-1, -1, 0, 0, 3, 3],
    "LA/DO#": [-1, 4, 2, 2, 2, 0], "LA/MI": [0, -1, 2, 2, 2, 0], "LA/SOL#": [4, -1, 2, 2, 2, 0],
    "SI/FA#": [2, 2, 4, 4, 4, 2], "SI/DO#": [-1, 4, 4, 4, 4, 2], "SI/MI": [0, 2, 4, 4, 4, 2],
    
    // Bajos en Acordes Compuestos
    "DOmaj7/SOL": [3, 3, 2, 0, 0, 0], "FAmaj13/DO": [-1, 3, 3, 2, 3, 0], "FAmaj7/SOL": [3, -1, 3, 2, 1, 0], 
    "REmaj7/FA#": [2, -1, 0, 2, 2, 0], "SOLmaj7/SI": [-1, 2, -1, 0, 3, 2],
    "LA9/FA#": [2, 0, 2, 2, 0, 0], "LA9+/SI": [-1, 2, 2, 2, 2, 4], "LA9/DO#": [-1, 4, 2, 4, 2, 0],
    "FA9/DO": [-1, 3, 3, 0, 1, 0], "DO9/MI": [-1, -1, 2, 0, 3, 3],

    // Bajos en Menores
    "DOm/SOL": [3, 3, 5, 5, 4, 3], "REm/LA": [-1, 0, 0, 2, 3, 1], "MIm/RE": [-1, -1, 0, 0, 0, 0], 
    "LAm/SOL": [3, 0, 2, 2, 1, 0], "SIm/LA": [-1, 0, 4, 4, 3, 2], "SIm/SOL#": [4, -1, 4, 4, 3, -1],
    "DO#m/SI": [7, 4, 6, 4, 5, 4],
    
    "LAm7/FA": [1, 0, 2, 0, 1, 0], "LAm7/SOL": [3, 0, 2, 0, 1, 0], "LAm9/DO": [-1, 3, 2, 4, 1, 0],
    "SIm11+/LA": [-1, 0, 3, 4, 3, 0],
    // ==========================================
    // ACORDES FALTANTES (Alterados, Dim y Sus4)
    // ==========================================
    "DO4": [-1, 3, 4, 0, 5, -1],
    "FA9(#11)": [1, -1, 1, 2, 0, -1],
    "FA9+": [1, -1, 1, 2, 2, -1],
    "FA#7sus4": [2, 4, 2, 4, 2, 2],
    "FA#9(#11)": [2, -1, 2, 3, 1, -1],
    "FA#9+": [2, -1, 2, 3, 3, -1],
    
    "SOLdim": [3, 4, 5, 3, -1, -1],
    "SOL9+": [3, -1, 3, 4, 4, -1],
    "SOL#7sus4": [4, 6, 4, 6, 4, 4],
    "SOL#9(#11)": [4, -1, 4, 5, 3, -1],
    "SOL#9+": [4, -1, 4, 5, 5, -1],
        
    "LAdim": [-1, 0, 1, 2, 1, -1],
    "LA9(#11)": [5, -1, 5, 6, 4, -1],
    "LA9+": [5, -1, 5, 6, 6, -1],
        
    "LA#7sus4": [-1, 1, 3, 1, 4, 1],
    "LA#dim": [-1, 1, 2, 3, 2, -1],
    "LA#9(#11)": [-1, 1, 2, 1, 1, -1],
    "LA#9+": [-1, 1, 0, 1, 2, -1],
        
    "SIbdim": [-1, 1, 2, 0, 2, 0],
    "SI9(#11)": [-1, 2, 1, 2, 2, 1],
    "FA/LA": [-1, 0, 3, 2, 1, 1],
    "SIm6(9)": [-1, 2, 0, 1, 2, 2],
    "SImMaj7": [-1, 2, 4, 3, 3, 2],

    // ==========================================
    // FAMILIAS COMPLETAS DE ACORDES COMPLEJOS Y TENSIONES
    // ==========================================

    // Menores Sexta (m6)
    "DOm6": [-1, 3, 1, 2, 1, 3], "DO#m6": [-1, 4, 2, 3, 2, 4], "REm6": [-1, 5, 3, 4, 3, 5], 
    "RE#m6": [-1, 6, 4, 5, 4, 6], "MIm6": [0, 2, 2, 0, 2, 0], "FAm6": [1, -1, 0, 1, 1, 1], 
    "FA#m6": [2, -1, 1, 2, 2, 2], "SOLm6": [3, -1, 2, 3, 3, 3], "SOL#m6": [4, -1, 3, 4, 4, 4], 
    "LAm6": [-1, 0, 2, 2, 1, 2], "LA#m6": [-1, 1, 3, 3, 2, 3], "SIm6": [-1, 2, 4, 4, 3, 4],

    // Mayores con Novena (maj9)
    "DOmaj9": [-1, 3, 2, 4, 3, -1], "DO#maj9": [-1, 4, 3, 5, 4, -1], "REmaj9": [-1, 5, 4, 6, 5, -1], 
    "RE#maj9": [-1, 6, 5, 7, 6, -1], "MImaj9": [0, 2, 4, 1, 0, 0], "FAmaj9": [1, 0, 3, 0, 1, 0], 
    "FA#maj9": [2, -1, 3, 1, 2, -1], "SOLmaj9": [3, -1, 4, 2, 3, -1], "SOL#maj9": [4, -1, 5, 3, 4, -1], 
    "LAmaj9": [-1, 0, 2, 1, 0, 0], "LA#maj9": [-1, 1, 3, 2, 1, 1], "SImaj9": [-1, 2, 4, 3, 2, 2],

    // Sexta con Novena Añadida (6/9 o 6(9))
    "DO6(9)": [-1, 3, 2, 2, 3, 3], "DO#6(9)": [-1, 4, 3, 3, 4, 4], "RE6(9)": [-1, 5, 4, 4, 5, 5], 
    "RE#6(9)": [-1, 6, 5, 5, 6, 6], "MI6(9)": [0, 2, 2, 1, 2, 2], "FA6(9)": [1, -1, 0, 0, 1, 1], 
    "FA#6(9)": [2, -1, 1, 1, 2, 2], "SOL6(9)": [3, -1, 2, 2, 3, 3], "SOL#6(9)": [4, -1, 3, 3, 4, 4], 
    "LA6(9)": [-1, 0, 2, 2, 0, 0], "LA#6(9)": [-1, 1, 0, 0, 1, 1], "SI6(9)": [-1, 2, 1, 1, 2, 2],

    // Menores con Séptima Mayor (mMaj7)
    "DOmMaj7": [-1, 3, 1, 0, 0, 3], "DO#mMaj7": [-1, 4, 2, 1, 1, 4], "REmMaj7": [-1, 5, 3, 2, 2, 5], 
    "RE#mMaj7": [-1, 6, 4, 3, 3, 6], "MImMaj7": [0, 2, 1, 0, 0, 0], "FAmMaj7": [1, 3, 2, 1, 1, 1], 
    "FA#mMaj7": [2, 4, 3, 2, 2, 2], "SOLmMaj7": [3, 5, 4, 3, 3, 3], "SOL#mMaj7": [4, 6, 5, 4, 4, 4], 
    "LAmMaj7": [-1, 0, 2, 1, 1, 0], "LA#mMaj7": [-1, 1, 3, 2, 2, 1], "SImMaj7": [-1, 2, 4, 3, 3, 2],

    // Séptima Mayor con Oncena Aumentada (maj7#11)
    "DOmaj7(#11)": [-1, 3, 4, 4, 5, -1], "DO#maj7(#11)": [-1, 4, 5, 5, 6, -1], "REmaj7(#11)": [-1, 5, 6, 6, 7, -1], 
    "RE#maj7(#11)": [-1, 6, 7, 7, 8, -1], "MImaj7(#11)": [0, 3, 2, 1, 0, 0], "FAmaj7(#11)": [1, -1, 2, 2, 0, 0], 
    "FA#maj7(#11)": [2, -1, 3, 3, 1, -1], "SOLmaj7(#11)": [3, -1, 4, 4, 2, -1], "SOL#maj7(#11)": [4, -1, 5, 5, 3, -1], 
    "LAmaj7(#11)": [-1, 0, 2, 1, 4, 0], "LA#maj7(#11)": [-1, 1, 3, 2, 5, -1], "SImaj7(#11)": [-1, 2, 4, 3, 6, -1],

    // Oncenas Dominantes (11)
    "DO11": [8, -1, 8, 7, 6, -1], "DO#11": [9, -1, 9, 8, 7, -1], "RE11": [-1, 5, 4, 0, 3, -1], 
    "RE#11": [-1, 6, 5, 1, 4, -1], "MI11": [0, 0, 2, 1, 0, 0], "FA11": [1, 1, 1, 0, 1, 1], 
    "FA#11": [2, -1, 2, 1, 0, 0], "SOL11": [3, -1, 3, 2, 1, 1], "SOL#11": [4, -1, 4, 3, 2, 2], 
    "LA11": [5, -1, 5, 4, 3, 3], "LA#11": [6, -1, 6, 5, 4, 4], "SI11": [-1, 2, 4, 4, 4, 0],

    // Novena Suspendida (9sus4)
    "DO9sus4": [-1, 3, 3, 3, 3, 3], "DO#9sus4": [-1, 4, 4, 4, 4, 4], "RE9sus4": [-1, 5, 5, 5, 5, 5], 
    "RE#9sus4": [-1, 6, 6, 6, 6, 6], "MI9sus4": [0, 2, 0, 2, 0, 2], "FA9sus4": [1, 1, 1, 3, 1, 3], 
    "FA#9sus4": [2, 2, 2, 4, 2, 4], "SOL9sus4": [3, 3, 3, 5, 3, 5], "SOL#9sus4": [4, 4, 4, 6, 4, 6], 
    "LA9sus4": [-1, 0, 0, 0, 0, 0], "LA#9sus4": [-1, 1, 1, 1, 1, 1], "SI9sus4": [-1, 2, 4, 2, 2, 2]
};

    // 4. Función mágica que dibuja el mástil usando HTML
    function generarDibujoAcorde(posiciones) {
        let trastesUsados = posiciones.filter(p => p > 0);
        let trasteMin = trastesUsados.length ? Math.min(...trastesUsados) : 1;
        let trasteMax = trastesUsados.length ? Math.max(...trastesUsados) : 4;
        let trasteInicio = (trasteMax <= 4) ? 1 : trasteMin; // Si el acorde pasa del traste 4, bajamos por el mástil

        // Fila superior (X y O)
        let html = '<div class="mastil-texto" style="display:flex; justify-content:space-between; width:130px; margin:0 auto 5px; color:#555; font-weight:bold; font-size:16px; padding: 0 4px;">';
        posiciones.forEach(p => { html += `<span>${p === -1 ? 'X' : (p === 0 ? 'O' : '&nbsp;')}</span>`; });
        html += '</div>';

        // El mástil (Rectángulo principal)
        let bordeSuperior = trasteInicio === 1 ? '10px solid #222' : '3px solid #222';
        html += `<div class="mastil-fondo" style="position:relative; width:130px; height:150px; border:3px solid #222; border-top:${bordeSuperior}; margin:0 auto; background:white;">`;

        // Indicador de traste al costado (ej: "4fr")
        if (trasteInicio > 1) {
            html += `<div class="mastil-texto" style="position:absolute; left:-32px; top:15px; font-weight:bold; font-size:16px; color:#333;">${trasteInicio}fr</div>`;
        }

        // Dibuja los 4 trastes (líneas horizontales)
        for(let i=1; i<=4; i++) html += `<div style="position:absolute; top:${i*25}%; left:0; right:0; height:3px; background:#999;"></div>`;
        // Dibuja las 6 cuerdas (líneas verticales)
        for(let i=0; i<6; i++) html += `<div style="position:absolute; left:${i*20}%; top:0; bottom:0; width:2px; background:#aaa; transform:translateX(-1px);"></div>`;

        // Coloca los puntos azules (dedos)
        posiciones.forEach((traste, cuerda) => {
            if(traste > 0) {
                let top = ((traste - trasteInicio) * 25) + 12.5; // Calcula el centro del espacio del traste
                let left = cuerda * 20;
                html += `<div style="position:absolute; top:${top}%; left:${left}%; width:20px; height:20px; background:#0A2846; border-radius:50%; transform:translate(-50%,-50%); box-shadow: 0 2px 4px rgba(0,0,0,0.4);"></div>`;
            }
        });

        html += '</div>';
        return html;
    }

    // Exponer globalmente la base de datos de acordes y el generador de dibujos para el resumen de acordes
    window.dbAcordes = dbAcordes;
    window.generarDibujoAcorde = generarDibujoAcorde;
    if (typeof window.actualizarResumenAcordesActivo === 'function') {
        try { window.actualizarResumenAcordesActivo(); } catch(e) {}
    }

    // 5. El "Escuchador" de clicks (CON VISIÓN PERIFÉRICA PARA BAJOS)
    $(document).on("click", ".c", function() {
        let nombreAcorde = $(this).text().trim(); 
        let nodo = $(this)[0];
        
        let prev = nodo.previousSibling;
        let next = nodo.nextSibling;

        // Si tocaste la primera parte (ej: tocaste LAm en LAm/SOL)
        if (next && next.nodeType === 3 && next.nodeValue.trim() === "/" && next.nextSibling && $(next.nextSibling).hasClass("c")) {
            nombreAcorde = nombreAcorde + "/" + $(next.nextSibling).text().trim();
        }
        // Si tocaste el bajo (ej: tocaste SOL en LAm/SOL)
        else if (prev && prev.nodeType === 3 && prev.nodeValue.trim() === "/" && prev.previousSibling && $(prev.previousSibling).hasClass("c")) {
            nombreAcorde = $(prev.previousSibling).text().trim() + "/" + nombreAcorde;
        }
        
        // Obtenemos el nombre en formato Latino para buscar en la base de datos
        let nombreLatino = window.convertirAcordeAmericanoALatino ? window.convertirAcordeAmericanoALatino(nombreAcorde) : nombreAcorde;

        // 1. Buscamos si el acorde completo (ej: LAm/SOL o Am/G) existe en la base de datos
        if(dbAcordes[nombreLatino]) {
            let tituloModal = (nombreAcorde !== nombreLatino) ? `${nombreAcorde} (${nombreLatino})` : nombreAcorde;
            document.getElementById("acorde-titulo").innerText = tituloModal;
            document.getElementById("acorde-dibujo").innerHTML = generarDibujoAcorde(dbAcordes[nombreLatino]);
            document.getElementById("acorde-overlay").style.display = "block";
            document.getElementById("acorde-modal").style.display = "block";
        } 
        // 2. Si no tenés cargado el bajo, mostramos el acorde base como Plan B
        else {
            let acordeBaseLatino = nombreLatino.split("/")[0];
            if (dbAcordes[acordeBaseLatino]) {
                let acordeBaseOriginal = nombreAcorde.split("/")[0];
                let tituloModal = (acordeBaseOriginal !== acordeBaseLatino) 
                    ? `${acordeBaseOriginal} (${acordeBaseLatino})` 
                    : `${nombreAcorde} (Acorde base)`;
                document.getElementById("acorde-titulo").innerText = tituloModal; 
                document.getElementById("acorde-dibujo").innerHTML = generarDibujoAcorde(dbAcordes[acordeBaseLatino]);
                document.getElementById("acorde-overlay").style.display = "block";
                document.getElementById("acorde-modal").style.display = "block";
            }
        }
    });

    // 6. Cerrar la ventanita
    const cerrarAcorde = () => { 
        document.getElementById("acorde-overlay").style.display="none"; 
        document.getElementById("acorde-modal").style.display="none"; 
    };
    document.getElementById("acorde-close").onclick = cerrarAcorde;
    document.getElementById("acorde-overlay").onclick = cerrarAcorde;
});

document.addEventListener("DOMContentLoaded", function() {
    const btnDescargar = document.getElementById("btn-descargar-todo");
    if (!btnDescargar) return;

    btnDescargar.addEventListener("click", async function() {
        const btn = this;
        const textoOriginal = btn.innerText;
        
        btn.innerText = "⏳ Descargando canciones...";
        btn.disabled = true;

        try {
            const cache = await caches.open('cancionero-cache-v1'); 
            let rutasParaBajar = [];
            
            // Forzamos la raíz de tu proyecto para que no se pierda en GitHub Pages
            const baseRepo = "/cancionerobenja/"; 

            // 1. Recolectamos todas las canciones
            for (const seccion in window.canciones) {
                for (const cancion in window.canciones[seccion]) {
                    const ruta = window.canciones[seccion][cancion].ruta;
                    // Armamos la ruta absoluta perfecta
                    const rutaAbsoluta = ruta.startsWith(baseRepo) ? ruta : baseRepo + ruta;
                    
                    if (!rutasParaBajar.includes(rutaAbsoluta)) {
                        rutasParaBajar.push(rutaAbsoluta);
                    }
                }
            }

            // 2. Agregamos archivos extra manualmente (tu imagen, por ejemplo)
            rutasParaBajar.push(baseRepo + 'comunion/files/hasta-que-el-mundo-arda-por-el-tab.png');
            rutasParaBajar.push(baseRepo + 'comunion/files/mais-longe-tab.png');
            rutasParaBajar.push(baseRepo + 'donaciones.html');
            // Por las dudas aseguramos el CSS y el JS
            rutasParaBajar.push(baseRepo + 'css/cancionero.css');
            rutasParaBajar.push(baseRepo + 'scripts/cancionero.js');
            rutasParaBajar.push(baseRepo + 'scripts/letras-buscador.js');

            let descargadas = 0;
            let fallidas = 0;

            // 3. LA MAGIA: Bajamos UNA POR UNA. Si una falla, no corta el resto.
            await Promise.all(rutasParaBajar.map(async (ruta) => {
                try {
                    const response = await fetch(ruta);
                    if (response.ok) {
                        await cache.put(ruta, response);
                        descargadas++;
                    } else {
                        console.warn("⚠️ Archivo no encontrado (ignorado):", ruta);
                        fallidas++;
                    }
                } catch (err) {
                    console.warn("⚠️ Fallo de red al bajar:", ruta);
                    fallidas++;
                }
            }));

            console.log(`✅ Finalizado: ${descargadas} descargadas. ❌ ${fallidas} no encontradas.`);

            // 4. Mostramos el resultado en el botón
            if (fallidas === 0) {
                btn.innerText = "✅ ¡Todo Guardado!";
            } else {
                btn.innerText = `⚠️ Bajó con ${fallidas} faltantes`;
            }
            
            setTimeout(() => {
                btn.innerText = textoOriginal;
                btn.disabled = false;
            }, 4000);

        } catch (error) {
            console.error("Error crítico al interactuar con el caché:", error);
            btn.innerText = "❌ Error crítico";
            setTimeout(() => {
                btn.innerText = "⬇️ Reintentar";
                btn.disabled = false;
            }, 3000);
        }
    });
});

// =============================================================================
// 6. EASTER EGG: RULETA DE CANCIONES
// =============================================================================
document.addEventListener("DOMContentLoaded", function() {
    
    // Función que hace girar la ruleta
    function tocarCancionRandom(e) {
        if(e) e.preventDefault();
        
        let todosLosTemas = [];
        
        for (const seccion in window.canciones) {
            for (const titulo in window.canciones[seccion]) {
                todosLosTemas.push({ 
                    titulo: titulo, 
                    ruta: window.canciones[seccion][titulo].ruta 
                });
            }
        }
        
        if (todosLosTemas.length > 0) {
            const random = Math.floor(Math.random() * todosLosTemas.length);
            const temaElegido = todosLosTemas[random];
            
            alert("🕊️ El Espíritu Santo sopló esta canción: " + temaElegido.titulo);
            
            const hasBaseTag = document.getElementsByTagName('base').length > 0;
            const path = window.location.pathname;
            const esRaiz = path.endsWith("index.html") || path.endsWith("/") || !path.includes(".html");
            
            window.location.href = hasBaseTag ? temaElegido.ruta : (esRaiz ? temaElegido.ruta : "../" + temaElegido.ruta);
        }
    }

    // --- ESCONDITE 1: TRIPLE CLICK EN LA PORTADA ---
    const tituloPortada = document.querySelector(".portada");
    if (tituloPortada) {
        let contadorClicks = 0;
        let temporizador;

        tituloPortada.addEventListener("click", function(e) {
            contadorClicks++;
            
            // Si es el primer click, arranca el cronómetro (medio segundo para hacer los 3 clicks)
            if (contadorClicks === 1) {
                temporizador = setTimeout(() => { 
                    contadorClicks = 0; // Si tardaste mucho, se resetea
                }, 500); 
            }
            
            // ¡Si metió el triple click a tiempo, premio!
            if (contadorClicks === 3) {
                clearTimeout(temporizador);
                contadorClicks = 0;
                tocarCancionRandom(e);
            }
        });
    }

    // --- ESCONDITE 2: EL DADO INVISIBLE EN EL SÚPER MENÚ ---
    // (Buscamos si creaste el botón con ID "dado-secreto")
    const dadoSecreto = document.getElementById("dado-secreto");
    if (dadoSecreto) {
        dadoSecreto.addEventListener("click", tocarCancionRandom);
    }
});

// ==========================================
// CERRAR SÚPER MENÚ AL HACER CLIC AFUERA
// ==========================================
document.addEventListener('click', function(event) {
    const menuContent = document.getElementById('menu-content');
    const menuTrigger = document.getElementById('menu-trigger');

    // Verificamos que el menú y el botón existan en la página
    if (menuContent && menuTrigger) {
        // Solo actuamos si el menú está actualmente abierto
        if (menuContent.classList.contains('activo')) {
            // Revisamos si el clic fue adentro del menú o en el botón mismo
            const clicEnMenu = menuContent.contains(event.target);
            const clicEnBoton = menuTrigger.contains(event.target);

            // Si el clic fue afuera de ambos, cerramos el menú
            if (!clicEnMenu && !clicEnBoton) {
                menuContent.classList.remove('activo');
                menuTrigger.innerHTML = "☰"; // Restauramos el ícono del botón
            }
        }
    }
});

// Oculta la caja de video ("Pista en ...") en las canciones que todavía
// no tienen un link de video cargado (cuando dice LINK en vez de una dirección).
(function () {
  document.querySelectorAll('iframe[src="LINK"]').forEach(function (video) {
    var caja = video.parentElement;
    if (caja && caja.querySelectorAll('iframe').length === 1) {
      caja.style.display = 'none';
    } else {
      video.style.display = 'none';
    }
  });
})();

// =============================================================================
// 8. BARRA RÁPIDA DE LETRAS (A - Z) EN EL ÍNDICE ALFABÉTICO
// =============================================================================
document.addEventListener("DOMContentLoaded", function () {
  var listaCanciones = document.getElementById("lista-canciones");
  if (!listaCanciones) return;

  var titulos = listaCanciones.querySelectorAll(".titulo h1");
  if (!titulos || titulos.length === 0) return;

  var barra = document.createElement("div");
  barra.id = "barra-abecedario";
  barra.setAttribute("aria-label", "Saltar a la letra");

  titulos.forEach(function (h1) {
    var letra = (h1.textContent || "").trim().toUpperCase();
    if (!letra) return;

    var contenedorTitulo = h1.parentElement || h1;
    var idDestino = "letra-indice-" + letra;
    contenedorTitulo.id = idDestino;
    contenedorTitulo.style.scrollMarginTop = "140px";

    var btnLetra = document.createElement("button");
    btnLetra.type = "button";
    btnLetra.className = "btn-letra-abc";
    btnLetra.textContent = letra;
    btnLetra.addEventListener("click", function () {
      var destino = document.getElementById(idDestino);
      if (destino) {
        destino.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      barra.querySelectorAll(".btn-letra-abc").forEach(function (b) {
        b.classList.remove("activo");
      });
      btnLetra.classList.add("activo");
    });

    barra.appendChild(btnLetra);
  });

  listaCanciones.parentNode.insertBefore(barra, listaCanciones);
});
