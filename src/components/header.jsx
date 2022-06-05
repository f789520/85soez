export const Header = (props) => {
  return (
    <header id="header">
      <form className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1>
                  {props.data ? props.data.title : "Loading"}
                  <span></span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </form>
    </header>
  );
};
