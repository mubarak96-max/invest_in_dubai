import Image from 'next/image';

export default function DeveloperHero({ developer }) {
  return (
    <div className="relative bg-gray-800 py-20 lg:py-32">
      <div className="absolute inset-0">
        {developer.image && developer.image.trim() !== '' ? (
          <Image
            src={developer.image}
            alt={`${developer.name} background`}
            layout="fill"
            objectFit="cover"
            className="opacity-20"
          />
        ) : (
          <div className="w-full h-full bg-gray-700"></div>
        )}
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative w-48 h-24 mx-auto mb-6">
            {developer.logo && developer.logo.trim() !== '' ? (
              <Image
                src={developer.logo}
                alt={`${developer.name} logo`}
                layout="fill"
                objectFit="contain"
                className="filter brightness-0 invert"
              />
            ) : (
              <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">{developer.name}</span>
              </div>
            )}
        </div>
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">{developer.name}</h1>
        <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
          {developer.description}
        </p>
      </div>
    </div>
  );
}
