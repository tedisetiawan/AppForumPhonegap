$(document).ready(function() {

$('#loading_panel').show();
get_news();

function get_news(){
	var SistemPakar;
	$.ajax({
				type : 'GET',
				url : rootServiceURL+'/REST/RESTKategori.php',
				async: true,
				beforeSend: function(x) {
					if(x && x.overrideMimeType) {
      					 x.overrideMimeType("application/j-son;charset=UTF-8");
      				}
				},
				dataType : 'json',
				success : function(data){
						SistemPakar = data.items;
						if(SistemPakar==''){
							$('#loading_panel').hide();
							$('#empty').show();
						}else{
							$('#loading_panel').hide();
							$('#tampilData').show();
							$.each(SistemPakar, function(index, loaddata) {
							$('#sispakList').append(
								'<li data-role="list-divider" data-theme="a" class="listview-custom"><a href="detail_kategori.html?id=' + loaddata.id_kategori + '" data-ajax="false">' +
								'' + loaddata.nama_kategori + '</a></li>');
							});
							$('#sispakList').listview('refresh');
						}
				},
				error: function(jqXHR, exception) {
					alert(jqXHR);
					$('#loading_panel').hide();
					$('#conn_failed').show();
				}
		});	
}
	

}); //Tutup Document Ready









