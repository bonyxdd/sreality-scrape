import { useState, useEffect } from 'react';
// Your other components and code...

const Pagination: React.FC = () => {
    const [activePage, setActivePage] = useState(1);
  
    const handlePageClick = (pageNumber: number) => {
      setActivePage(pageNumber);
    };
  
    useEffect(() => {
        // Update display of property-wrap elements based on activePage
        const propertyWraps = document.querySelectorAll('.property-wrap');
        propertyWraps.forEach((propertyWrap, index) => {
          if (index + 1 === activePage) {
              propertyWrap.classList.add('active');
              propertyWrap.classList.remove('notactive');
          } else {
              propertyWrap.classList.add('notactive');
              propertyWrap.classList.remove('active');
          }
        });
      }, [activePage]);
    
    return (
        <div className="pagination p1">
          <ul>
            <li>
              <a href="#" onClick={() => handlePageClick(1)} className={activePage === 1 ? 'is-active' : ''}>
                1
              </a>
            </li>
            <li>
              <a href="#" onClick={() => handlePageClick(2)} className={activePage === 2 ? 'is-active' : ''}>
                2
              </a>
            </li>
            <li>
              <a href="#" onClick={() => handlePageClick(3)} className={activePage === 3 ? 'is-active' : ''}>
                3
              </a>
            </li>
            <li>
              <a href="#" onClick={() => handlePageClick(4)} className={activePage === 4 ? 'is-active' : ''}>
                4
              </a>
            </li>
            <li>
              <a href="#" onClick={() => handlePageClick(5)} className={activePage === 5 ? 'is-active' : ''}>
                5
              </a>
            </li>
            <li>
              <a href="#" onClick={() => handlePageClick(6)} className={activePage === 6 ? 'is-active' : ''}>
                6
              </a>
            </li>
            <li>
              <a href="#" onClick={() => handlePageClick(7)} className={activePage === 7 ? 'is-active' : ''}>
                7
              </a>
            </li>
            <li>
              <a href="#" onClick={() => handlePageClick(8)} className={activePage === 8 ? 'is-active' : ''}>
                8
              </a>
            </li>
            <li>
              <a href="#" onClick={() => handlePageClick(9)} className={activePage === 9 ? 'is-active' : ''}>
                9
              </a>
            </li>
            <li>
              <a href="#" onClick={() => handlePageClick(10)} className={activePage === 10 ? 'is-active' : ''}>
                10
              </a>
            </li>
          </ul>
        </div>
      );
    };

export default Pagination;

// Your other components and code...
