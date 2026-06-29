export const ADMIN_SESSION_COOKIE = "tc_admin_session";

export async function adminSessionValue(token: string) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`tc-admin:${token}`),
  );
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

export function safeNextPath(value: FormDataEntryValue | string | null) {
  const next = typeof value === "string" ? value : "";
  return next.startsWith("/") && !next.startsWith("//") ? next : "/menu";
}
