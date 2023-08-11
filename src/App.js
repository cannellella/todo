import { useCallback, useRef, useState } from 'react';
import './App.css';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';

function App() {
  const[todos,setTodos] = useState([
    {
      id: 1,
      text: '운동하기',
      checked: true,
    },
    {
      id: 2,
      text: '요리하기',
      checked: true,
    },
    {
      id: 3,
      text: '학원가기',
      checked: false,
    }

  ]);


  const nextId = useRef(4); 
  console.log(nextId);

  const onInsert = useCallback((value) => {
    //객체 todo
    const todo ={
      id: nextId.current ,
      text: value ,
      checked: false ,
    };

    setTodos(todos.concat(todo));
    nextId.current += 1;
  }, [todos])

  const onToggle = useCallback((id) => {
    // todo랑 내가 가져온 todo의 아이디랑 같은지 비교
    // { ... todo, checked : !todo.checked } 많이 사용하는 방법 / 기존 checked 속성의 값을 부정checked 속성으로 바꿔라 ex/ ture면 false로 바뀐다
    // 스프라이드?연산자 ... 점 세개 - todo 객체의 기존 속성들을 가져와 checked 속성만 바꿔줘라
    setTodos ( todos.map( todo => todo.id === id ? {...todo, checked: !todo.checked} : todo )) 
  },[todos])
  
  const onRemove = useCallback((id) => {
    setTodos(todos.filter( todo => todo.id !== id ))
  },[todos])

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos = {todos} onToggle={onToggle} onRemove={onRemove} />
    </TodoTemplate>
  );
}

export default App;
