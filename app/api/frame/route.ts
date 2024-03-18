import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';
import { addHyperFrame, getHyperFrame } from '../../hyperframes';

addHyperFrame('start', {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'Road',
      },
      {
        label: 'Woods',
      },
      {
        label: 'Cave',
      },
      {
        action: 'link',
        label: 'TODO',
        target: 'https://www.google.com',
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/frame-1-forest.webp`,
      aspectRatio: '1:1',
    },
    postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=start`,
  }),
  1: 'road',
  2: 'woods-bear',
  3: 'cave-1',
});

addHyperFrame('woods-bear', {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'Go Back',
      },
      {
        label: 'TODO',
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/woods-bear.png`,
      aspectRatio: '1:1',
    },
    postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=woods-bear`,
  }),
  1: 'start',
  2: 'start',
});

addHyperFrame('cave-1', {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'Deeper...',
      },
      {
        label: 'Leave',
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/cave-1.png`,
      aspectRatio: '1:1',
    },
    postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=cave-1`,
  }),
  1: 'cave-2',
  2: 'start',
});

addHyperFrame('cave-2', {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'Deeper...',
      },
      {
        label: 'Leave',
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/cave-2.png`,
      aspectRatio: '1:1',
    },
    postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=cave-2`,
  }),
  1: 'cave-3',
  2: 'start',
});

addHyperFrame('cave-3', {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'Start Over',
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/cave-3.png`,
      aspectRatio: '1:1',
    },
    postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=cave-3`,
  }),
  1: 'start',
});

addHyperFrame('road', {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'Go Back',
      },
      {
        label: 'Shack',
      },
      {
        label: 'Forward',
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/road.png`,
      aspectRatio: '1:1',
    },
    postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=road`,
  }),
  1: 'start',
  2: 'shack',
  3: 'desert-road',
});

addHyperFrame('shack', {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'Go Back',
      },
      {
        label: 'Door',
      },
      {
        label: 'Testing',
      }
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/shack.png`,
      aspectRatio: '1:1',
    },
    input: {
      text: 'What is the password?',
    },
    postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=shack`,
  }),
  1: 'road',
  2: (text: string) => {
    return text === 'All our Base are belong to you' ? 'key' : 'shack-bad-password';
  },
  3: () => {
    return 'shack-bad-password';
  }
});

addHyperFrame('shack-bad-password', {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'Go Back',
      },
      {
        label: 'Door',
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/shack.png`,
      aspectRatio: '1:1',
    },
    input: {
      text: 'Try again. What is the password?',
    },
    postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=shack-bad-password`,
  }),
  1: 'road',
  2: (text: string) => {
    return text === 'All our Base are belong to you' ? 'key' : 'shack-bad-password';
  },
});

addHyperFrame('key', {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'Go Back',
      },
      {
        label: 'TODO',
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/key.png`,
      aspectRatio: '1:1',
    },
    postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=key`,
  }),
  1: 'shack',
});

addHyperFrame('desert-road', {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'Go Back',
      },
      {
        label: 'Go Forward',
      },
      {
        label: 'Desert',
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/desert-road.png`,
      aspectRatio: '1:1',
    },
    postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=desert-road`,
  }),
  1: 'road',
  2: 'mountain-road',
  3: 'desert-lost-1',
});

addHyperFrame('mountain-road', {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'Go Back',
      },
      {
        label: 'Go Forward',
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/mountain-road.png`,
      aspectRatio: '1:1',
    },
    postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=mountain-road`,
  }),
  1: 'desert-road',
  2: 'mountain-goat',
});

addHyperFrame('mountain-goat', {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'Go Back',
      },
      {
        label: 'TODO',
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/mountain-goat.png`,
      aspectRatio: '1:1',
    },
    postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=mountain-goat`,
  }),
  1: 'mountain-road',
  2: 'mountain-goat',
});

addHyperFrame('desert-lost-1', {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'North',
      },
      {
        label: 'South',
      },
      {
        label: 'East',
      },
      {
        label: 'West',
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/desert-lost.png`,
      aspectRatio: '1:1',
    },
    postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=desert-lost-1`,
  }),
  1: 'desert-road',
  2: 'desert-lost-2',
  3: 'desert-road',
  4: 'desert-road',
});

addHyperFrame('desert-lost-2', {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'North',
      },
      {
        label: 'South',
      },
      {
        label: 'East',
      },
      {
        label: 'West',
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/desert-lost.png`,
      aspectRatio: '1:1',
    },
    postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=desert-lost-2`,
  }),
  1: 'desert-road',
  2: 'desert-road',
  3: 'desert-road',
  4: 'desert-lost-3',
});

addHyperFrame('desert-lost-3', {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'North',
      },
      {
        label: 'South',
      },
      {
        label: 'East',
      },
      {
        label: 'West',
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/desert-lost.png`,
      aspectRatio: '1:1',
    },
    postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=desert-lost-3`,
  }),
  1: 'desert-road',
  2: 'desert-road',
  3: 'desert-road',
  4: 'desert-lost-4',
});

addHyperFrame('desert-lost-4', {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'North',
      },
      {
        label: 'South',
      },
      {
        label: 'East',
      },
      {
        label: 'West',
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/desert-lost.png`,
      aspectRatio: '1:1',
    },
    postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=desert-lost-4`,
  }),
  1: 'desert-oasis',
  2: 'desert-road',
  3: 'desert-road',
  4: 'desert-road',
});

addHyperFrame('desert-oasis', {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'Go Back',
      },
      {
        label: 'TODO',
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/desert-oasis.png`,
      aspectRatio: '1:1',
    },
    postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=desert-oasis`,
  }),
  1: 'desert-road',
  2: 'desert-road',
});

async function getResponse(req: NextRequest): Promise<NextResponse> {
  console.log("Frame endpoint");
  
  let accountAddress: string | undefined = '';
  let text: string | undefined = '';

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  }

  if (message?.input) {
    text = message.input;
  }

  const state = message?.state;
  console.log(state);
  const frame = "start";

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
