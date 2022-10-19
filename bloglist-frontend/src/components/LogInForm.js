import React from "react"

const LoginFrom = ({username, password, setUsername, setPassword, handleLogin}) => {
  return (
    <>
    <h2>Log in to application</h2>
    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', gap: '5px'}}>
      <label htmlFor='username'>username</label>
      <input 
        name='username'
        value={username}
        onChange={ ({ target}) => setUsername(target.value)}/>
      <label htmlFor='password'>password</label>
      <input 
        type='password'
        name='password'
        value={password}
        onChange={ ({ target}) => setPassword(target.value)}/>
      <button>login</button>
    </form>
  </>
  )
}

export default LoginFrom