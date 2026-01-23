import { NextRequest, NextResponse } from 'next/server';
import { dashboardService } from '@/lib/dashboardService';

export async function GET() {
  try {
    return await dashboardService.getReports();
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to fetch reports' }, { status: 500 });
  }
}
