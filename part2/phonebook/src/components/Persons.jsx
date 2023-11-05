const Persons = ({persons, filter, deleteName}) => {
    return (
        <div>
            {persons.filter(person =>person.name.toUpperCase().includes(filter.toUpperCase())).map(person => <div key={person.id}> {person.name} {person.number} <button onClick={() => deleteName(person.id)}>delete</button></div>)}
        </div>
    )
}

export default Persons