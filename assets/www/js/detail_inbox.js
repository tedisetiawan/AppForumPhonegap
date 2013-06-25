

$(document).ready(function() {
	$('#loading_panel').show();
	
	var idData = getUrlVars()["id"];
	$.ajax({
				type : 'GET',
				url : rootServiceURL+'/REST/RESTDetailInbox.php?id='+idData,
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
								'<li data-role="list-divider" data-theme="a" class="listview-custom"><h5>Oleh : ' + loaddata.nama_user + ' | Waktu : ' + loaddata.waktu + '</h5>' + loaddata.isi_pesan + '</a></li>');
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