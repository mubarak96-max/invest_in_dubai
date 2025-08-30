export default function BlogCategory({ category, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        isSelected
          ? 'text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
      style={isSelected ? { backgroundColor: category.color || '#3B82F6' } : {}}
    >
      {category.name}
    </button>
  );
}
