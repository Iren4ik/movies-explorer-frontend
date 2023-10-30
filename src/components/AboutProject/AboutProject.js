import "./AboutProject.css";
import SectionHeader from "../SectionHeader/SectionHeader";

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <SectionHeader title="О проекте" />
      <div className="about-project__info-container">
        <div className="about-project__info">
          <h2 className="about-project__info-title">
            Дипломный проект включал 5 этапов
          </h2>
          <p className="about-project__info-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__info">
          <h2 className="about-project__info-title">
            На выполнение диплома ушло 5 недель
          </h2>
          <p className="about-project__info-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>

      <div className="about-project__timeline">
        <div className="about-project__stage about-project__stage_type_back">
          <p className="about-project__stage-text about-project__stage-text_color_white">
            1 неделя
          </p>
          <p className="about-project__stage-text about-project__stage-text_color_grey">
            Back-end
          </p>
        </div>
        <div className="about-project__stage about-project__stage_type_front">
          <p className="about-project__stage-text about-project__stage-text_color_black">
            4 недели
          </p>
          <p className="about-project__stage-text about-project__stage-text_color_grey">
            Front-end
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
