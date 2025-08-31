import { client, queries, urlFor } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import PortableText from '@/components/PortableText';
import Image from 'next/image';
import Link from 'next/link';
import { format } from '@/lib/dateUtils';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const blog = await client.fetch(queries.blogBySlug, { slug });

    if (!blog) {
        return {
            title: 'Blog Post Not Found',
        };
    }

    return {
        title: blog.seoTitle || blog.title,
        description: blog.seoDescription || blog.excerpt,
        keywords: blog.seoKeywords,
        openGraph: {
            title: blog.seoTitle || blog.title,
            description: blog.seoDescription || blog.excerpt,
            images: blog.featuredImage ? [
                blog.featuredImage.asset
                    ? urlFor(blog.featuredImage).width(1200).height(630).url()
                    : blog.featuredImage.url
            ] : [],
            type: 'article',
            publishedTime: blog.publishedAt,
            authors: blog.author ? [blog.author.name] : [],
        },
    };
}

export const revalidate = 60; // Revalidate every minute for fresh content

export default async function BlogDetailPage({ params }) {
    try {
        const { slug } = await params;
        const [blog, relatedBlogs] = await Promise.all([
            client.fetch(queries.blogBySlug, { slug }),
            client.fetch(queries.relatedBlogs, { slug })
        ]);

        if (!blog) {
            notFound();
        }

        // Debug logging
        console.log('Blog data:', {
            title: blog.title,
            hasContent: !!blog.content,
            contentLength: blog.content ? blog.content.length : 0,
            hasFeaturedImage: !!blog.featuredImage,
            featuredImageStructure: blog.featuredImage,
            featuredImageAsset: blog.featuredImage?.asset,
            urlForResult: blog.featuredImage ? (blog.featuredImage.asset ? urlFor(blog.featuredImage).width(1200).height(600).url() : 'No asset found') : 'No featured image',
            conditionalCheck: blog.featuredImage && (blog.featuredImage.asset || blog.featuredImage.url)
        });

        return (
            <article className="bg-white">
                {/* Hero Section */}
                <div className="relative h-64 md:h-96 bg-gray-900">
                    {blog.featuredImage?.asset && (
                        <>
                            <img
                                src={urlFor(blog.featuredImage).width(1200).height(600).url()}
                                alt={blog.featuredImage.alt || blog.title}
                                className="absolute inset-0 w-full h-full object-cover opacity-70"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40" />
                        </>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white max-w-4xl mx-auto px-4">
                            <h1 className="text-3xl md:text-5xl font-bold mb-4">
                                {blog.title}
                            </h1>
                            {blog.excerpt && (
                                <p className="text-lg md:text-xl opacity-90">
                                    {blog.excerpt}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Article Content */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Article Meta */}
                    <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-gray-200">
                        {blog.author && (
                            <div className="flex items-center">
                                {blog.author.image && (
                                    <Image
                                        src={urlFor(blog.author.image).width(96).height(96).url()}
                                        alt={blog.author.name}
                                        width={48}
                                        height={48}
                                        className="rounded-full mr-3"
                                    />
                                )}
                                <div>
                                    <p className="font-semibold text-gray-900">{blog.author.name}</p>
                                    {blog.author.jobTitle && (
                                        <p className="text-sm text-gray-600">{blog.author.jobTitle}</p>
                                    )}
                                </div>
                            </div>
                        )}
                        <div className="text-gray-600">
                            <p>Published {format(blog.publishedAt, 'MMMM d, yyyy')}</p>
                            {blog.readingTime && (
                                <p className="text-sm">{blog.readingTime} min read</p>
                            )}
                        </div>
                        {blog.category && (
                            <span
                                className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white"
                                style={{ backgroundColor: blog.category.color || '#3B82F6' }}
                            >
                                {blog.category.name}
                            </span>
                        )}
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none">
                        {blog.content && blog.content.length > 0 ? (
                            <PortableText value={blog.content} />
                        ) : (
                            <div className="text-gray-500 italic">
                                <p>No content available for this blog post.</p>
                            </div>
                        )}
                    </div>

                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <h3 className="text-lg font-semibold mb-4">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {blog.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Author Bio */}
                    {blog.author && blog.author.bio && (
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <div className="bg-gray-50 rounded-lg p-6">
                                <div className="flex items-start">
                                    {blog.author.image && (
                                        <Image
                                            src={blog.author.image.asset ? urlFor(blog.author.image).width(160).height(160).url() : blog.author.image.url}
                                            alt={blog.author.name}
                                            width={80}
                                            height={80}
                                            className="rounded-full mr-4 flex-shrink-0"
                                        />
                                    )}
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">{blog.author.name}</h3>
                                        {blog.author.jobTitle && (
                                            <p className="text-gray-600 mb-3">{blog.author.jobTitle}</p>
                                        )}
                                        <div className="prose text-gray-700">
                                            <PortableText value={blog.author.bio} />
                                        </div>
                                        {(blog.author.email || blog.author.socialMedia?.length > 0) && (
                                            <div className="mt-4 flex items-center gap-4">
                                                {blog.author.email && (
                                                    <a
                                                        href={`mailto:${blog.author.email}`}
                                                        className="text-blue-600 hover:text-blue-800 transition-colors"
                                                    >
                                                        Contact
                                                    </a>
                                                )}
                                                {blog.author.socialMedia?.map((social) => (
                                                    <a
                                                        key={social.platform}
                                                        href={social.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:text-blue-800 transition-colors"
                                                    >
                                                        {social.platform}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Related Articles */}
                {relatedBlogs && relatedBlogs.length > 0 && (
                    <div className="bg-gray-50 py-12">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {relatedBlogs.map((relatedBlog) => (
                                    <Link
                                        key={relatedBlog._id}
                                        href={`/blog/${relatedBlog.slug || relatedBlog.slug?.current}`}
                                        className="group"
                                    >
                                        <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                            {relatedBlog.featuredImage && (
                                                <div className="relative h-48">
                                                    <Image
                                                        src={relatedBlog.featuredImage.asset ? urlFor(relatedBlog.featuredImage).width(600).height(400).url() : relatedBlog.featuredImage.url}
                                                        alt={relatedBlog.featuredImage.alt || relatedBlog.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                            )}
                                            <div className="p-6">
                                                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                                    {relatedBlog.title}
                                                </h3>
                                                {relatedBlog.excerpt && (
                                                    <p className="text-gray-600 mb-3 line-clamp-3">
                                                        {relatedBlog.excerpt}
                                                    </p>
                                                )}
                                                <div className="flex items-center justify-between text-sm text-gray-500">
                                                    <span>{format(relatedBlog.publishedAt, 'MMM d, yyyy')}</span>
                                                    {relatedBlog.readingTime && (
                                                        <span>{relatedBlog.readingTime} min read</span>
                                                    )}
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </article>
        );
    } catch (error) {
        console.error('Error fetching blog:', error);
        return (
            <div className="bg-white min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Unable to load article</h1>
                    <p className="text-gray-600">Please try again later.</p>
                </div>
            </div>
        );
    }
}
