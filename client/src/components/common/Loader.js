import React from 'react'
import '../../App.css'

export const Loader = () => {
  return (
    <div>
        <div className='spinner-main'>
            <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
            </div>
        </div>
    </div>
  )
}
