# jDonovosoft 

jDonovosoft is a Javascript Library collecting all the functions commonly used for donovosoft web projects

## Getting Started

Just `git clone` and start to code!!

### Prerequisities

Most of the functions have better performance on Mozilla and Chrome browsers, IE :(

### Installing

Just copy script file in your assets directory and add `<script>` line in your pages

IMPORTANT: Needs jquery.js >= 1.4 to work

## Running the tests

If you want to make sure that the library is available in your page you can make a simple function call
```
<head>
<script src="assets/donovosoft.js" />

$_.onLoad(function(){
	alert($_.version)
});
</head>
```

## Usage Examples

###Crono Object
This object can be use to perform functions in a specific time
####Properties:
 **delay** : Number of seconds to execute function 'work' <br />
 **work**: function to execute after delay <br />
 **times**: Number of time that the function 'work' will be repeated <br />
####Methods:
**isRunning()**: True if the crono object is active<br />
**start()**: Start the cron function inside the object<br />
**stop()**:  Stop the cron function to be executed<br />
####Example:
```
  $_.onLoad(function(){
		var setTime = function(){
			var date = new Date();
			$_.findElement("hour").innerHTML = date.getHours();
			$_.findElement("min").innerHTML = date.getMinutes()
			$_.findElement("sec").innerHTML = date.getSeconds();
		}
		//Crono object refresh time after 1 second
		var cron = $_.crono({
			delay:1,
			work:setTime
		}); 
		cron.start();
	});
```
###Draw Object
Transforms a CANVAS tag into a freehand editor, should be used on a browser with HTML5 support .
####Properties:
 **element**: The object canvas<br />
 **lineWidth**: Anchor of the drawing line<br />
 **lineColor**: Color of the drawing line <br />
####Methods:
 **clear(function)**: Clear complete draw in the canvas<br />
 **save(format,function)**: Save current draw and call the function argument after save it, current supported formats: 						jpg,gif<br />
 **loadPicture(src, properties, function)**: Load an image to the current draw from *src* and some *properties*<br />

####Example:
```
$_.onLoad(function(){
		 var draw = $_.drawing({
			 		element: document.getElementById("canvas"),
			 		lineWidth: 1,
			 		lineColor: '#FFFFFFF'
		});
		 $_.addEvent('click',document.getElementById("limpiar"),function(){
			draw.clear(); 
		 });
		 $_.addEvent('click',document.getElementById('ajustar'),function(){
			 draw.setProperties({
			 		lineWidth: document.getElementById('width').value,
			 		lineColor: document.getElementById('color').value
			  });
		 });
		 $_.addEvent('click',document.getElementById('guardar'),function(){
			draw.save('gif',function(image){
				window.open(image);
			}); 
		 });
		var start = 1;
		 $_.addEvent('click',document.getElementById('stop'),function(){
			 	if(start == 1){
					draw.stop();
					start = 0
					document.getElementById('stop').value = "Continuar Trazo"
			 	}else{
			 		draw.continueDraw();
			 		document.getElementById('stop').value = "Detener Trazo"
			 		start = 1;
			 	}
		});
		 
	});
```

## Contributing

Feel free to contribute to this project or distribute it

## Versioning

https://github.com/donovosoft/jdonovosoft

Please use a new branch to bug fixes or development branch to new features

## Authors

* **Mauricio Barrera mauricio.barrerag@gmail.com** 

See also the list of [contributors](https://github.com/donovosoft/jdonovosoft/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License 

## Acknowledgments

* This is not a replacement of any important library
* Inspired by the every day hard work since 2010 and intended to simplify coding
* Report any issue through Github or send it to donovosoft@gmail.com

