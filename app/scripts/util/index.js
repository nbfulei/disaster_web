function Workspace(cfg){
	this.init = function(){
		InitLeftMenu();
	};
	var InitLeftMenu = function(){
		$("#container").height($(window).height()-$("#navbar-example").height()-2);
		$(window).resize(function(){
			$("#container").height($(window).height()-$("#navbar-example").height()-2);
			var wid=$("#main-menu").width()
			if($(window).width() < 1024){
				if(wid>=230)narrowMenu();
			}else{
				if(wid<230)openMenu();
			}
		});
    $('#rolin label').click(function(){
      $(this).next('ul').animate({height: 'toggle', opacity: 'toggle'}, 500);
    });
		$("#sidebar-collapse i").click(function(){
			var wid=$("#main-menu").width()
			if(wid === 230){
				narrowMenu();
			}else{
				openMenu();
			}
		});
	};
	var addchildrenmenu=function(k){
		 var menulist2 = "";
		menulist2 += '<label id="'+k.id+'">'+k.text;
		if(k.children.length > 0){
			menulist2 += '<i class="glyphicon glyphicon-chevron-down menu-i3"></i>';
		}
		menulist2 += '</label><ul style="display: none;">';
	    $.each(k.children, function(j, o) {
	    	if(o.children === ""){
	    		var url=o.url;
	    		menulist2 += '<li><a id="'+o.id+'" ng-href="' + url + '" ><label>' + o.text + '</label></a></li>';
	    	}else{
	    		menulist2 += '<li>'+addchildrenmenu(o)+'</li>';
	    	}
	    });
	    menulist2 += '</ul>';
		return menulist2;
	}

	var narrowMenu=function(){
		$("#main-menu").width(45);
		$("#main-cantent").css("margin-left","60px");
		$("#sidebar-collapse i").removeClass($("#sidebar-collapse i").attr("data-icon1"));
		$("#sidebar-collapse i").addClass($("#sidebar-collapse i").attr("data-icon2"));
		$("#rolinul>li>label>.glyphicon-chevron-down").css("display","none");
		$("#rolinul>li>label>span").addClass("menuspan2");
    $("#rolinul>li>a>label>span").addClass("menuspan2");
		$("#rolinul>li>ul").addClass("submenu");
		$('#rolinul>li').bind('mouseover', limouseover);
		$('#rolinul>li').bind('mouseout', limouseout);
		$("#rolinul>li>label>span").css("display","none");
		$("#rolinul>li>a>label>span").css("display","none");
	}
	var openMenu=function(){
		$("#main-menu").width(230);
		$("#main-cantent").css("margin-left","240px");
		setTimeout(function(){
			$("#sidebar-collapse i").removeClass($("#sidebar-collapse i").attr("data-icon2"));
			$("#sidebar-collapse i").addClass($("#sidebar-collapse i").attr("data-icon1"));
			$("#rolinul>li>label>.glyphicon-chevron-down").css("display","block");
			$("#rolinul>li>label>span").removeClass("menuspan2");
			$("#rolinul>li>a>label>span").removeClass("menuspan2");
			$("#rolinul>li>ul").removeClass("submenu");
			$('#rolinul>li').unbind('mouseover');
			$('#rolinul>li').unbind('mouseout');
			$("#rolinul>li>label>span").css("display","block");
			$("#rolinul>li>a>label>span").css("display","block");
		},500);
	}
	var limouseout=function(){
		$(".menuspan2").css("display","none");
		$(".submenu").css("display","none");
		$(".downFlag").css("margin-left","71px");
	}
	var limouseover=function(){
		$(this).find(".menuspan2").css("display","block");
		$(this).find(".submenu").css("display","block");
		$(".downFlag").css("margin-left","125px");
	}
}
