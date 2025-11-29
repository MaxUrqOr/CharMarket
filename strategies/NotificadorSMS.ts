import { Notificacion } from '@/models/Notificacion';
import { Notificador } from './Notificador.interface';
import { twilioClient, twilioPhoneNumber } from '@/config/twilio.config';

export class NotificadorSMS implements Notificador {

  private async enviarViaTwilio(notificacion: Notificacion): Promise<void> {
    const numero = notificacion.getTelefono();

    if (!numero || !numero.startsWith("+")) {
      console.warn(` [SMS] Número inválido: ${numero}`);
      return;
    }

    if (!twilioClient) {
      console.warn(" [SMS] Twilio no está configurado.");
      return;
    }

    try {
      const msg = await twilioClient.messages.create({
        from: twilioPhoneNumber,
        to: numero,
        body: `${notificacion.getAsunto()} - ${notificacion.getMensaje()}`
      });

      console.log(` [SMS] Enviado a: ${numero} (SID: ${msg.sid})`);
    } catch (error) {
      console.error(` [SMS] Error enviando mensaje a ${numero}:`, error);
    }
  }

  async enviar(notificacion: Notificacion): Promise<void> {
    try {
      await this.enviarViaTwilio(notificacion);
    } catch (err) {
      console.error(" Error inesperado en NotificadorSMS:", err);
    }
  }

  getNombreCanal(): string {
    return "SMS";
  }
}
