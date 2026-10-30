import type {MetadataRoute} from 'next';
export default function robots():MetadataRoute.Robots{const live=process.env.STORE_MODE==='production'&&process.env.LAUNCH_VALIDATED==='true';return {rules:{userAgent:'*',...(live?{allow:'/',disallow:['/admin','/account','/checkout','/cart','/api/','/order-confirmation/']}:{disallow:'/'})},...(live?{sitemap:process.env.PUBLIC_SITE_URL+'/sitemap.xml'}:{})}}
