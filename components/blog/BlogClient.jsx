'use client';

import { useState, useMemo } from 'react';
import BlogCard from './BlogCard';
import BlogCategory from './BlogCategory';

const POSTS_PER_PAGE = 9;

export default function BlogClient({ initialBlogs, categories, featuredBlogs }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredBlogs = useMemo(() => {
        let filtered = initialBlogs;

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(blog =>
                blog.category?.slug?.current === selectedCategory
            );
        }

        // Filter by search term
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(blog =>
                blog.title.toLowerCase().includes(searchLower) ||
                blog.excerpt?.toLowerCase().includes(searchLower) ||
                blog.tags?.some(tag => tag.toLowerCase().includes(searchLower))
            );
        }

        return filtered;
    }, [initialBlogs, selectedCategory, searchTerm]);

    // Reset to page 1 when filters change
    useMemo(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchTerm]);

    // Pagination calculations
    const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const currentBlogs = filteredBlogs.slice(startIndex, endIndex);

    return (
        <div>
            {/* Search and Filter Section */}
            <div className="mb-8">
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                    {/* Search Bar */}
                    <div className="w-full lg:w-96">
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Categories */}
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === 'all'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            All
                        </button>
                        {categories.map((category) => (
                            <BlogCategory
                                key={category._id}
                                category={category}
                                isSelected={selectedCategory === category.slug.current}
                                onClick={() => setSelectedCategory(category.slug.current)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
                <p className="text-gray-600">
                    {filteredBlogs.length} article{filteredBlogs.length !== 1 ? 's' : ''} found
                    {selectedCategory !== 'all' && (
                        <span>
                            {' '}in{' '}
                            <span className="font-medium">
                                {categories.find(cat => cat.slug.current === selectedCategory)?.name}
                            </span>
                        </span>
                    )}
                    {searchTerm && (
                        <span>
                            {' '}for "<span className="font-medium">{searchTerm}</span>"
                        </span>
                    )}
                    {totalPages > 1 && (
                        <span className="ml-2 text-sm">
                            (Page {currentPage} of {totalPages})
                        </span>
                    )}
                </p>
            </div>

            {/* Blog Grid */}
            {currentBlogs.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {currentBlogs.map((blog) => (
                            <BlogCard key={blog._id} blog={blog} />
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-12 flex justify-center">
                            <nav className="flex items-center space-x-2">
                                {/* Previous Button */}
                                <button
                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === 1
                                            ? 'text-gray-400 cursor-not-allowed'
                                            : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                                        }`}
                                >
                                    Previous
                                </button>

                                {/* Page Numbers */}
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                    if (
                                        page === 1 ||
                                        page === totalPages ||
                                        (page >= currentPage - 2 && page <= currentPage + 2)
                                    ) {
                                        return (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === page
                                                        ? 'bg-blue-600 text-white'
                                                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        );
                                    } else if (
                                        page === currentPage - 3 ||
                                        page === currentPage + 3
                                    ) {
                                        return (
                                            <span key={page} className="px-2 py-2 text-gray-400">
                                                ...
                                            </span>
                                        );
                                    }
                                    return null;
                                })}

                                {/* Next Button */}
                                <button
                                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                    className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === totalPages
                                            ? 'text-gray-400 cursor-not-allowed'
                                            : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                                        }`}
                                >
                                    Next
                                </button>
                            </nav>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-12">
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No articles found</h3>
                    <p className="text-gray-600 mb-4">
                        {searchTerm || selectedCategory !== 'all'
                            ? "Try adjusting your search or filters"
                            : "No blog posts are available at the moment"}
                    </p>
                    {(searchTerm || selectedCategory !== 'all') && (
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedCategory('all');
                            }}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Clear Filters
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
