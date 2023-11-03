import "./AboutMe.css";
import SectionHeader from "../SectionHeader/SectionHeader";
import avatar from "../../images/avatar.jpeg";

function AboutMe({ user }) {
  function calculateAge() {
    const birthDate = new Date(1998, 10, 8);
    const now = new Date();
    let age = now.getFullYear() - birthDate.getFullYear();
    if (now < birthDate) {
      // Если текущий год меньше года рождения
      age--; // Уменьшаем возраст на 1 год
    }
    return age;
  }

  return (
    <section className="about-me" id="about-me">
      <SectionHeader title="Студент" />
      <div className="about-me__container">
        <div className="about-me__info-container">
          <h3 className="about-me__name">{user.name}</h3>
          <p className="about-me__profession">
            Фронтенд-разработчик, {calculateAge()} лет
          </p>
          <p className="about-me__description">
            Я живу в Санкт-Петербурге, закончила направление "Теплоэнергетика и
            теплотехника" СПбПУ. Я люблю смотреть сериалы, читать книжки и
            периодически делать вид, что занимаюсь спортом. Недавно начала
            кодить. После того, как пройду курс по веб-разработке, найду 
            любимую работу и заведу собаку. Или двух.
          </p>
          <a
            className="about-me__link"
            href="https://github.com/Iren4ik?tab=repositories"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img src={avatar} alt="Фото студента" className="about-me__photo" />
      </div>
    </section>
  );
}

export default AboutMe;
