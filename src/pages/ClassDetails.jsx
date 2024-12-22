import { useParams } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import ClassesTimeTable from "../components/ClassesTimeTable";
import { useEffect, useState } from "react";
import api from "../api/axiosApi";
import Loading from "../components/Loading";
import Modal from "../components/Modal"; // Import the Modal component
import { useGlobal } from "../contexts/GlobalProvider";

const ClassDetails = () => {
  const { id } = useParams();
  const [trainingClass, setTrainingClass] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [selectedClass, setSelectedClass] = useState(null); // Store the selected class
  const { showNotification } = useGlobal();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await api.get(`/training-classes/${id}`);
        setTrainingClass(response.data.data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [id]);

  const handleBookClass = () => {
    setSelectedClass(trainingClass);
    setIsModalOpen(true);
  };

  const handleConfirmBooking = async () => {
    try {
      const response = await api.post("/bookings", {
        training_class_id: selectedClass.id,
      });

      showNotification(response.data.message, "success");
    } catch (error) {
      showNotification(error.response.data.message, "error");
    }

    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal if the user cancels
  };

  if (loading) {
    return (
      <>
        <BreadCrumb title="Class Details" />
        <Loading />
      </>
    );
  }

  if (error) {
    return <p>Error loading classes!</p>;
  }

  return (
    <>
      <BreadCrumb title="Class Details" />
      <section className="class-details-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="class-details-text">
                <div className="cd-pic">
                  <img src={trainingClass?.image} alt="" />
                </div>
                <div className="cd-text">
                  <div className="cd-single-item">
                    <h3>{trainingClass?.name}</h3>
                    <p>{trainingClass?.description}</p>
                  </div>

                  <div className="cd-single-item">
                    <p className="d-flex">
                      <button
                        onClick={handleBookClass}
                        className="primary-btn btn-normal appoinment-btn"
                      >
                        Book now
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="sidebar-option">
                <div className="so-categories">
                  <h5 className="title">Trainer</h5>
                  <div className="cd-trainer">
                    <div className="cd-trainer-text">
                      <div className="trainer-title">
                        <h4>{trainingClass?.trainer?.name}</h4>
                        <span>{trainingClass?.category} Trainer</span>
                      </div>
                      <div className="trainer-social">
                        <a href="#">
                          <i className="fa fa-facebook"></i>
                        </a>
                        <a href="#">
                          <i className="fa fa-twitter"></i>
                        </a>
                        <a href="#">
                          <i className="fa fa-youtube-play"></i>
                        </a>
                        <a href="#">
                          <i className="fa fa-instagram"></i>
                        </a>
                        <a href="#">
                          <i className="fa fa-envelope-o"></i>
                        </a>
                      </div>
                      <p>{trainingClass?.trainer?.specialties}</p>
                      <ul className="trainer-info">
                        {trainingClass?.trainer?.additionalInfo.map(
                          (info, id) => {
                            return (
                              <li className="text-capitalize" key={id}>
                                <span>{info.key}</span>
                                {info.value}
                              </li>
                            );
                          }
                        )}
                      </ul>
                    </div>
                  </div>
                  <div className="mx-auto">
                    <img src={trainingClass?.trainer?.image} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ClassesTimeTable />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmBooking}
        title="Confirm Your Booking"
        message={`Are you sure you want to book the "${selectedClass?.name}" class?`}
      />
    </>
  );
};

export default ClassDetails;
