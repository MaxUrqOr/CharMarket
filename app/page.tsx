'use client';

import { useEffect, useState } from 'react';
import { TipoEvento } from '@/models/TipoEvento';
import { getAuth, signInAnonymously } from 'firebase/auth';

export default function Home() {
  const [config, setConfig] = useState<[string, string[]][]>([]);
  const [selectedEvent, setSelectedEvent] = useState<TipoEvento>(TipoEvento.CONFIRMACION_PEDIDO);

  const [destinatarios, setDestinatarios] = useState({
    email: "",
    telefono: "",
    pushToken: ""
  });

  const [asunto, setAsunto] = useState('¡Tu pedido ha sido confirmado!');
  const [mensaje, setMensaje] = useState('Gracias por tu compra. Tu pedido #12345 está siendo preparado.');
  const [canalesEvento, setCanalesEvento] = useState<string[]>([]);

  // Obtener la configuración de canales
  const fetchConfig = async () => {
    try {
      const response = await fetch('/api/notificaciones');
      if (response.ok) {
        const data = await response.json();
        setConfig(Object.entries(data));
      }
    } catch (error) {
      console.error("Error al obtener la configuración:", error);
    }
  };

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then(reg => console.log("✔️ Service Worker registrado:", reg))
        .catch(err => console.error("❌ Error registrando SW:", err));
    }
  }, []);

  // Obtener token FCM --> aun no se encuentra la causa de error al obtener el token
  useEffect(() => {
    fetchConfig();

    const autenticarYObtenerToken = async () => {
      try {
        const { app, obtenerTokenFCM } = await import("@/utils/firebaseClient");
        const auth = getAuth(app);
        await signInAnonymously(auth);
        console.log('Usuario autenticado anónimamente.');

        console.log("🔄 Llamando a obtenerTokenFCM()...");
        const token = await obtenerTokenFCM();
        console.log("📩 Token devuelto al componente:", token);
        if (token) {
          sessionStorage.setItem("fcm_token", token);
          // Actualizar el estado para que la UI refleje el nuevo token
          setDestinatarios(prev => ({ ...prev, pushToken: token }));
        } else {
          console.log('No se pudo obtener el token FCM.');
        }
      } catch (error) {
        console.error("Error durante la autenticación o la obtención del token:", error);
        alert(`Error al obtener token: ${(error as Error).message}`);
      }
    };

    autenticarYObtenerToken();
  }, []);

  useEffect(() => {
    const fila = config.find(([evento]) => evento === selectedEvent);
    const canales = fila ? fila[1] : [];

    setCanalesEvento(canales);

    const dest: any = {
      email: "",
      telefono: "",
      pushToken: ""
    };

    canales.forEach((canal) => {
      if (canal === "Email") dest.email = "";
      if (canal === "SMS" || canal === "WhatsApp") dest.telefono = "";
      if (canal === "Push") dest.pushToken = sessionStorage.getItem("fcm_token") || "";
    });

    setDestinatarios(dest);
  }, [selectedEvent, config]);

  // 🔥 Enviar notificación
  const handleSendNotification = async () => {
    const { email, telefono, pushToken } = destinatarios;

    if (!email && !telefono && !pushToken) {
      alert("Debe ingresar al menos un dato de contacto.");
      return;
    }

    const payload = {
      tipoEvento: selectedEvent,
      email: email || null,
      telefono: telefono || null,
      pushToken: pushToken || null,
      asunto,
      mensaje
    };

    try {
      const response = await fetch('/api/notificaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert('¡Notificación enviada exitosamente!');
      } else {
        const error = await response.json();
        alert(`Error al enviar notificación: ${error.details || error.error}`);
      }
    } catch (error) {
      console.error("Error al enviar notificación:", error);
      alert('Ocurrió un error al contactar la API.');
    }
  };

  return (
    <main className="min-h-screen w-full bg-gray-950 text-gray-100 p-10">
      
      <div className="max-w-5xl mx-auto space-y-10">
  
        {/* ENCABEZADO */}
        <header className="text-center pb-6 border-b border-gray-700">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Centro de Notificaciones
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Envía notificaciones por Email, SMS, WhatsApp o Push.
          </p>
        </header>
  
        {/* FORMULARIO */}
        <section className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 p-8 rounded-2xl shadow-xl space-y-6">
          
          <h2 className="text-3xl font-semibold text-blue-300">Enviar Notificación</h2>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  
            {/* Tipo de Evento */}
            <div className="space-y-2">
              <label className="text-gray-300 text-sm">Tipo de Evento</label>
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value as TipoEvento)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {Object.values(TipoEvento).map(evento => (
                  <option key={evento} value={evento}>{evento}</option>
                ))}
              </select>
            </div>

            {/* Destinatarios */}
            {canalesEvento.includes("Email") && (
              <div className="space-y-2">
                <label className="text-gray-300 text-sm">Correo Electrónico</label>
                <input
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={destinatarios.email}
                  onChange={(e) => setDestinatarios(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2"
                />
              </div>
            )}

            {(canalesEvento.includes("SMS") || canalesEvento.includes("WhatsApp")) && (
              <div className="space-y-2">
                <label className="text-gray-300 text-sm">Número de Teléfono</label>
                <input
                  type="text"
                  placeholder="+51999999999"
                  value={destinatarios.telefono}
                  onChange={(e) => setDestinatarios(prev => ({ ...prev, telefono: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2"
                />
              </div>
            )}

            {canalesEvento.includes("Push") && (
              <div className="space-y-2">
                <label className="text-gray-300 text-sm">Token Push FCM</label>
                <input
                  type="text"
                  disabled
                  value={destinatarios.pushToken}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-gray-400"
                />
                <p className="text-gray-500 text-xs">Token obtenido automáticamente.</p>
              </div>
            )}
  
            {/* Asunto */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-gray-300 text-sm">Asunto</label>
              <input
                type="text"
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2"
              />
            </div>
  
            {/* Mensaje */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-gray-300 text-sm">Mensaje</label>
              <textarea
                rows={4}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3"
              />
            </div>
          </div>
  
          {/* Botón */}
          <div className="pt-4 flex justify-end">
            <button
              onClick={handleSendNotification}
              className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded-xl font-semibold shadow-lg shadow-blue-900/40"
            >
              Enviar Notificación
            </button>
          </div>
        </section>
  
        {/* CONFIGURACIÓN */}
        <section className="bg-gray-900/50 border border-gray-800 p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-semibold mb-4 text-blue-300">Configuración de Canales por Evento</h2>
  
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
              <thead className="bg-gray-700 text-gray-300">
                <tr>
                  <th className="py-3 px-4 text-left">Evento</th>
                  <th className="py-3 px-4 text-left">Canales</th>
                </tr>
              </thead>
              <tbody>
                {config.map(([evento, canales], index) => (
                  <tr
                    key={evento}
                    className={index % 2 === 0 ? "bg-gray-800/70" : "bg-gray-800/40"}
                  >
                    <td className="py-3 px-4">{evento}</td>
                    <td className="py-3 px-4">{canales.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
  
      </div>
    </main>
  );
}
