import OwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";

const Hero = () => {
  const items = [
    {
      id: 1,
      background: "src/assets/img/hero/hero-1.jpg",
      subtitle: "Shape your body",
      title: "Be strong training hard",
    },
    {
      id: 2,
      background: "src/assets/img/hero/hero-1.jpg",
      subtitle: "Shape your body",
      title: "Be strong training hard",
    },
  ];

  return (
    <section className="hero-section">
      <OwlCarousel
        className="hs-slider"
        loop
        margin={0}
        nav={false}
        dots={false}
        autoplay={true}
        items={1}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="hs-item set-bg"
            data-setbg={`${item.background}`}
            style={{
              backgroundImage: `url("${item.background}")`,
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-6 offset-lg-6">
                  <div className="hi-text">
                    <span>{item.subtitle}</span>
                    <h1>
                      {item.title
                        .split(" ")
                        .map((word, index) =>
                          word === "strong" ? (
                            <strong key={index}>{word}</strong>
                          ) : (
                            ` ${word}`
                          )
                        )}
                    </h1>
                    <Link to="/about-us" className="primary-btn">
                      Get info
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </OwlCarousel>
    </section>
  );
};

export default Hero;
