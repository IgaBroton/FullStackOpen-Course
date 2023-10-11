
const Header = (name) => {
  return (
    <h1>{name.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Content = (args) => {
  return (
    <div>
      <Part part={args.part1}/>
      <Part part={args.part2}/>
      <Part part={args.part3}/>
    </div>
  )
}

const Total = (prop) => {
  return (
    <p>Number of exercises {prop.part1 + prop.part2 + prop.part3}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3}/>
      <Total part1={part1.exercises} part2={part2.exercises} part3={part3.exercises}/>
    </div>
  )
}

export default App
