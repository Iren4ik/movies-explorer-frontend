import "./NavTab.css";

function NavTab() {
  return (
    <div className="nav-tab">
      <div className="nav-tab__container">
        <a href="#about-project" className="nav-tab__link">
          О проекте
        </a>
        <a href="#techs" className="nav-tab__link">
          Технологии
        </a>
        <a href="#about-me" className="nav-tab__link">
          Студент
        </a>
      </div>
    </div>
  );
}

export default NavTab;
