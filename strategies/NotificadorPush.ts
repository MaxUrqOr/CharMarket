import { Notificacion } from "@/models/Notificacion";
import { Notificador } from "./Notificador.interface";
import { messaging } from "@/config/firebase.config";

export class NotificadorPush implements Notificador {

  private async enviarViaFirebase(notificacion: Notificacion): Promise<void> {
    const token = notificacion.getPushToken(); // token va en el campo email

    if (!token || token.length < 10) {
      console.warn(` [Push] Token inválido: ${token}`);
      return;
    }

    if (!messaging) {
      console.warn(" [Push] Firebase Messaging no está configurado.");
      return;
    }

    const message = {
      token,
      notification: {
        title: notificacion.getAsunto(),
        body: notificacion.getMensaje(),
      },
      data: {
        tipoEvento: String(notificacion.getTipoEvento()),
      },
    };

    try {
      const response = await messaging.send(message);
      console.log(`📲 [Push] Notificación enviada (ID: ${response})`);
    } catch (error) {
      console.error(" [Push] Error enviando Push Notification:", error);
    }
  }

  async enviar(notificacion: Notificacion): Promise<void> {
    try {
      await this.enviarViaFirebase(notificacion);
    } catch (err) {
      console.error(" Error inesperado en NotificadorPush:", err);
    }
  }

  getNombreCanal(): string {
    return "Push";
  }
}
