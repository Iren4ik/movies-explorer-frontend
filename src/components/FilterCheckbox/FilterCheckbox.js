import "./FilterCheckbox.css";

function FilterCheckbox({ isFilter, onChange }) {
  return (
    <label class="checkbox">
      <input
        type="checkbox"
        className="checkbox__input"
        cheked={isFilter}
        onChange={onChange}
        name="checkbox"
      />
      <span className="checkbox__div"></span>
    </label>
  );
}

export default FilterCheckbox;
