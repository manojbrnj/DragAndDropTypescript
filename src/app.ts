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
  }
  @autoBind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      console.log(title, description, people);
      this.clearInput()

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

    if (enteredtTitle.trim().length === 0 || enteredDescription.trim().length === 0 || enteredPeople.trim().length === 0) {
      alert("invalid input form user");
      return;

    }
    else {
      return [enteredtTitle, enteredDescription, +enteredPeople];
    }
  }


}

// private handleSubmit(){

// }


const proj = new Project();

