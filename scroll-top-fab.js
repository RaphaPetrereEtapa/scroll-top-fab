/*!
 * scroll-top-fab v1.0.0 | MIT License
 * Floating button that appears after scrolling down and scrolls back to the top.
 */
(() => {
  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      :host {
        position: fixed;
        right: var(--scroll-top-fab-offset, 1rem);
        bottom: var(--scroll-top-fab-offset, 1rem);
        z-index: var(--scroll-top-fab-z-index, 1030);
        visibility: hidden;
      }

      :host([visible]) {
        visibility: visible;
      }

      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.375rem 0.75rem;
        border: 1px solid transparent;
        border-radius: var(--scroll-top-fab-radius, 0.375rem);
        background-color: var(--scroll-top-fab-bg, var(--bs-primary, #0d6efd));
        color: var(--scroll-top-fab-color, #fff);
        font: inherit;
        font-size: 1rem;
        line-height: 1.5;
        cursor: pointer;
        transition: background-color 0.15s ease-in-out;
      }

      button:hover {
        background-color: var(
          --scroll-top-fab-hover-bg,
          var(--scroll-top-fab-bg, var(--bs-primary, #0d6efd))
        );
        filter: var(--scroll-top-fab-hover-filter, brightness(0.9));
      }

      button:focus-visible {
        outline: 2px solid var(--scroll-top-fab-bg, var(--bs-primary, #0d6efd));
        outline-offset: 2px;
      }

      svg {
        display: block;
        width: 1em;
        height: 1.5em;
      }
    </style>
    <button type="button" part="button">
      <slot>
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M3 10.5 8 5.5l5 5"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </slot>
    </button>
  `;

  const DEFAULT_THRESHOLD = 400;
  const DEFAULT_LABEL = 'Voltar ao topo';

  class ScrollTopFab extends HTMLElement {
    static get observedAttributes() {
      return ['label', 'threshold'];
    }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' }).append(
        template.content.cloneNode(true),
      );
      this.button = this.shadowRoot.querySelector('button');
      this.button.addEventListener('click', () => this.scrollToTop());
      this.update = this.update.bind(this);
    }

    connectedCallback() {
      this.updateLabel();
      window.addEventListener('scroll', this.update, { passive: true });
      this.update();
    }

    disconnectedCallback() {
      window.removeEventListener('scroll', this.update);
    }

    attributeChangedCallback(name) {
      if (name === 'label') this.updateLabel();
      else this.update();
    }

    get threshold() {
      const value = Number(this.getAttribute('threshold'));
      return this.hasAttribute('threshold') && Number.isFinite(value)
        ? value
        : DEFAULT_THRESHOLD;
    }

    update() {
      this.toggleAttribute('visible', window.scrollY > this.threshold);
    }

    updateLabel() {
      const label = this.getAttribute('label') || DEFAULT_LABEL;
      this.button.setAttribute('aria-label', label);
      this.button.title = label;
    }

    scrollToTop() {
      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  }

  if (!customElements.get('scroll-top-fab')) {
    customElements.define('scroll-top-fab', ScrollTopFab);
  }
})();
