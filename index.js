import{S as w,a as S,i as d}from"./assets/vendor-B4VFN8au.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const l={galleryContainer:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loaderBtn:document.querySelector(".load-more-btn")};function C({webformatURL:i,largeImageURL:t,tags:r,likes:s,views:e,comments:o,downloads:c}){return`<li class="gallery-container">
  <a href="${t}" class="gallery-container-a">
    <img class="gallery-container-img" src="${i}" alt="${r}">
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
      <p class="description-text">${c}</p>
    </li>
  </ul>
</li>`}let L=new w(".gallery-container-a ",{captions:!0,captionsData:"alt",captionPosition:"bottom",captionDelay:250,refresh:!0});function h(i){const t=i.map(r=>C(r)).join("");l.galleryContainer.insertAdjacentHTML("beforeend",t),L.refresh()}function q(){l.galleryContainer.innerHTML=""}function f(){l.loader.style.display="block"}function g(){l.loader.style.display="none"}function B(){l.loaderBtn.style.display="block"}function a(){l.loaderBtn.style.display="none"}async function y(i,t){{const s=t??1;try{return(await S.get("https://pixabay.com/api/",{params:{key:"53618010-1b89e63a15719169e29158a57",q:i,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:s}})).data}catch(e){console.error(e)}}}const p={form:document.querySelector(".form"),loader:document.querySelector(".loader"),loaderBtn:document.querySelector(".load-more-btn"),gallery:document.querySelector(".gallery")};let b="",n=1;const u=15;let m=0;a();p.form.addEventListener("submit",async i=>{i.preventDefault();const t=i.target.elements["search-text"].value.trim();if(!t){d.error({message:"Please enter a search query",messageColor:"white",messageSize:"20",backgroundColor:"red",position:"topRight",timeout:2e3});return}q(),a(),b=t,n=1,f();try{const r=await y(t,n,u);if(!r||r.hits.length===0){g(),d.error({message:"No images found. Please try again.",messageColor:"white",messageSize:"20",backgroundColor:"red",position:"topRight",timeout:2e3});return}m=r.totalHits,h(r.hits),n*u<m?B():a()}catch{d.error({message:"Something went wrong",messageColor:"white",messageSize:"20",backgroundColor:"red",position:"topRight",timeout:2e3}),a()}finally{g(),p.form.reset()}});p.loaderBtn.addEventListener("click",async()=>{n+=1,a(),f();try{const i=await y(b,n,u);h(i.hits);const t=document.querySelector(".gallery-container");if(t){const{height:r}=t.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}n*u<m&&(a(),d.info({message:"You've reached the end of search results.",messageColor:"white",messageSize:"20",backgroundColor:"red",position:"topRight",timeout:2e3}))}catch{d.error({message:"Something went wrong",messageColor:"white",messageSize:"20",backgroundColor:"red",position:"topRight",timeout:2e3})}finally{g()}});
//# sourceMappingURL=index.js.map
