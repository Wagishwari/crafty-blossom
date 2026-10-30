import {commerceGet,commercePost,commerceError} from '../handler';
export async function GET(req:Request,{params}:{params:Promise<{action:string[]}>}){try{return await commerceGet(req,(await params).action.join('/'))}catch(e){return commerceError(e)}}
export async function POST(req:Request,{params}:{params:Promise<{action:string[]}>}){try{return await commercePost(req,(await params).action.join('/'))}catch(e){return commerceError(e)}}
