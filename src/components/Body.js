import Form from "./Form";
import { useState } from "react";
const Body = ({ address, addFlower, flowers, buyFlowers, editQuantity }) => {
  const [quantity, setquantity] = useState();

  const handleQuantity = (index) => {
    if (!quantity || quantity <= 0) alert("Input correct quantity");
    editQuantity(index, quantity);
  };
  return (
    <main>
      <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to={0}
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to={1}
            aria-label="Slide 2"
          />
          {/* <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to={2}
            aria-label="Slide 3"
          /> */}
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              width="100%"
              height="100%"
              style={{ objectFit: "cover" }}
              alt=""
            />

            <div className="container">
              <div className="carousel-caption text-start">
                <h1>Buy a Flower</h1>

                <p>
                  <a className="btn btn-lg btn-primary" href="#">
                    Show me How
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              width="100%"
              height="100%"
              style={{ objectFit: "cover" }}
              alt=""
            />
            <div className="container">
              <div className="carousel-caption">
                <h1>Buy A flower for your loved ones</h1>
                <p>
                  Some representative placeholder content for the second slide
                  of the carousel.
                </p>
                <p>
                  <a className="btn btn-lg btn-primary" href="#">
                    Learn more
                  </a>
                </p>
              </div>
            </div>
          </div>
          {/* <div className="carousel-item">
            <svg
              className="bd-placeholder-img"
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <rect width="100%" height="100%" fill="#777" />
            </svg>
            <div className="container">
              <div className="carousel-caption text-end">
                <h1>One more for good measure.</h1>
                <p>
                  Some representative placeholder content for the third slide of
                  this carousel.
                </p>
                <p>
                  <a className="btn btn-lg btn-primary" href="#">
                    Browse gallery
                  </a>
                </p>
              </div>
            </div>
          </div> */}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* Marketing messaging and featurettes
      ================================================== */}
      {/* Wrap the rest of the page in another container to center all the content. */}
      <div className="container marketing">
        {/* Three columns of text below the carousel */}
        <div className="row">
          {flowers.map(
            (flower) => (
              <div className="col-lg-4">
                <img
                  style={{ borderRadius: "50%" }}
                  src={flower.image}
                  width={140}
                  height={140}
                  alt=""
                />

                <h2>{flower.name}</h2>
                <p>{flower.description}</p>
                <h4>Quantity: {flower.quantity}</h4>
                <h4>Price: {flower.price}ALGO</h4>

                <input
                  type="text"
                  onChange={(e) => setquantity(e.target.value)}
                  placeholder="Change Quantity "
                />
                <div className="d-flex justify-content-between">
                  <p>
                    <button
                      onClick={() => buyFlowers(flower)}
                      className="btn btn-secondary"
                    >
                      Buy
                    </button>
                  </p>
                  {flower.owner === address && (
                      <p>
                      <button
                        onClick={() => handleQuantity(flower)}
                        className="btn btn-secondary"
                      >
                        Edit
                      </button>
                    </p>
                  )}
                </div>
              </div>
            )
          )}
        </div>
        {/* /.row */}
        <Form addFlower={addFlower} />
      </div>

      {/* /.container */}
      {/* FOOTER */}
      <footer className="container">
        <p className="float-end">
          <a href="#">Back to top</a>
        </p>
        <p>
          © 2017–2021 Company, Inc. · <a href="#">Privacy</a> ·{" "}
          <a href="#">Terms</a>
        </p>
      </footer>
    </main>
  );
};

export default Body;
