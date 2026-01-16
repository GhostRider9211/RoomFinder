const fs = require('fs');
const path = require('path');

try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    if (!fs.existsSync(envPath)) {
        console.log("File .env.local does NOT exist at", envPath);
    } else {
        const content = fs.readFileSync(envPath, 'utf8');
        console.log("--- START .env.local ---");
        console.log(JSON.stringify(content)); // Stringify to see hidden chars/newlines
        console.log("--- END .env.local ---");
    }
} catch (err) {
    console.error("Error reading file:", err);
}
