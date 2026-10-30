import type {Product} from './catalogue';
const items=[
 ['bouquet-bag','Crochet Bouquet Bag','crochet-bags','A cream crochet bag with deep red rose details and green accents.','Cream crochet bouquet bag with red roses and green accents.'],
 ['rose-bag','Crochet Rose Bag','crochet-bags','A rose-shaped crochet bag in deep red, photographed with a pearl-style handle.','Deep red rose-shaped crochet bag with a pearl-style handle.'],
 ['flower-bags','Flower-shaped Crochet Bags','crochet-bags','Flower-shaped bags shown in blue and white, each with a sunny yellow centre.','Blue and white flower-shaped crochet bags with yellow centres.'],
 ['tulip-pouches','Crochet Tulip Pouches','pouches-accessories','Tulip-pattern pouches shown in pink, red, cream and green colour combinations.','Three crochet pouches with pink and red tulip patterns.'],
 ['striped-pouches','Colourful Crochet Pouches','pouches-accessories','A colourful collection of striped and solid crochet pouches.','Colourful striped crochet pouches in orange, green, blue and turquoise.'],
 ['cat-pouches','Cat-shaped Crochet Pouches','pouches-accessories','Cat-shaped crochet pouches with playful faces and a little bow detail.','Three cat-shaped crochet pouches in orange, black and pale yellow.'],
 ['crochet-gajra','Crochet Gajra','floral-creations','Red and cream crochet flowers with green details and trailing floral ties.','Two red and cream crochet floral gajra with trailing ties.'],
 ['tulip-coasters','Crochet Tulip Coasters','handmade-home','Round crochet coasters with red and green floral edging.','Two cream crochet coasters with red and green tulip edging.']
];
// Actual owner-supplied products, not sample inventory. Zero stock is a safety
// guard against purchasing: physical availability is unconfirmed, not sold out.
export const brandProducts:Product[]=items.map(([slug,name,category,description,alt],i)=>({id:`cb000000-0000-4000-8000-${String(i+1).padStart(12,'0')}`,slug,name,category,description,price:null,stock:0,published:true,featured:i<4,created_at:'2026-10-27T10:08:27.000Z',collections:i>=3?['little-treasures']:[],images:[{url:`/brand/products/${slug}.webp`,alt,source:'owner',approved:true,approved_at:'2026-10-27',approved_by:'User-supplied brand photographs approved in redesign request'}]}));
