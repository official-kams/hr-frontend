import React from 'react';

// export default function Pagination({
// 																		 totalRecordCount,
// 																		 startPage,
// 																		 endPage,
// 																		 pageIndex,
// 																		 setPageIndex,
// 																		 existPrevPage,
// 																		 existNextPage
// 																	 })
// 	{
// 	return (
// 		<div className="custom-pagination">
// 			<span className="totalCount">총 <u>{totalRecordCount}</u>건</span>
// 			<Button onClick={() => setPageIndex(startPage - 1)}
// 							className={`nav ${!existPrevPage ? 'eventLock' : ''}`}>
// 				<NavigateBeforeIcon/>
// 			</Button>
// 			{Array.from({length: endPage - startPage + 1}, (_, i) => startPage + i).map(page => (
// 				<Button key={page} onClick={() => setPageIndex(page)}
// 								className={pageIndex === page ? 'active' : ''}>
// 					{page}
// 				</Button>
// 			))}
// 			<Button onClick={() => setPageIndex(endPage + 1)}
// 							className={`nav ${!existNextPage ? 'eventLock' : ''}`}>
// 				<NavigateNextIcon/>
// 			</Button>
// 		</div>
// 	)
// }

export default function Pagination(){
  return(
    <>

    </>
  )
}