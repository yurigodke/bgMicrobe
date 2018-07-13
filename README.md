# bgMicrobe
This is a project based in microbe.apk, an animate wallpaper of the smartphone Nexus. You can download the wallpaper [here](https://forum.xda-developers.com/attachment.php?attachmentid=1203425&d=1342495439).

View [demo](https://yurigodke.github.io/bgMicrobe/demo)

## Getting Started
You can use this projects with twice ways, or using npm or copy and import the index.js on your project

In your HTML you need create a container canvas tag
```
<canvas id="container" width="400" height="400"></canvas>
```

### Installing with npm

Install this project
```
npm install --save bgMicrobe
```

Import in your project
```javascript
import bgMicrobe from 'bgMicrobe'
```

### Installing with index.js

Copy the index.js file and import in your html
```html
<script src="../index.js" charset="utf-8"></script>
```
### Use
To use, you create a bgMicrobes passing the canvas element and, if you want, the options
```javascript
var canvas = document.getElementById('container');
var bgMicrobeInstanse = new bgMicrobe(canvas, {
	microbes: 100, //quantity of the initial microbe in canvas (default: 100)
	food: 50, //quantity of the initial food in canvas (default: 50)
	margins: {
		top: 10, //margin top of canvas (default: 10)
		bottom: 10, //margin bottom of canvas (default: 10)
		left: 10, //margin left of canvas (default: 10)
		right: 10 //margin right of canvas (default: 10)
	}
});
```

## Authors

* **Yuri Godke** - [Yuri Godke](http://yurigodke.com)
## License

This project is licensed under the GNU License - see the [LICENSE](LICENSE) file for details
