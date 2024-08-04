//Approve DEGEN token from wallet , amount based on previous frame button and player / draw outcome from 1st frame.
// fetch accountAddress
// fetch button # for amount *10**2 * 10**18
// Player A / B / Draw from message.state
// tx to approve DEGEN token transfer and spend

import { NextRequest, NextResponse } from 'next/server';
import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  console.log('api/approve/route.ts : Approve endpoint');

  let accountAddress: string | undefined = '';

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  } else {
    return new NextResponse('Message not valid', { status: 500 });
  }

  let state = { frame: 'start' };

  try {
    state = JSON.parse(decodeURIComponent(message.state?.serialized));
  } catch (e) {
    console.error(e);
  }
  console.log('api/approveTx/route.ts :accountAddress =>', accountAddress);

  const frame = state.frame;
  console.log('api/approveTx/route.ts :state =>', message.state);
  console.log('api/approveTx/route.ts :frame =>', frame);

  if (!frame) {
    return new NextResponse('Frame not found', { status: 404 });
  }

  // There should always be a button number
  if (!message?.button) {
    return new NextResponse('Button not found', { status: 404 });
  }
  console.log('api/approveTx/route.ts : message =>', message);
  console.log('api/approveTx/route.ts : button =>', message.button);

  return new NextResponse('Approve', { status: 200 }); // TODO
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
