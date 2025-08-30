import { client, queries } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import BlogClient from '@/components/blog/BlogClient';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const category = await client.fetch(queries.blogCategoryBySlug, { slug });

    if (!category) {
        return {
            title: 'Category Not Found',
        };
    }

    return {
        title: `${category.name} | Dubai Real Estate Blog`,
        description: category.description || `Read the latest articles about ${category.name} in Dubai real estate.`,
    };
}

export const revalidate = 3600;

export default async function BlogCategoryPage({ params }) {
    try {
        const { slug } = await params;
        const [category, blogs, allCategories] = await Promise.all([
            client.fetch(queries.blogCategoryBySlug, { slug }),
            client.fetch(queries.blogsByCategory, { category: slug }),
            client.fetch(queries.allBlogCategories)
        ]);

        if (!category) {
            notFound();
        }

        return (
            <div className="bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Category Header */}
                    <div className="text-center mb-12">
                        <div className="mb-4">
                            <span
                                className="inline-block px-6 py-2 rounded-full text-white text-lg font-medium"
                                style={{ backgroundColor: category.color || '#3B82F6' }}
                            >
                                {category.name}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            {category.name} Articles
                        </h1>
                        {category.description && (
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                {category.description}
                            </p>
                        )}
                        <p className="text-gray-500 mt-2">
                            {blogs.length} article{blogs.length !== 1 ? 's' : ''} in this category
                        </p>
                    </div>

                    <BlogClient
                        initialBlogs={blogs}
                        categories={allCategories}
                        featuredBlogs={[]}
                    />
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error fetching category data:', error);
        return (
            <div className="bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Unable to load category</h1>
                    <p className="text-gray-600">Please try again later.</p>
                </div>
            </div>
        );
    }
}
