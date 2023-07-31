import {useEffect, useState} from "react";
import { Link, useLocation } from "react-router-dom";
import { ProgressBar } from  'react-loader-spinner';
import PlayerPreview from "./PlayerPreview";
import { getAllUserData } from "../utils/api"; 

const Results = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [winner, setWinner] = useState([]);
    const [loser, setLoser] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const searchFirstPlayer = searchParams.get('playerOneName');
      const searchSecondPlayer = searchParams.get('playerTwoName');

      getAllUserData(searchFirstPlayer, searchSecondPlayer)
        .then(data => {
          if(data.firstPlayer.score > data.secondPlayer.score) {
            setWinner(data.firstPlayer);
            setLoser(data.secondPlayer)
          } else {
            setWinner(data.secondPlayer);
            setLoser(data.firstPlayer);
          }
        })
        .catch(error => (setError(error)))
        .finally( () => setLoading(false))

    }, [location.search])

  return (
      <div>
          {loading ? (
                <div style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}>
                    <ProgressBar
                        height="80"
                        width="80"
                        ariaLabel="progress-bar-loading"
                        wrapperStyle={{}}
                        wrapperClass="progress-bar-wrapper"
                        borderColor = '#F4442E'
                        barColor = '#51E5FF'
                    />
                </div>
            ) : error ? (
            <p>Ooops...</p>
          ) : winner && loser ? (
            <div className="row">
              <div className="winner-div">
              <h1>Winner:</h1>
              <PlayerPreview 
                avatar={winner.profile.avatar_url} 
                userName={winner.profile.login}
              >
                <div className="list">
                <ul className="space-list-item">
                  <li>Name: {winner.profile.name ? winner.profile.name : <span>no information</span>}</li>
                  <li>Location: {winner.profile.location ? winner.profile.location : <span>no information</span>}</li>
                  <li>Company: {winner.profile.company ? winner.profile.company : <span>no information</span>}</li>
                  <li>Followers: {winner.profile.followers ? winner.profile.followers : <span>no information</span>}</li>
                  <li>Following: {winner.profile.following ? winner.profile.following : <span>no information</span>}</li>
                  <li>Public Repositories: {winner.profile.public_repos ? winner.profile.public_repos : <span>no information</span>}</li>
                  <li>Blog: {winner.profile.blog ? <a href={winner.profile.blog} target="_blank">{winner.profile.blog}</a> : <span>no information</span>}</li>
                </ul>
                <h2>Score: {winner.score}</h2>
                </div>               
              </PlayerPreview>
              </div>
              
              <div className="loser-div">
              <h1>Loser:</h1>
              <PlayerPreview 
                avatar={loser.profile.avatar_url} 
                userName={loser.profile.login}
              >
                <div className="list">
                <ul className="space-list-item">
                  <li>Name: {loser.profile.name ? loser.profile.name : <span>no information</span>}</li>
                  <li>Location: {loser.profile.location ? loser.profile.location : <span>no information</span>}</li>
                  <li>Company: {loser.profile.company ? loser.profile.company : <span>no information</span>}</li>
                  <li>Followers: {loser.profile.followers ? loser.profile.followers : <span>no information</span>}</li>
                  <li>Following: {loser.profile.following ? loser.profile.following : <span>no information</span>}</li>
                  <li>Public Repositories: {loser.profile.public_repos ? loser.profile.public_repos : <span>no information</span>}</li>
                  <li>Blog: {loser.profile.blog ? <a href={loser.profile.blog} target="_blank">{loser.profile.blog}</a> : <span>no information</span>}</li>
                </ul>
                <h2>Score: {loser.score}</h2>
                </div>
              </PlayerPreview>
              </div>
            </div>
          ) : null}
          {loading ? (
                <div style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}>
                    <ProgressBar
                        height="80"
                        width="80"
                        ariaLabel="progress-bar-loading"
                        wrapperStyle={{}}
                        wrapperClass="progress-bar-wrapper"
                        borderColor = '#F4442E'
                        barColor = '#51E5FF'
                    />
                </div>
            ) : <Link className="button" to={{
           pathname: '/battle' 
          }}>Reset</Link>}
      </div>
  )
}

export default Results;