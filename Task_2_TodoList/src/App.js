import React, { useState } from "react";
import { TbPlaylistAdd } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { HiClipboardList } from "react-icons/hi";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import { MdPlaylistRemove } from "react-icons/md";
import { TbClipboardList } from "react-icons/tb";
import "./App.css";
function App() {
  const [item, setItem] = useState("");
  const [itemList, setItemList] = useState([]);
  const [update, setUpdate] = useState(false);
  const [updateItem, setUpdateItem] = useState(null);
  const [bool, setBool] = useState(false);

  function addItem() {
    if(item && update){
      setItemList(
        itemList.map((elem) =>{
           if(elem.id===updateItem){
            return {...elem,name:item}
           }
           return elem;
        }
        )
      )
      setItem("")
      setUpdate(false);
      setUpdateItem(null);

    }
    else if(item !== "") {
      const inputItem={id:new Date().getTime().toString(),name:item};
      setItemList([...itemList, inputItem]);
      setItem("");
    }
  }

  function deleteItems(){
    setItemList([]);
  }

  function Cutter(){
    setBool(!bool);
  }

  function updating(target){
    const updatedItem=itemList.find((e)=>{
      if(e.id===target){
        return e.name;
      }
    })
    setItem(updatedItem.name);
    setUpdate(true);
    setUpdateItem(target);
  }

  function deleteItem(target){
    const newItemList=itemList.filter((element)=>{
      if(element.id!==target){
        return element;
      }
    })
    setItemList(newItemList);
  }
  return (
    <div className="container">
      <h1 className="title">Todo List</h1>
      <div className="add">
      <HiClipboardList className="list"/>
        <input
          className="input"
          type="text"
          placeholder="Add Item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        {(update)?<TbClipboardList className=" ichov" onClick={addItem} />:<TbPlaylistAdd className=" ichov" onClick={addItem} />}
        
      </div>
      {itemList.map((element) => {
        return (
          <div className="tasks" key={element.id}>
            <div className="task">
              {(bool)?<MdPlaylistRemove className="list"/>:<MdOutlinePlaylistAddCheck className="list"/>}
              <span onClick={Cutter} style={(bool)?{textDecoration:"line-through"}:null}>{element.name}</span>
              <TbClipboardList className="update" onClick={()=>updating(element.id)}/>
              <MdDeleteOutline className="delete" onClick={()=>deleteItem(element.id)}/>
            </div>
          </div>
        );
      })}
      <button className="button" onClick={deleteItems}>Clear All</button>
      <div className="margin-100"></div>
      
    </div>
  );
}
export default App;
