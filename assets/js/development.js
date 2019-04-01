// To connect js scripts used plugin rigger included
// connection occurs through the design //= folder-name/file-name.js

//variable with an array of page names
var fastNavigationPage = ["index", "index2", "trick-block"];

jQuery(document).ready(function() {
	checkboxSave();
	scrollUpDown();
	breakpointRespChecked();
	breakpointWidth();
	windowResize(breakpointWidth);
	fastNavigation(fastNavigationPage);
	buttonAllOff();
});


//-------- -------- -------- --------
//-------- included dev js function start
//-------- -------- -------- --------

//#####function to trigger another function when resizing the browser window
//function to trigger another function when resizing the browser window
//use windowResize(functName);
function windowResize(functName) {
	//--------function
	$(window).on('resize orientationchange' , functName);
}
//function call --- windowResize(functName);

//#####quick navigation for easy testing
//-------quick navigation for easy testing

//function to create a block with the output of links to specified pages
function fastNavigation(pages) {
	for (var i = 0; i < pages.length; i++) {
		$('<div class="widget_item"><a class="widget_link" href="' + pages[i] + '.html' + '">' + pages[i] + '</a></div>').appendTo('.widget_list');
	}
}
//-------fastNavigation init
//function call --- fastNavigation(fastNavigationPage);

//#####scrollup plugins
//--------scrollup plugins
function scrollUpDown() {
	var buttonUp = $('.scroll-up-plugins__button--25'),
		buttonDown = $('.scroll-up-plugins__button--75'),
		button50 = $('.scroll-up-plugins__button--50'),
		buttonBlock = $('.scroll-up-plugins'),
		body = document.body,
		html = document.documentElement,
		heightWindow = window.innerHeight,
		height100 = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight),
		height25 = height100 * 0.25 - heightWindow/2;
		height50 = height100 * 0.5 - heightWindow/2;
		height75 = height100 * 0.75 - heightWindow/2;

	function buttonClick() {
		buttonUp.on("click", function() {
			window.scrollTo(0, height25);
			return false;
		});
		button50.on("click", function() {
			window.scrollTo(0, height50);
			return false;
		});
		buttonDown.on("click", function() {
			window.scrollTo(0, height75);
			return false;
		});
	}
	buttonClick();

	function buttonHide() {
		buttonBlock.hide();
		if (height100 > 5000) {
			buttonBlock.show();
		}
	}
	buttonHide();
}
//module scrollUpDown ----INIT
//function call --- scrollUpDown();

//#####breakpoint responsive utilite
//#breakpoint Resp Checked
function breakpointRespChecked() {
	//--------variable
	var checkbox = $(".responsive-breakpoint-checkbox__checkbox"),
		checkboxAddClass = $(".responsive-breakpoint");
	//--------function
	checkbox.on("click", function() {
		var checkboxState = checkbox.is(':checked');
		if (checkboxState == true) {
			checkboxAddClass.addClass('js-checkbox--checked');
		} else if (checkboxState == false) {
			checkboxAddClass.removeClass('js-checkbox--checked');
		}
	});
}
//function call --- breakpointRespChecked();

//#####breakpoint width
//#breakpoint width
function breakpointWidth() {
	//--------variable
	var breakpointWidthStrictly = $(".responsive-breakpoint__strictly"),
		windowInnerWidth = window.innerWidth,
		pixelRatio = window.devicePixelRatio,
		breakpointWidthPixelRatio = $(".responsive-breakpoint__pixel-ratio");
		//--------function
		breakpointWidthPixelRatio.html(pixelRatio);
		breakpointWidthStrictly.html(windowInnerWidth);
}
//function call --- breakpointWidth();

//#####button-all-off
//-------enable disable all plugins for development

function buttonAllOff() {
	//--------variable
	var checkbox = $("#button-all-off");
	var devScriptsBlock = $(".dev-scripts-block");
	var checkboxState = checkbox.is(':checked');
	if (checkboxState == true) {
			devScriptsBlock.show()
		} else if (checkboxState == false) {
			devScriptsBlock.hide();
	}
	//--------function
	checkbox.on("click", function() {
		var checkboxState = checkbox.is(':checked');
		if (checkboxState == true) {
			devScriptsBlock.show()
		} else if (checkboxState == false) {
			devScriptsBlock.hide();
		}
	});
}
//function call --- buttonAllOff();


//#####checkbox-save-state
function checkboxSave() {
	function save() {
		var checkbox = document.getElementById('button-all-off');
		localStorage.setItem('button-all-off', checkbox.checked);
	}

	function click() {}
	jQuery('#button-all-off').on('click', function() {
		save();
	});
	click();

	function load() {
		var checked = JSON.parse(localStorage.getItem('button-all-off'));
		document.getElementById("button-all-off").checked = checked;
	}
	load();
}
//function call --- ;

//-------- -------- -------- --------
//-------- included dev js function end
//-------- -------- -------- --------