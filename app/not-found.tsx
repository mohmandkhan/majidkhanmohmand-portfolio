import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[900px] px-5 py-32 sm:px-8">
      <h1 className="serif text-[64px] leading-none text-chalk">Not on the map</h1>
      <p className="mt-5 text-[18px] text-chalk-2">This page does not exist, or has moved. Everything that does is on the home page.</p>
      <Link href="/" className="mt-8 inline-block rounded-full bg-chalk px-5 py-2.5 font-semibold text-night">Back to the estate</Link>
    </div>
  );
}
