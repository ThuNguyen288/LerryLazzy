import React from "react";
const Footer = () => {
  return (
    <footer className="text-center text-lg-start bg-body-tertiary text-muted">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"></section>
        <section className="">
            <div className="text-center text-md-start mt-5">
                <div className="row mt-3">
                    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                        <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                        <p><i className="fas fa-home me-3"></i>Quarter 6, Linh Trung Ward, Thu Duc District Ho Chi Minh City, Vietnam</p>
                        <p><i className="fas fa-envelope me-3"></i>Lerrylazzyshop@gmail.com</p>
                        <p><i className="fas fa-phone me-3"></i> +(84) 334 280 850</p>
                    </div>
                    <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                        <h6 className="text-uppercase fw-bold mb-4">PRIVACY & POLICY</h6>
                        <p><a href="#!" className="text-reset">Pricing Policy</a></p>
                        <p><a href="#!" className="text-reset">Setting Policy</a></p>
                        <p><a href="#!" className="text-reset">Order Policy</a></p>
                        <p><a href="#!" className="text-reset">Help</a></p>
                    </div>
                    <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                        <h6 className="text-uppercase fw-bold mb-4">SOCIAL NETWORK</h6>
                        <p><i className="fab fa-facebook me-3"></i>Lerry Lazzy Handmade</p>
                        <p><i className="fab fa-google me-3"></i>Lerry Lazzy Handmade</p>
                        <p><i className="fab fa-instagram me-3"></i>lerry.lazzy_handmade</p>
                    </div>
                </div>
            </div>
        </section>
        <div className="text-center p-4">
            <p className="text-reset">© 2023 Copyright: <span className="fw-bold">LerryLazyHandmade</span></p>
        </div>
    </footer>
  );
}

export default Footer;
