const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
};

export default function Card({ image, date, title }) {
    return (
        <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-xl">
            <div className="aspect-square w-full bg-gray-100">
                <img
                src={image}
                alt={title || "Post image"}
                className="h-full w-full object-cover"
                loading="lazy"
                />
            </div>

            <div className="flex flex-grow flex-col p-4">
                <p className="mb-2 text-xs text-gray-500">{formatDate(date)}</p>
                <h3 className="flex-grow text-base font-semibold text-gray-800 line-clamp-3">
                    {title}
                </h3>
            </div>
        </div>
    );
}