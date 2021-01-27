import React, { useState } from 'react'
import './Profile.css'

const Profile = ({ toggleModal, user, loadUser }) => {
    const [username, setUsername] = useState(user.name)
    const [age, setAge] = useState(user.age)
    const [pet, setPet] = useState(user.pet)    

    const onProfileUpdate = (data) => {
        fetch(`http://localhost:3000/profile/${user.id}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ formInput: data })
        }).then(res => {
            toggleModal()
            loadUser({ ...user, ...data })
        }).catch(console.log)
    }
    return (
        <div className='profile-modal'>
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
                <main className="pa4 black-80 w-80">
                    <img
                        src="http://tachyons.io/img/logo.jpg"
                        className="h3 w3 dib" alt="avatar"
                    />
                    <h1>{username}</h1>
                    <h4>{`Images submitted: ${user.entries}`}</h4>
                    <p>{`Member since: ${new Date(user.joined).toLocaleDateString()}`}</p>
                    <hr />
                    <label className='mt2 fw6' htmlFor='username'>Username:</label>
                    <input
                        className="pa2 ba w-100"
                        placeholder={username}
                        type="text"
                        name="username"
                        id="username"
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <label className='mt2 fw6' htmlFor='age'>Age:</label>
                    <input
                        className="pa2 ba w-100"
                        placeholder={age}
                        type="text"
                        name="age"
                        id="age"
                        onChange={(event) => setAge(event.target.value)}
                    />
                    <label className='mt2 fw6' htmlFor='username'>Pet:</label>
                    <input
                        className="pa2 ba w-100"
                        placeholder={pet}
                        type="text"
                        name="pet"
                        id="pet"
                        onChange={(event) => setPet(event.target.value)}
                    />
                    <div className='mt4' style={{ display: 'flex', justifyContent: 'space-evenly'}}>
                        <button className='b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20' onClick={() => onProfileUpdate({ name: username, age, pet })}>
                            Save
                        </button>
                        <button className='b pa2 grow pointer hover-white w-40 bg-light-grey b--black-20' onClick={toggleModal}>
                            Cancel
                        </button>
                    </div>               
                </main>
                <div className='modal-close' onClick={toggleModal}>
                    &times;
                </div>
            </article>
        </div>
    )
}

export default Profile