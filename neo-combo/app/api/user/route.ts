import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/model/user';

export async function GET() {
  try {
    await connectToDatabase();
    const resources = await User.find({});
    return NextResponse.json({ success: true, data: resources }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const resource = await User.create(body);
    return NextResponse.json({ success: true, data: resource }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}