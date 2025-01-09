import BarChart from "./components/BarChart"

const Home = () => {
  return (
    <div style={{display:"flex",flexDirection:"row"}}>
      <BarChart title="三大框架满意度"/>
      <BarChart title="三大框架使用度"/>
      </div>
  )
}

export default Home