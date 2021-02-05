// Checking in the local storage for the theme color
if (localStorage.getItem('fm-theme')) {
    updateTheme(localStorage.getItem('fm-theme'));
}

// Theme options click event
fmWrapper.querySelectorAll('.theme-option')
    .forEach(function (option) {
        option.addEventListener('click', function () {
            updateTheme(this.getAttribute('data-theme'));
        });
});

function updateTheme(theme) {

    var themeOption = fmWrapper.querySelector('.theme-option[data-theme=' + theme + ']');

    if (themeOption) {
        // Removing the 'selected' class from the theme options
        fmWrapper.querySelectorAll('.theme-option')
            .forEach(function (item) {
                item.classList.remove('selected');
            });

        themeOption.classList.add('selected');

        // Get all theme classes
        var themeClasses = [];
        fmWrapper.querySelectorAll('.theme-option')
            .forEach(function (item) {
                themeClasses.push(item.getAttribute('data-theme'));
            });

        // removing all other theme classes
        fmWrapper.classList.forEach(function (className) {
            themeClasses.forEach(function (item) {
                fmWrapper.classList.remove(item);
            });
        });

        // add the theme class
        fmWrapper.classList.add(theme);
        localStorage.setItem('fm-theme', theme);
    }
}