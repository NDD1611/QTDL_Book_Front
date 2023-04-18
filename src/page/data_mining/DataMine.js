
import { useState } from "react"
import axios from '../../axios'
function DataMine() {

    let [image, setImage] = useState()
    let [name, setName] = useState('')

    let getFile = (e) => {
        let image = e.target.files[0]
        setImage(image)
    }

    let postFile = async (e) => {
        console.log("post")
        let formData = new FormData()
        formData.append('image', image)
        let res = await axios.post('/face_detect', formData)
        console.log(res)
        setName(res)
    }

    return (
        <div>
            <input type="file" accept="image/gif, image/jpeg, image/png" onChange={(e) => { getFile(e) }} />
            <button onClick={() => { postFile() }}>Dự đoán</button>
            <div>Label:</div>
            <span>{name}</span>
        </div>
    )
}
export default DataMine