import Footer from "../Footer";
import Header from "../Header";

const Layout=({children}) => <>
   <div className='ui header'>
						<Header />
					</div>

					<main className='ui content-body'>
						{children}
					</main>
					<div className='ui footer'>
						<Footer />
					</div>
</>;
export default Layout