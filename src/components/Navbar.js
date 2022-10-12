import { microAlgosToString } from "../utils/conversions";

const Navbar = ({balance})=>{
    return (
        <header>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Floral</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              
                <button className="btn btn-outline-success" type="submit">Balance: {microAlgosToString(balance)} ALGO</button>
            </div>
          </div>
        </nav>
      </header>
    )
}

export default Navbar;