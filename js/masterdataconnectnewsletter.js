/*
	MDCN-TAC V.1.12
*/

function ContactCreate(storeName, dataEntity, co_client)
{
	var co_description 	= $("#co_description").val();
	var co_type 		= $("#co_type").val();

	var jsonCO = 	{
					"client": co_client.replace("CL-",""),
					"description": co_description,
					"type": co_type
					};

	var urlCO = "http://api.vtexcrm.com.br/" + storeName + "/dataentities/" + dataEntity + "/documents/";

	$.ajax({
		headers: {
			"Accept": "application/vnd.vtex.ds.v10+json",
			"Content-Type": "application/json"
		},
		data: JSON.stringify(jsonCO),
		type: 'PATCH',
		url: urlCO,
		success: function (data) {
		  console.log(data);
		  ResetMessages()
		  $("#co_message_success, .continueLink").show();
		  $(".formContainerNewsletter").hide();
		  $("#cl_first_name").val("");		  
		  $("#cl_email").val("");
		  $("#co_type").val("");
		  $("#co_description").val("");		  
		},
		error: function (data) {
		  console.log(data);
		  ResetMessages()
		  $("#co_message_error").show();
		}
	});
}

function ContactCreateByEmail(storeName, dataEntity, cl_email)
{
	var cl_url = "http://api.vtexcrm.com.br/" + storeName + "/dataentities/CL/search/?email=" + cl_email + "&_fields=id";
	
	$.ajax({
		headers: {
			"Accept": "application/vnd.vtex.ds.v10+json",
			"Content-Type": "application/json"
		},
		type: 'GET',
		url: cl_url,
		success: function(data, textStatus, xhr){
			console.log(data);
			if(xhr.status == "200" || xhr.status == "201"){
				ContactCreate(storeName, dataEntity, data[0].id);
			}else{
				ResetMessages()
				$("#co_message_error").show();
			}
		},
		error: function(data){
			console.log(data);
			ResetMessages()
			$("#co_message_error").show();
		}
	});
}

function ClientCreate()
{
	var storeName		= $("#master_data_store_name").val();
	var dataEntity		= $("#master_data_data_entity").val();

	var cl_first_name 	= $("#cl_first_name").val();
	var cl_email 		= $("#cl_email").val();
	
	var cl_json = 	{
					"firstName": cl_first_name,					
					"email": cl_email					
					};

	var cl_url = "http://api.vtexcrm.com.br/" + storeName + "/dataentities/CL/documents/";

	$.ajax({
		headers: {
			"Accept": "application/vnd.vtex.ds.v10+json",
			"Content-Type": "application/json"
		},
		data: JSON.stringify(cl_json),
		type: 'PATCH',
		url: cl_url,
		success: function(data, textStatus, xhr){
			console.log(data);
			if(xhr.status == "200" || xhr.status == "201"){
				ContactCreate(storeName, dataEntity, data.Id);
			}else if(xhr.status == "304"){
				ContactCreateByEmail(storeName, dataEntity, cl_email);
			}else{
				ResetMessages()
				$("#co_message_error").show();
			}
		},
		error: function(data){
			console.log(data);
			ResetMessages()
			$("#co_message_error").show();
		}
	});
}

function ResetMessages()
{
	$("#co_message_loading").hide();
	$("#co_message_validate").hide();
	$("#co_message_success").hide();
	$("#co_message_error").hide();
}

function IsEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function FormValidate()
{
	var isFormValidate = true;

	if($("#cl_first_name").val() == ""){
		isFormValidate = false;
		$("#cl_first_name").focus();
	}	
	if((isFormValidate) && ($("#cl_email").val() == "")){
		isFormValidate = false;
		$("#cl_email").focus();
	}
	if((isFormValidate) && (!IsEmail($("#cl_email").val()))){
		isFormValidate = false;
		$("#cl_email").val("");
		$("#cl_email").focus();
	}	
	if(isFormValidate){
		ResetMessages()
		$("#co_message_loading").show();
		ClientCreate();
	}else{
		ResetMessages()
		$("#co_message_validate").show();
	}

	return false;
}

function FormCreate(storeName, dataEntity, htmlElementId, messageLoading, messageValidation, messageSuccess, messageError){
	var htmlContent = '';

	htmlContent += '<div id="co_message_loading" class="loading-msg" style="display:none;"><p>' + messageLoading + '</p></div>';

	htmlContent += '<div id="co_message_validate" class="validation-msg" style="display:none;"><p>' + messageValidation + '. Verifique se os campos foram preenchidos corretamente e tente novamente.</p><p></div>';

	htmlContent += '<div id="co_message_success" class="success-msg" style="display:none;"><h2>' + messageSuccess + '</h2><p>A partir de agora você vai receber nossas ofertas, promoções e dicas.</p><p>Acesse seu e-mail para pegar o seu cupom de desconto.</p></div>';
	
	htmlContent += '<div id="co_message_error" class="error-msg" style="display:none;"><p>' + messageError + '. Possivelmente estamos com algum problema em nossos servidores. Tente novamente em instantes.</p></div>';

	htmlContent += '<div class="formContainerNewsletter">';
		htmlContent += '<h2>Entre para a família Toque a Campainha e ganhe 10% de desconto</h2>';
		htmlContent += '<p>Cadastre-se para receber ofertas especiais em seu e-mail e ganhe um cupom para a sua primeira compra.</p>';
		htmlContent += '<div class="newsletter-modal">';
			htmlContent += '<form class="form-modal-default" id="co_form" action="javascript:FormValidate();" method="post">';
				htmlContent += '<input type="hidden" id="master_data_store_name" name="master_data_store_name" value="' + storeName + '" />';
				htmlContent += '<input type="hidden" id="master_data_data_entity" name="master_data_data_entity" value="' + dataEntity + '" />';
				htmlContent += '<input type="hidden" id="co_description" name="co_description" value="Cadastro Newsletter" />';	
				htmlContent += '<input type="hidden" id="co_type" name="co_type" value="Newsletter" />';	
				htmlContent += 		'<input placeholder="Digite seu nome" class="input-modal-default" id="cl_first_name" maxlength="100" name="cl_first_name" type="text" />';	
				htmlContent += 		'<input placeholder="Digite seu e-mail" class="input-modal-default" id="cl_email" maxlength="100" name="cl_email" type="email">';	
				htmlContent += '<input class="btn-send-modal-form" id="commit" name="commit" type="submit" value="Enviar">';
			htmlContent += '</form>';
		htmlContent += '</div>';
	htmlContent += '</div>';
	
	$("#"+htmlElementId).html(htmlContent);
}