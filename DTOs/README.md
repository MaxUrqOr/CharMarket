# Documentación de DTOs (Data Transfer Objects)

Esta carpeta contiene la definición y visualización de los Objetos de Transferencia de Datos (DTOs).

## Archivos y Estructura

- **`DTOS Max Urquizo.json`**: Este archivo contiene los datos que tendria el Json. Sirve como la estructura, tipos de datos y campos requeridos de cada DTO.

- **Carpeta `Diagramas/`**: Esta carpeta contiene representaciones visuales de los DTOs en formato de diagramas de clases. Estos diagramas ayudan a entender las relaciones y la estructura de cada DTO de una manera más gráfica e intuitiva.

## DTOs Definidos

A continuación se describe cada uno de los DTOs, cuya estructura está formalmente definida en el archivo JSON y visualizada en los diagramas correspondientes.

### 1. `NotificationEventDTO`

Este DTO se utiliza para representar un evento de notificación entrante. Contiene toda la información necesaria para que el sistema procese y envíe una notificación.

- **Diagrama:**

![NotificationEventDTO](Diagramas/NotificationEventDTO.drawio.svg)

### 2. `RenderedContentDTO`

Este DTO encapsula el contenido de una plantilla de notificación después de haber sido procesada o "renderizada" con datos específicos. Es útil para sistemas que utilizan plantillas para generar el cuerpo de los mensajes, estoy considerando solo la respuesta del servidor, ya que tambien considero que el servidor se encarga de renderizar la plantilla.

- **Diagrama:** 

![RenderedContentDTO](Diagramas/RenderedContentDTO.drawio.svg)

### 3. `PersistNotificationDTO`

Este DTO se utiliza para estructurar la información de una notificación que será almacenada en una base de datos o en un sistema de logging. Contiene los detalles finales de la notificación enviada, los ids de remitente y destinatario, así como la fecha de envío son string considerando que los ids tambien pueden ser lo tokens de usuario almacenados para el envio de notificaciones push.

- **Diagrama:**

![PersistNotificationDTO](Diagramas/PersistNotificationDTO.drawio.svg)

### Diagrama Completo

Para una visión general de cómo interactúan estos DTOs, puedes consultar el diagrama completo.

- **Diagrama:**

![DTOs Completo](Diagramas/DTOs%20completo.svg)

## Relación entre JSON y Diagramas

El archivo `DTOS Max Urquizo.json` es solo una visualización de los DTOs en una respuesta o envio de una estructira JSON para facilitar su comprensión. Los diagramas proporcionan una representación visual más detallada y clara de la estructura de cada DTO.