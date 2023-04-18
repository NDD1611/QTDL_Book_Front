
import axios from '../axios'
let getAllImage = async () => {
    let res = await axios.get('/all-image')
    return res
}

export default {
    getAllImage
}