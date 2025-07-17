import React from 'react';
export default function Navcard({
  sortOption, 
  onSortChange,
  pageSize,
  onPageSizeChange,
  totalItems,
  currentPage
}) {

    const startItem = totalItems > 0 ? (currentPage - 1) * pageSize + 1 : 0;
    const endItem = Math.min(currentPage * pageSize, totalItems);

    return (
        <div className="font-sans flex justify-between items-center py-4 text-sm  rounded-lg px-6">
            <div className="text-gray-700">
                Showing {startItem} - {endItem} of {totalItems}
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                <span className="text-gray-600">Show per page:</span>
                <div className="relative">
                    <select
                    value={pageSize}
                    onChange={(e) => onPageSizeChange(parseInt(e.target.value, 10))}
                    className="appearance-none bg-white border border-gray-300 rounded-full py-2 pl-3 pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-gray-600">Sort by:</span>
                    <div className="relative">
                        <select
                        value={sortOption} 
                        onChange={(e) => onSortChange(e.target.value)}
                        className="appearance-none bg-white border border-gray-300 rounded-full py-2 pl-3 pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="-published_at">Newest</option>
                            <option value="published_at">Oldest</option>
                            <option value="title">Name (A-Z)</option>
                            <option value="-title">Name (Z-A)</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}