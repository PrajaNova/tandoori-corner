import { safeNextPath } from "@/lib/admin-session";

type LoginSearchParams = Promise<Record<string, string | string[] | undefined>>;

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: LoginSearchParams;
}) {
  const params = await searchParams;
  const next = safeNextPath(firstParam(params?.next) ?? null);
  const hasError = Boolean(firstParam(params?.error));

  return (
    <div className="mx-auto grid min-h-[70vh] max-w-sm place-items-center">
      <form
        action="/api/login"
        method="post"
        className="w-full rounded-xl border border-black/10 bg-white p-5 shadow-sm"
      >
        <h1 className="text-2xl font-semibold tracking-tight">Admin Login</h1>
        <input type="hidden" name="next" value={next} />
        <label className="mt-5 block">
          <span className="mb-1 block text-sm font-medium text-black/70">
            Admin token
          </span>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            className="input"
            required
          />
        </label>
        {hasError ? (
          <p className="mt-3 text-sm text-red-700">Invalid admin token.</p>
        ) : null}
        <button
          type="submit"
          className="mt-5 w-full rounded-full bg-[#bf5820] px-4 py-2 text-sm font-medium text-white hover:bg-[#9e4418]"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
