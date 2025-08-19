'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  // Hide footer on property-map page
  if (pathname === '/property-map') {
    return null;
  }
  
  return <Footer />;
}
