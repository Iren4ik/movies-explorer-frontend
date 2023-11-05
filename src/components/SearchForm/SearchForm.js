import "./SearchForm.css";
import { useState, useEffect } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
// import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function SearchForm({ onSearch, inputValue }) {
  const [isFilter, setFilter] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    setSearchInputValue(inputValue);
    setSearchError("");
  }, [inputValue]);

  function handleSubmit(e) {
    e.preventDefault();
    if (searchInputValue) {
      onSearch(searchInputValue);
      setSearchError("");
    } else {
      setSearchError("Нужно ввести ключевое слово");
    }
  }

  const handleFilterChange = () => {
    setFilter(!isFilter);
  };

  return (
    <section className="search">
      <form className="search__form-wrapper" action="#" name="search-form" onSubmit={handleSubmit} noValidate>
        <div className="search__form">
          <div className="search__input-container">
            <div className="search__icon"></div>
            <div className="search__input-wrapper">
              <input
                type="text"
                name="search"
                className="search__input"
                placeholder="Фильм"
                required
                value={searchInputValue || ''}
                onChange={(e) => setSearchInputValue(e.target.value)}
              />
            </div>
          </div>
          <button className="search__btn" type="submit">
            Найти
          </button>
        </div>
        <div className="search__filter-container">
          <FilterCheckbox isFilter={isFilter} onChange={handleFilterChange} />
          <p className="search__filter-title">Короткометражки</p>
        </div>
      </form>
      <span className="search__error search__error_active">{searchError}</span>
    </section>
  );
}

export default SearchForm;
