import { useEffect } from "react";
import Loading from "./Loading";
import TrainingClass from "./TrainingClass";
import { useGlobal } from "../contexts/GlobalProvider";
import NotFound from "../pages/NotFound";

const ClassesSection = () => {
  const { trainingClasses, loading, errors, fetchTrainingClasses } =
    useGlobal();

  useEffect(() => {
    if (trainingClasses?.length === 0) {
      fetchTrainingClasses();
    }
  }, []);

  if (loading.trainingClasses) return <Loading index={true} />;
  if (errors?.trainingClasses) return <NotFound />;

  return (
    <section className="classes-section spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <span>Our Classes</span>
              <h2>WHAT WE CAN OFFER</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {trainingClasses?.length > 0
            ? trainingClasses.map((trClass) => (
                <TrainingClass key={trClass.id} trClass={trClass} />
              ))
            : "No Classes Found!!!"}
        </div>
      </div>
    </section>
  );
};

export default ClassesSection;
