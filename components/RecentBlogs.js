import Link from 'next/link';
import Image from 'next/image';
import { format } from '@/lib/dateUtils';
import { urlFor } from '@/lib/sanity';

export default function RecentBlogs({ blogs }) {
    if (!blogs || blogs.length === 0) {
        return null;
    }

    return (
        <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Latest Market Insights
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Stay ahead of the market with our expert analysis, investment tips, and the latest Dubai real estate trends.
                    </p>
                </div>

                {/* Featured Blogs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {blogs.slice(0, 3).map((blog, index) => (
                        <Link key={blog._id} href={`/blog/${blog.slug || blog.slug?.current}`} className="group">
                            <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full min-h-[500px]">
                                {blog.featuredImage && (
                                    <div className="relative h-64 overflow-hidden flex-shrink-0">
                                        <Image
                                            src={urlFor(blog.featuredImage).width(600).height(400).url()}
                                            alt={blog.featuredImage.alt || blog.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        {blog.category && (
                                            <div className="absolute top-4 left-4">
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
                                <div className="p-6 flex flex-col h-full">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                        {blog.title}
                                    </h3>
                                    {blog.excerpt && (
                                        <p className="text-gray-600 mb-4 text-base line-clamp-4 flex-grow">
                                            {blog.excerpt}
                                        </p>
                                    )}
                                    <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-4">
                                        <div className="flex items-center">
                                            {blog.author?.image && (
                                                <Image
                                                    src={blog.author.image.asset?.url || blog.author.image.url}
                                                    alt={blog.author.name}
                                                    width={28}
                                                    height={28}
                                                    className="rounded-full mr-3"
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
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>

                {/* Additional blogs if more than 3 exist */}
                {blogs.length > 3 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {blogs.slice(3, 6).map((blog) => (
                            <Link key={blog._id} href={`/blog/${blog.slug || blog.slug?.current}`} className="group">
                                <article className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                    {blog.featuredImage && (
                                        <div className="relative h-44 overflow-hidden">
                                            <Image
                                                src={urlFor(blog.featuredImage).width(500).height(300).url()}
                                                alt={blog.featuredImage.alt || blog.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            {blog.category && (
                                                <div className="absolute top-3 right-3">
                                                    <span
                                                        className="text-white px-2 py-1 rounded-full text-xs font-medium"
                                                        style={{ backgroundColor: blog.category.color || '#3B82F6' }}
                                                    >
                                                        {blog.category.name}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    <div className="p-5">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                                            {blog.title}
                                        </h3>
                                        {blog.excerpt && (
                                            <p className="text-gray-600 mb-3 text-sm line-clamp-2">
                                                {blog.excerpt}
                                            </p>
                                        )}
                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                            <div className="flex items-center">
                                                {blog.author?.image && (
                                                    <Image
                                                        src={blog.author.image.asset?.url || blog.author.image.url}
                                                        alt={blog.author.name}
                                                        width={20}
                                                        height={20}
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
                                                    <div>{blog.readingTime} min read</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                )}

                {/* View All Button */}
                <div className="text-center">
                    <Link
                        href="/blog"
                        className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                        View All Articles
                        <svg
                            className="ml-2 w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
