export class ApiError extends Error {
  public statusCode: number

  constructor(message: string, statusCode: number = 500) {
    super(message)
    this.statusCode = statusCode
    this.name = 'ApiError'
  }
}

export function handleApiError(error: unknown): { message: string; statusCode: number } {
  if (error instanceof ApiError) {
    return { message: error.message, statusCode: error.statusCode }
  }

  if (error instanceof Error) {
    return { message: error.message, statusCode: 500 }
  }

  return { message: 'An unexpected error occurred', statusCode: 500 }
}
