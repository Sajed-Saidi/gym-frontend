const GetInTouch = ({ settings }) => {
  return (
    <div className="gettouch-section">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="gt-text">
              <i className="fa fa-map-marker"></i>
              <p>{settings?.address}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="gt-text">
              <i className="fa fa-mobile"></i>
              <ul>
                <li>{settings?.phone}</li>
              </ul>
            </div>
          </div>
          <div className="col-md-4">
            <div className="gt-text email">
              <i className="fa fa-envelope"></i>
              <p>{settings?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
