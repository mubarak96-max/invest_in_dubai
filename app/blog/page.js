import { client, queries } from '@/lib/sanity';
import BlogClient from '@/components/blog/BlogClient';

export const metadata = {
  title: 'Dubai Real Estate Blog | Market Insights & Investment Tips',
  description: 'Stay updated with the latest Dubai real estate market insights, investment tips, and property trends. Expert analysis and guides for property investors.',
};

export const revalidate = 3600; // Revalidate every hour

export default async function BlogPage() {
  try {
    const [blogs, categories, featuredBlogs] = await Promise.all([
      client.fetch(queries.allBlogs),
      client.fetch(queries.allBlogCategories),
      client.fetch(queries.featuredBlogs)
    ]);

    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Dubai Real Estate Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay informed with expert insights, market analysis, and investment tips for Dubai's dynamic property market.
            </p>
          </div>

          <BlogClient 
            initialBlogs={blogs} 
            categories={categories}
            featuredBlogs={featuredBlogs}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Unable to load blog</h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }
}
