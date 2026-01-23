import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/authService';

export async function POST(request: NextRequest) {
  try {
    return await authService.logout();
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Logout failed' },
      { status: 500 }
    );
  }
}