import {memo, useState} from "react";

const PlayerInput = memo(({id, label, onSubmit}) => {
  const [userName, setUserName] = useState('');

  const SubmitHandler = (event) => {
    event.preventDefault()
      onSubmit(id, userName)
  }

  return (
      <form className='column' onSubmit={SubmitHandler}>
          <label className='header' htmlFor="userName">{label}</label>
          <input
              type="text"
              id='userName'
              placeholder='GitHub UserName'
              autoComplete='off'
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
          />
          <button
              style={{cursor: "pointer"}}
              type='submit'
              className='button'
              disabled={!userName.length}
          >Submit
          </button>
      </form>
  )
})

export default PlayerInput;