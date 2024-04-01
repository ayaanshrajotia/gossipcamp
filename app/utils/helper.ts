function capitalizeFirstLetter(str: string) {
    return str?.charAt(0).toUpperCase() + str?.substr(1);
}

function resetFileInput(inputId: string) {
    const input = document.getElementById(inputId) as HTMLInputElement;
    if (input) {
        input.value = "";
    }
}

export { capitalizeFirstLetter, resetFileInput };
