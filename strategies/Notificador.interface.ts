import { Notificacion } from '@/models/Notificacion';

export interface Notificador {
  enviar(notificacion: Notificacion): Promise<void>;
  getNombreCanal(): string;
}