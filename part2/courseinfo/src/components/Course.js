const Header = ({ course }) => <h1>{course}</h1>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  
  const total = parts.reduce((accumulator, part) => {
    return part.exercises + accumulator;
  },0)

  return (
  <>
    {parts.map(part => {
      return <Part part={part} key={part.id} />
    })}
    <h3>Total {total}</h3>
  </>
  )
}

const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
        </div>
    )
}

export default Course