// src/app/api/log/route.js
import { log } from '@/app/lib/logger';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { message } = await req.json();
  log('[CLIENT] ' + message);
  return NextResponse.json({ success: true });
}
