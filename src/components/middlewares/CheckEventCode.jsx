import { checkingEventCode } from "../../services/checkKodeEvent";

export async function CheckEventCode({params}){
    const {kodeEvent}=params;
    const eventStatus = await checkingEventCode(kodeEvent);
    if(!eventStatus){
        throw new Error(`Kode Event kodeEvent tidak ditemukan`);
    }
    return eventStatus;

}

export default CheckEventCode