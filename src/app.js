const form = document.querySelector('.search-form');
const template = document.querySelector('#template');
const container = document.querySelector('.container');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const response = await fetch('/.netlify/functions/unsplash-search', {
    method: 'POST',
    body: JSON.stringify({
      query: formData.get('query'),
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));

  let i = 0;

  response.results.forEach((post) => {
    const clone = template.content.cloneNode(true);
    const postUser = clone.querySelector('.post__user');
    const postDesc = clone.querySelector('.post__desc');
    const postImg = clone.querySelector('.post__img');

    i++;

    if (i < 11) {
      let postDescCheck = post.description;

      if (postDescCheck !== null) {
        if (postDescCheck.length > 100) {
          const String = postDescCheck.substr(0, 99);
          postDescCheck = `${String}...`;
        }
      }

      postUser.innerText = post.user.name;
      postDesc.innerText = postDescCheck;
      postImg.src = post.urls.small;

      container.appendChild(clone);
    }
  });

  /*
  some sample code
    const dataObj = response.results[0];
    const postImg = clone.querySelector('.post__img');
    postImg.src = dataObj.urls.small;
    postImg.alt = dataObj.alt_description;
  */

  /*
    Loop through the results[] array. For each result, create a clone of the
    template and append it to the DOM element with the .container class.
  */

  /*
    Add an attribution statement below the image using the
    postUser element and the photographer's name from dataObj
   */

  /*
    Check the description of the post. If it's bot bull and less than 100 characters,
    add the description from dataObj to the post. If it's more than 100 characters,
    add the first 100 characters of the description from dataObj to the post followed by
    an ellipsis (...)
  */
});
