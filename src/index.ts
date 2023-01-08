class Person {
    speak(name?: string): string {
        return `Olá ${name?.toLocaleUpperCase() ?? 'Fulano'}`
    }
}

const p =  new Person();
p.speak()
p.speak('Rodrigo')