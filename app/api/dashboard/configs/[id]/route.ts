import { NextRequest, NextResponse } from 'next/server';
import { dashboardService } from '@/lib/dashboardService';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const payload = await request.json();
    return await dashboardService.editConfig(params.id, payload);
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Edit config failed' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    return await dashboardService.deleteConfig(params.id);
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Delete config failed' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  // Used for actions such as set default
  try {
    const body = await request.json().catch(() => ({}));
    if (request.url?.endsWith('/default') || body.action === 'default') {
      return await dashboardService.setDefaultConfig(params.id);
    }

    return NextResponse.json({ success: false, message: 'Unknown action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Config action failed' }, { status: 500 });
  }
}
