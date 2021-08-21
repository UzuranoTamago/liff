//https://www.youtube.com/watch?v=E08jeQBa1D0&t=576s
//htmlのタグにアクセスする
const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

//ローカルストレージからkey=todosでデータ取得
//JSON.parseでJSONから配列形式に変換
const todos = JSON.parse(localStorage.getItem("todos"));

//ローカルストレージに保管されている値があれば反映する
//if(〇〇)：〇〇が空じゃなかったら実行する（暗黙変換により空ならFalseとなり実行されない）
if(todos){
    //配列todosの個々の要素にtodoというラベルをつける
    todos.forEach(todo => {
        //add関数を呼び出す
        add(todo);
    });
}

form.addEventListener("submit", function(event){
    //ブラウザをリロードしない
    event.preventDefault();
    add();
});

function add(todo) {
    let todoText = input.value;

    //if(〇〇)：〇〇が空じゃなかったら実行する（暗黙変換により空ならFalseとなり実行されない）
    if(todo){
        todoText = todo.text;
    }

    //if(〇〇)：〇〇が空じゃなかったら実行する（暗黙変換により空ならFalseとなり実行されない）
    if(todoText){
        //liタグを作る
        const li = document.createElement("li");
        
        //liのテキストとしてユーザーが入れた値
        li.innerText = todoText;
        
        //liタグにデザインを当てる
        //HTMLのクラスにアクセスするためにClassListを使う。
        //それにlist-group-itemというClassを追加
        li.classList.add("list-group-item");
        
        //リロードしたら打ち消し線が消えてしまうので対策
        //ローカルストレージに存在＆完了フラグがTrueなら実行
        if(todo && todo.completed){
            li.classList.add("text-decoration-line-through");
        }

        //右クリックでToDoを削除
        //右クリックのイベントはcontextmenu
        li.addEventListener("contextmenu", function(event){
            //右クリックのオプションメニューを出さない
            event.preventDefault();
            li.remove();

            //ローカルストレージに保存するsaveDataの関数を呼び出す
            //削除したらローカルストレージからも削除する
            saveData();
        });

        //クリックでToDoを完了
        li.addEventListener("click", function(){
            //取り消し線をつける
            //text-decoration-line-throughはブートストラップの打ち消し線をつけるHTMLのクラス
            //toggleで切り替え
            //なければ追加しあれば削除する
            li.classList.toggle("text-decoration-line-through");
            //ローカルストレージを更新（打ち消し線を保存）
            //ローカルストレージに保存するsaveDataの関数を呼び出す
            saveData();
        });

        //ulタグの子としてliを追加
        ul.appendChild(li);

        //フォームのテキストをクリアする
        input.value = "";
        
        //ローカルストレージに保存するsaveDataの関数を呼び出す
        saveData();
    }
}

function saveData(){
   const lists = document.querySelectorAll("li");
   let todos = [];

   //配列の個々の要素にlistというラベルをつける
   lists.forEach(list => {

       //オブジェクトを定義
       //テキストと完了フラグをもつオブジェクト
       let todo = {
           //テキストは.innerTextで取得
           text: list.innerText,
           //完了フラグを作成
           //これがローカルストレージに保管されていないとリロードしたときに完了の打ち消し線が保持されない
           //()内のクラスを含んでいればTrue,含んでいなければFalse
           completed: list.classList.contains("text-decoration-line-through")
       };
       //配列に追加
       todos.push(todo);
   });

   //ローカルストレージ（文字列を保存可能）に保存
   //todosのキー名で保存
   //配列todosをJSON形式(JavaScriptのObjectの書き方を元にしたデータ定義方法で文字列として保存可能)に変換して保存
   localStorage.setItem("todos", JSON.stringify(todos));
}