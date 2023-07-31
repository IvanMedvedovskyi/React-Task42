import PlayerInput from "./PlayerInput";
import {useCallback, useState} from "react";
import PlayerPreview from "./PlayerPreview";
import {Link} from "react-router-dom";

const Battle = () => {
    const [players, setPlayers] = useState({
        playerOneImage: null,
        playerTwoImage: null,
        playerOneName: '',
        playerTwoName: '',
    })

    const SubmitHandler = useCallback((id, userName) => {
        setPlayers((prevState) => ({
            ...prevState,
            [`${id}Name`]: userName,
            [`${id}Image`]: `https://github.com/${userName}.png?size200`
        }))
    }, [players])

    const ResetHandler = (id) => {
        setPlayers((prevState) => ({
            ...prevState,
            [`${id}Name`]: '',
            [`${id}Image`]: null
        }))
    }

    return (
        <div>
            <div className='row'>
                {players.playerOneImage ?
                    <PlayerPreview
                        avatar={players.playerOneImage}
                        userName={players.playerOneName}
                    >
                        <button
                            className='reset'
                            onClick={() => ResetHandler('playerOne')}
                        >Reset
                        </button>
                    </PlayerPreview> :
                    <PlayerInput
                    id='playerOne'
                    label='Player 1'
                    onSubmit={SubmitHandler}
                />}
                {players.playerTwoImage ?
                    <PlayerPreview
                        avatar={players.playerTwoImage}
                        userName={players.playerTwoName}
                    >
                        <button
                            className='reset'
                            onClick={() => ResetHandler('playerTwo')}
                        >Reset
                        </button>
                    </PlayerPreview> :
                    <PlayerInput
                    id='playerTwo'
                    label='Player 2'
                    onSubmit={SubmitHandler}
                />}
            </div>
            {players.playerOneImage && players.playerTwoImage ?
                <Link className='button' to={{
                    pathname: 'results',
                    search: `?playerOneName=${players.playerOneName}&playerTwoName=${players.playerTwoName}`
                }}>Battle</Link> : null
            }
        </div>
    );
}

export default Battle;