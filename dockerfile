# Usa una imagen base de Node.js
FROM node:22

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el código del proyecto
COPY . .

# Expone el puerto
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]