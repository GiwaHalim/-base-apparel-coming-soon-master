import Base from './Base';
import Hero from '/images/hero-desktop.jpg';


function App() {

  return (
    <>
    <div className="main">
        <Base/>
        <img src={Hero} alt="" className='hero'/>
    </div>
    </>
  )
}

export default App
