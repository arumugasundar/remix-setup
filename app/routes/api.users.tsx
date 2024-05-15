import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { createUser, getUsers } from "~/data/user";

export async function loader({ request }: LoaderFunctionArgs) {
    console.log('request method :', request.method);
    const users = await getUsers();
    return json({ success: true, data: users}) 
}

export async function action({ request }: ActionFunctionArgs){

    console.log('request method :', request.method);
    const payload = await request.json();

    switch(request.method) {
        case "POST":
            try {
                const user = await createUser(payload?.name, payload?.email);
                return json({ success: true, data: user});
            } catch (error) {
                console.log('error :', error)
            }
        break

        default:
            return new Response("Method Not Allowed", { status: 405 });
        
    }
    
}