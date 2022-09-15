export default class Range extends HTMLElement {
    static get observedAttributes() {
        return ["color"];
    }
    connectedCallback() {
        this.innerHTML = `
            <div class="overlay"></div>
            <div class="thumb"></div>
        `;
        this.style.width = "400px";
        this.style.height = "10px";
        this.style.display = "block";
        this.style.position = "relative";
        this.style.borderRadius = "10px"
        // this.style.overflow = "hidden";
        const tb = this.querySelector(".thumb");
        const ol = this.querySelector(".overlay");
        ol.style.backgroundColor = this.getAttribute("color");
        ol.style.height = "100%";
        ol.style.borderRadius = "10px";
        tb.style.height = "10px";
        tb.style.width = "10px";
        tb.style.borderRadius = "50%";
        tb.style.borderWidth = "2px";
        tb.style.borderStyle = "solid";
        tb.style.borderColor = "silver";
        tb.style.backgroundColor = "white";
        tb.style.position = "absolute";
        tb.style.top = "-2px";
        tb.style.left = "calc((100% - 14px) / 2)";
        tb.style.zIndex = 10;
        this.isDragging = false;
        this.addEventListener("mousemove", this.handler);
        this.addEventListener("mousedown", this.handler);
        this.addEventListener("mouseup", this.handler);
    }
    handler(e) {
        switch(e.type) {
            case "mousemove":
                if (this.isDragging) {
                    this.update(e.clientX);
                }
                break;
            case "mouseup":
                this.isDragging = false;
                break;
            case "mousedown":
                this.isDragging = true;
                this.update(e.clientX);
                break;
        }
        // this.update(e.clientX);
    }
    update(cursor) {
        this.rect = this.getBoundingClientRect();
        let x = cursor - this.rect.left;
        if (x < 0) {
            x = 0;
        } else if (x > this.rect.width) {
            x = this.rect.width;
        }
        const tb = this.querySelector(".thumb");
        tb.style.left = x - tb.offsetWidth / 2 + "px";
    }
}
