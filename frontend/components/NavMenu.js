import Link from 'next/link'
import { useSelector } from 'react-redux'
import { Nav,Navbar,Container } from 'react-bootstrap'


const NavMenu = ({ logo }) =>
{
	const cart = useSelector((state) => state.cart)

	return (
		<Navbar bg="light" variant="light" expand="lg" sticky="top">
			<Container>
				<Link href="/" passHref>
					<Navbar.Brand >
						<img alt="logo" src={logo} width="36" />
					</Navbar.Brand>
				</Link>
				<Navbar.Toggle
					aria-controls="responsive-navbar-nav"
					children={(
						<>
							<span className="icon-bar top-bar"></span>
							<span className="icon-bar middle-bar"></span>
							<span className="icon-bar bottom-bar"></span>
						</>
					)}
				/>
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						<Link href="/artists" passHref><Nav.Link>Artists</Nav.Link></Link>
						<Link href="/paintings"passHref><Nav.Link>Paintings</Nav.Link></Link>
					</Nav>
					<Nav>
						<Link href="/search" passHref><Nav.Link><i className="bi bi-search"/></Nav.Link></Link>
						<Link href="/cart" passHref>
							<Nav.Link>
								<i className="bi bi-bag">
								{ cart.length ? <span className="cart-count">{ cart.length }</span> : null } 
								</i>
							</Nav.Link>
						</Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default NavMenu