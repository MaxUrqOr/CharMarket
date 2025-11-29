import { Notificacion } from '@/models/Notificacion';
import { Notificador } from './Notificador.interface';
import { sendGridClient, fromEmail } from '@/config/email.config';

export class NotificadorEmail implements Notificador {

  private async enviarViaSendGrid(notificacion: Notificacion): Promise<void> {
    const email = notificacion.getEmail();

    if (!email || !email.includes("@")) {
      console.warn(` [Email] Email inválido: ${email}`);
      return;
    }

    if (!sendGridClient) {
      console.warn(" [Email] SendGrid no está configurado.");
      return;
    }

    const msg = {
      to: email,
      from: fromEmail,
      subject: notificacion.getAsunto(),
      html: `
        <h2>${notificacion.getAsunto()}</h2>
        <p>${notificacion.getMensaje()}</p>
      `
    };

    try {
      await sendGridClient.send(msg);
      console.log(` [Email] Enviado a: ${email}`);
    } catch (error) {
      console.error(` [Email] Error enviando email a ${email}:`, error);
    }
  }

  async enviar(notificacion: Notificacion): Promise<void> {
    try {
      await this.enviarViaSendGrid(notificacion);
    } catch (err) {
      console.error(" Error inesperado en NotificadorEmail:", err);
    }
  }

  getNombreCanal(): string {
    return "Email";
  }
}
