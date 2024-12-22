import OwlCarousel from "react-owl-carousel";
import { useGlobal } from "../contexts/GlobalProvider";
import Loading from "./Loading";
import StarRating from "./StarRating";
import { useEffect } from "react";
import NotFound from "../pages/NotFound";

const TeamSection = () => {
  const { trainers, loading, errors, fetchTrainers } = useGlobal();

  useEffect(() => {
    if (trainers?.length === 0) {
      fetchTrainers();
    }
  }, []);

  if (loading.trainers) return <Loading index={true} />;
  if (errors?.trainers) return <NotFound />;

  return (
    <section className="team-section spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="team-title">
              <div className="section-title">
                <span>Our Team</span>
                <h2>TRAIN WITH EXPERTS</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <OwlCarousel
            className="ts-slider owl-carousel"
            loop={true}
            margin={10}
            responsiveClass={true}
            nav={true}
            dots={true}
            // autoplay={true}
            responsive={{
              0: {
                items: 1,
              },
              600: {
                items: 2,
              },
              1000: {
                items: 3,
              },
            }}
          >
            {trainers?.map((member, index) => (
              <div key={index} className="col-lg-4">
                <div
                  className="ts-item set-bg"
                  data-setbg={member.image}
                  style={{ backgroundImage: `url(${member.image})` }}
                >
                  <div className="ts_text">
                    <h4>{member.name}</h4>
                    <span className="d-flex justify-content-center">
                      <StarRating rating={member.rating} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
