const DEFAULT_OPTIONS = {
    type: 'normal',
    autoClose: 5000,
    showProgress: true,
    newOnTop: false,
    showIcon: true,
    position: 'top-right',
    pauseOnHover: true,
    onClose: () => {},
    canClose: true
}

export default class Toast {
    #toastElement
    #autoCloseTimeOut
    #visibleSince
    #progressTime
    #remainingProgress

    /**
     * 
     * @param {string} text 
     * @param {object} options 
     * @param {string} options.type
     * @param {(int|false)} options.autoClose
     * @param {boolean} options.showProgress
     * @param {boolean} options.newOnTop
     * @param {(string|boolean)} options.showIcon
     * @param {string} options.position
     * @param {boolean} options.pauseOnHover
     * @param {function} options.onClose
     * @param {boolean} options.canClose
     */
    constructor(text = 'É fácil assim!', options) {
        this.#toastElement = document.createElement('div')
        this.#toastElement.classList.add('toast')
        this.#visibleSince = new Date()
        this.#update({...DEFAULT_OPTIONS, ...options, text: text})
        this.animate('show', this.#toastElement)
        if (this._icon) this.animate('show', this._icon)
    }

    /**
     * @param {(string|false)} value
     */
    set showIcon(value) {
        if (this.showIcon === false || this._type === 'normal') return

        this._icon = document.createElement('div')
        this._icon.classList.add('toast-icon-conteiner')
        let icon = document.createElement('img')
        icon.classList.add('toast-icon')
        icon.src = typeof value === 'string' ? value : `./assets/images/icons/${this._type}.svg`
        this._icon.appendChild(icon)
    }
    /**
     * @param {(int|false)} value
     */
    set canClose(value) {
        if (value === false) return
        this.#toastElement.classList.add('canClose')
        this.#toastElement.addEventListener('click', () => {
            this.remove()
        })
        if (this._icon) {
            this._icon.addEventListener('click', () => {
                this.remove()
            })
        }
    }
    /**
     * @param {string} value
     */
    set position(value) {
        const currentConteiner = this.#toastElement.parentElement
        const conteiner = document.querySelector(`.toast-conteiner[data-position="${value}"]`) || this.createConteiner(value)
        this._position = value

        let conteinerToast = document.createElement('div')
        conteinerToast.classList.add('toast-conteiner-continer')

        if (this._icon) conteinerToast.append(this._icon, this.#toastElement)
        else conteinerToast.append(this.#toastElement)

        if (this._newOnTop) {
            if (conteiner.hasChildNodes()) conteiner.insertBefore(conteinerToast, conteiner.firstChild)
            else conteiner.append(conteinerToast)
        }
        else conteiner.append(conteinerToast)

        if (currentConteiner === null || currentConteiner.hasChildNodes()) return
        currentConteiner.remove()
    }
    /**
     * @param {string} value
     */
    set text(value) {
        this.#toastElement.innerText = value
    }

    /**
     * @param {boolean} value
     */
    set showProgress(value) {
        if (value === false) return
        if (this._autoClose === false) return
        this.#toastElement.classList.add(this._type === 'normal' ? 'autoClose-normal' : 'autoClose')
        this.#progressTime = setInterval(() => { 
            const timeVisible = new Date() - this.#visibleSince
            this.#toastElement.style.setProperty('---progress', 1 - timeVisible / this._autoClose)
        })
    }

    /**
     * @param {(int|false)} value
     */
    set autoClose(value) {
        this._autoClose = value
        if (value === false) return
        this.#autoCloseTimeOut = setTimeout(() => this.remove(), value)
    }

    /**
     * @param {boolean} value
     */
    set pauseOnHover(value) {
        if (value === false) return
        if (this._autoClose === false) return

        this.#toastElement.parentElement.addEventListener('mouseenter', () => {
            const timeVisible = new Date() - this.#visibleSince
            this.#remainingProgress = (this.#remainingProgress || 1) - timeVisible / this._autoClose
            clearInterval(this.#progressTime)
            if (this.#autoCloseTimeOut !== false) clearTimeout(this.#autoCloseTimeOut)
        })

        this.#toastElement.parentElement.addEventListener('mouseleave', () => {
            this.#visibleSince = new Date()
            this.#autoCloseTimeOut = false

            this.#progressTime = setInterval(() => { 
                const timeVisible = new Date() - this.#visibleSince
                let progress = this.#remainingProgress - timeVisible / this._autoClose
                this.#toastElement.style.setProperty('---progress', progress)
                if (progress <= 0) this.remove()
            }, 10)
        })
    }

    /**
     * @param {string} value
     */
    set type(value) {
        this._type = value
        let colors = {
            'info': 'rgb(0, 140, 255)',
            'sucess': 'rgb(29, 146, 0)',
            'warning': 'rgb(255, 166, 0)',
            'error': 'rgb(255, 73, 49)'
        }
        if (value === 'normal' || colors[value] === undefined) return
        let color = colors[value]
        this.#toastElement.style.setProperty('---progress-animation-color', `${color}`)
    }

    /**
     * @param {boolean} value
     */
    set newOnTop(value) {
        this._newOnTop = value
    }

    createConteiner(position) {
        const conteiner = document.createElement('div')
        conteiner.classList.add('toast-conteiner')
        conteiner.dataset.position = position
        document.body.append(conteiner)

        return conteiner
    }

    #update(options) {
        for (const [key, value] of Object.entries(options)) {
            this[key] = value
        }
    }

    remove() {
        const conteiner = this.#toastElement.parentElement.parentElement
        clearInterval(this.#progressTime)
        this.animate('remove', this.#toastElement)
        if (this._icon) this.animate('remove', this._icon)
        this.#toastElement.addEventListener('animationend', () => {
            this.#toastElement.classList.add('hide')
            if (this._icon) this._icon.classList.add('hide')
            this.#toastElement.classList.add('shrink')
            if (this._icon) this._icon.classList.add('shrink')
            this.#toastElement.addEventListener('animationend', () => {
                this.#toastElement.parentElement.remove()
                this.onClose()
                if (conteiner.hasChildNodes()) return
                conteiner.remove()
            })
        })
    }

    animate(state, elemento) {
        let positions = this._position.split('-')
        let value = positions[1] === 'center' ? positions.join('') : positions[1]
        elemento.style.setProperty('---animation', `${state}${value}`)
        elemento.classList.add(`${state}`)
        elemento.addEventListener('animationend', () => {
            elemento.classList.remove(`${state}`)
            elemento.style.removeProperty('---animation')
        })
    }
}
