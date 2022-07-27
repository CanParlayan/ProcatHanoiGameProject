const DEFAULT_GAME = new class Game {
	constructor() {
		this.nodes = {
			towers: {
				all: document.querySelectorAll(".tower"),
				start: document.querySelector(".tower#start"),
				end: document.querySelector(".tower#end")
			},
			options: {
				all: document.querySelectorAll(".options .icon"),
				reset: document.querySelector(".icon.reset"),
				hash: document.querySelector(".icon.hash"),
				moon: document.querySelector(".icon.moon")
			},
			info: {
				moves: document.querySelector(".info .moves span"),
				disks: document.querySelector(".info .disks span")
			},
			input: document.querySelector("input[type=range]"),
		}

		this.initStart()
		this.initClickEvents()
		this.initKeyEvents()
		this.initOptions()
		
	}

	initStart(diskCount = 4) {
		const { towers, options, info } = this.nodes

		// Reset each tower to contain no disks
		towers.all.forEach(tower => {
			tower.innerHTML = null
			tower.style.height = null
		})

		// Create the disks and add them to the start tower
		for (let index = 0; index < diskCount; index++) {
			const disk = document.createElement("div")

			disk.className = "disk"
			document.body.classList.contains("dark") && disk.classList.add("dark")
			options.hash.classList.contains("show-text") && disk.classList.add("show-text")

			disk.dataset.size = disk.innerText = index + 1
			disk.style.width = `calc(${20 + ((85 / diskCount) * index)}% - 7.33px)`

			towers.start.insertBefore(disk, towers.start.firstChild)
		}

		towers.all.forEach(tower => {
			if (tower !== towers.start) {
				tower.style.height = `${towers.start.clientHeight - 14}px`
			}
		})

		// Reset the info for moves and disk count
		info.moves.textContent = 0
		info.disks.textContent = diskCount
	}

	initClickEvents() {
		this.nodes.towers.all.forEach(tower =>
			tower.onclick = () => {
				const { info, towers, input } = this.nodes
				const disk = {
					selected: document.querySelector(".selected"),
					top: tower.lastElementChild,
					count: parseInt(info.disks.textContent),
				}

				// No disk is selected
				if (!disk.selected)
					disk.top && disk.top.classList.add("selected")
				// A disk has been selected (ready to drop)
				else {
					// Conditions met for dropping selected disk
					if (!disk.top || disk.top.dataset.size > disk.selected.dataset.size) {
						disk.selected.remove()
						disk.selected.classList.remove("selected")
						tower.appendChild(disk.selected)
						info.moves.textContent++
						// Disk is being dropped in its own tower
					} else if (tower === disk.selected.parentElement)
						disk.selected.classList.remove("selected")
				}

				// Win condition met, start new game
				if (towers.end.childElementCount === disk.count) {
					alert("You Win!")
					this.initStart(disk.count + 1)
					input.value = disk.count + 1
				}
			}
		)
	}

	initKeyEvents() {
		document.body.onkeyup = event =>
			this.nodes.towers.all.forEach((tower, index) => {
				if (event.code === ["Digit1", "Digit2", "Digit3"][index])
					tower.onclick()
			})
	}

	initOptions() {
		const { input, info, options } = this.nodes

		input.onchange = () => this.initStart(input.value)
		input.oninput = () => info.disks.textContent = input.value

		options.reset.onclick = () => this.initStart(info.disks.textContent)
		options.hash.onclick = () => 
			document.querySelectorAll(".icon.hash, .disk").forEach(element => 
				element.classList.toggle("show-text")
			)
		options.moon.onclick = () => {
			document.querySelectorAll("body, .disk").forEach(element =>
				element.classList.toggle("dark")
			)
			document.querySelector("meta[name=theme-color]").setAttribute("content",
				document.body.classList.contains("dark") ? "#0e0e0e" : "#ffffff")
		}
	}
}()