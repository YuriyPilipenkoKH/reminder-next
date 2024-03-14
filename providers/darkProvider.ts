

export function addDarkToHtml(): void {
    const htmlElement = document.querySelector('html');
    if (htmlElement) {
        htmlElement.classList.add('dark');
    }
}
export function remDarkFromHtml(): void {
    const htmlElement = document.querySelector('html');
       if (htmlElement) {
        htmlElement.classList.remove('dark');
    }
}

export function getHtmlClasses(htmlElement: HTMLHtmlElement ): string[] {
    
    const classAttribute = htmlElement.getAttribute('class');
    if (classAttribute) {
        return classAttribute.split(/\s+/);
    } else {
        return [];
    }
}