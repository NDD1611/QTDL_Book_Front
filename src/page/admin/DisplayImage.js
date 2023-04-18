
import { useEffect, useState } from 'react'
import mainServices from '../../services/main'
import './DisplayImage.scss'
import Header from '../../component/Header'
function DisplayImage() {
    let [imageLists, setImageLists] = useState([])
    useEffect(() => {
        getData()
    }, [])
    let getData = async () => {
        let data = await mainServices.getAllImage()
        setImageLists(data)
    }

    let addBackEndURL = (link) => {
        return process.env.REACT_APP_BACKEND_HOST + link
    }
    let setClipboard = (text) => {
        navigator.clipboard.writeText(text)
    }
    console.log('re render')

    return (
        <>
            <Header />
            <div id="displayImage">
                {
                    imageLists.map((image, index) => {

                        return (
                            <div key={index} className="image" onClick={() => { setClipboard(image) }}>
                                <img src={addBackEndURL(image)} />
                                <p>{image}</p>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default DisplayImage