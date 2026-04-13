# ARDE · Arquitectura base corregida

## 1) Castellano total

Se normalizó el dominio funcional en castellano para módulos, rutas API y textos visibles:

- `autenticacion`
- `usuarios`
- `eventos`
- `tipos-entrada`
- `inicio`
- `archivos`

## 2) Autenticación multi-método (separada de autorización)

### Autenticación (cómo ingresa)

- Google (prioridad 1)
- Teléfono con OTP (prioridad 2)
- Mail con link mágico o código (prioridad 3)
- Credenciales tradicionales solo para escenarios administrativos (prioridad 4)

### Autorización (qué puede hacer)

Roles RBAC conservados:
- superadmin
- administrador
- producción
- puerta
- caja
- RRPP
- auditoría

## 3) Flujo técnico implementado

- `POST /api/autenticacion/iniciar`
  - Arranca flujo por método elegido.
  - En OTP/código genera desafío temporal y deja integración preparada.
- `POST /api/autenticacion/verificar`
  - Verifica código y emite `tokenAcceso` JWT.
- Guardas de autorización por rol se mantienen con `JwtAuthGuard + RolesGuard`.

## 4) UI de Ingreso

La pantalla `/ingreso` reemplaza el login clásico:

- identidad visual ARDE
- botones claros por método de ingreso
- opción administrativa de credenciales en bloque secundario

## 5) Decisiones técnicas breves

- Mantener JWT y RBAC para continuidad operacional.
- Diseñar auth por desafíos para soportar OTP/link/código sin acoplar proveedor.
- Dejar punto de extensión claro para Google OAuth y proveedores SMS/mail.
