import { PersonController } from "../../application/controllers/PersonController";

const p =  new PersonController();
console.log(p.speak())
p.speak('Rodrigo')