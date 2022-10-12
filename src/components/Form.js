import { useState } from "react";

const Form = ({addFlower}) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const formHandler = (e) => {
    e.preventDefault();
    addFlower({name, image, description, quantity: parseInt(quantity), price: parseInt(price)})
  };
  return (
    <div>
      <h2>Add your flower</h2>

      <form onSubmit={formHandler}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Image"
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Quantity"
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Amount"
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
