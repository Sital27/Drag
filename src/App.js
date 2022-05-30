import React,{useState, useEffect} from 'react';
import './App.css';
import { DragDropContext,Droppable,Draggable } from 'react-beautiful-dnd';
import  _ from 'lodash';
import uuid from 'react-uuid';
import ModalComponent from './components/Modalnew';
import { FaBeer } from 'react-icons/fa';
import { AiOutlinePlusSquare } from "react-icons/ai";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BiDotsVertical } from "react-icons/bi";


const item1 = {
    id:  uuid(),
   content:"work",
   description:" do work"
    
}



const buttonStyle = {
    
 
    padding: '3px',
    bgcolor: 'blue',
  
   


}

const buttonstyles = {
    border:'1px',
    margin:'10px',
    padding: '05px',
    flex:'d-flex p-4',
    
}


const App = () => {
    const[todo, setTodo] = useState();
     const [list,setList] = useState();
     
     const [edit, setEdit] = useState()
     const [editItem, setEditItem] = useState();
    
    
  
    const[modalIsOpen, setModalIsOpen]= useState(false)
    const[state,setState]= useState( {
        todo: {
            title: "Todo",

           
            items : []
        
           
        },
        in_progress: {
            title:"In Progress",
            items: []

        },
        done : {
            title:"Done",
            items: []
        },

    })


const handleRemove = (item, key) =>{
    console.log(item)
    const id = item.id;
  
    

    const copy = state[key].items;

     console.log('object:::', copy)
     const index = copy.findIndex( value=>value.id == id)
  
    console.log("index::::", index)
    console.log("indexin::::", index)
    
    
     copy.splice(index,1) 
   
          

    console.log("after delete:::",copy)
    setState({
        ...state,
        [key]:{
            ...state[key],
            items:copy
        }  
    })

}




const handleEdit = (item,key) =>{
setModalIsOpen(true)
        setEdit(true)
        setEditItem(item)
         setList(key)
    console.log(item)
    const id = item.id;
    const copyedit = state[key].items;
 

  
    console.log('object:::', copyedit)
    const index = copyedit.findIndex(value=>value.id == id)
    console.log("index::::", index)
  
}



  


        
const  handledragEnd = ({destination,source})=> {


    console.log("from",source)
    console.log("to",destination)
    if(!destination){
        return
    }
    if (destination.index === source.index && destination.droppableId=== source.droppableId){
        return
    }

     const itemCopy = {...state[source.droppableId].items[source.index]}


     
     setState (prev => {
         prev = {...prev}

     
         prev[source.droppableId].items.splice(source.index,1)
        
          prev[destination.droppableId].items.splice(destination.index, 0,itemCopy)
          
         
          return prev
          })    


}


    
console.log("todo::::", todo)
    
    
   console.log('state:::', state)


const renderbutton = () => <button     
    className="btn btn-default"
    style={buttonStyle}
     type="submit" 
     onClick= { () => setModalIsOpen(true)} >
   <AiOutlinePlusSquare size={30}/>
    </button>   



return(
   
<div className= "App">
  

     <div className="button"> 

    
       
        
         </div>


       < ModalComponent 
    todo={todo} 
    setTodo={setTodo}  
    state={state} 
    setState={setState} 
    modalIsOpen={modalIsOpen} 
    setModalIsOpen={setModalIsOpen}
    editItem={editItem}
    list={list}
    setEditItem={setEditItem}
     setList={setList}
    />
    
          

         <DragDropContext onDragEnd = {handledragEnd} >
         
                {_.map(state,(data,key)=>{
                    return (
                        <div key={key} className={"column"}>
                            <div className="row">
                           <div className="col col-9" > 
                           
                          
                       <div className="title"> <h3>{data.title}</h3></div>
                    

                           </div>
                           
                       
                           </div>

                        
                                <Droppable droppableId={key} >
                                 {(provided)=>{
                                    return(
                             
                        
                                        <div 
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className ={"droppable-col"}
                                        >
                            <div className="plus"> {data.title==="Todo" && <div >{renderbutton()}</div>
                           
                        }
                        </div>  
                           
                                    {data.items.map((el,index) => {
                                    
                                  

                                        return(

                                            
                                           <Draggable key={el.id }  draggableId ={el.id}  index={index}  >
                                 
                                        {(provided)=> {
                                          
                                            return(
                                                <div
                                                 className= {"item"}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                               
                                                 >
                                                    
                                                    {el.content}<br/>
                                                    {el.description}<br/>
                                                    
                                                   
                          
                               
                            < button type ="button" onClick={()=>handleRemove(el,key)}>
                                   Delete
                                 </button>

                               <button type="button" onClick = { () => handleEdit(el,key)}>
                                   Edit
                               </button>
                                        
        
                               </div>     
                             
                                 
                                        )
                                        }}
                                        
                                           </Draggable> 
                                        )
                                    })}
                                    {provided.placeholder}

                                    </div>
                                )
                                }}
                            </Droppable>
                        </div>
                        )
                            
 
})}
</DragDropContext> 


</div>

);
};


export default App;