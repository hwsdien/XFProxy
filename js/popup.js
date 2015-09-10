
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

$(function() {
	//设置
	$("#options").click(function() {
		open_tab('options.html');
	});	

	//关于
	$("#about").click(function() {
		open_tab('about.html');
	});
});
