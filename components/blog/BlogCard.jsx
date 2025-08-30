import Image from 'next/image';
import Link from 'next/link';
import { format } from '@/lib/dateUtils';

export default function BlogCard({ blog, featured = false }) {
  const cardClassName = featured
    ? "group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
    : "group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow";

  const imageHeight = featured ? "h-64 md:h-80" : "h-48";

  return (
    <Link href={`/blog/${blog.slug.current}`} className={cardClassName}>
      <article>
        {/* Featured Image */}
        {blog.featuredImage && (
          <div className={`relative ${imageHeight} overflow-hidden`}>
            <Image
              src={blog.featuredImage.asset.url}
              alt={blog.featuredImage.alt || blog.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {blog.featured && (
              <div className="absolute top-4 left-4">
                <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </span>
              </div>
            )}
            {blog.category && (
              <div className="absolute top-4 right-4">
                <span 
                  className="text-white px-3 py-1 rounded-full text-sm font-medium"
                  style={{ backgroundColor: blog.category.color || '#3B82F6' }}
                >
                  {blog.category.name}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className={featured ? "p-8" : "p-6"}>
          <h3 className={`font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 ${
            featured ? 'text-2xl md:text-3xl' : 'text-xl'
          }`}>
            {blog.title}
          </h3>

          {blog.excerpt && (
            <p className={`text-gray-600 mb-4 ${
              featured ? 'text-lg line-clamp-3' : 'text-base line-clamp-2'
            }`}>
              {blog.excerpt}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              {blog.author?.image && (
                <Image
                  src={blog.author.image.asset.url}
                  alt={blog.author.name}
                  width={24}
                  height={24}
                  className="rounded-full mr-2"
                />
              )}
              {blog.author && (
                <span className="font-medium">{blog.author.name}</span>
              )}
            </div>
            <div className="text-right">
              <div>{format(blog.publishedAt, 'MMM d, yyyy')}</div>
              {blog.readingTime && (
                <div className="text-xs">{blog.readingTime} min read</div>
              )}
            </div>
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1">
              {blog.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
              {blog.tags.length > 3 && (
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                  +{blog.tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
