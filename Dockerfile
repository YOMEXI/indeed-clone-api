FROM node:18.2.0-alpine3.15
# RUN addgroup app && adduser -S -G app app
# USER app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE 8000
CMD [ "npm","run","dev" ]
