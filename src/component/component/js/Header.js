import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useApi from "../utils/useApi";
import { useState, useEffect } from "react";
import '../css/Header.css'


function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const cartLength = useSelector((state) => state.cart.items);
  const wishLength = useSelector((state) => state.cart.items1);
  const [productsCarousel, productsCards, category, carouselCategory] = useApi();
  const [color,setColor]= useState(" ")
  const [loginname,setLoginname] = useState(null)

  // console.log(color)
  const Navigate=useNavigate()
  useEffect(() => {
    if (searchTerm) {
      const filterResults = productsCards.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filterResults);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, productsCards]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);

  };
  const handleSearchClick = (elm) => () => {
    Navigate(`/products/${elm.id}`);
    console.log(elm.id);
  };

  if(wishLength>0 ){
    setColor("colorC")
  }

  
  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    // console.log(storedUserDetails)
    if (storedUserDetails) {
      setLoginname(storedUserDetails.name);
    }
    if(!storedUserDetails){
      setLoginname(null)
    }
  });

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light Header">
        <NavLink className="navbar-brand text-white" to="/">
          Apna Store
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="searchDiv">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="search"
              className="search"
              placeholder="Search for Products, Brand and More"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {searchTerm && (
              <div className="search-suggestions">
                {searchResults.map((elm) => (
                  <div key={elm.id}  className="search-suggestion">
                  <button onClick={handleSearchClick(elm)}>{elm.title}</button>  
                  <img src= {elm.thumbnail} alt=""/>
                  </div>
                ))}
              </div>
            )}
          </div>
          <ul className="navbar-nav ullist ml-auto">
            <li className="nav-item active">
              {loginname ?<NavLink className="nav-link text-white" to="/orderhistory">
                <i id="icon" style={{marginRight:"16px"}} class="fa-solid fa-user-tie"></i> <button className="loginName">{loginname}</button></NavLink>
:   <NavLink className="nav-link text-white" to="/login"> <i id="icon"  class="fa-solid fa-arrow-right-to-bracket"></i>Login </NavLink>}
            </li>
            <li className="nav-item active">
              <NavLink className="nav-link text-white" to="/wishlist">
                <i id="icon" className="fa-solid fa-heart"></i>
                Wishlist <span className={color}> {wishLength.length > 0 ? wishLength.length : null}</span>
              </NavLink>
            </li>
            <li className="nav-item active">
              <NavLink to="/order" className="nav-link text-white">
                <i id="icon" className="fa-solid fa-cart-shopping"></i>
                Cart <span className={color}> {cartLength.length > 0 ? cartLength.length : null}</span>
              </NavLink>
            </li>
            <li className="nav-item active">
              <NavLink className="nav-link text-white" to="/contact">
                Become a Seller
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;

// import { NavLink, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import useApi from "../utils/useApi";
// import { useState, useEffect } from "react";

// function Header() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const cartLength = useSelector((state) => state.cart.items);
//   const wishLength = useSelector((state) => state.cart.items1);
//   const [productsCarousel, productsCards, category, carouselCategory] = useApi();
//   const [color, setColor] = useState(" ");
//   const Navigate = useNavigate();

//   useEffect(() => {
//     if (searchTerm) {
//       const filterResults = productsCards.filter((item) =>
//         item.title.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setSearchResults(filterResults);
//     } else {
//       setSearchResults([]);
//     }
//   }, [searchTerm, productsCards]);

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleSearchClick = (elm) => () => {
//     Navigate(`/products/${elm.id}`);
//   };

//   useEffect(() => {
//     if (wishLength.length > 0) {
//       setColor("colorC");
//     }
//   }, [wishLength]);

//   return (
//     <>
//       <nav className="navbar navbar-expand-lg navbar-light Header">
//         <NavLink className="navbar-brand text-white" to="/">
//           Apna Store
//         </NavLink>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-toggle="collapse"
//           data-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <div className="searchDiv">
//             <i className="fa-solid fa-magnifying-glass"></i>
//             <input
//               type="search"
//               className="search"
//               placeholder="Search for Products, Brand and More"
//               value={searchTerm}
//               onChange={handleSearchChange}
//             />
//             {searchTerm && (
//               <div className="search-suggestions">
//                 {searchResults.map((elm) => (
//                   <div key={elm.id} className="search-suggestion">
//                     <button onClick={handleSearchClick(elm)}>{elm.title}</button>
//                     <img src={elm.thumbnail} alt="" />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//           <ul className="navbar-nav ullist ml-auto">
//             <li className="nav-item active">
//               <NavLink className="nav-link text-white" to="/login">
//                 <i id="icon" className="fa-solid fa-user-tie"></i>Login
//               </NavLink>
//             </li>
//             <li className="nav-item active">
//               <NavLink className="nav-link text-white" to="/wishlist">
//                 <i id="icon" className="fa-solid fa-heart"></i>
//                 Wishlist <span className={color}>{wishLength.length > 0 ? wishLength.length : null}</span>
//               </NavLink>
//             </li>
//             <li className="nav-item active">
//               <NavLink to="/order" className="nav-link text-white">
//                 <i id="icon" className="fa-solid fa-cart-shopping"></i>
//                 Cart <span className={color}>{cartLength.length > 0 ? cartLength.length : null}</span>
//               </NavLink>
//             </li>
//             <li className="nav-item active">
//               <NavLink className="nav-link text-white" to="/contact">
//                 Become a Seller
//               </NavLink>
//             </li>
//           </ul>
//         </div>
//       </nav>
//     </>
//   );
// }

// export default Header;
