////SCRIPT FOR MODAL POPUP WINDOW
jQuery(document).ready(function(){	
	jQuery('#popup-container a.close').click(function(){
			jQuery('#popup-container').fadeOut();
			jQuery('#active-popup').fadeOut();
	});
	
	var visits = jQuery.cookie('visits') || 0;
	visits++;
	
	jQuery.cookie('visits', visits, { expires: 1, path: '/' });
		
	//console.debug(jQuery.cookie('visits'));
		
	if ( jQuery.cookie('visits') > 1 ) {
		jQuery('#active-popup').hide();
		jQuery('#popup-container').hide();
	} else {
			var pageHeight = jQuery(document).height();
			jQuery('<div id="active-popup"></div>').insertBefore('body');
			jQuery('#active-popup').css("height", pageHeight);
			jQuery('#popup-container').show();
	}

	if (jQuery.cookie('noShowWelcome')) { jQuery('#popup-container').hide(); jQuery('#active-popup').hide(); }
});	

jQuery(document).mouseup(function(e){
	var container = jQuery('#popup-container');
	
	if( !container.is(e.target)&& container.has(e.target).length === 0)
	{
		container.fadeOut();
		jQuery('#active-popup').fadeOut();
	}

});

/// Script to mount newsletter form
jQuery(document).ready(function(){
	var storeName = "toqueacampainha"; //Indica o nome da conta utilizada na API do MasterData
	var dataEntity = "NL"; //Indica a sigla da entidade de dados utilizada na API do MasterData
	var htmlElementId = "newsForm"; //Indica o ID do elemento HTML que receberÃ¡ o formulÃ¡rio
	var messageLoading = "Carregando..."; //Mensagem de carregamento do formulÃ¡rio (ao salvar)
	var messageValidation = "E-mail não cadastrado!"; //Mensagem de validaÃ§Ã£o de formulÃ¡rio
	var messageSuccess = "E-mail cadastrado com sucesso."; //Mensagem de sucesso
	var messageError = "E-mail não cadastrado!"; //Mensagem de erro
	
	FormCreate(storeName, dataEntity, htmlElementId, messageLoading, messageValidation, messageSuccess, messageError);
});