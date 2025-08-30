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

                {/* Featured Blog (First one) */}
                {blogs.length > 0 && (
                    <div className="mb-12">
                        <Link href={`/blog/${blogs[0].slug || blogs[0].slug?.current}`} className="group">
                            <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                <div className="md:flex">
                                    <div className="md:w-1/2">
                                        {blogs[0].featuredImage && (
                                            <div className="relative h-64 md:h-80">
                                                <Image
                                                    src={urlFor(blogs[0].featuredImage).width(800).height(600).url()}
                                                    alt={blogs[0].featuredImage.alt || blogs[0].title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                {blogs[0].category && (
                                                    <div className="absolute top-4 left-4">
                                                        <span
                                                            className="text-white px-3 py-1 rounded-full text-sm font-medium"
                                                            style={{ backgroundColor: blogs[0].category.color || '#3B82F6' }}
                                                        >
                                                            {blogs[0].category.name}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className="md:w-1/2 p-8">
                                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                                            {blogs[0].title}
                                        </h3>
                                        {blogs[0].excerpt && (
                                            <p className="text-gray-600 mb-6 text-lg line-clamp-3">
                                                {blogs[0].excerpt}
                                            </p>
                                        )}
                                        <div className="flex items-center justify-between text-sm text-gray-500">
                                            <div className="flex items-center">
                                                {blogs[0].author?.image && (
                                                    <Image
                                                        src={blogs[0].author.image.asset?.url || blogs[0].author.image.url}
                                                        alt={blogs[0].author.name}
                                                        width={32}
                                                        height={32}
                                                        className="rounded-full mr-3"
                                                    />
                                                )}
                                                {blogs[0].author && (
                                                    <span className="font-medium">{blogs[0].author.name}</span>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <div>{format(blogs[0].publishedAt, 'MMM d, yyyy')}</div>
                                                {blogs[0].readingTime && (
                                                    <div className="text-xs">{blogs[0].readingTime} min read</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    </div>
                )}

                {/* Grid of other blogs */}
                {blogs.length > 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {blogs.slice(1, 4).map((blog) => (
                            <Link key={blog._id} href={`/blog/${blog.slug || blog.slug?.current}`} className="group">
                                <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                    {blog.featuredImage && (
                                        <div className="relative h-48 overflow-hidden">
                                            <Image
                                                src={urlFor(blog.featuredImage).width(600).height(400).url()}
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
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                            {blog.title}
                                        </h3>
                                        {blog.excerpt && (
                                            <p className="text-gray-600 mb-4 text-sm line-clamp-2">
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
