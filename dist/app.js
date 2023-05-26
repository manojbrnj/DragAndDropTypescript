"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function autoBind(_, _2, descriptor) {
    const orignaMethodName = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const bindMethod = orignaMethodName.bind(this);
            return bindMethod;
        }
    };
    return adjDescriptor;
}
class Project {
    constructor() {
        this.templateEl = document.querySelector('#project-input');
        this.hostEl = document.querySelector('#app');
        const importContent = document.importNode(this.templateEl.content, true);
        this.element = importContent.firstElementChild;
        this.title = this.element.querySelector('#title');
        this.description = this.element.querySelector('#description');
        this.people = this.element.querySelector('#people');
        this.element.id = 'user-input';
        this.attach();
        this.config();
    }
    attach() {
        this.hostEl.insertAdjacentElement('afterbegin', this.element);
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            console.log(title, description, people);
            this.clearInput();
        }
    }
    config() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    clearInput() {
        this.title.value = '';
        this.description.value = '';
        this.people.value = '';
    }
    gatherInput() {
        let enteredtTitle = this.title.value;
        let enteredDescription = this.description.value;
        let enteredPeople = this.people.value;
        if (enteredtTitle.trim().length === 0 || enteredDescription.trim().length === 0 || enteredPeople.trim().length === 0) {
            alert("invalid input form user");
            return;
        }
        else {
            return [enteredtTitle, enteredDescription, +enteredPeople];
        }
    }
}
__decorate([
    autoBind
], Project.prototype, "submitHandler", null);
// private handleSubmit(){
// }
const proj = new Project();
