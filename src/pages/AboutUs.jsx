import BreadCrumb from "../components/BreadCrumb";
import ChoseUs from "../components/ChoseUs";
import TeamSection from "../components/TeamSection";

const AboutUs = () => {
  const progressBars = [
    { title: "Body building", percentage: 80 },
    { title: "Training", percentage: 85 },
    { title: "Fitness", percentage: 75 },
  ];

  return (
    <>
      <BreadCrumb title="About Us" />
      <ChoseUs />
      <section className="aboutus-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 p-0">
              <div
                className="about-video set-bg"
                data-setbg="src/assets/img/about-us.jpg"
                style={{
                  backgroundImage: "url('src/assets/img/about-us.jpg')",
                }}
              ></div>
            </div>
            <div className="col-lg-6 p-0">
              <div className="about-text">
                <div className="section-title">
                  <span>About Us</span>
                  <h2>What we have done</h2>
                </div>
                <div className="at-desc">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Quis ipsum suspendisse ultrices gravida. Risus
                    commodo viverra maecenas accumsan lacus vel facilisis.
                    Aliquip ex ea commodo consequat sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor.
                  </p>
                </div>
                <div className="about-bar">
                  {progressBars.map((item, index) => (
                    <div key={index} className="ab-item">
                      <p>{item.title}</p>
                      <div id={`bar${index + 1}`} className="barfiller">
                        <span
                          className="fill"
                          data-percentage={item.percentage}
                        ></span>
                        <div className="tipWrap">
                          <span className="tip"></span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <TeamSection />
    </>
  );
};

export default AboutUs;
