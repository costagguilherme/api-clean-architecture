class Person {
    speak(name) {
        return `Olá ${name?.toLocaleUpperCase() ?? 'Fulano'}`;
    }
}
const p = new Person();
p.speak();
p.speak('Rodrigo');
//# sourceMappingURL=index.js.map