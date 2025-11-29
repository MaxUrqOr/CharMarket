import { TipoEvento } from '@/models/TipoEvento';
import { Notificador } from '@/strategies/Notificador.interface';
import { NotificadorEmail } from '@/strategies/NotificadorEmail';
import { NotificadorPush } from '@/strategies/NotificadorPush';
import { NotificadorSMS } from '@/strategies/NotificadorSMS';
import { NotificadorWhatsApp } from '@/strategies/NotificadorWhatsApp';

export class ConfiguradorCanales {
  private configuracionEventos: Map<TipoEvento, Notificador[]> = new Map();

  inicializarConfiguracion(): void {
    this.configuracionEventos.set(TipoEvento.NUEVO_PEDIDO, [
      new NotificadorEmail()
    ]);

    this.configuracionEventos.set(TipoEvento.CONFIRMACION_PEDIDO, [
      new NotificadorSMS(),
    ]);

    this.configuracionEventos.set(TipoEvento.MANTENIMIENTO, [
      new NotificadorWhatsApp(),
    ]);

    this.configuracionEventos.set(TipoEvento.PROMOCION, [
      new NotificadorPush(),
    ]);

    this.configuracionEventos.set(TipoEvento.STOCK_MINIMO, [
      new NotificadorEmail(),
      new NotificadorSMS(),
      new NotificadorWhatsApp()
    ]);
  }

  configurarEvento(tipoEvento: TipoEvento, notificadores: Notificador[]): void {
    this.configuracionEventos.set(tipoEvento, notificadores);
  }

  obtenerCanales(tipoEvento: TipoEvento): Notificador[] {
    return this.configuracionEventos.get(tipoEvento) || [];
  }

  obtenerConfiguracion(): Map<TipoEvento, string[]> {
    const configStr = new Map<TipoEvento, string[]>();
    this.configuracionEventos.forEach((notificadores, evento) => {
      configStr.set(evento, notificadores.map(n => n.getNombreCanal()));
    });
    return configStr;
  }
}