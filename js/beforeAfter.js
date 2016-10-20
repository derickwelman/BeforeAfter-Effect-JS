$(function($){
	$.fn.extend({ 
		beforeAfter: function(options){

			//define os parâmetros padrões
			var defaults = {
				direction : "h",
				returnToCenter : 'true',
				background: 'gray',
				barSize: 3,
				start: 'center',
				onReady: function(){}
			};
			var options = $.extend(defaults, options);

			//define o container
			var container = $(this);
			
			//define as divs das imagens
			var frontImage = container.children().first();
			var backImage = frontImage.next('div');

			//altera o css para sobrepor os elementos
			container.css('position', 'relative');
			frontImage.css('overflow', 'hidden');
			frontImage.css('z-index', '2');
			backImage.css('position', 'absolute');
			backImage.css('top', 0);
			backImage.css('overflow', 'hidden');
			backImage.css('z-index', '1');

			//define as dimensões do container e das imagens
			var width = frontImage.children().width();
			var height = frontImage.children().height();
			container.width(width);
			container.height(height);
			backImage.children().width(width);
			backImage.children().height(height);

			//define a barra central
			var bar = $('<span>');
			bar.css('background', options.background);
			bar.css('background-size', '100% 100%');
			bar.css('position', 'absolute');
			bar.css('top', 0);
			if(options.start=="begin"){
				var centerX = 0;
				var centerY = 0;
			}else if(options.start=="end"){
				var centerX = width;
				var centerY = height;
			}else{
				var centerX = width/2;
				var centerY = height/2;
			}
			if(options.direction=='h'){
				bar.css('width', options.barSize);
				bar.css('height', height);
				bar.css('left', centerX-(options.barSize/2));
				backImage.width(centerX);
			}else{
				bar.css('width', width);
				bar.css('height', options.barSize);
				bar.css('top', centerY-(options.barSize/2));
				backImage.height(centerY);
			}
			bar.css('z-index', '3');
			container.append(bar);

			//define a posição do container em relação ao canto da tela
			var screenX = container.position().left;
			var screenY = container.position().top;

			//método que movimenta a barra e corta a imagem
			container.on( "mousemove", function( event ) {
				var mouseX = event.pageX;
				var mouseY = event.pageY;

				if(options.direction=='h'){
					var newX = mouseX-screenX;
					if(newX > width){
						newX = width;
					}
					if(newX < 0){
						newX = 0;
					}
					bar.css('left', newX-(options.barSize/2));
					backImage.width(newX);
				}else{
					var newY = mouseY-screenY;
					if(newY > height){
						newY = height;
					}
					if(newY < 0){
						newY = 0;
					}
					bar.css('top', newY-(options.barSize/2));
					backImage.height(newY);
				}
			});

			if(options.returnToCenter){
				container.on('mouseleave', function(event){
					if(options.direction=='h'){
						bar.animate({'left' : centerX-(options.barSize/2)}, 300);
						backImage.animate({'width': centerX}, 300);
					}else{
						bar.animate({'top' : centerY-(options.barSize/2)}, 300);
						backImage.animate({'height': centerY}, 300);
					}
				})
			}
		}
	})
});

