import { useSelector } from 'react-redux'
import { Nav,Navbar,Container } from 'react-bootstrap'


const NavMenu = ({ logo,cartProps }) =>
{
	return (
		<Navbar bg="light" variant="light" expand="lg" sticky="top">
			<Container>
				<Navbar.Brand href="/">
					<img alt="logo" src={logo} width="42" />
				</Navbar.Brand>
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
						<Nav.Link href="/artists">Artists</Nav.Link>
						<Nav.Link href="/paintings">Paintings</Nav.Link>
					</Nav>
					<Nav>
						<Nav.Link href="/search"><i className="bi bi-search"/></Nav.Link>
						<Nav.Link href="/cart">
							<i className="bi bi-bag">
								{/*{ cartProps.count ? <span className="cart-count">{ cartProps.count }</span> : null } */}
							</i>
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default NavMenu