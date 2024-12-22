import BeatLoader from "react-spinners/BeatLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#f36100",
  borderTopColor: "#f36100", // Make the top part of the spinner orange
};

const Loading = ({ index = false }) => {
  return (
    <div
      style={{
        backgroundColor: "black",
        minHeight: index ? "100vh" : "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BeatLoader
        color="#f36100"
        cssOverride={override}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loading;
