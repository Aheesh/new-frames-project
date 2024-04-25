import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';
import { addHyperFrame, getHyperFrame } from '../../hyperframes';

const devRelLinks = {
  brian: 'https://warpcast.com/briandoyle81',
  ryan: 'https://warpcast.com/consecution.eth',
  taylor: 'https://warpcast.com/taycaldwell',
  will: 'https://warpcast.com/wbnns',
};

type followingDevRel = {
  brian: boolean;
  ryan: boolean;
  taylor: boolean;
  will: boolean;
};

const followingAll: followingDevRel = {
  brian: true,
  ryan: true,
  taylor: true,
  will: true,
};

const devRelFIDs = {
  brian: 10426,
  ryan: 17106,
  taylor: 192279,
  will: 12144,
};

interface User {
  object: string;
  fid: number;
}

interface Follow {
  object: string;
  user: User;
}

addHyperFrame('start', {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'Seaside',
      },
      {
        label: 'Climb',
      },
      {
        label: 'Mountains',
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/base-devrel/path.webp`,
      aspectRatio: '1:1',
    },
    state: { frame: 'start' },
    postUrl: `${NEXT_PUBLIC_URL}/api/base-devrel`,
  }),
  1: 'seaside',
  2: (text: string) => {
    return JSON.parse(text) === followingAll ? 'all-four' : 'cloudy-sky';
  },
  3: 'mountains',
});

addHyperFrame('all-four', {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'TODO Mint',
      }
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/base-devrel/base-devrel-stars.webp`,
      aspectRatio: '1:1',
    },
    state: { frame: 'all-four' },
    postUrl: `${NEXT_PUBLIC_URL}/api/base-devrel`,
  }),
  1: 'start',
});

addHyperFrame('cloudy-sky', {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'Someone is missing...',
      }
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/base-devrel/cloudy-sky.webp`,
      aspectRatio: '1:1',
    },
    state: { frame: 'cloudy-sky' },
    postUrl: `${NEXT_PUBLIC_URL}/api/base-devrel`,
  }),
  1: 'start',
});

addHyperFrame('seaside', {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'Sea',
      },
      {
        label: 'Fire Station',
      },
      {
        label: 'Back',
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/base-devrel/seaside.webp`,
      aspectRatio: '1:1',
    },
    state: { frame: 'seaside' },
    postUrl: `${NEXT_PUBLIC_URL}/api/base-devrel`,
  }),
  1: (text: string) => {
    return JSON.parse(text).will ? 'sea' : 'sea-no-turtle';
  },
  2: (text: string) => {
    return JSON.parse(text).taylor ? 'fire-station' : 'fire-station-no-dalmatian';
  },
  3: 'start',
});

addHyperFrame('sea-no-turtle', {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'Refresh',
      },
      {
        action: 'link',
        label: 'Follow Will',
        target: devRelLinks.will,
      },
      {
        label: 'Back',
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/base-devrel/no-turtle.webp`,
      aspectRatio: '1:1',
    },
    state: { frame: 'sea-no-turtle' },
    postUrl: `${NEXT_PUBLIC_URL}/api/base-devrel`,
  }),
  1: (text: string) => {
    return JSON.parse(text).will ? 'sea' : 'sea-no-turtle';
  },
  3: 'seaside',
});

addHyperFrame('sea', {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'You follow Will!',
      }
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/base-devrel/with-turtle.webp`,
      aspectRatio: '1:1',
    },
    state: { frame: 'sea' },
    postUrl: `${NEXT_PUBLIC_URL}/api/base-devrel`,
  }),
  1: 'seaside',
});

addHyperFrame('fire-station-no-dalmatian', {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'Refresh',
      },
      {
        action: 'link',
        label: 'Follow Taylor',
        target: devRelLinks.taylor,
      },
      {
        label: 'Back',
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/base-devrel/no-dalmatian.webp`,
      aspectRatio: '1:1',
    },
    state: { frame: 'fire-station-no-dalmatian' },
    postUrl: `${NEXT_PUBLIC_URL}/api/base-devrel`,
  }),
  1: (text: string) => {
    return JSON.parse(text).taylor ? 'fire-station' : 'fire-station-no-dalmatian';
  },
  3: 'seaside',
});

addHyperFrame('fire-station', {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'You follow Taylor!',
      }
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/base-devrel/with-dalmatian.webp`,
      aspectRatio: '1:1',
    },
    state: { frame: 'fire-station' },
    postUrl: `${NEXT_PUBLIC_URL}/api/base-devrel`,
  }),
  1: 'seaside',
});

addHyperFrame('mountains', {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'Cliffs',
      },
      {
        label: 'Sky',
      },
      {
        label: 'Back',
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/base-devrel/mountains.webp`,
      aspectRatio: '1:1',
    },
    state: { frame: 'mountains' },
    postUrl: `${NEXT_PUBLIC_URL}/api/base-devrel`,
  }),
  1: (text: string) => {
    return JSON.parse(text).ryan ? 'with-leopard' : 'no-leopard';
  },
  2: (text: string) => {
    return JSON.parse(text).brian ? 'with-falcon' : 'no-falcon';
  },
  3: 'start',
});

addHyperFrame('no-leopard', {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'Refresh',
      },
      {
        action: 'link',
        label: 'Follow Ryan',
        target: devRelLinks.ryan,
      },
      {
        label: 'Back',
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/base-devrel/no-leopard.webp`,
      aspectRatio: '1:1',
    },
    state: { frame: 'no-leopard' },
    postUrl: `${NEXT_PUBLIC_URL}/api/base-devrel`,
  }),
  1: (text: string) => {
    return JSON.parse(text).ryan ? 'with-leopard' : 'no-leopard';
  },
  3: 'mountains',
});

addHyperFrame('with-leopard', {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'You follow Ryan!',
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/base-devrel/with-leopard.webp`,
      aspectRatio: '1:1',
    },
    state: { frame: 'with-leopard' },
    postUrl: `${NEXT_PUBLIC_URL}/api/base-devrel`,
  }),
  1: 'mountains',
});

addHyperFrame('no-falcon', {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'Refresh',
      },
      {
        action: 'link',
        label: 'Follow Brian',
        target: devRelLinks.brian,
      },
      {
        label: 'Back',
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/base-devrel/no-falcon.webp`,
      aspectRatio: '1:1',
    },
    state: { frame: 'no-falcon' },
    postUrl: `${NEXT_PUBLIC_URL}/api/base-devrel`,
  }),
  1: (text: string) => {
    return JSON.parse(text).brian ? 'with-falcon' : 'no-falcon';
  },
  3: 'mountains',
});

addHyperFrame('with-falcon', {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'You follow Brian!',
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/base-devrel/with-falcon.webp`,
      aspectRatio: '1:1',
    },
    state: { frame: 'with-falcon' },
    postUrl: `${NEXT_PUBLIC_URL}/api/base-devrel`,
  }),
  1: 'mountains',
});

function isFidPresent(followers: Follow[], fidToCheck: number): boolean {
    return followers.some(follower => follower.user.fid === fidToCheck);
}

async function getResponse(req: NextRequest): Promise<NextResponse> {
  console.log('Frame endpoint');

  const following: followingDevRel = {
    brian: false,
    ryan: false,
    taylor: false,
    will: false,
  };

  let accountAddress: string | undefined = '';

  // @dev using text here to signal followers to hyperframes
  let text: string | undefined = '';

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  } else {
    return new NextResponse('Message not valid', { status: 500 });
  }

  const API_URL = `https://api.neynar.com/v2/farcaster/followers/relevant?target_fid=${accountAddress}&viewer_fid=${accountAddress}`;

  const options = {
    method: 'GET',
    url: API_URL,
    headers: {
      accept: 'application/json',
      api_key: 'NEYNAR_ONCHAIN_KIT' as string,
    },
  };
  const response = await fetch(options.url, { headers: options.headers });
  if (response.status !== 200) {
    console.error(`non-200 status returned from neynar : ${response.status}`);
  }

  if (response.ok) {
    const followsJson = await response.json();
    console.log('followsJson', followsJson);
    const relevantFollowers = followsJson?.all_relevant_followers_dehydrated;
    console.log('relevantFollowers', relevantFollowers);
    if (relevantFollowers) {
      following.brian = isFidPresent(relevantFollowers, devRelFIDs.brian);
      following.ryan = isFidPresent(relevantFollowers, devRelFIDs.ryan);
      following.taylor = isFidPresent(relevantFollowers, devRelFIDs.taylor);
      following.will = isFidPresent(relevantFollowers, devRelFIDs.will);
    }
  } else {
    console.error(`Error fetching reactions from neynar`);
    console.error(response);
  }

  text = JSON.stringify(following);
  console.log('following', following);

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
    return new NextResponse(`Frame not found ${frame}`, { status: 404 });
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
