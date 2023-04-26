import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from "react-redux";
import { response } from "../redux/generalSlice";

export default function Toaster() {
    let apiRes = useSelector((state) => state.response);
    const dispatch = useDispatch();

    const setToaster = () => {
        if(apiRes.type === 'success'){
            toast.success(apiRes.message, {
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
            })
        }
        else{
            toast.error(apiRes.message,{
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
            })
        }
        dispatch(response(""))
    }

    useEffect(() => {
        setToaster()
    }, [apiRes])
    

  return (
    <div>
        <ToastContainer />
    </div>
  )
}
