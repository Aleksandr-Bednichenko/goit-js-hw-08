 import gallery from './gallery-items.js'

 const refs = {
    galleryList: document.querySelector('.gallery'),
    lightboxEl: document.querySelector('.lightbox'),
    closeEl: document.querySelector('.lightbox__button'),
    lightboxImg: document.querySelector('.lightbox__image'),
    lightboxOverlay: document.querySelector('.lightbox__overlay'),
     }
 

 
 
  
   function createListImage(items) {
    return items.map((item, index) => `
    <li class="gallery__item" > 
    <a class="gallery__link"
      href= ${item.original}
    >
      <img
        class="gallery__image"
        data-index=${index}
        src= ${item.preview}
        data-source=${item.original}
        alt= ${item.description}        
      />
    </a>
  </li>`).join('');  
   };
  
    const listItemsMarkup = createListImage(gallery);
    refs.galleryList.innerHTML = listItemsMarkup;
    refs.galleryList.addEventListener('click', onClick);
    refs.closeEl.addEventListener('click', onClose);
    refs.lightboxOverlay.addEventListener('click', onClose);
    document.addEventListener('keydown', onPressKey);
    

    
    let index;
    

    function onClick(event){
        event.preventDefault();
        const onClickImage = event.target.classList.contains('gallery__image');
        if (!onClickImage) {
            return;
        }
        removeActiveClass();
        removeImgSrc();
        refs.lightboxEl.classList.add('is-open');
        refs.lightboxImg.src = event.target.dataset.source;        
    }
    
    function removeActiveClass() {
        refs.lightboxEl.classList.remove('is-open');
    }
    function onClose(){
        removeActiveClass();
    }
    function removeImgSrc(){
        refs.lightboxImg.src = '';
    }
    function onPressKey (event){
        console.log(event.key);
        if (event.key === 'Escape'){
            removeActiveClass();   
        }
        if (event.key === 'ArrowLeft') {
            console.log(event.target)
            let eventChildren = event.target.children[0] 
            // console.log(eventChildren.dataset.index);
            index = eventChildren.dataset.index - 1;
            console.log('index', index);
            refs.lightboxImg.src = gallery[index].original; 
            
        }
      
        // if (event.key === 'ArrowRight') {
        //     const eventChildren = event.target.children[0] 
        //     console.log(eventChildren.dataset.index);
        //     index = eventChildren.dataset.index + 1;
        //     console.log(gallery[index]);
        //     refs.lightboxImg.src = gallery[index].original           
        // }
    }
   