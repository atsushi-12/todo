import logo from './logo.svg';
import './App.css';
//uuid 
import { v4 as uuidv4 } from 'uuid';
//useState and useEffect,useRef for todo
import { useState,useEffect,useRef } from 'react';
//mui
import { Button } from '@mui/material';
  //drawer from mui
import Drawer from '@mui/material/Drawer';
//card from mui
import Card from '@mui/material/Card';
//emotion
import styled from '@emotion/styled';
//material-icon
////////////////////////////////
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { common } from '@mui/material/colors';
////////////////////////////////  



const TextButton = styled(Button)`
  position: absolute;
  top: 80%;
  left: 85%;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  `;

function App() {
  const uniqueID = uuidv4();;
  //todoのstate
  const [input, setInput] = useState();
  //handleInput
  const handleInput = (e) => {
    setInput(e.target.value);
  };
  //inputのuseRef
  const inputRef = useRef(null);
  
  //hambuger menuのstate
  const [drawerOpened, setDrawerOpened] = useState(false);
  const handleDrawerChange = () => {
    console.log("drawerOpened", drawerOpened);
    setDrawerOpened(!drawerOpened);
  };

  //todoのstate
  const [todo, setTodo] = useState([]);

  const todoAddHandler = (e) => {
    e.preventDefault();
    setTodo((prevTodo) => [
      ...prevTodo,
      {id: uniqueID, text: input, completed: false}
    ])
    inputRef.current.value = "";
  }

    useEffect(() => {
      console.log("todo", todo);
    }, [todo]);
    useEffect(() => {
      console.log("input", input);
    }, [input]);

    //delete todo
    const deleteTodoHandler = (id) => {
      setTodo(
        todo.filter((todo) => {
          return todo.id !== id;
        })
      );
    };

    //edit todo
    const [editOpen, setEditOpen] = useState(false);
    const [currentID, setCurrentID] = useState("");
    const openEditMenuHandler = (e) => {
      console.log("editOpen", editOpen);
      setEditOpen(!editOpen);
      setCurrentID(e);
      
    }

    const editTodoHandler = (id,value) => {
      setTodo((prevTodo) =>{
        const updateTodo = prevTodo.map((todo) => {
        if (todo.id === id){
          return {...todo, text:value};
        }
        return todo;
    })
    setEditOpen(!editOpen);
    setInput("");
    return updateTodo;
      
      })}
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Card variant='outlined' sx={{ width: 1000, height: 300 }} >
          <ul>
            {todo.map((todo) => (
              <Card variant='outlined' sx={{ width:800,height: 50 }} >
              <li style={{display:'flex',justifyContent:"space-between",height:"100%"}} key={todo.id}>
                {todo.completed? "完了" : "未完了"}
                <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                {todo.completed?
                <p>完了されたタスク</p> :
                <p style={{height:"100%"}}>{todo.text}</p>
}
                </div>
                <div>
                  <Button variant="contained" onClick={()=>openEditMenuHandler(todo.id)}> 編集 </Button>
                  <Button variant="contained" onClick={()=>deleteTodoHandler(todo.id)}> 削除 </Button>
                </div>
                </li>
              </Card>
            ))}
          </ul>
        </Card>

      </header>
      <TextButton variant="contained" onClick={handleDrawerChange}>
        <AddIcon onClick={handleDrawerChange}/>
      </TextButton>
      
      
      {/* ハンバーガーメニュー */}
      {/* 左 */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={drawerOpened}
        PaperProps={{style: {width: "25%"}}
      }>
        <div style={{padding:10}}>
          <h2>ToDOの追加</h2>
          {/* todoを配列に登録するためのフォーム */}
          <form>
            <input type="text" placeholder="todoを入力してください。" onChange={handleInput} ref={inputRef}/>
          {input ? <Button type="submit" onClick={todoAddHandler}>追加</Button> : "..."}
          </form>

          
          <TextButton variant="contained" onClick={handleDrawerChange}>
            <RemoveIcon onClick={handleDrawerChange}/>
          </TextButton>
        </div>
      </Drawer>
      <Drawer
        variant="temporary"
        anchor="top"
        open={editOpen}
        PaperProps={{style: {width: "50%",position:"absolute",top:"50%",left:"50%",transform:"translateX(-50%) translateY(-50%)"}}
      }>
        <div style={{padding:10}}>
          <h2>ToDoの編集</h2>
          <form>
            <input type="text" placeholder="todoを入力してください。" onChange={handleInput} ref={inputRef}/>
          {input ? <Button variant='contained' onClick={()=>editTodoHandler(currentID,input)}>編集</Button> : "..."}
          </form>
          </div>
        </Drawer>   
        

        </div>
  );
}

export default App;
