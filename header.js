const title = document.title;

class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="header">
        <div class="left-section">
          <a href="/index.html" class="homeButton">
            <img src="/icons/home.png">
            <div class="tooltip">Home</div>
          </a>
          <h2 class="title">${title}</h2>
        </div>
      </div> `;
  }
}

customElements.define('site-header', Header);