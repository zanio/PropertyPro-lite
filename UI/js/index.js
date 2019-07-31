/* eslint-disable camelcase, no-undef, prefer-destructuring, no-console,
consistent-return,no-restricted-globals,no-unused-vars, no-shadow, no-useless-escape,func-names,
no-unused-expressions,valid-typeof  */
class Render {
	static renderContainer(containerId, content) {
		const container = document.querySelector(`#${containerId}`);
		container.innerHTML = content;
	}

	static renderContainerClass(containerCls, content) {
		try {
			const container = document.querySelector(`.${containerCls}`);
			container.innerHTML = content;
		} catch (err) {
			console.log('error displaying the div');
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

	static multiplyDomQuery(cls) {
		const allDom = document.querySelectorAll(`.${cls}`) ? document.querySelectorAll(`.${cls}`) : 'error';
		console.log(allDom);
		const actionclasses = [];
		for (let i = 0; i < allDom.length; i += 1) {
			actionclasses.push(allDom[i]);
		}
		console.log(actionclasses);
		return actionclasses;
	}


	static blockNotification(word) {
		try {
			const notificationContainer = document.querySelector('#notification');
			notificationContainer.innerHTML = `<p class="slide-right inline-block
         color-red bd-red mb-1 text-center font-weight
         pl-1 pr-1 pt-1 pb-1">${word}</p>`;

			notificationContainer.className = 'block';

			setTimeout(() => {
				notificationContainer.className = notificationContainer.className.replace(
					'block',
					'',
				);
				notificationContainer.innerHTML = '';
			}, 4000);
		} catch (ex) {
			console.log('the id of notification was not found');
		}
	}

	static blockAsyncNotification() {
		try {
			const asyncNotificationContainer = document.querySelector('#async-loading');
			if (asyncNotificationContainer.classList.contains('hide')) {
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
			let spanColor; let
				divBorder;
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
		for (let i = money.length - 1; i >= 0; i -= 1) {
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

	static float(amount) {
		const regex = /^[+-]?\d+(\.\d+)?$/;
		return regex.test(amount);
	}

	static phoneNumber(no) {
		const regex = no.length === 11;
		return regex;
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

	static removelocalStorage(item, page) {
		localStorage.removeItem(`${item}`);
		page ? window.location.replace(`${page}.html`) : null;
	}

	static getFirstN(array, startN, endN) {
		const arr = array.slice(startN, endN);
		return arr;
	}

	static iterateItem(array, html) {
		let content;
		const result = array.map((el) => {
			content = html(el);
			return content;
		});
		return result.join(' ');
	}

	static loopImage(array) {
		const image = [];
		const result = array.map((el) => {
			image.push(el.image_url);
			return image;
		});
		return image;
	}

	static insertBackdrop(type = 'normal') {
		let backdropBg;
		switch (type) {
		case 'async':
			backdropBg = 'backdrop-async';
			break;
		default:
			backdropBg = 'backdrop';
		}
		document.querySelector('body').insertAdjacentHTML('beforeend', `<div  class="${backdropBg} message"></div>`);
	}

	static removeElement(ele) {
		const elem = document.querySelector(`.${ele}`);
		return elem.parentNode.removeChild(elem);
	}

	static removeBackDrop() {
		const backdrop = 'backdrop';
		return this.removeElement(backdrop);
	}

	static async delayedRoute(n = 5000, url) {
		await new Promise((done) => {
			setTimeout(() => {
				window.location.replace(url);
			}, n);
		});
	}
}

let pageHeight = 0;

(function () {
	function findHighestNode(nodesList) {
		for (let i = nodesList.length - 1; i >= 0; i -= 1) {
			if (nodesList[i].scrollHeight && nodesList[i].clientHeight) {
				const elHeight = Math.max(nodesList[i].scrollHeight, nodesList[i].clientHeight);
				pageHeight = Math.max(elHeight, pageHeight);
			}
			if (nodesList[i].childNodes.length) findHighestNode(nodesList[i].childNodes);
		}
	}

	findHighestNode(document.documentElement.childNodes);
}());

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
		document.querySelector('.backdrop').addEventListener('click', function () {
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
