import { useEffect, useState } from "react";

function App() {
//    New value like apple
const [newName, setNewName]=useState("")
// Array to store name 
const [item,setItem]=useState([])


// Load saved list on first render
useEffect(() => {
  const storedList = JSON.parse(localStorage.getItem("todoList"));
  if (storedList) {
    setItem(storedList);
  }
}, []);

// Save list whenever it changes
useEffect(() => {
  localStorage.setItem("todoList", JSON.stringify(item));
}, [item]);

//fade out animation
const [fadingItems, setFadingItems] = useState([]);



function Changed(event){
  const newValue=event.target.value;
  setNewName(newValue)
}

function HandleButtonClicked() {
  if (newName.trim() === "") return; // prevent adding empty
  setItem(prevValue => [...prevValue, newName]);
  setNewName("");
}


function handleDelete(indexToDelete) {
  // Mark this item as fading
  setFadingItems((prev) => [...prev, indexToDelete]);

  // After animation ends, remove it
  setTimeout(() => {
    setItem((prevItems) =>
      prevItems.filter((_, index) => index !== indexToDelete)
    );
    setFadingItems((prev) => prev.filter((i) => i !== indexToDelete));
  }, 400); // match CSS animation duration
}


  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input type="text" 
        onChange={Changed}
        value={newName}
        />
        <button
        onClick={HandleButtonClicked}
        >
          <span>Add</span>
        </button>
      </div>
      <div>
       <ul>
  {item.map((todoItem, index) => (
    <li
      key={index}
      className={fadingItems.includes(index) ? "fade-out" : ""}
    >
      {todoItem}
      <img
        className="cross-button"
        src="/images/letter-x.png"
        alt="Delete"
        onClick={() => handleDelete(index)}
      />
    </li>
  ))}
</ul>

      </div>
    </div>
  );
}

export default App;
