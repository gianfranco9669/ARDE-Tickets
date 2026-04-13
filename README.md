# ARDE Plataforma

Plataforma integral de gestión y acceso para eventos (modo Gestión + modo Acceso) en una sola aplicación.

## Estructura

- `apps/web`: Frontend Next.js + TypeScript.
- `apps/api`: Backend NestJS + TypeScript + PostgreSQL.

## Convención oficial del dominio

- **entrada** = credencial comercial emitida.
- **acceso** = validación de ingreso.
- **ticket** = término descartado en código interno para mantener consistencia.

## Base implementada

- Normalización completa del backend en castellano (carpetas, archivos, clases, enums, DTOs y rutas).
- Ingreso moderno multi-método (Google, teléfono OTP, mail link/código, credenciales administrativas).
- Separación explícita entre autenticación y autorización RBAC por rol.
