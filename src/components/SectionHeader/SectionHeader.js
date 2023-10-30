import "./SectionHeader.css";

// SECTION TITLE COMPONENT
function SectionHeader({ title }) {
  return (
    <div className="section-header">
      <h2 className="section-header__header">{title}</h2>
    </div>
  );
}

export default SectionHeader;
