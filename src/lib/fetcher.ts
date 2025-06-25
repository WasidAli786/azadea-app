import { cookies } from "next/headers";

export async function fetcher<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    throw new Error("Missing authentication token.");
  }

  const cookieHeader = `token=${token}`;

  const res = await fetch(`http://localhost:3000${endpoint}`, {
    method: "GET",
    headers: {
      Cookie: cookieHeader,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `Failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
