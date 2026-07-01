document.addEventListener("DOMContentLoaded", () => {

    initCopyButtons();
    initBackToTop();
    initReadingProgress();

});

/* ============================================================
   Copy code
   ============================================================ */

function initCopyButtons() {

    document.querySelectorAll("pre").forEach((pre) => {

        const code = pre.querySelector("code");
        if (!code) return;

        const button = document.createElement("button");

        button.className = "copy-button";
        button.type = "button";
        button.title = "Copy code";
        button.textContent = "⧉";

        button.addEventListener("click", async () => {

            try {

                await navigator.clipboard.writeText(code.innerText);

                button.textContent = "✓";

                setTimeout(() => {
                    button.textContent = "⧉";
                }, 1200);

            } catch {

                button.textContent = "×";

                setTimeout(() => {
                    button.textContent = "⧉";
                }, 1200);

            }

        });

        pre.appendChild(button);

    });

}

/* ============================================================
   Back to top
   ============================================================ */

function initBackToTop() {

    const button = document.createElement("button");

    button.id = "backToTop";
    button.type = "button";
    button.title = "Back to top";
    button.innerHTML = "↑";

    document.body.appendChild(button);

    window.addEventListener("scroll", () => {

        if (window.scrollY > 350)
            button.classList.add("visible");
        else
            button.classList.remove("visible");

    });

    button.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}

/* ============================================================
   Reading progress
   ============================================================ */

function initReadingProgress() {

    const bar = document.createElement("div");

    bar.id = "reading-progress";

    document.body.appendChild(bar);

    const update = () => {

        const scrollTop = window.scrollY;

        const height =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress = Math.min(
            100,
            Math.max(0, (scrollTop / height) * 100)
        );

        bar.style.width = progress + "%";

    };

    window.addEventListener("scroll", update);

    window.addEventListener("resize", update);

    update();

}