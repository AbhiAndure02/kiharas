import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({

    name: {//done
        type: String,
        required: true
    },
    applicationId: {
        type: String,
        required: true,
    },
    number: {//done
        type: String,
        required: true
    },
    number2: {//done
        type: String
    },
    rNumber: {//done
        type: String,
        required: true,
    },
    city: {//done
        type: String,
        required: true,
    },
    vName: {//done
        type: String,
        required: true,
    },
    bank: {
        type: String,
        required: true,
    },
    netdesb: {
        type: String,
    },
   
    lAmount: {
        type: String,
        required: true,
    },
    rStatus: {//done
        type: String,
        default: "RTO Status",

    },
    lType: {//done
        type: String,
        default: "Loan Type",
    },

    lpi: {
        type: String,
        required: true
    },
    moter: {
        type: String,
        required: true
    },
    tloanamount: {
        type: String
    },
    deduction: {//done
        type: String,
        required: true
    },
    roi: {//done
        type: String,
        required: true
    },
    sname: {
        type: String,
    },
    newCarD: {
        type: String
    },
    prHold: {
        type: String
    },
    pfc: {
        type: String
    },
    pnoc: {
        type: String
    },
    ppBank: {
        type: String
    },
    pnpt: {
        type: String
    },
    pcustomerPay: {
        type: String
    },
    prtoCharges: {
        type: String
    },
    prtoAgent:{
        type: String
    }, 
    pkiharas:{
        type:String
    },
    rnoc1:{
        type:String
    },
    rpBank1:{
        type:String
    },
    rfc1:{
        type:String
    },
    rcustomerPay1:{
        type:String
    },
    rrHold1:{
        type:String
    },
    rrtoCharges1:{
        type:String
    },
    rrtoAgent1:{
        type:String
    },
    rkiharas1:{
        type:String
    },
    bpBank1:{
        type:String
    },
    bfc2:{
      type:String  
    },
    boAmount:{
        type:String
    },
    bcustomerPay2:{
        type:String
    },
    brHold2:{
        type:String
    },
    brtoCharges2:{
        type:String
    },
    brAgent:{
        type:String
    },
    bkiharas2:{
        type:String
    },
    cAddress: {//done
        type: String,

    },
    otherbank: {
        type: String
    },
    femi: {//done
        type: Date,
    },
    lAmount: {//done
        type: String,
    },

    flat: {
        type: String,
    },
    lpi: {//done
        type: String,
    },
    moter: {
        type: String,
    },
    tLAmount: {
        type: String,
    },
    pf: {
        type: String,
    },
    vc: {
        type: String,
    },
    sd: {
        type: String,
    },
    document: {
        type: String,
    },
    other: {
        type: String,
    },

    slug: {
        type: String,
        required: true,
        unique: true
    }



}, { timeStamp: true }

);

const Rigistration = mongoose.model("Registration", registerSchema);

export default Rigistration;

