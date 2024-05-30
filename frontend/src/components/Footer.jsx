import React from "react";
const Footer = () => {
  return (
    // <section classNameName="text-black">
    //   <footer classNameName="bg-5 text-center text-md-start">
    //     <div classNameName="container p-4">
    //       <div classNameName="row">
    //         <div classNameName="col-lg-6 col-md-12 mb-4 mb-md-0">
    //           <h3 classNameName="text-uppercase">ABOUT US</h3>
    //           <h5>Email: LerryLazy@gmail.com</h5>
    //           <h5>Phone: 123-456-7890</h5>
    //           <h5>Address: Quarter 6, Linh Trung Ward, Thu Duc District Ho Chi Minh City, Vietnam 70000 Ho Chi Minh City</h5>
    //         </div>
    //         <div classNameName="col-lg-3 col-md-6 mb-4 mb-md-0"></div>
    //         <div classNameName="col-lg-3 col-md-6 mb-4 mb-md-0 mt-5 pt-4">
    //           <a classNameName="btn btn-link btn-floating btn-lg text-body m-1" href="#!" role="button" data-mdb-ripple-color="dark">
    //             <FontAwesomeIcon icon={faFacebookF} />
    //           </a>
    //           <a classNameName="btn btn-link btn-floating btn-lg text-body m-1" href="#!" role="button" data-mdb-ripple-color="dark">
    //             <FontAwesomeIcon icon={faTwitter} />
    //           </a>
    //           <a classNameName="btn btn-link btn-floating btn-lg text-body m-1" href="#!" role="button" data-mdb-ripple-color="dark">
    //             <FontAwesomeIcon icon={faInstagram} />
    //           </a>
    //           <a classNameName="btn btn-link btn-floating btn-lg text-body m-1" href="#!" role="button" data-mdb-ripple-color="dark">
    //             <FontAwesomeIcon icon={faGithub} />
    //           </a>
    //         </div>
    //       </div>
    //     </div>
    //     <div classNameName="text-center p-3 bg-5">
    //       LERRYLAZY
    //     </div>
    //   </footer>
    // </section>
    <footer className="text-center text-lg-start bg-body-tertiary text-muted">
    <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
        <span>Get connected with us on social networks:</span>
        </div>
        <div>
        <a href="" className="me-4 text-reset">
            <i className="fab fa-facebook-f"></i>
        </a>
        <a href="" className="me-4 text-reset">
            <i className="fab fa-twitter"></i>
        </a>
        <a href="" className="me-4 text-reset">
            <i className="fab fa-google"></i>
        </a>
        <a href="" className="me-4 text-reset">
            <i className="fab fa-instagram"></i>
        </a>
        <a href="" className="me-4 text-reset">
            <i className="fab fa-linkedin"></i>
        </a>
        <a href="" className="me-4 text-reset">
            <i className="fab fa-github"></i>
        </a>
        </div>
    </section>
    <section className="">
        <div className="container text-center text-md-start mt-5">
        <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3"></i>LERRY LAZY
            </h6>
            <p>
                Here you can use rows and columns to organize your footer content. Lorem ipsum
                dolor sit amet, consectetur adipisicing elit.
            </p>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">
                Products
            </h6>
            <p>
                <a href="#!" className="text-reset">Wool</a>
            </p>
            <p>
                <a href="#!" className="text-reset">Tool</a>
            </p>
            <p>
                <a href="#!" className="text-reset">Material</a>
            </p>
            <p>
                <a href="#!" className="text-reset">Product</a>
            </p>
            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">
                PRIVACY
            </h6>
            <p>
                <a href="#!" className="text-reset">Pricing</a>
            </p>
            <p>
                <a href="#!" className="text-reset">Settings</a>
            </p>
            <p>
                <a href="#!" className="text-reset">Orders</a>
            </p>
            <p>
                <a href="#!" className="text-reset">Help</a>
            </p>
            </div>
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
            <p><i className="fas fa-home me-3"></i>Quarter 6, Linh Trung Ward, Thu Duc District Ho Chi Minh City, Vietnam</p>
            <p>
                <i className="fas fa-envelope me-3"></i>
                LeryLazzy@gmail.com
            </p>
            <p><i className="fas fa-phone me-3"></i> + 01 234 567 88</p>
            <p><i className="fas fa-print me-3"></i> + 01 234 567 89</p>
            </div>
        </div>
        </div>
    </section>
    <div className="text-center p-4">
        © 2021 Copyright:
        <a className="text-reset fw-bold" href="https://mdbootstrap.com/">MDBootstrap.com</a>
    </div>
    </footer>
  );
}

export default Footer;
