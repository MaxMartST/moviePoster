'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    const adv = document.querySelectorAll('.promo__adv img'),
        poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'),
        addInput = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type="checkbox"]');//поиск по атрибуту

    //2.1) обработка события submit
    addForm.addEventListener('submit', (event) => {
        event.preventDefault();//отмена дефолтного состояния браузера
        let newFilm = addInput.value;//значение - имя фильма
        const favorite = checkbox.checked;//булиновое значение - сделать его любимым
       
        if (newFilm) {
            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }

            if(favorite) {
                console.log("Добавляем любимый фильм");
            }

            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);
    
            //создание нового списка 
            creatMovieList(movieDB.movies, movieList);
        }

        //очистить форму, сбросить
        event.target.reset();
    });

    //1.1)
    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };

    //1.2) 1.3)
    const makeChanges = (content, poterImage) => {
        content.textContent = 'драма';
        poterImage.style.backgroundImage = 'url("img/bg.jpg")';
    };

    //1.4) 1.5)
    const sortArr = (arr) => {
        arr.sort();
    };

    function creatMovieList(films, parent) {
        //очистить список фильмов
        parent.innerHTML = "";

        //2.5) сортировка фильмов
        sortArr(films);
        //добавить новый список
        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${film}
                    <div class="delete"></div>
                </li>
            `;
        });

        //2.3) удалить отмеченный фильм
        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                films.splice(i, 1);

                //рекурсия, обновить нумирацию фильмов
                creatMovieList(films, parent);
            });
        });
    }
  
    deleteAdv(adv);//вызвали функцию для удаления элементов с рекламой
    makeChanges(genre, poster);//переименовали жанр
    creatMovieList(movieDB.movies, movieList);
});