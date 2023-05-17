Things I needed to do for typescript:

1. "start:backend": "ts-node --esm index.ts", instead of "react-scripts start:backend"
2. add  "type": "module" to the package.json file.
3. import ts-node (npm i ts-node)

Other imports I needed:
4. import cors and express as well, 
    npm i cors express
    npm i --save-dev @types/cors //for working with cors in typescript
5. import openAI (npm i openai)
6. import dotenv (npm i dotenv)

other files needed:
6created new file, index.ts (made sure on same level as package.json)

