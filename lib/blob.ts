function dataURLtoBlob(dataURL: string): Blob {
    // Convert base64/URLEncoded data component to raw binary data held in a string
    let byteString: string;
    if (dataURL.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURL.split(',')[1]);
    else
        byteString = unescape(dataURL.split(',')[1]);

    // Separate out the mime component
    const mimeString: string = dataURL.split(',')[0].split(':')[1].split(';')[0];

    // Write the bytes of the string to an ArrayBuffer
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    // Write the ArrayBuffer to a blob, and you're done
    const blob = new Blob([ab], { type: mimeString });
    return blob;
}
