class CatFacts extends HTMLElement {
    static get observedAttributes() {
        return ["compact"];
    }

    connectedCallback() {
        const heading = document.createElement("h2");
        heading.textContent = "Cat Facts";

        const fact = document.createElement("p");
        fact.textContent = "Cats cannot taste sweetness.";

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Tell Me Another Fact";

        const status = document.createElement("p");
        status.textContent = "Ready";
        status.setAttribute("role", "status");

        button.addEventListener("click", async () => {
            status.textContent = "Loading...";

            try {
                const response = await fetch("https://catfact.ninja/fact");

                if (!response.ok) {
                    throw new Error("Request failed");
                }

                const data = await response.json();

                if (typeof data?.fact !== "string") {
                    throw new Error("Invalid response");
                }

                fact.textContent = data.fact;
                status.textContent = "Fact loaded.";
            } catch (error) {
                status.textContent = "Could not load fact. Try again.";
            }
        });

        this.appendChild(heading);
        this.appendChild(fact);
        this.appendChild(button);
        this.appendChild(status);
    }

    attributeChangedCallback() {
        const heading = this.querySelector("h2");

        if (heading) {
            heading.hidden = this.hasAttribute("compact");
        }
    }
}

customElements.define("cat-facts", CatFacts);

const toggleButton = document.querySelector("#toggle-compact");
const catFacts = document.querySelector("cat-facts");

try {
    const saved = localStorage.getItem("hw5-cat-facts-mode");
    catFacts.toggleAttribute("compact", saved === "compact");
} catch (error) {
    catFacts.removeAttribute("compact");
}

toggleButton.setAttribute("aria-pressed", catFacts.hasAttribute("compact"));

toggleButton.addEventListener("click", () => {
    const compact = catFacts.toggleAttribute("compact");
    toggleButton.setAttribute("aria-pressed", compact);

    try {
       if (compact) {
    localStorage.setItem("hw5-cat-facts-mode", "compact");
} else {
    localStorage.setItem("hw5-cat-facts-mode", "expanded");
}
    } catch (error) {
        console.error(error);
    }
});