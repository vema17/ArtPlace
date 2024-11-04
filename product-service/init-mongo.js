          
// show collections;                   
db = db.getSiblingDB('mis_productos');  
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

