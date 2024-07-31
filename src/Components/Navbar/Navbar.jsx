
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className='navbar'>
            <Link className='link-to-page' to='/'>Monthly</Link>
            <Link className='link-to-page' to='/weekly'>Weekly</Link>
            <Link className='link-to-page' to='/todo'>To do List</Link>
            <Link className='link-to-page' to='/finance'>Finance</Link>
        </div>
    );
}

export default NavBar;