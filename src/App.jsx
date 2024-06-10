import {useEffect, useState} from "react";
import Tiny from "./components/Tiny";
import Task from "./components/Task";
import Done from "./components/Done";
import './App.css';

const App = () => {

    const [doneItems, setDoneItems] = useState([]);

    useEffect(() => {
        setDoneItems(JSON.parse(localStorage.getItem('done')));
    }, [localStorage.getItem('done')]);


    return (
    <div className="App">
      <Tiny doneItems={doneItems} setDoneItems={setDoneItems}/>
      <Task setDoneItems={setDoneItems} />
      <Done doneItems={doneItems} setDoneItems={setDoneItems}/>
    </div>
  );
}

export default App;


