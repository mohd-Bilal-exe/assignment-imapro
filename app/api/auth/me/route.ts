import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { authService } from '@/lib/authService';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    return await authService.me(token);
  } catch (error) {
    return NextResponse.json(
      { success: false, authenticated: false, message: 'Auth check failed' },
      { status: 500 }
    );
  }
}
