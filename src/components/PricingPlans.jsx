import { useEffect, useState } from "react";
import Modal from "./Modal";
import Loading from "./Loading";
import api from "../api/axiosApi";
import { useGlobal } from "../contexts/GlobalProvider";
import NotFound from "../pages/NotFound";

const PricingPlans = () => {
  const { plans, loading, errors, fetchPlans, showNotification } = useGlobal();

  useEffect(() => {
    if (plans?.length === 0) {
      fetchPlans();
    }
  }, []);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEnrollClick = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true); // Show the modal
  };

  const handleConfirm = async () => {
    try {
      const response = await api.post("/subscriptions", {
        plan_id: selectedPlan.id,
        method: "cash",
      });

      showNotification(response.data.message, "success");
    } catch (error) {
      showNotification(error.response.data.message, "error");
    }

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Close the modal
  };

  if (loading.plans) return <Loading index={true} />;
  if (errors?.plans) return <NotFound />;

  return (
    <section className="pricing-section spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <span>Our Plan</span>
              <h2>Choose your pricing plan</h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {plans.map((plan) => (
            <div key={plan.id} className="col-lg-4 col-md-8">
              <div className="ps-item">
                <h3>{plan.name}</h3>
                <div className="pi-price">
                  <h2>${plan.price}</h2>
                  <span>{plan.durationInDays} days</span>
                </div>
                <ul>
                  {plan.features.split(",").map((feature, index) => (
                    <li key={index}>{feature.trim()}</li>
                  ))}
                </ul>
                <button
                  className="primary-btn pricing-btn"
                  onClick={() => handleEnrollClick(plan)}
                >
                  Enroll now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal component */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        title="Confirm Enrollment"
        message={`Are you sure you want to subscribe in the ${selectedPlan?.name} plan for $${selectedPlan?.price}?`}
      />
    </section>
  );
};

export default PricingPlans;
