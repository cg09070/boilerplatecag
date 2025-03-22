import each from 'lodash/each'

import Home from 'pages/Home'

class App {
	constructor () {
		this.createContent()
		this.createPages()
		
		this.onResize()
		this.update()
	}
	
	createContent() {
		this.content = document.querySelector('.content')
		this.template = this.content.getAttribute('data-template')
	}
	
	createPages() {
		this.pages = {
			home: new Home()
		}
		
		this.page = this.pages[this.template]
		this.page.create()
		this.page.show()
	}
	
	onResize() {
		if(this.page && this.page.onResize) {
			this.page.onResize()
		}
	}
	
	update() {
		if(this.page && this.page.update) {
			this.page.update()
		}
		
		this.frame = window.requestAnimationFrame(this.update.bind(this))
	}
}

new App()