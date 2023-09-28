
const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercise}</p>
  )
}

const Content = (args) => {
  return (
    <div>
      <Part part={args.part1} exercise={args.exercise1}></Part>
      <Part part={args.part2} exercise={args.exercise2}></Part>
      <Part part={args.part3} exercise={args.exercise3}></Part>
    </div>
  )
}

const Total = (prop) => {
  return (
    <p>Number of exercises {prop.sum}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} exercise1={exercises1} part2={part2} exercise2={exercises2} part3={part2} exercise3={exercises3}/>
      <Total sum={exercises1+exercises2+exercises3}/>
    </div>
  )
}

export default App
