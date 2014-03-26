javascript: (function() {


	//何人フォローするか確認
	count = window.prompt("何人フォローするか数字を入力してください", 10);
	count = parseInt(count);

	//結果を出力するViewの挿入
	$('body').append('<div id="appstars_follow_status" style="position: fixed; width: 90px; height: 20px; padding: 14px; left: 14px; bottom: 14px; background-color:rgba(0,0,0,0.8); color:#fefefe; line-height: 23px; font-size: 12px; border-radius: 5px; z-index: 999999;"></div>');

	//途中経過を表示するメソッド（目標,実際のフォロー
	var log = function(c, f) {
		$('#appstars_follow_status').html('フォロー数：'+f+'/'+c);
	}

	//".js-follow-btn"だけだと一度フォローした方も対象になるため親のclassも指定

	var $followElem = $('.not-following .js-follow-btn');
//	var followElemCount = $followElem.length;

	var currentNum = 0;
	var followCount = 0;
	var manager = function() {
		log(count, followCount);
		if (currentNum < count) {
			performer($followElem.eq(currentNum));
			currentNum += 1;
		} else {
			alert(followCount + '件フォロー完了しました！');
		}
	};
	var performer = function($elem) {
		//1秒～20秒までの乱数
		var rand = (Math.random() * 20000) + 1000;
		setTimeout(function() {
			$elem.trigger('click');
			followCount++;
			manager();
		}, rand);
	};
	manager();
})();