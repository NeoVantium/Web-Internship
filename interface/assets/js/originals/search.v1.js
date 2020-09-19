var forage;var SeamlessSearch=function(){};var popup_container_load='<div id="popover_data"><div class="popover_custom_container"><img src="interface/assets/images/load.gif" width="30" height="30" alt=""/></div></div>';var popup_container_success='<div id="popover_data"><div class="popover_custom_container"><img src="interface/assets/images/check_date.jpg" width="15" height="15" alt=""/></div></div>';var search_load='<div class="loading"><div class="col-md-12 col-sm-12"><img src="interface/assets/images/load.gif" width="30" height="30" alt=""/></div></div>';(function(){"use strict";function debug(name,data){"use strict";var debugMode=true;if(debugMode){console.log(name);console.log('>'+data);}}
function IsJsonString(str){try{jQuery.parseJSON(str);}catch(e){return false;}
return true;}
SeamlessSearch.prototype.register_popup_shown_actions=function(obj){var $popup=obj;$popup.next('.popover').find('.closeButton').unbind('click').click(function(e){$popup.popover('hide');$('[data-toggle="popover"]').popover('hide');forage.register_actions();});forage.register_actions();$popup.next('.popover').find('.saveButton').unbind('click').click(function(e){var data=$("#popover_form").serialize();debug("popover_form:",data);var original=$('.popover-content').html();$('.popover-content').html(popup_container_load);$.ajax({type:"POST",url:'app/ajax/action',data:data,success:function(data){debug("popover_form RESULT:",data);console.log(data);if(IsJsonString(data)){var obj=jQuery.parseJSON(data);if(obj.outcome==="success"){debug("success: form results: ",obj);forage.refresh();setTimeout(function(){$('.popover-content').html(popup_container_success);setTimeout(function(){$popup.popover('hide');forage.closeAlert(0);},100);},0);}else{forage.alert("red",obj.error,"yes");setTimeout(function(){$('.popover-content').html(original);forage.register_popup_shown_actions($popup);},100);}}}});});};SeamlessSearch.prototype.closeAlert=function(time){setTimeout(function(){$(".alert-bar").addClass("peek");},time);};SeamlessSearch.prototype.getPopupDetails=function(data){var my='';for(var key in data){switch(key){case "action":my=my+"&"+key+"="+data[key]+"__get";break;case "pathway_id":case "id":case "step_id":case "name":case "position":my=my+"&"+key+"="+data[key];}}
var div_id='popover_data';$.ajax({type:"POST",url:'app/ajax/action',data:my,success:function(data){debug("success "+my+": popup results: ",data);if(IsJsonString(data)){setTimeout(function(){var obj=jQuery.parseJSON(data);(obj.outcome==="success")?$('#'+div_id).html(obj.content):$('#'+div_id).html('<strong class="errorRed">Uh oh!</strong></br>We could not retrieve this popup. Try refreshing the page');$(".popup_buttongroup").removeClass("hidden");},200);}else{setTimeout(function(){$('#'+div_id).html('<strong class="errorRed">Uh oh!</strong></br>We could not retrieve this popup. Try refreshing the page');},1000);}}});return popup_container_load;};SeamlessSearch.prototype.helper_setCats=function(){var cats='';var locations='';var brands='';$(".search_container .selected").each(function(){if($(this).hasClass("refineStockLocation")){locations=locations+(encodeURIComponent($(this).attr("data-value")))+",";}else{if($(this).hasClass("refineBrand")){brands=brands+(encodeURIComponent($(this).attr("data-value")))+"";}else{cats=cats+(encodeURIComponent($(this).attr("data-value")))+",";}}});$("#seamless_cats").val(cats);$("#seamless_stockLocationsH").val(locations);$("#seamless_brand").val(brands);return cats;};SeamlessSearch.prototype.removeLoad=function(){$(".loadingOverlay").remove();};SeamlessSearch.prototype.addLoad=function(selector,msg){$(selector).removeClass('open').addClass("loading").html('<div class="loadingOverlay"><div class="loadingIcon"><img class="spin" src="interface/assets/images/load.gif" style="max-width: 60px;" /><br>'+msg+"</div></div>");};SeamlessSearch.prototype.register_actions=function(){$('[data-toggle="popover"]').popover({html:true,placement:'bottom',trigger:'click',content:function(){var data=$(this).data();debug("popover action",data['action']);debug("popover name",data['name']);var buttons='<div class="element hidden popup_buttongroup"><input type="button" class="popover_button saveButton" value="save"><input type="button" class="popover_button closeButton white" value="cancel"></div>';if(data['buttons']==="hide"){return forage.getPopupDetails(data);}else{return forage.getPopupDetails(data)+buttons;}}}).on('click',function(e){$('[data-toggle="popover"]').not(this).popover('hide');}).on('shown.bs.popover',function(){forage.register_popup_shown_actions($(this));});$('[data-toggle="tooltip"]').tooltip();$("img").unveil();$(".boxsection1 img").unbind('hover').hover(function(){$(this).stop().fadeTo("fast",0.6);},function(){$(this).stop().fadeTo("slow",1.0);});$(".filter_option").unbind('click').click(function(){var $this=$(this);var value=$this.attr("data-value");var type=$this.attr("data-type");switch(type){case "gender":$.ajax({type:"POST",url:'app/ajax/action',data:'action=sc_popup__reset&name=all',success:function(data){debug("popover_form RESULT:",data);console.log(data);if(IsJsonString(data)){var obj=jQuery.parseJSON(data);if(obj.outcome==="success"){debug("success: form results: ",obj);forage.refresh();setTimeout(function(){$('.popover-content').html(popup_container_success);setTimeout(function(){$popup.popover('hide');forage.closeAlert(0);},100);},0);}else{forage.alert("red",obj.error,"yes");setTimeout(function(){$('.popover-content').html(original);forage.register_popup_shown_actions($popup);},100);}}}});break;case "stocklocation":$('.refineSearchOption[data-value="'+value+'"]').removeClass("selected").removeClass("notselected");break;case "phone_model":$('.filter_option[data-type="filter_phone_model"]').removeAttr("data-toggle").addClass('hiding');$("#seamless_phone_model").val('');$('.filter_option[data-type="filter_phone_model"]').fadeOut(500);break;case "brand":$('.filter_option[data-type="brand"]').removeAttr("data-toggle").addClass('hiding');$("#seamless_brand").val('');$('.filter_option[data-type="brand"]').fadeOut(500);$('.refineBrand[data-value="'+value+'"]').removeClass("selected").removeClass("notselected");break;case "reference":$('.filter_option[data-type="reference"]').removeAttr("data-toggle").addClass('hiding');$("#seamless_reference").val('');$('.filter_option[data-value="'+value+'"]').fadeOut(500);break;case "keyword":$('.filter_option[data-type="keyword"]').removeAttr("data-toggle").addClass('hiding');$("#keywordadhkj").val('');$('.filter_option[data-value="'+value+'"]').fadeOut(500);break;case "maincat":$('.refineSearchOption[data-value="'+value+'"]').removeClass("selected").removeClass("notselected");$('.filter_option[data-parent="'+value+'"]').each(function(){$('.refineSearchOption[data-value="'+$(this).attr("data-value")+'"]').removeClass("selected").removeClass("notselected");});$('.filter_option[data-value="'+value+'"]').fadeOut(500);break;case "subcat":$('.refineSearchOption[data-value="'+value+'"]').removeClass("selected").removeClass("notselected");break;case "collection":$('.filter_option[data-value="'+value+'"]').removeAttr("data-toggle").addClass('hiding');$('.filter_option[data-value="'+value+'"]').fadeOut(500);$('.refineSearchOption[data-value="'+value+'"]').removeClass("selected").removeClass("notselected");$('.filter_option[data-parent="'+value+'"]').each(function(){$('.refineSearchOption[data-value="'+$(this).attr("data-value")+'"]').removeClass("selected").removeClass("notselected");});break;}
forage.helper_setCats();forage.refresh();});$(".refineSearchOption").not('.disabled').unbind('click').click(function(){var $this=$(this);var type=$this.attr("data-type");if($this.hasClass('notavailable')){$.prompt("There will be no results for your combined selections. Would you like to clear your previous selections?",{title:"",buttons:{"Go Back":false,"Proceed":true},submit:function(e,v){if(v){if($this.hasClass('refineMainCat')){}else{if($this.hasClass('refineCollection')){}}
$(".refineSubCat").removeClass("selected");$(".refineMainCat").removeClass("selected").removeClass("notselected");$(".refineCollection").removeClass("selected").removeClass("notselected");switch(type){case "brand":if($this.hasClass("selected")){$this.removeClass("selected");}else{$(".refineBrand").removeClass("selected").removeClass("notselected");$(".refineBrand").addClass("notselected");$this.removeClass("notselected").addClass("selected");$this.addClass("selected");}
break;case "stockLocation":if($this.hasClass("selected")){$this.removeClass("selected");}else{$this.addClass("selected");}
break;case "maincat":if($this.hasClass("selected")){$(".refineSubCat").removeClass("selected");$(".refineMainCat").removeClass("selected").removeClass("notselected");}else{$(".refineSubCat").removeClass("selected");$(".refineMainCat").removeClass("selected").removeClass("notselected");$(".refineMainCat").addClass("notselected");$this.removeClass("notselected").addClass("selected");}
break;case "subcat":if($this.hasClass("selected")){$this.removeClass("selected");}else{$this.addClass("selected");}
break;case "collection":if($this.hasClass("selected")){$(".refineCollection").removeClass("selected").removeClass("notselected");$this.removeClass("selected");}else{$(".refineCollection").removeClass("selected").removeClass("notselected");$this.addClass("selected");}
break;}
forage.helper_setCats();forage.refresh();}else{return;}}});}else{switch(type){case "brand":if($this.hasClass("selected")){$this.removeClass("selected");}else{$(".refineBrand").removeClass("selected").removeClass("notselected");$(".refineBrand").addClass("notselected");$this.removeClass("notselected").addClass("selected");$this.addClass("selected");}
break;case "stockLocation":if($this.hasClass("selected")){$this.removeClass("selected");}else{$this.addClass("selected");}
break;case "maincat":if($this.hasClass("selected")){$(".refineSubCat").removeClass("selected");$(".refineMainCat").removeClass("selected").removeClass("notselected");}else{$(".refineSubCat").removeClass("selected");$(".refineMainCat").removeClass("selected").removeClass("notselected");$(".refineMainCat").addClass("notselected");$this.removeClass("notselected").addClass("selected");}
break;case "subcat":if($this.hasClass("selected")){$this.removeClass("selected");}else{$this.addClass("selected");}
break;case "collection":if($this.hasClass("selected")){$(".refineCollection").removeClass("selected").removeClass("notselected");$this.removeClass("selected");}else{$(".refineCollection").removeClass("selected").removeClass("notselected");$this.addClass("selected");}
break;}
forage.helper_setCats();forage.refresh();}});$("#stockSelect").unbind('click').click(function(){$(".stockChoice").slideToggle(300);});$(".resetMenu").unbind('click').click(function(){$(".refineBrand,.refineSubCat,.refineCollection,.refineMainCat,.refineStockLocatio").removeClass("selected");$("#seamless_stockLocationsH").val('');$("#seamless_cats").val('');$("#seamless_brand").val('');$("#keywordadhkj").val('');forage.refresh();});$(".hideMenu").unbind('click').click(function(){$(".search_container").slideUp(300);});$(".stockChoice a").unbind('click').click(function(){var value=$(this).attr("data-value");var newclass=$(this).attr("data-class");var newLabel=$(this).attr("data-label");$("#seamless_stockType").val(value);$(".stock").removeClass("toorder").removeClass("allstock").removeClass("instock").removeClass("onitsway").removeClass("beingmade").addClass(newclass);$(".stockChoice").hide(0);$("#stockSelect").html(newLabel);forage.refresh();});$(".SeamlessSearch_Sort").unbind('change').change(function(){var value=$(this).val();$("#sbyhidden").val(value);forage.refresh();});forage.removeLoad();};SeamlessSearch.prototype.refresh=function(){$(".refineSearchInnerMenu").fadeTo(0.5,500);forage.addLoad(".SeamlessSearch_searchItems","refreshing");forage.refineMenu();};SeamlessSearch.prototype.search=function(firstRun){if(!firstRun){var data=$("#SeamlessSearch_data").serialize();$.ajax({type:"POST",cache:false,url:'app/ajax/results',data:data}).done(function(data){if(IsJsonString(data)){var obj=jQuery.parseJSON(data);$("#seamless_searchContent").html(obj.res);$("#refineSearchInnerMenu").html(obj.refine);$(".refineOptions").html(obj.filters);var bgmode='background-image:url('+obj.banner+')';if($(".SeamlessSearch_changeImpact").attr("style")!==bgmode){$(".SeamlessSearch_changeImpact").fadeTo(300,0.5,function(){$(this).attr("style",bgmode);$(".SeamlessSearch_changeImpact").fadeTo(300,1);});}
if($(".floatingCollection .image").attr("data-collectionID")!==obj.collectionID){if(obj.collectionLogo!==""){$(".floatingCollection").fadeTo(300,0,function(){$(".floatingCollection").html(obj.collectionLogo);$(".floatingCollection").fadeTo(1000,1);$("#categoryDescriptionAreaButton").unbind('click').click(function(){var target=$("#categoryDescriptionArea");if(target.length){$('html,body').animate({scrollTop:target.offset().top},1000);return false;}});});}else{$(".floatingCollection").fadeOut(500);}}
if(!firstRun){forage.refreshCategoryText(obj.activeCat,obj.finalBrandName);}}else{}
forage.register_actions();});}else{forage.register_actions();}};SeamlessSearch.prototype.refreshCategoryText=function(id,brand){console.log("refreshCategoryText started");$.ajax({type:"POST",cache:false,url:'app/ajax/single',data:{what:'categoryText',id:id,brand:brand}}).done(function(data){console.log(data);if(IsJsonString(data)){var obj=jQuery.parseJSON(data);if(obj.text!==""){$("#categoryDescriptionArea .textcontent").html(obj.text);$("#categoryDescriptionArea").show();}else{$("#categoryDescriptionArea").hide();}}});};SeamlessSearch.prototype.refineMenu=function(firstRun){forage.search(firstRun);};})();$(document).ready(function(){"use strict";forage=new SeamlessSearch();forage.search(true);$("button.refinebutton,.refinesearch").click(function(){$("div.search_container").slideToggle(500);});$('a[href*=#]:not([href=#])').click(function(){if(location.pathname.replace(/^\//,'')===this.pathname.replace(/^\//,'')&&location.hostname===this.hostname){var target=$(this.hash);target=target.length?target:$('[name='+this.hash.slice(1)+']');if(target.length){$('html,body').animate({scrollTop:target.offset().top},1000);return false;}}});var tourSubmitFunc=function(e,v,m,f){if(v===-1){$.prompt.prevState();return false;}
else if(v===1){$.prompt.nextState();return false;}},tourStates=[{title:'Searching by Gender',html:'Click here to organise your results by Male, Female or Unisex fragrances',buttons:{Next:1},focus:0,position:{container:'.tour1',x:-50,y:40,width:300,arrow:'tc'},submit:tourSubmitFunc},{title:'Searching by Brand/Perfume Type',html:'Click here to filter by brand and/or perfume types.',buttons:{Done:2},focus:1,position:{container:'.tour2',x:-50,y:40,width:400,arrow:'tc'},submit:tourSubmitFunc}];if($("#scentsamples_search_tour")==='no'){$.prompt(tourStates);}});;(function($){$.fn.unveil=function(threshold,callback){var $w=$(window),th=threshold||0,retina=window.devicePixelRatio>1,attrib=retina?"data-src-retina":"data-src",images=this,loaded;this.one("unveil",function(){var source=this.getAttribute(attrib);source=source||this.getAttribute("data-src");if(source){this.setAttribute("src",source);if(typeof callback==="function")
callback.call(this);}});function unveil(){var inview=images.filter(function(){var $e=$(this);if($e.is(":hidden"))
return;var wt=$w.scrollTop(),wb=wt+$w.height(),et=$e.offset().top,eb=et+$e.height();return eb>=wt-th&&et<=wb+th;});loaded=inview.trigger("unveil");images=images.not(loaded);}
$w.on("scroll.unveil resize.unveil lookup.unveil",unveil);unveil();return this;};})(window.jQuery||window.Zepto);