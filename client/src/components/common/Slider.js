import React, {useState, useEffect} from 'react'
import slider1 from '../../assets/slider1.jpg'
import slider2 from '../../assets/slider2.jpg'
import slider3 from '../../assets/slider3.jpg'
import slider4 from '../../assets/slider4.jpg'
import slider5 from '../../assets/slider5.jpg'

export const Slider = () => {

    const sliderData = [
        {
           img: slider1,
           value: 0,
           contentMain: 'ShopO',
           contentSub: 'best cell phone deals only at'
        },
        {
            img: slider2,
            value: 1,
            contentMain: 'ShopO',
            contentSub: 'best quality accessories only at'
        },
        {
            img: slider3,
            value: 2,
            contentMain: 'ShopO',
            contentSub: 'best selling graphics cards only at'
        },
        {
            img: slider4,
            value: 3,
            contentMain: 'ShopO',
            contentSub: 'best laptop deals only at'
        },
        {
            img: slider5,
            value: 4,
            contentMain: 'ShopO',
            contentSub: 'best cell phone deals only at'
        },
    ]
    const [sliderImage, setSliderImage] = useState(sliderData[0])
    const [count, setCount] = useState(0)

    const handleNextImg = () => {
        if(count < sliderData.length){
            setCount(count < (sliderData.length - 1) ? count + 1 : count)
            setSliderImage(sliderData[count < (sliderData.length - 1) ? count + 1 : count])
        }
    }

    const handlePreviousImg = () => {
        if(count >= 0){
            setCount(count > 0 ? count-1 : count)
            setSliderImage(sliderData[count > 0 ? count-1 : count])
        }
    }

    useEffect(() => {
        setTimeout(() => {
            if(count < sliderData.length){
                handleNextImg()
                if(count == 3){
                    setCount(-1)
                }
            }
        }, 5000);
    }, [count])
    

  return (
    <div >
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 p-0">
                    <div className='slider-container fade-in-image'>
                        <div className='slider-content text-center'>
                            <h4 className='text-white text-uppercase'>{sliderImage.contentSub}</h4>
                            <h1 className='text-white'>
                                {sliderImage.contentMain}
                            </h1>
                        </div>
                        <i className='fa fa-chevron-left' onClick={()=> handlePreviousImg()}></i>
                            <img src={sliderImage.img} alt="" className='slider-img'/>
                        <i className='fa fa-chevron-right' onClick={()=> handleNextImg()}></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
