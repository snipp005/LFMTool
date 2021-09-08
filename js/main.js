var d1 = '';
var d2 = '';
var d3 = '';

var daily;
var c1;
var cs = [];

window.onload = function () {
	let filePath = 'Json/' + 'Clothing' + '.json'
	$.getJSON(filePath, '', function (jd) {
		console.log(jd)
	})
	$('input[type = checkbox]').each(function () {
		this.checked = false;
	})
	$('html').attr('nighteye', 'disabled')
	$('#d2').val('')
	$('#d3').val('')
	$(".dropdown").click(function () {
		$(".dropdown dd").toggle();
	});
	
	$(document).bind('click', function (e) {
		var $clicked = $(e.target);
		if (!$clicked.parents().hasClass("dropdown"))
			$(".dropdown dd").hide();
	});
	
	$('#result').click(function () {
		var resultString = document.querySelector("#result");
		resultString.select();
		document.execCommand('copy');
		$('#result').trigger('blur');
		triggerAlertBox();
	})
	
	$('dd li').click(function () {
		var val = $(this).find('span')[0].dataset.value;
		d1 = (val ? '{' : '') + val + (val ? '}' : '');
		var icon;
		if ($(this).find('img').length > 0) {
			icon = $(this).find('img')[0].cloneNode(true);
		}
		var text = $(this).find('span')[0].cloneNode(true);
		$('.dropdown > dt').children().remove()
		$('.dropdown > dt').append($(icon)).append($(text));
		fillResultField();
	})
	
	$('#d2').change(function () {
		d2 = this.value;
		fillResultField();
	})
	
	$('#d3').change(function () {
	d3 = this.value;
	fillResultField();
	})
	
	$('.rolecb').click(function () {
		if (this.checked) {
			cs.push($(this).parent().find('label').html());
			$(this).parent().parent().find('children').toggle(true);
		} else {
			cs.splice(cs.indexOf($(this).closest('td').find('label').html()), 1);
			$(this).parent().parent().find('children').children().each(function () {
				$(this).find('input')[0].checked = false;
			})
			$(this).parent().parent().find('children').toggle(false);
		}
		fillResultField();
	})
	
	$('.rolecb').parent().find('label').click(function () {
		$(this).parent().find('input').click();
	})
	
	$('.rolecbchild').click(function () {
		var name = $(this).parent().parent().parent().find('div').find('label').html();
		var subroles = ''
		$(this).parent().parent().children('div').each(function () {
			var cb = $(this).find('input')[0];
			var label = $(this).find('label');
			if (cb.checked) {
				if (subroles.includes('(')) {
					subroles += ', ' + label.html();
				} else {
					subroles = '(' + label.html();
				}
			}
		})
		if (subroles) subroles += ')';
		cs.forEach(function (v, i) {
			if (v.includes(name)) cs.splice(i, 1, name + (subroles ? ' ' : '') + subroles);
		})
		fillResultField();
	})
	
	$('.rolecbchild').parent().find('label').click(function () {
		$(this).parent().find('input').click();
	})
	
	$('#hcdiv label').click(function () {
		$(this).closest('div').find('input').click();
	})
	
	$('#dailycb').click(function () {
		if (this.checked) {
			daily = 'nhc';
		} else {
			daily = '';
		}
		fillResultField();
	})
	
	$('#hccb').click(function () {
		if (this.checked) {
			c1 = 'HC';
		} else {
			c1 = '';
		}
		fillResultField();
	})
}

function fillResultField() {
	var css = '';
	cs.forEach(function (v, i) {
		if (cs.length === i + 1) {
			css += v;
		} else if (cs.length === i + 2) {
			css += v + ' und ';
		} else {
			css += v + ', ';
		}
	})
	var text = (d3 ? d3 + ' ' : '') + (d1 ? d1 + ' ' : '') + 'LFM' + (css ? ' ' + css : '') + (css && d2 ? ' - ' : '') + (d2 ? css ? d2 : ' ' + d2 : '') + (daily && d2 ? ' ' + daily : '')+ (c1 && d2 ? ' ' + c1 : '') + (d1 ? ' ' + d1 : '');
	$('#result').attr('value', text);
}

function triggerAlertBox() {
	$('#alertBox').toggle(true);
	setTimeout(function () {
		$('#alertBox').toggle(false)
	}, 1000);
}