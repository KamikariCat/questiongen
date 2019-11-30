export function copyText (text) {
    if (!text.length) return;
    const INPUT_FOR_COPY = document.createElement("INPUT");
    INPUT_FOR_COPY.type = "text";
    INPUT_FOR_COPY.value = text;
    INPUT_FOR_COPY.style.position = 'absolute';
    INPUT_FOR_COPY.style.left = '-99999px';
    INPUT_FOR_COPY.style.opacity = '0';
    document.body.appendChild(INPUT_FOR_COPY);
    INPUT_FOR_COPY.select();
    document.execCommand('copy');
    INPUT_FOR_COPY.remove();
}