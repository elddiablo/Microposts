class UI {
    // UI.post

    constructor() {
        this.posts = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.forState = 'add';
    }

    showPosts(posts) {
        let output = '';
        
        posts.forEach(post => {
            output += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h4 class="card-title">
                            ${post.title}
                        </h4>
                        <p class="card-text">
                            ${post.body}
                        </p>
                        <a href="#" class="edit card-link" data-id="${post.id}">
                        <i class="fas fa-edit"></i>
                        </a>
                        <a href="#" class="delete card-link" data-id="${post.id}">
                        <i class="fas fa-times"></i>
                        </a>
                    </div>
                </div>   
            `;
        });

        this.posts.innerHTML = output;
    }

    showAlert(message, className){
        this.clearAlert();
        //create our div
            const div = document.createElement('div');
            div.className = className;
            div.appendChild(document.createTextNode(message));
            // get the parent
            const container = document.querySelector('.postsContainer');
            // get posts
            const posts = document.querySelector('#posts');
        // insert an alert
            container.insertBefore(div, posts);

        // Timeout
        setTimeout(() => {
            this.clearAlert();
        }, 3000);
    }

    clearAlert() {
        const currentAlert = document.querySelector('.alert');

        if(currentAlert) {
            currentAlert.remove();
        }
    }

    clearFields() {
        this.titleInput.value = '';
        this.bodyInput.value = '';
    }

    // fill form to edit
    fillForm(data) {
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;
        this.idInput.value = data.id;

        this.changeFormState('edit');
    }

    // change the state of the form
    changeFormState(type) {
        if(type === 'edit'){
            this.postSubmit.textContent = 'Update post';
            this.postSubmit.className = 'btn-warning btn post-submit btn-block';

            // create cancel button
                const button = document.createElement('button');
            // setting the classes
                button.className = 'btn btn-light btn-block post-cancel';
            // append text to it
                button.appendChild(document.createTextNode('Cancel edit'));
            // get the Parent
                const cardForm = document.querySelector('.card-form');
            // get the element to insert before
                const formEnd = document.querySelector('.form-end');
            // insert the cancel button
                cardForm.insertBefore(button, formEnd);

        } else {
            this.postSubmit.textContent = 'Post it';
            this.postSubmit.className = 'btn-primary btn post-submit btn-block';

            if(document.querySelector('.post-cancel')) {
                document.querySelector('.post-cancel').remove();
            }
            this.clearIdInput();
            this.clearFields();
        }
    }
    
    clearIdInput() {
        this.idInput.value = '';
    }

}


export const ui = new UI();