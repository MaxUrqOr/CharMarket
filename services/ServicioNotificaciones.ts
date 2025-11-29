import { Notificacion } from '@/models/Notificacion';
import { TipoEvento } from '@/models/TipoEvento';
import { Notificador } from '@/strategies/Notificador.interface';
import { ConfiguradorCanales } from './ConfiguradorCanales';

export class ServicioNotificaciones {
  private configurador: ConfiguradorCanales;

  constructor() {
    this.configurador = new ConfiguradorCanales();
    this.configurador.inicializarConfiguracion();
  }

  // 🔥 Enviar múltiples notificaciones según canal (nuevo UML)
  async enviarNotificacionesPorCanal(
    destinatarios: Record<string, string>,
    asunto: string,
    mensaje: string,
    tipo: TipoEvento
  ): Promise<void> {

    const canales = this.configurador.obtenerCanales(tipo);

    const envios = canales.map(async (canal) => {
      const nombreCanal = canal.getNombreCanal(); // "Email", "SMS", "WhatsApp", "Push"
      const destinatario = destinatarios[nombreCanal];

      if (!destinatario) {
        console.warn(`⚠ Canal ${nombreCanal} no tiene destinatario. Se omite.`);
        return;
      }

      // === NUEVO UML ===
      let email = "";
      let telefono = "";
      let pushToken = "";

      switch (nombreCanal) {
        case "Email":
          email = destinatario;
          break;

        case "SMS":
        case "WhatsApp":
          telefono = destinatario;
          break;

        case "Push":
          pushToken = destinatario;
          break;
      }

      const notificacion = new Notificacion(
        email,
        telefono,
        pushToken,
        asunto,
        mensaje,
        tipo
      );

      await canal.enviar(notificacion);
    });

    await Promise.all(envios);
  }

  // Compatibilidad con envíos antiguos (una sola notificación)
  async enviarNotificacion(notificacion: Notificacion): Promise<void> {
    const canales = this.configurador.obtenerCanales(notificacion.getTipoEvento());
    await Promise.all(canales.map(canal => canal.enviar(notificacion)));
  }

  configurarEvento(tipoEvento: TipoEvento, notificadores: Notificador[]): void {
    this.configurador.configurarEvento(tipoEvento, notificadores);
  }

  obtenerConfiguracion(): Map<TipoEvento, string[]> {
    return this.configurador.obtenerConfiguracion();
  }
}
