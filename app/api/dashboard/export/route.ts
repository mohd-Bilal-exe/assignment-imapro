import { NextRequest, NextResponse } from 'next/server';
import { dashboardService } from '@/lib/dashboardService';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const format = url.searchParams.get('format') || 'csv';
    return await dashboardService.exportReport(format);
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Export failed' }, { status: 500 });
  }
}
