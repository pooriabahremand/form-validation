import Link from 'next/link';

export default function Page() {
  return (
    <>
      <button type="button">
        <Link href="regular-form">Regular form</Link>
      </button>
      <button type="button">
        <Link href="zod-form">Zod form</Link>
      </button>
      <button type="button">
        <Link href="stepper-form">Stepper form</Link>
      </button>
    </>
  );
}
