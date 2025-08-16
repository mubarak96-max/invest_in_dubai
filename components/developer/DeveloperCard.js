import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function DeveloperCard({ developer }) {
  const { name, slug, image, logo, description } = developer;

  return (
    <div className="group bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <div className="relative h-56 block">
        <Image
          src={image}
          alt={`${name} projects`}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="relative w-40 h-20">
            <Image
              src={logo}
              alt={`${name} logo`}
              layout="fill"
              objectFit="contain"
              className="filter brightness-0 invert drop-shadow-lg"
            />
          </div>
        </div>
      </div>
      <div className="p-6">
        <Link href={`/developers/${slug}`} legacyBehavior>
          <a className="text-xl font-bold text-gray-800 hover:text-blue-600 inline-flex items-center gap-2">
            {name}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Link>
        <p className="text-gray-600 mt-2 text-sm line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
}
