
import './navbar.css'
const NavBar = () => {

    return (
        <div className='navbar'>
            <a className='link-to-page' href='/'>Monthly </a>
            <a className='link-to-page' href='/weekly'>Weekly</a>
            <a className='link-to-page' href='/todo'>To do List</a>
        </div>
    )
}

export default NavBar;