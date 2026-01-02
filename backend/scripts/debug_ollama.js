import { Ollama } from 'ollama'
import defaultOllama from 'ollama'

console.log("Named Import:", Ollama);
console.log("Default Import:", defaultOllama);

try {
    const instance1 = new Ollama({ host: 'http://localhost:11434' });
    console.log("✅ new Ollama() worked");
} catch (e) {
    console.log("❌ new Ollama() failed:", e.message);
}

try {
    const instance2 = new defaultOllama({ host: 'http://localhost:11434' });
    console.log("✅ new defaultOllama() worked");
} catch (e) {
    console.log("❌ new defaultOllama() failed:", e.message);
}
