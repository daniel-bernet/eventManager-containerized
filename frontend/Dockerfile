# Stage 1
FROM node:22 as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
ARG SYNCFUSION_LICENSE_KEY=""
RUN if [ -n "$SYNCFUSION_LICENSE_KEY" ]; then \
      printf "export const syncfusionLicenseKey = '%s';\n" "$SYNCFUSION_LICENSE_KEY" > src/syncfusion-license.ts; \
    fi
RUN npm run build

# Stage 2
FROM nginx:alpine
COPY --from=build /app/dist/event-manager-frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
