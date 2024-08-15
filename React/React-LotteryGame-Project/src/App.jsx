import './App.css'
import { sum } from './helper';
import Lottery from './Lottery'


function App() {

  let winCondition = (ticket) => {
    return sum(ticket) === 15;
  };

  return (
    <>
      < Lottery n={4} winCondition={winCondition} />
    </>
  )
}

export default App
