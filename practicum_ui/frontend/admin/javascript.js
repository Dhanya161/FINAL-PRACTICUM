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
    
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    

    try {
        const response = await fetch(`${baseRoute}/admin/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                
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
              window.location.href = 'dashboard.html';
            }
        } else {
            alert('Registration unsuccessful');
        }
    } catch (error) {
        console.error('Error during registration:', error);
        alert('Registration unsuccessful');
    }
};


// const register = async (event) => {
//     event.preventDefault();

    
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
    
//     try {
//         const response = await fetch(`${baseRoute}/admin/register`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 password,
//                 email,
//             })
//         });
//         if (response.status === 201) {
            
//             try {
//                 const res = await response.json();
//                 console.log('Response:', res);
//                 Cookies.set('token', JSON.stringify(res.token), { expires: 7 });
//                 Cookies.set('data', JSON.stringify(res.studentData), { expires: 7 });
//                 const id = JSON.parse(Cookies.get('data'))._id;
//                 alert(id);
                
//             } catch (error) {
//                 console.log(error)
//             } finally {
//               window.location.href = 'signin.html';
//             }
//         } else {
//             alert('Registration unsuccessful');
//         }
//     } catch (error) {
//         console.error('Error during registration:', error);
//         alert('Registration unsuccessful');
//     }
// };

const login = async (event) => {
    
    event.preventDefault()
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
        try {
            console.log(email, password)
             const response = await fetch (`${baseRoute}/admin/login`, {
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
        if (response.status === 200) {
            try {
                const res = await response.json();
                console.log('Response:', res);
                Cookies.set('token', JSON.stringify(res.token), { expires: 7 });
               
                
            } catch (error) {
                console.log(error)
            } finally {
              window.location.href = 'dashboard.html';
            }
        } else {
            alert('Login unsuccessful');
        }

    } catch (error) {
        console.log(error)
    }
}

