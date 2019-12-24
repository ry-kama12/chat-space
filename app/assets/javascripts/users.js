$(function(){

  function  addUser(user){
    var html =  
    `<div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${user.name}</p>
     <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
     </div>`;
      $("#user-search-result").append(html)

    };
    
  function  addNoUser(){
    var html = 
    `<div class="chat-group-user clearfix">
       <p class="chat-group-user__name">ユーザーが見つかりません</p>
     </div>`;
     $("#user-search-result").append(html)
  };

  function  addDeleteUser(name, id){
    var html = `
            <div class='chat-group-user'>
              <input name='group[user_ids][]' type='hidden' value=${id}> 
              <p class='chat-group-user__name'>${name}</p>
              <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
            </div>
            `
    $(".js-add-user").append(html)
  }

  function member(name, id){
    var html = `
      <div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
      <input name='group[user_ids][]' type='hidden' value='${id}'>
       <p class='chat-group-user__name'>${name}</p>`
       $(".js-add-user").append(html)
       console.log(this)

  }

  $("#user-search-field").on("keyup", function(){
    var input = $('#user-search-field').val();    //フォームの値を取得して変数に代入する

    $.ajax({
      type: "GET",    //HTTPメソッド
      url: "/users",       //users_controllerの、indexアクションにリクエストの送信先を設定する
      dataType: 'json',
      data: { keyword: input }   //テキストフィールドに入力された文字を設定する
    })

      .done(function(users){
        $("#user-search-result").empty();

        if (users.length !==0){
          users.forEach(function(user){
            addUser(user);
          });
          } else if (input.length == 0){
            return false;
          } else {
          addNoUser();
          }
        })
        .fail(function() {
          alert("ユーザー検索に失敗しました");
        });
    });

  $(document).on("click", ".user-search-add", function(){
    id = $(this).attr('data-user-id');
    name = $(this).attr('data-user-name');
    $(this).parent().remove();

    addDeleteUser(name, id);
    member(name, id);
  });
  $(document).on("click", ".user-search-remove", function(){
    $(this).parent().remove();
  });
})
