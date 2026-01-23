import { NextResponse } from 'next/server';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export const dashboardService = {
  async getReports() {
    try {
      const response = await fetch(`${backendUrl}/dashboard/reports`, { method: 'GET' });
      const data = await response.json();

      if (data) {
        return NextResponse.json({ success: true, reports: data.reports || [] });
      }

      return NextResponse.json({ success: false, message: 'No data' }, { status: 500 });
    } catch (error) {
      return NextResponse.json({ success: false, message: 'Backend connection error' }, { status: 500 });
    }
  },

  async exportReport(format = 'csv') {
    try {
      const response = await fetch(`${backendUrl}/dashboard/export?format=${encodeURIComponent(format)}`, { method: 'GET' });
      const data = await response.json();
      return NextResponse.json({ success: true, data });
    } catch (error) {
      return NextResponse.json({ success: false, message: 'Export failed' }, { status: 500 });
    }
  },

  async clearLogs() {
    try {
      const response = await fetch(`${backendUrl}/dashboard/logs/clear`, { method: 'POST' });
      const data = await response.json();
      return NextResponse.json({ success: data.success ?? true, message: data.message ?? 'Logs cleared' });
    } catch (error) {
      return NextResponse.json({ success: false, message: 'Clear logs failed' }, { status: 500 });
    }
  },

  async getConfigs() {
    try {
      const response = await fetch(`${backendUrl}/dashboard/configs`, { method: 'GET' });
      const data = await response.json();
      return NextResponse.json({ success: true, configs: data.configs || [] });
    } catch (error) {
      return NextResponse.json({ success: false, message: 'Failed to load configs' }, { status: 500 });
    }
  },

  async addConfig(payload: any) {
    try {
      const response = await fetch(`${backendUrl}/dashboard/configs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    } catch (error) {
      return NextResponse.json({ success: false, message: 'Create config failed' }, { status: 500 });
    }
  },

  async editConfig(id: string | number, payload: any) {
    try {
      const response = await fetch(`${backendUrl}/dashboard/configs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    } catch (error) {
      return NextResponse.json({ success: false, message: 'Edit config failed' }, { status: 500 });
    }
  },

  async deleteConfig(id: string | number) {
    try {
      const response = await fetch(`${backendUrl}/dashboard/configs/${id}`, { method: 'DELETE' });
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    } catch (error) {
      return NextResponse.json({ success: false, message: 'Delete config failed' }, { status: 500 });
    }
  },

  async setDefaultConfig(id: string | number) {
    try {
      const response = await fetch(`${backendUrl}/dashboard/configs/${id}/default`, { method: 'POST' });
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    } catch (error) {
      return NextResponse.json({ success: false, message: 'Set default failed' }, { status: 500 });
    }
  },

  async sendEmails(payload: any) {
    try {
      const response = await fetch(`${backendUrl}/dashboard/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    } catch (error) {
      return NextResponse.json({ success: false, message: 'Send failed' }, { status: 500 });
    }
  },

  async cancelScheduledJob(jobId: string | number) {
    try {
      const response = await fetch(`${backendUrl}/dashboard/scheduled/${jobId}/cancel`, { method: 'POST' });
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    } catch (error) {
      return NextResponse.json({ success: false, message: 'Cancel job failed' }, { status: 500 });
    }
  }
};
