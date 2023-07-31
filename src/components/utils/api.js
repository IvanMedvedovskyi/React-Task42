import axios from "axios";


const handleError = (error) => console.log(error)

export const fetchPopularRepos = (language) => {
    const encodeURI = window.encodeURI(`https:/api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)
    return axios.get(encodeURI)
        .then(response => response.data.items)
        .catch(handleError)
}

export const fetchGetRepos = (userName) => {
    const getReposReq = `https://api.github.com/users/${userName}/repos?per_page=100`;
    return axios.get(getReposReq)
        .then(response => response.data)
        .catch(handleError)
}


export const fetchGetProfile = (userName) => {
    const getProfileReq = `https://api.github.com/users/${userName}`
    return axios.get(getProfileReq)
        .then(response => response.data)
        .catch(handleError)
}


export const getAllUserData = (playerOneName, playerTwoName) => {
    const dataPlayerOne = axios.all(
        [fetchGetRepos(playerOneName),
         fetchGetProfile(playerOneName)
        ]);
    const dataPlayerSecond = axios.all(
        [fetchGetRepos(playerTwoName),
        fetchGetProfile(playerTwoName)]
    )

    return axios.all([dataPlayerOne, dataPlayerSecond])
        .then(([firstPlayerData, secondPlayerData]) =>{
            const [reposFirstPlayer, profileFirstPlayer] = firstPlayerData;
            const [reposSecondPlayer, profileSecondPlayer] = secondPlayerData;

            const starsFirstPlayer = reposFirstPlayer.reduce((total, item) => total + item.stargazers_count, 0);
            const starsSecondPlayer = reposSecondPlayer.reduce((total, item) => total + item.stargazers_count, 0);

            const scoreFirstPlayer = starsFirstPlayer + profileFirstPlayer.followers;
            const scoreSecondPlayer = starsSecondPlayer + profileSecondPlayer.followers;


            return {
                firstPlayer: {
                    profile: profileFirstPlayer,
                    repositories: reposFirstPlayer,
                    stars: starsFirstPlayer,
                    followers: profileFirstPlayer.followers,
                    score: scoreFirstPlayer,
                },
                secondPlayer: {
                    profile: profileSecondPlayer,
                    repositories: reposSecondPlayer,
                    stars: starsSecondPlayer,
                    followers: profileSecondPlayer.followers,
                    score: scoreSecondPlayer,
                },
            }
        })
        .catch(handleError)
}