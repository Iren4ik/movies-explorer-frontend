import "./SearchForm.css";
import { useState, useEffect } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
// import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function SearchForm({ onSearch, inputValue, isFilterOn, onFilterChange, isLoading }) {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    setSearchInputValue(inputValue);
    setSearchError("");
  }, [inputValue]);

  function handleSubmit(e) {
    e.preventDefault();
    if (searchInputValue.length !== 0) {
      onSearch(searchInputValue);
      setSearchError("");
    } else {
      setSearchError("Нужно ввести ключевое слово");
    }
  }

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
                disabled={isLoading ? true : false}
              />
            </div>
          </div>
          <button 
            className={`search__btn ${isLoading ? "search__btn_disable" :''}`} 
            type="submit" 
            disabled={isLoading ? true : false}>
            Найти
          </button>
        </div>
        <div className="search__filter-container">
          <FilterCheckbox isFilterOn={isFilterOn} onFilterChange={onFilterChange} />
          <p className="search__filter-title">Короткометражки</p>
        </div>
      </form>
      <span className="search__error search__error_active">{searchError}</span>
    </section>
  );
}

export default SearchForm;
