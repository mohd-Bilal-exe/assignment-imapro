import { NextRequest, NextResponse } from 'next/server';
import { dashboardService } from '@/lib/dashboardService';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    return await dashboardService.sendEmails(payload);
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Send emails failed' }, { status: 500 });
  }
}
