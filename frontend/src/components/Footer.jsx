import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <section className="text-black">
      <footer className="bg-5 text-center text-md-start">
        <div className="container p-4">
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
              <h3 className="text-uppercase">ABOUT US</h3>
              <h5>Email: LerryLazy@gmail.com</h5>
              <h5>Phone: 123-456-7890</h5>
              <h5>Address: Quarter 6, Linh Trung Ward, Thu Duc District Ho Chi Minh City, Vietnam 70000 Ho Chi Minh City</h5>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0"></div>
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0 mt-5 pt-4">
              <a className="btn btn-link btn-floating btn-lg text-body m-1" href="#!" role="button" data-mdb-ripple-color="dark">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a className="btn btn-link btn-floating btn-lg text-body m-1" href="#!" role="button" data-mdb-ripple-color="dark">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a className="btn btn-link btn-floating btn-lg text-body m-1" href="#!" role="button" data-mdb-ripple-color="dark">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a className="btn btn-link btn-floating btn-lg text-body m-1" href="#!" role="button" data-mdb-ripple-color="dark">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center p-3 bg-5">
          LERRYLAZY
        </div>
      </footer>
    </section>
  );
}

export default Footer;
