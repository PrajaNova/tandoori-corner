function isErrorWithCode(error: unknown, code: string): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === code
  );
}

// Prisma known request errors: P2002 unique constraint, P2025 record not found.
export const isUniqueViolation = (error: unknown) =>
  isErrorWithCode(error, "P2002");
export const isNotFound = (error: unknown) => isErrorWithCode(error, "P2025");
