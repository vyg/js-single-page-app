import ToDoItem from './ToDoItem';

class ToDo {

    static swapElements(obj1, obj2) {
        // save the location of obj2
        var parent2 = obj2.parentNode;
        var next2 = obj2.nextSibling;
        // special case for obj1 is the next sibling of obj2
        if (next2 === obj1) {
            // just put obj1 before obj2
            parent2.insertBefore(obj1, obj2);
        } else {
            // insert obj2 right before obj1
            obj1.parentNode.insertBefore(obj2, obj1);

            // now insert obj1 where obj2 was
            if (next2) {
                // if there was an element after obj2, then insert obj1 right before that
                parent2.insertBefore(obj1, next2);
            } else {
                // otherwise, just append as last child
                parent2.appendChild(obj1);
            }
        }
    }

    constructor(toDoSelector) {
        this.todo = document.querySelector(toDoSelector);
        this.todoList = this.todo.querySelector('.to-do__items');
        this.todoItems = [];
        this.itemCount = 0;
        this.addInput = this.todo.querySelector('.to-do__add__input');
        this.addBtn = this.todo.querySelector('.to-do__add__btn');
        this.clearBtn = this.todo.querySelector('.to-do__clear__btn');
        this.noCompletedBtn = this.todo.querySelector('.to-do__no_completed__btn');
        this.hideCompleted = false;
        this.setCompletedButtonText();

        this.dropSrcElement = null;
        
        this.setEvents();

        this.addItem('Milk');
        this.addItem('Chocolate');
        this.addItem('Bread');
        this.addItem('Cake');
        this.addItem('Carrots');
    }

    dragover(e) {
        e.preventDefault()
        // console.log(e);
        // console.log('dragover', this.element);
        // console.log('dragover', e);
    }

    // dragenter(e) {
    //     e.preventDefault()
    //     // console.log(e);
    //     // console.log('dragenter', e.srcElement);
    //     // console.log('dragenter', e.target);
    // }

    // dragstart(e) {
    //     console.log('dragstart', e.srcElement);
    //     console.log('dragstart', e.target);
    // }

    // drop(e) {
    //     // console.log('drop', e.srcElement);
    //     // console.log('drop', e.target);
    //     // const newEl = this.element.cloneNode(true);
    //     // this.element.remove();
    //     // console.log(newEl);

    //     // this.list.insertAdjacentElement('afterbegin', newEl);
    //     // this.element = newEl;
    //     // this.initElement();
    // }
    
    setEvents() {
        this.addBtn.addEventListener('click', (e) => {
            if (this.addInput.value) {
                this.addItem(this.addInput.value);
                this.addInput.value = '';
                this.addInput.focus();
            }
        });

        this.clearBtn.addEventListener('click', (e) => {
            this.clearAll();
        });

        this.noCompletedBtn.addEventListener('click', (e) => {
            this.setCompletedButtonText();
            this.toggleCompleted();
        });

        // this.todo.addEventListener("dragover", (e) => this.dragover(e))
        // this.todo.addEventListener("dragenter", (e) => this.dragenter(e))
        // this.todo.addEventListener("drop", (e) => this.drop(e))
        // this.todo.addEventListener("dragstart", (e) => this.dragstart(e))
        // this.todo.addEventListener("dragend", (e) => this.dragend(e))
    }

    dragenter(e) {
        // console.log('dragenter', e.relatedTarget.dataset.key);
        // console.log('dragenter', e);
        let key = null;
        if (e.target.classList.contains('to-do__item')) {
            key = e.target.dataset.key;
        } else {
            const el = e.target.closest(".to-do__item");
            if (el) {
                key = el.dataset.key;
            }
        }

        if (key) {
            e.dataTransfer.setData("text/plain", key);
        }
    }

    drop(e) {
        e.preventDefault();
        const startElementKey = e.dataTransfer.getData("text/plain");
        const endElementKey = e.dataTransfer.getData("endKey");

        console.log('drop', e.target.dataset.key);
        console.log('drop', e);
        // e.dataTransfer.setData("text/plain", e.target.dataset.key);
    }

    // dragend(e) {
    //     console.log('dragend', e.target.dataset.key);
    //     console.log('dragend', e);
    //     e.dataTransfer.setData("text/plain", e.target.dataset.key);
    // }

    dragstart(e) {
        console.log('dragstart', e.target.dataset.key);
        console.log('dragstart', e);
        e.dataTransfer.setData("text/plain", e.target.dataset.key);
    }

    setCompletedButtonText() {
        if (this.hideCompleted) {
            this.hideCompleted = false;
            this.noCompletedBtn.textContent = "Hide Completed"
        } else {
            this.hideCompleted = true;
            this.noCompletedBtn.textContent = "Show Completed"
        }
    }

    toggleCompleted() {
        this.todoItems.forEach((item) => {
            item.setVisibility(this.hideCompleted);
        })
    }

    clearAll() {
        this.todoItems.forEach((item) => {
            item.delete();
            this.itemCount = 0;
        })
    }

    addItem(label) {
        let item = new ToDoItem(this.todoList, label, this.itemCount, this.deleteItem);
        this.itemCount += 1;
        this.todoList.insertAdjacentElement('beforeend', item.getElement());
        this.todoItems.push(item)
    }
}

export default ToDo;