//格納用の配列
let data;
// let data = {
  // task:[],
  // done:[]
// }

// アイコンをここに用意しますよ
let removeIcon = '<i class="fas fa-trash-alt fa-lg"></i>';
let doneIcon = '<i class="fas fa-check-circle fa-lg"></i>';

// localStorage.clear();
//localStgeに保存させる為のコード
//読み込まれたタイミングで、ローカルストレージを用意するもしくは、配列を用意する
document.addEventListener('DOMContentLoaded',function(){
  //もし、データがlocalStrageの中に保存されていたら
  //data配列にローカルストレージの内容を格納してちょ
  if(localStorage.getItem('todoList')){
    data = JSON.parse(localStorage.getItem('todoList'));
    //データの表示
    renderTodoList();
  }else{
    //data配列にtaskキーとdoneキーを作ってくれよ
     data = {
      task:[],
      done:[]
    };
  }
  localStorage.setItem('todoList',JSON.stringify(data));


});




// addボタン押した時の挙動
document.getElementById('add').addEventListener('click',function(){
  let value = document.getElementById('task').value;
  // console.log(value);
  addTask(value);

  console.log(data.task);
});

//---------------関数------------------
//タスクをデータに格納
function addTask(value){

  //データ(valueの中身)を配列に格納
  data.task.push(value);

  addTaskToDOM(value);

  //入力フォームを空にする
  document.getElementById('task').value = '';

  //ローカルストレージのアップデート
  dataObjectUpdated();



}


//画面に登録したいタスクを表示する為の関数
function addTaskToDOM(text,isDone){

//doneタスクか、not-yetタスクか、判定させる
let list;
if(isDone){
  list = document.getElementById('done');
}else{
  list = document.getElementById('not-yet');
}
//liタグを作成
  //変数taskにliタグを作成して挿入
  let task = document.createElement('li');
  //liタグのテキストに引数textを挿入
  task.textContent = text;

  // console.log(task);
//divタグ作成
  let buttons = document.createElement('div');
  buttons.className = 'buttons';


//ボタンを作成（追加）
//削除ボタン
  let remove = document.createElement('button');

//css後から書くよ
remove.classList.add('remove');
//HTMLに追加
remove.innerHTML = removeIcon;
//押された時の処理
remove.addEventListener('click',removeTask);

//完了ボタン
let done = document.createElement('button');
//HTMLに追加
done.innerHTML = doneIcon;
done.classList.add('done');
//押された時の処理
done.addEventListener('click',doneTask);


//DOMの組み立て
buttons.appendChild(remove);
buttons.appendChild(done);
task.appendChild(buttons);

//組み立てたDOMを挿入
list.insertBefore(task,list.childNodes[0]);

}

function removeTask(){
  let task = this.parentNode.parentNode;
  let id = task.parentNode.id;
  let value = task.textContent;

  //画面から削除
  task.remove();
  //配列から削除
  if(id === 'not-yet'){
    //indexOfで配列の番号を取得して、splice(〇〇,1)で1つだけデータ
    data.task.splice(data.task.indexOf(value),1);
  }else{
    data.done.splice(data.done.indexOf(value),1);

  }
  //ローカルストレージのアップデート
  dataObjectUpdated();
}

function doneTask(){
  let task = this.parentNode.parentNode;
  let id = task.parentNode.id;
  if(id !== 'not-yet'){
    return;
  }
  let value = task.textContent;
  //完了一覧に追加するコード
  let target = document.getElementById('done');

  target.insertBefore(task,target.childNodes[0]);
  //配列更新
  data.task.splice(data.task.indexOf(value),1);
  data.done.push(value);
//ローカルストレージのアップデート
dataObjectUpdated();

}


//ローカルストレージのデータをアップデートする為のコード
function dataObjectUpdated(){
  localStorage.setItem('todoList',JSON.stringify(data));
  console.log(localStorage);
}


//ローカルストレージの内容を表示させる為のコード
function renderTodoList(){
  //未完了タスクを一覧で表示
  for(let value of data.task){
    addTaskToDOM(value);
  }


  //完了タスクを一覧で表示
  for(let value of data.done){
    addTaskToDOM(value,true);
  }

  }
































