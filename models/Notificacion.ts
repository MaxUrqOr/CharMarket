import { TipoEvento } from "@/models/TipoEvento";

export class Notificacion {
  private email: string;
  private telefono: string;
  private pushToken: string;
  private asunto: string;
  private mensaje: string;
  private tipo: TipoEvento;
  private metadatos: Map<string, string>;

  constructor(
    email: string,
    telefono: string,
    pushToken: string,
    asunto: string,
    mensaje: string,
    tipo: TipoEvento
  ) {
    this.email = email;
    this.telefono = telefono;
    this.pushToken = pushToken;
    this.asunto = asunto;
    this.mensaje = mensaje;
    this.tipo = tipo;
    this.metadatos = new Map();
  }

  getEmail(): string {
    return this.email;
  }

  getTelefono(): string {
    return this.telefono;
  }

  getPushToken(): string {
    return this.pushToken;
  }

  getAsunto(): string {
    return this.asunto;
  }

  getMensaje(): string {
    return this.mensaje;
  }

  getTipoEvento(): TipoEvento {
    return this.tipo;
  }

  agregarMetadata(key: string, value: string): void {
    this.metadatos.set(key, value);
  }
}
