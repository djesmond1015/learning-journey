import { NextResponse } from 'next/server';

const sleep = async () => {
  new Promise((resolve) => {
    setTimeout(resolve, Math.random() * 4000);
  });
};

export async function POST(req: Request, res: Response) {
  try {
    await sleep();
    return NextResponse.json({ message: 'Hello World' });
  } catch (error) {}
}
