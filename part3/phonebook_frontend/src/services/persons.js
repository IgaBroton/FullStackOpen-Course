import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create_person = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const delete_person = (id) => {
    const request = axios.delete(baseUrl + '/' + id)
    return request
}

const edit_person = (id, changedPerson) => {
    const request = axios.put(baseUrl + '/' + id, changedPerson)
    return request.then(response => response.data)
}

export default { create_person, delete_person, edit_person, getAll }