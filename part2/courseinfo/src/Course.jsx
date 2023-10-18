const Course = ({course}) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }
  
  const Header = ({name}) => {
    return (
      <h2>{name}</h2>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map(part => <Part key={part.id} part={part} />)}
      </div>
    )
  }
  
  const Part = ({part}) => {
    return (
      <p>{part.name} {part.exercises}</p>
    )
  }
  
  const Total = ({parts}) => {
    const totalAmount = parts.reduce((sum, part) => sum + part.exercises, 0)
    console.log(totalAmount)
    return (
      <p><b>total of {totalAmount} exercises</b></p>
    )
  }

  export default Course