
// card
    $(function(){
	let iconData = [];

	const cardTemplate = `
		 <div class="col">
			  <div class="card">
					<div class="p-3 pb-0">
						 <div class="text-center p-3" id="d-view"></div>
					</div>
					<div class="card-body">
						 <h4 class="card-title h4 text-center" id="d-name"></h4>
					</div>
					<div class="card-footer">
						 <h5 class="text-body-secondary">HTML code (full)</h5>
						 <div class="colorscripter-code fira" id="d-full"></div>
					</div>
					<div class="card-footer">
						 <h5 class="text-body-secondary">HTML code (short)</h5>
						 <div class="colorscripter-code fira" id="d-short"></div>
						 <h5 class="text-body-secondary mt-3">CSS</h5>
						 <div class="colorscripter-code fira" id="d-css"></div>
					</div>
			  </div>
		 </div>
	`;
	
	const noTemplate = `
		<div class="w-100 text-center pt-7 pb-7">There're no Icons..T^T</div>
	`
	
	$.ajax({
		url: 'icons_data.json',
		async: true,
		traditional: true,
		dataType: 'json',
		success: function(result) {
			// 데이터 저장
			iconData = result;
			// 초기에는 모든 아이콘 표시
			displayIcons('all');
		},
		error: function() {
			alert('데이터를 불러오는데 실패했습니다.');
		}
	});
	
	// 아이콘 표시
	function displayIcons(category) {
		const activeTab = $(".tab-pane.active");
		const cardContainer = activeTab.find(".card-container");
	
		cardContainer.empty();
	
		let icons = [];
	
		if (category === 'all') {
			// 모든 카테고리의 아이콘을 하나의 배열로 합치기
			Object.keys(iconData).forEach(key => {
				icons = icons.concat(iconData[key]);
			});
		} else {
			// 특정 카테고리의 아이콘만 가져오기
			icons = iconData[`cate-${category}`] || [];
		}
	
		for (let i = 0; i < icons.length; i++) {
			cardContainer.append(cardTemplate);
	
			const currentCard = cardContainer.find('.card').last();
	
			currentCard.find('#d-view').html(icons[i]['view-code']);
			currentCard.find('#d-name').html(icons[i]['name']);
			currentCard.find('#d-full').html(icons[i]['html-full']);
			currentCard.find('#d-short').html(icons[i]['html-short']);
			currentCard.find('#d-css').html(icons[i]['css-code']);
		}


		// 등록된 아이콘이 없을떄
		if(icons.length < 1){
			cardContainer.append(noTemplate);
		}
	}

	
	$('#cate-tab .nav-link').click(function() {
		 var cateID = $(this).data('bs-target');
	
		 switch(cateID) {
			  case "#pills-all":
					displayIcons('all');
					break;
			  case "#pills-arrow":
					displayIcons('arrow');
					break;
			  case "#pills-media":
					displayIcons('media');
					break;
			  case "#pills-sign":
					displayIcons('sign');
					break;
			  case "#pills-etc":
					displayIcons('etc');
					break;
		 }
	});
});


// scroll
$(function(){
	function scrollFix(){
		var scrt = $(window).scrollTop();
		var lftW = $('#header h1 .lft').width();
		if(scrt > 0){
			$('#header').addClass('fix');
			$('#header .highlight').css('transform','translateX(-'+ lftW +'px)');
			$('.scroll-up').addClass('act');
		}else{
			$('#header').removeClass('fix');
			$('#header .highlight').css('transform','translateX(0px)');
			$('.scroll-up').removeClass('act');
		}
	}

	let lastScroll = 0; // 초기 스크롤 위치
	function scrollDirection(){
		let nowScroll = $(this).scrollTop();
		if (nowScroll > lastScroll) { // 스크롤 위치 증가
			$('.scroll-up').addClass('act');
		} else { // 스크롤 위치 감소
			$('.scroll-up').removeClass('act');
		}
		lastScroll = nowScroll;
	}

	$(window).scroll(function(){
		scrollFix();
		scrollDirection();
	});
	$(window).resize(function(){
		scrollFix();
		scrollDirection();
	});
});