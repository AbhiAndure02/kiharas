import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";


const DataPage = () => {
    const { slug } = useParams(); // Destructure the slug parameter
    const [registerData, setRegisterData] = useState(null); // State to store the product data
    const [loading, setLoading] = useState(true); // State to handle loading state
    const [error, setError] = useState(null); // State to handle errors
    const [openModal, setOpenModal] = useState(false);

//hello

    useEffect(() => {
        const getRegiData = async () => {
            try {
                console.log(`Fetching product with slug: ${slug}`);
                const res = await axios.get(`/api/getregister?slug=${slug}`);
                console.log('Response data:', res.data);

                // Assuming your API returns a single item array for the specific slug
                if (res.data.registerData && res.data.registerData.length > 0) {
                    // Check if the slug in the response matches the requested slug
                    const filteredData = res.data.registerData.find(item => item.slug === slug);
                    if (filteredData) {
                        setRegisterData(filteredData); // Store the correct entry
                    } else {
                        setError('No products found for this slug');
                    }
                } else {
                    setError('No products found for this slug');
                }
            } catch (error) {
                console.error('Error fetching the product:', error);
                setError('Failed to fetch product details');
            } finally {
                setLoading(false);
            }
        };
        getRegiData();
    }, [slug]);

    if (loading) {
        return <p>Loading...</p>; // Show loading indicator while data is being fetched
    }

    const handlePurchaseSubmit = async(e) =>{
        e.preventDefault();

    }
    return (
        <div className='w-full h-screen flex justify-center bg-[#1974A6]'>
            {error && <p>{error}</p>} {/* Show error message if any */}
            {registerData ? ( // Check if registerData is not null
                <div className='w-[70%] mt-16 p-6 rounded-md text-md font-sans opacity-95 h-fit shadow-lg shadow-blue-400 bg-white'>
                    <div className='flex flex-wrap gap-10'>
                        <p>Name :{registerData.name}</p>
                        <p>Number: {registerData.number}</p>
                        <p>Vehicle Number: {registerData.rNumber}</p>
                        <p>Vehicle Name: {registerData.vName}</p>
                        <p>Bank Name : {registerData.bank}</p>
                        <p>Loan Amount : {registerData.lAmount}</p>


                        <p>Loan Type: {registerData.lType}</p>

                        {
                            registerData.lType === 'Purchase' ? (
                                <>
                                    <p>RTO Charges : {registerData.prtoCharges}</p>
                                    <p>RTO Agent : {registerData.prtoAgent}</p>
                                    <p>Kiharas : {registerData.pkiharas}</p>
                                    <p>Customer Pay : {registerData.pcustomerPay}</p>
                                    <p>RTO Hold : {registerData.prHold}</p>
                                    <p>NOC Hold : {registerData.pnoc}</p>
                                    <p>Prve Bank : {registerData.ppBank}</p>
                                    <p>Net Pay To : {registerData.pnpt}</p>
                                    <p>FC Amount : {registerData.pfc}</p>
 



                                    <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)} >
                                        <Modal.Header />
                                        <Modal.Body>
                                            <div className='space-y-6'>
                                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Update Purchase</h3>

                                            <form onSubmit={handlePurchaseSubmit}>
                                                <div className='flex flex-wrap gap-10'>
                                                    <div className='flex flex-col'>
                                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                            RTO Charges 
                                                        </label>
                                                        <input className='w-32' type="text" />
                                                    </div>
                                                    <div className='flex flex-col'>
                                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                            RTO Charges 
                                                        </label>
                                                        <input className='w-32' type="text" />
                                                    </div>
                                                    <div className='flex flex-col'>
                                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                            RTO Charges 
                                                        </label>
                                                        <input className='w-32' type="text" />
                                                    </div>
                                                    <div className='flex flex-col'>
                                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                            RTO Charges 
                                                        </label>
                                                        <input className='w-32' type="text" />
                                                    </div>
                                                    <div className='flex flex-col'>
                                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                            RTO Charges 
                                                        </label>
                                                        <input className='w-32' type="text" />
                                                    </div>
                                                    <div className='flex flex-col'>
                                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                            RTO Charges 
                                                        </label>
                                                        <input className='w-32' type="text" />
                                                    </div>

                                                    </div>
                                                
                                                <div className='flex justify-between'>
                                                <button onClick={ ()=>setOpenModal(false)} className='bg-red-700 text-white font-bold mt-2 px-4 py-2 rounded-md'>cancel</button>
                                                <button className='bg-black text-white font-bold mt-2 px-4 py-2 rounded-md'  type='submit'>Update</button>

                                                </div>
                                            </form>


                                            </div>

                                        </Modal.Body>
                                    </Modal>



                                </>
                            ) :
                                null
                        }


                        {
                            registerData.lType === 'BT Top Up' ? (
                                <>
                                    <p>RTO Charges: {registerData.brtoCharges2}</p>
                                    <p>RTO Agent : {registerData.brAgent}</p>
                                    <p>Kiharas : {registerData.bkiharas2}</p>
                                    <p>Customer Pay: {registerData.bcustomerPay2}</p>
                                    <p>RTO Hold: {registerData.brHold2}</p>
                                    <p>Other Amount: {registerData.boAmount}</p>
                                    <p>Prve Bank: {registerData.bpBank1}</p>
                                    <p>FC Amount:{registerData.bfc2}</p>



                                    <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)} >
                                        <Modal.Header />
                                        BT TO UP
                                        <Modal.Body>
                                            hello this is BT TOP Up

                                        </Modal.Body>
                                    </Modal>
                                </>

                            ) :
                                null
                        }
                        {
                            registerData.lType === 'New Car' ? (
                                <>
                                    <p>Show Room Name: {registerData.sname}</p>
                                    <p>Car Details : {registerData.newCarD}</p>


                                    <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)} >
                                        <Modal.Header />
                                        new car
                                        <Modal.Body>
                                            hello this is new car

                                        </Modal.Body>
                                    </Modal>

                                </>

                            ) :
                                null
                        }

                        {
                            registerData.lType === 'Refinace' ? (
                                <>
                                    <p>RTO Charges: {registerData.rrtoCharges1}</p>
                                    <p>NOC : {registerData.rnoc1}</p>
                                    <p>Customer pay: {registerData.rcustomerPay1}</p>
                                    <p>FC Amount:{registerData.rfc1}</p>
                                    <p>Prve Bank: {registerData.rpBank1}</p>
                                    <p>RTO Hold: {registerData.rrHold1}</p>
                                    <p>Kiharas: {registerData.rkiharas1}</p>


                                    <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)} >
                                        <Modal.Header />
                                        Refinace
                                        <Modal.Body>
                                            hello this is Refinace

                                        </Modal.Body>
                                    </Modal>


                                </>
                            ) :
                                null
                        }








                        
                    </div>
                    <div className='w-full flex justify-center items-center'>
                        <button onClick={() => setOpenModal(true)} className='mt-10 text-xl bg-black px-5 py-2 rounded-md text-white'>Update</button>
                    </div>


                </div>
            ) : (
                <p>No data found</p>
            )}
        </div>
    );
}

export default DataPage;
