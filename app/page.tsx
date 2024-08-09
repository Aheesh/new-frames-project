import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Player A',
    },
    {
      label: 'Player B',
    },
    {
      label: 'Draw',
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/game1.webp`,
    aspectRatio: '1:1',
  },
  //state: { frame: 'start' },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'Baller Chess - HyperFrames!',
  description: 'Yes to Chess with a twist!',
  openGraph: {
    title: 'Baller Chess - HyperFrames!',
    description: 'Yes to Chess with a twist!',
    images: [`${NEXT_PUBLIC_URL}/frame-1-forest.webp`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>Baller Chess using - HyperFrames!</h1>
      <a href="https://docs.base.org/building-with-base/guides/hyperframes">
        Click here to learn how to make this!
      </a>
    </>
  );
}
