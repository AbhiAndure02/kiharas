import axios from 'axios';
import { Label, Modal, Select, Button } from 'flowbite-react';
import React, { useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import banks from './bankName';

function Register() {
    const { currentUser } = useSelector((state) => state.user);

    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state
    const [sameAddress, setSameAddress] = useState(false);
    const [loanAmount, setLoanAmount] = useState("")
    const [lpi, setLpi] = useState("")
    const [mia, setMia] = useState("")
    const [mia2, setMia2] = useState("")
    const [bankname, setbankname] =useState("")
    const [did, setdid] = useState("")
    const [addData, setAddData] = useState("");
    const [loanType, setLoanType] = useState("");
    const [res, setRes] = useState("")
    console.log(banks)



    const [pf, setPf] = useState("")
    const [vc, setvc] = useState("")
    const [sd, setsd] = useState("")
    const [doc, setdoc] = useState("")
    const [li, setli] = useState("")
    const [other, setOther] = useState("")

    // State for checkbox

    const handleCheckboxChange = () => {
        setSameAddress(!sameAddress);
    };
    const totalAmount = parseInt(loanAmount) + parseInt(mia) + parseInt(lpi)+ parseInt(mia2)
    const tdid = parseInt(li) + parseInt(doc) + parseInt(sd) + parseInt(pf) + parseInt(vc) + parseInt(other)
    const deductionAmount = parseInt(loanAmount) - tdid
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        setError(null); // Reset error 

  
       

        try {
            const formData = new FormData(e.target);
            if (sameAddress) {
                // If checkbox is checked, set permanent address to current address
                formData.set('pAddress', formData.get('cAddress'));
            }
            const object = Object.fromEntries(formData.entries());
            const res = await axios.post('/api/register', {netDistribution:deductionAmount,tloanamount:totalAmount,...object});
            setRes(res.data)

            if (res.status === 201) {
                // If the request is successful, open the modal
                setOpenModal(true);
            } else {
                // Handle non-201 responses
                setError(`Unexpected response status: ${res.status}`);
            }
        } catch (err) {
            // Improved error handling
            if (err.response) {
                // Server responded with a status other than 2xx
                setError(err.response.data.error || 'Registration failed. Please try again.');
            } else if (err.request) {
                // The request was made but no response was received
                setError('No response from server. Please check your network connection.');
            } else {
                // Something happened in setting up the request
                setError('Error setting up request: ' + err.message);
            }
            console.error(err);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <>
            <div className='w-full flex justify-center items-center bg-[#1974A6]'>
                <div className='bg-white w-[95%] my-5 rounded-lg border-2 border-gray-700 shadow-slate-900 shadow-2xl '>
                    <h1 className='text-3xl font-bold text-[#1974A6]  text-center m-6'>New Entry</h1>

                    <form onSubmit={handleSubmit} className='m-3 mt-14 flex flex-col gap-6'>
                        <div className='flex justify-between mx-5'>
                            <div className='flex flex-col gap-1'>
                                <div>
                                <Label htmlFor='name' className='p-1 text-md' value='Name' />
                                <span className='text-xl pb-3 text-red-600'>*</span>
                                </div>
                                <input id='name' name='name' className='w-[350px] h-8 bottom-1 rounded-md items-center py-1' type='text'  required />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div>
                                <Label htmlFor='rNumber' className='p-1 text-md' value='Registration No.' />
                                <span className='text-xl pb-3 text-red-600'>*</span>

                                </div>
                                <input id='rNumber' name='rNumber' className='w-[350px] h-8 bottom-1 rounded-md items-center py-1' type='text' required />
                            </div>

                            <div className='flex flex-col gap-1'>
                                <div>
                                <Label htmlFor='city' className='p-1 text-md' value='City Name' />
                                <span className='text-xl pb-3 text-red-600'>*</span>
                                </div>
                                <input id='city' name='city' className='w-[350px] h-8 bottom-1 rounded-md items-center py-1' type='text' required />
                            </div>
                        
                        </div>
                        <div className='flex justify-between mx-5'>
                          <div className='flex flex-col gap-1'>
                            <div>
                                <Label htmlFor='number' className='p-1 text-md' value='Contact' />
                                <span className=' text-xl pb-3 text-red-600'>*</span>


                            </div>
                                <input id='number' name='number' className='w-[350px] h-8 bottom-1 rounded-md items-center py-1' type='text' required />
                            </div>
                            <div className='flex flex-col gap-1'>
                            <div>
                                <Label htmlFor='number' className='p-1 text-md' value='Contact 2' />
                            </div>   
                            <input id='number2' name='number2' className='w-[350px] h-8 bottom-1 rounded-md items-center py-1' type='text' required />
                            </div>
                            <div className='flex flex-col gap-1 '>
                                <div>
                            <Label htmlFor='cAddress' className='p-1 text-md' value='Current Address' />
                            <span className='text-xl pb-3 text-red-600'>*</span>


                                </div>
                            <input id='cAddress' name='cAddress' className='w-[350px] h-8 bottom-1 rounded-md items-center py-1' type='text' required onChange = {(e)=> setAddData(e.target.value)}/>
                        </div>
                         
                        </div>


                      
                        
                            
                            <div className='flex justify-between gap-10 mx-5'>

                            <div className='flex flex-col gap-2'>
                                <div>
                                <Label htmlFor='vName' className='p-1 text-md' value='Vehicle Name ' />
                                <span className='text-xl pb-3 text-red-600'>*</span>
                                </div>
                                <input id='vName' name='vName' className='w-[155px] h-8 bottom-1 rounded-md items-center py-1' type='text' required />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <div>
                                <Label htmlFor='bank' className='p-2 text-md' value='Bank Name ' />
                                <span className='text-xl pb-3 text-red-600'>*</span>
                                </div>
                                <Select id='bank' name='bank'className='w-[155px] h-8 bottom-1 rounded-md items-center py-1' type='text' required onChange={(e)=> setbankname(e.target.value)} >
                                    <option value="">select Bank</option>
                                    {
                                        banks.map((bank) => (
                                            <option key={bank.id} value={bank.name}>{bank.name}</option>
                                            ))
                                    }
                                    <option value="other">other</option>
                                    {/* <option value="Idfc">Idfc</option>
                                    <option value="Idfc">Idfc</option>
                                    <option value="Idfc">Idfc</option> */}

                                    </Select>
                            </div>
                            {
                                bankname === "other" && (
                                    <div className='flex flex-col gap-2'>
                                    <div>
                                    <Label htmlFor='bname' className='p-1 text-md' value='Bank Name ' />
                                    <span className='text-xl pb-3 text-red-600'>*</span>
                                    </div>
                                    <input id='otherbank' name='otherbank' className='w-[155px] h-8 bottom-1 rounded-md items-center py-1' type='text' required />
                                </div>

                                 
                           ) }

                            <div className='flex flex-col gap-1'>
                                <div>
                                <Label htmlFor='fmi' className='p-2 text-md' value='1st EMI' />
                                <span className='text-xl pb-3 text-red-600'>*</span>

                                </div>
                                <input id='femi' name='femi' type='date' className='w-[155px] h-8 bottom-1 rounded-md items-center py-1' required />
                            </div>


                            <div className='flex flex-col gap-1'>
                                <div>
                                <Label htmlFor='roi' className='p-2 text-md' value='ROI' />
                                <span className='text-xl pb-3 text-red-600'>*</span>

                                </div>
                                <input id='roi' name='roi' type='text' className='w-[155px] h-8 bottom-1 rounded-md items-center py-1' required />
                            </div>
                            

                            <div className='flex flex-col gap-1'>
                                <div>
                                <Label htmlFor='flat' className='p-2 text-md' value='Flat' />

                                </div>
                                <input id='flat' name='flat' type='text' className='w-[155px] h-8 bottom-1 rounded-md items-center py-1' required />
                            </div>
                            
                            </div>
                        

                        <div className='flex justify-between mx-5'>
                            <div className='flex flex-col gap-1'>
                                <Label htmlFor='lAmount' className='p-1 text-md' value='Loan Amount *' />
                                <input id='lAmount' name='lAmount'  className='w-[160px] h-8 bottom-1 rounded-md items-center py-1' type='text' required onChange={(e)=> setLoanAmount(e.target.value)}/>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <Label htmlFor='lpi' className='p-1 text-md' value='LPI ' />
                                <input id='lpi' name='lpi' type='text' className='w-[160px] h-8 bottom-1 rounded-md items-center py-1' required onChange={(e)=> setLpi(e.target.value)} />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <Label htmlFor='moter' className='p-1 text-md' value='Moter Insurence *' />
                                <input id='moter' name='moter' type='text'className='w-[160px] h-8 bottom-1 rounded-md items-center py-1' required onChange={(e)=> setMia(e.target.value)}/>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <Label htmlFor='Admin' className='p-1 text-md' value='Admin' />
                                <input id='admin' name='admin' type='text'className='w-[160px] h-8 bottom-1 rounded-md items-center py-1' required onChange={(e)=> setMia2(e.target.value)}/>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <Label htmlFor='tloanamount' className='p-1 text-md' value='Total Amount *' />
                                <input id='tLAmount' name='tLAmount' className='w-[160px] h-8 bottom-1 rounded-md items-center py-1'  type='text' value={parseInt(loanAmount) + parseInt(mia) +parseInt(mia2)+ parseInt(lpi)}required disabled />
                            </div>

                            

                        </div>




                        <div className='flex justify-between mx-5'>
                        <div className='flex flex-col'>
                                <Label htmlFor='pf' className='p-2 text-md' value='PF' />
                                <input id='pf' name='pf' type='text' className='w-[160px] h-8 bottom-1 rounded-md items-center py-1'  required onChange={(e)=> setPf(e.target.value)}/>
                            </div>
                            <div className='flex flex-col'>
                                <Label htmlFor='Vc' className='p-2 text-md' value='Vc' />
                                <input id='vc' name='vc' type='text' className='w-[160px] h-8 bottom-1 rounded-md items-center py-1'  required onChange={(e)=> setvc(e.target.value)}/>
                            </div>
                            <div className='flex flex-col'>
                                <Label htmlFor='Sd' className='p-2 text-md' value='Sd' />
                                <input id='sd' name='sd' type='text' className='w-[160px] h-8 bottom-1 rounded-md items-center py-1'  required onChange={(e)=> setsd(e.target.value)}/>
                            </div>
                            <div className='flex flex-col'>
                                <Label htmlFor='document' className='p-2 text-md' value='Document' />
                                <input id='document' name='document' className='w-[160px] h-8 bottom-1 rounded-md items-center py-1'  type='text' required onChange={(e)=> setdoc(e.target.value)}/>
                            </div>
                            <div className='flex flex-col'>
                                <Label htmlFor='LI' className='p-2 text-md' value='Li' />
                                <input id='li' name='li' type='text' className='w-[160px] h-8 bottom-1 rounded-md items-center py-1'  required onChange={(e)=> setli(e.target.value)}/>
                            </div>

                        
                           
                            </div>
                    



                        <div className='flex justify-between mx-5'>

                        <div className='flex flex-col'>
                                <Label htmlFor='Other' className='p-2 text-md' value='Other' />
                                <input id='other' name='other' type='text' className='w-[160px] h-8 bottom-1 rounded-md items-center py-1'  required onChange={(e)=> setOther(e.target.value)}/>
                            </div>
                        <div className='flex flex-col'>
                                <Label htmlFor='deduction' className='p-2 text-md' value='Total Deduction *' />
                                <input id='deduction' name='deduction' className='w-[160px] h-8 bottom-1 rounded-md items-center py-1'  type='text' required value={parseInt(li)+parseInt(doc)+parseInt(sd)+parseInt(pf)+ parseInt(vc) + parseInt(other)} onChange={(e)=> setdid(e.target.value)}/>
                            </div>
                            <div className='flex flex-col'>

                                <Label htmlFor='netdesb' className='p-2 text-md' value='Net Disbursment *' />
                                <input id='netdesb' name='netdesb' className='w-[160px] h-8 bottom-1 rounded-md items-center py-1'  type='text' disabled value={parseInt(loanAmount) - (parseInt(li)+parseInt(doc)+parseInt(sd)+parseInt(pf)+ parseInt(vc) + parseInt(other))} required />
                            </div>
                            <div className='flex flex-col'>
                                <Label htmlFor='rStatus' className='p-2 text-md' value='RTO Status *' />
                                <Select id='rStatus' name='rStatus' required>
                                    <option value=''>RTO Status</option>
                                    <option value='RTO Done'>Not Applicable</option>
                                    <option value='In Process'>In Process</option>
                                    <option value='Completed'>Completed</option>
                                    <option value='Hold'>Hold</option>
                                </Select>
                            </div> 
                            <div className='flex flex-col'>
                                <Label htmlFor='lType' className='p-2 text-md' value='Loan Type *'  />
                                <Select id='lType' name='lType' className='w-[200px]' required onChange={(e) => setLoanType(e.target.value)}>
                                    <option value=''>Loan Type</option>
                                    <option value='New Car'>New Car</option>
                                    <option value='Purchase'>Purchase</option>
                                    <option value='Refinance'>Refinance</option>
                                    <option value='BT Top Up'>BT To Up</option>
                                </Select>
                            </div>
                        
                        
                        </div>
                        
                        {loanType === 'New Car' && (
                            <div className='flex gap-20'>
                                <div className='flex flex-col'>
                                <Label htmlFor='newCarDetails' className='p-1 text-md' value='Show Room Name' />
                                <input
                                    id='sname'
                                    name='sname'
                                    type='text'
                                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                />
                                </div>
                                 <div className='flex flex-col '>
                                <Label htmlFor='newCarDetails' className='p-1 text-md' value='New Car Details' />
                                <input
                                    id='newCarD'
                                    name='newCarD'
                                    type='text'
                                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                />
                            </div>
                            </div>
                            
                        )}





                                 {loanType === 'Purchase' && (
                            <div className='flex flex-wrap gap-10 mx-10'>
                                <div className='flex flex-col'>
                                <Label htmlFor='rHold' className='p-1 text-md' value='RTO Hold' />
                                <input
                                    id='prHold'
                                    name='prHold'
                                    type='text'
                                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                />
                                </div>
                                 <div className='flex flex-col '>
                                <Label htmlFor='fc' className='p-1 text-md' value='FC Amount' />
                                <input
                                    id='pfc'
                                    name='pfc'
                                    type='text'
                                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                />
                            </div>
                            <div className='flex flex-col'>
                                <Label htmlFor='noc' className='p-1 text-md' value='For Noc Hold' />
                                <input
                                    id='pnoc'
                                    name='pnoc'
                                    type='text'
                                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                />
                                </div>
                                 <div className='flex flex-col '>
                                <Label htmlFor='pbank' className='p-1 text-md' value='Prev Bank Name' />
                                <input
                                    id='ppBank'
                                    name='ppBank'
                                    type='text'
                                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                />
                            </div>
                            <div className='flex flex-col'>
                                <Label htmlFor='netpayto' className='p-1 text-md' value='Net Pay to' />
                                <input
                                    id='pnpt'
                                    name='pnpt'
                                    type='text'
                                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                />
                                </div>

                                <div className='flex flex-col '>
                                <Label htmlFor='customerPay' className='p-1 text-md' value='Amount' />
                                <input
                                    id='pcustomerPay'
                                    name='pcustomerPay'
                                    type='text'
                                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                />
                            </div>


                             
                            <div className='flex flex-col'>
                                <Label htmlFor='rtoCharges' className='p-1 text-md' value='RTO Charges' />
                                <input
                                    id='prtoCharges'
                                    name='prtoCharges'
                                    type='text'
                                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                />
                                </div>
                                 <div className='flex flex-col '>
                                <Label htmlFor='rtoAgent' className='p-1 text-md' value='Rto Agent' />
                                <input
                                    id='prtoAgent'
                                    name='prtoAgent'
                                    type='text'
                                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'/>
                            </div>

                            <div className='flex flex-col'>
                                <Label htmlFor='pkiaharas' className='p-1 text-md' value='Kiharas' />
                                <input
                                    id='pkiharas'
                                    name='pkiharas'
                                    type='text'
                                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                />
                                </div>

                            
                            </div>
                            
                        )}






                        {/* Refinance */}
                         {loanType === 'Refinance' && (
                            <div className='flex flex-wrap gap-10'>
                                <div className='flex flex-col'>
                                <Label htmlFor='noc1' className='p-1 text-md' value='Noc' />
                                <input
                                    id='rnoc1'
                                    name='rnoc1'
                                    type='text'
                                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                />
                                </div>

                                <div className='flex flex-col '>
                                <Label htmlFor='pbank1' className='p-1 text-md' value='Prev Bank Name' />
                                <input
                                    id='rpBank1'
                                    name='rpBank1'
                                    type='text'
                                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                />
                            </div>
                            <div className='flex flex-col '>
                                <Label htmlFor='rrtoagent1' className='p-1 text-md' value='RTO Agent' />
                                <input
                                    id='rrtoAgent1'
                                    name='rrtoAgent1'
                                    type='text'
                                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                />
                            </div>

                                 <div className='flex flex-col '>
                                <Label htmlFor='fc1' className='p-1 text-md' value='FC Amount' />
                                <input
                                    id='rfc1'
                                    name='rfc1'
                                    type='text'
                                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                />
                            </div>
                         
                                 <div className='flex flex-col '>
                                <Label htmlFor='rcustomerPay' className='p-1 text-md' value='Customer pay' />
                                <input
                                    id='rcustomerPay1'
                                    name='rcustomerPay1'
                                    type='text'
                                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                />
                            </div>
                            <div className='flex flex-col'>
                                <Label htmlFor='rHold1' className='p-1 text-md' value='RTO Hold' />
                                <input
                                    id='rrHold1'
                                    name='rrHold1'
                                    type='text'
                                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                />
                                </div>
                                 <div className='flex flex-col '>
                                <Label htmlFor='rtoCharges1' className='p-1 text-md' value='RTO Charges' />
                                <input
                                    id='rrtoCharges1'
                                    name='rrtoCharges1'
                                    type='text'
                                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                />
                            </div>
                           
                                 <div className='flex flex-col '>
                                <Label htmlFor='kiharas1' className='p-1 text-md' value='Kiharas' />
                                <input
                                    id='rkiharas1'
                                    name='kiharas1'
                                    type='text'
                                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                />
                            </div>
                            </div>
                            
                        )}



                        




                        {/* BT TOP UP */}
                        {loanType === 'BT Top Up' && (
                            <div className='flex flex-wrap gap-10'>
                                <div className='flex flex-col '>
                                <Label htmlFor='pBank1' className='p-1 text-md' value='Prev Bank' />
                                <input
                                    id='bpBank1'
                                    name='bpBank1'
                                    type='text'
                                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                />
                                </div>
                                 <div className='flex flex-col '>
                                <Label htmlFor='fc2' className='p-1 text-md' value='FC' />
                                <input
                                    id='bfc2'
                                    name='bfc2'
                                    type='text'
                                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                />
                            </div>
                            <div className='flex flex-col'>
                                <Label htmlFor='oAmount' className='p-1 text-md' value='Other Amount' />
                                <input
                                    id='boAmount'
                                    name='boAmount'
                                    type='text'
                                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                />
                                </div>
                                 <div className='flex flex-col '>
                                <Label htmlFor='customerPay2' className='p-1 text-md' value='Customer Pay' />
                                <input
                                    id='bcustomerPay2'
                                    name='bcustomerPay2'
                                    type='text'
                                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                />
                            </div>
                            <div className='flex flex-col'>
                                <Label htmlFor='rHold2' className='p-1 text-md' value='Rto Hold' />
                                <input
                                    id='brHold2'
                                    name='brHold2'
                                    type='text'
                                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                />
                                </div>
                                 <div className='flex flex-col '>
                                <Label htmlFor='rtoCharges2' className='p-1 text-md' value='RTO Charges' />
                                <input
                                    id='brtoCharges2'
                                    name='brtoCharges2'
                                    type='text'
                                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                />
                            </div>
                            <div className='flex flex-col'>
                                <Label htmlFor='rAgent' className='p-1 text-md' value='RTO Agent' />
                                <input
                                    id='brAgent'
                                    name='brAgent'
                                    type='text'
                                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                />
                                </div>
                                 <div className='flex flex-col '>
                                <Label htmlFor='kiharas2' className='p-1 text-md' value='Kiharas' />
                                <input
                                    id='bkiharas2'
                                    name='bkiharas2'
                                    type='text'
                                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                />
                            </div>
                            </div>
                            
                        )}
                        {error && (
                            <div className='text-red-500 text-center mt-4'>{error}</div>
                        )}

                        <div className='flex justify-center items-center'>
                            <button
                                className='mt-2 mb-2 text-white bg-[#1974A6] hover:bg-gray-700 w-[100px] p-2 rounded-md font-xl'
                                type='submit'
                                disabled={loading} // Disable button while loading
                            >
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div>
                <Modal show={openModal} size='md' onClose={() => setOpenModal(false)} popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className='text-center'>
                            <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
                            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
                                {res}                            </h3>
                            <div className='flex justify-center gap-4'>
                                <Button color='success' onClick={() => setOpenModal(false)}>
                                    Ok
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
}

export default Register;
