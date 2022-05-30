import React,{useState, useEffect} from 'react';
import {Form,Input,Button} from 'antd';
import uuid from 'react-uuid';
import Modal from 'react-modal';
import './modal.css';

const CustomStyles ={
    width: "100%",
    height:"100%",
    bgcolor:"black",
    opacity:"0.7%",
    position:"absolute",
    top: 0,
};

const ModalComponent = ({setTodo,setEditItem, setState,editItem={},todo,state,modalIsOpen,setModalIsOpen,list,setList}) => {
   
    
    const [ text,setText] = useState(editItem.content)
    const [description, setDescription] = useState(editItem.description)
    console.log('text:::', text)
     console.log('description:::',editItem)
    
    

      const additem=()=>{
        setTodo({
            ...todo,
            content:text,
            description:description
        })
        setState({
            ...state,
            todo:{
                ...state.todo,
                items:[
                    ...state.todo.items,
                    {
                        id:uuid(),
                         content: text,
                        description: description
                    },
                ]
            }
           
        })
       setText("")
       setDescription("")
       setModalIsOpen(false)
           
       }
        console.log(state);

const edititem = () => {
    console.log("edit action triggered")
    const id = editItem.id;

    const copyEdit = state[list].items;
  
   
    console.log('object:::', copyEdit)
    console.log('ITEMMM:::::', editItem)
    console.log(id);
    
    const index = copyEdit.findIndex(value=>value.id == id)
   
    copyEdit[index]={
        content:text,
        description:description
    }


   
    console.log('copy edit after:::', copyEdit)
console.log("edit index::::", index)
    
setState({
    ...state,
    [list]:{
        ...state[list],
       
                    
       
           items: [
            ...copyEdit,
            
        ]
    }
   
})
setList("")
setEditItem({})
setText("")
setDescription("")
setModalIsOpen(!modalIsOpen)

}
console.log("..state",state)



  
      return(
      

        <div className="bg-modal">
            <Modal 
            styles={CustomStyles}
        
            isOpen = {modalIsOpen} >
      
         <div className="form">
              <div className="form-content">
 
        <Form 
       
        labelCol={{span:8}}
        wrapperCol={{span:16}}
       
        autoComplete="off"
        initialValues={{
            field:editItem.content,
            text: editItem.description
        }}
         >
            

        
 
            <Form.Item label="Title" name="field" onChange={(e)=> setText(e.target.value)}  initialValue={text} 
            rules={[{ required: true, message: 'Title is required!' },
            {
              max: 20,
              message: "'Title' can not be longer than 20 characters",
            }]}>
             <Input.TextArea rows={2} style={{ width: 500 }} value={text} initialValue={text} >{text}</Input.TextArea >
             </Form.Item>

            <Form.Item label="Description">
             <Form.Item name="text"   onChange={(e)=> setDescription(e.target.value)}  initialValue={text}  rules={[{ required: true, message: 'Description is required!' },
             
             {max: 100,
             message: "'Title' can not be longer than 100 characters",
            
             }]} >
             <Input.TextArea rows={6} style={{ width: 500 }}  value={text} />
                </Form.Item>
 
                </Form.Item>
                
                <button  type = "submit" class="btn btn-secondary" onClick={()=> list? edititem() : additem()}>OK</button>   
            
             </Form>
           
     
             </div>
          </div> 
      
  
          </Modal>
          
          </div>
        
        
        
         
      )

      
  }
  export default ModalComponent;
   