import {createHash,createHmac,timingSafeEqual} from 'node:crypto';
export function digest(value:string){return createHash('sha256').update(value).digest('hex')}
export function hmac(secret:string,value:string){return createHmac('sha256',secret).update(value).digest('hex')}
export function validSignature(secret:string,payload:string,signature:string){if(!/^[a-f0-9]{64}$/i.test(signature))return false;const expected=Buffer.from(hmac(secret,payload),'hex');return timingSafeEqual(expected,Buffer.from(signature,'hex'))}
export function integerMoney(value:unknown){if(typeof value!=='number'||!Number.isSafeInteger(value)||value<0)throw Error('Invalid monetary amount.');return value}
export function calculateTotal(subtotal:number,discount:number,shipping:number,taxBps:number){[subtotal,discount,shipping,taxBps].forEach(integerMoney);if(discount>subtotal||taxBps>10000)throw Error('Invalid discount or tax.');const taxable=subtotal-discount+shipping;const tax=Math.floor((taxable*taxBps+5000)/10000);return {subtotal,discount,shipping,tax,total:taxable+tax}}
export function csvCell(value:unknown){const text=String(value??'');return '"'+(/^[=+\-@\t\r]/.test(text)?"'":'')+text.replaceAll('"','""')+'"'}
export function escapeHtml(value:unknown){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!))}
