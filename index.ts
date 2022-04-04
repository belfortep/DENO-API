import { Application, Router } from "https://deno.land/x/oak/mod.ts";   //mod.ts es generalmente donde estan todos los archivos de deno

import router from './routes/index.routes.ts'

const app = new Application();


app.use(router.routes());
app.use(router.allowedMethods());

console.log('Server on port', 3000)
await app.listen({ port: 3000 }); //en deno no hace falta usar una funcion async para poner el await

