# Backend Dockerfile
FROM node:20

# Crear directorio de trabajo
WORKDIR /app

# Copiar los archivos del backend
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Exponer el puerto 3000
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["npm", "start"]
