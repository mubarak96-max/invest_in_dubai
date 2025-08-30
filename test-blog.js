const { client, queries } = require('./lib/sanity');

async function testBlog() {
    try {
        console.log('Testing blog functionality...');

        // Test 1: Fetch all blogs
        const blogs = await client.fetch(queries.allBlogs);
        console.log('All blogs:', blogs?.length, 'found');

        if (blogs && blogs.length > 0) {
            const firstBlog = blogs[0];
            console.log('First blog:', {
                title: firstBlog.title,
                slug: firstBlog.slug,
                hasContent: !!firstBlog.content,
                hasFeaturedImage: !!firstBlog.featuredImage
            });

            // Test 2: Fetch specific blog
            if (firstBlog.slug) {
                const blogBySlug = await client.fetch(queries.blogBySlug, { slug: firstBlog.slug });
                console.log('Blog by slug:', {
                    title: blogBySlug?.title,
                    hasContent: !!blogBySlug?.content,
                    contentLength: blogBySlug?.content?.length,
                    hasFeaturedImage: !!blogBySlug?.featuredImage
                });
            }
        }
    } catch (error) {
        console.error('Error testing blog:', error);
    }
}

testBlog();
