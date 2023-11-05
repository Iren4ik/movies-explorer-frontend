import "./FilterCheckbox.css";

function FilterCheckbox({ isFilter, onChange }) {
  return (
    <label className="checkbox">
      <input
        type="checkbox"
        className="checkbox__input"
        cheked={isFilter.toString()}
        onChange={onChange}
        name="checkbox"
      />
      <span className="checkbox__div"></span>
    </label>
  );
}

export default FilterCheckbox;
