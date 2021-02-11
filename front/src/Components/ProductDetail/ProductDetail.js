import React, {useState,useEffect,useContext} from 'react';
import { useRedirect } from '../Hooks/useRedirect';
import ProductContext from '../Contexts/ProductContext';
import './productDetail.css'

import back from '../../imagenes/back.svg';

const ProductDetail = () => {
    const [productDetail, setProductDetail] = useState("");
    const redirect = useRedirect();

    const ProductDetailCxt = useContext(ProductContext);
    console.log("ID de Producto",ProductDetailCxt.id);

    const fetchData = async() =>{
        const url = `http://localhost:8888/productDetails/?id=${ProductDetailCxt.id}`
            fetch (url)
                .then(response => response.json())
                .then(data => {
                    if(data){
                        setProductDetail({
                            "name": data.name,
                            "brand":data.brand,
                            "image":data.image,
                            "price":data.price,
                            "description":data.description,
                            "producer":data.producer,
                            "address":data.address,
                            "cif":data.cif
                        })
                        console.log("productDetail:", data)
                    }
                })
    }

    useEffect(() => {
       fetchData()
        
    }, [])

    return(
        <div id="DetailContainer">

            <div>
            <img id="back" src={back} alt="goBack" onClick={(e)=>(redirect("/"),e)}></img>
            </div>

            <div id="ProductImg">
                <div id="circle2"></div>
                <img id="productimg" src={productDetail.image} alt="producto"></img> 
            </div>

            <div id="ProductInfo">
                <h2>{productDetail.brand}</h2>
                <h3>{productDetail.name}</h3>
                <p>{productDetail.price}</p>
                <p>{productDetail.description}</p>
            </div>

            <div id="Producer">
                <h3>{productDetail.producer}</h3>
                <p>{productDetail.address}</p>
                <p>{productDetail.cif}</p>
            </div>
        </div>
    )

}
export default ProductDetail;