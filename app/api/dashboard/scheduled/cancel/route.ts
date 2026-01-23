import { NextRequest, NextResponse } from 'next/server';
import { dashboardService } from '@/lib/dashboardService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const jobId = body?.jobId;
    if (!jobId) {
      return NextResponse.json({ success: false, message: 'jobId required' }, { status: 400 });
    }

    return await dashboardService.cancelScheduledJob(jobId);
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Cancel scheduled job failed' }, { status: 500 });
  }
}
