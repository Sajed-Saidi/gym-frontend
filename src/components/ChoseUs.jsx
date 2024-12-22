const ChoseUs = () => {
  const features = [
    {
      id: 1,
      icon: "flaticon-034-stationary-bike",
      title: "Modern equipment",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut dolore facilisis.",
    },
    {
      id: 2,
      icon: "flaticon-033-juice",
      title: "Healthy nutrition plan",
      description:
        "Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
    },
    {
      id: 3,
      icon: "flaticon-002-dumbell",
      title: "Professional training plan",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut dolore facilisis.",
    },
    {
      id: 4,
      icon: "flaticon-014-heart-beat",
      title: "Unique to your needs",
      description:
        "Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
    },
  ];

  return (
    <section className="choseus-section spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <span>Why choose us?</span>
              <h2>PUSH YOUR LIMITS FORWARD</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {features.map((feature) => (
            <div className="col-lg-3 col-sm-6" key={feature.id}>
              <div className="cs-item">
                <span className={feature.icon}></span>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChoseUs;
