
interface Validatable {
  value: string | number,
  required?: boolean,
  minLength?: number,
  maxLength?: number,
  min?: number,
  max?: number
}

function validate(validatableInput: Validatable) {
  //check all input  if  false doesnt match falis.
  let isValid = true;


  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  // console.log("required", isValid);
  if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
  }
  // console.log("minLength", isValid);
  if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.toString().trim.length <= validatableInput.maxLength;
  }
  // console.log("maxLength", isValid);
  if (validatableInput.min != null && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  // console.log("min", isValid);
  if (validatableInput.max != null && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }
  // console.log("max", isValid);

  return isValid;
}



function autoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const orignaMethodName = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const bindMethod = orignaMethodName.bind(this);
      return bindMethod;
    }
  }
  return adjDescriptor;
}


class ProjectState {

  private projects: any[] = [];
  private static instance: ProjectState;
  constructor() {
    //title: string, description: string, people: number
  }

  static addProject(title: string, description: string, people: number) {
    const newProject = {
      id: Math.random().toString(),
      title: title,
      description: description,
      people: people
    }
    this.instance.projects.push(newProject);

  }
  // we can access access static member in static method .
  static getInstance() {
    if (this.instance) {
      return this.instance
    }
    console.log('hellgs');
    this.instance = new ProjectState();
    return this.instance;
  }

}
const state = ProjectState.getInstance();
class ProjectList {
  templateEl: HTMLTemplateElement;
  hostEl: HTMLDivElement;
  element: HTMLFormElement;
  constructor(private type: 'active' | 'finished') {
    this.templateEl = document.querySelector('#project-list')! as HTMLTemplateElement;
    this.hostEl = document.querySelector('#app')! as HTMLDivElement;
    const importContent = document.importNode(this.templateEl.content, true);
    this.element = importContent.firstElementChild as HTMLFormElement;
    this.element.id = `${this.type}-project`;
    this.attach();
    this.renderContentProjecgtList();


  }

  private attach(): void {
    this.hostEl.insertAdjacentElement('beforeend', this.element);
  }

  private renderContentProjecgtList(): void {
    const List = `${this.type}-project`;
    this.element.querySelector('ul')!.id = List;
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + " " + 'PROJECTS';

  }
}

// Project Class Start
class Project {
  templateEl: HTMLTemplateElement;
  hostEl: HTMLDivElement;
  element: HTMLFormElement;
  title: HTMLInputElement;
  description: HTMLInputElement;
  people: HTMLInputElement;

  constructor() {
    this.templateEl = document.querySelector('#project-input')! as HTMLTemplateElement;
    this.hostEl = document.querySelector('#app')! as HTMLDivElement;
    const importContent = document.importNode(this.templateEl.content, true);
    this.element = importContent.firstElementChild as HTMLFormElement;
    this.title = this.element.querySelector('#title')! as HTMLInputElement;
    this.description = this.element.querySelector('#description')! as HTMLInputElement;
    this.people = this.element.querySelector('#people')! as HTMLInputElement;
    this.element.id = 'user-input';
    this.attach();
    this.config();
  }
  private attach() {
    this.hostEl.insertAdjacentElement('afterbegin', this.element);
    console.log('hi')
  }
  @autoBind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      ProjectState.addProject(...userInput);

      this.clearInput();
    }
  }
  private config() {
    this.element.addEventListener('submit', this.submitHandler);
  }
  private clearInput(): void {
    this.title.value = '';
    this.description.value = '';
    this.people.value = '';
  }

  private gatherInput(): [string, string, number] | void {

    let enteredtTitle = this.title.value;
    let enteredDescription = this.description.value;
    let enteredPeople = this.people.value;

    if (
      !validate({ value: enteredtTitle, required: true, minLength: 5 })
      ||
      !validate({ value: enteredDescription, required: true, minLength: 5 })
      ||
      !validate({ value: +enteredPeople, required: true, minLength: 5 })

    ) {
      alert("invalid input form user");
      return;
    }
    else {
      return [enteredtTitle, enteredDescription, +enteredPeople];
    }
  }
}


// Project Class Ends
const proj = new Project();
const projlist = new ProjectList('active');
const projlist1 = new ProjectList('finished');


