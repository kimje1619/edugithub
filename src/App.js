import './App.scss';

// State를 사용하려면 react에서 기본으로 제공하는 훅을 써야한다.
import {useState} from 'react';

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

function Create(props){
  return <article>
    <h2>Create</h2>
    <form onSubmit={event=>{
      //page reload 막기
      event.preventDefault();

      //name들의 value값을 가져오기
      // event.target = form태그
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body);

    }}>
      <p><input type="text" name="title" placeholder="title"/></p>
      <p><textarea textarea name="body" placeholder="body"></textarea></p>
      <p><input type="submit" value="create" /></p>
    </form>
  </article>
}

function App() {
  // state를 만든다
  // useState의 인자는 그 state의 초기값이다.
  // const _mode = useState('WELCOME');

  // useState는 배열을 return하고 0번째 원소는 상태의 값을 읽을 때 사용하는 데이터
  // 1번째 데이터는 그 상태의 값을 변경할때 사용하는 함수이다.
  // 즉 state의 값은 0번째 인덱스의 값으로 읽고, state를 바꿀때는 1번째의 함수로 바꿉니다.
  // const mode = _mode[0];
  // const setMode = _mode[1];
  // console.log(_mode)
  
  // 상단에 있는 코드(3줄)를 단순하게 변경하면
  const [mode, setMode] = useState('WELCOME');

  // 어떤것을 선택했는지 state로 만들어야 한다. 초기값 없음
  const [id, setId] = useState(null);


  // 그 다음 원소의 id값을 결정한다.
  const [nextId, setNextId] = useState(4);

  // form에서 받아온 결과를 crate하기 위해 topics를 상태로 승격시킨다.
  // topics : 읽을 떄 사용, setTopics : 변경할 떄 사용 (읽기/쓰기 인터페이스 추가)
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'js', body:'javaScript is ...'}
  ]);

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
  }else if(mode === 'CREATE'){
    // create컴포넌트를 이용하는 사용자가 생성버튼을 눌렀을때, 후속작업을 할 수 있는 인터페이스 제공
    // 사용자가 입력한 title과 body값을 create컴포넌트의 사용자에게 공급할 수 있다.
    content = <Create onCreate={(_title, _body)=>{
      // 변수에 새로운 원소를 추가
      const newTopic = {id:nextId, title:_title, body:_body}
      // 기존의 데이터의 [...복제본을 생성한다.] 
      const newTopics = [...topics]
      // 복제본과 같은지 다른지 판단하고 다르다면 다시 렌더링을 해준다. (같은 데이터면 굳이 다시 렌더링 하지 않는다.)
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>
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
    <a href="/Create" onClick={event=>{
      event.preventDefault();
      setMode('CREATE');
    }}>Create</a>
  </div>
  );
}

export default App;
