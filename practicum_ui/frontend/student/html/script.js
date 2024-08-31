const baseRoute = 'http://localhost:6001'
let token
let user 


// document.addEventListener('DOMContentLoaded', function () {
//     const hamburger = document.getElementById('hamburger');
//     const navBar = document.getElementById('nav-bar');
//     const closeBtn = document.getElementById('close-btn');

//     hamburger.addEventListener('click', function () {
//         navBar.classList.toggle('active');
//     });

//     closeBtn.addEventListener('click', function () {
//         navBar.classList.remove('active');
//     });
// });



const register = async (event) => {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const programme = document.getElementById('programme').value;
    const referenceNumber = document.getElementById('referenceNumber').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const year = document.getElementById('year').value;
    const indexNumber = document.getElementById('indexNumber').value;

    try {
        const response = await fetch(`${baseRoute}/student/create-account`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                name,
                programme,
                referenceNumber,
                year,
                indexNumber
            })
        });
        if (response.status === 201) {
            
            try {
                const res = await response.json();
                console.log('Response:', res);
                Cookies.set('token', JSON.stringify(res.token), { expires: 7 });
                Cookies.set('data', JSON.stringify(res.studentData), { expires: 7 });
                const id = JSON.parse(Cookies.get('data'))._id;
                // alert(id);
                
            } catch (error) {
                console.log(error)
            } finally {
              window.location.href = 'index.html';
            }
        } else {
            alert('Registration unsuccessful');
        }
    } catch (error) {
        console.error('Error during registration:', error);
        alert('Registration unsuccessful');
    }
};

const login = async (event) => {
   
    event.preventDefault()
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
        try {
            // console.log(email, password)
             const response = await fetch (`${baseRoute}/student/login`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        // const data = await response.data.user; // Parse response body as JSON
        // console.log(data);
        if (response.status === 201) {
            
            
            try {
                const res = await response.json();
                console.log('Response:', res);
                Cookies.set('token', JSON.stringify(res.token), { expires: 7 });
                Cookies.set('data', JSON.stringify(res.studentData), { expires: 7 });
                // Cookies.set('data', res, { expires: 7 });
                const id = res.studentData._id;
                // alert(id);
                
            } catch (error) {
                console.log(error)
            } finally {
              window.location.href = 'index.html';
            }
        } else {
            alert('Login unsuccessful');
        }

    } catch (error) {
        console.log(error)
    }
}




