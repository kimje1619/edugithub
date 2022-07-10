import logo from './logo.svg';
import './App.css';


function Article(props){
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}
function Header(props){
  // 받아오는 속성
  // 여기서 사용한 태그들은 순수한 HTML태그가 아님. 유사 HTML임, 그래서 여기서 사용하는 문법은 똑같지 않음.
  return <header>
    <h1><a href="/" onClick={(event)=>{
      event.preventDefault();
      // 속성인 함수를 호출하는 것
      props.onChangeMode();
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
        props.onChangeMode(event.target.id);
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
  const topics = [
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javascript', body:'javascript is ...'}
  ] 
  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
        alert('Header');
      }}></Header>
      <Nav topics={topics} onChangeMode={(id)=>{
        alert(id);
      }}></Nav>
      <Article title="Welcome" body="Hello, WEB"></Article>
    </div>
  );
}

export default App;