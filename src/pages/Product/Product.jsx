import styles from "./Product.module.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useLoaderData} from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../redux/cartReducer";
import {API_URL} from '../../config'
const Product = () => {
  const product = useLoaderData();
  console.log(product)
  const dispatch = useDispatch();

  return (
    <div className={styles.product}>
      <>
        <div className={styles.left}>
          <div className={styles.mainImg}>
            <img src={product?.image?.secure_url} alt="" />
          </div>
        </div>
        <div className={styles.right}>
          <h1>{product?.name}</h1>
          <span className={styles.price}>${product?.price}</span>
          <p>{product?.description}</p>

          <button
            className={styles.add}
            onClick={() =>
              dispatch(
                addItemToCart({
                  _id: product?._id,
                  name: product?.name,
                  desc: product?.description,
                  price: +product?.price,
                  img: product?.image?.secure_url,
                })
              )
            }
          >
            <AddShoppingCartIcon /> ADD TO CART
          </button>
        </div>
      </>
    </div>
  );
};

export default Product;

export async function loader({ request, params }) {
  const prodId = params.id;
  
  // ИСПОЛЬЗУЕМ apiUrl ВМЕСТО import.meta.env
  const response = await fetch(
    `${API_URL}/product/${prodId}`
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch product with id: ${prodId}`);
  } else {
    const resData = await response.json();
    return resData.product;
  }
}