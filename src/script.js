document.getElementById('fetchButton').addEventListener('click', fetchPosts)

function fetchPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(posts => {
            const modifiedPosts = posts.map(post => {
                if (post.id % 2 === 0) {
                    return {
                        ...post,
                        title: post.title.toUpperCase()
                    };
                }
                return post
            });

            console.log(modifiedPosts)
        })
        .catch(error => console.error('Error fetching posts:', error))
}
