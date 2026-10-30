import test from 'node:test';
import assert from 'node:assert/strict';
import {approvedPhoto,money} from '../lib/catalogue.ts';
const owner={url:'/brand/owner-approved.webp',alt:'Owner-labelled product photograph',source:'owner',approved:true,approved_at:'2026-10-27',approved_by:'Brand owner'};
test('only an explicitly approved owner photograph can be displayed',()=>{assert.equal(approvedPhoto(owner),true);assert.equal(approvedPhoto({...owner,approved:false}),false);assert.equal(approvedPhoto({...owner,approved_by:''}),false);assert.equal(approvedPhoto(undefined),false)});
test('reject stock, generated, external and path-traversal assets',()=>{for(const photo of [{...owner,source:'stock'},{...owner,source:'ai'},{...owner,url:'https://images.unsplash.com/photo.webp'},{...owner,url:'https://instagram.cdn.example/photo.jpg'},{...owner,url:'/brand/../other.jpg'}])assert.equal(approvedPhoto(photo),false)});
test('Instagram provenance requires an official post permalink',()=>{assert.equal(approvedPhoto({...owner,source:'instagram'}),false);assert.equal(approvedPhoto({...owner,source:'instagram',source_url:'https://www.instagram.com/p/OwnerPost123/'}),true);assert.equal(approvedPhoto({...owner,source:'instagram',source_url:'https://example.com/p/OwnerPost123/'}),false)});
test('prices use Indian rupees in paise',()=>assert.equal(money(125050),'₹1,250.50'));
