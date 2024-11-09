          
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

