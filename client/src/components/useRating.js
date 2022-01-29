function useRating(rating){
    let stars = ''

    for(let i = 1; i <= rating; i++){
        stars += '⭐'
    }

    for(let i = rating; i < 10; i++){
        stars += ' ✰'
    }

    return stars
}

export default useRating
