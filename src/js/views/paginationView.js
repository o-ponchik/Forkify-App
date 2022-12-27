import View from "./View.js";
import icons from "../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._nextPage(currentPage);
    }

    //last page
    if (currentPage === numPages && numPages > 1) {
      return this._prevPage(currentPage);
    }

    //Other page
    if (currentPage < numPages) {
      return this._nextPage(currentPage) + this._prevPage(currentPage);
    }

    //Page 1, and there are no other pages
    return "";
  }

  _nextPage(currentPage) {
    return `
       <button data-goto='${
         currentPage + 1
       }' class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
      </button> 
        `;
  }

  _prevPage(currentPage) {
    return `
      <button data-goto='${
        currentPage - 1
      }' class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
     </button>
        `;
  }
}

export default new PaginationView();
