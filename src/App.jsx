import React, { useEffect, useState } from 'react'
import { useRef } from 'react'

const App = () => {
  const videoRef = useRef(null)
  const [ tanlash, setTanlash ] = useState(false)
  const streamRef = useRef(null)


  const startString = () => {
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true,
    }).then((stream) => {
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => videoRef.current.play()
    }).catch((err) => {
      alert(err)
    })
  }

  const stopString = () => {
    if (streamRef.current){
      streamRef.current.getTracks().map((el) => el.stop())
    }
  }


  useEffect(() => {
    stopString()
    if (tanlash) startString()
  }, [tanlash])

  return (
    <>
       <div className="wrapper">
        <video
          style={{display: tanlash ? 'block' : 'none'}} muted autoPlay playsInline ref={videoRef}
        ></video>
        <div className="controls">
          <button onClick={() => setTanlash(!tanlash)}>
            {tanlash ? 'Off' : 'On'}
          </button>
        </div>
      </div> 
    </>
  )
}

export default App