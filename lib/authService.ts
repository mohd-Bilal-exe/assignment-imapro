import { NextResponse } from 'next/server';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export const authService = {
  async login(email: string, password: string) {
    try {
      const response = await fetch(`${backendUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        const token = data.token || `token_${Date.now()}_${Math.random()}`;
        
        const result = NextResponse.json({
          success: true,
          message: 'Login successful',
          user: data.user
        });

        result.cookies.set('session_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 24 * 60 * 60,
          path: '/'
        });

        return result;
      } else {
        return NextResponse.json(
          { success: false, message: data.message || 'Invalid email or password' },
          { status: 401 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Backend connection error' },
        { status: 500 }
      );
    }
  },

  async register(name: string, email: string, password: string) {
    try {
      const response = await fetch(`${backendUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (data.success) {
        const token = data.token || `token_${Date.now()}_${Math.random()}`;
        
        const result = NextResponse.json({ 
          success: true, 
          message: 'Account created successfully',
          user: data.user
        });

        result.cookies.set('session_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 24 * 60 * 60,
          path: '/'
        });

        return result;
      } else {
        return NextResponse.json(
          { success: false, message: data.message || 'Registration failed' },
          { status: data.status || 400 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Backend connection error' },
        { status: 500 }
      );
    }
  },

  async logout() {
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    });

    response.cookies.delete('session_token');
    return response;
  },

  async me(token?: string) {
    if (!token) {
      return NextResponse.json(
        { success: false, authenticated: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    try {
      const response = await fetch(`${backendUrl}/auth/me`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      const data = await response.json();
      
      if (data.success) {
        return NextResponse.json({
          success: true,authenticated: true,
          user: data.user
        });
      } else {
        return NextResponse.json(
          { success: false, authenticated: false, message: 'Session expired' },
          { status: 401 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { success: false,authenticated: false, message: 'Backend connection error' },
        { status: 500 }
      );
    }
  }
};