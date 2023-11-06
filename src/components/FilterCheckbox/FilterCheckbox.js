import "./FilterCheckbox.css";

function FilterCheckbox({ isFilterOn, onFilterChange }) {
  return (
    <label className="checkbox">
      <input
        type="checkbox"
        className="checkbox__input"
        checked={isFilterOn}
        onChange={(evt) => onFilterChange(evt.target.checked)}
        name="checkbox"
      />
      <span className="checkbox__div"></span>
    </label>
  );
}

export default FilterCheckbox;
