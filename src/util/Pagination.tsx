interface PaginationInterface {
    totalPage: number;
    currentPage: number;
    setPage: any;
}

export const Pagination: React.FC<PaginationInterface> = (props) => {
    const listPage = [];
    if (props.currentPage === 1) {
        listPage.push(props.currentPage);
        if (props.totalPage >= 2) {
            listPage.push(2);
        }
        if (props.totalPage >= 3) {
            listPage.push(3);
        }
    } else if (props.currentPage > 1 && props.currentPage < props.totalPage) {

        //trang -1
        if (props.currentPage >= 2) {
            listPage.push(props.currentPage - 1);
        }

        listPage.push(props.currentPage);

        // trang +1
        if (props.totalPage >= props.currentPage + 1) {
            listPage.push(props.currentPage + 1);
        }

    } else if (props.currentPage === props.totalPage) {

        if (props.currentPage - 2 > 0) {
            listPage.push(props.currentPage - 2);
        }
        if (props.currentPage - 1 > 0) {
            listPage.push(props.currentPage - 1);
        }
        listPage.push(props.currentPage);

    }



    return (
        <nav aria-label="Pagination" className="mt-6 flex justify-center">
    <ul className="flex items-center gap-2">
        {/* Nút Trang Đầu */}
        <li>
            <button 
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                onClick={() => props.setPage(1)}
            >
                Trang Đầu
            </button>
        </li>

        {/* Các trang */}
        {listPage.map(page => (
            <li key={page}>
                <button 
                    className={`px-4 py-2 rounded-lg transition ${props.currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                    onClick={() => props.setPage(page)}
                >
                    {page}
                </button>
            </li>
        ))}

        {/* Nút Trang Cuối */}
        <li>
            <button 
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                onClick={() => props.totalPage === 0 ? props.setPage(1) : props.setPage(props.totalPage)}
            >
                Trang Cuối
            </button>
        </li>
    </ul>
</nav>

    );

}