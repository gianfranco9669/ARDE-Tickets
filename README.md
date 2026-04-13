# ARDE Tickets

Plataforma integral de gestión y acceso para eventos (modo Gestión + modo Acceso) en una sola aplicación.

## Estructura

- `apps/web`: Frontend Next.js + TypeScript (experiencia completa en castellano).
- `apps/api`: Backend NestJS + TypeScript + PostgreSQL (arquitectura modular).

## Base actual corregida

- Castellanización funcional (rutas y dominios clave).
- Pantalla de **Ingreso a ARDE** rediseñada, abierta y moderna.
- Estrategia de autenticación multi-método:
  1. Google
  2. Teléfono con OTP
  3. Mail con link mágico o código
  4. Credenciales (solo perfil administrativo cuando aplica)
- Roles y permisos separados de la autenticación (autorización RBAC).

## Módulos de primera entrega

- Inicio unificado
- Eventos
- Tipos de entrada
- Tickets con token seguro
- Usuarios y roles
- Archivos (flyers)

## Próximos pasos

1. Integrar proveedores reales: OAuth Google, SMS OTP y envío de links/códigos por mail.
2. Persistir desafíos OTP/códigos en Redis.
3. Incorporar refresh tokens + sesiones revocables.
4. Migraciones SQL formales para producción.
