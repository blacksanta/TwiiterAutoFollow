$(function(){

	//何人フォローするか確認
	count = window.prompt("何人フォローするか数字を入力してください", 10);
	count = parseInt(count);
	
	//followした人数
	following = 0;
	
	//スクロールして先を読み込んだか判定
	scrolled = 0;
	
	//結果を出力するViewの挿入
	$('body').append('<div id="appstars_follow_status" style="position: fixed; width: 200px; height: 72px; padding: 14px; left: 14px; bottom: 14px; background-color:rgba(0,0,0,0.8); color:#fefefe; line-height: 28px; font-size: 12px; border-radius: 5px; z-index: 999999;"></div>');
	
	//途中経過を表示するメソッド（目標,調べた数,実際のフォロー
	var log = function(c, i, f) {
		$('#appstars_follow_status').html('調査数：'+i+'<br />'+'フォロー数：'+f+'/'+c+'<div style="text-align: right;"><a href="http://www.appstars.jp/" target="_blank" style="color: #efefef; text-decoration: none;">powerd by あぷすた</a></div>');
	}

	//フォローするメソッド
	var follow = function(i, wait) {
		$('.modal').empty();
		log(count, i, following);
		if(following < count) {
			//選択するユーザーが存在するかどうか
			if($($('.show-popup-with-id').get(i)).get(0)) {
				//スクロールしたことを忘れる
				scrolled = 0;
				//ユーザーネームをクリック
				$('.show-popup-with-id').get(i).click();
				//2秒待機
				setTimeout(function() {
					//すでにフォローしているか確認
					if($('.modal .user-actions.btn-group').hasClass('not-following')) {
						//フォローボタンをクリック
						$('.modal .follow-button').click();
						//2秒待機
						setTimeout(function(){
							//フォローをカウント
							following++;

							//モーダルをとじる
							$('.close-modal-background-target').click();
							//次の人
							follow(i+1, true);
						}, 2000);
					}
					//すでにフォローしてあれば次の人
					else {
						$('.close-modal-background-target').click();
						follow(i+1, false);
					}
				}, (wait)?2000:750);
			} else {
				if(scrolled == 0) {
					//めいっぱいスクロールして３秒まつ
					scrolled = 1;
					$('.close-modal-background-target').click();
					$(window).scrollTop(999999);
					setTimeout(function(){
						follow(i, false);
					}, 3000);
				} else {
					alert('ユーザーが存在しません。終了します。');
				}
			}
		}
		//終了
		else {
			alert('完了しました。');	
		}
	};
	
	//自動フォロースタート！！！
	follow(0, false);
});
