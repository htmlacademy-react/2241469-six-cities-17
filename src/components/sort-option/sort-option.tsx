import { store } from '../../store';
import { useAppDispatch } from '../../hooks';
import { Sorts } from '../../const';
import { changeSort } from '../../store/action';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PathRoutes } from '../../data/routes';


function SortOptions(): JSX.Element {

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const activeSort = store.getState().sort;

  const sortFormChangeHandler = (filter: string) => {
    dispatch(changeSort(filter));
    setIsOpen(false);
    navigate(PathRoutes.MAIN);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setIsOpen(!isOpen)}>
        {activeSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isOpen && (
        <ul className='places__options places__options--custom places__options--opened'>
          {
            Object.values(Sorts)
              .map((filter) => (
                <li
                  className={`places__option ${filter === activeSort ? 'places__option--active' : ''}`}
                  tabIndex={0}
                  key={filter}
                  onClick={() => {
                    sortFormChangeHandler(filter);
                  }}
                >
                  {filter}
                </li>)
              )
          }
        </ul>
      )}
    </form>
  );
}
export default SortOptions;

