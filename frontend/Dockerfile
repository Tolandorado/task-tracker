FROM node:20-alpine AS build-stage

WORKDIR /app

# ARG VITE_API_BASE_URL
# ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
# ARG VITE_FRONTEND_BASE_URL
# ENV VITE_FRONTEND_BASE_URL=$VITE_FRONTEND_BASE_URL
ARG VITE_BACKEND_BASE_URL
ENV VITE_BACKEND_BASE_URL=$VITE_BACKEND_BASE_URL

COPY package*.json ./

RUN npm install

COPY . . 

RUN npm run build

FROM nginx:stable-alpine AS production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE $VITE_FRONTEND_PORT

CMD [ "nginx", "-g", "daemon off;" ]
# CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]