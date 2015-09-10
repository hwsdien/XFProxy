//初始化代理列表
var init_list = function() {
	if (localStorage.getItem('proxy_data') != null) {
		var proxy_data = JSON.parse(localStorage.getItem('proxy_data'));
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

/*
var data = [
	{"id": 1, "name": "日本服务器", "type": "http", "host": "127.0.0.1", "port": 6363},
	{"id": 2, "name": "韩国服务器", "type": "http", "host": "127.0.0.1", "port": 6363},
	{"id": 3, "name": "香港服务器", "type": "http", "host": "127.0.0.1", "port": 6363},
	{"id": 4, "name": "美国服务器", "type": "http", "host": "127.0.0.1", "port": 6363}
];

localStorage.setItem('proxy_data', JSON.stringify(data));
*/

$(function() {

	init_list();

	//修改
	$("#proxy_list").find("button[name='modify']").click(function(){
		var id = $(this).prop('value');
		console.log(id);
	});

	//删除
	$("#proxy_list").delegate("button[name='delete']", "click", function() {
		var id = $(this).prop('value');
		delete_proxy(id);
		$(this).parent().parent().remove();
	});


});
