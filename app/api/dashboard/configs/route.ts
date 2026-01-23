import { NextRequest, NextResponse } from 'next/server';
import { dashboardService } from '@/lib/dashboardService';

export async function GET() {
  try {
    return await dashboardService.getConfigs();
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to fetch configs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    return await dashboardService.addConfig(payload);
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Create config failed' }, { status: 500 });
  }
}
