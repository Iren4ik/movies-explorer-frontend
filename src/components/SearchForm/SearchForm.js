import { useState } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  const [isFilter, setFilter] = useState(false);

  const handleFilterChange = () => {
    setFilter(!isFilter);
  };

  return (
    <section className="search">
      <div className="search__form-wrapper">
        <form action="" className="search__form">
          <div className="search__input-container">
            <div className="search__icon"></div>
            <div className="search__input-wrapper">
              <input
                type="text"
                className="search__input"
                placeholder="Фильм"
              />
            </div>
          </div>
          <button className="search__btn">Найти</button>
        </form>
        <div className="search__filter-container">
          <FilterCheckbox isFilter={isFilter} onChange={handleFilterChange} />
          <p className="search__filter-title">Короткометражки</p>
        </div>
      </div>
    </section>
  );
}

export default SearchForm;
