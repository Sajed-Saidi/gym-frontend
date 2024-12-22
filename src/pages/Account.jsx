import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Loading from "../components/Loading";
import TrainingClass from "../components/TrainingClass";
import NotFound from "./NotFound";
import { useGlobal } from "../contexts/GlobalProvider";

const Account = () => {
  const { user, authLoading, authError, fetchUser, showNotification } =
    useGlobal();
  const navigator = useNavigate();

  useEffect(() => {
    if (!user && !localStorage.getItem("token")) {
      showNotification("You should be logged in!");
      navigator("/");
      return;
    }

    fetchUser();
  }, []);

  if (authLoading)
    return (
      <>
        <BreadCrumb title="Account" />
        <Loading />
      </>
    );
  if (authError) return <NotFound />;

  return (
    <div>
      <BreadCrumb title="Account" />
      <section className="account spad">
        <div className="container">
          {/* User Information */}
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <span>Your Information</span>
                <h2>{user?.role}</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div
                className="card p-4 mb-5 text-white"
                style={{
                  backgroundColor: "#121212",
                  border: "1px solid #f36100",
                  borderRadius: "10px",
                }}
              >
                <h4 className="mb-3">
                  <span className="text-main" style={{ color: "#f36100" }}>
                    Name:
                  </span>{" "}
                  {user?.name}
                </h4>
                <h4>
                  <span className="text-main" style={{ color: "#f36100" }}>
                    Email:
                  </span>{" "}
                  {user?.email}
                </h4>
                {user?.subscription && (
                  <h4 className="my-3">
                    <span className="text-main" style={{ color: "#f36100" }}>
                      Subscribed with:
                    </span>{" "}
                    {user.subscription.plan.name}
                  </h4>
                )}
              </div>
            </div>
          </div>

          {/* Booked Classes */}
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <span>Booked</span>
                <h2>Classes</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {user?.bookings?.map(({ trainingClass }, id) => (
              <TrainingClass key={id} trClass={trainingClass}></TrainingClass>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Account;
