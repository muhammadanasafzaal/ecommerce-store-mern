import React from 'react'
import '../../App.css';
export const Footer = () => {
    return (
        <>
            <div className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-sm-4 col-xs-12">
                            <div className="single_footer">
                                <h4>Services</h4>
                                <ul>
                                    <li><a href="#">Lorem Ipsum</a></li>
                                    <li><a href="#">Simply dummy text</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-12">
                            <div className="single_footer single_footer_address">
                                <h4>Page Link</h4>
                                <ul>
                                    <li><a href="#">Lorem Ipsum</a></li>
                                    <li><a href="#">Simply dummy text</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-12">
                            <div className="single_footer single_footer_address">
                                <h4>Follow Us</h4>
                            </div>
                            <div className="social_profile">
                                <ul>
                                    <li><a href="#"><i className="fa fa-facebook-f"></i></a></li>
                                    <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                    <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-sm-12 col-xs-12">
                            <p className="copyright">Copyright © {(new Date()).getFullYear()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
