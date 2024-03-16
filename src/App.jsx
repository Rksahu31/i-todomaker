import Navbar from "./components/Navbar";
import { useState ,useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
function App() {
  
  const [todo, settodo] = useState("")
  const [todolist, settodolist] = useState([])
  const [finshed, setfinshed] = useState(true)

  const togglefinshed =()=>{
    setfinshed(!finshed)


  }

  useEffect(() => {
    let todostring = localStorage.getItem("todolist")
    if(todostring){
      let todolist = JSON.parse(localStorage.getItem("todolist"))
      settodolist(todolist)

    }
  }, [])
  


  const savetoll =()=>{
    localStorage.setItem("todolist",JSON.stringify(todolist));
  }
  
  const handleDelte =(e,id)=>{
       
    let newtodolist = todolist.filter(iteam=>{
      return iteam.id != id;
    })
    settodolist(newtodolist)
    savetoll()
  }
  const handleEdit =(e,id)=>{
   
    let newtodo = todolist.filter(iteam => iteam.id === id)
    settodo(newtodo[0].todo)
    let newtodolist = todolist.filter(iteam=>{
      return iteam.id != id;
    })
    settodolist(newtodolist)
    savetoll()
  }
  const handleSave =()=>{
    
      settodolist([...todolist, { id:uuidv4() , todo, isCompleted:false}])

      savetoll()
      settodo("")
 
  }
  const handleChange =(e)=>{
    

    savetoll();
    settodo(e.target.value)
  }
  const handleCheckbox =(e)=>{
    let id =e.target.name;
    let index = todolist.findIndex(iteam=>{
      return iteam.id === id;
    })
    let newtodolist = [...todolist];
    newtodolist[index].isCompleted = !newtodolist[index].isCompleted ;
    settodolist(newtodolist);
    savetoll();
  }
  return (
    <>
      <Navbar />
      <div className="md:container mx-auto my-5 rounded-xl p-2  bg-indigo-400 min-h-[80vh] md:w-1/2">
      <h1 className="font-bold text-center text-xl">I-task Manger mange your daily todo </h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold text-black">Add Your TODO</h2>
          <input className=" w-full text-black rounded-lg px-1" type="text" onChange={handleChange} value={todo}/>

          <button onClick={handleSave} disabled={todo.length<=1}
            className=" text-white font-bold bg-indigo-800 hover:bg-indigo-950 p-2 py-1  cursor-pointer rounded-md
          text-sm ">
            SAVE
          </button>
        </div>
        <input type="checkbox" checked={finshed} onChange={togglefinshed} /> Show Finshed todo
        <h2 className="text-lg font-bold text-black"> Your Todos</h2>
       <div className="h-[1px] bg-black opacity-20 "></div>
        <div className="todolist">
        {todolist.length === 0 && <div className="my-4 font-bold">No todos to display</div>}
          {todolist.map(iteam =>{

            return  (finshed || !iteam.isCompleted) && <div key={iteam.id} className="todo flex justify-between md:w-1/2 my-3">
                   <div className="flex gap-3">
                        <input onChange={handleCheckbox} type="checkbox" checked={iteam.isCompleted} name={iteam.id} id="" />
                        <div className= {iteam.isCompleted ? "line-through":""}> {iteam.todo}</div>

                   </div>
                  <div className="buttons flex h-full">
                    <button  onClick={(e)=>{handleEdit(e,iteam.id)} }className=" text-white font-bold bg-indigo-800 hover:bg-indigo-950 p-2 py-1 mx-1 rounded-md text-sm">
                    <FaEdit />
                    </button>
                    <button onClick={(e)=>{handleDelte(e,iteam.id)} }className=" text-white font-bold bg-indigo-800 hover:bg-indigo-950 p-2 py-1 mx-1 rounded-md text-sm ">
                    <MdDeleteForever />
                    </button>
                  </div>
                </div>
          })}
          
        </div>
      </div>
    </>
  );
}

export default App;
