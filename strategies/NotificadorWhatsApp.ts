import { Notificacion } from '@/models/Notificacion';
import { Notificador } from './Notificador.interface';
import { twilioClient, twilioWhatsAppNumber } from '@/config/twilio.config';

export class NotificadorWhatsApp implements Notificador {

  private async enviarViaTwilio(notificacion: Notificacion): Promise<void> {
    const numero = notificacion.getTelefono();

    if (!numero || !numero.startsWith("+")) {
      console.warn(` [WhatsApp] Número inválido: ${numero}`);
      return;
    }

    if (!twilioClient) {
      console.warn(" [WhatsApp] Twilio no está configurado.");
      return;
    }

    if (!twilioWhatsAppNumber || !twilioWhatsAppNumber.startsWith("whatsapp:")) {
      console.warn(` [WhatsApp] Número de Twilio inválido: ${twilioWhatsAppNumber}`);
      return;
    }

    try {
      const message = await twilioClient.messages.create({
        from: twilioWhatsAppNumber,
        to: `whatsapp:${numero}`,
        body: `${notificacion.getAsunto()} - ${notificacion.getMensaje()}`
      });

      console.log(` [WhatsApp] Enviado a ${numero} (SID: ${message.sid})`);

    } catch (error) {
      console.error(` [WhatsApp] Error enviando a ${numero}:`, error);
    }
  }

  async enviar(notificacion: Notificacion): Promise<void> {
    try {
      await this.enviarViaTwilio(notificacion);
    } catch (error) {
      console.error(" Error inesperado en NotificadorWhatsApp:", error);
    }
  }

  getNombreCanal(): string {
    return "WhatsApp";
  }
}
