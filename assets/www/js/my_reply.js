

$(document).ready(function() {
	$('#loading_panel').show();
	
	var idData = localStorage.getItem('IDUser');
	$.ajax({
				type : 'GET',
				url : rootServiceURL+'/REST/RESTMyReply.php?id='+idData,
				async: true,
				beforeSend: function(x) {
					if(x && x.overrideMimeType) {
      					 x.overrideMimeType("application/j-son;charset=UTF-8");
      				}
				},
				dataType : 'json',
				success : function(data){
						var GetData = data.items;
						if(GetData==''){
							$('#loading_panel').hide();
							$('#not_found').show();
						}else{
							$('#loading_panel').hide();
							$('#tampilData').show();
							$.each(GetData, function(index, loaddata) {
							$('#sispakList').append(
								'<li data-role="list-divider" data-theme="a" class="listview-custom"><h5>Kategori ' + loaddata.nama_kategori + ' | ' + loaddata.waktu + '</h5><a href="detail_thread.html?id=' + loaddata.id_thread + '" data-ajax="false">' +
								'' + loaddata.judul_thread + ' <p>'+loaddata.isi_reply+'</p></a></li>');
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