import React, { useMemo } from 'react';

// --- BAGIAN 1: LOGIKA (CUSTOM HOOK) ---

export const DOTS = '...';

/**
 * Helper function untuk membuat rentang angka.
 * contoh: range(1, 5) -> [1, 2, 3, 4, 5]
 */
const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

/**
 * Custom Hook untuk menghitung logika rentang paginasi.
 */
const usePagination = ({
  totalItems,
  pageSize,
  siblingCount = 1,
  currentPage
}) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalItems / pageSize);

    // Jumlah total halaman yang ditampilkan: 1(first) + 1(last) + 1(current) + 2(siblings) + 2(DOTS)
    const totalPageNumbers = siblingCount + 5;

    // Kasus 1: Jika jumlah halaman lebih sedikit dari yang ingin kita tampilkan, tampilkan semua.
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    // Kasus 2: Hanya tampilkan elipsis kanan
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, totalPageCount];
    }

    // Kasus 3: Hanya tampilkan elipsis kiri
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    // Kasus 4: Tampilkan elipsis di kedua sisi
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalItems, pageSize, siblingCount, currentPage]);

  return paginationRange;
};


// --- BAGIAN 2: KOMPONEN UI ---

const ArrowIcon = ({ direction = 'left', disabled }) => {
  const path = direction === 'left' 
    ? "M15.75 19.5L8.25 12l7.5-7.5" 
    : "M8.25 4.5l7.5 7.5-7.5 7.5";
  return (
    <svg className={`w-5 h-5 ${disabled ? 'text-gray-300' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
};

const DoubleArrowIcon = ({ direction = 'left', disabled }) => (
  <svg className={`w-5 h-5 ${disabled ? 'text-gray-300' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    {direction === 'left' ? (
      <>
        <path d="M11.25 4.5l-7.5 7.5 7.5 7.5" />
        <path d="M18.75 4.5l-7.5 7.5 7.5 7.5" />
      </>
    ) : (
      <>
        <path d="M12.75 4.5l7.5 7.5-7.5 7.5" />
        <path d="M5.25 4.5l7.5 7.5-7.5 7.5" />
      </>
    )}
  </svg>
);

export default function Pagination({ currentPage, totalItems, pageSize, onPageChange }) {
  const totalPageCount = Math.ceil(totalItems / pageSize);
  
  const paginationRange = usePagination({
    currentPage,
    totalItems,
    pageSize,
    siblingCount: 1
  });

  // Jika halaman kurang dari 2, tidak perlu ditampilkan.
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => onPageChange(currentPage + 1);
  const onPrevious = () => onPageChange(currentPage - 1);

  return (
    <nav>
      <ul className="flex justify-center items-center gap-1.5 text-sm">
        {/* Tombol ke Halaman Pertama */}
        <li>
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center w-9 h-9 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="First Page"
          >
            <DoubleArrowIcon direction="left" disabled={currentPage === 1} />
          </button>
        </li>
        {/* Tombol ke Halaman Sebelumnya */}
        <li>
          <button
            onClick={onPrevious}
            disabled={currentPage === 1}
            className="flex items-center justify-center w-9 h-9 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous Page"
          >
            <ArrowIcon direction="left" disabled={currentPage === 1} />
          </button>
        </li>
        
        {/* Nomor Halaman */}
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return <li key={`dots-${index}`} className="px-2 text-gray-500">...</li>;
          }
          
          const isActive = pageNumber === currentPage;
          return (
            <li key={pageNumber}>
              <button
                onClick={() => onPageChange(pageNumber)}
                className={`flex items-center justify-center w-9 h-9 rounded-md font-semibold transition-colors
                  ${isActive 
                    ? 'bg-orange-500 text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                  }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}

        {/* Tombol ke Halaman Berikutnya */}
        <li>
          <button
            onClick={onNext}
            disabled={currentPage === totalPageCount}
            className="flex items-center justify-center w-9 h-9 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next Page"
          >
            <ArrowIcon direction="right" disabled={currentPage === totalPageCount} />
          </button>
        </li>
        {/* Tombol ke Halaman Terakhir */}
        <li>
          <button
            onClick={() => onPageChange(totalPageCount)}
            disabled={currentPage === totalPageCount}
            className="flex items-center justify-center w-9 h-9 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Last Page"
          >
            <DoubleArrowIcon direction="right" disabled={currentPage === totalPageCount} />
          </button>
        </li>
      </ul>
    </nav>
  );
}