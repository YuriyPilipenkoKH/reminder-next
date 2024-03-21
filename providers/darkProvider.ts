
export function getHtmlClasses(htmlElement: HTMLHtmlElement ): string[] {
    
    const classAttribute = htmlElement.getAttribute('class');
    if (classAttribute) {
        return classAttribute.split(/\s+/);
    } else {
        return [];
    }
}