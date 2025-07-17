import Card from './Card';

export default function ListPost({ posts, isLoading }) {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-80 animate-pulse rounded-lg bg-gray-200"></div>
          ))}
        </div>
      );
    }

    if (!posts || posts.length === 0) {
      return <div className="py-16 text-center text-gray-500">No posts found.</div>;
    }

    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {posts.map(post => (
          <Card
            key={post.id}
            image={post.small_image?.[0]?.url || 'https://via.placeholder.com/400x400?text=No+Image'}
            date={post.published_at}
            title={post.title}
          />
        ))}
      </div>
    );
}