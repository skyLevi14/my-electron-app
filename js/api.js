
$( "#submit" ).click(function() {

	if ($('#input').val().length == 0){
		alert('Textbox is Mandatory.\nIngat, taga cavite me');
		return false;
	}

	var myHeaders = new Headers();
	myHeaders.append("X-CSRF-Token", "fetch");
	myHeaders.append("Authorization", "Basic bGV2czpHTDlcU1dXS3VWK1QrPWE8eVwkcWNlVHpTWiNDflBieHtuREckYU5V");
	myHeaders.append("Cookie", "SAP_SESSIONID_S4G_100=vE-RpgfE2S6IumD9nzHpBjgcfPmFwRHtvi26_gAjg3w%3d; sap-usercontext=sap-client=100");

	var requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow'
	};

	fetch("https://s4g.sapnet.cuatrix:44300/sap/opu/odata/sap/ZHELLO_LEVS_SRV/HELLO_LEVS?USER_NAME='"+$("#input").val()+"'&sap-client=100&$format=json", requestOptions)
		.then(response => response.text())
		.then(result => {
			result = JSON.parse(result);
			$("#myText").text(result.d.MSG);
		})
		.catch(error => console.log('error', error));
});


$( "#submit-post" ).click(function() {
	
	if ($('#input-post').val().length == 0){
		alert('Hoy this is Mandatory.\nIngat! taga cavite me');
		return false;
	}
	
	getToken();
	//localStorage.setItem("csrf-token", 'testt');

	var myHeaders = new Headers();
	myHeaders.append("X-CSRF-Token", localStorage.getItem('csrf-token'));
	myHeaders.append("Authorization", "Basic bGV2czpHTDlcU1dXS3VWK1QrPWE8eVwkcWNlVHpTWiNDflBieHtuREckYU5V");
	myHeaders.append("Cookie", "SAP_SESSIONID_S4G_100=_2pnKW9wqjGs7BA0dXA4ARJGFCmGmxHtsYe6_gAjg3w%3d; sap-usercontext=sap-client=100");

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		redirect: 'follow'
	};

	fetch("https://s4g.sapnet.cuatrix:44300/sap/opu/odata/sap/ZHELLO_LEVS_SRV/POST_LEVS?USER_NAME='"+$("#input-post").val()+"'&$format=json", requestOptions)
	.then(function (response) {
		console.log(response.status); // Will show you the status
    if (!response.ok) {
       // throw new Error("HTTP status " + response.status);
			 getToken();
    }
    return response.text();
	}
	)
	.then(result => {
		result = JSON.parse(result);
		$("#myText-post").text(result.d.MSG);
	})
	.catch(error => console.log('error', error));
});

function getToken(){
	var myHeaders = new Headers();
	myHeaders.append("X-CSRF-Token", "fetch");
	myHeaders.append("Authorization", "Basic bGV2czpHTDlcU1dXS3VWK1QrPWE8eVwkcWNlVHpTWiNDflBieHtuREckYU5V");
	myHeaders.append("Cookie", "SAP_SESSIONID_S4G_100=vE-RpgfE2S6IumD9nzHpBjgcfPmFwRHtvi26_gAjg3w%3d; sap-usercontext=sap-client=100");
	//myHeaders.append("Access-Control-Expose-Headers","*");

	var requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow'
	};

	fetch("https://s4g.sapnet.cuatrix:44300/sap/opu/odata/sap/ZHELLO_LEVS_SRV/HELLO_LEVS?USER_NAME='"+$("#input").val()+"'&sap-client=100&$format=json", requestOptions)
		.then(response => {
			response.text();
			localStorage.setItem("csrf-token", response.headers.get('x-csrf-token'));
			//console.log(response.headers.get('x-csrf-token'));
		}).catch(error => console.log('error', error));
}