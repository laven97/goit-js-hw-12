import{S as b,a as w,i as c}from"./assets/vendor-B4VFN8au.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const i={galleryContainer:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loaderBtn:document.querySelector(".load-more-btn")};function L({webformatURL:o,largeImageURL:t,tags:r,likes:a,views:e,comments:s,downloads:n}){return`<li class="gallery-container">
  <a href="${t}" class="gallery-container-a">
    <img class="gallery-container-img" src="${o}" alt="${r}">
  </a>
  <ul class="img-info-list">
    <li class="img-description">
      <h3 class="description-headerline">Likes</h3>
      <p class="description-text">${a}</p>
    </li>
    <li class="img-description">
      <h3 class="description-headerline">Views</h3>
      <p class="description-text">${e}</p>
    </li>
    <li class="img-description">
      <h3 class="description-headerline">Comments</h3>
      <p class="description-text">${s}</p>
    </li>
    <li class="img-description">
      <h3 class="description-headerline">Downloads</h3>
      <p class="description-text">${n}</p>
    </li>
  </ul>
</li>`}let S=new b(".gallery-container-a ",{captions:!0,captionsData:"alt",captionPosition:"bottom",captionDelay:250,refresh:!0});function m(o){const t=o.map(r=>L(r)).join("");i.galleryContainer.insertAdjacentHTML("beforeend",t),S.refresh()}function C(){i.galleryContainer.innerHTML=""}function h(){i.loader.style.display="block"}function d(){i.loader.style.display="none"}function P(){i.loaderBtn.style.display="block"}function g(){i.loaderBtn.style.display="none"}async function y(o,t){{const a=t??1;try{return(await w.get("https://pixabay.com/api/",{params:{key:"53618010-1b89e63a15719169e29158a57",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:a}})).data}catch(e){console.error(e)}}}const u={form:document.querySelector(".form"),loader:document.querySelector(".loader"),loaderBtn:document.querySelector(".load-more-btn"),gallery:document.querySelector(".gallery")};let f="",l=1;const p=15;g();u.form.addEventListener("submit",async o=>{o.preventDefault(),C();const t=o.target.elements["search-text"].value.trim();if(!t){c.error({message:"Please enter a search query",messageColor:"white",messageSize:"20",backgroundColor:"red",position:"topRight",timeout:2e3});return}f=t,l=1,h();const r=await y(t,l);if(!r||r.hits.length===0){d(),c.error({message:"No images found. Please try again.",messageColor:"white",messageSize:"20",backgroundColor:"red",position:"topRight",timeout:2e3});return}m(r.hits),d(),Math.ceil(r.totalHits/p)>=p?P():g()});u.loaderBtn.addEventListener("click",async()=>{try{l+=1,h();const o=await y(f,l);m(o.hits);const t=Math.ceil(o.totalHits/p),{height:r}=u.gallery.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"}),l>t&&(g(),c.info({message:"You've reached the end of search results.",messageColor:"white",messageSize:"20",backgroundColor:"blue",position:"topRight",timeout:2e3}))}catch{c.error({message:"Something went wrong",messageColor:"white",messageSize:"20",backgroundColor:"red",position:"topRight",timeout:2e3})}finally{d()}});
//# sourceMappingURL=index.js.map
