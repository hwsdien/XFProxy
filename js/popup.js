
//打开新页面
var open_tab = function(page) {
	var optionsUrl = chrome.extension.getURL(page);
	chrome.tabs.query({url: optionsUrl}, function(tabs) {
		if (tabs.length) {
			chrome.tabs.update(tabs[0].id, {active: true});
		} else {
			chrome.tabs.create({url: optionsUrl});
		}
	});

};

//初始化数据
var init = function() {
	$("#proxy").empty();

	if (localStorage.getItem('proxy_data') != null) {
		var proxy_data = JSON.parse(localStorage.getItem('proxy_data'));
		$.each(proxy_data, function(n, data) {
			$("#proxy").append('<a href="javascript:void(0);" class="list-group-item" value="'+data.id+'">'+data.name+'</a>');
		});
	}
}

$(function() {
	//初始化数据
	init();

	//使用代理
	$("#proxy").delegate("a", "click", function() {
		$(this).parent().parent().find("a").prop("class", "list-group-item");
		$(this).prop("class", "list-group-item active");
	})

	//直接连接
	$("#direct").click(function() {
		$(this).parent().parent().find("a").prop("class", "list-group-item");
		$(this).prop("class", "list-group-item active");
	});
	
	//使用系统代理
	$("#system").click(function() {
		$(this).parent().parent().find("a").prop("class", "list-group-item");
		$(this).prop("class", "list-group-item active");
	});

	//设置
	$("#options").click(function() {
		open_tab('options.html');
	});	

	//关于
	$("#about").click(function() {
		open_tab('about.html');
	});
});
