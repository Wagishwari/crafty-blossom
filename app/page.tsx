import Storefront from '../components/storefront';import {loadCatalogue} from '../lib/commerce/catalogue';
export default async function Page(){const {products}=await loadCatalogue();return <Storefront path="/" initialProducts={products}/>}
