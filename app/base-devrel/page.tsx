import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from '../config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'To the Sea',
    },
    {
      label: 'Climb',
    },
    {
      label: 'To The Mountains',
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/base-devrel/path.webp`,
    aspectRatio: '1:1',
  },
  state: { frame: 'start' },
  postUrl: `${NEXT_PUBLIC_URL}/api/base-devrel`,
});

export const metadata: Metadata = {
  title: 'Meet Base DevRel',
  description: 'Follow us for the latest builder updates!',
  openGraph: {
    title: 'Meet Base DevRel',
    description: 'Follow us for the latest builder updates!',
    images: [`${NEXT_PUBLIC_URL}/base-devrel/path.webp`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>Meet Base DevRel</h1>
      <a href="https://docs.base.org/building-with-base/guides/hyperframes">
        Click here to learn how to make this!
      </a>
    </>
  );
}
