# PIIC Portal

Portal de servicios y cuestionarios técnicos para PIIC.

## Versión 1.0 Stable

Esta versión marca el primer release estable del portal, con las siguientes mejoras de calidad:

- **Limpieza de Activos**: Se eliminaron archivos redundantes (logo.png, logo.svg) para reducir el peso del portal, delegando el branding a componentes CSS/VML de alta eficiencia ("Zero-Weight").
- **Estándar de Código**: Todo el código ha sido formateado con **Prettier** para asegurar coherencia y legibilidad.
- **QA & Testing**: Se implementó una suite de pruebas unitarias con **Vitest** y **React Testing Library**, cubriendo:
  - Lógica de formularios de contacto.
  - Integración con SEPOMEX para validación de direcciones.
  - Dependencias de estados y municipios.
- **Accesibilidad**: Se mejoró la estructura semántica de los formularios para compatibilidad con lectores de pantalla.

## Herramientas de Prueba de Email

Se han incluido scripts PHP especializados para verificar la entrega y el diseño de los correos electrónicos sin necesidad de completar formularios reales:

1.  **`test_contact_templates.php`**: Para probar los correos del formulario de contacto general.
2.  **`test_email_templates.php`**: Para probar los correos del cuestionario de Oil Skimmers.

## Requisitos

- PHP 7.4+
- Node.js 18+ (para desarrollo/build)
- Servidor web compatible con `.htaccess` (Apache recomendado)

---
© 2026 PIIC - Proyectos Integrales de Ingeniería y Control.
