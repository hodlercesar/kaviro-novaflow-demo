# NovaFlow — entrega para revisión

Fecha: 31 de agosto de 2026. Rama: `polish/novaflow-premium-review`. PR: https://github.com/hodlercesar/kaviro-novaflow-demo/pull/3

## Resultado

Demo conceptual de operaciones comerciales con inicio público renovado, autenticación Clerk conservada y espacio privado `/demo`. No se publicaron cambios en producción, no se inventaron clientes ni testimonios, y no se cambiaron las rutas protegidas en la fase visual.

### Reparaciones funcionales previas

- Autenticación única con Clerk; eliminado el endpoint paralelo de sesión ficticia.
- Validación en servidor, consultas parametrizadas y propiedad de cada workspace derivada de `auth().userId`.
- Neon como fuente principal; caché local separada por usuario y estado de guardado/fallback explícito.
- Forecast determinista compartido, orden de prioridades corregido y tipos de cambio de referencia independientes.
- Componentes del dashboard separados, formularios validados, estados de carga/error y diálogo con teclado.
- Migración SQL explícita, dependencias y lockfile coherentes, scripts de calidad, metadatos y cabeceras básicas.
- Retirado el proxy opcional de Clerk: las instancias de desarrollo no lo admiten. Se mantiene la conexión directa y la protección en layout/APIs.

### Experiencia pública

Hero breve en español, diseño oscuro, CTA «Explorar demo», preview calculada desde los datos ficticios originales, cuatro beneficios concisos, tecnologías reales y CTA final. El inicio se renderiza en servidor; la preview no consulta datos privados ni muestra una captura de la cuenta del visitante.

### Login y mascota

Nox es un lince tecnológico original en SVG. Respira/parpadea suavemente; mira hacia email, cubre los ojos ante contraseña y los entreabre al revelar el campo. Los errores producen una reacción breve. El estado autenticado permite una reacción de éxito sin retrasar la navegación: una redirección rápida puede hacerla apenas perceptible.

Se reutilizan los componentes SignIn/SignUp de Clerk, incluidos Google, validación y pasos de verificación. El observador de la mascota solo inspecciona metadatos de campos y errores visibles, no contraseñas ni valores de entrada. No intercepta el envío del formulario. No se añadieron dependencias, GIFs, Rive ni Lottie.

## Verificación

| Comprobación                         | Resultado / alcance                                                                                                |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `pnpm format:check`                  | Correcto                                                                                                           |
| `pnpm lint`                          | Correcto                                                                                                           |
| `pnpm test`                          | 7 pruebas correctas                                                                                                |
| `pnpm build`                         | Correcto, Next.js 15.5.24                                                                                          |
| Inicio público                       | Desktop, tablet y móvil revisados; CTAs y enlaces funcionan                                                        |
| Preview sin sesión → `/demo`         | Redirige al login de Clerk                                                                                         |
| Sesión real → dashboard              | Acceso comprobado en preview de reparaciones                                                                       |
| Crear → Neon → recargar              | Registro ficticio creado, «Saved to Neon», registro conservado                                                     |
| Avanzar etapa → recargar             | Etapa Qualified conservada tras recargar                                                                           |
| Reportes                             | CLP, EUR y GBP renderizados desde el proveedor de referencia                                                       |
| Mascota email / contraseña / mostrar | Estados email, shield y peek comprobados en los formularios de Clerk                                               |
| Error de login                       | Correo ficticio inexistente; mensaje de Clerk y reacción de error comprobados                                      |
| Consola                              | Sin errores inesperados en inicio/login/registro/dashboard revisados; aviso de claves Clerk de desarrollo esperado |
| Movimiento reducido                  | Reglas CSS explícitas; no se simuló la preferencia del sistema en el navegador de prueba                           |
| Dos cuentas independientes           | No se completó una prueba con dos identidades reales                                                               |
| Nuevo login exitoso, OAuth y MFA     | No se volvió a introducir una credencial real ni se completó OAuth/MFA en la nueva preview                         |

También se comprobó que cerrar la sesión desde el menú visible devuelve al inicio público. El registro utilizado en la prueba fue «QA Fictional — Persistence Check», por USD 1.000 ficticios. No se usaron datos de clientes. La creación y el avance se verificaron antes de volver a observar el workspace restaurado a su conjunto inicial.

## Archivos de la fase visual y el pulido

- `app/page.js`
- `app/home.module.css`
- `app/auth.module.css`
- `app/globals.css`
- `app/layout.js` (solo textos de presentación de Clerk)
- `app/sign-in/[[...sign-in]]/page.js`
- `app/sign-up/[[...sign-up]]/page.js`
- `app/_components/Brand.js`
- `app/_components/ProductPreview.js`
- `app/_components/AuthExperience.js`
- `app/_components/NovaMascot.js`
- `lib/product-preview.mjs`
- `lib/mascot-state.mjs`
- `tests/presentation.test.mjs`
- `app/demo/page.js` (solo accesibilidad del menú móvil)
- `app/demo/demo.module.css` (menú oculto fuera del foco y movimiento reducido)
- `README.md`
- `docs/REVIEW.md`

El diff completo de la PR incluye además las reparaciones funcionales, APIs, esquema, configuración y tests de la fase anterior.

## Riesgos y siguiente paso

1. Revisar la preview y autorizar explícitamente la publicación. La URL de preview puede pedir acceso a Vercel; no sustituye todavía al enlace público de producción para enviar a prospectos.
2. Clerk sigue usando su instancia de desarrollo y muestra su aviso. Para un enlace público definitivo conviene revisar dominios, branding, proveedores y claves de producción; esto no se modificó ni ocultó.
3. Neon y Clerk deben tener entornos separados para preview/producción. La migración no se ejecutó automáticamente sobre ninguna base de producción.
4. Las oportunidades se sincronizan; preferencias, actividad y simulaciones permanecen en el navegador. No hay colaboración real, email automático ni IA. Los conflictos entre pestañas son last-write-wins.
5. No es un CRM listo para datos sensibles: quedan fuera del alcance multitenencia organizacional, límites antiabuso, política de retención y sincronización offline avanzada.
6. Una actualización del marcado de Clerk podría cambiar el gesto de la mascota. Su fallback es una pose tranquila, sin afectar autenticación.

Antes de enviar el enlace definitivo a clientes potenciales: revisar esta entrega, completar una prueba con dos cuentas, preparar las claves/dominios del entorno público y aprobar producción. Presentar NovaFlow siempre como portfolio técnico/demo conceptual.
