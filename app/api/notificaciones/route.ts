import { NextResponse } from 'next/server';
import { ServicioNotificaciones } from '@/services/ServicioNotificaciones';

// Instancia única del servicio
const servicioNotificaciones = new ServicioNotificaciones();

// --- POST: enviar notificaciones ---
export async function POST(request: Request) {
  try {
    let body: any;

    // Validación de JSON
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'El body debe ser JSON válido.' },
        { status: 400 }
      );
    }

    const { email, telefono, pushToken, asunto, mensaje, tipoEvento } = body;

    // Validar campos requeridos
    if (!asunto || !mensaje || !tipoEvento) {
      return NextResponse.json(
        { error: "Faltan campos requeridos: asunto, mensaje o tipoEvento." },
        { status: 400 }
      );
    }

    // Validar que al menos un canal tenga dato
    if (
      (!email || email.trim() === "") &&
      (!telefono || telefono.trim() === "") &&
      (!pushToken || pushToken.trim() === "")
    ) {
      return NextResponse.json(
        { error: "Debe proporcionar al menos un contacto: email, telefono o pushToken." },
        { status: 400 }
      );
    }

    // Construir objeto destinatarios según el canal
    const destinatarios: Record<string, string> = {};

    if (email && email.trim() !== "") destinatarios["Email"] = email.trim();
    if (telefono && telefono.trim() !== "") {
      destinatarios["SMS"] = telefono.trim();
      destinatarios["WhatsApp"] = telefono.trim(); // Usa el mismo número
    }
    if (pushToken && pushToken.trim() !== "") destinatarios["Push"] = pushToken.trim();

    // Enviar por canal
    await servicioNotificaciones.enviarNotificacionesPorCanal(
      destinatarios,
      asunto,
      mensaje,
      tipoEvento
    );

    return NextResponse.json({
      message: "Notificaciones enviadas correctamente",
      canales: Object.keys(destinatarios),
      tipoEvento
    });

  } catch (error) {
    console.error("[Error API] Error en la API de notificaciones:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido.";

    return NextResponse.json(
      { error: "Error al enviar notificación", details: errorMessage },
      { status: 500 }
    );
  }
}

// --- GET: obtener configuración actual de canales ---
export async function GET() {
  try {
    const configuracion = servicioNotificaciones.obtenerConfiguracion();

    const configObj: Record<string, string[]> = {};

    configuracion.forEach((canales, evento) => {
      configObj[evento] = canales;
    });

    return NextResponse.json(configObj);

  } catch (error) {
    console.error('[Error API] Error al obtener configuración:', error);

    return NextResponse.json(
      { error: 'Error al obtener la configuración' },
      { status: 500 }
    );
  }
}
