import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useGlobal } from "../contexts/GlobalProvider";
import NotFound from "./NotFound";

const Login = () => {
  const {
    settings,
    loading,
    errors,
    fetchSettings,
    showNotification,
    user,
    login,
    authLoading,
    authError,
  } = useGlobal();
  const navigator = useNavigate();

  useEffect(() => {
    if (!settings) {
      fetchSettings();
    }
  }, []);

  useEffect(() => {
    if (user) {
      navigator("/");
      showNotification("Already Logged In", "warning");
    }
  }, []);

  const { handleSubmit, register } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await login(data.email, data.password);

      if (response) {
        showNotification("Logged in successfully", "success");
        navigator("/");
      }
    } catch (error) {
      showNotification(error?.message, "error");
    }
  };

  if (loading.settings || authLoading) return <Loading index={true} />;
  if (errors?.settings) return <NotFound />;

  return (
    <div
      className="login-section"
      style={{
        background: "#151515",
        minHeight: "100vh",
        backgroundImage: "url('src/assets/img/hero/hero-1.jpg')",
        position: "relative",
        zIndex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="overlay"
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "#0000009c",
          position: "absolute",
          zIndex: -1,
          top: 0,
          left: 0,
        }}
      ></div>
      <div className="container">
        <div
          className="content"
          style={{
            maxWidth: "500px",
            margin: "auto",
            padding: "40px",
            borderRadius: "8px",
            backgroundColor: "#222",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="section-title text-center mb-5">
            <span className="mb-4">
              <Link to="/">
                <img
                  src={settings?.logo}
                  alt="Logo"
                  style={{ width: "120px", marginBottom: "20px" }}
                />
              </Link>
            </span>
            <h2
              className="mt-5"
              style={{ fontSize: "28px", fontWeight: "600", color: "#fff" }}
            >
              Login
            </h2>
          </div>
          <div className="leave-comment mt-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                style={{
                  marginBottom: "20px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                }}
              />
              {authError?.errors?.email && (
                <p style={{ color: "red" }}>{authError?.errors?.email[0]}</p>
              )}

              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                style={{
                  marginBottom: "30px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                }}
              />
              {authError?.errors?.password && (
                <p style={{ color: "red" }}>{authError?.errors?.password[0]}</p>
              )}

              <button
                type="submit"
                style={{
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                Submit
              </button>
            </form>
          </div>
          <div className="footer-text mt-3 text-center">
            <p style={{ color: "#fff" }}>
              Don&apos;t have an account?
              <Link
                to="/sign-up"
                style={{
                  color: "var(--orange)",
                  textDecoration: "underline",
                  marginLeft: "8px",
                }}
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
