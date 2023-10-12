export const downloadFileJson = (myData: any) => {
    // create file in browser
    const fileName = "my-file";
    const json = JSON.stringify(myData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);

    // create "a" HTLM element with href to file
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
}
export const downloadFileTxt = (myData: any) => {
    // create file in browser
    const fileName = "my-file";
    const json = JSON.stringify(myData, null, 2);
    const blob = new Blob([json], { type: 'text/plain' });
    const href = URL.createObjectURL(blob);

    // create "a" HTLM element with href to file
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".txt";
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
}