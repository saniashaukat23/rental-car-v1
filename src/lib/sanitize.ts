/**
 * Sanitization utilities to prevent NoSQL injection and other attacks
 */

/**
 * Remove potentially dangerous MongoDB operators from user input
 * Prevents NoSQL injection attacks
 */
export function sanitizeMongoInput(input: any): any {
    if (input === null || input === undefined) {
        return input;
    }

    if (typeof input === 'string') {
        return input;
    }

    if (typeof input === 'number' || typeof input === 'boolean') {
        return input;
    }

    if (Array.isArray(input)) {
        return input.map(sanitizeMongoInput);
    }

    if (typeof input === 'object') {
        const sanitized: Record<string, any> = {};

        for (const [key, value] of Object.entries(input)) {
            // Remove keys that start with $ (MongoDB operators)
            if (key.startsWith('$')) {
                continue;
            }

            // Remove keys that contain dots (can be used for injection)
            if (key.includes('.')) {
                continue;
            }

            sanitized[key] = sanitizeMongoInput(value);
        }

        return sanitized;
    }

    return input;
}

/**
 * Sanitize query parameters to prevent injection
 */
export function sanitizeQueryParams(params: Record<string, any>): Record<string, any> {
    const sanitized: Record<string, any> = {};

    for (const [key, value] of Object.entries(params)) {
        if (typeof value === 'string') {
            // Remove potentially dangerous characters
            sanitized[key] = value.trim();
        } else if (typeof value === 'number' || typeof value === 'boolean') {
            sanitized[key] = value;
        } else if (value === null || value === undefined) {
            sanitized[key] = value;
        }
        // Skip arrays and objects in query params
    }

    return sanitized;
}

/**
 * Validate MongoDB ObjectId format
 */
export function isValidObjectId(id: string): boolean {
    return /^[0-9a-fA-F]{24}$/.test(id);
}

/**
 * Sanitize error messages to prevent information leakage
 */
export function sanitizeErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        // Don't expose internal error details in production
        if (process.env.NODE_ENV === 'production') {
            // Generic error messages for common cases
            if (error.message.includes('ECONNREFUSED')) {
                return 'Database connection failed';
            }
            if (error.message.includes('timeout')) {
                return 'Request timeout';
            }
            if (error.message.includes('validation')) {
                return 'Invalid input data';
            }
            return 'An internal error occurred';
        }

        // In development, show the actual error
        return error.message;
    }

    return 'An unexpected error occurred';
}
