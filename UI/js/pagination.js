var prevButton = document.querySelector('#button_prev');
var nextButton = document.querySelector('#button_next');
var clickPageNumber = document.querySelectorAll('.clickPageNumber');
var Pagination = (function () {
    function Pagination(data, html) {
        this.current_page = 1;
        this.records_per_page = 2;
        this.data = data;
        this.init = this.caller;
        this.html = html;
    }
    Pagination.prototype.caller = function () {
        this.changePage(1);
        this.pageNumbers();
        this.clickPage();
        this.addEventListeners();
        this.activeClass();
    };
    Pagination.prototype.activeClass = function () {
        var pageNumber = document.querySelector('#page_number');
        var current_page = this.current_page;
        for (var i = 0; i < pageNumber.textContent.length; i += 1) {
            pageNumber.childNodes[i].classList.remove('active-navigation');
            if (this.current_page == pageNumber.childNodes[i].innerHTML) {
                pageNumber.childNodes[i].classList.add('active-navigation');
            }
        }
    };
    Pagination.prototype.changePage = function (page) {
        var _a = this, data = _a.data, html = _a.html, records_per_page = _a.records_per_page;
        var listingTable = document.querySelector('#listingTable');
        if (page < 1) {
            page = 1;
        }
        if (page > (this.numPages() - 1)) {
            page = this.numPages();
        }
        listingTable.innerHTML = '';
        for (var i = (page - 1) * records_per_page; i < (page * records_per_page)
            && i < data.length; i++) {
            listingTable.innerHTML += data[i];
        }
        this.activeClass();
    };
    Pagination.prototype.prevPage = function () {
        if (this.current_page > 1) {
            this.current_page--;
            this.changePage(this.current_page);
        }
    };
    Pagination.prototype.clickPage = function () {
        var _this = this;
        document.addEventListener('click', function (e) {
            if (e.target.nodeName === 'SPAN' && e.target.classList.contains('clickPageNumber')) {
                _this.current_page = e.target.textContent;
                _this.changePage(_this.current_page);
            }
        });
    };
    Pagination.prototype.addEventListeners = function () {
        var _this = this;
        nextButton.addEventListener('click', function () {
            _this.nextPage();
        });
        prevButton.addEventListener('click', function () {
            _this.prevPage();
        });
    };
    Pagination.prototype.numPages = function () {
        var _a = this, data = _a.data, records_per_page = _a.records_per_page;
        var pageCounts = Math.ceil(data.length / records_per_page);
        return pageCounts;
    };
    Pagination.prototype.pageNumbers = function () {
        var pageNumber = document.querySelector('#page_number');
        pageNumber.innerHTML = '';
        for (var i = 1; i < this.numPages() + 1; i += 1) {
            pageNumber.innerHTML += "<span class='clickPageNumber'>" + i + "</span>";
        }
    };
    Pagination.prototype.nextPage = function () {
        if (this.current_page < this.numPages()) {
            this.current_page++;
            this.changePage(this.current_page);
        }
    };
    return Pagination;
}());
//# sourceMappingURL=pagination.js.map