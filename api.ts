const API_BASE_URL = 'http://localhost:8000/api/v1';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('access_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
      return { error: errorData.detail || 'Request failed' };
    }
    
    const data = await response.json();
    return { data };
  }

  async login(email: string, password: string): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    const result = await this.handleResponse(response);
    
    if (result.data) {
      localStorage.setItem('access_token', result.data.access_token);
      localStorage.setItem('refresh_token', result.data.refresh_token);
      localStorage.setItem('user', JSON.stringify(result.data.user));
    }
    
    return result;
  }

  async signup(userData: any): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    
    const result = await this.handleResponse(response);
    
    if (result.data) {
      localStorage.setItem('access_token', result.data.access_token);
      localStorage.setItem('refresh_token', result.data.refresh_token);
      localStorage.setItem('user', JSON.stringify(result.data.user));
    }
    
    return result;
  }

  async demoLogin(role: string): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/auth/demo-login?role=${role}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    
    const result = await this.handleResponse(response);
    
    if (result.data) {
      localStorage.setItem('access_token', result.data.access_token);
      localStorage.setItem('refresh_token', result.data.refresh_token);
      localStorage.setItem('user', JSON.stringify(result.data.user));
    }
    
    return result;
  }

  async getCurrentUser(): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      headers: this.getAuthHeaders(),
    });
    
    return this.handleResponse(response);
  }

  async getMyAppointments(): Promise<ApiResponse<any[]>> {
    const response = await fetch(`${API_BASE_URL}/appointments/my-appointments`, {
      headers: this.getAuthHeaders(),
    });
    
    return this.handleResponse(response);
  }

  async getDoctors(): Promise<ApiResponse<any[]>> {
    const response = await fetch(`${API_BASE_URL}/doctors/`, {
      headers: this.getAuthHeaders(),
    });
    
    return this.handleResponse(response);
  }

  async createAppointment(appointmentData: any): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/appointments/`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(appointmentData),
    });
    
    return this.handleResponse(response);
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }
}

export const apiService = new ApiService();