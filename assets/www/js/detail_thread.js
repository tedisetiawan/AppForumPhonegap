

$(document).ready(function() {
	$('#loading_panel').show();
	
	var idData = getUrlVars()["id"];
	localStorage.setItem("IDThread",idData);
	
	$.ajax({
				type : 'GET',
				url : rootServiceURL+'/REST/RESTDetailThread.php?id='+idData,
				async: true,
				beforeSend: function(x) {
					if(x && x.overrideMimeType) {
      					 x.overrideMimeType("application/j-son;charset=UTF-8");
      				}
				},
				dataType : 'json',
				success : function(data){
						var GetData = data.items;
						var GetDataDetail = data.items2;
						if(GetData==''){
							$('#loading_panel').hide();
							$('#not_found').show();
						}else{
							$('#loading_panel').hide();
							$('#tampilData').show();
							
							$.each(GetData, function(index, loaddata) {
							var tombol = "";
							if(loaddata.id_user==localStorage.getItem("IDUser"))
							{
								tombol = '<a href="edit_thread.html?id=' + loaddata.id_thread + '" data-ajax="false"><div class="btn-crud">Edit</div></a><a href="hapus_thread.html?id='+loaddata.id_thread+'" data-ajax="false""><div class="btn-crud">Hapus</div></a>';
							}
							
							$('#sispakList').append(
								'<li data-role="list-divider" data-theme="a" class="listview-custom"><h5>Kategori ' + loaddata.nama_kategori + ' | ' + loaddata.waktu + '</h5><h4>Oleh : <a href="detail_member.html?id=' + loaddata.id_user + '" data-ajax="false">' + loaddata.username + '</a> </h4>' + loaddata.judul_thread + ' <p>' + loaddata.isi_thread + '</p><a href="reply_thread.html?id=' + loaddata.id_thread + '" data-ajax="false"><div class="btn-reply">Reply</div></a> '+tombol+'</li>');
							});
							
							$.each(GetDataDetail, function(index, loaddata) {
							var tombol = "";
							if(loaddata.id_user==localStorage.getItem("IDUser"))
							{
								tombol = '<a href="edit_reply.html?id=' + loaddata.id_reply + '" data-ajax="false"><div class="btn-crud">Edit</div></a><a href="hapus_reply.html?id='+loaddata.id_reply+'" data-ajax="false""><div class="btn-crud">Hapus</div></a>';
							}
							$('#sispakList').append(
								'<li data-role="list-divider" data-theme="a" class="listview-custom"><h5>Waktu : ' + loaddata.waktu + '</h5><h4>Oleh : <a href="detail_member.html?id=' + loaddata.id_user + '" data-ajax="false">' + loaddata.username + '</a></h4>' + loaddata.judul + ' <p>' + loaddata.isi_reply + '</p>'+tombol+'</li>');
							});
							
							$('#sispakList').listview('refresh');
						}
				},
				error : function(){
					$('#loading_panel').hide();
					$('#conn_failed').show();
				}
		});
		
});



function getUrlVars() {
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++)
		{
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	}


