# Usa una imagen base oficial de Node.js
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json desde la raíz del proyecto
COPY ./package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente desde la carpeta server
COPY . .

# Expone el puerto en el que la aplicación escuchará
EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["npm", "start"]
