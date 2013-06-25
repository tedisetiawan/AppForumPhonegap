	function checkLogin()
	{
		if(localStorage.getItem("STLOGIN")==null)
		{
			window.location = "index.html";
		}
	}