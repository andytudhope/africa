'use client';

import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <div className="flex">
      <Sidebar />
      <main className={`flex-1 pt-16 ${isHome ? '' : 'md:ml-64'}`}>
        {children}
      </main>
    </div>
  );
}
