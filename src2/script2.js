document.getElementById('fetchUsersButton').addEventListener('click', fetchUsersData)

function fetchUsersData() {
    const usersUrl = 'https://jsonplaceholder.typicode.com/users'
    const postsUrl = 'https://jsonplaceholder.typicode.com/posts'
    const todosUrl = 'https://jsonplaceholder.typicode.com/todos'

    Promise.all([fetch(usersUrl), fetch(postsUrl), fetch(todosUrl)])
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(([users, posts, todos]) => {
            const usersWithDetails = users.map(user => {
                const userPosts = posts.filter(post => post.userId === user.id)
                    .map(post => ({ title: post.title, body: post.body }));
                const userTodos = todos.filter(todo => todo.userId === user.id)
                    .map(todo => ({ title: todo.title }));

                return {
                    ID: user.id,
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    posts: userPosts,
                    todos: userTodos
                };
            });

            console.log(usersWithDetails)
        })
        .catch(error => console.error('Error fetching data:', error))
}
