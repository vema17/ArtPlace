//  probar con docker exec -it <nombre_del_contenedor_mongo> mongo
// use mis_productos;               
// show collections;                   
db = db.getSiblingDB('mis_productos');  
db.createCollection('productos', {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["id_usuario", "medio", "fecha_publicacion", "descripcion", "puntuacion", "imagen", "precio", "etiquetas"],
      properties: {
        id_usuario: {
          bsonType: "int",
          description: "Debe ser un número entero"
        },
        medio: {
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
        puntuacion: {
          bsonType: "int",
          description: "Debe ser un número entero"
        },
        imagen: {
          bsonType: "string",
          description: "Debe ser una cadena de texto"
        },
        precio: {
          bsonType: "int",
          description: "Debe ser un número entero"
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
        }
      }
    }
  }
});
