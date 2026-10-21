if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

const menu = document.getElementById("menu");
const explorarBTN = document.getElementById("explorarBTN");
const volverBTN = document.getElementById("volverBTN");
const acuario = document.getElementById("acuario");
const regla = document.getElementById("regla");

const ficha = document.getElementById("fichaTiburon");
const cerrarFichaBTN = document.getElementById("cerrarFichaBTN");

const fichaNombre = document.getElementById("fichaNombre");
const fichaProfundidad = document.getElementById("fichaProfundidad");
const fichaDescripcion = document.getElementById("fichaDescripcion");
const fichaHabitat = document.getElementById("fichaHabitat");
const fichaAlimentacion = document.getElementById("fichaAlimentacion");

const fichaOrden = document.getElementById("fichaOrden");
const fichaFamilia = document.getElementById("fichaFamilia");
const fichaCaracteristicas = document.getElementById("fichaCaracteristicas");
const fichaConservacion = document.getElementById("fichaConservacion");
const fichaConservacionNota = document.getElementById("fichaConservacionNota");

const profundidadMaxima = 2200;
const pixelesPorMetro = 5;
const espacioSuperior = 120;

const alturaZonaProfunda = profundidadMaxima * pixelesPorMetro;
const alturaAcuario = espacioSuperior + alturaZonaProfunda;

let tiburonSeleccionado = null;
let imagenAmpliada = null;

explorarBTN.addEventListener("click", () => {
  menu.style.transform = "translateX(-100%)";

  volverBTN.style.opacity = "1";
  volverBTN.style.transform = "translateX(0)";
  volverBTN.style.pointerEvents = "auto";

  regla.style.opacity = "1";
});

volverBTN.addEventListener("click", () => {
  cerrarFicha();

  menu.style.transform = "translateX(0)";

  volverBTN.style.opacity = "0";
  volverBTN.style.transform = "translateX(500px)";
  volverBTN.style.pointerEvents = "none";

  regla.style.opacity = "0";

  window.scrollTo({
    top: 0,
    behavior: "auto"
  });
});

const informacionTiburones = {
  tiburonleopardo: {
    nombre: "Tiburón leopardo",
    descripcion: "Su nombre se debe a sus manchas tan peculiares. Este tiburón vive en aguas poco profundas de bahias y estuarios, suele pasear cerquita del fondo y puede reunirse con otros de su especie cerca de los bosques de algas..",
    habitat: "Aguas costeras templadas, fondos arenosos y zonas rocosas. La especie conocida como tiburón leopardo vive en el Pacífico oriental.",
    alimentacion: "Cangrejos, almejas, peces pequeños y otros animalitos del fondo.",
    orden: "Carcharhiniformes",
    familia: "Triakidae",
    caracteristicas: "Cuerpo robusto, hocico corto y manchas oscuras que forman dibujos sobre el dorso y los costados.",
    conservacion: "Preocupación Menor (LC)",
    nota: "Referencia para Triakis semifasciata."
  },

  tiburonangel: {
    nombre: "Tiburón ángel",
    descripcion: "Parece una rayita, ¡pero es un tiburón disfrazado! Se aplasta contra el fondo y espera pacientemente a que alguna presa distraída pase demasiado cerca.",
    habitat: "Fondos arenosos o fangosos, desde zonas costeras hasta aguas más profundas, según la especie.",
    alimentacion: "Peces, crustáceos y otros animales que pasan cerca de su escondite.",
    orden: "Squatiniformes",
    familia: "Squatinidae",
    caracteristicas: "Cuerpo muy aplanado, aletas pectorales anchas y ojos situados en la parte superior de la cabeza.",
    conservacion: "Depende de la especie",
    nota: "Referencia para Squatina squatina."
  },

  tiburonlimon: {
    nombre: "Tiburón limón",
    descripcion: "Ese tono amarillo tan peculiar se debe a dos factores: el camuflaje y el efecto de la luz solar sobre su piel a ciertas profundidades. Este tiburón es robusto, curioso y suele frecuentar aguas poco profundas.",
    habitat: "Bahías, manglares y aguas cálidas costeras del Atlántico occidental y regiones cercanas.",
    alimentacion: "Principalmente peces; también crustáceos y otros animales marinos.",
    orden: "Carcharhiniformes",
    familia: "Carcharhinidae",
    caracteristicas: "Cuerpo robusto, hocico corto y coloración amarillenta o marrón clara.",
    conservacion: "Vulnerable (VU)",
    nota: "Referencia para Negaprion brevirostris. Consultá la evaluación vigente si necesitás una categoría oficial para un trabajo académico."
  },

  tiburontoro: {
    nombre: "Tiburón toro",
    descripcion: "Este grandote es todoterreno, ya que el tiburón toro tolera el agua dulce y puede adentrarse en ríos. ¡Todo un explorador!.",
    habitat: "Costas tropicales y subtropicales, estuarios y algunos ríos.",
    alimentacion: "Peces, rayas, crustáceos y otros animales acuáticos.",
    orden: "Carcharhiniformes",
    familia: "Carcharhinidae",
    caracteristicas: "Cuerpo ancho y musculoso, hocico corto y aspecto compacto.",
    conservacion: "Vulnerable (VU)",
    nota: "Referencia para Carcharhinus leucas. No debe confundirse con el tiburón toro de arena, que es otra especie."
  },

  tiburongatopardo: {
    nombre: "Tiburón gatopardo",
    descripcion: "Mientras crece, pasa de alimentarse de peces pequeños (a quienes come de un bocado) a cazar mamíferos enormes (a quienes come de a pedazos). ¡Un gran cazador! No representa una amenaza real hacia el ser humano a menos que se sienta amenazado o atacado.",
    habitat: "Aguas costeras, templadas y subtropicales. ¡Puede encontrarse en todo el mundo, incluyendo Argentina!",
    alimentacion: "Peces y mamíferos de diversos tamaños.",
    orden: "Hexanchiformes",
    familia: "Hexanchidae",
    caracteristicas: "Está cubierto por numerosas manchas pequeñas negras y blancas salpicadas por todo el cuerpo. Hocico amplio, corto y redondeado. ojos pequeños.",
    conservacion: "Vulnerable (VU)",
    nota: "«Referencia para Notorynchus cepedianus. Las evaluaciones pueden actualizarse."
  },

  tiburontigre: {
    nombre: "Tiburón tigre",
    descripcion: "Se pasea por las aguas tropicales luciendo su característico estampado a rayas. Es un gran cazador que prueba un menú muy variado en el océano.",
    habitat: "Mares tropicales y templados cálidos, alrededor de islas y plataformas continentales.",
    alimentacion: "Peces, tortugas, aves marinas, crustáceos y otros animales marinos.",
    orden: "Carcharhiniformes",
    familia: "Carcharhinidae",
    caracteristicas: "Cuerpo grande y robusto, cabeza ancha y rayas oscuras verticales, especialmente visibles en los ejemplares jóvenes.",
    conservacion: "Casi Amenazado (NT)",
    nota: "Categoría de referencia para Galeocerdo cuvier. Las evaluaciones pueden actualizarse."
  },

  tiburonmartillo: {
    nombre: "Tiburón martillo",
    descripcion: "A pesar de lucir méramente estética, la forma de su cráneo tiene beneficios enormes, como vista de 360 grados, percibir presas ocultas bajo la arena, olfato preciso y estabilidad.",
    habitat: "Aguas tropicales y templadas cálidas, desde costas hasta zonas de mar abierto.",
    alimentacion: "Peces, calamares, crustáceos y, en algunas especies, rayas.",
    orden: "Carcharhiniformes",
    familia: "Sphyrnidae",
    caracteristicas: "Cabeza extendida lateralmente, con los ojos y otros órganos sensoriales separados a ambos lados.",
    conservacion: "Crítico (CR)",
    nota: "Referencia para Sphyrna lewini"
  },

  tiburonsierra: {
    nombre: "Tiburón sierra",
    descripcion: "Parece una motosierra que nada. Este hocico dentado le sirve para detectar y capturar presas. Ojo: no es lo mismo que un pez sierra, que en realidad es una raya.",
    habitat: "Fondos marinos costeros y de la plataforma continental, según la especie.",
    alimentacion: "Peces pequeños del fondo y crustáceos marinos.",
    orden: "Pristiophoriformes",
    familia: "Pristiophoridae",
    caracteristicas: "Hocico largo y aplanado con dientes a los lados y barbillones cerca de la boca.",
    conservacion: "Datos insuficientes (DD)",
    nota: "Referencia para Pristiophorus schroederi. Si bien no existe información suficiente para considerarlo en peligro, algunos organismos urgen por su protección, considerandolo amenazado."
  },

  tiburonblanco: {
    nombre: "Tiburón blanco",
    descripcion: "¡El tiburón más famoso del océano! Tiene un cuerpo potente y aerodinámico que le permite recorrer grandes distancias. Pero no es un monstruo: es un animal que cumple un papel importante en su ecosistema.",
    habitat: "Aguas templadas de numerosos océanos, con presencia en algunas regiones subtropicales.",
    alimentacion: "Peces, rayas y mamíferos marinos, según su edad y tamaño.",
    orden: "Lamniformes",
    familia: "Lamnidae",
    caracteristicas: "Dorso gris, vientre blanco, hocico cónico y una gran aleta dorsal triangular.",
    conservacion: "Vulnerable (VU)",
    nota: "Categoría de referencia para Carcharodon carcharias."
  },

  tiburonmako: {
    nombre: "Tiburón mako",
    descripcion: "Este nadador tiene un cuerpo súper aerodinámico y es famoso por su velocidad. En el mar abierto, está hecho para perseguir presas rápidas.",
    habitat: "Aguas oceánicas templadas y tropicales, generalmente lejos de la costa.",
    alimentacion: "Peces rápidos, como atunes, además de calamares y otros animales marinos.",
    orden: "Lamniformes",
    familia: "Lamnidae",
    caracteristicas: "Cuerpo delgado y fusiforme, hocico puntiagudo, cola en forma de media luna y dientes largos.",
    conservacion: "En Peligro (EN)",
    nota: "Referencia para el mako de aletas cortas (Isurus oxyrinchus)."
  },

  tiburonzorro: {
    nombre: "Tiburón zorro",
    descripcion: "Esa cola gigante que parece un alerón es un accesorio clave: el tiburón zorro puede usar su larguísima aleta caudal para golpear y aturdir a los peces que nadan en grupo.",
    habitat: "Aguas tropicales y templadas, tanto oceánicas como cercanas a la costa.",
    alimentacion: "Principalmente peces que forman cardúmenes y, a veces, calamares.",
    orden: "Lamniformes",
    familia: "Alopiidae",
    caracteristicas: "Lóbulo superior de la cola extraordinariamente largo, a veces casi tan largo como el resto del cuerpo.",
    conservacion: "Vulnerable (VU)",
    nota: "Referencia para Alopias vulpinus. Otras especies de tiburón zorro pueden presentar distintas categorías."
  },

  tiburonazul: {
    nombre: "Tiburón azul",
    descripcion: "Este tiburón es un viajero del océano muy veloz que destaca por su color llamativo. Es uno de los más veloces del planeta y le gusta recorrer miles de kilometros.",
    habitat: "Aguas oceánicas templadas y tropicales de todo el mundo.",
    alimentacion: "Calamares y peces pelágicos, entre otras presas.",
    orden: "Carcharhiniformes",
    familia: "Carcharhinidae",
    caracteristicas: "Dorso azul intenso, cuerpo esbelto y aletas pectorales largas.",
    conservacion: "Casi Amenazado (NT)",
    nota: "Referencia para Prionace glauca."
  },

  tiburonperegrino: {
    nombre: "Tiburón peregrino",
    descripcion: "¡No hay que temer! aunque esa boca impresiona por su tamaño, este gigante no anda persiguiendo grandes presas, si no que se acerca a las aguas menos profundas y filtra diminutos organismos del agua mientras nada.",
    habitat: "Mares templados, en zonas donde abunda el plancton.",
    alimentacion: "Plancton y pequeños organismos que filtra del agua.",
    orden: "Lamniformes",
    familia: "Cetorhinidae",
    caracteristicas: "Boca enorme, branquias muy largas y cuerpo gigantesco.",
    conservacion: "En Peligro (EN)",
    nota: "Referencia para Cetorhinus maximus."
  },

  tiburonballena: {
    nombre: "Tiburón ballena",
    descripcion: "¡El pez más grande del mundo! Y, sin embargo, su menú incluye bocaditos diminutos. Tiene un cuerpo lleno de puntitos blancos.",
    habitat: "Mares tropicales y cálidos, sobre todo donde se concentran plancton y pequeños peces.",
    alimentacion: "Plancton, huevos de peces y pequeños peces y crustáceos.",
    orden: "Orectolobiformes",
    familia: "Rhincodontidae",
    caracteristicas: "Tamaño enorme, cabeza ancha y patrón de puntos y líneas claras sobre el dorso.",
    conservacion: "En Peligro (EN)",
    nota: "Referencia para Rhincodon typus."
  },

  tiburonboquiancho: {
    nombre: "Tiburón boquiancho",
    descripcion: "Este pez, reconocible por su enorme boca, es tan raro y poco frecuente de observar que se sabe poco de él. Cada encuentro ayuda a los científicos a conocerlo mejor.",
    habitat: "Aguas oceánicas profundas de regiones tropicales y templadas cálidas.",
    alimentacion: "Se cree que filtra plancton y pequeños organismos marinos.",
    orden: "Lamniformes",
    familia: "Megachasmidae",
    caracteristicas: "Cabeza voluminosa, boca muy grande y cuerpo robusto.",
    conservacion: "Datos insuficientes (DD)",
    nota: "Referencia para Megachasma pelagios. DD significa que la información no alcanza para evaluar bien su riesgo, no significa que esté a salvo."
  },

  tiburonsalmon: {
    nombre: "Tiburón salmón",
    descripcion: "Este bichito de apariencia desorientada y ojos saltones puede mantener su cuerpo más caliente que el agua que lo rodea, una ventaja para perseguir presas en las aguas frescas del Pacífico Norte.",
    habitat: "Pacífico Norte, tanto en zonas costeras como oceánicas.",
    alimentacion: "Peces como salmones y arenques, además de calamares.",
    orden: "Lamniformes",
    familia: "Lamnidae",
    caracteristicas: "Cuerpo compacto y robusto, hocico corto y grandes aletas.",
    conservacion: "Preocupación Menor (LC)",
    nota: "Referencia para Lamna ditropis."
  },

  tiburonpigmeo: {
    nombre: "Tiburón pigmeo",
    descripcion: "¡Parece una mojarrita, pero te juro que es un tiburón! Es el segundo tiburón más pequeño que existe. Durante la noche ascienden a comer, y de día se camuflan de los depredadores en las profundidades gracias a su bioluminiscencia.",
    habitat: "Aguas oceánicas profundas, especialmente en regiones tropicales y templadas cálidas.",
    alimentacion: "Pequeños peces, calamares y otros animales diminutos del océano.",
    orden: "Squaliformes",
    familia: "Dalatiidae",
    caracteristicas: "Tamaño diminuto, cuerpo alargado y ojos grandes en relación con su cabeza.",
    conservacion: "Preocupación menor (LC)",
    nota: "Referencia para el tiburón pigmeo Euprotomicrus bispinatus."
  },

  tiburonduende: {
    nombre: "Tiburón duende",
    descripcion: "Su hocico largo lo hace parecer salido de una película de terror, pero es un especialista en cazar en las profundidades. Puede proyectar su mandibula para adelante como una garra para cazar, por si no te parecía lo suficientemente inquietante.",
    habitat: "Taludes continentales y otras zonas profundas de los océanos.",
    alimentacion: "Peces, calamares y crustáceos de aguas profundas.",
    orden: "Lamniformes",
    familia: "Mitsukurinidae",
    caracteristicas: "Hocico largo y aplanado, mandíbula protráctil y aspecto rosado.",
    conservacion: "Preocupación Menor (LC)",
    nota: "Referencia para Mitsukurina owstoni. Es difícil de estudiar porque vive en aguas profundas."
  },

  tiburondegroenlandia: {
    nombre: "Tiburón de Groenlandia",
    descripcion: "Este tiburón crece muy despacio y puede vivir durante siglos, con estimaciones de hasta 500 años de vida. Se toma la vida con bastante calma, ¡incluso los latidos de su corazón son lentos!",
    habitat: "Aguas frías del Atlántico Norte y el océano Ártico, desde zonas profundas hasta aguas menos profundas.",
    alimentacion: "Peces y otros animales marinos; se han encontrado restos de mamíferos marinos en su dieta.",
    orden: "Squaliformes",
    familia: "Somniosidae",
    caracteristicas: "Cuerpo grande y robusto, hocico redondeado y aspecto generalmente oscuro.",
    conservacion: "Preocupación Menor (LC)",
    nota: "Referencia para Somniosus microcephalus. Su longevidad extraordinaria no significa que sea inmune a las amenazas."
  },

  tiburongatuzo: {
    nombre: "Tiburón gatuzo",
    descripcion: "Este tiburón es más bien pequeño y esbelto, y vive cerca del fondo. Es una pieza importante del ecosistema marino argentino que por culpa de la pesca está en peligro de extinción.",
    habitat: "Aguas costeras y de la plataforma continental de Sudamérica, incluido el Atlántico sudoccidental.",
    alimentacion: "Peces pequeños, crustáceos y otros invertebrados del fondo.",
    orden: "Carcharhiniformes",
    familia: "Triakidae",
    caracteristicas: "Cuerpo esbelto, hocico puntiagudo y dos aletas dorsales.",
    conservacion: "En Peligro Crítico (CR)",
    nota: "Referencia para Mustelus schmitti. La categoría debe verificarse en la evaluación vigente de la UICN antes de usarla como dato académico."
  }
};

const tiburones = [
  { nombre: "tiburonleopardo", profundidadVisual: 25, tamano: 155, duracion: 15, retraso: -7 },
  { nombre: "tiburonangel", profundidadVisual: 150, tamano: 125, duracion: 17, retraso: -11 },
  { nombre: "tiburonlimon", profundidadVisual: 75, tamano: 175, duracion: 14, retraso: -4 },
  { nombre: "tiburontoro", profundidadVisual: 250, tamano: 190, duracion: 13, retraso: -8, invertido: true },
  { nombre: "tiburongatopardo", profundidadVisual: 400, tamano: 175, duracion: 15, retraso: -10 },
  { nombre: "tiburontigre", profundidadVisual: 550, tamano: 230, duracion: 14, retraso: -5, invertido: true },
  { nombre: "tiburonmartillo", profundidadVisual: 700, tamano: 175, duracion: 16, retraso: -12 },
  { nombre: "tiburonsierra", profundidadVisual: 100, tamano: 165, duracion: 18, retraso: -6, invertido: true },
  { nombre: "tiburonblanco", profundidadVisual: 850, tamano: 250, duracion: 16, retraso: -9, invertido: true },
  { nombre: "tiburonmako", profundidadVisual: 1000, tamano: 185, duracion: 13, retraso: -3 },
  { nombre: "tiburonzorro", profundidadVisual: 1150, tamano: 190, duracion: 17, retraso: -13 },
  { nombre: "tiburonazul", profundidadVisual: 1300, tamano: 165, duracion: 14, retraso: -6 },
  { nombre: "tiburonperegrino", profundidadVisual: 200, tamano: 450, duracion: 19, retraso: -14, invertido: true },
  { nombre: "tiburonballena", profundidadVisual: 350, tamano: 450, duracion: 18, retraso: -10, invertido: true },
  { nombre: "tiburonboquiancho", profundidadVisual: 1450, tamano: 180, duracion: 17, retraso: -12 },
  { nombre: "tiburonsalmon", profundidadVisual: 1600, tamano: 140, duracion: 14, retraso: -8 },
  { nombre: "tiburonpigmeo", profundidadVisual: 1750, tamano: 65, duracion: 16, retraso: -5, invertido: true },
  { nombre: "tiburonduende", profundidadVisual: 1900, tamano: 155, duracion: 17, retraso: -11, invertido: true },
  { nombre: "tiburondegroenlandia", profundidadVisual: 2100, tamano: 240, duracion: 20, retraso: -15, invertido: true },
  { nombre: "tiburongatuzo", profundidadVisual: 500, tamano: 105, duracion: 14, retraso: -7 }
];

function crearGrilla() {
  acuario.querySelectorAll(".celda").forEach((celda) => celda.remove());

  acuario.style.height = `${alturaAcuario}px`;

  const ancho = document.documentElement.clientWidth;
  const columnas = Math.max(1, Math.ceil(ancho / 100));
  const filas = Math.ceil(alturaAcuario / 100);

  acuario.style.gridTemplateColumns =
    `repeat(${columnas}, minmax(0, 1fr))`;
  acuario.style.gridAutoRows = "100px";

  const fragmento = document.createDocumentFragment();

  for (let i = 0; i < filas * columnas; i++) {
    const celda = document.createElement("div");
    celda.className = "celda";
    fragmento.appendChild(celda);
  }

  acuario.prepend(fragmento);
}

function distribuirTiburones() {
  acuario.querySelectorAll(".tiburon").forEach((tiburon) => tiburon.remove());

  tiburones.forEach((dato) => {
    const carril = document.createElement("div");
    carril.className = "tiburon";

    const posicion =
      espacioSuperior + dato.profundidadVisual * pixelesPorMetro;

    carril.style.top = `${posicion}px`;
    carril.style.setProperty("--tamano", `${dato.tamano}px`);

    const nadador = document.createElement("div");
    nadador.className = "nadador";
    nadador.style.setProperty("--duracion", `${dato.duracion}s`);
    nadador.style.setProperty("--retraso", `${dato.retraso}s`);

    if (dato.invertido) {
      nadador.style.animationName = "recorrido-inverso";
    }

    const imagen = document.createElement("img");
    imagen.src = `imagenes/${dato.nombre}.png`;
    imagen.alt = informacionTiburones[dato.nombre]?.nombre || dato.nombre;
    imagen.draggable = false;

    imagen.onerror = () => {
      console.error("No se encontró la imagen:", imagen.src);
    };

    nadador.addEventListener("click", () => {
      abrirFicha(dato, nadador, imagen);
    });

    nadador.appendChild(imagen);
    carril.appendChild(nadador);
    acuario.appendChild(carril);
  });
}

function abrirFicha(dato, nadador, imagenOriginal) {
  cerrarFicha();

  const info = informacionTiburones[dato.nombre];

  if (!info) {
    console.error("Falta información para:", dato.nombre);
    return;
  }

  tiburonSeleccionado = { nadador, imagenOriginal };

  fichaNombre.textContent = info.nombre;
  fichaProfundidad.textContent =
    `${dato.profundidadVisual.toLocaleString("es-AR")} m · posición ilustrativa`;

  fichaDescripcion.textContent = info.descripcion;
  fichaHabitat.textContent = info.habitat;
  fichaAlimentacion.textContent = info.alimentacion;

  fichaOrden.textContent = info.orden;
  fichaFamilia.textContent = info.familia;
  fichaCaracteristicas.textContent = info.caracteristicas;
  fichaConservacion.textContent = info.conservacion;
  fichaConservacionNota.textContent = info.nota;

  ficha.hidden = false;
  ficha.setAttribute("aria-hidden", "false");

  nadador.style.animationPlayState = "paused";
  imagenOriginal.style.animationPlayState = "paused";

  const rect = imagenOriginal.getBoundingClientRect();

  imagenAmpliada = document.createElement("img");
  imagenAmpliada.src = imagenOriginal.src;
  imagenAmpliada.alt = "";
  imagenAmpliada.className = "tiburon-zoom";
  imagenAmpliada.setAttribute("aria-hidden", "true");
  imagenAmpliada.draggable = false;

  Object.assign(imagenAmpliada.style, {
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`
  });

  document.body.appendChild(imagenAmpliada);
  imagenOriginal.style.visibility = "hidden";

  requestAnimationFrame(() => {
    if (!imagenAmpliada || !tiburonSeleccionado) return;

    const fichaRect = ficha.getBoundingClientRect();
    const esMovil = window.innerWidth <= 650;

    let anchoObjetivo;
    let altoObjetivo;
    let izquierdaObjetivo;
    let arribaObjetivo;

    const proporcion = imagenOriginal.naturalWidth > 0
      ? imagenOriginal.naturalHeight / imagenOriginal.naturalWidth
      : 0.6;

    if (esMovil) {
      const espacioVertical = Math.max(100, fichaRect.top - 30);
      altoObjetivo = Math.min(espacioVertical * 0.82, window.innerHeight * 0.45);
      anchoObjetivo = altoObjetivo / proporcion;

      const anchoMaximo = window.innerWidth * 0.88;

      if (anchoObjetivo > anchoMaximo) {
        anchoObjetivo = anchoMaximo;
        altoObjetivo = anchoObjetivo * proporcion;
      }

      izquierdaObjetivo = (window.innerWidth - anchoObjetivo) / 2;
      arribaObjetivo = Math.max(8, (fichaRect.top - altoObjetivo) / 2);
    } else {
      const margenIzquierdo = 24;
      const separacionFicha = 32;
      const espacioHorizontal =
        fichaRect.left - separacionFicha - margenIzquierdo;

      anchoObjetivo = Math.min(espacioHorizontal, 520);
      altoObjetivo = anchoObjetivo * proporcion;

      const altoMaximo = window.innerHeight * 0.72;

      if (altoObjetivo > altoMaximo) {
        altoObjetivo = altoMaximo;
        anchoObjetivo = altoObjetivo / proporcion;
      }

      izquierdaObjetivo =
        margenIzquierdo + (espacioHorizontal - anchoObjetivo) / 2;

      arribaObjetivo = (window.innerHeight - altoObjetivo) / 2;
    }

    Object.assign(imagenAmpliada.style, {
      left: `${izquierdaObjetivo}px`,
      top: `${arribaObjetivo}px`,
      width: `${anchoObjetivo}px`,
      height: `${altoObjetivo}px`
    });
  });
}


function cerrarFicha() {
  if (imagenAmpliada) {
    imagenAmpliada.remove();
    imagenAmpliada = null;
  }

  if (tiburonSeleccionado) {
    const { nadador, imagenOriginal } = tiburonSeleccionado;

    imagenOriginal.style.visibility = "";
    nadador.style.animationPlayState = "";
    imagenOriginal.style.animationPlayState = "";

    tiburonSeleccionado = null;
  }

  if (botonTooltipActual) {
      botonTooltipActual.classList.remove("tooltip-fijado");
    }
    cerrarTooltipFlotante();

  ficha.hidden = true;
  ficha.setAttribute("aria-hidden", "true");

  document.querySelectorAll(".info-btn.tooltip-abierto").forEach((boton) => {
    boton.classList.remove("tooltip-abierto");
    boton.setAttribute("aria-expanded", "false");
  });
}

cerrarFichaBTN.addEventListener("click", cerrarFicha);

document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape" && !ficha.hidden) {
    cerrarFicha();
  }
});

let tooltipFlotante = null;
let botonTooltipActual = null;

function actualizarPosicionTooltip() {
if (!tooltipFlotante || !botonTooltipActual) return;

const rect = botonTooltipActual.getBoundingClientRect();
const margen = 8;
const separacion = 10;
const tooltipRect = tooltipFlotante.getBoundingClientRect();

let izquierda = rect.left + rect.width / 2 - tooltipRect.width / 2;

izquierda = Math.max(
  margen,
  Math.min(
    izquierda,
    window.innerWidth - tooltipRect.width - margen
  )
);

let arriba = rect.top - tooltipRect.height - separacion;

if (arriba < margen) {
  arriba = rect.bottom + separacion;
}

arriba = Math.max(
  margen,
  Math.min(
    arriba,
    window.innerHeight - tooltipRect.height - margen
  )
);

tooltipFlotante.style.left = `${izquierda}px`;
tooltipFlotante.style.top = `${arriba}px`;
}

function cerrarTooltipFlotante() {
if (tooltipFlotante) {
  tooltipFlotante.remove();
  tooltipFlotante = null;
}

if (botonTooltipActual) {
  botonTooltipActual.classList.remove("tooltip-abierto");
  botonTooltipActual.setAttribute("aria-expanded", "false");
  botonTooltipActual = null;
}
}

function abrirTooltipFlotante(boton) {
const textoOriginal = boton.querySelector(".info-tooltip");

if (!textoOriginal) return;

if (botonTooltipActual === boton && tooltipFlotante) {
  actualizarPosicionTooltip();
  return;
}

cerrarTooltipFlotante();

tooltipFlotante = textoOriginal.cloneNode(true);
tooltipFlotante.classList.add("tooltip-flotante");

document.body.appendChild(tooltipFlotante);

botonTooltipActual = boton;
boton.classList.add("tooltip-abierto");
boton.setAttribute("aria-expanded", "true");
actualizarPosicionTooltip();
}

document.querySelectorAll(".info-btn").forEach((boton) => {
boton.addEventListener("mouseenter", () => {
  abrirTooltipFlotante(boton);
});

boton.addEventListener("mouseleave", () => {
  if (!boton.classList.contains("tooltip-fijado")) {
    cerrarTooltipFlotante();
  }
});

boton.addEventListener("click", (evento) => {
  evento.stopPropagation();

  const yaFijado = boton.classList.contains("tooltip-fijado");

  if (yaFijado) {
    boton.classList.remove("tooltip-fijado");
    cerrarTooltipFlotante();
    return;
  }

  cerrarTooltipFlotante();
  abrirTooltipFlotante(boton);

  boton.classList.add("tooltip-fijado");
});

boton.addEventListener("focus", () => {
  abrirTooltipFlotante(boton);
});

boton.addEventListener("blur", () => {
  if (!boton.classList.contains("tooltip-fijado")) {
    cerrarTooltipFlotante();
  }
});
});

document.addEventListener("click", (evento) => {
if (!evento.target.closest(".info-btn")) {
  if (botonTooltipActual) {
    botonTooltipActual.classList.remove("tooltip-fijado");
  }

  cerrarTooltipFlotante();
}
});
window.addEventListener("resize", actualizarPosicionTooltip);

ficha.addEventListener("scroll", actualizarPosicionTooltip, {
passive: true
});

document.addEventListener("keydown", (evento) => {
if (evento.key === "Escape") {
  if (botonTooltipActual) {
    botonTooltipActual.classList.remove("tooltip-fijado");
  }

  cerrarTooltipFlotante();
}
});


function crearRegla() {
  regla.innerHTML = "";
  regla.style.top = `${espacioSuperior}px`;
  regla.style.height = `${alturaZonaProfunda}px`;

  for (let metros = 0; metros <= profundidadMaxima; metros += 10) {
    const marca = document.createElement("div");
    marca.className = "marca-profundidad";
    marca.style.top = `${metros * pixelesPorMetro}px`;

    if (metros % 50 === 0) {
      marca.classList.add("etiqueta");

      const numero = document.createElement("span");
      numero.className = "numero-profundidad";
      numero.textContent = `${metros} m`;

      marca.appendChild(numero);
    }

    regla.appendChild(marca);
  }
}

function iniciarAcuario() {
  crearGrilla();
  distribuirTiburones();
  crearRegla();
}

window.addEventListener("load", iniciarAcuario);

window.addEventListener("resize", crearGrilla);
const opcionesBTN = document.getElementById("opcionesBTN");
const cartelProceso = document.getElementById("cartelProceso");

opcionesBTN.addEventListener("click", () => {
  cartelProceso.hidden = false;
});