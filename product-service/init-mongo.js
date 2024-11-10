          
// show collections;                   
db = db.getSiblingDB('productdb');  
db.createCollection('productos', {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["id_usuario", "nombre_obra", "artista", "fecha_publicacion", "descripcion", "dimensiones", "imagen", "precio", "etiquetas", "estado"],
      properties: {
        id_usuario: {
          bsonType: "int",
          description: "Debe ser un número entero"
        },
        nombre_obra: {
          bsonType: "string",
          description: "Debe ser una cadena de texto"
        },
        artista: {
          bsonType: "string",
          description: "Debe ser una cadena de texto"
        },
        fecha_publicacion: {
          bsonType: "date",
          description: "Debe ser una fecha en formato ISODate"
        },
        descripcion: {
          bsonType: "string",
          description: "Debe ser una cadena de texto"
        },
        dimensiones: {
          bsonType: "object",
          required: ["altura", "anchura"],
          properties: {
            altura: {
              bsonType: "int",
              description: "Debe ser un número entero representando la altura"
            },
            anchura: {
              bsonType: "int",
              description: "Debe ser un número entero representando la anchura"
            }
          },
          description: "Debe ser un objeto que contiene las dimensiones"
        },
        imagen: {
          bsonType: "string",
          description: "Debe ser una cadena de texto representando la URL de la imagen"
        },
        precio: {
          bsonType: "int",
          description: "Debe ser un número entero representando el precio"
        },
        etiquetas: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["categoria", "tecnica", "estilos"],
            properties: {
              categoria: {
                bsonType: "string",
                description: "Debe ser una cadena de texto"
              },
              tecnica: {
                bsonType: "string",
                description: "Debe ser una cadena de texto"
              },
              estilos: {
                bsonType: "string",
                description: "Debe ser una cadena de texto"
              }
            }
          },
          description: "Debe ser un arreglo de objetos con los campos requeridos"
        },
        estado: {
          bsonType: "string",
          enum: ["disponible", "vendido"],
          description: "Debe ser una cadena de texto que indique si el producto está disponible o vendido"
        }
      }
    }
  }
});

db.products.insertOne({
  id_usuario: 2,
  nombre_obra: "Reflejos de la Ciudad",
  artista: "Carlos Lopez",
  fecha_publicacion: new Date("2024-05-15"),
  descripcion: "Una visión abstracta de los reflejos urbanos en un día lluvioso.",
  dimensiones: { altura: 120, anchura: 80 },
  imagen: "https://ejemplo.com/reflejos_ciudad.jpg",
  precio: 300,
  etiquetas: [{ categoria: "Urbano", tecnica: "Acrilico", estilos: "Abstracto" }],
  estado: "disponible"
});

db.products.insertOne({
  id_usuario: 3,
  nombre_obra: "Naturaleza Viva",
  artista: "Lucia Mendez",
  fecha_publicacion: new Date("2024-03-10"),
  descripcion: "Un retrato detallado de la flora local en tonos vibrantes.",
  dimensiones: { altura: 70, anchura: 100 },
  imagen: "https://ejemplo.com/naturaleza_viva.jpg",
  precio: 250,
  etiquetas: [{ categoria: "Naturaleza", tecnica: "Acuarela", estilos: "Realismo" }],
  estado: "disponible"
});

db.products.insertOne({
  id_usuario: 4,
  nombre_obra: "Explosión de Color",
  artista: "Ana Rodriguez",
  fecha_publicacion: new Date("2024-08-20"),
  descripcion: "Una obra vibrante llena de colores y emociones.",
  dimensiones: { altura: 90, anchura: 90 },
  imagen: "https://ejemplo.com/explosion_color.jpg",
  precio: 500,
  etiquetas: [{ categoria: "Abstracto", tecnica: "Collage", estilos: "Expressionismo" }],
  estado: "vendido"
});

db.products.insertOne({
  id_usuario: 5,
  nombre_obra: "Rostro en Sombras",
  artista: "Miguel Torres",
  fecha_publicacion: new Date("2023-12-01"),
  descripcion: "Un retrato que refleja la dualidad de la mente humana.",
  dimensiones: { altura: 60, anchura: 40 },
  imagen: "https://ejemplo.com/rostro_sombras.jpg",
  precio: 180,
  etiquetas: [{ categoria: "Retrato", tecnica: "Grafito", estilos: "Figurativo" }],
  estado: "disponible"
});

db.products.insertOne({
  id_usuario: 6,
  nombre_obra: "Paisaje en Serenidad",
  artista: "Elena Garcia",
  fecha_publicacion: new Date("2024-07-08"),
  descripcion: "Una pintura calmada de un paisaje marino en la tarde.",
  dimensiones: { altura: 50, anchura: 75 },
  imagen: "https://ejemplo.com/paisaje_serenidad.jpg",
  precio: 220,
  etiquetas: [{ categoria: "Paisajismo", tecnica: "Óleo", estilos: "Clásico" }],
  estado: "vendido"
});

db.products.insertOne({
  id_usuario: 7,
  nombre_obra: "Simbolismo en Rojo",
  artista: "Victor Jimenez",
  fecha_publicacion: new Date("2024-06-12"),
  descripcion: "Obra simbólica que expresa pasión y lucha.",
  dimensiones: { altura: 110, anchura: 90 },
  imagen: "https://ejemplo.com/simbolismo_rojo.jpg",
  precio: 400,
  etiquetas: [{ categoria: "Conceptual", tecnica: "Tinta China", estilos: "Simbólico" }],
  estado: "disponible"
});

db.products.insertOne({
  id_usuario: 8,
  nombre_obra: "Mar y Arena",
  artista: "Laura Vargas",
  fecha_publicacion: new Date("2024-01-20"),
  descripcion: "Una representación de la tranquilidad de la costa.",
  dimensiones: { altura: 80, anchura: 120 },
  imagen: "https://ejemplo.com/mar_arena.jpg",
  precio: 350,
  etiquetas: [{ categoria: "Marina", tecnica: "Arena", estilos: "Naif" }],
  estado: "disponible"
});

db.products.insertOne({
  id_usuario: 9,
  nombre_obra: "Bosque Encantado",
  artista: "Javier Marin",
  fecha_publicacion: new Date("2024-04-14"),
  descripcion: "Un bosque mágico, lleno de luces y sombras.",
  dimensiones: { altura: 100, anchura: 130 },
  imagen: "https://ejemplo.com/bosque_encantado.jpg",
  precio: 600,
  etiquetas: [{ categoria: "Fantasía", tecnica: "Pastel", estilos: "Impresionismo" }],
  estado: "vendido"
});

db.products.insertOne({
  id_usuario: 10,
  nombre_obra: "Historia de la Ciudad",
  artista: "Sandra Silva",
  fecha_publicacion: new Date("2024-09-05"),
  descripcion: "Obra que narra la evolución de la ciudad en tres épocas.",
  dimensiones: { altura: 120, anchura: 180 },
  imagen: "https://ejemplo.com/historia_ciudad.jpg",
  precio: 700,
  etiquetas: [{ categoria: "Historia y Politica", tecnica: "Litografía", estilos: "Geométrico" }],
  estado: "disponible"
});

db.products.insertOne({
  id_usuario: 11,
  nombre_obra: "Sueños de la Infancia",
  artista: "Sofia Rios",
  fecha_publicacion: new Date("2024-02-18"),
  descripcion: "Una representación de la inocencia y creatividad de los niños.",
  dimensiones: { altura: 70, anchura: 50 },
  imagen: "https://ejemplo.com/suenos_infancia.jpg",
  precio: 280,
  etiquetas: [{ categoria: "Escena De Género", tecnica: "Serigrafía", estilos: "Primitivismo" }],
  estado: "vendido"
});

/*db.publicacion.insertMany([
  {
    id_usuario: 12,
    nombre_obra: "El Bosque de Colores",
    artista: "Carlos García",
    fecha_publicacion: new Date(),
    descripcion: "Un paisaje vibrante de un bosque cubierto por la luz de la mañana, pintado con tonos cálidos que capturan la esencia del amanecer.",
    dimensiones: { altura: 60, anchura: 80 },
    imagen: "el_bosque_de_colores.jpg",
    precio: 25000,
    etiquetas: [
      { categoria: "Naturaleza", tecnica: "Acrílico", estilos: "Impresionismo" }
    ],
    estado: "disponible"
  },
  {
    id_usuario: 13,
    nombre_obra: "Retrato de la Serenidad",
    artista: "Ana López",
    fecha_publicacion: new Date(),
    descripcion: "Un retrato detallado de una figura tranquila, con un enfoque en las emociones que surgen de la expresión facial sutil y la luz suave sobre la piel.",
    dimensiones: { altura: 50, anchura: 40 },
    imagen: "retrato_de_la_serenidad.jpg",
    precio: 30000,
    etiquetas: [
      { categoria: "Retrato", tecnica: "Lápiz", estilos: "Realismo" }
    ],
    estado: "disponible"
  },
  {
    id_usuario: 14,
    nombre_obra: "Mundos Fantásticos",
    artista: "Ricardo Pérez",
    fecha_publicacion: new Date(),
    descripcion: "Una serie abstracta de figuras geométricas que representan criaturas y paisajes de mundos imaginarios, con texturas tridimensionales que invitan a la interacción.",
    dimensiones: { altura: 100, anchura: 100 },
    imagen: "mundos_fantasticos.jpg",
    precio: 35000,
    etiquetas: [
      { categoria: "Fantasia", tecnica: "Pintura en Relieve", estilos: "Cubismo" }
    ],
    estado: "disponible"
  },
  {
    id_usuario: 15,
    nombre_obra: "El Sueño Urbano",
    artista: "Luis Martín",
    fecha_publicacion: new Date(),
    descripcion: "Una representación de la ciudad moderna, con spray y colores brillantes que expresan tanto la belleza como las luchas cotidianas de la vida urbana.",
    dimensiones: { altura: 120, anchura: 180 },
    imagen: "el_sueno_urbano.jpg",
    precio: 15000,
    etiquetas: [
      { categoria: "Urbano", tecnica: "Graffiti", estilos: "Street Art" }
    ],
    estado: "disponible"
  },
  {
    id_usuario: 16,
    nombre_obra: "La Dualidad de la Moda",
    artista: "Clara Suárez",
    fecha_publicacion: new Date(),
    descripcion: "Una interpretación artística de la moda contemporánea, con elementos minimalistas que capturan la esencia del estilo urbano moderno en una estructura fluida de resina.",
    dimensiones: { altura: 80, anchura: 60 },
    imagen: "la_dualidad_de_la_moda.jpg",
    precio: 40000,
    etiquetas: [
      { categoria: "Fashion", tecnica: "Resina Epoxi", estilos: "Minimalismo" }
    ],
    estado: "disponible"
  },
  {
    id_usuario: 17,
    nombre_obra: "La Fuerza del Espíritu",
    artista: "Javier Ruiz",
    fecha_publicacion: new Date(),
    descripcion: "Una obra de arte que utiliza símbolos religiosos tradicionales combinados con un estilo moderno para transmitir el poder y la trascendencia espiritual.",
    dimensiones: { altura: 90, anchura: 70 },
    imagen: "la_fuerza_del_espiritu.jpg",
    precio: 50000,
    etiquetas: [
      { categoria: "Religión", tecnica: "Tinta China", estilos: "Simbolico" }
    ],
    estado: "disponible"
  },
  {
    id_usuario: 18,
    nombre_obra: "Oasis en el Desierto",
    artista: "Raúl Martínez",
    fecha_publicacion: new Date(),
    descripcion: "Una pintura de un oasis en medio de un vasto desierto, con colores intensos y formas audaces que capturan la energía del lugar.",
    dimensiones: { altura: 70, anchura: 100 },
    imagen: "oasis_en_el_desierto.jpg",
    precio: 28000,
    etiquetas: [
      { categoria: "Naturaleza", tecnica: "Acuarela", estilos: "Fauvismo" }
    ],
    estado: "disponible"
  },
  {
    id_usuario: 19,
    nombre_obra: "La Conquista del Tiempo",
    artista: "Mónica López",
    fecha_publicacion: new Date(),
    descripcion: "Una pieza en la que se utiliza ladrillos como medio para representar los eventos históricos que han marcado el paso del tiempo y la política en diversas culturas.",
    dimensiones: { altura: 150, anchura: 150 },
    imagen: "la_conquista_del_tiempo.jpg",
    precio: 22000,
    etiquetas: [
      { categoria: "Historia y Política", tecnica: "Ladrillos", estilos: "Metafísico" }
    ],
    estado: "disponible"
  },
  {
    id_usuario: 20,
    nombre_obra: "Danza Eterna",
    artista: "Marta Sánchez",
    fecha_publicacion: new Date(),
    descripcion: "Una obra que captura la tensión y la emoción de una danza, con trazos dramáticos y colores vibrantes que reflejan el movimiento y la pasión.",
    dimensiones: { altura: 110, anchura: 140 },
    imagen: "danza_eterno.jpg",
    precio: 32000,
    etiquetas: [
      { categoria: "Escena De Género", tecnica: "Pastel al óleo", estilos: "Expressionismo" }
    ],
    estado: "disponible"
  },
  {
    id_usuario: 21,
    nombre_obra: "Reflejos del Mar",
    artista: "Ricardo Hernández",
    fecha_publicacion: new Date(),
    descripcion: "Un conjunto de esculturas que representan escenas marinas en un estilo ingenuo, con colores brillantes y formas simples que evocan la serenidad del océano.",
    dimensiones: { altura: 120, anchura: 120 },
    imagen: "reflejos_del_mar.jpg",
    precio: 27000,
    etiquetas: [
      { categoria: "Marina", tecnica: "Cerámica", estilos: "Naif" }
    ],
    estado: "disponible"
  },
  {
    id_usuario: 22,
    nombre_obra: "El Cielo Abstracto",
    artista: "Isabel Vargas",
    fecha_publicacion: new Date(),
    descripcion: "Una exploración abstracta del cielo, utilizando colores intensos y formas fluidas para representar las emociones que nos genera el firmamento.",
    dimensiones: { altura: 80, anchura: 100 },
    imagen: "el_cielo_abstracto.jpg",
    precio: 35000,
    etiquetas: [
      { categoria: "Abstracción", tecnica: "Acrílico", estilos: "Abstracto" }
    ],
    estado: "disponible"
  },
  {
    id_usuario: 23,
    nombre_obra: "La Desnudez de la Verdad",
    artista: "Sofía Ruiz",
    fecha_publicacion: new Date(),
    descripcion: "Un estudio sobre la figura humana, mostrando la desnudez como una forma de revelar la verdad, capturada con sombras sutiles y detalles finos.",
    dimensiones: { altura: 160, anchura: 80 },
    imagen: "la_desnudez_de_la_verdad.jpg",
    precio: 25000,
    etiquetas: [
      { categoria: "Desnudo", tecnica: "Carboncillo", estilos: "Figurativo" }
    ],
    estado: "disponible"
  }
]); */


