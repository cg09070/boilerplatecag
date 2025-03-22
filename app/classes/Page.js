import each from 'lodash/each'
import GSAP from 'gsap'
import { ColorsManager } from 'classes/Colors'

export default class Page {
	constructor({
		id,
		element,
		elements
	}) {
		this.selector = element
		this.selectorChildren = {
			...elements
		}
		this.id = id
	}
	
	create() {
		this.element = document.querySelector(this.selector)
		this.elements = {}
		
		each(this.selectorChildren, (entry, key) => {
			if(entry instanceof window.HTMLElement || entry instanceof window.NodeList || Array.isArray(entry)) {
				this.elements[key] = entry
			} else {
				this.elements[key] = document.querySelectorAll(entry)
				
				if(this.elements[key].length === 0) {
					this.elements[key] = null
				} else if(this.elements[key].length === 1) {
					this.elements[key] = document.querySelector(entry)
				}
			}
		})
	}
	
	
	show() {
		return new Promise(resolve => {
			ColorsManager.change({
				backgroundColor: this.element.getAttribute('data-background'),
				color: this.element.getAttribute('data-color')
			})
		})
	}
	
	hide() {
		
	}
	
	onResize() {
		
	}
	
	update() {
		
	}
}