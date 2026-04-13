# ARDE · Arquitectura base corregida

## 1) Normalización total en castellano

Se renombró estructura interna para eliminar mezcla:

- Carpetas: `autenticacion`, `usuarios`, `eventos`, `tipos-entrada`, `entradas`, `inicio`, `archivos`.
- Archivos y clases: controladores, módulos, servicios, DTOs, entidades y enums en castellano.
- Rutas API coherentes: `/autenticacion`, `/usuarios`, `/eventos`, `/tipos-entrada`, `/entradas`, `/inicio`, `/archivos`.

## 2) Convención oficial de dominio

- **entrada**: unidad comercial/credencial emitida del evento.
- **acceso**: validación o registro de ingreso al evento.
- **ticket**: se elimina del dominio interno para evitar ambigüedad.

## 3) Autenticación vs autorización

### Autenticación (cómo entra)

1. Google
2. Teléfono con OTP
3. Mail con link mágico o código
4. Credenciales tradicionales (solo para perfiles administrativos)

### Autorización (qué puede hacer)

Roles RBAC:
- superadmin
- administrador
- producción
- puerta
- caja
- RRPP
- auditoría

## 4) Flujo técnico implementado

- `POST /api/autenticacion/iniciar`
- `POST /api/autenticacion/verificar`

Con desafíos temporales listos para integrar proveedores reales (OAuth Google, SMS, email).
