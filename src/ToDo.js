import ToDoItem from './ToDoItem';

class ToDo {
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

    // dragover(e) {
    //     e.preventDefault()
    //     // console.log(e);
    //     // console.log('dragover', this.element);
    //     // console.log('dragover', e);
    // }

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
        this.todo.addEventListener("drop", (e) => this.drop(e))
        // this.todo.addEventListener("dragstart", (e) => this.dragstart(e))
        // this.todo.addEventListener("dragend", (e) => this.dragend(e))
    }

    dragenter(e) {
        // console.log('dragenter', e.relatedTarget.dataset.key);
        // console.log('dragenter', e);
        // let key = null;
        // if (e.target.classList.contains('to-do__item')) {
        //     key = e.target.dataset.key;
        // } else {
        //     const el = e.target.closest(".to-do__item");
        //     if (el) {
        //         key = el.dataset.key;
        //     }
        // }

        // if (key) {
        //     e.dataTransfer.setData("text/plain", key);
        // }
    }

    drop(e) {
        console.log('drop', e.target.dataset.key);
        console.log('drop', e);
        // e.dataTransfer.setData("text/plain", e.target.dataset.key);
    }

    // dragend(e) {
    //     console.log('dragend', e.target.dataset.key);
    //     console.log('dragend', e);
    //     e.dataTransfer.setData("text/plain", e.target.dataset.key);
    // }

    // dragstart(e) {
    //     console.log('dragstart', e.target.dataset.key);
    //     console.log('dragstart', e);
    //     e.dataTransfer.setData("text/plain", e.target.dataset.key);
    // }

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