# 📤 Guía Completa para Subir tu Web a Render

## Paso 1: Preparar tu Repositorio Git

### 1.1 Inicializar Git (si no está inicializado)
```powershell
cd "c:\Users\Nicol\OneDrive\Documentos\GitHub\DelCeiboStudio"
git init
```

### 1.2 Configurar Git (si es la primera vez)
```powershell
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

### 1.3 Agregar archivos y hacer commit
```powershell
git add .
git commit -m "Bordados Castellanos - Web inicial"
```

### 1.4 Crear repositorio en GitHub
- Visita https://github.com/new
- Nombre: `DelCeiboStudio` (o el que prefieras)
- Descripción: "Web publicitaria para una casa de bordados españoles"
- Privado/Público: Elige según prefieras
- No inicializar con README (ya tenemos uno)
- Click en "Create repository"

### 1.5 Vincular tu repositorio local con GitHub
```powershell
git remote add origin https://github.com/TU_USUARIO/DelCeiboStudio.git
git branch -M main
git push -u origin main
```

---

## Paso 2: Crear Cuenta en Render

1. Visita https://render.com
2. Click en "Sign up"
3. Elige: "Sign up with GitHub"
4. Autoriza a Render para acceder a GitHub
5. Completa tu perfil

---

## Paso 3: Desplegar en Render

### 3.1 Crear un nuevo servicio
1. En el dashboard de Render, click en "New +"
2. Selecciona "Web Service"

### 3.2 Conectar tu repositorio
1. Busca y selecciona `DelCeiboStudio`
2. Click en "Connect"

### 3.3 Configurar el servicio
- **Name**: `bordados-castellanos` (o similar)
- **Environment**: `Node`
- **Build Command**: `npm install` (Render lo detectará automáticamente)
- **Start Command**: `npm start` (Render lo detectará automáticamente del package.json)
- **Plan**: Selecciona "Free" (plan gratuito)

### 3.4 Verificar variables de entorno
- La configuración está en `render.yaml`
- NODE_ENV ya está configurado como "production"

### 3.5 Desplegar
- Click en "Create Web Service"
- Render comenzará a construir tu aplicación automáticamente
- Espera a que termine el despliegue (puede tomar 2-5 minutos)

---

## Paso 4: Acceder a tu Web

Una vez completado el despliegue, verás una URL similar a:
```
https://bordados-castellanos.onrender.com
```

¡Tu web está lista! 🎉

---

## Paso 5: Actualizaciones Futuras

Cada vez que hagas cambios:

```powershell
# Hacer cambios en tus archivos...
git add .
git commit -m "Descripción del cambio"
git push origin main
```

Render redesplegará automáticamente tu sitio en unos minutos.

---

## 🔧 Solucionar Problemas

### Si tu web no aparece después de desplegar:
1. Verifica los logs en Render (Events tab)
2. Asegúrate de que el puerto esté en la variable PORT (server.js lo hace)
3. Comprueba que todos los archivos fueron pusheados a GitHub

### Si solo ves "Service is starting...":
- Espera unos minutos más, Render está construyendo
- Refresca la página (F5)

### Si los estilos/imágenes no cargan:
- Verifica que las rutas en index.html sean relativas (./archivo.css)
- Asegúrate de que los archivos estén en la carpeta raíz

---

## 📝 Checklist Final

- ✅ Archivos creados: index.html, styles.css, script.js, server.js, package.json
- ✅ Repositorio inicializado en Git
- ✅ Pushado a GitHub
- ✅ Cuenta creada en Render
- ✅ Servicio web creado en Render
- ✅ Despliegue completado
- ✅ URL accesible desde el navegador

---

## 💡 Consejos

1. **Dominio personalizado**: En Render puedes conectar tu propio dominio (render.yaml)
2. **HTTPS automático**: Render proporciona SSL gratis
3. **Redeploy manual**: Puedes forzar un redeploy desde el dashboard de Render
4. **Monitoreo**: Render te alertará si hay problemas

---

¡Tu web está lista para mostrarla al mundo! 🚀
