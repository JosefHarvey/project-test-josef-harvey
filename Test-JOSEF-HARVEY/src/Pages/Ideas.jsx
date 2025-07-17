import { useState, useEffect } from 'react';
import Banner from '../Components/Banner';
import Navcard from '../Components/Navcard';
import ListPost from '../Components/ListPost';
import Pagination from '../Components/Pagination';

export default function Ideas() {
    const initialParams = new URLSearchParams(window.location.search);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(parseInt(initialParams.get('page[number]')) || 1);
    const [pageSize, setPageSize] = useState(parseInt(initialParams.get('page[size]')) || 10);
    const [sortOption, setSortOption] = useState(initialParams.get('sort') || '-published_at');


    useEffect(() => {
        const fetchData = async () => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams();
            params.append('page[number]', currentPage);
            params.append('page[size]', pageSize);
            params.append('sort', sortOption);
            params.append('append[]', 'small_image');
            params.append('append[]', 'medium_image');
            
            const response = await fetch(`/api/ideas?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            setPosts(data.data);
            setTotalItems(data.meta.total);
            } catch (error) {
                console.error("Error fetching data:", error);
            } 
            finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, 
    [currentPage, pageSize, sortOption]);

    useEffect(() => {
        const params = new URLSearchParams();
        params.set('page[number]', currentPage);
        params.set('page[size]', pageSize);
        params.set('sort', sortOption);
        
        window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
    }, 
    [currentPage, pageSize, sortOption]);



    const handlePageSizeChange = (newSize) => {
        setPageSize(newSize);
        setCurrentPage(1); 
    };
    const handleSortChange = (newSort) => {
        setSortOption(newSort);
        setCurrentPage(1);
    };
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo(0, 0);
    };
    const bannerImageUrl = "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=2070&auto=format&fit=crop";

    return (
        <>
        <Banner 
            imageUrl={bannerImageUrl}
            title="Ideas"
            subtitle="Where all our great things begin"
        />
        <main className="container mx-auto -mt-16 space-y-8 px-6 py-8">
            <div className='relative z-20'>
                <Navcard
                    pageSize={pageSize}
                    sortOption={sortOption}
                    onPageSizeChange={handlePageSizeChange}
                    onSortChange={handleSortChange}
                    totalItems={totalItems}
                    currentPage={currentPage}
                />
            </div>
            <ListPost posts={posts} isLoading={isLoading} />
            <div className="mt-8">
                <Pagination
                    currentPage={currentPage}
                    totalItems={totalItems}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                />
            </div>
        </main>
        </>
    );
}