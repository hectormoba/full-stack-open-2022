import React from 'react'

const LoginFrom = ({ username, password, setUsername, setPassword, handleLogin }) => {
  return (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', gap: '5px' }}>
        <label style={{ display: 'flex', justifyContent: 'space-around' }}>
          username
          <input
            value={username}
            onChange={ ({ target }) => setUsername(target.value)}
          />
        </label>
        <label style={{ display: 'flex', justifyContent: 'space-around' }}>
          password
          <input
            type='password'
            value={password}
            onChange={ ({ target }) => setPassword(target.value)}
          />
        </label>
        <button>login</button>
      </form>
    </>
  )
}

export default LoginFrom