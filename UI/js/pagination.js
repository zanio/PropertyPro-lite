/* eslint-disable camelcase, no-undef, prefer-destructuring, no-console,
consistent-return,no-restricted-globals,no-unused-vars, func-names,no-param-reassign ,
 no-plusplus  */

const prevButton = document.querySelector('#button_prev');
const nextButton = document.querySelector('#button_next');
const clickPageNumber = document.querySelectorAll('.clickPageNumber');

class Pagination {
	constructor(data, html) {
		this.current_page = 1;
		this.records_per_page = 1;
		this.data = data;
		this.init = this.caller;
		this.html = html;
	}

	caller() {
		this.changePage(1);
		this.pageNumbers();
		this.clickPage();
		this.addEventListeners();
	}

	changePage(page) {
		const { data, html, records_per_page } = this;
		const listingTable = document.querySelector('.listingTable');
		if (page < 1) {
			page = 1;
		}
		if (page > (this.numPages() - 1)) {
			page = this.numPages();
		}

		listingTable.innerHTML = '';

		for (let i = (page - 1) * records_per_page; i < (page * records_per_page)
         && i < data.length; i++) {
			listingTable.innerHTML += html(data[i]);
		}
	}


	prevPage() {
		let { current_page } = this;
		if (current_page > 1) {
			current_page--;
			this.changePage(current_page);
		}
	}

	clickPage() {
		let { current_page } = this;
		document.addEventListener('click', (e) => {
			if (e.target.nodeName === 'SPAN' && e.target.classList.contains('clickPageNumber')) {
				current_page = e.target.textContent;
				this.changePage(current_page);
			}
		});
	}


	addEventListeners() {
		nextButton.addEventListener('click', () => {
			this.nextPage();
		});
		prevButton.addEventListener('click', () => {
			this.prevPage();
		});
	}

	numPages() {
		const { data, records_per_page } = this;
		return Math.ceil(data.length / records_per_page);
	}

	pageNumbers() {
		const pageNumber = document.querySelector('#page_number');
		pageNumber.innerHTML = '';
		for (let i = 1; i < this.numPages() + 1; i += 1) {
			pageNumber.innerHTML += `<span class='clickPageNumber'>${i}</span>`;
		}
	}

	nextPage() {
		let { current_page } = this;

		if (current_page < this.numPages()) {
			current_page++;
			console.log(current_page);
			this.changePage(current_page);
		}
	}
}
