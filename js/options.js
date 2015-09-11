/*
var data = [
	{"id": 1, "name": "日本服务器", "type": "http", "host": "127.0.0.1", "port": 6363, "rules": "*.local, 169.254/16,127.0.0.1"},
	{"id": 2, "name": "韩国服务器", "type": "https", "host": "127.0.0.2", "port": 6463, "rules": "*.local, 169.254/16,127.0.0.2"},
	{"id": 3, "name": "香港服务器", "type": "socks4", "host": "127.0.0.3", "port": 6563, "rules": "*.local, 169.254/16,127.0.0.3"},
	{"id": 4, "name": "美国服务器", "type": "socks5", "host": "127.0.0.4", "port": 6663, "rules": "*.local, 169.254/16,127.0.0.4"}
];

localStorage.setItem('proxy_data', JSON.stringify(data));
*/

//初始化代理列表
var init_list = function() {
	if (localStorage.getItem('proxy_data') != null) {
		var proxy_data = JSON.parse(localStorage.getItem('proxy_data'));
		$("#proxy_list").find("tr").remove();
		$.each(proxy_data, function(n, data) {
			$("#proxy_list").append('<tr><td><h5>'+data.name+'</h5> </td> <td>'+data.type+'</td> <td> <button type="button" class="btn btn-primary" value="'+data.id+'" name="modify">修改</button> <button type="button" class="btn btn-danger" value="'+data.id+'" name="delete">删除</button> </td> </tr>');
		});
	}
};

//删除代理
var delete_proxy = function(id) {
	if (localStorage.getItem('proxy_data') != null) {
		var proxy_data = JSON.parse(localStorage.getItem('proxy_data'));
		var new_proxy_data = [];
		$.each(proxy_data, function(n, data) {
			if (id != data.id) {
				new_proxy_data.push(data);
			}
		});

		localStorage.setItem('proxy_data', JSON.stringify(new_proxy_data));
	}
}

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

//保存数据
var save = function(id, name, type, host, port, rules) {
	if (localStorage.getItem('proxy_data') != null) {
		var proxy_data = JSON.parse(localStorage.getItem('proxy_data'));
		var new_proxy_data = [];
		var flag = true;
		var temp = {"id": parseInt(id), "name": name, "type": type, "host": host, "port": port, "rules": rules};
		$.each(proxy_data, function(n, data) {
			if (id == data.id) {
				flag = false;
				new_proxy_data.push(temp);
			} else {
				new_proxy_data.push(data);
			}
		});
		if (flag) new_proxy_data.push(temp);
		localStorage.setItem("proxy_data", JSON.stringify(new_proxy_data));
		return true;
	} else {
		return false;
	}
};

//获取新的ID
var get_id = function() {
	var id = 1;
	if (localStorage.getItem('proxy_data') != null) {
		var proxy_data = JSON.parse(localStorage.getItem('proxy_data'));
		var id_list = [];
		$.each(proxy_data, function(n, data) {
			id_list.push(parseInt(data.id));
		});

		id_list = id_list.sort();
		var flag = true;

		$.each(id_list, function(n, num) {
			if ((n == id_list.length - 1) || (id_list[n + 1] > num + 1 )) {
				if (flag) id = parseInt(num) + 1;
				flag = false;
			}
		});
	}
	return id;
}

//清空
var empty = function() {
	$("#code").val(0);
	$("#name").val('');
	$("#type").find("input[type='radio']").removeAttr("checked");
	$("#host").val('');
	$("#port").val('');
	$("#rules").val('');
};


$(function() {

	init_list();

	//修改
	$("#proxy_list").delegate("button[name='modify']", "click", function(){
		var id = $(this).prop('value');
		var data = get_data(id);
		if (data != null) {
			$("#code").val(id);
			$("#name").val(data.name);
			$("#type").find("input[type='radio']").removeAttr("checked");
			$("#type").find("input[type='radio'][value='"+data.type+"']").prop("checked", true);
			$("#host").val(data.host);
			$("#port").val(data.port);
			$("#rules").val(data.rules);
		}
	});

	//删除
	$("#proxy_list").delegate("button[name='delete']", "click", function() {
		var id = $(this).prop('value');
		delete_proxy(id);
		$(this).parent().parent().remove();
	});

	//保存
	$("#save").delegate("", "click", function() {
		var id = $("#code").val();
		var name = $("#name").val();
		var type = null;
		$("#type input[type='radio'][name='type']").each(function() {
			if ($(this).prop("checked")) {
				type = $(this).val();
			}
		});

		var host = $("#host").val();
		var port = $("#port").val();
		var rules = $("#rules").val();

		if (save(id, name, type, host, port, rules)) {
			init_list();
		}
	});

	//增加
	$("#add").delegate("", "click", function() {
		var id = get_id();
		var name = "新代理服务器";
		empty();
		$("#code").val(id);
		$("#name").val(name);
	});
});
