/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-undef */
window.addEventListener('load', ()=>{
    
	const bars = document.querySelector('.bars');

	const btnarr = (btn)=>{
		const updatedom = document.querySelectorAll(btn);
		let actionclasses =[];
		for(let i =0; i < updatedom.length; i++){
			actionclasses.push(updatedom[i]);
		}
		return actionclasses;
	};

	const updateOrder = (id)=>{
		document.querySelector(id).addEventListener('click', ()=>{
			location.href='dashboard.html';
		});
		return; 
	};



	const userDp = document.querySelector('.user-setting');

	const removeDomElement = (cls)=>{
		const elem = document.querySelector(cls);
		return  elem.parentNode.removeChild(elem);
	};



	function barss(){
    
		document.querySelector('.mobile').style.display = 'block';
		document.querySelector('body')
			.insertAdjacentHTML('beforeend','<div class="backdrop"></div>');

		document.querySelector('.backdrop').addEventListener('click',function(){
			this.style.display = 'none';
			document.querySelector('.mobile').style.display = 'none';
			this.parentNode.removeChild(this);
		});
		return;
	}



	document.querySelector('body').addEventListener('click',(e)=>{
		const id = e.target.id;
		const classList = e.target.classList.value;
		if(classList === 'bars'){
			barss();
		}
   
		if(id === 'next-1' ){
			document.querySelector('.inactive-circle').classList.remove('inactive-circle');
			removeDomElement('.form-bg');
			const formURL = './form/form-2.html';
			loadPage(formURL , '.insertForm',function(){
				location.hash = 'example';
			});
			return;
		}

		if(id === 'next-2' ){
			if(id === 'cir-1'){
				const formURL = './form/form-1.html';
				removeDomElement('.form-bg');
				loadPage(formURL , '.insertForm');
				return;
			}

			document.querySelector('.inactive-circle').classList.remove('inactive-circle');
			removeDomElement('.form-bg');
			const formURL = './form/feedback.html';
			loadPage(formURL , '.insertForm',function(){
				location.hash = 'example';
			});
			return;
		}

		if(id === 'update-1' ){
       
			document.querySelector('.inactive-circle').classList.remove('inactive-circle');
			removeDomElement('.form-bg');
			const formURL = './form/update/form-2.html';
			loadPage(formURL , '.insertUpdate');

        
		}
		if(id === 'update-2' ){
			document.querySelector('.inactive-circle').classList.remove('inactive-circle');
			removeDomElement('.form-bg');
			const formURL = './form/update/feedback.html';
			loadPage(formURL , '.insertUpdate');
			return;
  
		}


	}); 


	btnarr('.delete') !== null ?
		btnarr('.delete').map(el=>{
			el.addEventListener('click',()=>{
				const modalURL = './modal/modal.html';
				getPageContent(modalURL)
					.then(res=>res.text())
					.then(res=> document.querySelector('body').insertAdjacentHTML('beforeend',res))
					.then(()=>{
						if(document.querySelector('#modal')){
							updateOrder('#modal');
						}
					})
            
					.catch(err=>{console.log(err);});
        
			}); 
		})
		: null;

	btnarr('.mark-advert') !== null ?
		btnarr('.mark-advert').map(el=>{
			el.addEventListener('click',()=>{
				const modalURL = './modal/modal-update.html';
				getPageContent(modalURL)
					.then(res=>res.text())
					.then(res=> document.querySelector('body').insertAdjacentHTML('beforeend',res))
					.then(()=>{
						if(document.querySelector('#modal-update')){
							updateOrder('#modal-update');
						}
					})
            
					.catch(err=>{console.log(err);});
        
			}); 
		})
		: null;

	document.querySelector('.user-dp') !== null ?
		document.querySelector('body').addEventListener('click',(e)=>{
			if(e.target.classList.value === 'user-dp'){
				document.querySelector('.user-setting').style.cssText = 'display:block !important';
			}
			else{
				document.querySelector('.user-setting').style.cssText = 'display:none !important';
			}
    
		})
		: null;

});

