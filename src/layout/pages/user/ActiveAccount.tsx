import { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ActiveAccount: React.FC = () => {

    const { email } = useParams();
    const { activeCode } = useParams();
    const [isActivated, setIsActivated] = useState(false);
    const [annouce, setAnnouce] = useState('');
    console.log(email);
    console.log(activeCode);
   
    useEffect(() => {
        if(email && activeCode){
            ActiveFt();
        }
    },[]);

    const ActiveFt = async () => {
        try {
            const url =`http://localhost:8080/api/account/Active?email=${email}&activeCode=${activeCode}`;
            const response = await fetch(url,{
                method: 'GET',
         });
         console.log(response);
         if(response.ok){
            setIsActivated(true);
         }else{
            setAnnouce(response.text+"");
         }
       
        } catch (error) {
            console.log(error);
        }
    }

        return (
            <div>
{
                isActivated ? <p>Tài khoản đã kích hoạt thành công, hãy đăng nhập</p>:<p>{annouce}</p>
            }
            </div>
        );


    }
export default ActiveAccount;