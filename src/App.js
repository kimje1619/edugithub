import logo from './logo.svg';
import './App.css';

// State를 사용하려면 react에서 기본으로 제공하는 훅을 써야한다.
import {useState} from 'react';


//
// 컴포넌트의 
// 입력 : props
// 출력 : return (값이 새로운 UI가 된다)

// 여기서 props과 함께 컴포넌트 함수를 다시 실행해서 새로운 return값을 다시 실행해 준다. 이것이 바로 state

// -props과 state의 차이점
// Props : 컴포넌트를 사용하는 외부자를 위한 데이터
// State : 컴포넌트를 만드는 내부자를 위한 데이터

function Article(props){
  return <article>
  <h2>{props.title}</h2>
  {props.body}
</article>
} 

function Header(props){
  // 받아오는 속성
  // 여기서 사용한 태그들은 순수한 HTML태그가 아님. 유사 HTML임, 그래서 여기서 사용하는 문법은 똑같지 않음.
  console.log('props', props, props.title)
  return  <header>
  <h1><a href="/" onClick={(event)=>{
    event.preventDefault();
    // 속성인 함수를 호출하는 것
    props.onChangMode();
  }}>{props.title}</a></h1>
</header>
}

function Nav(props){
  // target은 event를 유발시킨 태그를 가리킨다. (a 태그)
  // a태그의 id값을 가져온다 target.id
  const lis = []
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={event=>{
        event.preventDefault();
        // 태그의 속성으로 넘기면 숫자는 문자열이 된다. 그러므로 숫자형으로 convert한다. (Number 함수 사용)
        props.onChangMode(Number(event.target.id));
      }}>{t.title}</a>
      </li>)
  }
  return <nav>
  <ol>
    {lis}
  </ol>
</nav>
}

function App() {
  // state를 만든다
  // useState의 인자는 그 state의 초기값이다.
  //const _mode = useState('WELCOME');

  // useState는 배열을 return하고 0번째 원소는 상태의 값을 읽을 때 사용하는 데이터
  // 1번째 데이터는 그 상태의 값을 변경할때 사용하는 함수이다.
  // 즉 state의 값은 0번째 인덱스의 값으로 읽고, state를 바꿀때는 1번째의 함수로 바꿉니다.
  //const mode = _mode[0];
  //const setMode = _mode[1];
  //console.log(_mode)
  
  // 상단에 있는 코드(3줄)를 단순하게 변경하면
  const [mode, setMode] = useState('WELCOME');

  // 어떤것을 선택했는지 state로 만들어야 한다. 초기값 없음
  const [id, setId] = useState(null);

  const topics = [
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'js', body:'javaScript is ...'}
  ]

  let content = null;
  if(mode === 'WELCOME'){
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  }else if(mode === 'READ'){
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      console.log(topics[i].id, id);
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }

    content = <Article title={title} body={body}></Article>
  }

  return (
  <div>
    <Header title="WEB" onChangMode={()=>{
      setMode('WELCOME');
    }}></Header>
    <Nav topics={topics} onChangMode={(_id)=>{
      setMode('READ');
      setId(_id);
    }}></Nav>
    {content}
  </div>
  );
}

export default App;
