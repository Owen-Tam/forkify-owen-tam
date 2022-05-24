import View from './View.js';
import icons from 'url:../../img/icons.svg';
class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = Number(btn.dataset.goto);
      console.log(goToPage);

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);
    // Page 1, and there are other pages

    if (curPage === 1 && numPages > 1) {
      return ` ${this._generateMarkupPageDisplay()}
      ${this._generateMarkupButton('next')}`;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return `${this._generateMarkupButton(
        'prev'
      )} ${this._generateMarkupPageDisplay()}`;
    }
    // Other page
    if (curPage < numPages && this._data.page > 1) {
      return `${this._generateMarkupButton('prev')}
      ${this._generateMarkupPageDisplay()}
                ${this._generateMarkupButton('next')}`;
    }

    // Page 1. and there are NO other pages
    return this._generateMarkupPageDisplay();
  }
  _generateMarkupButton(side) {
    const curPage = this._data.page;
    let calc, direction;
    calc = side === 'prev' ? curPage - 1 : curPage + 1;
    direction = side === 'prev' ? 'left' : 'right';
    return `<button data-goto= "${calc}" class="btn--inline pagination__btn--${side}" >
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-${direction}"></use>
                </svg>
                <span>Page ${calc}</span>
            </button>`;
  }
  _generateMarkupPageDisplay() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    return `<h5 class="pagintation__page-display">Page ${curPage}/${numPages}</h5>`;
  }
}

export default new paginationView();
