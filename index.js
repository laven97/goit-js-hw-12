import{S as y,a as b,i as c}from"./assets/vendor-B4VFN8au.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const a={galleryContainer:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loaderBtn:document.querySelector(".load-more-btn")};function w({webformatURL:r,largeImageURL:t,tags:i,likes:s,views:e,comments:o,downloads:n}){return`<li class="gallery-container">
  <a href="${t}" class="gallery-container-a">
    <img class="gallery-container-img" src="${r}" alt="${i}">
  </a>
  <ul class="img-info-list">
    <li class="img-description">
      <h3 class="description-headerline">Likes</h3>
      <p class="description-text">${s}</p>
    </li>
    <li class="img-description">
      <h3 class="description-headerline">Views</h3>
      <p class="description-text">${e}</p>
    </li>
    <li class="img-description">
      <h3 class="description-headerline">Comments</h3>
      <p class="description-text">${o}</p>
    </li>
    <li class="img-description">
      <h3 class="description-headerline">Downloads</h3>
      <p class="description-text">${n}</p>
    </li>
  </ul>
</li>`}let L=new y(".gallery-container-a ",{captions:!0,captionsData:"alt",captionPosition:"bottom",captionDelay:250,refresh:!0});function m(r){const t=r.map(i=>w(i)).join("");a.galleryContainer.insertAdjacentHTML("beforeend",t),L.refresh()}function S(){a.galleryContainer.innerHTML=""}function h(){a.loader.style.display="block"}function d(){a.loader.style.display="none"}function C(){a.loaderBtn.style.display="block"}function g(){a.loaderBtn.style.display="none"}async function f(r,t){{const s=t??1;try{return(await b.get("https://pixabay.com/api/",{params:{key:"53618010-1b89e63a15719169e29158a57",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:s}})).data}catch(e){console.error(e)}}}const u={form:document.querySelector(".form"),loader:document.querySelector(".loader"),loaderBtn:document.querySelector(".load-more-btn")};let p,l;g();u.form.addEventListener("submit",async r=>{r.preventDefault(),S(),g();const t=r.target.elements["search-text"].value.trim();if(p=t,l=1,t===""){c.error({message:"Please enter a search query",messageColor:"white",messageSize:"20",backgroundColor:"red",position:"topRight",timeout:2e3});return}h();const i=await f(t);if(i.hits.length===0){c.error({message:"No images found. Please try again.",messageColor:"white",messageSize:"20",backgroundColor:"red",position:"topRight",timeout:2e3});return}m(i.hits),d(),C()});u.loaderBtn.addEventListener("click",async()=>{try{l+=1,h();const r=await f(p,l);m(r.hits),d();const{height:t}=document.querySelector(".gallery-container").getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"});let i=Math.ceil(r.totalHits/p.per_page);l>=i&&(g(),c.info({message:"You've reached the end of search results.",messageColor:"white",messageSize:"20",backgroundColor:"blue",position:"topRight",timeout:2e3}))}catch{c.error({message:"Something went wrong",messageColor:"white",messageSize:"20",backgroundColor:"red",position:"topRight",timeout:2e3})}finally{d(),u.form.reset()}});
//# sourceMappingURL=index.js.map
