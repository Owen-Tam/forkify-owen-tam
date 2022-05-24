import View from './View.js';
import previewView from './previewView.js';
class ResultsView extends View {
  _parentElement = document.querySelector('.shopping-list-col');

  _message = '';
  _errorMessage = `No ingredients yet. Find a nice ingredient and add it :)`;
  _window = document.querySelector('.shopping-list-window');
  _overlay = document.querySelector('.overlay');

  _btnOpen = document.querySelector('.nav__btn--shopping-list');
  _btnClose = document.querySelector('.btn--close-modal-shopping-list');
  constructor() {
    super();

    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }
  _generateMarkup() {
    return this._data.map(ing => this._generateMarkupIng(ing)).join('');
  }
  _generateMarkupIng(ing) {
    return `<div class="ingredient" data-description="${
      ing.description
    }"><span class="ing-name" >${ing.description
      .slice(0, 1)
      .toUpperCase()}${ing.description.slice(
      1
    )}:</span> <span class="ing-num">${ing.quantity}</span>${
      ing.unit ? `<span class="ing-unit">kg</span>` : ''
    } <span class="remove__shopping-btn" data-description="${
      ing.description
    }">Delete</span></div> 
    </li>
    </li>`;
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }
  addHandlerRemoveIng(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.remove__shopping-btn');
      if (!btn) return;
      handler(btn.dataset.description);
    });
  }
}

export default new ResultsView();
