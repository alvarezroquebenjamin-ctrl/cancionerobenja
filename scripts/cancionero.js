function limpiarTexto(texto) {
    if (!texto) return ""; // Por si llega algún texto vacío
    return texto
        .toLowerCase() // 1. Pasa todo a minúsculas
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // 2. Saca los acentos
        .replace(/[,.-]/g, "") // 3. Saca comas, puntos y guiones
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
        "Santo 4 (Nuevo)": { ruta: "santo/santo4.html", tono: "RE", capo: 0 },
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
        "Mais Longe": { ruta: "comunion/mais-longe.html", tono: "SOL", capo: 0 },
        "Mais Longe (Español": { ruta: "comunion/mais-longe-español.html", tono: "SOL", capo: 0 },
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
        "Sal y luz": { ruta: "comunion/sal-y-luz.html", tono: "SI", capo: 0 },
        "Salmo 28": { ruta: "salmos/salmo-28.html", tono: "LA", capo: 0 },
        "Sé en quién he puesto mi confianza": { ruta: "comunion/se-en-quien-he-puesto-mi-confianza.html", tono: "MI", capo: 0 },
        "Sentidos": { ruta: "comunion/sentidos.html", tono: "SOL", capo: 6 },
        "Será Dios": { ruta: "comunion/sera-dios.html", tono: "SOL", capo: 0 },
        "Si quieres te acompaño en el camino": { ruta: "comunion/si-quieres-te-acompaño-en-el-camino.html", tono: "DO", capo: 0 },
        "Siempre para ti": { ruta: "comunion/siempre-para-ti.html", tono: "RE", capo: 0 },
        "Silencio en el calvario": { ruta: "comunion/silencio-en-el-calvario.html", tono: "DO", capo: 1 },
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
        "Mais Longe (Español": { ruta: "comunion/mais-longe-español.html", tono: "SOL", capo: 0 },
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
        "Sal y luz": { ruta: "comunion/sal-y-luz.html", tono: "SI", capo: 0 },
        "Sáname": { ruta: "meditacion/saname.html", tono: "RE", capo: 0 },
        "Señor de la paz": { ruta: "meditacion/señor-de-la-paz.html", tono: "RE", capo: 0 },
        "Será Dios": { ruta: "comunion/sera-dios.html", tono: "SOL", capo: 0 },
        "Si quieres te acompaño en el camino": { ruta: "comunion/si-quieres-te-acompaño-en-el-camino.html", tono: "DO", capo: 0 },
        "Si rasgaras": { ruta: "meditacion/si-rasgaras.html", tono: "SOL", capo: 4 },
        "Siempre has sido Tú": { ruta: "meditacion/siempre-has-sido-tu.html", tono: "LA", capo: 0 },
        "Siempre para ti": { ruta: "comunion/siempre-para-ti.html", tono: "RE", capo: 0 },
        "Sigueme": { ruta: "meditacion/sigueme.html", tono: "MI", capo: 0 },
        "Silencio en el calvario": { ruta: "comunion/silencio-en-el-calvario.html", tono: "DO", capo: 1 },
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
        "Silencio en el calvario": { ruta: "comunion/silencio-en-el-calvario.html", tono: "DO", capo: 1 },
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
    }
};

// =============================================================================
// 1. MÓDULO DE TRANSPOSICIÓN (JQUERY) Y CREADOR DE CAPO
// =============================================================================
(function($) {
  var isChordLine = function(line) { return /(\bDO|\bRE|\bMI|\bFA|\bSOL|\bLA|\bSI)[b#]?/.test(line); };
  $.fn.transpose = function(options) {
    var opts = $.extend({}, $.fn.transpose.defaults, options);
    var currentKey = null;
    var keys = [{name:'LAb',value:0,type:'F'},{name:'LA',value:1,type:'N'},{name:'LA#',value:2,type:'S'},{name:'SIb',value:2,type:'F'},{name:'SI',value:3,type:'N'},{name:'DO',value:4,type:'N'},{name:'DO#',value:5,type:'S'},{name:'REb',value:5,type:'F'},{name:'RE',value:6,type:'N'},{name:'RE#',value:7,type:'S'},{name:'MIb',value:7,type:'F'},{name:'MI',value:8,type:'N'},{name:'FA',value:9,type:'N'},{name:'FA#',value:10,type:'S'},{name:'SOLb',value:10,type:'F'},{name:'SOL',value:11,type:'N'},{name:'SOL#',value:0,type:'S'}];
    var getKeyByName = function (name) { if (name.charAt(name.length-1) == "m") name = name.substring(0, name.length-1); for (var i = 0; i < keys.length; i++) { if (name == keys[i].name) return keys[i]; } };
    var getChordRoot = function (input) { var ind = 2; if(input.substring(0,2)=="SO") ind=3; if (input.length > ind && (input.charAt(ind) == "b" || input.charAt(ind) == "#")) return input.substr(0, ind+1); else return input.substr(0, ind); };
    var getNewKey = function (oldKey, delta, targetKey) { var keyValue = getKeyByName(oldKey).value + delta; if (keyValue > 11) keyValue -= 12; else if (keyValue < 0) keyValue += 12; var i=0; if (keyValue == 0 || keyValue == 2 || keyValue == 5 || keyValue == 7 || keyValue == 10) { switch(targetKey.name) { case "LA": case "LA#": case "SI": case "DO": case "DO#": case "RE": case "RE#": case "MI": case "FA#": case "SOL": case "SOL#": for (;i<keys.length;i++) { if (keys[i].value == keyValue && keys[i].type == "S") return keys[i]; } default: for (;i<keys.length;i++) { if (keys[i].value == keyValue && keys[i].type == "F") return keys[i]; } } } else { for (;i<keys.length;i++) { if (keys[i].value == keyValue) return keys[i]; } } };
    var getDelta = function (oldIndex, newIndex) { if (oldIndex > newIndex) return 0 - (oldIndex - newIndex); else if (oldIndex < newIndex) return 0 + (newIndex - oldIndex); else return 0; };
    var transposeSong = function (target, key) { var newKey = getKeyByName(key); if (currentKey.name == newKey.name) return; var delta = getDelta(currentKey.value, newKey.value); $("span.c", target).each(function (i, el) { transposeChord(el, delta, newKey); }); currentKey = newKey; };
    
    var transposeChord = function (selector, delta, targetKey) { 
        var el = $(selector); 
        if (!el.data("orig-block-len")) { 
            var next = el[0].nextSibling; var spaces = 0; 
            if (next && next.nodeType === 3) { 
                var m = next.nodeValue.match(/^(\s+)/); 
                if (m) spaces = m[1].length; 
            } 
            el.data("orig-block-len", el.text().length + spaces); 
        } 
        
        var originalBlockLen = el.data("orig-block-len"); 
        var oldChord = el.text(); 
        var newChord = "";

        // TRANSPOSICIÓN DOBLE PARA BAJOS INVERTIDOS
        if (oldChord.indexOf("/") !== -1) {
            var parts = oldChord.split("/");
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
            var oldChordRoot = getChordRoot(oldChord); 
            var newChordRoot = getNewKey(oldChordRoot, delta, targetKey); 
            newChord = newChordRoot.name + oldChord.substr(oldChordRoot.length); 
        }

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
    
    var wrapChords = function (input) { return input.replace(opts.chordReplaceRegex, "<span class='c'>$1</span>"); };
    
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
            if (isChordLine(line)) output.push("<span>" + wrapChords(line) + "</span>"); 
            else output.push("<span>" + line + "</span>"); 
        }; 
        $(this).html(output.join("\n")); 
    });
  };
  
  $.fn.transpose.defaults = { 
    chordRegex: /^(\bDO|\bRE|\bMI|\bFA|\bSOL|\bLA|\bSI)[b\#]?(2|4|5|6|7|9|11|13|6\/9|6\(9\)|7\-5|7\-9|7\#5|7\#9|7\+5|7\+9|7b5|7b9|7sus2|7sus4|9sus4|add2|add4|add9|aug|°|dim|Ø|dim7|mb5|m7b5|m\/maj7|mMaj7|m6|m7|m9|m11|m13|m79|maj7|maj9|maj11|maj13|majb5|m|sus|sus2|sus4|\([0-9b\#\+\-\/]+\)|\+)*(\/(DO|RE|MI|FA|SOL|LA|SI)[b\#]?)*$/, 
    chordReplaceRegex: /((\bDO|\bRE|\bMI|\bFA|\bSOL|\bLA|\bSI)[b\#]?(2|4|5|6|7|9|11|13|6\/9|6\(9\)|7\-5|7\-9|7\#5|7\#9|7\+5|7\+9|7b5|7b9|7sus2|7sus4|9sus4|add2|add4|add9|aug|°|dim|Ø|dim7|mb5|m7b5|m\/maj7|mMaj7|m6|m7|m9|m11|m13|m79|maj7|maj9|maj11|maj13|majb5|m|sus|sus2|sus4|\([0-9b\#\+\-\/]+\)|\+)*(\/(DO|RE|MI|FA|SOL|LA|SI)[b\#]?)*)/g 
  };
  
  $(function() { 
      var targets = $("#letra, .zona-letra"); 
      if(targets.length > 0) { 
          targets.transpose(); 

          // --- NUEVO: CREAR SELECTOR DE CAPO DEBAJO DE LOS TONOS ---
          targets.each(function() {
              var defaultCapo = $(this).attr("data-capo") || "0";
              var keysDiv = $(this).prev('.transpose-keys');
              
              if (keysDiv.length > 0) {
                  // Opciones del 0 al 12
                  var opciones = "";
                  for(var i = 0; i <= 12; i++) {
                      var texto = i === 0 ? "Sin Capo" : "Traste " + i;
                      var seleccionado = (i.toString() === defaultCapo.toString()) ? "selected" : "";
                      opciones += `<option value="${i}" ${seleccionado}>${texto}</option>`;
                  }

                  var capoHTML = `
                      <div class="capo-selector-div">
                          <label>🎸 Capo: </label>
                          <select class="form-select d-inline-block capo-dropdown">
                              ${opciones}
                          </select>
                      </div>
                  `;
                  keysDiv.after(capoHTML);
              }
          });
      } 
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
            .navbar-collapse, .collapse { display: flex !important; flex-basis: auto !important; align-items: center !important; width: 100% !important; justify-content: space-between !important; }
            .navbar-nav { flex-direction: row !important; gap: 5px; }
            .nav-item, .dropdown, .nav-link, .dropdown-toggle { font-size: 13px !important; padding: 0 5px !important; }
            #inputGlobal, .form-control { width: 110px !important; font-size: 13px !important; height: 30px !important; padding: 2px 5px !important; }
            .container, .container-fluid, .navbar { padding-left: 5px !important; padding-right: 5px !important; }
            .navbar-nav .dropdown-menu { position: absolute !important; float: none !important; top: 100% !important; left: 0 !important; margin-top: 5px !important; background-color: white; box-shadow: 0 5px 15px rgba(0,0,0,0.3); width: auto !important; min-width: 180px; z-index: 10000 !important; }
            .navbar, .navbar-collapse { overflow: visible !important; }
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
        
        body.modo-oscuro #listaGlobal, body.modo-oscuro .dropdown-menu, body.modo-oscuro #fav-modal { background-color: #000000 !important; border: 1px solid #444 !important; color: #fff !important; }
        body.modo-oscuro #listaGlobal a, body.modo-oscuro .dropdown-item, body.modo-oscuro .fav-item a { border-bottom: 1px solid #333 !important; color: #e0e0e0 !important; }
        body.modo-oscuro #listaGlobal a:hover, body.modo-oscuro .dropdown-item:hover { background-color: #333 !important; color: #fff !important; } /* Mantenemos este en gris para que se note al tocar */
        body.modo-oscuro span.c, body.modo-oscuro .c { color: red !important; font-weight: bold; }
        body.modo-oscuro #menu-content { background: #000000; border-color: #444; }
        body.modo-oscuro .menu-label { color: #ccc; }
        body.modo-oscuro .mini-btn { background: #000000; border-color: #555; color: #fff; }
        body.modo-oscuro #menu-trigger { background: #fff; color: #000; }
        body.modo-oscuro .transpose-keys a { background-color: #000000 !important; color: #fff !important; border: 1px solid #444 !important; }
        body.modo-oscuro .transpose-keys a.selected { background-color: #444 !important; border-color: #fff !important; } /* Mantenemos este en gris para saber qué tono elegiste */

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
    `;
    document.head.appendChild(style);

    const modalHTML = `
        <div id="fav-overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:2147483647;"></div>
        <div id="fav-modal" style="display:none; position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); width:90%; max-width:400px; background:white; z-index:2147483648; border-radius:10px; padding:20px; border:1px solid #ccc;">
            <h3 style="margin-top:0;">Mis Favoritos ❤️</h3>
            <div id="fav-list-container"></div>
            <button class="mini-btn" id="fav-close" style="margin-top:15px; width:100%;">Cerrar</button>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
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

            /* Afinador: Teclas circulares */
            .btn-circulo {
                width: 38px; 
                height: 38px; 
                border-radius: 50%; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                background: #F2F2F7; 
                border: none; 
                font-weight: 700; 
                font-size: 14px; 
                color: #1C1C1E;
                padding: 0;
            }
            body.modo-oscuro .btn-circulo { background: #1C1C1E; color: #FFFFFF; }
            .btn-circulo.active { background: #0A2846; color: #fff; }
            body.modo-oscuro .btn-circulo.active { background: #0A84FF; color: #fff; }

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
        </style>

        <div id="metronomo-visual" class="metronomo-circulo"></div>
        <div id="super-menu-container">
            <div id="menu-content">
                
                <div class="menu-row">
                    <span class="menu-label">Favoritos</span>
                    <div style="display:flex; gap:8px;">
                        <button class="btn-suelto" id="fav-toggle">🤍</button>
                        <button class="btn-suelto" id="fav-view">📂</button>
                    </div>
                </div>

                <div class="menu-row">
                    <span class="menu-label">Modo Offline</span>
                        <button class="btn-suelto" id="btn-descargar-todo">⬇️ Bajar Todo</button>
                </div>

                <div class="menu-row">
                    <span class="menu-label">Tempo</span>
                    <div class="pildora">
                        <input type="number" id="bpm-number" class="input-invisible" min="40" max="220" value="120">
                        <div class="separador-pildora"></div>
                        <button class="btn-pildora" id="btn-metronomo" style="padding: 6px 14px;">▶</button>
                    </div>
                </div>

                <div class="menu-row" style="flex-direction: column; align-items: flex-start; border-bottom: 1px solid transparent;">
                    <div style="display: flex; justify-content: space-between; width: 100%; margin-bottom: 12px;">
                        <span class="menu-label">Afinador</span>
                        <button class="btn-suelto" id="btn-stop-tuner" style="padding: 2px 10px; font-size: 12px; display: none; color: #FF453A; background: transparent;">Silenciar</button>
                    </div>
                    <div style="display:flex; width: 100%; justify-content: space-between; gap: 4px;">
                        <button class="btn-circulo btn-cuerda" data-freq="82.41">E</button>
                        <button class="btn-circulo btn-cuerda" data-freq="110.00">A</button>
                        <button class="btn-circulo btn-cuerda" data-freq="146.83">D</button>
                        <button class="btn-circulo btn-cuerda" data-freq="196.00">G</button>
                        <button class="btn-circulo btn-cuerda" data-freq="246.94">B</button>
                        <button class="btn-circulo btn-cuerda" data-freq="329.63">e</button>
                    </div>
                </div>
                
                <div style="width: 100%; height: 1px; background: #f0f0f0; margin-bottom: 0;" class="divisor-tema"></div>

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

                <div class="menu-row">
                    <span class="menu-label">Tema</span>
                    <button class="btn-suelto" id="toggle-theme">🌙</button>
                </div>

            </div>
            <button id="menu-trigger">☰</button>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', menuHTML);

    const menuTrigger = document.getElementById("menu-trigger");
    const menuContent = document.getElementById("menu-content");
    menuTrigger.onclick = () => { menuContent.classList.toggle("activo"); menuTrigger.innerHTML = menuContent.classList.contains("activo") ? "✖" : "☰"; };

    // --- 3. FAVORITOS ---
    let favorites = JSON.parse(localStorage.getItem('cancionero_favoritos')) || [];
    const currentUrl = window.location.pathname;
    const currentTitle = document.title.split("-")[0].trim(); 
    const favToggle = document.getElementById("fav-toggle");
    
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
        favorites = JSON.parse(localStorage.getItem('cancionero_favoritos')) || [];
        listContainer.innerHTML = favorites.length ? favorites.map((f,i) => `<div class="fav-item"><a href="${f.u}">${f.t}</a><span class="fav-delete" onclick="eliminarFav(${i})">🗑️</span></div>`).join('') : "<p>Vacío</p>";
        document.getElementById("fav-modal").style.display = "block";
        document.getElementById("fav-overlay").style.display = "block";
        menuContent.classList.remove("activo"); menuTrigger.innerHTML = "☰";
    };
    window.eliminarFav = (i) => { favorites.splice(i,1); localStorage.setItem('cancionero_favoritos', JSON.stringify(favorites)); document.getElementById("fav-view").click(); checkFav(); };
    const closeFav = () => { document.getElementById("fav-modal").style.display="none"; document.getElementById("fav-overlay").style.display="none"; };
    document.getElementById("fav-close").onclick = closeFav; 
    document.getElementById("fav-overlay").onclick = closeFav;

    // --- 4. AUTOSCROLL, FUENTE Y TEMA ---
    let scrollSpeed=3, isScrolling=false, scrollInterval;
    const stopScroll = () => { clearInterval(scrollInterval); isScrolling=false; document.getElementById("scroll-play").innerHTML="▶"; document.getElementById("scroll-play").classList.remove("active"); document.documentElement.style.scrollBehavior="smooth"; };
    const startScroll = () => { clearInterval(scrollInterval); document.documentElement.style.scrollBehavior="auto"; const delay = 275-(scrollSpeed*20); scrollInterval=setInterval(()=>{ if((window.innerHeight+window.pageYOffset)>=document.documentElement.scrollHeight) stopScroll(); else window.scrollTo(0,window.pageYOffset+1); }, delay); document.getElementById("scroll-play").innerHTML="⏸"; document.getElementById("scroll-play").classList.add("active"); isScrolling=true; };
    
    document.getElementById("scroll-play").onclick = () => isScrolling?stopScroll():startScroll();
    document.getElementById("scroll-plus").onclick = () => { if(scrollSpeed<10) { scrollSpeed++; document.getElementById("scroll-speed-display").innerText=scrollSpeed; if(isScrolling) startScroll(); } };
    document.getElementById("scroll-minus").onclick = () => { if(scrollSpeed>1) { scrollSpeed--; document.getElementById("scroll-speed-display").innerText=scrollSpeed; if(isScrolling) startScroll(); } };

    let fontSize = 100;
    const obtenerLetras = () => document.querySelectorAll("#letra, pre[id^='letra-lista'], .zona-letra");
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
    const applyTheme = (d) => { 
        d ? document.body.classList.add("modo-oscuro") : document.body.classList.remove("modo-oscuro"); 
        document.getElementById("toggle-theme").innerText = d ? "☀️" : "🌙"; 
        localStorage.setItem("cancionero_darkmode", d); 
    };
    applyTheme(isDark);
    document.getElementById("toggle-theme").onclick = () => applyTheme(!document.body.classList.contains("modo-oscuro"));

    const oldBtn = document.getElementById("toggleChordsButton");
    if(oldBtn) oldBtn.onclick = function() { const c = document.querySelectorAll(".c"); if(c.length) { const v = c[0].style.display!=="none"; c.forEach(el=>el.style.display=v?"none":"inline"); }};

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

    // Lógica del Metrónomo
    let metronomoIntervalo = null;
    let sonando = false;
    const visual = document.getElementById('metronomo-visual');
    const btnMetronomo = document.getElementById('btn-metronomo');
    const bpmInput = document.getElementById('bpm-number');

    function hacerBip() {
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.type = "sine"; 
        osc.frequency.value = 800; 
        gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.05);
        if(visual) {
            visual.classList.add('flash');
            setTimeout(() => { visual.classList.remove('flash'); }, 100);
        }
    }

    if (btnMetronomo && bpmInput) {
        btnMetronomo.addEventListener('click', function() {
            initAudio(); 
            const bpm = bpmInput.value;
            const milisegundos = 60000 / bpm; 
            if (sonando) {
                clearInterval(metronomoIntervalo);
                btnMetronomo.innerHTML = "▶";
                btnMetronomo.classList.remove("active"); 
                sonando = false;
                if(visual) visual.classList.remove('flash'); 
            } else {
                hacerBip(); 
                metronomoIntervalo = setInterval(hacerBip, milisegundos);
                btnMetronomo.innerHTML = "⏸";
                btnMetronomo.classList.add("active"); 
                sonando = true;
            }
        });

        bpmInput.addEventListener('input', function() {
            if (this.value >= 40 && this.value <= 220 && sonando) {
                btnMetronomo.click(); btnMetronomo.click(); 
            }
        });
    }

    // Lógica del Afinador
    let afinadorOscilador = null;
    let afinadorGanancia = null;
    const btnStopTuner = document.getElementById('btn-stop-tuner');
    const botonesCuerdas = document.querySelectorAll('.btn-cuerda');

    function detenerAfinador() {
        if (afinadorOscilador && audioCtx) {
            afinadorGanancia.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
            afinadorOscilador.stop(audioCtx.currentTime + 0.1);
            afinadorOscilador = null;
        }
        botonesCuerdas.forEach(b => b.classList.remove('active'));
        if (btnStopTuner) btnStopTuner.style.display = 'none';
    }

    botonesCuerdas.forEach(boton => {
        boton.addEventListener('click', function() {
            initAudio(); 
            
            if (this.classList.contains('active')) {
                detenerAfinador();
                return;
            }
            
            detenerAfinador();
            this.classList.add('active');
            if (btnStopTuner) btnStopTuner.style.display = 'block';

            const frecuencia = parseFloat(this.getAttribute('data-freq'));
            afinadorOscilador = audioCtx.createOscillator();
            afinadorGanancia = audioCtx.createGain();
            
            afinadorOscilador.connect(afinadorGanancia);
            afinadorGanancia.connect(audioCtx.destination);
            afinadorOscilador.type = "triangle"; 
            afinadorOscilador.frequency.value = frecuencia;
            
            afinadorGanancia.gain.setValueAtTime(0, audioCtx.currentTime);
            afinadorGanancia.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.1);
            
            afinadorOscilador.start();
        });
    });

    if (btnStopTuner) {
        btnStopTuner.addEventListener('click', detenerAfinador);
    }
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
        navigator.serviceWorker.register('/cancionerobenja/service-worker.js')
            .catch(err => console.log('Fallo al registrar Offline:', err));
    });
}

function filtrarGlobal() {
    var input = document.getElementById("inputGlobal");
    var contenedor = document.getElementById("listaGlobal");
    if(!input || !contenedor) return;

    var enlaces = contenedor.getElementsByTagName("a");
    
    // ACÁ APLICAMOS LA MAGIA AL TEXTO QUE ESCRIBE EL USUARIO
    var filtro = limpiarTexto(input.value);

    if (filtro.length === 0) { contenedor.style.display = "none"; return; } 
    else { contenedor.style.display = "block"; }

    for (var i = 0; i < enlaces.length; i++) {
        var texto = enlaces[i].textContent || enlaces[i].innerText;
        var letra = enlaces[i].getAttribute("data-letra") || ""; 
        var textoCompleto = texto + " " + letra;
        
        // ACÁ APLICAMOS LA MAGIA AL NOMBRE DE LA CANCIÓN Y COMPARAMOS
        if (limpiarTexto(textoCompleto).indexOf(filtro) > -1) {
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

    "FAmaj9": [-1, -1, 3, 0, 1, 0], "LAmaj9": [-1, 0, 2, 1, 0, 0], "SOLmaj9": [3, -1, 4, 2, 3, 0], 
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
        
        // 1. Buscamos si el acorde completo (ej: LAm/SOL) existe en la base de datos
        if(dbAcordes[nombreAcorde]) {
            document.getElementById("acorde-titulo").innerText = nombreAcorde;
            document.getElementById("acorde-dibujo").innerHTML = generarDibujoAcorde(dbAcordes[nombreAcorde]);
            document.getElementById("acorde-overlay").style.display = "block";
            document.getElementById("acorde-modal").style.display = "block";
        } 
        // 2. Si no tenés cargado el bajo, mostramos el acorde base como Plan B
        else {
            let acordeBase = nombreAcorde.split("/")[0];
            if (dbAcordes[acordeBase]) {
                document.getElementById("acorde-titulo").innerText = nombreAcorde + " (Acorde base)"; 
                document.getElementById("acorde-dibujo").innerHTML = generarDibujoAcorde(dbAcordes[acordeBase]);
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
        
        btn.innerText = "⏳ Bajando...";
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
            // Por las dudas aseguramos el CSS y el JS
            rutasParaBajar.push(baseRepo + 'css/cancionero.css');
            rutasParaBajar.push(baseRepo + 'scripts/cancionero.js'); 

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
                btn.innerText = "⬇️ Bajar Todo";
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