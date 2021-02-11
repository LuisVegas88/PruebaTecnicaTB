import React, {useState,useEffect,useContext} from 'react';
import {Pagination} from "@material-ui/lab";
import {useRedirect} from '../Hooks/useRedirect';
import usePagination from "../Hooks/Pagination";
import './productList.css'
import ProductContext from '../Contexts/ProductContext'

const ProductList = ()=> {
    const ProductDetailCxt = useContext(ProductContext)
    const redirect = useRedirect();

    const [productList, setProductList] = useState([])
    let [page, setPage] = useState(1);
    const Per_Page = 10;

    const count = Math.ceil(productList.length / Per_Page);
    const _DATA = usePagination(productList, Per_Page);
    const handleChange = (e,p) => {
        setPage(p);
        _DATA.jump(p);
    };

    const fetchData = async(setProductList) => {
        const url = `http://localhost:8888/products`
           
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log("datos:",data)
                        setProductList(data); 
                })
                .catch((error) => {
                    
                });
    }
    
  
    const PintarProducto = ({name,brand,image,price,relevance, onClick}) =>{
        if(relevance === 1){
            return (
            <div id="Container" onClick={onClick}>
                <div>
                     <div id="circle"></div>
                    <img id="imgP" src={image} alt={`${name}`}  />
                </div>
                <div>
                    <h2 id="brand">{brand}</h2>
                    <p id="nameP">{name}</p>
                    <p id="price">{price}</p>
                    <p id="relevance">{relevance}</p>
                    <div id="stars">
                        <i className="fa fa-star checked"></i>
                        <i className="fa fa-star unchecked"></i>
                        <i className="fa fa-star unchecked"></i>
                    </div>
                </div>
            </div>
            )
        }
        else if(relevance === 2){
            return (
                <div id="Container" onClick={onClick}>
                    <div>
                        <div id="circle"></div>
                        <img id="imgP" src={image} alt={`${name}`}  />
                    </div>
                <div>
                        <h2 id="brand">{brand}</h2>
                        <p id="nameP">{name}</p>
                        <p id="price">{price}</p>
                        <div id="stars">
                                <i className="fa fa-star checked"></i>
                                <i className="fa fa-star checked"></i>
                                <i className="fa fa-star unchecked"></i>
                        </div>
                </div>
                </div>
            )
        }
        else if (relevance === 3){
            return(
                <div id="Container" onClick={onClick}>
                    <div>
                        <div id="circle"></div>
                        <img id="imgP" src={image} alt={`${name}`}  />
                    </div>
                    <div>
                        <h2 id="brand">{brand}</h2>
                        <p id="nameP">{name}</p>
                        <p id="price">{price}</p>
                        <div id="stars">
                            <i className="fa fa-star checked"></i>
                            <i className="fa fa-star checked"></i>
                            <i className="fa fa-star checked"></i>
                        </div>
                    </div>
                </div>
            )
        }
    }

    const parseData = (productList) =>{
        return _DATA.currentData().map(product => {
            const {id,name,brand,image,price,relevance}=product
            return (
                <div key={id} id={id} >
                    <PintarProducto 
                     onClick={(e)=>{
                        console.log("entra")
                        redirect("/productDetail",e)
                        ProductDetailCxt.setProductId({ 
                            ...ProductDetailCxt,id
                        });    
                    }}
                    brand={brand} name={name} price={price} image={image} relevance={relevance}/>

                </div >
            )
        })
    }
    
    useEffect(() => {
        fetchData(setProductList);
    }, [])

    console.log("product",productList)
    return (
        <>
            {parseData(productList)}
            <Pagination
                count={count}
                size="large"
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={handleChange}
            />
        </>
    )
}

export default ProductList;

