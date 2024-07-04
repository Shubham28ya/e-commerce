
import { BrowserRouter ,Routes,Route} from 'react-router-dom';
// import './component/component/css/Header.css'
// import './component/component/css/Main.css'
import Form from "./component/component/js/Form";
import Maincontent from './component/component/js/Maincontent';
import ProductDetails from './component/component/js/ProductDetails';
import Header from './component/component/js/Header';
import { Provider } from 'react-redux';
import Store from './component/component/utils/Redux/Store';
import Order from './component/component/js/Order';
import Carousel from './component/component/js/Carousel';
import Wishlist from './component/component/js/Wishlist';
import OrderHistory from './component/component/js/OrderHistory';
import Address from './component/component/js/Address';
import Payment from './component/component/js/Payment';

function App() {
  return (
  <>
  <Provider store={Store} >
  <BrowserRouter>
  <Header/>
  <Routes>
  <Route path="/" element={<Maincontent/>}/>
  <Route path="/login" element={<Form/>}/>
  <Route path="/products/:id" element={<ProductDetails/>}/>
  <Route path="/order" element={<Order/>}/>
  <Route path="/carousel/:category" element={<Carousel/>}/>
  <Route path="/wishlist" element={<Wishlist/>}/>
  <Route path="/orderhistory" element={<OrderHistory/>}/>
  <Route path="/address" element={<Address/>}/>
  <Route path="/payment" element={<Payment/>}/>


  </Routes>
    </BrowserRouter>
  </Provider>
  </>
  );
}

export default App;
