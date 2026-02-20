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
        "Gloria 3 (Litúrgico)": { ruta: "gloria/gloria-3.html", tono: "DO", capo: 0 }
    },
    "Salmos": {
        "Salmo 18": { ruta: "salmos/salmo-18.html", tono: "LA", capo: 0 },
        "Salmo 28": { ruta: "salmos/salmo-28.html", tono: "LA", capo: 0 },
        "Salmo 34": { ruta: "salmos/salmo-34.html", tono: "MI", capo: 0 }
    },
    "Aleluya": {
        "Aleluya (busca primero)": { ruta: "aleluya/aleluya-busca-primero.html", tono: "LA", capo: 0 },
        "Aleluya (cada palabra)": { ruta: "aleluya/aleluya-cada-palabra.html", tono: "MI", capo: 0 },
        "Aleluya (cantad alegres)": { ruta: "aleluya/aleluya-cantad-alegres.html", tono: "DO", capo: 0 },
        "Aleluya (común)": { ruta: "aleluya/aleluya-comun.html", tono: "LA", capo: 0 },
        "Aleluya (cuaresma)": { ruta: "aleluya/aleluya-cuaresma.html", tono: "DO", capo: 0 },
        "Aleluya (JLG)": { ruta: "aleluya/aleluya-jlg.html", tono: "SOL", capo: 0 },
        "Aleluya (yo soy el maestro)": { ruta: "aleluya/aleluya-yo-soy-el-maestro.html", tono: "MI", capo: 0 }
    },
    "Ofertorio": {
        "Alimento que da vida": { ruta: "ofertorio/alimento-que-da-vida.html", tono: "RE", capo: 2 },
        "Cinco panes y dos peces": { ruta: "ofertorio/cinco-panes.html", tono: "SOL", capo: 0 },
        "Comenzaste a hacerte pan": { ruta: "ofertorio/comenzaste-a-hacerte-pan.html", tono: "DO", capo: 0 },
        "Esto que soy, esto te doy": { ruta: "ofertorio/esto-que-soy-esto-te-doy.html", tono: "SOL", capo: 0 },
        "Juntos nos acercamos": { ruta: "ofertorio/juntos-nos-acercamos.html", tono: "SOL", capo: 0 },
        "Nuestra fe en tu amor": { ruta: "ofertorio/nuestra-fe-en-tu-amor.html", tono: "LA", capo: 0 },
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
        "Santo 5 (Saaanto)": { ruta: "santo/santo5.html", tono: "LA", capo: 0 }
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
        "Al servicio de aquel": { ruta: "comunion/al-servicio-de-aquel.html", tono: "SOL", capo: 0 },
        "Alma misionera": { ruta: "entrada/alma-misionera.html", tono: "MI", capo: 0 },
        "Alza mi paz": { ruta: "comunion/alza-mi-paz.html", tono: "DO", capo: 0 },
        "Alzar banderas": { ruta: "comunion/alzar-banderas.html", tono: "DO", capo: 0 },
        "Apareces": { ruta: "comunion/apareces.html", tono: "DO", capo: 0 },
        "Camino, verdad y vida": { ruta: "comunion/camino-verdad-y-vida.html", tono: "DO", capo: 0 },
        "Cantaro niño": { ruta: "comunion/cantaro-niño.html", tono: "RE", capo: 0 },
        "Cena de jueves": { ruta: "comunion/cena-de-jueves.html", tono: "FA", capo: 0 },
        "Como antes, más que antes": { ruta: "comunion/como-antes-mas-que-antes.html", tono: "RE", capo: 0 },
        "Como un niño": { ruta: "comunion/como-un-niño.html", tono: "SOL", capo: 0 },
        "Con vos": { ruta: "comunion/con-vos.html", tono: "MI", capo: 0 },
        "De Cirene": { ruta: "comunion/de-cirene.html", tono: "LA", capo: 3 },
        "Dejate": { ruta: "comunion/dejate.html", tono: "DO", capo: 0 },
        "Después de caer": { ruta: "comunion/despues-de-caer.html", tono: "LA", capo: 1 },
        "Ego Paulus": { ruta: "comunion/ego-paulus.html", tono: "SOL", capo: 0 },
        "El que muere por mi": { ruta: "comunion/el-que-muere-por-mi.html", tono: "DO", capo: 2 },
        "El sale a tu encuentro": { ruta: "comunion/el-sale-a-tu-encuentro.html", tono: "MI", capo: 0 },
        "En mi Getsemani": { ruta: "comunion/en-mi-getsemani.html", tono: "DO", capo: 0 },
        "En tus ojos": { ruta: "comunion/en-tus-ojos.html", tono: "SOL", capo: 0 },
        "Enciende nuestra misión": { ruta: "comunion/enciende-nuestra-mision.html", tono: "MI", capo: 0 },
        "Es aquí": { ruta: "comunion/es-aqui.html", tono: "RE", capo: 0 },
        "Estamos aquí": { ruta: "comunion/estamos-aqui.html", tono: "SOL", capo: 0 },
        "Estandarte": { ruta: "comunion/estandarte.html", tono: "RE", capo: 0 },
        "Frente a ti": { ruta: "comunion/frente-a-ti.html", tono: "SOL", capo: 0 },
        "Ha sido largo el viaje": { ruta: "comunion/ha-sido-largo-el-viaje.html", tono: "MI", capo: 0 },
        "Hagase mi paz": { ruta: "comunion/hagase-mi-paz.html", tono: "MI", capo: 0 },
        "Hasta que el mundo arda por El": { ruta: "comunion/hasta-que-el-mundo-arda-por-el.html", tono: "LA", capo: 0 },
        "Hoy vivo": { ruta: "comunion/hoy-vivo.html", tono: "RE", capo: 2 },
        "Jesús y Pedro": { ruta: "comunion/jesus-y-pedro.html", tono: "DO", capo: 1 },
        "Juremos con gloria morir": { ruta: "comunion/juremos-con-gloria-morir.html", tono: "SOL", capo: 0 },
        "La niña de tus ojos": { ruta: "comunion/la-niña-de-tus-ojos.html", tono: "MI", capo: 0 },
        "Labor del apostol": { ruta: "comunion/labor-del-apostol.html", tono: "DO", capo: 0 },
        "María Madre": { ruta: "comunion/maria-madre.html", tono: "MI", capo: 0 },
        "María tierra del Padre": { ruta: "comunion/maria-tierra-del-padre.html", tono: "LA", capo: 0 },
        "María vai": { ruta: "comunion/maria-vai.html", tono: "DO", capo: 0 },
        "Más allá del mar": { ruta: "comunion/mas-alla-del-mar.html", tono: "MI", capo: 0 },
        "No hay amor más grande": { ruta: "comunion/no-hay-amor-mas-grande.html", tono: "DO", capo: 0 },
        "No temas": { ruta: "comunion/no-temas.html", tono: "MI", capo: 2 },
        "Nuestra alianza": { ruta: "comunion/nuestra-alianza.html", tono: "MI", capo: 0 },
        "Para que todos tengan vida": { ruta: "comunion/para-que-todos-tengan-vida.html", tono: "DO", capo: 0 },
        "Pasión que transforma": { ruta: "comunion/pasion-que-transforma.html", tono: "RE", capo: 0 },
        "Pescador de hombres": { ruta: "comunion/pescador-de-hombres.html", tono: "DO", capo: 0 },
        "Quedate Señor": { ruta: "comunion/quedate-señor.html", tono: "DO", capo: 0 },
        "Quiero ser tu amigo Jesucristo": { ruta: "comunion/quiero-ser-tu-amigo-jesucristo.html", tono: "SOL", capo: 0 },
        "Renace la vida y el corazón": { ruta: "comunion/renace-la-vida-y-el-corazon.html", tono: "SOL", capo: 4 },
        "Sal y luz": { ruta: "comunion/sal-y-luz.html", tono: "SI", capo: 0 },
        "Sé en quién he puesto mi confianza": { ruta: "comunion/se-en-quien-he-puesto-mi-confianza.html", tono: "MI", capo: 0 },
        "Sentidos": { ruta: "comunion/sentidos.html", tono: "SOL", capo: 6 },
        "Será Dios": { ruta: "comunion/sera-dios.html", tono: "SOL", capo: 0 },
        "Si quieres te acompaño en el camino": { ruta: "comunion/si-quieres-te-acompaño-en-el-camino.html", tono: "DO", capo: 0 },
        "Siempre para ti": { ruta: "comunion/siempre-para-ti.html", tono: "RE", capo: 0 },
        "Sin fronteras": { ruta: "comunion/sin-fronteras.html", tono: "SOL", capo: 0 },
        "Somos JM, somos iglesia": { ruta: "comunion/somos-jm-somos-iglesia.html", tono: "SOL", capo: 0 },
        "Soñar": { ruta: "comunion/soñar.html", tono: "MI", capo: 0 },
        "Tu amor": { ruta: "comunion/tu-amor.html", tono: "LA", capo: 0 },
        "Una gota de agua": { ruta: "comunion/una-gota-de-agua.html", tono: "SOL", capo: 0 },
        "Ven Jesús de Nazareth": { ruta: "comunion/ven-jesus-de-nazareth.html", tono: "RE", capo: 2 },
        "Ven Pastor": { ruta: "comunion/ven-pastor.html", tono: "RE", capo: 0 },
        "Vengan y coman": { ruta: "comunion/vengan-y-coman.html", tono: "RE", capo: 0 },
        "Vida en abundancia": { ruta: "comunion/vida-en-abundancia.html", tono: "MI", capo: 0 },
        "Yo soy el mar": { ruta: "comunion/yo-soy-el-mar.html", tono: "SOL", capo: 3 }
    },
    "Meditación": {
        "A Él la Gloria": { ruta: "meditacion/a-el-la-gloria.html", tono: "SOL", capo: 2 },
        "Abramos": { ruta: "meditacion/abramos.html", tono: "RE", capo: 1 },
        "Al servicio de aquel": { ruta: "comunion/al-servicio-de-aquel.html", tono: "SOL", capo: 0 },
        "Alábenlo": { ruta: "meditacion/alabenlo.html", tono: "LA", capo: 0 },
        "Algo de paz": { ruta: "meditacion/algo-de-paz.html", tono: "RE", capo: 0 },
        "Alma de Cristo": { ruta: "meditacion/alma-de-cristo.html", tono: "LA", capo: 0 },
        "Alzar banderas": { ruta: "comunion/alzar-banderas.html", tono: "DO", capo: 0 },
        "Amanecer": { ruta: "meditacion/amanecer.html", tono: "FA", capo: 0 },
        "Amigo": { ruta: "meditacion/amigo.html", tono: "RE", capo: 1 },
        "Apareces": { ruta: "comunion/apareces.html", tono: "DO", capo: 0 },
        "Apóstol de Jesucristo": { ruta: "meditacion/apostol-de-jesucristo.html", tono: "LA", capo: 0 },
        "Cae el agua": { ruta: "meditacion/cae-el-agua.html", tono: "MI", capo: 0 },
        "Caminho de eternidade": { ruta: "meditacion/caminho-de-eternidade.html", tono: "RE", capo: 0 },
        "Cantaro niño": { ruta: "comunion/cantaro-niño.html", tono: "RE", capo: 0 },
        "Cara a cara": { ruta: "meditacion/cara-a-cara.html", tono: "LA", capo: 0 },
        "Cayado de amor": { ruta: "meditacion/cayado-de-amor.html", tono: "DO", capo: 0 },
        "Como antes, más que antes": { ruta: "comunion/como-antes-mas-que-antes.html", tono: "RE", capo: 0 },
        "Como un niño": { ruta: "comunion/como-un-niño.html", tono: "SOL", capo: 0 },
        "Con vos": { ruta: "comunion/con-vos.html", tono: "MI", capo: 0 },
        "Conozco tu corazón": { ruta: "meditacion/conozco-tu-corazon.html", tono: "SOL", capo: 0 },
        "Cristo calla": { ruta: "meditacion/cristo-calla.html", tono: "SOL", capo: 0 },
        "Cristo reina": { ruta: "meditacion/cristo-reina.html", tono: "DO", capo: 0 },
        "Cristo Rey": { ruta: "meditacion/cristo-rey.html", tono: "RE", capo: 2 },
        "Dame tus ojos": { ruta: "meditacion/dame-tus-ojos.html", tono: "DO", capo: 0 },
        "De Cirene": { ruta: "comunion/de-cirene.html", tono: "LA", capo: 3 },
        "Déjate": { ruta: "comunion/dejate.html", tono: "DO", capo: 0 },
        "Digno de alabar": { ruta: "meditacion/digno-de-alabar.html", tono: "SOL", capo: 0 },
        "Dime Rey": { ruta: "meditacion/dime-rey.html", tono: "LA", capo: 0 },
        "El diario de María": { ruta: "marianos/el-diario-de-maria.html", tono: "LA", capo: 0 },
        "El mismo huerto": { ruta: "meditacion/el-mismo-huerto.html", tono: "RE", capo: 0 },
        "El que muere por mi": { ruta: "comunion/el-que-muere-por-mi.html", tono: "DO", capo: 2 },
        "El sale a tu encuentro": { ruta: "comunion/el-sale-a-tu-encuentro.html", tono: "MI", capo: 0 },
        "En mi Getsemani": { ruta: "comunion/en-mi-getsemani.html", tono: "DO", capo: 0 },
        "En la palma de su mano": { ruta: "meditacion/en-la-palma-de-su-mano.html", tono: "RE", capo: 1 },
        "En ti": { ruta: "meditacion/en-ti.html", tono: "SOL", capo: 0 },
        "En ti descansar": { ruta: "meditacion/en-ti-descansar.html", tono: "SOL", capo: 0 },
        "En tu misericordia": { ruta: "meditacion/en-tu-misericordia.html", tono: "RE", capo: 0 },
        "En tus ojos": { ruta: "comunion/en-tus-ojos.html", tono: "SOL", capo: 0 },
        "Esa flor siempre de pie": { ruta: "comunion/esa-flor-siempre-de-pie.html", tono: "SOL", capo: 2 },
        "Escúchame Dios": { ruta: "meditacion/escuchame-dios.html", tono: "SOL", capo: 0 },
        "Espíritu Santo": { ruta: "espiritu-santo/espiritu-santo.html", tono: "RE", capo: 0 },
        "Espíritu desciende": { ruta: "espiritu-santo/espiritu-desciende.html", tono: "RE", capo: 0 },
        "Estamos aquí": { ruta: "comunion/estamos-aqui.html", tono: "SOL", capo: 0 },
        "Extiende tu mano": { ruta: "meditacion/extiende-tu-mano.html", tono: "DO", capo: 0 },
        "Extranjeros": { ruta: "meditacion/extranjeros.html", tono: "DO", capo: 0 },
        "Ha sido largo el viaje": { ruta: "comunion/ha-sido-largo-el-viaje.html", tono: "MI", capo: 0 },
        "Hagase mi paz": { ruta: "comunion/hagase-mi-paz.html", tono: "MI", capo: 0 },
        "Hasta que el mundo arda por El": { ruta: "comunion/hasta-que-el-mundo-arda-por-el.html", tono: "LA", capo: 0 },
        "Hijo amado": { ruta: "meditacion/hijo-amado.html", tono: "SI", capo: 0 },
        "Huracán": { ruta: "meditacion/huracan.html", tono: "DO", capo: 0 },
        "Jesús": { ruta: "meditacion/jesus.html", tono: "DO", capo: 0 },
        "Jesús (Berit II)": { ruta: "meditacion/jesus-berit2.html", tono: "DO", capo: 0 },
        "La luz de Jesús": { ruta: "meditacion/la-luz-de-jesus.html", tono: "DO", capo: 0 },
        "La niña de tus ojos": { ruta: "comunion/la-niña-de-tus-ojos.html", tono: "MI", capo: 0 },
        "Labor del apostol": { ruta: "comunion/labor-del-apostol.html", tono: "DO", capo: 0 },
        "Lo que importa es el amor": { ruta: "meditacion/lo-que-importa-es-el-amor.html", tono: "RE", capo: 0 },
        "Magnificat (Portugués)": { ruta: "meditacion/magnificat.html", tono: "DO", capo: 0 },
        "Maranatha": { ruta: "espiritu-santo/maranatha.html", tono: "SOL", capo: 1 },
        "Maravillas hizo en mi": { ruta: "meditacion/maravillas-hizo-en-mi.html", tono: "DO", capo: 0 },
        "María tierra del Padre": { ruta: "comunion/maria-tierra-del-padre.html", tono: "LA", capo: 0 },
        "Me llamaste amigo": { ruta: "meditacion/me-llamaste-amigo.html", tono: "DO", capo: 3 },
        "¿Me quieres?": { ruta: "meditacion/me-quieres.html", tono: "MI", capo: 0 },
        "Mi 110%": { ruta: "meditacion/mi-110.html", tono: "FA", capo: 0 },
        "Mi alma descansa en ti": { ruta: "meditacion/mi-alma-descansa-en-ti.html", tono: "LA", capo: 0 },
        "Mi entrega a ti": { ruta: "meditacion/mi-entrega-a-ti.html", tono: "RE", capo: 0 },
        "Milagro de amor": { ruta: "meditacion/milagro-de-amor.html", tono: "SOL", capo: 2 },
        "Nada te turbe": { ruta: "meditacion/nada-te-turbe.html", tono: "RE", capo: 2 },
        "Nadie te ama como yo": { ruta: "meditacion/nadie-te-ama-como-yo.html", tono: "LA", capo: 0 },
        "No hay amor más grande": { ruta: "comunion/no-hay-amor-mas-grande.html", tono: "DO", capo: 0 },
        "No mueras hermano": { ruta: "meditacion/no-mueras-hermano.html", tono: "SOL", capo: 0 },
        "No os preocupeis": { ruta: "meditacion/no-os-preocupeis.html", tono: "SOL", capo: 0 },
        "No tienen vino": { ruta: "meditacion/no-tienen-vino.html", tono: "DO", capo: 0 },
        "Noche": { ruta: "meditacion/noche.html", tono: "FA", capo: 0 },
        "Oh Padre": { ruta: "ofertorio/oh-padre.html", tono: "DO", capo: 0 },
        "Oración de confianza": { ruta: "meditacion/oracion-de-confianza.html", tono: "DO", capo: 0 },
        "Permanecer en ti": { ruta: "meditacion/permanecer-en-ti.html", tono: "SOL", capo: 0 },
        "Pescador de hombres": { ruta: "comunion/pescador-de-hombres.html", tono: "DO", capo: 0 },
        "Por un solo momento": { ruta: "meditacion/por-un-solo-momento.html", tono: "DO", capo: 0 },
        "Puer et Pater": { ruta: "meditacion/puer-et-pater.html", tono: "RE", capo: 0 },
        "Que se abra el cielo": { ruta: "espiritu-santo/que-se-abra-el-cielo.html", tono: "MI", capo: 0 },
        "Quiero ser Santo": { ruta: "meditacion/quiero-ser-santo.html", tono: "FA", capo: 1 },
        "Quiero ser tu amigo Jesucristo": { ruta: "comunion/quiero-ser-tu-amigo-jesucristo.html", tono: "SOL", capo: 0 },
        "Renace la vida y el corazón": { ruta: "comunion/renace-la-vida-y-el-corazon.html", tono: "SOL", capo: 4 },
        "Sal y luz": { ruta: "comunion/sal-y-luz.html", tono: "SI", capo: 0 },
        "Sáname": { ruta: "meditacion/saname.html", tono: "RE", capo: 0 },
        "Señor de la paz": { ruta: "meditacion/señor-de-la-paz.html", tono: "RE", capo: 0 },
        "Será Dios": { ruta: "comunion/sera-dios.html", tono: "SOL", capo: 0 },
        "Si quieres te acompaño en el camino": { ruta: "comunion/si-quieres-te-acompaño-en-el-camino.html", tono: "DO", capo: 0 },
        "Si rasgaras": { ruta: "meditacion/si-rasgaras.html", tono: "SOL", capo: 4 },
        "Siempre has sido Tú": { ruta: "meditacion/siempre-has-sido-tu.html", tono: "LA", capo: 0 },
        "Siempre para ti": { ruta: "comunion/siempre-para-ti.html", tono: "RE", capo: 0 },
        "Sigueme": { ruta: "meditacion/sigueme.html", tono: "MI", capo: 0 },
        "Silencio fecundo": { ruta: "meditacion/silencio-fecundo.html", tono: "SOL", capo: 0 },
        "Solo por hoy": { ruta: "meditacion/solo-por-hoy.html", tono: "RE", capo: 0 },
        "Sopla": { ruta: "meditacion/sopla.html", tono: "RE", capo: 0 },
        "Stabat": { ruta: "meditacion/stabat.html", tono: "LA", capo: 0 },
        "Subido al sicomoro": { ruta: "meditacion/subido-al-sicomoro.html", tono: "RE", capo: 0 },
        "Supe que me amabas": { ruta: "meditacion/supe-que-me-amabas.html", tono: "LA", capo: 0 },
        "Surge valentía": { ruta: "meditacion/surge-valentia.html", tono: "SOL", capo: 0 },
        "También hoy": { ruta: "meditacion/tambien-hoy.html", tono: "DO", capo: 3 },
        "Te alabo": { ruta: "meditacion/te-alabo.html", tono: "RE", capo: 0 },
        "Te encontré (Mario Gazal)": { ruta: "meditacion/te-encontre.html", tono: "DO", capo: 5 },
        "Tempestad": { ruta: "meditacion/tempestad.html", tono: "SOL", capo: 0 },
        "Torrente de Vida": { ruta: "meditacion/torrente-de-vida.html", tono: "DO", capo: 0 },
        "Transforma mi casa en tu hogar": { ruta: "meditacion/transforma-mi-casa-en-tu-hogar.html", tono: "FA", capo: 0 },
        "Transformación en Pentecostes": { ruta: "meditacion/transformacion-en-pentecostes.html", tono: "MI", capo: 0 },
        "Tu luz (Signos de amor)": { ruta: "meditacion/tu-luz.html", tono: "LA", capo: 2 },
        "Tu modo": { ruta: "meditacion/tu-modo.html", tono: "LA", capo: 0 },
        "Tu voluntad": { ruta: "meditacion/tu-voluntad.html", tono: "LA", capo: 0 },
        "Tu voluntad (Servus Mariae)": { ruta: "meditacion/tu-voluntad-servus.html", tono: "SI", capo: 0 },
        "Una cuerda menos": { ruta: "meditacion/una-cuerda-menos.html", tono: "LA", capo: 0 },
        "Ven Espíritu de amor": { ruta: "espiritu-santo/ven-espiritu-de-amor.html", tono: "RE", capo: 0 },
        "Ven Espíritu Divino": { ruta: "espiritu-santo/ven-espiritu-divino.html", tono: "DO", capo: 0 },
        "Ven y sígueme": { ruta: "meditacion/ven-y-sigueme.html", tono: "LA", capo: 0 },
        "Ven y verás": { ruta: "meditacion/ven-y-veras.html", tono: "DO", capo: 0 },
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
        "Este es mi hogar": { ruta: "salida/este-es-mi-hogar.html", tono: "RE", capo: 0 },
        "Hay un río de vida": { ruta: "salida/hay-un-rio-de-vida.html", tono: "RE", capo: 0 },
        "Ignis Mariae": { ruta: "salida/ignis-mariae.html", tono: "LA", capo: 0 },
        "Junto a tí María": { ruta: "salida/junto-a-ti-maria.html", tono: "RE", capo: 0 },
        "La de siempre": { ruta: "salida/la-de-siempre.html", tono: "SOL", capo: 0 },
        "Mar adentro": { ruta: "salida/mar-adentro.html", tono: "MI", capo: 3 },
        "María de la Alianza": { ruta: "salida/maria-de-la-alianza.html", tono: "LA", capo: 1 },
        "Misioneros": { ruta: "salida/misioneros.html", tono: "LA", capo: 0 },
        "Reina de mi corazón": { ruta: "salida/reina-de-mi-corazon.html", tono: "RE", capo: 0 },
        "Sobre el mar": { ruta: "salida/sobre-el-mar.html", tono: "DO", capo: 0 },
        "Somos jm, somos iglesia": { ruta: "comunion/somos-jm-somos-iglesia.html", tono: "SOL", capo: 0 },
        "Voces de Esperanza": { ruta: "espiritu-santo/voces-de-esperanza.html", tono: "MI", capo: 0 }
    },
    "Marianos": {
        "A tanto amor": { ruta: "marianos/a-tanto-amor.html", tono: "SOL", capo: 0 },
        "Abrazada a ti en tu cruz": { ruta: "marianos/abrazada-a-ti-en-tu-cruz.html", tono: "SOL", capo: 0 },
        "Avanza Reina": { ruta: "salida/avanza-reina.html", tono: "RE", capo: 2 },
        "Ave María": { ruta: "salida/ave-maria.html", tono: "MI", capo: 0 },
        "Dios te salve": { ruta: "salida/dios-te-salve.html", tono: "SOL", capo: 0 },
        "El diario de María": { ruta: "marianos/el-diario-de-maria.html", tono: "LA", capo: 0 },
        "En tus ojos": { ruta: "comunion/en-tus-ojos.html", tono: "SOL", capo: 0 },
        "Hasta que el mundo arda por Él": { ruta: "comunion/hasta-que-el-mundo-arda-por-el.html", tono: "LA", capo: 0 },
        "Junto a ti María": { ruta: "salida/junto-a-ti-maria.html", tono: "RE", capo: 0 },
        "Juremos con gloria morir": { ruta: "comunion/juremos-con-gloria-morir.html", tono: "SOL", capo: 0 },
        "La de siempre": { ruta: "salida/la-de-siempre.html", tono: "SOL", capo: 0 },
        "Magnificat (Portugués)": { ruta: "meditacion/magnificat.html", tono: "DO", capo: 0 },
        "María de la alianza": { ruta: "salida/maria-de-la-alianza.html", tono: "LA", capo: 1 },
        "María está pasando por aquí": { ruta: "marianos/maria-esta-pasando-por-aqui.html", tono: "DO", capo: 0 },
        "María Madre": { ruta: "comunion/maria-madre.html", tono: "MI", capo: 0 },
        "María tierra del Padre": { ruta: "comunion/maria-tierra-del-padre.html", tono: "LA", capo: 0 },
        "María Vai": { ruta: "comunion/maria-vai.html", tono: "DO", capo: 0 },
        "Nuestra Alianza": { ruta: "comunion/nuestra-alianza.html", tono: "MI", capo: 0 },
        "Oración de consagración": { ruta: "marianos/oracion-de-consagracion.html", tono: "SOL", capo: 0 },
        "Para que todos tengan vida": { ruta: "comunion/para-que-todos-tengan-vida.html", tono: "DO", capo: 0 },
        "Reina de mi corazón": { ruta: "salida/reina-de-mi-corazon.html", tono: "RE", capo: 0 },
        "Reina y Madre": { ruta: "marianos/reina-y-madre.html", tono: "SOL", capo: 0 },
        "Se llama María": { ruta: "marianos/se-llama-maria.html", tono: "DO", capo: 0 },
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
    "JM":{
        "Alzar banderas": { ruta: "comunion/alzar-banderas.html", tono: "DO", capo: 0 },
        "Corazón de Fuego": { ruta: "jm/corazon-de-fuego.html", tono: "MI", capo: 0 },
        "Estandarte": { ruta: "comunion/estandarte.html", tono: "RE", capo: 0 },
        "Hasta que el mundo arda por Él": { ruta: "comunion/hasta-que-el-mundo-arda-por-el.html", tono: "LA", capo: 0 },
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
        "Generación fundadora": {ruta:"jf/generacion-fundadora.html", tono: "SOL", capo: 0 },
        "Talita Kum": {ruta:"jf/talita-kum.html", tono: "DO", capo: 0 }
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
    var transposeChord = function (selector, delta, targetKey) { var el = $(selector); if (!el.data("orig-block-len")) { var next = el[0].nextSibling; var spaces = 0; if (next && next.nodeType === 3) { var m = next.nodeValue.match(/^(\s+)/); if (m) spaces = m[1].length; } el.data("orig-block-len", el.text().length + spaces); } var originalBlockLen = el.data("orig-block-len"); var oldChord = el.text(); var oldChordRoot = getChordRoot(oldChord); var newChordRoot = getNewKey(oldChordRoot, delta, targetKey); var newChord = newChordRoot.name + oldChord.substr(oldChordRoot.length); var spacesNeeded = originalBlockLen - newChord.length; if (spacesNeeded < 0) spacesNeeded = 0; el.text(newChord); var next = el[0].nextSibling; if (next && next.nodeType === 3) { next.nodeValue = " ".repeat(spacesNeeded) + next.nodeValue.replace(/^\s+/, ""); } else if (spacesNeeded > 0) { el.after(document.createTextNode(" ".repeat(spacesNeeded))); } };
    var wrapChords = function (input) { return input.replace(opts.chordReplaceRegex, "<span class='c'>$1</span>"); };
    return $(this).each(function() { var startKey = $(this).attr("data-key"); if (!startKey || $.trim(startKey) == "") startKey = opts.key; if (!startKey || $.trim(startKey) == "") return this; currentKey = getKeyByName(startKey); var keyLinks = []; $(keys).each(function(i, key) { if (currentKey.name == key.name) keyLinks.push("<a href='#' class='selected'>" + key.name + "</a>"); else keyLinks.push("<a href='#'>" + key.name + "</a>"); }); var $this = $(this); var keysHtml = $("<div class='transpose-keys justify-content-md-center' style='margin-bottom:10px;'></div>"); keysHtml.html(keyLinks.join("")); $("a", keysHtml).click(function(e) { e.preventDefault(); transposeSong($this, $(this).html()); $(".transpose-keys a").removeClass("selected"); $(this).addClass("selected"); return false; }); $(this).before(keysHtml); var output = []; var lines = $(this).html().split("\n"); var line; for (var i = 0; i < lines.length; i++) { line = lines[i]; if (isChordLine(line)) output.push("<span>" + wrapChords(line) + "</span>"); else output.push("<span>" + line + "</span>"); }; $(this).html(output.join("\n")); });
  };
  $.fn.transpose.defaults = { chordRegex: /^(\bDO|\bRE|\bMI|\bFA|\bSOL|\bLA|\bSI)[b\#]?(2|4|5|6|7|9|11|13|6\/9|7\-5|7\-9|7\#5|7\#9|7\+5|7\+9|7b5|7b9|7sus2|7sus4|add2|add4|add9|aug|°|dim|Ø|dim7|mb5|m7b5|m\/maj7|m6|m7|m7b5|m9|m11|m13|maj7|maj9|maj11|maj13|m|sus|sus2|sus4)*(\/[A-G][b\#]*)*$/, chordReplaceRegex: /((\bDO|\bRE|\bMI|\bFA|\bSOL|\bLA|\bSI)[b\#]?(2|4|5|6|7|9|11|13|6\/9|7\-5|7\-9|7\#5|7\#9|7\+5|7\+9|7b5|7b9|7sus2|7sus4|add2|add4|add9|aug|°|dim|Ø|dim7|mb5|m7b5|m\/maj7|m6|m7|m7b5|m9|m11|m13|maj7|maj9|maj11|maj13|m|sus|sus2|sus4)*)/g };
  
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

        /* --- ADAPTACIÓN AL MODO OSCURO --- */
        body.modo-oscuro .capo-selector-div label {
            color: #e0e0e0;
        }

        body.modo-oscuro { background-color: #121212 !important; color: #e0e0e0 !important; }
        body.modo-oscuro a, body.modo-oscuro a:visited { color: #90caf9 !important; }
        body.modo-oscuro nav a, body.modo-oscuro .navbar a, body.modo-oscuro .nav-link, body.modo-oscuro .navbar-brand, body.modo-oscuro .dropdown-toggle { color: #ffffff !important; }
        body.modo-oscuro .card, body.modo-oscuro .list-group-item, body.modo-oscuro .btn, body.modo-oscuro a.btn, body.modo-oscuro .card a { color: #ffffff !important; }
        body.modo-oscuro .card, body.modo-oscuro .list-group-item { background-color: #1e1e1e !important; border-color: #333 !important; }
        body.modo-oscuro .btn:not(.btn-primary):not(.azul) { background-color: #1e1e1e !important; border-color: #333 !important; }
        body.modo-oscuro .btn-primary, body.modo-oscuro .azul { color: #ffffff !important; }
        body.modo-oscuro input, body.modo-oscuro .form-control { background-color: #222 !important; color: #fff !important; border-color: #444 !important; }
        
        /* Asegurar que el selector de Capo también se ponga oscuro */
        body.modo-oscuro select.capo-dropdown { background-color: #222 !important; color: #90caf9 !important; border-color: #444 !important; }
        
        body.modo-oscuro #listaGlobal, body.modo-oscuro .dropdown-menu, body.modo-oscuro #fav-modal { background-color: #222 !important; border: 1px solid #444 !important; color: #fff !important; }
        body.modo-oscuro #listaGlobal a, body.modo-oscuro .dropdown-item, body.modo-oscuro .fav-item a { border-bottom: 1px solid #333 !important; color: #e0e0e0 !important; }
        body.modo-oscuro #listaGlobal a:hover, body.modo-oscuro .dropdown-item:hover { background-color: #333 !important; color: #fff !important; }
        body.modo-oscuro span.c, body.modo-oscuro .c { color: red !important; font-weight: bold; }
        body.modo-oscuro #menu-content { background: #222; border-color: #444; }
        body.modo-oscuro .menu-label { color: #ccc; }
        body.modo-oscuro .mini-btn { background: #333; border-color: #555; color: #fff; }
        body.modo-oscuro #menu-trigger { background: #fff; color: #000; }
        body.modo-oscuro .transpose-keys a { background-color: #000 !important; color: #fff !important; border: 1px solid #444 !important; }
        body.modo-oscuro .transpose-keys a.selected { background-color: #444 !important; border-color: #fff !important; }
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
// 3. SÚPER MENÚ Y LÓGICA DE HERRAMIENTAS
// =============================================================================
document.addEventListener("DOMContentLoaded", function() {
    
    const esPaginaIndice = window.location.pathname.includes("indice") || window.location.pathname.includes("alfabetico");
    if (esPaginaIndice) localStorage.setItem('cancionero_orden', 'alfabetico');
    const modoGuardado = localStorage.getItem('cancionero_orden') || 'seccion';
    const esModoAlfabetico = modoGuardado === 'alfabetico';

    const menuHTML = `
        <div id="super-menu-container">
            <div id="menu-content">
                <div class="menu-row"><span class="menu-label">Favoritos</span><div style="display:flex; gap:5px;"><button class="mini-btn" id="fav-toggle">🤍</button><button class="mini-btn" id="fav-view">📂</button></div></div>
                <div class="menu-row"><span class="menu-label">Orden</span><div style="display:flex; gap:5px;"><button class="mini-btn ${!esModoAlfabetico?'active':''}" id="mode-sec">Sección</button><button class="mini-btn ${esModoAlfabetico?'active':''}" id="mode-az">A-Z</button></div></div>
                <div class="menu-row"><span class="menu-label">AutoScroll</span><div style="display:flex; gap:5px; align-items:center;"><button class="mini-btn" id="scroll-minus">－</button><span id="scroll-speed-display" style="font-size:14px; width:20px; text-align:center;">3</span><button class="mini-btn" id="scroll-plus">＋</button><button class="mini-btn" id="scroll-play" style="font-weight:bold;">▶</button></div></div>
                <div class="menu-row"><span class="menu-label">Letra</span><div><button class="mini-btn" id="font-minus">A-</button><button class="mini-btn" id="font-plus">A+</button></div></div>
                <div class="menu-row"><span class="menu-label">Tema</span><button class="mini-btn" id="toggle-theme">🌙</button></div>
            </div>
            <button id="menu-trigger">☰</button>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', menuHTML);

    const menuTrigger = document.getElementById("menu-trigger");
    const menuContent = document.getElementById("menu-content");
    menuTrigger.onclick = () => { menuContent.classList.toggle("activo"); menuTrigger.innerHTML = menuContent.classList.contains("activo") ? "✖" : "☰"; };

    // CAMBIO DE MODO
    document.getElementById("mode-sec").onclick = () => { localStorage.setItem('cancionero_orden', 'seccion'); location.reload(); };
    document.getElementById("mode-az").onclick = () => { localStorage.setItem('cancionero_orden', 'alfabetico'); location.reload(); };

    // FAVORITOS
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
    document.getElementById("fav-close").onclick = closeFav; document.getElementById("fav-overlay").onclick = closeFav;

    // AUTOSCROLL, LETRA, TEMA
    let scrollSpeed=3, isScrolling=false, scrollInterval;
    const stopScroll = () => { clearInterval(scrollInterval); isScrolling=false; document.getElementById("scroll-play").innerHTML="▶"; document.getElementById("scroll-play").classList.remove("active"); document.documentElement.style.scrollBehavior="smooth"; };
    const startScroll = () => { clearInterval(scrollInterval); document.documentElement.style.scrollBehavior="auto"; const delay = 220-(scrollSpeed*20); scrollInterval=setInterval(()=>{ if((window.innerHeight+window.pageYOffset)>=document.documentElement.scrollHeight) stopScroll(); else window.scrollTo(0,window.pageYOffset+1); }, delay); document.getElementById("scroll-play").innerHTML="⏸"; document.getElementById("scroll-play").classList.add("active"); isScrolling=true; };
    
    document.getElementById("scroll-play").onclick = () => isScrolling?stopScroll():startScroll();
    document.getElementById("scroll-plus").onclick = () => { if(scrollSpeed<10) { scrollSpeed++; document.getElementById("scroll-speed-display").innerText=scrollSpeed; if(isScrolling) startScroll(); } };
    document.getElementById("scroll-minus").onclick = () => { if(scrollSpeed>1) { scrollSpeed--; document.getElementById("scroll-speed-display").innerText=scrollSpeed; if(isScrolling) startScroll(); } };

    const letraDiv = document.getElementById("letra");
    let fontSize = 100;
    if(letraDiv) { letraDiv.style.fontSize=fontSize+"%"; letraDiv.style.lineHeight="1.5"; }
    const updFont = (v) => { if(!letraDiv) return; fontSize+=v; if(fontSize<60) fontSize=60; if(fontSize>250) fontSize=250; letraDiv.style.fontSize=fontSize+"%"; };
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
});

// =============================================================================
// 4. NAVEGACIÓN ENTRE CANCIONES
// =============================================================================
document.addEventListener("DOMContentLoaded", function() {
    if (!document.getElementById("letra")) return;

    let esModoAlfabetico = localStorage.getItem('cancionero_orden') === 'alfabetico';
    const pathCompleto = window.location.pathname;
    const archivoActual = decodeURI(pathCompleto.split("/").pop()); 
    const carpetaActual = decodeURI(pathCompleto.split("/").slice(-2, -1)[0]); 
    const hasBaseTag = document.getElementsByTagName('base').length > 0;

    let playlist = [];
    let tituloSeccion = "";

    if (esModoAlfabetico) {
        let todasLasCanciones = [];
        for (const [seccion, objCanciones] of Object.entries(window.canciones)) {
            for (const [titulo, datos] of Object.entries(objCanciones)) {
                if (!todasLasCanciones.some(c => c.ruta === datos.ruta)) { todasLasCanciones.push({ t: titulo, ...datos }); }
            }
        }
        todasLasCanciones.sort((a, b) => a.t.localeCompare(b.t));
        playlist = todasLasCanciones;
    } else {
        for (const [nombreSeccion, cancionesDeSeccion] of Object.entries(window.canciones)) {
            const listaDeSeccion = Object.entries(cancionesDeSeccion).map(([k, v]) => ({ t: k, ...v }));
            const estaAqui = listaDeSeccion.some(c => c.ruta.endsWith(archivoActual));
            if (estaAqui) {
                const coincideCarpeta = nombreSeccion.toLowerCase().includes(carpetaActual.toLowerCase());
                if (coincideCarpeta || playlist.length === 0) { playlist = listaDeSeccion; }
            }
        }
    }

    if (playlist.length === 0) return;

    let indiceActual = playlist.findIndex(c => c.ruta.endsWith(archivoActual));
    if (indiceActual === -1) return;

    const navDiv = document.createElement("div");
    navDiv.className = "d-flex justify-content-between align-items-center my-3 nav-canciones"; 
    navDiv.style.width = "100%";

    let htmlBotones = "";
    const getLink = (rutaDestino) => hasBaseTag ? rutaDestino : "../" + rutaDestino;

    if (indiceActual > 0) {
        const anterior = playlist[indiceActual - 1];
        htmlBotones += `<a href="${getLink(anterior.ruta)}" class="btn btn-outline-secondary btn-sm">⬅ ${anterior.t}</a>`;
    } else { htmlBotones += `<div></div>`; }

    if (indiceActual < playlist.length - 1) {
        const siguiente = playlist[indiceActual + 1];
        htmlBotones += `<a href="${getLink(siguiente.ruta)}" class="btn btn-outline-secondary btn-sm">${siguiente.t} ➡</a>`;
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
    var filtro = input.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    if (filtro.length === 0) { contenedor.style.display = "none"; return; } 
    else { contenedor.style.display = "block"; }

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