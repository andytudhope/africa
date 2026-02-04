import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-light text-gray-300 mb-4">404</h1>
      <h2 className="text-2xl font-light text-gray-600 mb-4">Page Not Found</h2>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
