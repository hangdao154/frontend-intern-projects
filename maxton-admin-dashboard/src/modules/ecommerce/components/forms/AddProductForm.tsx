import { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, Upload, Input, Radio, Checkbox, notification } from "antd"
import DarkButton from '../../../../components/buttons/DarkButton';
import OutlinedButton from '../../../../components/buttons/OutlinedButton';
import { AddProductSchema, addProductSchema } from '../../../../lib/schema';
import FilledButton from '../../../../components/buttons/FilledButton';
import TagCell from '../../../../components/table/TagCell';
import useProducts from '../../hooks/useProducts';
import { Category, Collection, Size, Vendor } from '../../constants';
import { useNavigate, useParams } from 'react-router-dom';
import { NotificationType } from '../../../../lib/interfaces';

const inventoryTabs = [
    {
        name: "pricing",
        label: "Pricing",
        icon: "sell"
    },
    {
        name: "restock",
        label: "Restock",
        icon: "deployed_code"
    },
    {
        name: "shipping",
        label: "Shipping",
        icon: "local_shipping"
    },
    {
        name: "globalDelivery",
        label: "Global Delivery",
        icon: "globe"
    },
    {
        name: "attributes",
        label: "Attributes",
        icon: "edit_attributes"
    },
    {
        name: "advanced",
        label: "Advanced",
        icon: "shopping_bag"
    },
]

export default function AddProductForm() {
    const { id } = useParams();

    const { createProduct, getProductByID, fetchedData, fetchedMsg, updateProduct } = useProducts();

    const [inventory, setInventory] = useState<string>("pricing");
    const [tag, setTag] = useState<string>();
    const [tagList, setTagList] = useState<string[] | string>([]);
    const navigate = useNavigate();


    const methods = useForm<AddProductSchema>({
        resolver: zodResolver(addProductSchema)
    });

    const { register, reset, resetField, handleSubmit, control, formState: { errors }, watch } = methods;



    const handleSetInventory = (val: string) => {
        setInventory(val);
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Space" && tag && tag.trim()) {
            setTagList(prev => {
                console.log('TAGS:', prev);
                const newTags = [...prev];
                newTags.push(tag.trim());
                return newTags;
            });
            setTag(undefined);
            resetField("tags");
        }
    };

    const onSubmit = (data: AddProductSchema) => {
        console.log('On submit', data);

        // Create new product
        if (!fetchedData) {
            const { tags, image, ...newObj } = data;
            const newData = { tags: tagList, image: data.image[0], ...newObj };
            console.log('Create new product:', newData);
            createProduct(newData);
        }

        // Update a product
        else {
            if (data.image && data.image[0]) {              // If image is changed
                const { tags, image, ...newObj } = data;
                const newData = { tags: tagList, image: data.image[0], ...newObj };
                console.log(`Update product, has image ${fetchedData._id}:`, newData);
                updateProduct(fetchedData._id, newData);
            } else {                                        // If image is not changed
                const { tags, image, ...newObj } = data;
                const newData = { tags: tagList, ...newObj };
                console.log(`Update product, no image ${fetchedData._id}:`, newData);
                updateProduct(fetchedData._id, newData);
            }
        }
    }

    const watchImage = watch('image');
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (!isFirstRender.current && id) {
            getProductByID(id);
        }
        isFirstRender.current = false; // Set after the first render
    }, [])

    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type: NotificationType) => {
        api[type]({
            message: `Error ${fetchedMsg?.code}`,
            description: fetchedMsg?.msg
        });
    };

    useEffect(() => {
        console.log('Fetched data:', fetchedData);
        if (id && fetchedData) {
            setTagList(fetchedData.tags)
            reset({
                title: fetchedData.title || '', // Set title from fetched data
                description: fetchedData.description || '',
                restock: fetchedData.restock || 0,
                tags: fetchedData.tags.join(" "),
                price: fetchedData.price || 0,
                salePrice: fetchedData.salePrice || 0,
                category: fetchedData.category,
                collection: fetchedData.collection,
                vendor: fetchedData.vendor,
                advanced: {
                    productID: fetchedData.productID || 0
                }
            });
        } else {
            setTagList([])
            reset({
                title: '', // Set title from fetched data
                description: '',
                image: '',
                restock: 0,
                tags: '',
                price: 0,
                salePrice: 0,
                category: '',
                collection: '',
                vendor: '',
                advanced: {
                    productID: 0
                }
            });
        }
    }, [id, fetchedData, reset])

    useEffect(() => {
        if (fetchedMsg?.code !== undefined) {
            const codeToString: string = String(fetchedMsg.code);

            switch (codeToString[0]) {
                case "0":
                case "4":
                case "5":
                    openNotificationWithIcon('error');
                    break;
                case "2":
                    openNotificationWithIcon('success');
                    break;
            }
        }
        else if (fetchedMsg?.code && typeof (fetchedMsg?.code) === 'string') {
            openNotificationWithIcon('error');
        }

        // Navigate to login page when access token expired
        if (fetchedMsg?.code === 401) return navigate("/login");
    }, [fetchedMsg])

    return (
        <>
            {contextHolder}
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-[48px] xs:flex flex-col lg:grid grid-cols-3 grid-rows-[1fr 4fr 4fr] gap-[20px]" encType="multipart/form-data">
                    <div className="card-body order-0 col-span-2 row-span-3 h-[fit-content]">
                        <label htmlFor="title">Product Title
                            <input placeholder="Write title here..." className="dark-style" {...register("title")} />
                            {errors.title && (
                                <p style={{ color: 'red', fontWeight: 'normal', fontSize: '16px', marginTop: '10px' }}>
                                    {errors.title?.message}
                                </p>
                            )}
                        </label>

                        <label htmlFor="description">Product Description
                            <textarea placeholder="Write description here..." className="dark-style" {...register("description")} />
                            {errors.description && (
                                <p style={{ color: 'red', fontWeight: 'normal', fontSize: '16px', marginTop: '10px' }}>
                                    {errors.description?.message}
                                </p>
                            )}
                        </label>

                        <label htmlFor="image">Display Images
                            <div className='w-full h-[200px] mt-[16px] border-[2px] border-dashed border-[#0D6EFD] rounded-lg relative hover:bg-[#0D6EFD20]'>
                                {(watchImage && watchImage[0]) || (id && fetchedData?.image) ?
                                    (
                                        <>
                                            <img className='mx-auto mt-[30px] rounded-lg max-h-[100px]' src={(watchImage && watchImage[0] && URL.createObjectURL(watchImage[0])) || (id && fetchedData?.image && fetchedData.image) || ''} />
                                            <p className='mx-auto mt-[20px] max-w-[80%] text-center text-[14px] opacity-[50%] truncate'>{(watchImage && watchImage[0] && watchImage[0].name) || (id && fetchedData?.image && "Image")}</p>
                                        </>
                                    ) :
                                    (
                                        <img className="mx-auto my-[30px]" src="src/assets/images/buttons/upload.png" />
                                    )
                                }
                                <input
                                    id="file-input"
                                    type="file"
                                    style={{ margin: 0, opacity: 0 }}
                                    className='hover:cursor-pointer w-full h-full absolute top-0 left-0' {...register("image")} />
                            </div>

                            {errors.image && (
                                <p onClick={() => console.log(errors.image)} style={{ color: 'red', fontWeight: 'normal', fontSize: '16px', marginTop: '16px' }}>
                                    {String(errors.image.message)}
                                </p>
                            )}
                        </label>

                        <label htmlFor="inventory">Inventory</label>
                        {/* Inventory Tab Buttons */}
                        <div className="inventory flex justify-start gap-[20px]">
                            <div className="btn-group flex-col gap-[0px]">
                                {inventoryTabs.map((tab, index) => (
                                    <DarkButton
                                        errored={errors[`${tab.name}` as keyof AddProductSchema]?.message ? true : false}
                                        key={index}
                                        content={tab.label}
                                        iconL={tab.icon}
                                        onClick={() => handleSetInventory(tab.name)}
                                        selected={inventory === tab.name ? true : false}
                                        otherStyles={'w-full text-left ' + (index === 0 ? "rounded-t-lg" : (index === inventoryTabs.length - 1 ? "rounded-b-lg" : ""))} />
                                ))}
                            </div>

                            {/* Inventory Tab Content */}
                            <div className="inventory-forms w-full">
                                <div className={"pricing flex justify-between gap-[20px]" + (inventory === "pricing" ? "" : " hidden")}>
                                    <label htmlFor="price">Regular Price
                                        <input placeholder="$$$" className="dark-style" {...register("price", {
                                            valueAsNumber: true,
                                        })} />
                                        {errors.price && (
                                            <p style={{ color: 'red', fontWeight: 'normal', fontSize: '16px', marginTop: '10px' }}>
                                                {errors.price?.message}
                                            </p>
                                        )}
                                    </label>
                                    <label htmlFor="salePrice">Sale Price
                                        <input placeholder="$$$" className="dark-style" {...register("salePrice", {
                                            valueAsNumber: true,
                                        })} />
                                        {errors.salePrice && (
                                            <p style={{ color: 'red', fontWeight: 'normal', fontSize: '16px', marginTop: '10px' }}>
                                                {errors.salePrice.message}
                                            </p>
                                        )}
                                    </label>
                                </div>

                                <div className={"restock" + (inventory === "restock" ? "" : " hidden")}>
                                    <label htmlFor="restock" className="mb-[16px]">Add to Stock</label>
                                    <div className={"flex justify-between gap-[20px] mt-[16px]" + (inventory === "restock" ? "" : " hidden")} >
                                        <input type="number" placeholder="Quantity" className="dark-style flex-1 m-0" {...register("restock", {
                                            valueAsNumber: true,
                                        })} />
                                        <OutlinedButton content="Confirm" color="blue" otherStyle='rounded-md' />
                                    </div>
                                    {errors.restock && (
                                        <p style={{ color: 'red', fontWeight: 'normal', fontSize: '16px', marginTop: '10px' }}>
                                            {errors.restock.message}
                                        </p>
                                    )}
                                </div>

                                <div className={"shipping" + (inventory === "shipping" ? "" : " hidden")}>
                                    <label htmlFor="shipping">Shipping Price</label>
                                    <Form.Item layout="vertical" name="shipping">
                                        <Controller name="shipping" control={control} render={({ field }) => (
                                            <>
                                                <Radio.Group className="flex flex-col" {...field}>
                                                    <Radio style={{ fontSize: "16px", color: "white" }} value="Fullfilled by Seller">Fullfilled by Seller
                                                        <p className='ml-[24px] mt-[6px] font-normal'>
                                                            You’ll be responsible for product delivery.<br />
                                                            Any damage or delay during shipping may cost you a Damage fee.
                                                        </p>
                                                    </Radio>
                                                    <Radio style={{ fontSize: "16px", color: "white" }} value="Fullfilled by Admin">Fullfilled by Admin
                                                        <p className='ml-[24px] mt-[6px] font-normal'>
                                                            Your product, Our responsibility.<br />
                                                            For a measly fee, we will handle the delivery process for you.</p>
                                                    </Radio>
                                                </Radio.Group>
                                                {errors.shipping && (
                                                    <p style={{ color: 'red', fontWeight: 'normal', fontSize: '16px', marginTop: '10px' }}>
                                                        {errors.shipping.message}
                                                    </p>
                                                )}
                                            </>
                                        )} />
                                    </Form.Item>
                                </div>
                                <div className={"globalDelivery" + (inventory === "globalDelivery" ? "" : " hidden")}>
                                    <label htmlFor="globalDelivery">Global Delivery</label>
                                    <Form.Item layout="vertical" name="globalDelivery">
                                        <Controller name="globalDelivery" control={control} render={({ field }) => (
                                            <>
                                                <Radio.Group {...field}>
                                                    <Radio style={{ fontSize: "16px", color: "white" }} value="Worldwide delivery">Worldwide delivery
                                                        <p className='ml-[24px] mt-[6px] font-normal'>Only available with Shipping method: <span style={{ color: "#0D6EFD" }}>Fullfilled by Admin</span></p>
                                                    </Radio>
                                                    <Radio style={{ fontSize: "16px", color: "white" }} value="Selected countries">Selected countries
                                                        <input className='dark-style ml-[24px] mt-[6px]' placeholder="Type country's name" />
                                                    </Radio>
                                                    <Radio style={{ fontSize: "16px", color: "white" }} value="Local delivery">Local delivery
                                                        <p className='ml-[24px] mt-[6px] font-normal'>Only available with Shipping method: <span style={{ color: "#0D6EFD" }}>Fullfilled by Admin</span></p>
                                                    </Radio>
                                                </Radio.Group>
                                                {errors.globalDelivery && (
                                                    <p style={{ color: 'red', fontWeight: 'normal', fontSize: '16px', marginTop: '10px' }}>
                                                        {errors.globalDelivery.message}
                                                    </p>
                                                )}
                                            </>
                                        )} />
                                    </Form.Item>
                                </div>
                                <div className={"inventory.attributes" + (inventory === "attributes" ? "" : " hidden")}>
                                    <label htmlFor="inventory.attributes">Attributes</label>
                                    <Form.Item layout="vertical" name="inventory.attributes">
                                        <Controller name="attributes" control={control} render={({ field }) => (
                                            <>
                                                <Checkbox.Group className="flex flex-col gap-[6px]" {...field}>
                                                    <Checkbox style={{ fontSize: "16px", color: "white" }} className="font-normal" value="Fragile Product">Fragile Product</Checkbox>
                                                    <Checkbox style={{ fontSize: "16px", color: "white" }} className="font-normal" value="Biodegradable">Biodegradable</Checkbox>
                                                    <Checkbox style={{ fontSize: "16px", color: "white" }} className="font-normal" value="Frozen Product">Frozen Product </Checkbox>
                                                    <input className='dark-style ml-[24px] mt-0 mb-[6px]  w-[50%]' placeholder="Max allowed temperature" />
                                                    <Checkbox style={{ fontSize: "16px", color: "white" }} className="font-normal" value="Expiry Date of Product">Expiry Date of Product</Checkbox>
                                                    <input className='dark-style ml-[24px] mt-0 mb-[6px]  w-[50%]' placeholder="Max allowed temperature" />
                                                </Checkbox.Group>
                                                {errors.attributes && (
                                                    <p style={{ color: 'red', fontWeight: 'normal', fontSize: '16px', marginTop: '10px' }}>
                                                        {errors.attributes.message}
                                                    </p>
                                                )}
                                            </>

                                        )} />
                                    </Form.Item>
                                </div>
                                <div className={"advanced" + (inventory === "advanced" ? "" : " hidden")}>
                                    <label htmlFor='advanced'>Advanced</label>
                                    <div className="flex justify-between gap-[20px]">
                                        <label htmlFor="advanced.productIDType" style={{ fontSize: "16px", fontWeight: "normal" }}>Product ID Type
                                            <select className="dark-style block rounded-md w-full mt-[6px]" {...register("advanced.productIDType")}>
                                                <option>ISBN</option>
                                                <option>UPC</option>
                                                <option>EAN</option>
                                            </select>
                                            {errors.advanced?.productIDType && (
                                                <p style={{ color: 'red', fontWeight: 'normal', fontSize: '16px', marginTop: '10px' }}>
                                                    {errors.advanced.productIDType.message}
                                                </p>
                                            )}
                                        </label>

                                        <label htmlFor="inventory.productID" style={{ fontSize: "16px", fontWeight: "normal" }}>Product ID
                                            <input className='dark-style mt-[6px]' placeholder='ISBN Number' {...register("advanced.productID", {
                                                valueAsNumber: true,
                                            })} />
                                            {errors.advanced?.productID && (
                                                <p style={{ color: 'red', fontWeight: 'normal', fontSize: '16px', marginTop: '10px' }}>
                                                    {errors.advanced.productID.message}
                                                </p>
                                            )}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=" card-body xs:order-3 lg:order-1 flex flex-wrap gap-[20px] row-span-1">
                        <OutlinedButton color="red" content="Discard" iconL="cancel" otherStyle='flex-1 rounded-md' onClick={() => {
                            reset();
                            setTagList([]);
                        }} />
                        <OutlinedButton color="green" content="Save Draft" iconL="cloud_download" otherStyle='flex-1 rounded-md' />
                        <OutlinedButton color="blue" content="Publish" iconL="send" otherStyle='flex-1 rounded-md' type="submit" />
                    </div>

                    <div className="card-body xs:order-1 lg-order-2 row-span-1">
                        <label htmlFor="organize">Organize</label>

                        <label className="sub-label" htmlFor="category">Category
                            <select
                                className="dark-style w-full rounded-lg mt-[12px]" {...register("category")}>
                                {Object.entries(Category).map(([key, val]) => (
                                    <option key={key}>{val}</option>
                                ))}
                            </select>
                            {errors.category && (
                                <p style={{ color: 'red', fontWeight: 'normal', fontSize: '16px', marginTop: '10px' }}>
                                    {errors.category?.message}
                                </p>
                            )}
                        </label>
                        <label className="sub-label" htmlFor="collection">Collection
                            <select
                                className="dark-style w-full rounded-lg mt-[12px]" {...register("collection")}>
                                {Object.entries(Collection).map(([key, val]) => (
                                    <option key={key}>{val}</option>
                                ))}
                            </select>
                            {errors.collection && (
                                <p style={{ color: 'red', fontWeight: 'normal', fontSize: '16px', marginTop: '10px' }}>
                                    {errors.collection.message}
                                </p>
                            )}
                        </label>
                        <label className="sub-label" htmlFor="tags">Tags
                            <input
                                placeholder="Tags"
                                className="dark-style"
                                onInput={(e) => setTag((e.target as HTMLInputElement).value)}
                                onKeyDown={handleKeyPress}
                                {...register("tags")} />
                            <TagCell otherStyle="mt-[20px]" data={tagList} />
                            {errors.tags && (
                                <p style={{ color: 'red', fontWeight: 'normal', fontSize: '16px', marginTop: '10px' }}>
                                    {errors.tags.message}
                                </p>
                            )}
                        </label>
                        <label className="sub-label" htmlFor="vendor">Vendor
                            <select
                                className="dark-style w-full rounded-lg mt-[12px]" {...register("vendor")}>
                                {Object.entries(Vendor).map(([key, val]) => (
                                    <option key={key}>{val}</option>
                                ))}
                            </select>
                            {errors.vendor && (
                                <p style={{ color: 'red', fontWeight: 'normal', fontSize: '16px', marginTop: '10px' }}>
                                    {errors.vendor.message}
                                </p>
                            )}
                        </label>
                    </div>

                    <div className="card-body xs:order-2 lg-order-3 row-span-1">
                        <label htmlFor="varians">Variants</label>

                        <label className="sub-label" htmlFor="variants.brand">Brand
                            <input placeholder="Brand" className="dark-style" {...register("variants.brand")} />
                            {errors.variants?.brand && (
                                <p style={{ color: 'red', fontWeight: 'normal', fontSize: '16px', marginTop: '10px' }}>
                                    {errors.variants.brand.message}
                                </p>
                            )}
                        </label>
                        <label className="sub-label" htmlFor="variants.sku">SKU
                            <input placeholder="SKU" className="dark-style" {...register("variants.sku")} />
                            {errors.variants?.sku && (
                                <p style={{ color: 'red', fontWeight: 'normal', fontSize: '16px', marginTop: '10px' }}>
                                    {errors.variants.sku.message}
                                </p>
                            )}
                        </label>
                        <label className="sub-label" htmlFor="variants.color">Color
                            <input placeholder="Color" className="dark-style" {...register("variants.color")} />
                            {errors.variants?.color && (
                                <p style={{ color: 'red', fontWeight: 'normal', fontSize: '16px', marginTop: '10px' }}>
                                    {errors.variants.color.message}
                                </p>
                            )}
                        </label>
                        <label className="sub-label" htmlFor="size">Size
                            <select className="dark-style w-full rounded-lg mt-[12px]" {...register("size")}>
                                {Object.entries(Size).map(([key, val]) => (
                                    <option key={key}>{val}</option>
                                ))}
                            </select>
                            {errors.size && (
                                <p style={{ color: 'red', fontWeight: 'normal', fontSize: '16px', marginTop: '10px' }}>
                                    {errors.size.message}
                                </p>
                            )}
                        </label>
                        <FilledButton content="Add Variant" active={true} otherStyle='bg-[#0D6EFD] w-full' />
                    </div>
                </form>
            </FormProvider>
        </>
    )
}
