import Storefront from '../../components/storefront';
import {notFound} from 'next/navigation';
import {loadCatalogue} from '../../lib/commerce/catalogue';
import {env} from '../../lib/commerce/server';
import type {Metadata} from 'next';
const routes=new Set(['shop','wishlist','custom-orders','about','contact','cart','checkout','track-order','faq','admin','account','unsubscribe']);
function valid(slug:string[]){return slug.length===1?routes.has(slug[0]):slug.length===2&&((slug[0]==='account'&&slug[1]==='recovery')||['products','collections','order-confirmation'].includes(slug[0])||(slug[0]==='policies'&&['shipping','returns','privacy','terms'].includes(slug[1])))}
export async function generateMetadata({params}:{params:Promise<{slug:string[]}>}):Promise<Metadata>{
 const {slug}=await params;const path='/'+slug.join('/');
 if(slug[0]==='products'){
  const {products}=await loadCatalogue();const p=products.find(p=>p.slug===slug[1]);
  if(!p)return {title:'Piece not found',robots:{index:false}};
  return {title:p.seo_title||p.name,description:p.seo_description||p.description,alternates:{canonical:path},openGraph:{title:p.name,description:p.description,images:p.images.map(i=>({url:i.url,alt:i.alt}))}};
 }
 return {title:slug[0].replaceAll('-',' '),alternates:{canonical:path},...(['account','admin','cart','checkout','order-confirmation','wishlist','track-order'].includes(slug[0])?{robots:{index:false,follow:false}}:{})};
}
export default async function Page({params}:{params:Promise<{slug:string[]}>}){
 const {slug}=await params;if(!valid(slug))notFound();let structured:Record<string,unknown>|null=null;
 if(slug[0]==='products'){
  const {products}=await loadCatalogue();const p=products.find(p=>p.slug===slug[1]);if(!p)notFound();
  const variants=p.product_variants?.filter(v=>v.active)||[];
  structured={'@context':'https://schema.org','@type':'Product',name:p.name,description:p.description,image:p.images.map(i=>i.url),brand:{'@type':'Brand',name:'Crafty Blossoms'},...(variants.length?{offers:variants.map(v=>({'@type':'Offer',priceCurrency:'INR',price:((v.sale_price??v.price)/100).toFixed(2),availability:(v.inventory?.[0]?.on_hand||0)>(v.inventory?.[0]?.reserved||0)?'https://schema.org/InStock':'https://schema.org/OutOfStock',url:(env('PUBLIC_SITE_URL')||'')+'/products/'+p.slug}))}:{})};
 }
 return <>{structured&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured).replaceAll('<','\\u003c')}}/>}<Storefront path={'/'+slug.join('/')}/></>;
}
