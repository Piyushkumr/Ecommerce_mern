import React, { Fragment, useEffect, useState } from 'react'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import DescriptionIcon from '@mui/icons-material/Description'
import StorageIcon from '@mui/icons-material/Storage'
import SpellcheckIcon from '@mui/icons-material/Spellcheck'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { clearErrors, getProductDetails, updateProduct } from '../../actions/productAction'
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants'

const UpdateProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { loading, error: updateError, isUpdated } = useSelector((state) => state.product);
    const { error, product } = useSelector((state) => state.productDetails);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
        "Electronics",
    ];

    useEffect(() => {
        if (product && product._id !== id) {
            dispatch(getProductDetails(id));
        } else {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.stock);
            setOldImages(product.images);
        }
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if(updateError){
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            toast.success("Product Updated Successfully");
            navigate("/admin/products");
            dispatch({ type: UPDATE_PRODUCT_RESET });
        }
    }, [dispatch, error, isUpdated, navigate, id, updateError, product]);

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();

        // const myForm = new FormData();

        // myForm.set("name", name);
        // myForm.set("price", price);
        // myForm.set("description", description);
        // myForm.set("category", category);
        // myForm.set("Stock", Stock);

        // images.forEach((image) => {
        //     myForm.append("images", image);
        // });

        // dispatch(createProduct(myForm));

        const productData = {
            name,
            price,
            description,
            category,
            stock,
            images,
        };
        dispatch(updateProduct(id, productData));
    };

    const updateProductImageChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    return (
        <Fragment>
            <MetaData title="Create Product" />
            <div className='dashboard'>
                <Sidebar />
                <div className='newProductContainer'>
                    <form className='createProductForm' encType='multipart/form-data' onSubmit={updateProductSubmitHandler}>
                        <h1>Update Product</h1>
                        <div>
                            <SpellcheckIcon />
                            <input type='text'
                                placeholder='Product Name'
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <AttachMoneyIcon />
                            <input type='number'
                                placeholder='Price'
                                value={price}
                                required
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div>
                            <DescriptionIcon />
                            <textarea placeholder='Product Desctiption'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>
                        <div>
                            <AccountTreeIcon />
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Choose Category</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <StorageIcon />
                            <input type='number'
                                placeholder='Stock'
                                value={stock}
                                required
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>
                        <div id='createProductFormFile'>
                            <input type='file'
                                name='avatar'
                                accept='image/*'
                                onChange={updateProductImageChange}
                                multiple
                            />
                        </div>
                        <div id='createProductFormImage'>
                            {oldImages && oldImages.map((image, index) => (
                                <img key={index} src={image.url} alt='Old Product Preview' />
                            ))}
                        </div>
                        <div id='createProductFormImage'>
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt='Product Preview' />
                            ))}
                        </div>
                        <Button id='createProductBtn'
                            type='submit'
                            disabled={loading ? true : false}
                        >
                            Update
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdateProduct;