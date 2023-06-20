// Google Books API isteği için kullanacağınız anahtar
var apiKey = "AIzaSyBdICvMlTcPDigLMgJhVlWMyVrWabZa4l4";

// Kitap arama fonksiyonu
function searchBooks() {
  var searchQuery = document.getElementById('searchInput').value;
  var url = "https://www.googleapis.com/books/v1/volumes?q=" + encodeURIComponent(searchQuery) + "&key=" + apiKey;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      var bookResults = document.getElementById('bookResults');
      bookResults.innerHTML = "";

      if (data.items) {
        for (var i = 0; i < data.items.length; i++) {
          var book = data.items[i].volumeInfo;
          var bookDiv = document.createElement('div');
          bookDiv.classList.add('book');

          if (book.imageLinks && book.imageLinks.thumbnail) {
            var bookImage = document.createElement('img');
            bookImage.src = book.imageLinks.thumbnail;
            bookDiv.appendChild(bookImage);
          }

          var bookTitle = document.createElement('h3');
          bookTitle.textContent = book.title;
          bookDiv.appendChild(bookTitle);

          if (book.authors) {
            var bookAuthors = document.createElement('p');
            bookAuthors.textContent = "Yazar(lar): " + book.authors.join(", ");
            bookDiv.appendChild(bookAuthors);
          }

          if (book.description) {
            var bookDescription = document.createElement('p');
            bookDescription.textContent = book.description;
            bookDiv.appendChild(bookDescription);
          }

          // Kitaba tıklandığında yönlendirme işlemi
          bookDiv.addEventListener('click', function() {
            var bookId = data.items[i].id;
            window.location.href = "https://books.google.com/books?id=" + bookId;
          });

          bookResults.appendChild(bookDiv);
        }
      } else {
        var noResults = document.createElement('p');
        noResults.textContent = "Kitap bulunamadı.";
        bookResults.appendChild(noResults);
      }
    })
    .catch(error => {
      console.log("Hata: " + error);
    });
}

// Kitap arama düğmesine tıklandığında arama yap
var searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', searchBooks);
