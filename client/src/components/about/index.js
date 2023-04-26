import React from 'react'
import './about.css'

export const About = () => {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <img src="https://media.istockphoto.com/id/1319763191/photo/mixed-race-man-paying-online-on-mobile-phone.jpg?s=612x612&w=0&k=20&c=0WKkDuRmJbWmZMu423y2-YbO-BBfXm_91iJEDOCLhrI="
                            alt="" className='img-fluid' />
                    </div>
                    <div className="col-6 about">
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries but also the on leap into electronic typesetting.
                        </p>
                        <button className='btn-sm btn-custom'>Contact Us</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
