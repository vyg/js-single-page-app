const createElementTemplate = (domString) => {
    let html = new DOMParser().parseFromString(domString, 'text/html');
    return Array.from(html.body.childNodes)[0];
}

class ToDoItem {
    constructor(list, label, count, hideComplete = true) {
        this.label = label;
        this.list = list;
        this.count = count;
        this.done = false;
        this.hideComplete = hideComplete;

        this.element = createElementTemplate(this.template(this.label));
        
        this.initElement();
    }

    initElement() {
        this.doneEL = this.element.querySelector('.to-do__item__done');
        this.deleteButton = this.element.querySelector('.to-do__item__delete');
        
        this.setVisibility(this.hideComplete);

        this.deleteButton.addEventListener('click', () => {
            this.delete()
        });
    
        this.doneEL.addEventListener('change', (e) => {
            this.done = this.doneEL.checked;
            if (this.done) {
                this.element.classList.add('done');
            } else {
                this.element.classList.remove('done');
            }

            this.setVisibility(this.hideComplete);
        });

        // this.element.addEventListener("dragover", (e) => this.dragover(e))
        // this.element.addEventListener("dragenter", (e) => this.dragenter(e))
        this.element.addEventListener("drop", (e) => this.drop(e))
        // this.element.addEventListener("dragstart", (e) => this.dragstart(e))
    }

    drop(e) {
        console.log('drop', e);
        // const newEl = this.element.cloneNode(true);
        // this.element.remove();
        // console.log(newEl);
        
        // this.list.insertAdjacentElement('afterbegin', newEl);
        // this.element = newEl;
        // this.initElement();
    }
    // dragstart(e) {
    //     console.log('dragstart', e.target.dataset.key);
    //     console.log('dragstart', e);
    //     e.dataTransfer.setData("text/plain", e.target.dataset.key);
    // }

    delete() {
        this.element.remove();
    }

    hide() {
        this.element.classList.add('hide');
    }

    show() {
        this.element.classList.remove('hide');
    }

    setVisibility(hideEL) {
        this.hideComplete = hideEL;

        if (!this.hideComplete) {
           return this.show();
        } 
        
        if (this.doneEL.checked) {
            this.hide();
        } else {
            this.show();
        }
    }

    getElement() {
        return this.element;
    }

    template() {
        return (
            ` <li class="to-do__item" data-key="${this.count}" draggable="true">
                <input id="checkBox" type="checkbox" class="to-do__item__done">
                <div class="to-do__item__text">${this.label}</div> 
                <button class="btn to-do__item__delete" type="button">Delete</button>
            </li>`
        )
    }
}

export default ToDoItem;