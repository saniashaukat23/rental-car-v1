import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';

export async function GET() {
  try {
    const startTime = Date.now();
    await dbConnect();
    const duration = Date.now() - startTime;

    return NextResponse.json({
      status: 'ok',
      database: 'connected',
      responseTime: `${duration}ms`,
      serverIp: '159.41.171.196',
      message: 'If you see this, your database connection is working!',
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json({
      status: 'error',
      database: 'failed',
      error: errorMessage,
      troubleshooting: {
        issue: 'MongoDB connection timeout',
        solution: 'Add 159.41.171.196 to MongoDB Atlas Network Access',
        steps: [
          'Go to https://cloud.mongodb.com',
          'Click on your project',
          'Go to Network Access (left sidebar)',
          'Click + ADD IP ADDRESS',
          'Enter 159.41.171.196 or use 0.0.0.0/0 (allow all)',
          'Click Confirm',
          'Restart the server'
        ]
      }
    }, { status: 503 });
  }
}
