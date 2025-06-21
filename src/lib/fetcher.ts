export type FetchOptions = RequestInit & {
  headers?: Record<string, string>;
};

const STATIC_TOKEN =
  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2F6YWRlYS1hcGkueXRlY2guc3lzdGVtcy9hcGkvYXV0aC9sb2dpbiIsImlhdCI6MTc1MDQ4MTUxNiwiZXhwIjoxNzgyMDE3NTE2LCJuYmYiOjE3NTA0ODE1MTYsImp0aSI6Ik1BdEl0em8zQ1pveEM4SEkiLCJzdWIiOiIyIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.Aedc5bjsX316YUBMsQCaFqFN6h85YAYX_eVBa0v1lLk";

export async function fetcher<T = any>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const res = await fetch(url, {
    method: "GET",
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: STATIC_TOKEN,
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Fetch error: ${res.status} ${res.statusText}`
    );
  }

  return res.json();
}
