import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burger-react-32790.firebaseio.com/'
})

export default instance