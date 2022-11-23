function searchMovie(){

    $('#movie-list').html('');

    
    $.ajax({
        url:'http://omdbapi.com',
        type: 'get',
        dataType: 'json', //mengambil nilai dlm bentuk json
        data: { // mengirim data dngn 2 parameter 
            'apikey': '4afabd71', 
            's': $('#search-input').val() /*'s' parameter pencarian dengn judul, jquery memanggil  element search input untuk diambil
                                             nilainya  */ 
        },
        success: function(result){ //ketika ajax di kirim & ssek akan menjalankan funtion
          if (result.Response == "True"){

            let movies = result.Search; //variable movie untuk mengambil movie aja/mengambil data 1 1|langsung ke array of objek

            $.each(movies, function(i, data){ // loping /*append berfungsi untuk menambahkan sebuah elemen*/
                $('#movie-list').append(` 
                    <div class="col-md-4">
                        <div class="card mb-3"> 
                            <img src="`+ data.Poster +`" class="card-img-top" >
                            <div class="card-body">
                                <h5 class="card-title">`+ data.Title+`</h5>
                                <h6 class="card-subtitle mb-2 text-muted">`+ data.Year +`</h6>
                                <a href="#" class="card-link see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="`+ data.imdbID +` ">See Details</a>
                            </div>
                        </div>
                    </div>
                `)

            });

            $('#search-input').val('');

          }else{
             $('#movie-list').html('<h1 class="text-center">Movie Not Found!</h1>')/*jquery memanggil elemen movie list & mengambil data html
             dimana isinya movie not found */
          }

        }

    });
}


$('#search-button').on('click', function(){ //
    searchMovie();

});

$('#search-input').on('keyup', function (e){
    if(e.which ===13 ){
        searchMovie();
    }
});


$('#movie-list').on('click','.see-detail', function(){
     
    $.ajax({
        url:'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '4afabd71',
            'i': $(this).data('id')
        },
        success: function(movie){
            if(movie.Response === "True"){

              $('.modal-body').html(`
                  <div class="container-fluid">
                    <div class="row"> 
                        <div class="col-md-4">
                        <img src="`+ movie.Poster +`" class="img-fluid" >
                        </div>
                    
                    <div class="col-md-8">
                        <ul class="list-group">
                            <li class ="list-group-item"><h3>`+ movie.Title +`</h3></li>
                            <li class ="list-group-item">Released : `+ movie.Released +`</li>
                            <li class ="list-group-item">Runtime : `+ movie.Runtime +`</li>
                            <li class ="list-group-item">Genre : `+ movie.Genre +`</li>
                            <li class ="list-group-item">Director : `+ movie.Director +`</li>
                            <li class ="list-group-item">Actors : `+ movie.Actors +`</li>
                            <li class ="list-group-item">Language : `+ movie.Language +`</li>
                            <li class ="list-group-item">Country : `+ movie.Country +`</li>
                            
                        
                        </ul>
                    </div>
                    
                    
                    
                    
                    </div>
                  </div>

              `);
                
            }
        }
    });

});
 
