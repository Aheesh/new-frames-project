import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';
import { addHyperFrame, getHyperFrame } from '../../hyperframes';

addHyperFrame('start', {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'Player A',
      },
      {
        label: 'Player B',
      },
      {
        label: 'Draw ',
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/game1.webp`,
      aspectRatio: '1:1',
    },
    state: { frame: 'start' },
    postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
  }),
  1: 'Player-A',
  2: 'Player-B',
  3: 'Draw',
});

addHyperFrame('Player-A', {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'XL DEGEN',
      },
      {
        label: 'XXL DEGEN',
      },
      {
        label: 'XXXL DEGEN',
      },
      {
        label: 'CANCEL',
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/woods-bear.png`,
      aspectRatio: '1:1',
    },
    state: { frame: 'Player-A' },
    postUrl: `${NEXT_PUBLIC_URL}/api/approve`,
  }),
  1: 'approve',
  2: 'approve',
  3: 'approve',
  4: 'start',
});

addHyperFrame('Player-B', {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'XL DEGEN',
      },
      {
        label: 'XXL DEGEN',
      },
      {
        label: 'XXXL DEGEN',
      },
      {
        label: 'CANCEL',
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/cave-1.png`,
      aspectRatio: '1:1',
    },
    state: { frame: 'Player-B' },
    postUrl: `${NEXT_PUBLIC_URL}/api/approve`,
  }),
  1: 'approve',
  2: 'approve',
  3: 'approve',
  4: 'start',
});

addHyperFrame('Draw', {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'XL DEGEN',
      },
      {
        label: 'XXL DEGEN',
      },
      {
        label: 'XXXL DEGEN',
      },
      {
        label: 'CANCEL',
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/cave-2.png`,
      aspectRatio: '1:1',
    },
    state: { frame: 'Draw' },
    postUrl: `${NEXT_PUBLIC_URL}/api/approve`,
  }),
  1: 'approve',
  2: 'approve',
  3: 'approve',
  4: 'start',
});

async function getResponse(req: NextRequest): Promise<NextResponse> {
  console.log('Frame endpoint');

  let accountAddress: string | undefined = '';
  let text: string | undefined = '';

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  } else {
    return new NextResponse('Message not valid', { status: 500 });
  }

  if (message?.input) {
    text = message.input;
  }

  let state = { frame: 'start' };

  try {
    state = JSON.parse(decodeURIComponent(message.state?.serialized));
  } catch (e) {
    console.error(e);
  }

  const frame = state.frame;
  console.log('state', message.state);
  console.log('frame', frame);

  // TODO: Cleanup this error handling
  if (!frame) {
    return new NextResponse('Frame not found', { status: 404 });
  }

  // There should always be a button number
  if (!message?.button) {
    return new NextResponse('Button not found', { status: 404 });
  }

  return new NextResponse(getHyperFrame(frame as string, text || '', message?.button));
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
