import {brandProducts} from '../lib/brand-catalogue.ts';import {categories} from '../lib/catalogue.ts';import fs from 'node:fs';
const quote=v=>"'"+String(v).replaceAll("'","''")+"'";
let sql='-- Real owner-supplied catalogue. No prices, variants, inventory or reviews are invented.\nbegin;\n';
for(const [slug,name] of categories)sql+=`insert into public.product_categories(slug,name,published) values(${quote(slug)},${quote(name)},true) on conflict(slug) do nothing;\n`;
for(const p of brandProducts)sql+=`insert into public.products(id,slug,name,description,category,category_id,images,featured,published,price,stock,collections) values(${quote(p.id)},${quote(p.slug)},${quote(p.name)},${quote(p.description)},${quote(p.category)},(select id from public.product_categories where slug=${quote(p.category)}),${quote(JSON.stringify(p.images))}::jsonb,${p.featured},true,null,0,array[${(p.collections||[]).map(quote).join(',')}]::text[]) on conflict(id) do nothing;\n`;
sql+='commit;\n';fs.writeFileSync('supabase/seed.sql',sql);
