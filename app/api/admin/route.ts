import {adminRead} from '../../../lib/commerce/admin';import {commerceError} from '../commerce/handler';import {respond} from '../../../lib/commerce/server';
export async function GET(req:Request){try{return await adminRead(req)}catch(e){return commerceError(e)}}
export async function POST(){return respond({error:'Use the current account sign-in and role-protected studio workspace.'},410)}
