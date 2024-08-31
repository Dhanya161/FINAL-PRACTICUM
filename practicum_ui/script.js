const hamburger = document.getElementById('text-overlay1');

hamburger = document.querySelector(".hamburger");

    hamburger.onclick = function() {
        navBar = document.querySelector(".nav-bar");
        navBar.classList.toggle("activated");
        
    }

function toggleNav(){
    hamburger.classList.toggle('change');
}

text-overlay1.addEventListener('click', toggleNav);