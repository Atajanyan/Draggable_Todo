import './App.css';
import { useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';
import Draggable from 'react-draggable';
import {randomColor} from 'randomcolor';



function App() {
 const [item,setItem] = useState('')
 const [items,setItems] = useState(JSON.parse(localStorage.getItem('todoItems')) || [])
 const focus = useRef()

 useEffect(()=>{
  localStorage.setItem('todoItems',JSON.stringify(items))
 },[items])

 const newItem = () => {
  if(item.trim()){
    const newTodo = {
      id:v4(),
      item,
      color:randomColor({luminosity: 'light',}),
      defaultPos:{
        x:500,
        y:-300,
      }
    }
    setItems(prev=>[...prev,newTodo])
    setItem('')
  }else{
    alert('Enter something...')
    setItem('')
  }
  focus.current.focus()
 }

 const deleteTodo = (id) => {
    setItems(items.filter(e=>e.id !==id))
 }

 const updatePos = (data,index) => {
  let newArray = [...items]
  newArray[index].defaultPos = {x:data.x, y:data.y}
  setItems(newArray)
 }

  return (
    <div className="App">
      <div className="wrapper">
        <form action="" onSubmit={(e)=>e.preventDefault()}>
          <input 
           ref={focus}
           type="text"  
           placeholder='Draggable todo' 
           value={item} 
           onChange={(e)=>setItem(e.target.value)}
           />
          <button className='button' onClick={newItem}>ENTER</button> 
        </form>

      </div>
      {
        items.map((item,index)=>{
        return  <Draggable 
            key={item.id} 
            defaultPosition={item.defaultPos}
            onStop={(_,data)=>{
              updatePos(data,index)
            }}
            >
            <div className="todoItem" style ={{backgroundColor:item.color}}>
              {`${item.item}`}
              <button className='delete' onClick={()=>deleteTodo(item.id)}>X</button>
            </div>
          </Draggable>
        })
      }
    </div>
  );
}

export default App;
