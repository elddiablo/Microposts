import { http } from './http';
import { ui } from './ui';

// Get posts on dOM Load
document.addEventListener('DOMContentLoaded', getPosts);


// Listen for add postings
document.querySelector('.post-submit')
    .addEventListener('click', submitPost);

// Listen for Delete   
document.querySelector('#posts')
    .addEventListener('click', deletePost);

// Listen for Edit State
document.querySelector('#posts')
    .addEventListener('click', enableEdit);

// listen for cancel
document.querySelector('.card-form')
    .addEventListener('click', cancelEdit);

// (change state to edit)
function enableEdit(e) {
    if(e.target.parentElement.classList.contains('edit')) {
        const id = e.target.parentElement.dataset.id;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const body = e.target.parentElement.previousElementSibling.textContent;

        const data = {
            id,
            title,
            body
        }

        // Fill form with current post
        ui.fillForm(data);
    }
    e.preventDefault();
}

// Cancel edit state
function cancelEdit(e) {
    if(e.target.classList.contains('post-cancel')) {
        ui.changeFormState('add');
    }

    e.preventDefault();
}

// Delete Post
function deletePost(e) {
    if(e.target.parentElement.classList.contains('delete')){
        const id = e.target.parentElement.dataset.id;
        if(confirm('Are you sure?')) {
            http.delete(`http://localhost:3000/posts/${id}`)
                .then(data => {
                    ui.showAlert('Post removed!', 'alert alert-success');
                    getPosts();
                }).catch(err => {console.log(err)});
            
        }
    }
    e.preventDefault();
}

// Get post and display them
function getPosts() {
    http.get('http://localhost:3000/posts')
        .then(data => ui.showPosts(data))
            .catch(err => console.log(err));
}

// Add post and display them
function submitPost() {
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    const id = document.querySelector('#id').value;

    const data = {
        title: title,
        body: body
    }   
    
    // check for the inputs 
        if(title === '' || body === '') {
            showAlert('Please add the fields first', 'alert alert-danger');
        } else {
            
            // check for ID
            if(id === ''){
                // create post
                http.post("http://localhost:3000/posts", data)
                .then(data => {
                    ui.showAlert('Post Addded!', 'alert alert-success');
                    ui.clearFields();
                    getPosts();
                })
                .catch(err => console.log(err));
            } else {
                // update post
                http.put(`http://localhost:3000/posts/${id}`, data)
                .then(data => {
                    ui.showAlert('Post Updated!', 'alert alert-success');
                    ui.changeFormState('add');
                    getPosts();
                })
                .catch(err => console.log(err));
            }

            
        
            
        }
}

