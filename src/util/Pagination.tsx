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
        <nav aria-label="..." className="mt-6">
            <ul className="pagination">
                <li className="page-item" onClick={() => props.setPage(1)}>
                    <button className="page-link">Trang Đầu</button>
                </li>
                {listPage.map(page => (
                    <li className={`page-item ${props.currentPage === page ? "active" : ""}`} key={page} onClick={() => props.setPage(page)}>
                        <button className="page-link">{page}</button>
                    </li>
                ))}
                <li className="page-item" onClick={() => props.totalPage === 0 ? props.setPage(1) : props.setPage(props.totalPage)}>
                    <button className="page-link">Trang Cuối</button>
                </li>
            </ul>
        </nav>

    );

}