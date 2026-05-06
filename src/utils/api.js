const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const buildHeaders = (headers, token, hasBody) => {
  const merged = {
    ...(hasBody ? { 'Content-Type': 'application/json' } : {}),
    ...headers,
  };

  if (token) {
    merged.Authorization = `Bearer ${token}`;
  }

  return merged;
};

export const apiRequest = async (path, options = {}, token) => {
  const hasBody = options.body !== undefined;
  const response = await fetch(`${API_URL}${path}`, {
    method: options.method || 'GET',
    headers: buildHeaders(options.headers, token, hasBody),
    body: hasBody ? JSON.stringify(options.body) : undefined,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
};
