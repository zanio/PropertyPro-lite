class Render {

    static renderContainer(containerId, content) {
      const container = document.querySelector(`#${containerId}`);
      container.innerHTML = content;
    }

    static renderContainerClass(containerCls, content) {
      try{
        const container = document.querySelector(`.${containerCls}`);
          container.innerHTML = content;
        
      } catch(err){
        console.log('error displaying the div')
      }
      
      
    }
  
    static injectSingleImage(ImageUrl) {
      try {
        const imageHolder = document.querySelector('.item-image-main');
          const imgElement = `<img class="" src="${ImageUrl}" />`;
          imageHolder.innerHTML = imgElement;
      
      } catch (ex) {
        console.log('the image with id was not found');
      }
    }

    static multiplyDomQuery (cls){
        const allDom = document.querySelectorAll(`.${cls}`)?document.querySelectorAll(`.${cls}`):'error';
        console.log(allDom)
        let actionclasses =[];
        for(let i =0; i < allDom.length; i++){
          actionclasses.push(allDom[i]);
        }
        console.log(actionclasses)
        return actionclasses;
      };
    
  
    static blockNotification(word) {
      try {
        const notificationContainer = document.querySelector('#notification');
        notificationContainer.textContent = word;
  
        notificationContainer.className = 'block';
  
        setTimeout(() => {
          notificationContainer.className = notificationContainer.className.replace(
            'block',
            '',
          );
          notificationContainer.textContent = '';
        }, 3000);
      } catch (ex) {
        console.log('the image with id was not found');
      }
    }
  
    static blockAsyncNotification() {
      try {
        const asyncNotificationContainer = document.querySelector('#async-loading');
        if(asyncNotificationContainer.classList.contains('hide')){
          asyncNotificationContainer.classList.remove('hide');
          asyncNotificationContainer.classList.add('block');
         
        }
        
      } catch (ex) {
        console.log('The image with id was not found');
      }
    }
  
    static hideAsyncNotification() {
      try {
        const asyncNotificationContainer = document.querySelector(
          '#async-loading',
        );
        asyncNotificationContainer.className = 'hide';
        setTimeout(() => {
          asyncNotificationContainer.className = '';
        }, 300);
      } catch (ex) {
        console.log('Error removing async notification');
      }
    }
  
    static blockStickyNotification(
      type = 'normal',
      message = 'no message specified',
    ) {
      try {
        const stickyNotificationContainer = document.querySelector(
          '#slide-notification',
        );
        let spanColor, divBorder;
        switch (type) {
          case 'error':
            spanColor = 'color-red';
            divBorder = 'bd-red';
            break;
          case 'success':
            spanColor = 'color-green';
            divBorder = 'bd-green';
            break;
          default:
            spanColor = 'color-black';
            divBorder = 'bd-black';
        }
        stickyNotificationContainer.innerHTML = `
      <div class= "slide-right mb-2 mt-2 pt-1 pr-1 pb-1 pl-1 note ${divBorder}"><span class=${spanColor}>${message}</span>
        <i id="close" class="far float-right ft-2 fa-times-circle ${spanColor}"></i>
      </div>
        `;
        stickyNotificationContainer.classList.add('block');
  
        const closeBtn = document.querySelector('#close');
  
        closeBtn.addEventListener('click', () => {
          this.hideStickyNotification();
        });
      } catch (ex) {
        console.log(ex);
      }
    }
  
    static hideStickyNotification() {
      try {
        const stickyNotificationContainer = document.querySelector(
          '#slide-notification',
        );
        stickyNotificationContainer.classList.remove('block');
        stickyNotificationContainer.classList.add('hide');
        setTimeout(() => {
          stickyNotificationContainer.classList.remove('hide');
          stickyNotificationContainer.classList.remove('block');
        }, 1200);
      } catch (ex) {
        console.log('Error removing sticky notification');
      }
    }
  
    static pageLoading(loading) {
      try {
        const pageLoadingContainer = document.querySelector('#page-loading');
        if (loading === true) {
          pageLoadingContainer.className = '';
        } else {
          pageLoadingContainer.className = 'hide';
        }
      } catch (ex) {
        console.log('Error removing async notification');
      }
    }
  }
  
  class Helpers {
    static formatMoney(money) {
      let newWord = '';
  
      let prefix = '';
      for (let i = money.length - 1; i >= 0; i--) {
        prefix = `${money.charAt(i)}${prefix}`;
        if (prefix.length === 3) {
          newWord = `,${prefix}${newWord}`;
          prefix = '';
        }
      }
      newWord = `${prefix}${newWord}`;
  
      if (newWord.charAt(0) === ',') {
        newWord = newWord.substring(1, newWord.length);
      }
      return newWord;
    }
  
    static isEmail(email) {
     
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(email.toLowerCase());
    }
  
   
    static capitalizeWords(word) {
      return word.replace(
        /\w\S*/g,
        txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
      );
    }
  
  
    static serialize(obj) {
      const str = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const p in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(p)) {
          str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
        }
      }
      return str.join('&');
    }
  
    static isValidDigits(num) {
      const isNum = /^\d+$/;
      return isNum.test(num);
    }
  
    static logout() {
      localStorage.removeItem('user');
      window.location.replace('home.html');
    }

    static getFirstN(array,startN, endN) {
     let arr = array.slice(startN,endN);
     return arr;
    }

    static iterateItem(array,html) {
      let content;
      const result = array.map((el)=>{ 
        content = html(el);
        return content;
         
    });
    return result.join(' ');
    }

    static loopImage(array) {
      let image = [];
      const result = array.map((el)=>{ 
        image.push(el.image_url)  
    });
    return image
    }

    static insertBackdrop(type='normal'){
      let backdropBg
      switch(type){
        case'async':
        backdropBg = 'backdrop-async'
        case 'normal':
        backdropBg = 'backdrop'
      }
      let backdrop = document.querySelector('body').insertAdjacentHTML('beforeend',`<div  class="${backdropBg} message"></div>`);
      return backdrop;
    }
  
    static removeBackDrop(){
      let backdrop = document.querySelector('.backdrop')
      backdrop.classList.add('hide')
    }
    static async delayedRoute(n = 5000, url) {
      await new Promise((done) => {
        setTimeout(() => {
          window.location.replace(url);
        }, n);
      });
    }
  }
  
  window.addEventListener('scroll', () => {
    const navBar = document.querySelector('.navbar');
    if (pageYOffset > 300) {
      navBar.classList.add('sticky');
    } else {
      navBar.classList.remove('sticky');
    }
  });

  window.addEventListener('load', () => {
    const menuToggle = document.querySelector('.bars');
  
    menuToggle.addEventListener('click', () => {
        document.querySelector('.mobile').style.display = 'block';
        Helpers.insertBackdrop();
        document.querySelector('.backdrop').addEventListener('click',function(){
			this.style.display = 'none';
			document.querySelector('.mobile').style.display = 'none';
			this.parentNode.removeChild(this);
		});
    });
  });
  
  try {
    Render.renderContainer('insertFooter', footer);
  } catch (ex) {
    console.log('footer-container not found');
  }
  