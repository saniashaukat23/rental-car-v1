import { NextRequest, NextResponse } from 'next/server';

interface RateLimitStore {
    [key: string]: {
        count: number;
        resetTime: number;
    };
}

const store: RateLimitStore = {};

// Clean up old entries every 5 minutes
setInterval(() => {
    const now = Date.now();
    Object.keys(store).forEach((key) => {
        if (store[key].resetTime < now) {
            delete store[key];
        }
    });
}, 5 * 60 * 1000);

export interface RateLimitConfig {
    interval: number; // Time window in milliseconds
    uniqueTokenPerInterval: number; // Max requests per interval
}

/**
 * Simple in-memory rate limiter
 * For production, consider using Redis or a dedicated rate limiting service
 */
export async function rateLimit(
    request: NextRequest,
    config: RateLimitConfig = {
        interval: 60 * 1000, // 1 minute
        uniqueTokenPerInterval: 10, // 10 requests per minute
    }
): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
    // Get client identifier (IP address)
    const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown';
    const key = `${ip}:${request.nextUrl.pathname}`;

    const now = Date.now();
    const resetTime = now + config.interval;

    if (!store[key] || store[key].resetTime < now) {
        // First request or window expired
        store[key] = {
            count: 1,
            resetTime,
        };
        return {
            success: true,
            limit: config.uniqueTokenPerInterval,
            remaining: config.uniqueTokenPerInterval - 1,
            reset: resetTime,
        };
    }

    store[key].count += 1;

    const success = store[key].count <= config.uniqueTokenPerInterval;

    return {
        success,
        limit: config.uniqueTokenPerInterval,
        remaining: Math.max(0, config.uniqueTokenPerInterval - store[key].count),
        reset: store[key].resetTime,
    };
}

/**
 * Rate limit middleware wrapper
 * Returns 429 Too Many Requests if limit exceeded
 */
export function withRateLimit(
    handler: (request: NextRequest, ...args: any[]) => Promise<NextResponse>,
    config?: RateLimitConfig
) {
    return async (request: NextRequest, ...args: any[]): Promise<NextResponse> => {
        const limitResult = await rateLimit(request, config);

        // Add rate limit headers to response
        const headers = {
            'X-RateLimit-Limit': limitResult.limit.toString(),
            'X-RateLimit-Remaining': limitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(limitResult.reset).toISOString(),
        };

        if (!limitResult.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Too many requests. Please try again later.',
                },
                {
                    status: 429,
                    headers: {
                        ...headers,
                        'Retry-After': Math.ceil((limitResult.reset - Date.now()) / 1000).toString(),
                    },
                }
            );
        }

        const response = await handler(request, ...args);

        // Add rate limit headers to successful response
        Object.entries(headers).forEach(([key, value]) => {
            response.headers.set(key, value);
        });

        return response;
    };
}
