// 타입 안전 fetch 래퍼

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
}

async function request<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { body, headers, ...rest } = options;

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  });

  if (!res.ok) {
    const message = await res.text().catch(() => `HTTP ${res.status}`);
    throw new ApiError(res.status, message);
  }

  // 204 No Content
  if (res.status === 204) return undefined as T;

  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(url: string, options?: Omit<RequestOptions, 'body'>) =>
    request<T>(url, { method: 'GET', ...options }),

  post: <T>(url: string, body?: unknown, options?: Omit<RequestOptions, 'body'>) =>
    request<T>(url, { method: 'POST', body, ...options }),

  put: <T>(url: string, body?: unknown, options?: Omit<RequestOptions, 'body'>) =>
    request<T>(url, { method: 'PUT', body, ...options }),

  patch: <T>(url: string, body?: unknown, options?: Omit<RequestOptions, 'body'>) =>
    request<T>(url, { method: 'PATCH', body, ...options }),

  delete: <T>(url: string, options?: Omit<RequestOptions, 'body'>) =>
    request<T>(url, { method: 'DELETE', ...options }),
};
