function loadIcon(){$("#step1 img").attr("src","interface/assets/images/basket/icons/load.gif")}
$(document).ready(function(){$("#back").click(function(){window.location="/basket"});$("input[rel='quickCheckout']").click(function(){$(".qcheckOff").hide();$(".qcheckOn").show();$("#siginTitle").html("Quick Checkout");$("#new_account").val(2)})})