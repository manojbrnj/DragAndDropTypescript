function autoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const orignaMethodName = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
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

    this.element.id = 'user-input';


    this.title = document.querySelector('#title')! as HTMLInputElement;
    this.description = document.querySelector('#description')! as HTMLInputElement;
    this.people = document.querySelector('#people')! as HTMLInputElement;
    this.attach();
    this.config();

  }

  private attach() {
    this.hostEl.insertAdjacentElement('afterbegin', this.element);
  }
  @autoBind
  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this);
  }


  private config() {
    this.element.addEventListener('submit', this.submitHandler);
  }
}

// private handleSubmit(){

// }


const proj = new Project();

