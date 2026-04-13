import { NextResponse } from 'next/server';

// Forzamos a Next.js a no cachear la ruta a nivel compilación
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Estas variables viven en la memoria RAM del servidor
let cachedDiscordData: any = null;
let lastFetchTime = 0;
const CACHE_DURATION = 4000; // 4 segundos — refresca casi en tiempo real sin martillar a Discord

export async function GET() {
  const now = Date.now();

  // Escudo: Si tenemos datos y no pasó el minuto, entregamos desde RAM a todos al instante
  if (cachedDiscordData && (now - lastFetchTime < CACHE_DURATION)) {
    return NextResponse.json(cachedDiscordData);
  }

  try {
    const timestamp = new Date().getTime();
    // Le pedimos a Discord con "no-store" para asegurar datos frescos
    const res = await fetch(`https://discord.com/api/guilds/730941554537005137/widget.json?t=${timestamp}`, {
      cache: 'no-store',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json'
      }
    });

    if (!res.ok) {
      // Si Discord rechaza (ej: 429), devolvemos la última info que tengamos en RAM
      if (cachedDiscordData) return NextResponse.json(cachedDiscordData);
      return NextResponse.json({ errorMensaje: `DISCORD ERROR: ${res.status}` }, { status: res.status });
    }
    
    const data = await res.json();
    
    // Guardamos en la RAM y actualizamos el cronómetro
    cachedDiscordData = data;
    lastFetchTime = now;
    
    return NextResponse.json(data);
  } catch (error) {
    if (cachedDiscordData) return NextResponse.json(cachedDiscordData);
    return NextResponse.json({ errorMensaje: 'ERROR DE RED EN SERVIDOR' }, { status: 500 });
  }
}