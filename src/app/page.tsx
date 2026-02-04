import Image from 'next/image';
import Link from 'next/link';

const books = [
  {
    title: 'The Blue Book',
    description: 'A first-of-its-kind digital book that sets out to prove love. Enjoy the unfolding absurdity.',
    image: '/images/home/blue-book.jpg',
    href: 'https://thebluebook.co.za',
    buttonText: 'Love',
  },
  {
    title: 'Living',
    description: 'The more I write honest poetry, the more my experience honestly becomes poetic.',
    image: '/images/home/living.png',
    href: 'https://living.thebluebook.co.za',
    buttonText: 'Life',
  },
  {
    title: 'Dyeing',
    description: "Live poetically by all means. However, to know your truth inside out, you must put even this down. Just let go.",
    image: '/images/home/dyeing.png',
    href: 'https://dyeing.thebluebook.co.za',
    buttonText: 'Death',
  },
  {
    title: 'Unifying',
    description: 'The fourth peace of The Blue Book trilogy. Dedicated to those simple souls, for whom the obvious is just obvious.',
    image: '/images/home/unifying.jpg',
    href: 'https://unifying.thebluebook.co.za',
    buttonText: 'Truth',
  },
  {
    title: 'Finding',
    description: 'The fifth, final, and infinite peace, found in The Library of Babel. Each chapter is cared for with a Guardian NFT, held by those I love.',
    image: '/images/essays/de_sign.png',
    href: 'https://finding.thebluebook.co.za',
    buttonText: 'Endlessly',
  },
];

const playfulWork = [
  {
    title: 'Kernel',
    description: 'A core of creators committed to building better communities.',
    image: '/images/home/giving.png',
    href: 'https://kernel.community',
    buttonText: 'Learn',
  },
  {
    title: 'Pr1s0nArt',
    description: 'Collectively restoring justice and the dignity of returning citizens.',
    image: '/images/home/crow.jpg',
    href: 'https://pr1s0n.art',
    buttonText: 'Forgive',
  },
  {
    title: 'Dap.ps',
    description: 'A transparent economic ranking algorithm deployed on Ethereum.',
    image: '/images/home/dapps.jpg',
    href: 'https://observablehq.com/@andytudhope/embedded-discover',
    buttonText: 'Fairly',
  },
  {
    title: 'Honour',
    description: 'More wholesome money.',
    image: '/images/home/heartmap.png',
    href: 'https://honour.community',
    buttonText: 'Accept',
  },
  {
    title: 'Signature Economies',
    description: 'Value meaning.',
    image: '/images/home/sign.png',
    href: 'https://sign.kernel.community',
    buttonText: 'Sign',
  },
];

export default function HomePage() {
  return (
    <div className="md:ml-0 md:mr-0">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-lg md:max-w-xl lg:max-w-2xl mx-auto text-center">
          <Image
            src="/images/home/enso.png"
            alt="Enso - The Sincere Path"
            width={600}
            height={600}
            className="w-full mx-auto"
            priority
          />
        </div>
      </section>

      {/* Sincere Writing Section */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-light text-gray-500 mb-8">Sincere Writing</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div key={book.title} className="border border-gray-200 rounded-lg p-4 flex flex-col h-full">
              <h3 className="font-caveat text-2xl text-center mb-4">{book.title}</h3>
              <img
                src={book.image}
                alt={book.title}
                className="w-full aspect-square object-cover rounded mb-4"
              />
              <p className="text-sm text-gray-700 px-2 mb-4">{book.description}</p>
              <div className="mt-auto pt-4">
                <a
                  href={book.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-btn"
                >
                  {book.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Playful Work Section */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-light text-gray-500 mb-8">Playful Work</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {playfulWork.map((work) => (
            <div key={work.title} className="border border-gray-200 rounded-lg p-4 flex flex-col h-full">
              <h3 className="font-caveat text-2xl text-center mb-4">{work.title}</h3>
              <img
                src={work.image}
                alt={work.title}
                className="w-full aspect-square object-cover rounded mb-4"
              />
              <p className="text-sm text-gray-700 px-2 mb-4">{work.description}</p>
              <div className="mt-auto pt-4">
                <a
                  href={work.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-btn"
                >
                  {work.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Head and Heart Section */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-light text-gray-500 mb-4">Head and Heart</h2>
            <p className="text-gray-700 italic mb-4">
              &quot;The real basis of their poetry is a loftily inculcated ethical system, which recognises in purity of heart, charity, self-renunciation, and bridling of the passions, the necessary conditions of eternal happiness.&quot; — Reynold Nicholson
            </p>
          </div>
          <div>
            <img
              src="/images/home/andy.jpg"
              alt="Andy Tudhope"
              className="w-full rounded-lg"
            />
          </div>
        </div>

        <div className="mt-8 text-gray-700 space-y-4">
          <p>
            The notion that deepening awareness and expanding conscious skill leads to experiencing every moment in this world as perfect, as one spent witnessing the ever-present Face of God, has been around for a long time. The{' '}
            <a href="https://thebluebook.co.za/canto-i/xam.html" target="_blank" rel="noopener noreferrer" className="font-bold underline">
              //Xam
            </a>
            , and other tribes of the First People who wandered the Kalahari Desert and the Karoo, spoke of those harsh and beautiful landscapes as &quot;The Great Face&quot;, which they were able to read for signs critical to their sustenance and survival.{' '}
            <a href="https://unifying.thebluebook.co.za/?stackedPages=%2Fvictory" target="_blank" rel="noopener noreferrer" className="font-bold underline">
              The Qur&apos;an
            </a>
            , to me, is a potent distillment of this kind of sight. There{' '}
            <a href="https://archive.org/details/in.ernet.dli.2015.188686/page/n1/mode/2up" target="_blank" rel="noopener noreferrer" className="font-bold underline">
              are
            </a>{' '}
            <a href="https://www.youtube.com/watch?v=KD7B3wr3xeY" target="_blank" rel="noopener noreferrer" className="font-bold underline">
              many
            </a>{' '}
            <a href="https://rushkoff.com/books/nothing-sacred/" target="_blank" rel="noopener noreferrer" className="font-bold underline">
              others
            </a>
            : only become aware of the book in your own heart.
          </p>
          <p>
            Everything has its own integrity; is itself an expression in some form of unconditional love. This site traces aspects of that original integrity across The Great Digital Face, following the old song lines as they play out the same, perennial rhythm between 0 and 1.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16 py-8">
        <div className="max-w-5xl mx-auto px-4 flex justify-center gap-6">
          <a
            href="https://github.com/andytudhope"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
          <a
            href="https://twitter.com/cryptowanderer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}
