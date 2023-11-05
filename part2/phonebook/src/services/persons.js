import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons'

const create_person = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const delete_person = (id) => {
    const request = axios.delete(baseUrl + '/' + id)
    return request
}

export default { create_person, delete_person }