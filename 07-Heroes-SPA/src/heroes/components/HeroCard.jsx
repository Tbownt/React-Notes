import { Link } from "react-router-dom";

export const HeroCard = ({
  id,
  superhero,
  publisher,
  alter_ego,
  first_appearance,
  characters,
}) => {
  const heroImageUrl = `/assets/heroes/${id}.jpg`;

  const CharactersByHero = ({ alter_ego, characters }) => {
    if (alter_ego === characters) return <></>;
    return <p>{characters}</p>;
  };

  return (
    <div className="d-flex align-items-stretch col-sm-8 col-md-8 col-lg-4 animate__animated animate__fadeIn animate__delay-0.5s">
      <div className="card">
        <div className="row">
          <div className="col-sm-12 col-md-4 col-lg-4">
            <img src={heroImageUrl} alt={superhero} className="card-img" />
          </div>
          <div className="col-sm col-md-8 col-lg-8">
            <div className="card-body">
              <h5 className="card-title">{superhero}</h5>
              <p className="card-text">{alter_ego}</p>
              <CharactersByHero
                alter_ego={alter_ego}
                characters={characters.slice(0, 35)}
              />
              <p className="card-text">
                <small className="text-muted">{first_appearance}</small>
              </p>
              <Link to={`/hero/${id}`}>Más...</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
