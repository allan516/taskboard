import type { HttpError } from './httpError';

function isHttpError(error: unknown): error is HttpError {
  return (
    error instanceof Error &&
    'status' in error &&
    typeof error.status === 'number'
  );
}

export { isHttpError };
