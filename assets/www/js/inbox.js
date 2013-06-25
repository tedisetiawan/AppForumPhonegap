

$(document).ready(function() {
	$('#loading_panel').show();
	
	var idData = localStorage.getItem('IDUser');
	$.ajax({
				type : 'GET',
				url : rootServiceURL+'/REST/RESTInbox.php?id='+idData,
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
								'<li data-role="list-divider" data-theme="a" class="listview-custom"><h5>Oleh : ' + loaddata.username + ' | Waktu : ' + loaddata.waktu + '</h5><a href="detail_inbox.html?id=' + loaddata.id_sampul + '" data-ajax="false">' +
								'' + loaddata.isi_pesan + '</a></li>');
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