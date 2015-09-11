
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
			//$("#proxy").append('<a href="javascript:void(0);" class="list-group-item">'+data.name+'</a>');
		});
	}
}

//直接连接
var direct = function() {
	var config = {
		mode: "direct"
	};
	chrome.proxy.settings.set({value: config, scope: 'regular'}, function() {});
};

//使用系统代理连接
var system = function() {
	var config = {
		mode: "system"
	};
	chrome.proxy.settings.set({value: config, scope: 'regular'}, function() {});
};

//获取数据
var get_data = function(id) {
	if (localStorage.getItem('proxy_data') != null) {
		var proxy_data = JSON.parse(localStorage.getItem('proxy_data'));
		var result = null;
		$.each(proxy_data, function(n, data) {
			if (id == data.id) {
				result = data;
			}
		});
		return result;
	} else {
		return null;
	}
};

//使用自定义代理
var custom = function(id) {
	var data = get_data(id);
	if (data == null) return false;

	var host = data.host;
	var port = data.port;
	var type = data.type;
	var rules = data.rules;

	var config = {
		mode: "fixed_servers",
		rules: {
			singleProxy: {
				scheme: type, 
				host: host,
				port: port
			},
			bypassList: []
		}
	};
	chrome.proxy.settings.set({value: config, scope: 'regular'}, function() {});
}


$(function() {
	//初始化数据
	init();

	//使用代理
	$("#proxy").delegate("a", "click", function() {
		$(this).parent().parent().find("a").prop("class", "list-group-item");
		$(this).prop("class", "list-group-item active");
		var id = $(this).attr("value");
		custom(id);
	})

	//直接连接
	$("#direct").click(function() {
		$(this).parent().parent().find("a").prop("class", "list-group-item");
		$(this).prop("class", "list-group-item active");
		direct();
	});

	//使用系统代理
	$("#system").click(function() {
		$(this).parent().parent().find("a").prop("class", "list-group-item");
		$(this).prop("class", "list-group-item active");
		system();
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
