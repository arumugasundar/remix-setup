import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getUsersById, updateUserByEmail, deleteUserById } from "~/data/user";

export async function loader({ request, params }: LoaderFunctionArgs) {
    console.log('request method :', request.method);
    const users = await getUsersById(params?.id ?? '');
    return json({ success: true, data: users});
}

export async function action({ request, params}: ActionFunctionArgs) {
    console.log('request method :', request.method);

    switch(request.method){
        case 'PUT':
            try {
                const payload = await request.json();
                const updatedUser = await updateUserByEmail(payload.name, payload.email);
                return json({ success: true, data: updatedUser});
            } catch (error) {
                console.log('error :', error)
            }
        break
            
        case 'DELETE':
            try {
                const deletedUser = await deleteUserById(params.id ?? '');
                return json({ success: true, data: deletedUser});
            } catch (error) {
                console.log('error :', error)
            }
        break

        default:
            return json({ success: false, message: "method not allowed"});
    }
}