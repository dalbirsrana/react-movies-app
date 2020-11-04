const Media = props => {
    return (        
        Array.isArray(props.mediaList) && props.mediaList.map( (media, index) => (
            <div key={index} className="show-container">
                
                <div className="show-poster">
                    <img src={"http://image.tmdb.org/t/p/w185" + media.poster_path} alt="poster" />
                </div>

                <div className="show-details">
                    <h4>{media.original_title}</h4>

                    <div>Release Date: {media.release_date} | Popularity: { media.popularity }</div>
                    
                    <p>{ media.overview }</p>
                </div>
            </div>
        ))
    )
}

export default Media